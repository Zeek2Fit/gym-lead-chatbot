import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import ContactForm from "./ContactForm";
import CalendarPicker from "./CalendarPicker";
import ConfirmationScreen from "./ConfirmationScreen";
import ProgressIndicator from "./ProgressIndicator";
import type { ConversationStep, ChatMessage as ChatMessageType, InsertLead, Lead } from "@shared/schema";
import { conversationCopy, programName, featureFlags } from "@shared/config";
import confetti from "canvas-confetti";

export default function ConversationFlow() {
  const [currentStep, setCurrentStep] = useState<ConversationStep>("greeting");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [leadData, setLeadData] = useState<Partial<InsertLead>>({});
  const [isLeadSaved, setIsLeadSaved] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [conversationStarted, setConversationStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const trackEvent = async (eventType: string) => {
    try {
      await apiRequest("POST", "/api/analytics/track", {
        eventType,
        sessionId,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/stats"] });
    } catch (error) {
      console.error("Failed to track event:", error);
    }
  };

  const createLeadMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      return await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      await trackEvent("conversation_complete");
      setIsLeadSaved(true);
    },
    onError: () => {
      toast({
        title: "Oops!",
        description: conversationCopy.errors.saveFailed,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    addBotMessage(conversationCopy.greeting);
  }, []);

  const addBotMessage = (content: string) => {
    const message: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "bot",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handleGreeting = (option: string) => {
    if (!conversationStarted) {
      trackEvent("conversation_start");
      setConversationStarted(true);
    }
    
    const optionKey = option as keyof typeof conversationCopy.greetingOptions;
    const userResponse = conversationCopy.greetingOptions[optionKey] || option;
    addUserMessage(userResponse);
    
    setTimeout(() => {
      addBotMessage(conversationCopy.fitnessLevelPrompt);
      setCurrentStep("fitness_level");
    }, 500);
  };

  const handleFitnessLevel = (level: string) => {
    const levelKey = level as keyof typeof conversationCopy.fitnessLevelOptions;
    const userResponse = conversationCopy.fitnessLevelOptions[levelKey] || level;
    
    const responseKey = level as keyof typeof conversationCopy.fitnessLevelResponses;
    const levelResponse = conversationCopy.fitnessLevelResponses[responseKey] || "";
    const botResponse = `${levelResponse}\n\n${conversationCopy.goalPrompt}`;
    
    setLeadData((prev) => ({ ...prev, fitnessLevel: level }));
    addUserMessage(userResponse);
    
    setTimeout(() => {
      addBotMessage(botResponse);
      setCurrentStep("main_goal");
    }, 500);
  };

  const handleMainGoal = (goal: string) => {
    setLeadData((prev) => ({ ...prev, mainGoal: goal }));
    addUserMessage(goal);
    
    setTimeout(() => {
      addBotMessage(conversationCopy.timelinePrompt);
      setCurrentStep("timeline");
    }, 500);
  };

  const handleTimeline = (timeline: string) => {
    const timelineKey = timeline as keyof typeof conversationCopy.timelineOptions;
    const userResponse = conversationCopy.timelineOptions[timelineKey] || timeline;
    
    const responseKey = timeline as keyof typeof conversationCopy.timelineResponses;
    const timelineResponse = conversationCopy.timelineResponses[responseKey] || "";
    const botResponse = `${timelineResponse}\n\n${conversationCopy.budgetPrompt}`;
    
    setLeadData((prev) => ({ ...prev, timeline }));
    addUserMessage(userResponse);
    
    setTimeout(() => {
      addBotMessage(botResponse);
      setCurrentStep("budget");
    }, 500);
  };

  const handleBudget = (budget: string) => {
    const budgetKey = budget as keyof typeof conversationCopy.budgetOptions;
    const userResponse = conversationCopy.budgetOptions[budgetKey] || budget;
    
    setLeadData((prev) => ({ ...prev, budget }));
    addUserMessage(userResponse);
    
    setTimeout(() => {
      addBotMessage(conversationCopy.contactPrompt);
      setCurrentStep("contact_info");
    }, 500);
  };

  const handleContactSubmit = (contactData: { name: string; email: string; phone: string }) => {
    setLeadData((prev) => ({ ...prev, ...contactData }));
    addUserMessage(`${contactData.name}\n${contactData.email}\n${contactData.phone}`);
    
    setTimeout(() => {
      if (featureFlags.enableTrialBooking) {
        addBotMessage(conversationCopy.trialPrompt);
        setCurrentStep("trial_booking");
      } else {
        const updatedLeadData = { ...leadData, ...contactData, wantsTrial: "no" };
        setLeadData(updatedLeadData);
        setCurrentStep("confirmation");
        if (featureFlags.enableConfetti) {
          triggerConfetti();
        }
        if (!isLeadSaved && isLeadDataComplete(updatedLeadData)) {
          createLeadMutation.mutate(updatedLeadData as InsertLead);
        }
      }
    }, 500);
  };

  const handleTrialChoice = (wantsTrial: boolean) => {
    if (wantsTrial) {
      setLeadData((prev) => ({ ...prev, wantsTrial: "yes" }));
      addUserMessage("Yes, let's book a trial session!");
      
      setTimeout(() => {
        addBotMessage("Heck yeah! Pick a day and time that works for you:");
      }, 300);
    } else {
      const updatedLeadData = { ...leadData, wantsTrial: "no" };
      setLeadData(updatedLeadData);
      addUserMessage("No thanks, just send me the info");
      
      setTimeout(() => {
        setCurrentStep("confirmation");
        if (featureFlags.enableConfetti) {
          triggerConfetti();
        }
        
        if (!isLeadSaved && isLeadDataComplete(updatedLeadData)) {
          createLeadMutation.mutate(updatedLeadData as InsertLead);
        }
      }, 300);
    }
  };

  const handleTrialBooked = (date: string, time: string) => {
    trackEvent("trial_booked");
    
    const updatedLeadData = { ...leadData, trialDate: date, trialTime: time };
    setLeadData(updatedLeadData);
    addUserMessage(`Booked for ${date} at ${time}`);
    
    setTimeout(() => {
      setCurrentStep("confirmation");
      if (featureFlags.enableConfetti) {
        triggerConfetti();
      }
      
      if (!isLeadSaved && isLeadDataComplete(updatedLeadData)) {
        createLeadMutation.mutate(updatedLeadData as InsertLead);
      }
    }, 300);
  };

  const isLeadDataComplete = (data: Partial<InsertLead>): data is InsertLead => {
    return !!(
      data.name &&
      data.email &&
      data.phone &&
      data.fitnessLevel &&
      data.mainGoal &&
      data.timeline &&
      data.budget &&
      data.wantsTrial
    );
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 10000,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const renderInput = () => {
    if (currentStep === "contact_info") {
      return <ContactForm onSubmit={handleContactSubmit} />;
    }

    if (currentStep === "trial_booking" && leadData.wantsTrial === "yes") {
      return <CalendarPicker onBook={handleTrialBooked} />;
    }

    if (currentStep === "trial_booking" && !leadData.wantsTrial) {
      return (
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleTrialChoice(true)}
            variant="default"
            className="w-full"
            data-testid="button-yes-trial"
          >
            {conversationCopy.trialButtons.yes}
          </Button>
          <Button
            onClick={() => handleTrialChoice(false)}
            variant="outline"
            className="w-full"
            data-testid="button-no-trial"
          >
            {conversationCopy.trialButtons.no}
          </Button>
        </div>
      );
    }

    if (currentStep === "confirmation") {
      return <ConfirmationScreen leadData={leadData} />;
    }

    return null;
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ProgressIndicator currentStep={currentStep} />

      <ScrollArea className="flex-1 px-6 py-4" ref={scrollRef as any}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {currentStep === "greeting" && (
          <div className="grid grid-cols-1 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={() => handleGreeting("weight_loss")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-weight-loss"
            >
              <span className="text-[15px]">{conversationCopy.greetingOptions.weight_loss}</span>
            </Button>
            <Button
              onClick={() => handleGreeting("build_muscle")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-build-muscle"
            >
              <span className="text-[15px]">{conversationCopy.greetingOptions.build_muscle}</span>
            </Button>
            <Button
              onClick={() => handleGreeting("general_fitness")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-general-fitness"
            >
              <span className="text-[15px]">{conversationCopy.greetingOptions.general_fitness}</span>
            </Button>
            <Button
              onClick={() => handleGreeting("personal_training")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-personal-training"
            >
              <span className="text-[15px]">{conversationCopy.greetingOptions.personal_training}</span>
            </Button>
            <Button
              onClick={() => handleGreeting("browsing")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-browsing"
            >
              <span className="text-[15px]">{conversationCopy.greetingOptions.browsing}</span>
            </Button>
          </div>
        )}

        {currentStep === "fitness_level" && (
          <div className="grid grid-cols-1 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={() => handleFitnessLevel("beginner")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-beginner"
            >
              <span className="text-[15px]">{conversationCopy.fitnessLevelOptions.beginner}</span>
            </Button>
            <Button
              onClick={() => handleFitnessLevel("some_experience")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-some-experience"
            >
              <span className="text-[15px]">{conversationCopy.fitnessLevelOptions.some_experience}</span>
            </Button>
            <Button
              onClick={() => handleFitnessLevel("advanced")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-advanced"
            >
              <span className="text-[15px]">{conversationCopy.fitnessLevelOptions.advanced}</span>
            </Button>
          </div>
        )}

        {currentStep === "main_goal" && (
          <div className="mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const goal = formData.get("goal") as string;
                if (goal.trim()) {
                  handleMainGoal(goal.trim());
                  e.currentTarget.reset();
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                name="goal"
                placeholder="e.g., lose 20lbs, deadlift 300lbs..."
                className="flex-1 px-4 py-3 rounded-lg bg-muted border border-input text-foreground text-[15px] focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
                data-testid="input-main-goal"
              />
              <Button type="submit" data-testid="button-submit-goal">
                Send
              </Button>
            </form>
          </div>
        )}

        {currentStep === "timeline" && (
          <div className="grid grid-cols-1 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={() => handleTimeline("this_week")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-this-week"
            >
              <span className="text-[15px]">{conversationCopy.timelineOptions.this_week}</span>
            </Button>
            <Button
              onClick={() => handleTimeline("within_month")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-within-month"
            >
              <span className="text-[15px]">{conversationCopy.timelineOptions.within_month}</span>
            </Button>
            <Button
              onClick={() => handleTimeline("just_exploring")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-just-exploring"
            >
              <span className="text-[15px]">{conversationCopy.timelineOptions.just_exploring}</span>
            </Button>
          </div>
        )}

        {currentStep === "budget" && (
          <div className="grid grid-cols-1 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={() => handleBudget("$50-100")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-budget-50-100"
            >
              <span className="text-[15px]">{conversationCopy.budgetOptions["$50-100"]}</span>
            </Button>
            <Button
              onClick={() => handleBudget("$100-200")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-budget-100-200"
            >
              <span className="text-[15px]">{conversationCopy.budgetOptions["$100-200"]}</span>
            </Button>
            <Button
              onClick={() => handleBudget("$200+")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-budget-200-plus"
            >
              <span className="text-[15px]">{conversationCopy.budgetOptions["$200+"]}</span>
            </Button>
            <Button
              onClick={() => handleBudget("not_sure")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-budget-not-sure"
            >
              <span className="text-[15px]">{conversationCopy.budgetOptions.not_sure}</span>
            </Button>
          </div>
        )}

        <div className="mt-4">{renderInput()}</div>
      </ScrollArea>
    </div>
  );
}
