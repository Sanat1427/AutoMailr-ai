import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { email, html } = await req.json();

        if (!email || !html) {
            return NextResponse.json({ error: 'Email and HTML are required' }, { status: 400 });
        }

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        const mailOptions = {
            from: '"AutoMailr AI" <test@automailr.ai>', // sender address
            to: email, // list of receivers
            subject: 'Test Email from AutoMailr', // Subject line
            html: html, // html body
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log("Preview URL: %s", previewUrl);

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully!',
            previewUrl: previewUrl
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
