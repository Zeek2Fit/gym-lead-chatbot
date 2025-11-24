import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { emailService } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      // Send email notification to gym staff (non-blocking)
      emailService.sendNewLeadNotification(lead).catch(err => {
        console.error("Email notification failed (non-blocking):", err);
      });
      
      res.status(201).json(lead);
    } catch (error: any) {
      console.error("Error creating lead:", error);
      if (error.name === "ZodError") {
        res.status(400).json({ error: "Validation failed", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create lead", details: error.message });
      }
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error: any) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads", details: error.message });
    }
  });

  app.get("/api/leads/export", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      
      const headers = [
        "Name",
        "Email",
        "Phone",
        "Fitness Level",
        "Goal",
        "Timeline",
        "Budget",
        "Wants Trial",
        "Trial Date",
        "Trial Time",
        "Created At",
      ];
      
      const rows = leads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.fitnessLevel,
        lead.mainGoal,
        lead.timeline,
        lead.budget,
        lead.wantsTrial,
        lead.trialDate || "",
        lead.trialTime || "",
        new Date(lead.createdAt).toLocaleDateString(),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="dad-bod-reset-leads-${new Date().toISOString().split("T")[0]}.csv"`
      );
      res.send(csvContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to export leads" });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const lead = await storage.getLeadById(req.params.id);
      if (!lead) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }
      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lead" });
    }
  });

  // AI chat endpoint for answering questions
  app.post("/api/chat", async (req, res) => {
    try {
      const { question } = req.body;
      
      if (!question || typeof question !== "string") {
        res.status(400).json({ error: "Question is required" });
        return;
      }

      const { aiService } = await import("./ai");
      const answer = await aiService.getChatResponse(question);
      
      res.json({ answer });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process question" });
    }
  });

  // AI chat streaming endpoint
  app.post("/api/chat/stream", async (req, res) => {
    try {
      const { question } = req.body;
      
      if (!question || typeof question !== "string") {
        res.status(400).json({ error: "Question is required" });
        return;
      }

      const { aiService } = await import("./ai");
      const stream = await aiService.getStreamingChatResponse(question);
      
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const chunk of stream) {
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
      }
      
      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error: any) {
      console.error("Chat streaming error:", error);
      res.status(500).json({ error: "Failed to stream response" });
    }
  });

  // Analytics endpoints
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const { insertAnalyticsEventSchema } = await import("@shared/schema");
      const validatedEvent = insertAnalyticsEventSchema.parse(req.body);
      const event = await storage.trackEvent(validatedEvent);
      res.json(event);
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ error: "Invalid event data", details: error.errors });
        return;
      }
      console.error("Analytics tracking error:", error);
      res.status(500).json({ error: "Failed to track event" });
    }
  });

  app.get("/api/analytics/stats", async (req, res) => {
    try {
      const stats = await storage.getAnalyticsStats();
      res.json(stats);
    } catch (error) {
      console.error("Analytics stats error:", error);
      res.status(500).json({ error: "Failed to fetch analytics stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
