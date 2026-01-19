"use client";
import { useEmailTemplate, useUserDetail } from '@/app/provider';
import Canvas from '@/components/custom/Canvas';
import EditorHeader from '@/components/custom/EditorHeader';
import ElementsSideBar from '@/components/custom/ElementsSideBar';
import Settings from '@/components/custom/Settings';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Editor() {
  const [viewHTMLCode, setViewHtmlCode] = useState(false);
  const [openSendEmailDialog, setOpenSendEmailDialog] = useState(false);
  const { templateId } = useParams();
  const { userDetail } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const convex = useConvex();

  useEffect(() => {
    if (userDetail) {
      GetTemplateData();
    }
  }, [userDetail]);

  const GetTemplateData = async () => {
    setLoading(true);
    try {
      const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
        tid: templateId,
        email: userDetail?.email
      });
      console.log("Convex result:", result);

      // ✅ Fix: extract design from first document and inject description
      if (result?.[0]) {
        const design = result[0].design || [];
        // Inject description into the first element of design if it exists
        // This ensures EditorHeader can read it, preserving existing logic
        if (design.length > 0) {
          design[0].description = result[0].description || design[0].description;
        }
        setEmailTemplate(design);
      } else {
        setEmailTemplate([]);
      }
    } catch (err) {
      console.error("Error fetching template:", err);
      setEmailTemplate([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EditorHeader
        viewHTMLCode={(v) => setViewHtmlCode(v)}
        onSendTestEmail={() => setOpenSendEmailDialog(true)}
      />
      {!loading ? (
        <div className="grid grid-cols-5">
          <ElementsSideBar />
          <div className="col-span-3 bg-gray-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <Canvas
              viewHTMLCode={viewHTMLCode}
              closeDialog={() => setViewHtmlCode(false)}
              openSendEmailDialog={openSendEmailDialog}
              closeSendEmailDialog={() => setOpenSendEmailDialog(false)}
            />
          </div>
          <Settings />
        </div>
      ) : (
        <div>
          <h2>Please Wait.</h2>
        </div>
      )}
    </div>
  );
}

export default Editor;
