import { TopicData, Topics } from "@/types/Topic";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request: Request) {
  if (request.method === "POST") {
    const body = await request.json();

    const prompt = process.env.TOPICS_PROMPT + "\n\n" + body.prompt.trim();

    const { text } = await generateText({
      model: google("models/gemini-1.5-flash-latest"),
      prompt: prompt,
    });

    try {
      const json = JSON.parse(text);

      const transformed = {
        result: {
          title: json.title,
          description: json.description,
          topics: json.topics.map((item: Topics) => ({
            pageNo: item.pageNo,
            topic: item.topic,
            subtopics: item.subtopics
          })),
        }
      };


     
      return new Response(JSON.stringify(transformed), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, max-age=86400",
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ result: text }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, max-age=86400",
        },
      });
    }
  } else {
    return new Response("Method not allowed. Expected POST.", { status: 405 });
  }
}
export const runtime = "edge";
