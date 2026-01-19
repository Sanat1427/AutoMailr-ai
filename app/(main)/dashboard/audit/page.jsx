"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, Loader2, ClipboardPaste } from 'lucide-react';
import axios from 'axios';
import EmailAuditDialog from '@/components/custom/EmailAuditDialog';
import { toast } from "sonner";

function AuditPage() {
    const [emailBody, setEmailBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [auditResult, setAuditResult] = useState(null);
    const [isAuditOpen, setIsAuditOpen] = useState(false);

    const onAuditEmail = async () => {
        if (!emailBody || emailBody.trim().length < 10) {
            toast("Please enter more content to audit.");
            return;
        }

        setLoading(true);
        setAuditResult(null);
        setIsAuditOpen(true);

        try {
            const response = await axios.post('/api/ai-email-audit', { emailBody });
            if (response.data?.success) {
                setAuditResult(response.data.result);
            } else {
                throw new Error("Audit failed");
            }
        } catch (error) {
            console.error("Audit failed", error);
            toast("Failed to audit email. Please try again.");
            setIsAuditOpen(false); // Close dialong on error so user can retry
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50/50 py-12 px-6'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-10'>
                    <div className='inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 mb-4'>
                        <ShieldCheck className='h-8 w-8 text-purple-600' />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>AI Email Inspector</h1>
                    <p className='text-gray-500 max-w-lg mx-auto'>
                        Paste any email content below. Our AI will analyze it for spam triggers, sentiment, and reading tone to ensure it lands in the inbox.
                    </p>
                </div>

                <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-6 md:p-8'>
                    <div className='mb-6'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                            <ClipboardPaste className='h-4 w-4 text-gray-400' />
                            Email Content
                        </label>
                        <Textarea
                            placeholder="Paste your subject line and body text here..."
                            rows={12}
                            className='text-base p-4 border-gray-200 focus:ring-purple-500 shadow-sm resize-y min-h-[300px]'
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <Button
                            onClick={onAuditEmail}
                            disabled={!emailBody || loading}
                            className='bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-6 px-8 text-lg hover:shadow-lg hover:scale-[1.01] transition-all'
                        >
                            {loading ? (
                                <span className='flex items-center gap-2'>
                                    <Loader2 className="animate-spin" /> Analyzing...
                                </span>
                            ) : (
                                <span className='flex items-center gap-2'>
                                    <ShieldCheck className="h-5 w-5" /> Audit My Email
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <EmailAuditDialog
                open={isAuditOpen}
                setOpen={setIsAuditOpen}
                loading={loading}
                auditResult={auditResult}
            />
        </div>
    )
}

export default AuditPage
