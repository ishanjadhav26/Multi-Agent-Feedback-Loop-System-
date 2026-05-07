import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ELEVENLABS_VOICE_ID = '21m00Tcm4TlvDq8ikWAM';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid input text' }, { status: 400 });
    }

    // If no ElevenLabs key, return a signal to use browser TTS
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json({ fallback: true, text }, { status: 200 });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          Accept: 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ElevenLabs Error]', response.status, errorText);
      // Fallback to browser TTS on API error
      return NextResponse.json({ fallback: true, text }, { status: 200 });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'TTS generation failed';
    console.error('[TTS API Error]', error);
    // Fallback to browser TTS
    try {
      const { text } = await req.json().catch(() => ({ text: '' }));
      if (text) return NextResponse.json({ fallback: true, text }, { status: 200 });
    } catch { /* ignore */ }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
