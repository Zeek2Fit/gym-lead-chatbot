import OpenAI from "openai";
import { readFileSync } from "fs";
import { join } from "path";

// Load brand bible for system prompt
const brandBible = readFileSync(join(process.cwd(), "BRAND_BIBLE.md"), "utf-8");

const systemPrompt = `You are a conversational assistant for Dad Bod Reset, a fitness coaching program for busy dads.

${brandBible}

## Your Role
You help answer questions about:
- Dad Bod Reset programs and training philosophy
- Nutrition advice (protein targets, meal prep, what to avoid)
- Training splits and workout structure
- Common fitness myths
- How to balance fitness with family life

## Tone & Style
- Warm, relatable, encouraging
- No-BS, direct advice
- Dad humor is welcome
- Short responses (2-3 paragraphs max)
- Never shame anyone's starting point
- Celebrate the decision to start

## What You Don't Do
- Don't give specific medical advice
- Don't promise unrealistic results
- Don't use pushy sales language
- Don't overcomplicate things

Keep responses conversational, practical, and grounded in the Dad Bod Reset philosophy: sustainable progress through stupidly consistent small habits.`;

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
