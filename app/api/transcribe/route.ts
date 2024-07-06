import { AssemblyAI } from "assemblyai";

export async function POST(request: Request) {
  const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLY as string,
  });

  const body = await request.json();

  try {
    const transcript = await client.transcripts.transcribe({
      audio: body.data,
      speaker_labels: true,
      speech_model: "nano",
    });
    if (transcript.status === "error") {
      console.warn(transcript.error);
    }

    return new Response(JSON.stringify({ data: transcript.text }));
  } catch (error: any) {
    console.log(error);
  }
}
