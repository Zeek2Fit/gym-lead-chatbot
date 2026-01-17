import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { Dumbbell, Target, Clock, Users } from "lucide-react";
import { Link } from "wouter";
import { brandName } from "@shared/config";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Dumbbell className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-heading font-bold text-xl">{brandName}</h1>
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
            Start Your Fitness Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sustainable fitness and strength training designed for real results. No quick fixes, just proven methods that work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Goal-Focused Training</h3>
            <p className="text-muted-foreground">
              Personalized programs designed around your specific fitness goals
            </p>
          </div>

          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Efficient Workouts</h3>
            <p className="text-muted-foreground">
              Time-effective sessions designed for busy schedules - real results without living in the gym
            </p>
          </div>

          <div className="text-center p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Expert Coaching</h3>
            <p className="text-muted-foreground">
              Professional guidance and support to help you reach your full potential
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
