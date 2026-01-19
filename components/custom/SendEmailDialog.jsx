import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function SendEmailDialog({ openDialog, closeDialog, htmlCode }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const onSendEmail = async () => {
        if (!email) {
            toast.error("Please enter an email address");
            return;
        }
        setLoading(true);
        setPreviewUrl(null);
        try {
            const result = await axios.post('/api/send-email', {
                email: email,
                html: htmlCode
            });

            if (result.data?.previewUrl) {
                setPreviewUrl(result.data.previewUrl);
                toast.success("Email sent! Click link to view.");
            } else {
                toast.success("Email sent successfully!");
                closeDialog();
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to send email. Check console and server logs.");
        } finally {
            setLoading(false);
        }
    }

    const resetAndClose = () => {
        setPreviewUrl(null);
        setEmail('');
        closeDialog();
    }

    return (
        <Dialog open={openDialog} onOpenChange={resetAndClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send Test Email</DialogTitle>
                    <DialogDescription>
                        Enter recipient email. This uses <strong>Ethereal Email</strong> (Zero Config).
                        <br />
                        You will get a <strong>Preview Link</strong> to view the email.
                    </DialogDescription>
                </DialogHeader>

                {!previewUrl ? (
                    <div className="flex flex-col gap-4 py-4">
                        <Input
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="py-4 bg-green-50 p-4 rounded-md border border-green-200">
                        <p className="text-green-700 font-medium mb-2">✅ Email Sent Successfully!</p>
                        <p className="text-sm text-gray-600 mb-3">Click below to view your email:</p>
                        <a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm break-all hover:text-blue-800"
                        >
                            {previewUrl}
                        </a>
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={resetAndClose}>
                        {previewUrl ? "Close" : "Cancel"}
                    </Button>
                    {!previewUrl && (
                        <Button onClick={onSendEmail} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                            Send Email
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SendEmailDialog
