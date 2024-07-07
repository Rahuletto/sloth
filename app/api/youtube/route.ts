import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { getSubtitles } from "youtube-caption-extractor";

export async function POST(request: Request) {
  if (request.method === "POST") {
    const body = await request.json();
    let transcription = "";

    const videoUrl = body.video;
    const videoIdMatch = videoUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      return new Response(JSON.stringify({ error: "Invalid YouTube URL" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, max-age=86400",
        },
      });
    }

    const subtitle = await getSubtitles({ videoID: videoId, lang: "en" });

    subtitle.map((sub) => {
      transcription += sub.text;
    });

    const prompt = process.env.SUMMARIZE_PROMPT + "\n\n" + transcription.trim();

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
