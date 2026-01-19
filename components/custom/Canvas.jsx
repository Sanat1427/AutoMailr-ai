"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDragElementLayout, useScreenSize, useEmailTemplate } from "@/app/provider";
import ColumnLayout from "../LayoutElements/ColumnLayout";
import ViewHtmlDialog from "./ViewHtmlDialog";


import SendEmailDialog from "./SendEmailDialog";
import { LayoutTemplate } from "lucide-react";

function Canvas({ viewHTMLCode, closeDialog, openSendEmailDialog, closeSendEmailDialog }) {
  const htmlRef = useRef();
  const { screenSize } = useScreenSize();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();

  const [dragOver, setDragOver] = useState(false);
  const [htmlCode, setHtmlCode] = useState();

  // Drag over event
  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  // Drag leave
  const onDragLeave = () => setDragOver(false);

  // Drop event
  const onDropHandle = (e) => {
    e.preventDefault();
    setDragOver(false);

    let layout = dragElementLayout?.dragLayout || dragElementLayout;

    if (!layout) {
      const rawData =
        e.dataTransfer.getData("application/json") ||
        e.dataTransfer.getData("text/plain");
      if (rawData) {
        try {
          layout = JSON.parse(rawData);
        } catch {
          layout = { label: rawData, numofCol: 1, type: "column" };
        }
      }
    }

    if (layout && typeof layout === "object") {
      setEmailTemplate((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { ...layout, id: Date.now() + Math.random() }, // unique id for keys
      ]);
      setDragElementLayout(null);
    }
  };

  // Render layout based on type
  const getLayoutComponent = (layout) => {
    if (layout?.type === "column") {
      return <ColumnLayout key={layout.id} layout={layout} />;
    }

  }
  useEffect(() => {
    (viewHTMLCode || openSendEmailDialog) && GetHtmlCode();
  }, [viewHTMLCode, openSendEmailDialog])
  const GetHtmlCode = () => {
    if (htmlRef.current) {
      const htmlContent = htmlRef.current.innerHTML;

      setHtmlCode(htmlContent);
    }
  }

  return (
    <div className="mt-10 flex justify-center pb-20">
      <div
        className={`min-h-[500px] w-full p-6 bg-white rounded-xl shadow-xl transition-all duration-300 ease-in-out
          ${screenSize === "desktop" ? "max-w-3xl" : "max-w-md border-[12px] border-gray-800 rounded-[2rem]"}
          ${dragOver ? "border-2 border-dashed border-purple-400 bg-purple-50 scale-[1.02]" : "border border-gray-200"}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropHandle}
        ref={htmlRef}
      >
        {emailTemplate?.length > 0 ? (
          emailTemplate.map((layout) => getLayoutComponent(layout))
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <LayoutTemplate className="w-16 h-16 mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-500">Start Building Your Email</h3>
            <p className="text-sm mt-2 text-gray-400">Drag and drop layout blocks from the sidebar to begin.</p>
          </div>
        )}
      </div>
      <ViewHtmlDialog openDialog={viewHTMLCode} htmlCode={htmlCode} closeDialog={closeDialog} />
      <SendEmailDialog openDialog={openSendEmailDialog} htmlCode={htmlCode} closeDialog={closeSendEmailDialog} />
    </div>
  );
}

export default Canvas;
