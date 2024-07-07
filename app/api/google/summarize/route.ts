import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request: Request) {
  if (request.method === "POST") {
    const body = await request.json();

    if(body.prompt.length < 100) return new Response("This doesn't seem like a lecture . _.", { status: 400 })

    const prompt = process.env.SUMMARIZE_PROMPT + "\n\n" + body.prompt.trim()

    const { text } = await generateText({
      model: google("models/gemini-1.5-flash-latest"),
      prompt: prompt,
    });


    return new Response(JSON.stringify({ result: text }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "private, max-age=86400",
      },
    });
  } else {
    return new Response("Method not allowed. Expected POST.", { status: 405 });
  }
}
export const runtime = "edge";
