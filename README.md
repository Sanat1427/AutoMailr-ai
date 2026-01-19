This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
AutoMailr-ai-main
├─ @
│  └─ components
│     └─ ui
│        └─ button.jsx
├─ app
│  ├─ (main)
│  │  ├─ dashboard
│  │  │  ├─ create
│  │  │  │  └─ page.jsx
│  │  │  ├─ layout.jsx
│  │  │  └─ page.tsx
│  │  └─ editor
│  │     └─ [templateId]
│  │        └─ page.jsx
│  ├─ api
│  │  └─ ai-email-generate
│  │     └─ route.jsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.js
│  ├─ page.js
│  └─ provider.js
├─ components
│  ├─ custom
│  │  ├─ AIInputBox.jsx
│  │  ├─ Canvas.jsx
│  │  ├─ EditorHeader.jsx
│  │  ├─ Element
│  │  │  ├─ ButtonComponent.jsx
│  │  │  ├─ DividerComponent.jsx
│  │  │  ├─ ImageComponent.jsx
│  │  │  ├─ LogoComponent.jsx
│  │  │  ├─ LogoHeaderComponent.jsx
│  │  │  ├─ SocialIconComponent.jsx
│  │  │  └─ TextComponent.jsx
│  │  ├─ ElementLayoutCard.jsx
│  │  ├─ ElementsSideBar.jsx
│  │  ├─ EmailTemplateList.jsx
│  │  ├─ Header.jsx
│  │  ├─ Hero.jsx
│  │  ├─ Settings
│  │  │  ├─ ColorPickerField.jsx
│  │  │  ├─ DropdownField.jsx
│  │  │  ├─ ImagePreview.jsx
│  │  │  ├─ InputField.jsx
│  │  │  ├─ InputStyleField.jsx
│  │  │  ├─ SliderField.jsx
│  │  │  ├─ TextAreaField.jsx
│  │  │  └─ ToggleGroupField.jsx
│  │  ├─ Settings.jsx
│  │  ├─ SignButton.jsx
│  │  └─ ViewHtmlDialog.jsx
│  ├─ LayoutElements
│  │  └─ ColumnLayout.jsx
│  └─ ui
│     ├─ button.jsx
│     ├─ dialog.jsx
│     ├─ input.jsx
│     ├─ select.jsx
│     ├─ slider.jsx
│     ├─ sonner.jsx
│     ├─ tabs.jsx
│     ├─ textarea.jsx
│     ├─ toggle-group.jsx
│     └─ toggle.jsx
├─ components.json
├─ config
│  └─ AIModel.jsx
├─ context
│  ├─ DragDropLayoutElement.jsx
│  ├─ EmailTemplateContext.jsx
│  ├─ ScreenSizeContext.jsx
│  ├─ SelectedElementContext.jsx
│  └─ UserDetailContext.jsx
├─ convex
│  ├─ emailTemplate.js
│  ├─ schema.js
│  ├─ users.js
│  └─ _generated
│     ├─ api.d.ts
│     ├─ api.js
│     ├─ dataModel.d.ts
│     ├─ server.d.ts
│     └─ server.js
├─ Data
│  ├─ ElementList.jsx
│  ├─ Layout.jsx
│  └─ Prompt.jsx
├─ jsconfig.json
├─ lib
│  └─ utils.js
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ email.png
│  ├─ emailbox.png
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ image.png
│  ├─ landing.png
│  ├─ logo.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
└─ tsconfig.json

```