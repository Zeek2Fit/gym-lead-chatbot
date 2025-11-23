import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone } from "lucide-react";
import type { Lead } from "@shared/schema";

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
}

export default function LeadsTable({ leads, isLoading }: LeadsTableProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </Card>
    );
  }

  if (leads.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No leads yet</h3>
          <p className="text-muted-foreground">
            Leads will appear here when someone completes the chatbot conversation
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {leads.map((lead, index) => (
        <Card key={lead.id} className="p-6 hover-elevate" data-testid={`lead-card-${index}`}>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Contact</p>
              <p className="font-semibold" data-testid={`lead-name-${index}`}>
                {lead.name}
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Mail className="h-3 w-3" />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>{lead.phone}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Goal & Level</p>
              <p className="text-sm font-medium mb-2" data-testid={`lead-goal-${index}`}>
                {lead.mainGoal}
              </p>
              <Badge variant="secondary" className="text-xs">
                {lead.fitnessLevel.replace("_", " ")}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Timeline & Budget</p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">
                  {lead.timeline.replace("_", " ")}
                </Badge>
                <Badge variant="outline" className="text-xs ml-2">
                  {lead.budget}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Trial Session</p>
              {lead.wantsTrial === "yes" ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3 text-primary" />
                    <span className="font-medium text-primary">Booked</span>
                  </div>
                  {lead.trialDate && lead.trialTime && (
                    <p className="text-xs text-muted-foreground">
                      {lead.trialDate}
                      <br />
                      {lead.trialTime}
                    </p>
                  )}
                </div>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Not interested
                </Badge>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(lead.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
