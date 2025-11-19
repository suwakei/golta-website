# Golta - Documentation Website

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsuwakei%2Fgolta-website)

This repository contains the source code for the official website and documentation for Golta, a fast, cross-platform Go version manager.

The site is built with Next.js (App Router) and provides guides, API references, and general information about the Golta CLI tool.

## ✨ Features

- **Modern Stack**: Built with Next.js, React, and TypeScript for a fast and type-safe developer experience.
- **Static Content**: Documentation is written in Markdown and rendered statically, ensuring fast load times.
- **Responsive Design**: Styled with CSS Modules for a clean and maintainable component-based styling approach.

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Icons**: React Icons
- **Markdown Rendering**: react-markdown

## 📂 Project Structure

```
.
├── public/                # Static assets (images, logos)
├── src/
│   ├── app/               # Next.js pages and layouts
│   ├── components/        # Reusable React components (Header, Footer, etc.)
│   ├── lib/               # Shared logic and content (e.g., markdown)
│   └── styles/            # CSS module files for components and pages
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, pnpm, or bun

### Installation & Running

1. Clone the repository:
   ```bash
   git clone https://github.com/suwakei/golta-website.git
   cd golta-website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

The development server will be available at `http://localhost:3000`.

## 🚀 Deployment

This site is deployed on [Vercel](https://vercel.com/).
