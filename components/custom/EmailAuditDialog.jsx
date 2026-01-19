import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

function EmailAuditDialog({ open, setOpen, loading, auditResult }) {
    if (!open) return null;

    const getScoreColor = (score) => {
        if (score < 30) return 'bg-green-500';
        if (score < 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getScoreLabel = (score) => {
        if (score < 30) return 'Safe';
        if (score < 70) return 'Moderate Risk';
        return 'High Risk';
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-purple-600" />
                        AI Email Audit
                    </DialogTitle>
                    <DialogDescription>
                        Analyzing your email for spam triggers and tone.
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
                        <p className="text-sm text-gray-500">Scanning content...</p>
                    </div>
                ) : auditResult ? (
                    <div className="flex flex-col gap-6 py-4">
                        {/* Spam Score */}
                        <div className='bg-slate-50 p-4 rounded-lg border'>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-medium text-gray-700">Spam Score</span>
                                <span className={`text-sm font-bold ${getScoreColor(auditResult.spamScore).replace('bg-', 'text-')}`}>
                                    {auditResult.spamScore}/100 ({getScoreLabel(auditResult.spamScore)})
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full ${getScoreColor(auditResult.spamScore)}`}
                                    style={{ width: `${auditResult.spamScore}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Sentiment */}
                        <div>
                            <h4 className="text-sm font-semibold mb-2">Detailed Analysis</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                                    <span className="text-xs text-blue-600 font-bold uppercase block mb-1">Sentiment</span>
                                    <p className="text-sm text-gray-800">{auditResult.sentiment}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                                    <span className="text-xs text-slate-500 font-bold uppercase block mb-1">Keywords Found</span>
                                    <p className="text-2xl font-bold text-slate-700">{auditResult.spamKeywords?.length || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Keywords */}
                        {auditResult.spamKeywords?.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                    <AlertTriangle className='w-4 h-4 text-orange-500' />
                                    Spam Triggers Found
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {auditResult.spamKeywords.map((keyword, index) => (
                                        <span key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-md border border-red-200">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suggestions */}
                        {auditResult.suggestions?.length > 0 && (
                            <div className='border-t pt-4'>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                    <CheckCircle className='w-4 h-4 text-green-500' />
                                    Suggestions
                                </h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {auditResult.suggestions.map((suggestion, index) => (
                                        <li key={index} className="text-sm text-gray-600">
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {auditResult.spamKeywords?.length === 0 && auditResult.suggestions?.length === 0 && (
                            <div className="text-center py-4 text-green-600 bg-green-50 rounded-md border border-green-200">
                                Looking good! No major issues found.
                            </div>
                        )}

                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

export default EmailAuditDialog;
