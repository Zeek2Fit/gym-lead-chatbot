import { 
  type Lead, 
  type InsertLead, 
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  leads,
  analyticsEvents 
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { desc, eq, sql, count } from "drizzle-orm";
import ws from "ws";

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

export interface AnalyticsStats {
  totalWidgetOpens: number;
  totalConversationStarts: number;
  totalConversationCompletes: number;
  totalTrialsBooked: number;
  conversionRate: number; // percentage of widget opens that complete
  bookingRate: number; // percentage of completions that book trials
}

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  getLeadById(id: string): Promise<Lead | undefined>;
  trackEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsStats(): Promise<AnalyticsStats>;
}

export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL environment variable is required for database connection. " +
        "Please ensure the database is provisioned and DATABASE_URL is set."
      );
    }
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await this.db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await this.db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    const [lead] = await this.db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async trackEvent(insertEvent: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [event] = await this.db.insert(analyticsEvents).values(insertEvent).returning();
    return event;
  }

  async getAnalyticsStats(): Promise<AnalyticsStats> {
    const [widgetOpens] = await this.db
      .select({ count: count() })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, "widget_open"));

    const [conversationStarts] = await this.db
      .select({ count: count() })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, "conversation_start"));

    const [conversationCompletes] = await this.db
      .select({ count: count() })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, "conversation_complete"));

    const [trialsBooked] = await this.db
      .select({ count: count() })
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, "trial_booked"));

    const totalWidgetOpens = widgetOpens?.count ?? 0;
    const totalConversationStarts = conversationStarts?.count ?? 0;
    const totalConversationCompletes = conversationCompletes?.count ?? 0;
    const totalTrialsBooked = trialsBooked?.count ?? 0;

    const conversionRate = totalWidgetOpens > 0 
      ? (totalConversationCompletes / totalWidgetOpens) * 100 
      : 0;
    
    const bookingRate = totalConversationCompletes > 0
      ? (totalTrialsBooked / totalConversationCompletes) * 100
      : 0;

    return {
      totalWidgetOpens,
      totalConversationStarts,
      totalConversationCompletes,
      totalTrialsBooked,
      conversionRate,
      bookingRate,
    };
  }
}

export const storage = new DatabaseStorage();
