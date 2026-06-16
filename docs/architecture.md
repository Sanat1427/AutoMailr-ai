# AutoMailr AI Architecture

## Overview

AutoMailr AI follows a modern full-stack architecture that combines Artificial Intelligence, visual email editing, template management, and email delivery into a unified platform.

The system is built using Next.js as the primary application framework, Convex as the backend database service, Google Gemini AI for intelligent content generation, and Nodemailer for email delivery.

The architecture is designed to provide:

* Fast content generation
* Real-time visual editing
* Scalable template storage
* AI-powered analysis
* Secure email delivery
* Modular component design

---

# High-Level Architecture

```text
┌──────────────────────────────┐
│            User              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Next.js Frontend      │
│                              │
│ • Dashboard                  │
│ • AI Generator               │
│ • Email Editor               │
│ • Settings Panel             │
│ • Preview System             │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       API Route Layer        │
│                              │
│ • Generate Email API         │
│ • Audit Email API            │
│ • Translate API              │
│ • Send Email API             │
└──────┬─────────┬─────────────┘
       │         │
       ▼         ▼

┌────────────┐   ┌──────────────┐
│ Gemini AI  │   │   Convex     │
│            │   │   Database   │
└────────────┘   └──────────────┘

       │
       ▼

┌──────────────────────────────┐
│          Nodemailer          │
│      Email Delivery Layer    │
└──────────────────────────────┘
```

---

# Frontend Architecture

The frontend is responsible for providing a responsive and interactive user experience.

Built using Next.js App Router, the frontend consists of multiple modules working together.

## Dashboard Module

The dashboard acts as the central entry point for users.

Responsibilities:

* Display saved templates
* Create new email campaigns
* Manage existing templates
* Navigate to the editor

---

## AI Generation Module

This module allows users to generate email templates through natural language prompts.

Example:

> Create a promotional email for a new AI SaaS product launch.

Responsibilities:

* Accept user prompts
* Send requests to Gemini API
* Process AI responses
* Render generated content inside the editor

---

## Email Editor Module

The visual editor is the core component of AutoMailr AI.

Responsibilities:

* Render email components
* Support drag-and-drop interactions
* Manage layout updates
* Provide live preview functionality

Supported Components:

* Text Blocks
* Buttons
* Images
* Logos
* Dividers
* Multi-column Layouts
* Social Media Sections

---

## Settings Module

The settings panel allows users to customize selected components.

Editable Properties:

* Typography
* Color
* Alignment
* Padding
* Margins
* Borders
* Button Styles
* Image Sources

Changes are reflected immediately within the editor.

---

# Backend Architecture

The backend layer is implemented through Next.js API Routes.

Each API performs a dedicated responsibility.

---

## AI Email Generation API

Endpoint:

```http
POST /api/ai-email-generate
```

Responsibilities:

* Receive prompts
* Construct AI instructions
* Communicate with Gemini AI
* Validate generated responses
* Return structured email data

---

## AI Audit API

Endpoint:

```http
POST /api/ai-email-audit
```

Responsibilities:

* Analyze email content
* Detect spam indicators
* Evaluate sentiment
* Generate recommendations

---

## AI Translation API

Endpoint:

```http
POST /api/ai-translate
```

Responsibilities:

* Translate email content
* Preserve formatting
* Maintain contextual meaning

---

## Send Email API

Endpoint:

```http
POST /api/send-email
```

Responsibilities:

* Validate email data
* Generate final HTML output
* Deliver emails through Nodemailer

---

# AI Service Layer

Google Gemini serves as the intelligence engine behind the application.

The AI layer performs multiple tasks:

* Email generation
* Content enhancement
* Translation
* Email auditing

---

## AI Generation Workflow

```text
User Prompt
      │
      ▼
Prompt Processing
      │
      ▼
Gemini AI
      │
      ▼
Generated Email Structure
      │
      ▼
JSON Validation
      │
      ▼
Editor Rendering
```

---

## Benefits

The AI pipeline enables:

* Faster email creation
* Consistent formatting
* Improved content quality
* Reduced manual effort

---

# Database Architecture

AutoMailr AI uses Convex as its primary database solution.

Convex stores:

* User information
* Email templates
* Generated content
* Template metadata

---

## Data Flow

```text
User Action
     │
     ▼
Frontend
     │
     ▼
Convex Mutation
     │
     ▼
Database Storage
     │
     ▼
Real-Time Sync
     │
     ▼
Frontend Update
```

---

# Email Delivery Architecture

Email delivery is handled through Nodemailer.

Current implementation supports:

* Test email delivery
* Preview URL generation
* HTML email rendering

Future integrations may include:

* SendGrid
* Amazon SES
* Mailgun
* Resend

---

# Request Lifecycle

The following diagram illustrates a complete user interaction flow.

```text
User
 │
 ▼
Generate Email Prompt
 │
 ▼
Gemini AI
 │
 ▼
Generated Template
 │
 ▼
Email Editor
 │
 ▼
Customization
 │
 ▼
Audit & Translation
 │
 ▼
Send Email
 │
 ▼
Recipient Inbox
```

---

# Architectural Advantages

The architecture provides several benefits:

### Scalability

Each service can evolve independently without impacting the overall system.

### Maintainability

Clear separation between frontend, backend, AI services, and storage layers simplifies development and debugging.

### Extensibility

New AI features, email components, and delivery providers can be integrated with minimal changes.

### Performance

Next.js optimizations combined with Convex's real-time capabilities provide a responsive user experience.

---

# Future Architecture Enhancements

Planned improvements include:

* Queue-based email processing
* Campaign scheduling
* Bulk email delivery
* Advanced analytics
* Role-based access control
* Template marketplace
* Multi-user collaboration
* SMTP provider abstraction layer

These enhancements will further strengthen AutoMailr AI as a comprehensive email marketing platform.
