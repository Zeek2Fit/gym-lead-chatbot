import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { Dumbbell, Target, Clock, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-heading font-bold text-xl">Dad Bod Reset</h1>
          </div>
          <Link href="/admin">
            <Button variant="outline" data-testid="link-admin">
              Admin Panel
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Transform Your Dad Bod
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sustainable fat loss and muscle gain for busy dads. No quick fixes, just real compound lifts and whole foods.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">4 Pillars System</h3>
            <p className="text-muted-foreground">
              Sleep, Steps, Strength, and Smart Fuel - the foundation of lasting transformation
            </p>
          </div>

          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Under 45 Minutes</h3>
            <p className="text-muted-foreground">
              Workouts designed for busy dads - real results without living in the gym
            </p>
          </div>

          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Dad-First Approach</h3>
            <p className="text-muted-foreground">
              Training around nap schedules, meals kids will eat, and zero guilt
            </p>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 md:p-12 text-center">
          <h3 className="font-heading font-bold text-2xl mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Click the chat button in the bottom right to tell us about your goals. We'll help you find the perfect program and get you a free trial session.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Free 7-Day Kickstart</span>
            <span>•</span>
            <span>Free Trial Session</span>
            <span>•</span>
            <span>24hr Response Time</span>
          </div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}
