import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { text, targetLanguage } = await req.json();

        if (!text || !targetLanguage) {
            return NextResponse.json(
                { success: false, error: "Missing 'text' or 'targetLanguage' in request body" },
                { status: 400 }
            );
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        });

        const model = "gemini-flash-latest";

        const prompt = `Translate the following text to ${targetLanguage}. Maintain the original tone, meaning, and any markdown formatting exactly. Return ONLY the translated text:\n\n"${text}"`;

        const contents = [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
        ];

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await ai.models.generateContentStream({
            model,
            contents,
            config,
        });

        let fullText = "";
        for await (const chunk of response) {
            if (chunk.text) {
                fullText += chunk.text;
            }
        }

        return NextResponse.json({ success: true, result: fullText.trim() });
    } catch (e) {
        console.error("AI Translate Error:", e);
        return NextResponse.json(
            { success: false, error: e.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
