import { CheckCircle, Mail, Phone, Calendar, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { InsertLead } from "@shared/schema";

interface ConfirmationScreenProps {
  leadData: Partial<InsertLead>;
}

export default function ConfirmationScreen({ leadData }: ConfirmationScreenProps) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-primary" data-testid="icon-success" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-xl mb-2" data-testid="text-confirmation-title">
            {leadData.wantsTrial === "yes" ? "You're Booked!" : "You're All Set!"}
          </h3>
          <p className="text-muted-foreground text-sm">
            {leadData.wantsTrial === "yes"
              ? "Check your email for your trial session confirmation"
              : "Check your email for program details and next steps"}
          </p>
        </div>
      </div>

      <Card className="p-4 space-y-3 bg-muted/30">
        <h4 className="font-semibold text-sm mb-3">Your Details:</h4>
        
        {leadData.name && (
          <div className="flex items-start gap-3 text-sm">
            <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Name</p>
              <p className="text-muted-foreground">{leadData.name}</p>
            </div>
          </div>
        )}

        {leadData.email && (
          <div className="flex items-start gap-3 text-sm">
            <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{leadData.email}</p>
            </div>
          </div>
        )}

        {leadData.phone && (
          <div className="flex items-start gap-3 text-sm">
            <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-muted-foreground">{leadData.phone}</p>
            </div>
          </div>
        )}

        {leadData.trialDate && leadData.trialTime && (
          <div className="flex items-start gap-3 text-sm">
            <Calendar className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Trial Session</p>
              <p className="text-muted-foreground">
                {leadData.trialDate} at {leadData.trialTime}
              </p>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <h4 className="font-semibold text-sm mb-2">Next Steps:</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Check your email for program details and next steps</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>
              {leadData.wantsTrial === "yes"
                ? "We'll send you a calendar invite for your trial session"
                : "We'll follow up within 24 hours with pricing and program details"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Start small, stay consistent - your fitness journey begins now</span>
          </li>
        </ul>
      </Card>

      <p className="text-center text-xs text-muted-foreground italic">
        "Lasting results are built on small, consistent habits."
      </p>
    </div>
  );
}
