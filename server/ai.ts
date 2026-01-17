import OpenAI from "openai";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { brandName, programName } from "@shared/config";

// Load brand bible for system prompt if it exists
const brandBiblePath = join(process.cwd(), "BRAND_BIBLE.md");
const brandBible = existsSync(brandBiblePath) 
  ? readFileSync(brandBiblePath, "utf-8") 
  : "";

// Configurable system prompt - customize this for your gym/fitness brand
const systemPrompt = `You are a conversational assistant for ${brandName}, a fitness coaching program.

${brandBible}

## Your Role
You help answer questions about:
- ${programName} offerings and training philosophy
- Nutrition advice (protein targets, meal prep, what to avoid)
- Training splits and workout structure
- Common fitness myths
- How to balance fitness with everyday life

## Tone & Style
- Warm, relatable, encouraging
- No-BS, direct advice
- Friendly and approachable
- Short responses (2-3 paragraphs max)
- Never shame anyone's starting point
- Celebrate the decision to start

## What You Don't Do
- Don't give specific medical advice
- Don't promise unrealistic results
- Don't use pushy sales language
- Don't overcomplicate things

Keep responses conversational, practical, and focused on sustainable progress through consistent small habits.`;

export class AIService {
  private openai: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
    
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });
      console.log("✅ AI service initialized with OpenAI");
    } else {
      console.log("⚠️  AI service disabled (no OpenAI API key found)");
    }
  }

  async getChatResponse(userQuestion: string): Promise<string> {
    if (!this.openai) {
      return "I'm not able to answer questions right now, but our team would love to help! Book a free trial session to get personalized advice.";
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuestion },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content || 
        "Hmm, I didn't quite catch that. Could you ask that another way?";
    } catch (error) {
      console.error("OpenAI API error:", error);
      return "Sorry, I had a brain fog moment there. Try asking that again, or book a free session to chat with our team directly!";
    }
  }

  async *getStreamingChatResponse(
    userQuestion: string
  ): AsyncIterable<string> {
    if (!this.openai) {
      yield "I'm not able to answer questions right now, but our team would love to help! Book a free trial session to get personalized advice.";
      return;
    }

    try {
      const stream = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuestion },
        ],
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
        }
      }
    } catch (error) {
      console.error("OpenAI streaming error:", error);
      yield "Sorry, I had a brain fog moment there. Try asking that again, or book a free session to chat with our team directly!";
    }
  }
}

export const aiService = new AIService();
