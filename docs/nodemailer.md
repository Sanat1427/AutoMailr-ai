# Nodemailer Integration Documentation

# Overview

AutoMailr AI uses Nodemailer for email delivery.

Nodemailer is a Node.js package that allows applications to send emails through SMTP servers.

It is used to:

* Send generated emails
* Test email templates
* Deliver campaigns
* Verify email rendering

---

# Why Nodemailer?

Nodemailer is:

* Lightweight
* Easy to configure
* Widely adopted
* SMTP compatible
* Suitable for development and testing

---

# Email Delivery Architecture

User
↓
Frontend
↓
Send Email API
↓
Nodemailer
↓
SMTP Server
↓
Recipient Inbox

---

# What is SMTP?

SMTP stands for:

Simple Mail Transfer Protocol

It is the standard protocol used for sending emails across the internet.

Examples:

* Gmail SMTP
* Outlook SMTP
* SendGrid SMTP
* Resend SMTP
* Amazon SES SMTP

---

# Nodemailer Workflow

Step 1

User clicks Send Email.

Step 2

Frontend sends request to:

```http
POST /api/send-email
```

Step 3

Backend validates email data.

Step 4

Nodemailer creates email transport.

Step 5

SMTP server delivers email.

Step 6

Recipient receives email.

---

# Transport Configuration

Example:

```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

---

# Sending an Email

Example:

```javascript
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "user@example.com",
  subject: "Welcome",
  html: "<h1>Hello</h1>"
});
```

---

# API Endpoint

AutoMailr AI uses:

```http
POST /api/send-email
```

Request:

```json
{
  "to": "user@example.com",
  "subject": "Welcome",
  "html": "<h1>Hello</h1>"
}
```

Response:

```json
{
  "success": true
}
```

---

# Email Features

Current Features:

* HTML Email Support
* Test Email Sending
* Dynamic Content
* Template Delivery

Future Features:

* Bulk Email Sending
* Campaign Scheduling
* Attachment Support
* Tracking Integration

---

# Error Handling

Common Errors:

## Invalid Email

Occurs when recipient address is malformed.

## SMTP Authentication Error

Occurs when SMTP credentials are incorrect.

## SMTP Connection Error

Occurs when mail server is unreachable.

---

# Security Best Practices

* Store credentials in environment variables
* Never expose SMTP credentials to frontend
* Validate recipient emails
* Sanitize generated HTML
* Use secure SMTP connections

Example:

```env
EMAIL_USER=
EMAIL_PASSWORD=
```

---

# Limitations

Nodemailer is excellent for development and small-scale deployments.

For production-scale email campaigns, dedicated providers are recommended:

* Resend
* SendGrid
* Amazon SES
* Mailgun

---

# Future Improvements

Planned upgrades:

* Provider abstraction layer
* Retry mechanisms
* Email queues
* Bulk delivery support
* Campaign scheduling

---

# Conclusion

Nodemailer acts as the email delivery layer of AutoMailr AI. It converts generated templates into deliverable emails and routes them through SMTP providers, enabling users to send campaigns directly from the platform.
