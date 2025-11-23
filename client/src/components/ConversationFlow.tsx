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
import confetti from "canvas-confetti";

export default function ConversationFlow() {
  const [currentStep, setCurrentStep] = useState<ConversationStep>("greeting");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [leadData, setLeadData] = useState<Partial<InsertLead>>({});
  const [isLeadSaved, setIsLeadSaved] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const createLeadMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      return await apiRequest<Lead>("POST", "/api/leads", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      setIsLeadSaved(true);
    },
    onError: () => {
      toast({
        title: "Oops!",
        description: "Failed to save your information. Please try again.",
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
    addBotMessage(
      "Hey! Looking to finally ditch the dad bod and build some real strength? You're in the right place. I'll help you find a plan that actually fits your life.\n\nWhat brings you here today?"
    );
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
    let userResponse = "";
    switch (option) {
      case "weight_loss":
        userResponse = "Sustainable fat loss";
        break;
      case "build_muscle":
        userResponse = "Build muscle and strength";
        break;
      case "general_fitness":
        userResponse = "General fitness and health";
        break;
      case "personal_training":
        userResponse = "Personal training";
        break;
      case "browsing":
        userResponse = "Just browsing";
        break;
    }
    addUserMessage(userResponse);
    
    setTimeout(() => {
      addBotMessage(
        "Perfect! That's exactly what we specialize in. Our Dad Bod Reset program is built on the 4 Pillars: Sleep, Steps, Strength, and Smart Fuel.\n\nWhat's your current fitness level?"
      );
      setCurrentStep("fitness_level");
    }, 500);
  };

  const handleFitnessLevel = (level: string) => {
    let userResponse = "";
    let botResponse = "";
    
    switch (level) {
      case "beginner":
        userResponse = "Beginner - just getting started";
        botResponse = "No worries! Everyone starts somewhere. The best part? Beginners often see the fastest results when they stay consistent.\n\nWhat's your main goal? (Be specific - e.g., 'lose 20lbs', 'deadlift 300lbs', 'run a 5K')";
        break;
      case "some_experience":
        userResponse = "Some experience - getting back into it";
        botResponse = "Welcome back! Muscle memory is real - you'll be surprised how quickly things click again.\n\nWhat's your main goal? (Be specific - e.g., 'lose 20lbs', 'deadlift 300lbs', 'run a 5K')";
        break;
      case "advanced":
        userResponse = "Advanced - looking to optimize";
        botResponse = "Solid! Ready to take it to the next level. Let's dial in your training and nutrition for maximum results.\n\nWhat's your main goal? (Be specific - e.g., 'lose 20lbs', 'deadlift 300lbs', 'run a 5K')";
        break;
    }
    
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
      addBotMessage(
        "Love it! That's a clear target. Transformations that last are built on small, stupidly consistent habits - not 75-day punishments.\n\nWhen are you looking to start?"
      );
      setCurrentStep("timeline");
    }, 500);
  };

  const handleTimeline = (timeline: string) => {
    let userResponse = "";
    let botResponse = "";
    
    switch (timeline) {
      case "this_week":
        userResponse = "This week - ready to go!";
        botResponse = "THAT'S what I'm talking about! Your future self is already thanking you.\n\nWhat's your budget range for membership?";
        break;
      case "within_month":
        userResponse = "Within the next month";
        botResponse = "Perfect timing! Let's get you set up for success.\n\nWhat's your budget range for membership?";
        break;
      case "just_exploring":
        userResponse = "Just exploring my options";
        botResponse = "Smart move! Knowledge first, then action. Let's see what works for your situation.\n\nWhat's your budget range for membership?";
        break;
    }
    
    setLeadData((prev) => ({ ...prev, timeline }));
    addUserMessage(userResponse);
    
    setTimeout(() => {
      addBotMessage(botResponse);
      setCurrentStep("budget");
    }, 500);
  };

  const handleBudget = (budget: string) => {
    let userResponse = "";
    switch (budget) {
      case "$50-100":
        userResponse = "$50-100/month";
        break;
      case "$100-200":
        userResponse = "$100-200/month";
        break;
      case "$200+":
        userResponse = "$200+/month";
        break;
      case "not_sure":
        userResponse = "Not sure yet";
        break;
    }
    
    setLeadData((prev) => ({ ...prev, budget }));
    addUserMessage(userResponse);
    
    setTimeout(() => {
      addBotMessage(
        "Got it! Let me get your contact info so we can send you the details, pricing options, and our free 7-Day Dad Bod Kickstart guide."
      );
      setCurrentStep("contact_info");
    }, 500);
  };

  const handleContactSubmit = (contactData: { name: string; email: string; phone: string }) => {
    setLeadData((prev) => ({ ...prev, ...contactData }));
    addUserMessage(`${contactData.name}\n${contactData.email}\n${contactData.phone}`);
    
    setTimeout(() => {
      addBotMessage(
        "Awesome! One last thing - want to schedule a FREE 30-minute trial session? It's the best way to experience what we're all about and meet the team. No pressure, just pure value."
      );
      setCurrentStep("trial_booking");
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
        triggerConfetti();
        
        if (!isLeadSaved && isLeadDataComplete(updatedLeadData)) {
          createLeadMutation.mutate(updatedLeadData as InsertLead);
        }
      }, 300);
    }
  };

  const handleTrialBooked = (date: string, time: string) => {
    const updatedLeadData = { ...leadData, trialDate: date, trialTime: time };
    setLeadData(updatedLeadData);
    addUserMessage(`Booked for ${date} at ${time}`);
    
    setTimeout(() => {
      setCurrentStep("confirmation");
      triggerConfetti();
      
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
            Yes, Book Trial
          </Button>
          <Button
            onClick={() => handleTrialChoice(false)}
            variant="outline"
            className="w-full"
            data-testid="button-no-trial"
          >
            No Thanks
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
              <span className="text-[15px]">Sustainable fat loss</span>
            </Button>
            <Button
              onClick={() => handleGreeting("build_muscle")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-build-muscle"
            >
              <span className="text-[15px]">Build muscle and strength</span>
            </Button>
            <Button
              onClick={() => handleGreeting("general_fitness")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-general-fitness"
            >
              <span className="text-[15px]">General fitness and health</span>
            </Button>
            <Button
              onClick={() => handleGreeting("personal_training")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-personal-training"
            >
              <span className="text-[15px]">Personal training</span>
            </Button>
            <Button
              onClick={() => handleGreeting("browsing")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-browsing"
            >
              <span className="text-[15px]">Just browsing</span>
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
              <span className="text-[15px]">Beginner - just getting started</span>
            </Button>
            <Button
              onClick={() => handleFitnessLevel("some_experience")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-some-experience"
            >
              <span className="text-[15px]">Some experience - getting back into it</span>
            </Button>
            <Button
              onClick={() => handleFitnessLevel("advanced")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-advanced"
            >
              <span className="text-[15px]">Advanced - looking to optimize</span>
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
              <span className="text-[15px]">This week - ready to go!</span>
            </Button>
            <Button
              onClick={() => handleTimeline("within_month")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-within-month"
            >
              <span className="text-[15px]">Within the next month</span>
            </Button>
            <Button
              onClick={() => handleTimeline("just_exploring")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-just-exploring"
            >
              <span className="text-[15px]">Just exploring my options</span>
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
              <span className="text-[15px]">$50-100/month</span>
            </Button>
            <Button
              onClick={() => handleBudget("$100-200")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-budget-100-200"
            >
              <span className="text-[15px]">$100-200/month</span>
            </Button>
            <Button
              onClick={() => handleBudget("$200+")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-budget-200-plus"
            >
              <span className="text-[15px]">$200+/month</span>
            </Button>
            <Button
              onClick={() => handleBudget("not_sure")}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              data-testid="button-budget-not-sure"
            >
              <span className="text-[15px]">Not sure yet</span>
            </Button>
          </div>
        )}

        <div className="mt-4">{renderInput()}</div>
      </ScrollArea>
    </div>
  );
}
