"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { DragDropLayoutElement } from "@/context/DragDropLayoutElement";
import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { SelectedElementContext } from "@/context/SelectedElementContext";

const UserDetailContext = createContext();

function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  const [userDetail, setUserDetail] = useState();
  const [screenSize, setScreenSize] = useState("desktop");
  const [dragElementLayout, setDragElementLayout] = useState();
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 🟣 Load user detail
    const storage = localStorage.getItem("userDetail");
    if (storage) {
      try {
        setUserDetail(JSON.parse(storage));
      } catch (err) {
        console.error("Failed to parse userDetail", err);
      }
    }

    // 🟢 Load email template safely
    const emailTemplateStorage = localStorage.getItem("emailTemplate");
    if (emailTemplateStorage && emailTemplateStorage !== "undefined") {
      try {
        setEmailTemplate(JSON.parse(emailTemplateStorage));
      } catch (err) {
        console.error("Failed to parse emailTemplate", err);
        setEmailTemplate([]);
      }
    } else {
      setEmailTemplate([]); // default fallback
    }
  }, []);

  // Persist emailTemplate to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  // Update emailTemplate whenever selectedElement changes
  useEffect(() => {
    if (!selectedElement) return;

    setEmailTemplate((prevTemplates) =>
      prevTemplates.map((item) =>
        item.id === selectedElement.layout.id ? selectedElement.layout : item
      )
    );
  }, [selectedElement]);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropLayoutElement.Provider value={{ dragElementLayout, setDragElementLayout }}>
              <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
                <SelectedElementContext.Provider value={{ selectedElement, setSelectedElement }}>
                  {children}
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export default Provider;

// Custom hooks
export const useUserDetail = () => useContext(UserDetailContext);
export const useScreenSize = () => useContext(ScreenSizeContext);
export const useDragElementLayout = () => useContext(DragDropLayoutElement);
export const useEmailTemplate = () => useContext(EmailTemplateContext);
export const useSelectedElement = () => useContext(SelectedElementContext);
