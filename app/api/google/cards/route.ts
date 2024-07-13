import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(request: Request) {
  if (request.method === 'POST') {
    const body = await request.json();

    const prompt = `${process.env.CARDS_PROMPT}\n\n${body.prompt.trim()}`;

    const { text } = await generateText({
      model: google('models/gemini-1.5-flash-latest'),
      prompt,
    });

    try {
      const result = JSON.parse(text)
      return new Response(JSON.stringify({ result }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, max-age=86400',
        },
      });
    } catch (e) {
      const result = JSON.parse(text
        .replace(/\\n/g, ' ')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\') ?? text
      )
      return new Response(JSON.stringify({ result }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, max-age=86400',
        },
      });
    }
  } else {
    return new Response('Method not allowed. Expected POST.', { status: 405 });
  }
}
export const runtime = 'edge';
