# AI Email Builder 📧

Build beautiful, responsive email templates in minutes with the power of AI.

## 🌟 Introduction

AI Email Builder is a modern, intuitive tool that allows you to create professional email templates using a drag-and-drop interface. Powered by **Google Gemini AI**, it can even generate email layouts and content for you based on simple text prompts.

Whether you're a developer or a marketer, this tool streamlines the process of designing emails that look great on any device.

## ✨ Features

-   **🎨 Drag & Drop Interface**: Easily assemble emails using pre-built components (Text, Image, Buttons, etc.).
-   **🤖 AI-Powered Generation**: Describe your email, and let Google Gemini create the layout for you.
-   **📱 Responsive Design**: Templates are optimized for both desktop and mobile views.
-   **💾 Cloud Save**: Your templates and user data are securely stored using Convex.
-   **🔐 Secure Authentication**: Sign in easily with your Google account.
-   **⚡ Real-time Preview**: See changes instantly as you edit.

## 🛠️ Tech Stack

This project is built with the latest web technologies:

-   **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Backend & Database**: [Convex](https://www.convex.dev/)
-   **AI Model**: [Google Gemini](https://ai.google.dev/)
-   **Authentication**: [Google OAuth](https://developers.google.com/identity)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (Version 18 or higher)
-   npm (comes with Node.js) or yarn/pnpm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Sanat1427/AutoMailr-ai.git
    cd ai-email-builder
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### 🔑 Environment Variables

You need to set up environment variables for the app to work.
Create a file named `.env.local` in the root directory and add the following keys:

```bash
# Convex Deployment URL (from your Convex dashboard)
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

# Google Gemini API Key (get it from Google AI Studio)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Google OAuth Client ID (from Google Cloud Console)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 🏃‍♂️ Running the Project

1.  **Start the Convex dev server** (in a separate terminal):

    ```bash
    npx convex dev
    ```

2.  **Start the Next.js development server:**

    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

-   `app/`: Main application code (Next.js App Router).
-   `components/`: Reusable UI components.
    -   `custom/`: Custom built components for the email builder.
    -   `ui/`: Base UI elements (buttons, inputs, etc.).
-   `convex/`: Backend functions and schema definitions.
-   `context/`: React context providers for state management.
-   `config/`: Configuration files (including AI model setup).

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1.  Fork the repo.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

---

Built with ❤️ using Next.js and Convex.
