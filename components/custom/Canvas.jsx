"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDragElementLayout, useScreenSize, useEmailTemplate } from "@/app/provider";
import ColumnLayout from "../LayoutElements/ColumnLayout";
import ViewHtmlDialog from "./ViewHtmlDialog";


function Canvas({viewHTMLCode,closeDialog}) {
  const htmlRef = useRef(); 
  const { screenSize } = useScreenSize();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();

  const [dragOver, setDragOver] = useState(false);
  const [ htmlCode,setHtmlCode]=useState();

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
  useEffect(()=>{
    viewHTMLCode &&GetHtmlCode();
  },[viewHTMLCode])
   const GetHtmlCode=()=>{
    if(htmlRef.current){
      const htmlContent = htmlRef.current.innerHTML;
      console.log(htmlContent);
      setHtmlCode(htmlContent);
    }
   }

  return (
    <div className="mt-10 flex justify-center">
      <div
        className={`min-h-[400px] w-full p-6 border border-gray-300 rounded-md shadow-sm transition-colors duration-200
          ${screenSize === "desktop" ? "max-w-2xl" : "max-w-md"}
          ${dragOver ? "bg-purple-100 p-4" : "bg-white"}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropHandle}
        ref={htmlRef}
      >
        {emailTemplate?.length > 0 ? (
          emailTemplate.map((layout) => getLayoutComponent(layout))
        ) : (
          <p className="text-gray-400 text-center">Drag and drop layout blocks here</p>
        )}
      </div>
    <ViewHtmlDialog openDialog ={viewHTMLCode} htmlCode={htmlCode } closeDialog={closeDialog} />
    </div>
  );
}

export default Canvas;
