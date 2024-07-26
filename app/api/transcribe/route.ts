import { AssemblyAI } from 'assemblyai';

export async function POST(request: Request) {
  const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLY as string,
  });

  if (!process.env.ASSEMBLY) {
    return new Response(JSON.stringify({ error: 'AssemblyAI API key is not set.' }), { status: 500 });
  }

  try {
    const body = await request.json();

    if (!body.data) {
      return new Response(JSON.stringify({ error: 'Audio data is missing' }), { status: 400 });
    }

    const transcript = await client.transcripts.transcribe({
      audio: body.data,
      speaker_labels: true,
      speech_model: 'nano',
    });

    if (transcript.status === 'error') {
      console.warn(transcript.error);
      return new Response(JSON.stringify({ error: transcript.error }), { status: 500 });
    }

    return new Response(JSON.stringify({ data: transcript.text }));
  } catch (error: any) {
    console.error('Transcription error:', error);
    return new Response(JSON.stringify({ error: 'Transcription failed' }), { status: 500 });
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
}
