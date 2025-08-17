import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
}
if (!process.env.GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY is not set in environment variables');
}

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req: Request) {
    try {
        const { model, prompt, bookContent, chatHistory } = await req.json();

        let stream: any;
        const systemPrompt = "Anda adalah asisten AI yang ramah, sopan, dan sangat menguasai bahasa Indonesia. Anda akan menjawab pertanyaan berdasarkan konten buku yang diberikan. Jika pertanyaan di luar konteks buku, beri tahu pengguna bahwa Anda hanya dapat menjawab pertanyaan terkait buku ini. ";

        if (model.includes('ibm-granite')) {
            // Gabungkan konten buku, riwayat chat, dan prompt baru ke dalam satu string
            const context = bookContent ? `Berikut adalah isi buku yang Anda miliki:\n\n---\n${bookContent}\n---\n` : '';
            const formattedChatHistory = chatHistory.map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`).join('\n');

            const fullPrompt = `${systemPrompt}\n\n${context}\n${formattedChatHistory}\nUser: ${prompt}\n\nAssistant:`;

            stream = await replicate.stream(model, { input: { prompt: fullPrompt } });
            return new NextResponse(
                new ReadableStream({
                    async start(controller) {
                        const encoder = new TextEncoder();
                        for await (const chunk of stream) {
                            controller.enqueue(encoder.encode(chunk.toString()));
                        }
                        controller.close();
                    },
                })
            );
        } else if (model.includes('gemini-1.5-flash')) {
            const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await geminiModel.generateContentStream({
                contents: [
                    { role: "user", parts: [{ text: systemPrompt }] },
                    { role: "user", parts: [{ text: `Isi Buku:\n${bookContent}` }] },
                    ...chatHistory.map((msg: any) => ({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.text }]
                    })),
                    { role: "user", parts: [{ text: prompt }] }
                ],
            });

            const readableStream = new ReadableStream({
                async start(controller) {
                    const encoder = new TextEncoder();
                    for await (const chunk of result.stream) {
                        controller.enqueue(encoder.encode(chunk.text()));
                    }
                    controller.close();
                }
            });
            return new NextResponse(readableStream);


        } else {
            return NextResponse.json({ error: 'Model not supported' }, { status: 400 });
        }

    } catch (error) {
        console.error('Error in API Route:', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}