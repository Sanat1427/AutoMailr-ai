"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // for tables, strikethrough, etc.
import { Trash, ArrowUp, ArrowDown } from "lucide-react";
import { useEmailTemplate, useDragElementLayout, useSelectedElement } from "@/app/provider";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";
import SocialIconComponent from "../custom/Element/SocialIconComponent";
import LogoHeaderComponent from "../custom/Element/LogoHeaderComponent";

export default function ColumnLayout({ layout }) {
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout } = useDragElementLayout();
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const onDragOverHandle = (event, index) => {
    event.preventDefault();
  };

  const onDropHandle = (index) => {
    if (!dragElementLayout?.dragElement) return;
    setEmailTemplate(prev =>
      prev.map(col =>
        col.id === layout.id ? { ...col, [index]: dragElementLayout.dragElement } : col
      )
    );
  };

  const deleteLayout = (layoutId) => {
    setEmailTemplate(emailTemplate.filter(item => item.id !== layoutId));
    setSelectedElement(null);
  };

  const layoutMoveUp = (layoutId) => {
    const idx = emailTemplate.findIndex(item => item.id === layoutId);
    if (idx <= 0) return;
    const newTemplate = [...emailTemplate];
    [newTemplate[idx - 1], newTemplate[idx]] = [newTemplate[idx], newTemplate[idx - 1]];
    setEmailTemplate(newTemplate);
  };

  const layoutMoveDown = (layoutId) => {
    const idx = emailTemplate.findIndex(item => item.id === layoutId);
    if (idx === -1 || idx >= emailTemplate.length - 1) return;
    const newTemplate = [...emailTemplate];
    [newTemplate[idx], newTemplate[idx + 1]] = [newTemplate[idx + 1], newTemplate[idx]];
    setEmailTemplate(newTemplate);
  };

  const GetElementComponent = (element) => {
    if (!element) return null;
    switch (element.type) {
      case "Button": return <ButtonComponent {...element} />;
      case "Text":
        return (
          <div style={element.outerStyle} className="w-full">
            <div style={element.style}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{element.content}</ReactMarkdown>
            </div>
          </div>
        );
      case "Image": return <ImageComponent {...element} />;
      case "Logo": return <LogoComponent {...element} />;
      case "Divider": return <DividerComponent {...element} />;
      case "SocialIcons": return <SocialIconComponent {...element} />;
      case "LogoHeader": return <LogoHeaderComponent {...element} />;
      default: return null;
    }
  };

  return (
    <div className="relative">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.numofCol || 1}, 1fr)`,
          gap: "0px",
        }}
        className={`${selectedElement?.layout?.id === layout?.id ? 'border border-dashed border-blue-500' : ''}`}
      >
        {Array.from({ length: layout.numofCol || 1 }).map((_, index) => (
          <div
            key={index}
            className={`p-2 flex items-center min-h-[50px] cursor-pointer 
              ${!layout?.[index]?.type ? 'bg-gray-100 border border-dashed justify-center' : 'bg-white'}
              ${selectedElement?.layout?.id === layout?.id && selectedElement?.index === index ? 'border-blue-500 border-2' : ''}`}
            onDragOver={(e) => onDragOverHandle(e, index)}
            onDrop={() => onDropHandle(index)}
            onClick={() => setSelectedElement({ layout, index })}
          >
            {GetElementComponent(layout?.[index]) ?? 'Drag Element Here'}
          </div>
        ))}
      </div>

      {/* Layout Controls */}
      {selectedElement?.layout?.id === layout?.id && (
        <div className="absolute -right-10 top-0 flex flex-col space-y-2">
          <div onClick={() => deleteLayout(layout.id)} className="cursor-pointer bg-gray-100 p-2 rounded-full hover:shadow-md">
            <Trash className="h-4 w-4 text-red-500" />
          </div>
          <div onClick={() => layoutMoveUp(layout.id)} className="cursor-pointer bg-gray-100 p-2 rounded-full hover:shadow-md">
            <ArrowUp className="h-4 w-4 text-blue-500" />
          </div>
          <div onClick={() => layoutMoveDown(layout.id)} className="cursor-pointer bg-gray-100 p-2 rounded-full hover:shadow-md">
            <ArrowDown className="h-4 w-4 text-blue-500" />
          </div>
        </div>
      )}
    </div>
  );
}
