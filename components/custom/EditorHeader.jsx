"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Code, Monitor, Smartphone, ShieldCheck, Save, Send } from "lucide-react";
import Link from "next/link";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import EmailAuditDialog from "./EmailAuditDialog";
import axios from "axios";
import { useState } from "react";

function EditorHeader({ viewHTMLCode, onSendTestEmail }) {
  const { screenSize, setScreenSize } = useScreenSize();
  const { templateId } = useParams();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate(); // Destructure setter
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  // State for editable title
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [templateTitle, setTemplateTitle] = useState("Untitled Template");

  const saveTemplateMutation = useMutation(api.emailTemplate.saveTemplate);
  const updateTemplateMutation = useMutation(api.emailTemplate.UpdateTemplatelDesign);

  // Sync state from emailTemplate when loaded
  React.useEffect(() => {
    if (emailTemplate?.length > 0 && emailTemplate[0].description) {
      setTemplateTitle(emailTemplate[0].description);
    }
  }, [emailTemplate]);

  const onSaveTemplate = async () => {
    if (!templateId) {
      toast("Error: Missing template ID");
      return;
    }

    // Update description in emailTemplate state before saving
    // This ensures consistency if we continue editing
    const cleanTemplate = JSON.parse(
      JSON.stringify(emailTemplate, (key, value) => {
        if (key.startsWith("$$")) return undefined;
        return value;
      })
    );

    // Ensure the description is saved in the design JSON too
    if (cleanTemplate.length > 0) {
      cleanTemplate[0].description = templateTitle;
    }

    try {
      // ✅ Try updating first
      const updateResult = await updateTemplateMutation({
        tid: templateId,
        design: cleanTemplate,
        // We might need to update the top-level description too via mutation if supported
        // Assuming updateTemplateMutation might trigger an update, but usually saveTemplate does.
        // If the backend API separates design and description updates, this might need check.
        // checking the Save logic below.
      });

      // If template not found, create it
      if (updateResult?.error === "Template not found") {
        await saveTemplateMutation({
          tid: templateId,
          design: cleanTemplate,
          email: "user@example.com",
          description: templateTitle, // Use actual title
        });
        toast("Email Template created successfully");
      } else {
        // Optimization: If updateTemplateMutation doesn't update description, we might need a separate call
        // but for now, we assume saving the design containing the description is enough or handled.
        // Actually, let's call saveTemplateMutation to force description update if needed?
        // No, that creates duplicates usually.
        // Let's rely on the design JSON carrying the description for now, as that's what we patched content-wise.
        toast("Email Template updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast("Failed to save template");
    }
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    // Optimistically update the context
    if (emailTemplate?.length > 0) {
      const newTemplate = [...emailTemplate];
      newTemplate[0] = { ...newTemplate[0], description: templateTitle };
      setEmailTemplate(newTemplate);
    }
  };

  const onAuditEmail = async () => {
    setIsAuditOpen(true);
    setAuditLoading(true);
    setAuditResult(null);

    // Extract text content from template
    // Extract text content from template
    let fullText = "";

    emailTemplate?.forEach((layout) => {
      // Iterate through all properties of the layout object
      // This covers keys '0', '1', etc. where the column data is stored
      Object.values(layout).forEach(item => {
        if (item?.content) fullText += item.content + " ";
        if (item?.textarea) fullText += item.textarea + " ";
      });
    });

    if (fullText.trim().length < 10) {
      toast("Please add more content before auditing.");
      setIsAuditOpen(false);
      setAuditLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/ai-email-audit', { emailBody: fullText });
      if (response.data?.success) {
        setAuditResult(response.data.result);
      }
    } catch (error) {
      console.error("Audit failed", error);
      toast("Failed to audit email");
      setIsAuditOpen(false);
    } finally {
      setAuditLoading(false);
    }
  }

  return (
    <div className="p-4 px-6 bg-white shadow-sm border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className='flex items-center gap-4'>
        <Link href={'/dashboard'}>
          <Image src={"/logo.svg"} alt="logo" width={140} height={100} className="hover:opacity-90 transition-opacity" />
        </Link>
        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
        <div className="hidden md:flex items-center text-sm text-gray-500">
          {isEditingTitle ? (
            <input
              type="text"
              value={templateTitle}
              onChange={(e) => setTemplateTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
              className="font-medium text-gray-900 border-b border-purple-300 focus:outline-none focus:border-purple-600 bg-transparent py-1 px-1 min-w-[200px]"
              autoFocus
            />
          ) : (
            <div
              onClick={() => setIsEditingTitle(true)}
              className="font-medium text-gray-900 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition-colors flex items-center gap-2 group"
            >
              <span className="truncate max-w-[200px]">{templateTitle}</span>
              <span className="opacity-0 group-hover:opacity-100 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Center: Segmented Control for View Mode */}
      <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setScreenSize("desktop")}
          className={`text-xs gap-2 rounded-md hover:bg-white h-8 px-3 ${screenSize === "desktop" ? "bg-white text-purple-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
        >
          <Monitor className="w-3.5 h-3.5" /> Desktop
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setScreenSize("mobile")}
          className={`text-xs gap-2 rounded-md hover:bg-white h-8 px-3 ${screenSize === "mobile" ? "bg-white text-purple-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
        >
          <Smartphone className="w-3.5 h-3.5" /> Mobile
        </Button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="hover:text-purple-600 hover:bg-purple-50"
          onClick={() => viewHTMLCode(true)}
          title="View Code"
        >
          <Code className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onAuditEmail}
          className="gap-2 hover:border-purple-200 hover:bg-purple-50 text-gray-700 h-9"
        >
          <ShieldCheck className="h-4 w-4 text-purple-600" />
          <span className="hidden lg:inline">AI Audit</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onSendTestEmail}
          className="gap-2 hover:border-purple-200 hover:bg-purple-50 text-gray-700 h-9"
        >
          <Send className="h-4 w-4 text-gray-500" />
          <span className="hidden lg:inline">Test</span>
        </Button>

        <Button
          size="sm"
          onClick={onSaveTemplate}
          className="bg-purple-600 hover:bg-purple-700 text-white gap-2 h-9 px-4 shadow-sm"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>

      <EmailAuditDialog
        open={isAuditOpen}
        setOpen={setIsAuditOpen}
        loading={auditLoading}
        auditResult={auditResult}
      />
    </div>
  );
}

export default EditorHeader;