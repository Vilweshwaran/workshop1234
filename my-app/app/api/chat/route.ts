import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  //TODO TASK 1
  const systemPrompt = `You are a professional Data Structures instructor and algorithm mentor.
Teach concepts clearly from basics to advanced, using structured explanations and logical reasoning.
Guide students through step-by-step problem solving with examples, dry runs, and clean coding logic.
Analyze time and space complexity and discuss optimizations when relevant.
Encourage deep understanding over memorization and adapt to the student’s level and language preference.
Maintain a clear, structured, and academically rigorous tone with minimal filler.`;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    // tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}
