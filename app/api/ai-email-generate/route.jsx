import GenerateEmailTemplateAIModel from "@/config/AIModel.jsx";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Required if using Node modules

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Missing 'prompt' in request body" },
        { status: 400 }
      );
    }

    // Call the AI model function
    const result = await GenerateEmailTemplateAIModel(prompt);

    // Combine all text chunks
    const aiResp = result.texts.join(" ");
    console.log("AI Response:", aiResp);

    // TODO: save aiResp to DB if needed

    // Return to frontend
    return NextResponse.json({ success: true, data: aiResp });
  } catch (e) {
    console.error("AI API Error:", e);
    return NextResponse.json(
      { success: false, error: e.message || "Internal Server Error" },
      { status: 500 }
    );
   }
}
