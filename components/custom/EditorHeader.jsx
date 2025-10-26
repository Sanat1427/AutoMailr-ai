"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Code, Monitor, Smartphone } from "lucide-react";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

function EditorHeader({ viewHTMLCode }) {
  const { screenSize, setScreenSize } = useScreenSize();
  const { templateId } = useParams();
  const { emailTemplate } = useEmailTemplate();

  const saveTemplateMutation = useMutation(api.emailTemplate.saveTemplate);
  const updateTemplateMutation = useMutation(api.emailTemplate.UpdateTemplatelDesign);

  const onSaveTemplate = async () => {
    if (!templateId) {
      toast("Error: Missing template ID");
      return;
    }

    const cleanTemplate = JSON.parse(
      JSON.stringify(emailTemplate, (key, value) => {
        if (key.startsWith("$$")) return undefined;
        return value;
      })
    );

    try {
      // ✅ Try updating first
      const updateResult = await updateTemplateMutation({
        tid: templateId,
        design: cleanTemplate,
      });

      // If template not found, create it
      if (updateResult?.error === "Template not found") {
        await saveTemplateMutation({
          tid: templateId,
          design: cleanTemplate,
          email: "user@example.com", // replace with actual user email
          description: "New template", // optional description
        });
        toast("Email Template created successfully");
      } else {
        toast("Email Template updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast("Failed to save template");
    }
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center">
      <Image src={"/logo.svg"} alt="logo" width={180} height={140} />
      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={() => setScreenSize("desktop")}
          className={`${screenSize == "desktop" && "bg-purple-100 text-primary"} `}
        >
          <Monitor /> Desktop
        </Button>
        <Button
          variant="ghost"
          onClick={() => setScreenSize("mobile")}
          className={`${screenSize == "mobile" && "bg-purple-100 text-primary"} `}
        >
          <Smartphone /> Mobile
        </Button>
      </div>
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className="hover:text-primary"
          onClick={() => viewHTMLCode(true)}
        >
          <Code />
        </Button>
        <Button variant="outline">Send Test Email</Button>
        <Button onClick={onSaveTemplate}>Save Template</Button>
      </div>
    </div>
  );
}

export default EditorHeader;