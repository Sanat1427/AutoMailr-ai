"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUserDetail } from "@/app/provider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import JSON5 from "json5"; // npm install json5

function AIInputBox() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const SaveTemplate = useMutation(api.emailTemplate.saveTemplate);
  const { userDetail } = useUserDetail();
  const router = useRouter();

  const onGenerate = async () => {
    if (!userInput) return;

    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    const tid = uuidv4();
    setLoading(true);

    try {
      const result = await axios.post("/api/ai-email-generate", { prompt: PROMPT });
      let raw = result.data?.data;

      if (!raw) throw new Error("AI returned empty data");

      // 1️⃣ Remove code block and trim
      let cleaned = raw.replace(/```json|```/g, "").trim();

      // 2️⃣ Merge numbers that AI added spaces in
      cleaned = cleaned.replace(/(\d)\s+(\d)/g, "$1$2");

      // 3️⃣ Trim spaces from keys
      cleaned = cleaned.replace(/"(\s+)?(\w+)(\s+)?"\s*:/g, '"$2":');

      let cleanDesign;
      try {
        // 4️⃣ Parse using JSON5 (handles trailing commas, etc.)
        cleanDesign = JSON5.parse(cleaned);

        // 5️⃣ Ensure it's an array
        if (!Array.isArray(cleanDesign)) cleanDesign = [cleanDesign];

        // 6️⃣ Filter out invalid objects
        cleanDesign = cleanDesign.filter((item) => item && typeof item === "object");

        if (cleanDesign.length === 0) {
          throw new Error("AI returned empty or invalid design array");
        }
      } catch (err) {
        console.error("Failed to parse AI design JSON:", err);
        return;
      }

      // Save template to Convex
      await SaveTemplate({
        tid,
        design: cleanDesign,
        email: userDetail?.email,
        description: userInput,
      });

      console.log("Template saved successfully!");

      // Navigate to editor
      router.push("/editor/" + tid);
    } catch (e) {
      console.error("Error generating template:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p className="mb-2">Provide details about the email template</p>
      <Textarea
        placeholder="Start Writing here"
        rows={5}
        className="text-xl"
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
      />
      <Button
        className="w-full mt-7"
        disabled={!userInput || loading}
        onClick={onGenerate}
      >
        {loading ? (
          <span className="flex gap-2">
            <Loader2 className="animate-spin" /> Please Wait ....
          </span>
        ) : (
          "GENERATE"
        )}
      </Button>
    </div>
  );
}

export default AIInputBox;
