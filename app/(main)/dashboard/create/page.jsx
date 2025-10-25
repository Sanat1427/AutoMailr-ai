"use client";
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from 'lucide-react';
import AIInputBox from '@/components/custom/AIInputBox';
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useUserDetail } from "@/app/provider";

function Create() {
  const router = useRouter();
  const SaveTemplate = useMutation(api.emailTemplate.saveTemplate);
  const { userDetail } = useUserDetail();

  const handleStartFromScratch = async () => {
    try {
      const tid = uuidv4();

      // 🧱 Create a blank template structure
      const emptyDesign = [];

      // 💾 Save a new empty template for this user
      await SaveTemplate({
        tid,
        design: emptyDesign,
        email: userDetail?.email,
        description: "Untitled Blank Template",
      });

      // 🔄 Navigate to the editor
      router.push("/editor/" + tid);
    } catch (err) {
      console.error("Error starting blank template:", err);
    }
  };

  return (
    <div className="px-10 md:px-28 lg:px-64 xl:px-72 mt-20">
      <div className="flex items-center flex-col">
        <h2 className="font-bold text-3xl text-primary">
          CREATE NEW EMAIL TEMPLATE
        </h2>
        <p className="text-lg text-gray-400 text-center">
          Effortlessly design and customize professional AI-powered email templates with ease.
        </p>

        <Tabs defaultValue="AI" className="w-[500px] mt-10">
          <TabsList>
            <TabsTrigger value="AI">
              Create with AI <Sparkles className="h-5 w-5 mt-2 ml-2" />
            </TabsTrigger>
            <TabsTrigger value="SCRATCH">Start from Scratch</TabsTrigger>
          </TabsList>

          <TabsContent value="AI">
            <AIInputBox />
          </TabsContent>

          <TabsContent value="SCRATCH" className="text-center mt-5">
            <p className="mb-4 text-gray-500">
              Begin designing your email template from a blank canvas.
            </p>
            <Button onClick={handleStartFromScratch}>Open Blank Canvas</Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Create;
