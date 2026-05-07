import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const getOpenAIClient = () => {
  return new OpenAI({ 
    apiKey: process.env.GROQ_API_KEY || 'dummy-key',
    baseURL: 'https://api.groq.com/openai/v1',
  });
};

const SYSTEM_PROMPT = `You are simulating a deep, realistic therapy session between a professional Therapist and a college Student.

Language Detection:
- Detect the language of the user's input (English, Hindi, or Marathi).
- YOU MUST generate the entire conversation in that exact same language.

Structure & Behavior:
- You are an empathetic Therapist.
- DO NOT give solutions immediately. 
- ALWAYS ask open-ended questions to explore feelings first.
- The Student responds with emotional honesty.

Session Length:
- Generate a FULL session transcript of exactly 20-25 exchanges (back-and-forth).
- Each exchange consists of:
  1. Therapist: (Observation, validation, reflection, or question)
  2. Student: (Emotional response, reflection, or follow-up)

Format:
- Respond strictly with a JSON object.
- The JSON must have an 'agents' array with 20-25 objects.
- Each object must have 'agent' ("Therapist" or "Student") and 'message' (the text).

Example JSON:
{
  "agents": [
    { "agent": "Therapist", "message": "..." },
    { "agent": "Student", "message": "..." },
    ... (20-25 times)
  ]
}`;

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { text, history = [], persona } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid input text' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 });
    }

    const enrichedText = persona ? `Student Persona: ${persona}. User Message: ${text}` : text;

    const historyMessages = (history as ConversationMessage[]).map((h) => ({
      role: h.role as 'user' | 'assistant',
      content: h.content,
    }));

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...historyMessages,
        { role: 'user', content: enrichedText },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = response.choices[0].message.content || '{"agents": []}';
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse JSON", content);
      return NextResponse.json({ error: 'Invalid response from AI' }, { status: 500 });
    }

    const agents = parsed.agents || [];
    const finalAnswer = agents
      .map((a: { agent: string; message: string }) => `${a.agent} says: ${a.message}`)
      .join(' ... ');

    return NextResponse.json({
      response: finalAnswer,
      answer: finalAnswer,
      agents: agents
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Agent processing failed';
    console.error('[Agent API Error]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
