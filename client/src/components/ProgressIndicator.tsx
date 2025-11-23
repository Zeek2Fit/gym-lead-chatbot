import { Check } from "lucide-react";
import type { ConversationStep } from "@shared/schema";

interface ProgressIndicatorProps {
  currentStep: ConversationStep;
}

const steps: { key: ConversationStep; label: string }[] = [
  { key: "greeting", label: "Intro" },
  { key: "fitness_level", label: "Goals" },
  { key: "contact_info", label: "Details" },
  { key: "trial_booking", label: "Booking" },
  { key: "confirmation", label: "Done" },
];

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-2 px-6 py-4 bg-muted/30 border-b border-border">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
                data-testid={`step-${step.key}`}
              >
                {isCompleted ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`text-[11px] font-medium hidden md:block ${
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-6 mx-1 transition-all duration-300 ${
                  isCompleted ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
