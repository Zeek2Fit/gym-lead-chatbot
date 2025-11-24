import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Lead qualification data schema
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  fitnessLevel: text("fitness_level").notNull(), // "beginner", "some_experience", "advanced"
  mainGoal: text("main_goal").notNull(), // Free text input
  timeline: text("timeline").notNull(), // "this_week", "within_month", "just_exploring"
  budget: text("budget").notNull(), // "$50-100", "$100-200", "$200+", "not_sure"
  wantsTrial: text("wants_trial").notNull(), // "yes", "no"
  trialDate: text("trial_date"), // Optional: ISO date string
  trialTime: text("trial_time"), // Optional: "9:00 AM", etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Analytics events tracking
export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(), // "widget_open", "conversation_start", "conversation_complete", "trial_booked"
  sessionId: text("session_id"), // Optional: group events by session
  stepReached: text("step_reached"), // Optional: which step in conversation
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

// Chat conversation state (for frontend only - not persisted to DB)
export type ConversationStep = 
  | "greeting"
  | "fitness_level"
  | "main_goal"
  | "timeline"
  | "budget"
  | "contact_info"
  | "trial_booking"
  | "confirmation";

export interface ChatMessage {
  id: string;
  role: "bot" | "user";
  content: string;
  timestamp: Date;
}

export interface ConversationState {
  currentStep: ConversationStep;
  messages: ChatMessage[];
  leadData: Partial<InsertLead>;
}
