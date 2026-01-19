import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { text, option } = await req.json();

        if (!text) {
            return NextResponse.json(
                { success: false, error: "Missing 'text' in request body" },
                { status: 400 }
            );
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        });

        const model = "gemini-flash-latest";

        let prompt = `Rewrite the following text to be more professional, concise, and grammatically correct. Return ONLY the rewritten text, no explanations or quotes:\n\n"${text}"`;

        if (option === 'short') {
            prompt = `Rewrite the following text to be much shorter and concise while retaining the core message. Return ONLY the rewritten text:\n\n"${text}"`;
        } else if (option === 'long') {
            prompt = `Rewrite the following text to be more descriptive, detailed, and expanded. Return ONLY the rewritten text:\n\n"${text}"`;
        } else if (option === 'professional') {
            prompt = `Rewrite the following text to be highly professional, formal, and polished. Return ONLY the rewritten text:\n\n"${text}"`;
        } else if (option === 'friendly') {
            prompt = `Rewrite the following text to be friendly, engaging, and warm. Return ONLY the rewritten text:\n\n"${text}"`;
        }

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

        const result = fullText;

        return NextResponse.json({ success: true, result: result.trim() });
    } catch (e) {
        console.error("AI Text Improve Error:", e);
        return NextResponse.json(
            { success: false, error: e.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
