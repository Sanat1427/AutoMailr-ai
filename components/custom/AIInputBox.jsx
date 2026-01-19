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
import { Loader2, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import JSON5 from "json5"; // npm install json5
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AIInputBox() {
  const [userInput, setUserInput] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(false);
  const SaveTemplate = useMutation(api.emailTemplate.saveTemplate);
  const { userDetail } = useUserDetail();
  const router = useRouter();

  const onGenerate = async () => {
    if (!userInput) return;



    const PROMPT = Prompt.EMAIL_PROMPT + `\n- Category: ${category}` + "\n-" + userInput;
    const tid = uuidv4();
    setLoading(true);

    try {
      const result = await axios.post("/api/ai-email-generate", { prompt: PROMPT });
      let raw = result.data?.data;

      if (!raw) throw new Error("AI returned empty data");

      // 🧹 Step 1: Clean raw AI text
      let cleaned = raw.replace(/```json|```/g, "").trim();
      cleaned = cleaned.replace(/(\d)\s+(\d)/g, "$1$2");
      cleaned = cleaned.replace(/"(\s+)?(\w+)(\s+)?"\s*:/g, '"$2":');

      let cleanDesign;
      try {
        // 🧩 Step 2: Parse safely
        cleanDesign = JSON5.parse(cleaned);
        if (!Array.isArray(cleanDesign)) cleanDesign = [cleanDesign];

        // 🧠 Step 3: Filter and normalize textarea → content
        cleanDesign = cleanDesign
          .filter((item) => item && typeof item === "object")
          .map((block) => {
            // 🆔 Force unique ID for the container block
            block.id = uuidv4();

            // Handle nested "0", "1" objects (columns)
            Object.keys(block).forEach((key) => {
              const inner = block[key];

              if (inner && typeof inner === "object") {
                // 🆔 Force unique ID for inner elements
                inner.id = uuidv4();

                if (inner.textarea) {
                  inner.content = inner.textarea;
                  delete inner.textarea;
                }
              }
            });

            // Handle top-level textarea (if any)
            if (block.textarea) {
              block.content = block.textarea;
              delete block.textarea;
            }

            return block;
          });

        if (cleanDesign.length === 0) {
          throw new Error("AI returned empty or invalid design array");
        }
      } catch (err) {
        console.error("❌ Failed to parse AI design JSON:", err);
        return;
      }

      // 💾 Step 4: Save template to Convex
      await SaveTemplate({
        tid,
        design: cleanDesign,
        email: userDetail?.email,
        description: userInput,
      });



      // 🔄 Step 5: Navigate to editor
      router.push("/editor/" + tid);
    } catch (e) {
      console.error("Error generating template:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">What would you like to build?</label>
        <p className="text-sm text-gray-500 mb-4">Select a category and describe your ideal email.</p>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full text-base py-6 border-gray-200 focus:ring-purple-500">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Marketing">Marketing / Sales</SelectItem>
            <SelectItem value="Newsletter">Newsletter</SelectItem>
            <SelectItem value="Professional">Professional / Corporate</SelectItem>
            <SelectItem value="Event">Event Invitation</SelectItem>
            <SelectItem value="Job Application">Job Application</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative mb-6">
        <Textarea
          placeholder="e.g. A promotional email for our summer sale with a 20% discount code..."
          rows={6}
          className="text-lg p-4 border-gray-200 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition-all"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
      </div>

      <Button
        className="w-full py-6 text-lg font-bold tracking-wide bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.01] hover:shadow-lg transition-all duration-200"
        disabled={!userInput || loading}
        onClick={onGenerate}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" /> Casting Spell...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" /> GENERATE DESIGN
          </span>
        )}
      </Button>
    </div>
  );
}

export default AIInputBox;
