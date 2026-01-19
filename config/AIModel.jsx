// Install dependencies first:
// npm install @google/genai mime

import { GoogleGenAI } from "@google/genai";

/**
 * GenerateEmailTemplateAIModel
 * @param {string} inputText - The user's input or prompt text
 * @returns {Promise<{ texts: string[] }>} Streamed text output
 */
const GenerateEmailTemplateAIModel = async (inputText) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });

    const model = "gemini-flash-latest";

    const input = {
      prompt: inputText,
      type: "email",
    };

    const contents = [
      {
        role: "user",
        parts: [{ text: JSON.stringify(input, null, 2) }],
      },
    ];

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    const texts = [];

    for await (const chunk of response) {
      if (chunk?.text) {
        texts.push(chunk.text);
      }
    }

    return { texts };
  } catch (error) {
    console.error("❌ Error in GenerateEmailTemplateAIModel:", error);
    throw error;
  }
};

export default GenerateEmailTemplateAIModel;
