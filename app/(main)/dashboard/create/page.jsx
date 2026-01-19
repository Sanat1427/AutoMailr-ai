"use client";
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Layout, PenTool } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50/50 py-10 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-bold text-4xl text-gray-900 mb-3">
            Start Your New Campaign
          </h2>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            Choose how you want to begin. Let AI handle the heavy lifting or design pixel-perfect layouts from scratch.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <Tabs defaultValue="AI" className="w-full">
            <div className="p-4 border-b border-gray-100 bg-gray-50/30">
              <TabsList className="grid w-full grid-cols-2 h-14 bg-gray-100/80 p-1 rounded-xl">
                <TabsTrigger value="AI" className="rounded-lg text-base data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm transition-all">
                  <Sparkles className="h-4 w-4 mr-2" /> Create with AI
                </TabsTrigger>
                <TabsTrigger value="SCRATCH" className="rounded-lg text-base data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all">
                  <PenTool className="h-4 w-4 mr-2" /> Start from Scratch
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 md:p-10">
              <TabsContent value="AI" className="m-0 focus-visible:outline-none">
                <AIInputBox />
              </TabsContent>

              <TabsContent value="SCRATCH" className="m-0 focus-visible:outline-none text-center py-10">
                <div className="max-w-md mx-auto flex flex-col items-center">
                  <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-gray-200">
                    <Layout className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Blank Canvas</h3>
                  <p className="text-gray-500 mb-8 max-w-sm">
                    Prefer full control? Start with a blank slate and use our drag-and-drop builder to design exactly what you need.
                  </p>
                  <Button
                    onClick={handleStartFromScratch}
                    variant="outline"
                    className="h-12 px-8 text-base hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all border-gray-300"
                  >
                    Open Blank Canvas
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Create;
