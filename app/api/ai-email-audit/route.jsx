import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { emailBody } = await req.json();

        if (!emailBody) {
            return NextResponse.json(
                { success: false, error: "Missing 'emailBody' in request body" },
                { status: 400 }
            );
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        });

        const model = "gemini-flash-latest";

        const prompt = `Analyze the following email content for spam triggers and sentiment. 
        Return a valid JSON object with the following structure (do not return markdown, just the raw JSON):
        {
            "spamScore": number (0-100, where 100 is definitely spam),
            "sentiment": string (e.g., "Urgent", "Friendly", "Professional", "Aggressive"),
            "spamKeywords": string[] (list of specific words or phrases in the text that trigger spam filters),
            "suggestions": string[] (list of actionable advice to improve the email)
        }
        
        Email Content:
        "${emailBody}"`;

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

        console.log("Raw AI Response:", fullText);

        let analysis;
        try {
            const jsonStart = fullText.indexOf('{');
            const jsonEnd = fullText.lastIndexOf('}');

            if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonString = fullText.substring(jsonStart, jsonEnd + 1);
                analysis = JSON.parse(jsonString);
            } else {
                throw new Error("No JSON object found in response");
            }
        } catch (parseError) {
            console.error("JSON Parsing failed:", parseError);
            return NextResponse.json(
                { success: false, error: "AI response format error", raw: fullText },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, result: analysis });
    } catch (e) {
        console.error("AI Audit Error:", e);
        const isQuotaError = e.message?.includes('429') || e.message?.includes('quota') || e.message?.includes('RESOURCE_EXHAUSTED');

        return NextResponse.json(
            {
                success: false,
                error: isQuotaError ? "AI Quota Exceeded. Please try again in 1 minute." : (e.message || "Internal Server Error"),
                isQuota: isQuotaError
            },
            { status: isQuotaError ? 429 : 500 }
        );
    }
}
