# 🕊️ Memorial - AI-Powered Obituary & Memorial SaaS Platform

A modern, fast, and dignified all-in-one SaaS platform for families and funeral homes to create AI-assisted obituaries, design custom printable memorial booklets and cards, publish interactive living digital memorial pages, and receive support through memorial donations and keepsake merchandise.

---

## 📐 Platform Architecture

```mermaid
graph TD
    Client[Browser / User] -->|HTTP / React 19| WebApp[Next.js 16 Web App - apps/web]
    WebApp -->|@supabase/ssr / Admin Client| Supabase[(Supabase Postgres DB + Storage + Auth)]
    WebApp -->|HTTP REST / Shared Secret| AIService[Python FastAPI AI Microservice - services/ai]
    WebApp -->|HTTP REST / Shared Secret| ImportService[Python FastAPI Design Import Service - services/design-import]
    WebApp -->|Stripe API & Webhooks| Stripe[Stripe Connect & Platform Payments]
```

The repository is structured as a monorepo consisting of:
* **`apps/web`**: Next.js 16 App Router application managing product UI, customer dashboard, admin studio, canvas editor, page-flip reader, and server-side Supabase data access.
* **`services/ai`**: Python 3.12 FastAPI microservice handling provider-agnostic AI text generation (`/generate/content`, `/edit/element`) and AI photo editing tools. Includes a `stub` provider for offline development without API keys.
* **`services/design-import`**: Python 3.12 FastAPI microservice converting Adobe Illustrator (`.ai`) and vector PDF files to clean SVG structures using Inkscape/mutool for template ingestion.

---

## 🛠️ Tech Stack

### Frontend & Core App
| Layer / Concern | Tech / Library | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router, RSC) | React 19 full-stack application framework |
| **Language** | TypeScript 5 | Strict static typing across components, server actions, & API handlers |
| **Styling & UI** | Tailwind CSS v4, Radix UI, Base UI, Shadcn UI | Accessible, warm, responsive design system |
| **Animations** | Framer Motion, Motion, tw-animate-css | Smooth micro-interactions, page transitions, modal animations |
| **Icons** | Lucide React | High quality UI icon set |
| **Notifications** | Sonner | Toast notifications and status alerts |

### Canvas Design Studio & Digital Flipbooks
| Component | Tech / Library | Description |
| :--- | :--- | :--- |
| **Canvas Engine** | `react-moveable` / `moveable` | Drag-and-drop element transformation, resizing, rotating, and alignment |
| **Rich Text Editor** | Tiptap (`@tiptap/react`, StarterKit) | Inline rich text editor with custom fonts, colors, line heights, and markdown |
| **Photoshop Import** | `ag-psd` | Native browser parsing and layer conversion for `.psd` graphic templates |
| **PDF Generation** | `jsPDF`, `jspdf-autotable`, `html-to-image` | Vector and high-resolution print PDF export |
| **3D Booklet Reader** | `page-flip` | Realistic interactive page-turning digital flipbook reader for memorial booklets |

### Backend, Database & Microservices
| Layer / Concern | Tech / Library | Description |
| :--- | :--- | :--- |
| **Database & Auth** | Supabase Postgres, `@supabase/ssr` | Postgres with Row Level Security (RLS) & Server Action admin queries |
| **Storage** | Supabase Storage (`memorial-media` bucket) | Cloud media storage with public URLs and local fallback for dev |
| **AI Service** | Python 3.12, FastAPI, Pydantic | Asynchronous microservice for obituary generation and photo editing |
| **Vector Import Service** | Python 3.12, FastAPI, Inkscape, mutool | Microservice for converting `.ai` and `.pdf` files to SVG for template import |
| **Payments & Ledger** | Stripe API, `@stripe/connect-js` | Platform-managed checkout, donor contributions, Stripe Connect, and payout withdrawal management |

---

## ✨ Key Features & Functionality

### 🪄 1. AI Content & Obituary Generator
* **Guided Wizard**: Step-by-step assistant capturing family details, memories, tone preferences, and key milestones.
* **Full Content Suite**: Generates obituaries in multiple tones (traditional, warm, uplifting, solemn), detailed life stories, order of service schedules, scriptures/poems, acknowledgements, and social media announcements.
* **Inline AI Revisions**: Ask the AI assistant to rewrite, expand, shorten, or adjust tone for any specific section.

### 🕊️ 2. Living Digital Memorial Pages
* **Interactive Web Pages**: Beautiful public or private digital pages for deceased loved ones.
* **Tribute Features**:
  * **Digital Candle Lighting**: Visitors can light virtual candles (multiple candle types available).
  * **Virtual Balloon Tributes**: Launch memorial balloons with custom messages.
  * **Audio Memories & Guestbook**: Leave text, photo, and voice message tributes.
  * **Event RSVP**: Event details with interactive RSVP management for services and receptions.
* **Family Donation & Contributions**: Dedicated fundraising campaigns for funeral expenses or memorial funds.

### 🎨 3. Design Studio & Template Engine (Canvas V2)
* **Visual Canvas Editor**: Create and customize memorial booklets, trifold programs, single-page flyers, and prayer cards.
* **Multi-Page Layouts**: Manage booklet pages, cover art, internal spreads, and back pages.
* **Asset Library**: Pre-built floral borders, frames, backgrounds, and decorative dividers.
* **Template Ingestion**: Import Adobe Illustrator (`.ai`) files via microservice or Photoshop (`.psd`) files directly in browser.
* **Print Export**: Download high-definition vector/300DPI PDFs ready for local print shops or commercial printing.

### 📖 4. Interactive 3D Digital Flipbooks
* Realistic page-flipping digital booklets for relatives who cannot attend the physical service in person.
* Embeddable inside the Living Digital Memorial page.

### 🛒 5. Keepsake & Print E-Commerce Store
* Built-in marketplace for ordering printed physical booklets, prayer cards, and keepsake merchandise.
* Complete order lifecycle management, shipping address verification, and order tracking.

### 💳 6. Stripe Connect & Platform Payouts Ledger
* Platform-managed payment accounts supporting family fundraising.
* Multi-stage withdrawal workflows, dispute & refund handling, automated ledger reconciliation, and platform fee processing.

### 🛡️ 7. Admin Portal & Management Studio
* **Template Studio Admin**: Manage storefront templates, tag categories, upload source files, and configure page counts.
* **Shop & Order Fulfillment**: Manage merchandise inventory, process orders, and issue tracking numbers.
* **Media Moderation Queue**: Review user-submitted photos and audio memories before publishing to public pages.

---

## 📁 Repository Directory Structure

```
obituary-memorial-platform/
├── apps/
│   └── web/                        # Next.js 16 Web Application
│       ├── src/
│       │   ├── app/                # App Router (Pages, Admin, API Routes, Dashboard)
│       │   ├── components/         # Design Studio, UI Components, Living Pages
│       │   └── lib/                # Supabase Admin, AI Client, Stripe Helpers
│       ├── supabase/
│       │   └── migrations/         # SQL Migrations (0001 through 0046)
│       └── scripts/                # Database seeding & utility scripts
├── services/
│   ├── ai/                         # FastAPI AI Microservice (Port 8000)
│   │   └── app/                    # Providers (Stub, OpenAI, Anthropic), FastAPI routes
│   └── design-import/              # FastAPI Design Import Microservice (Port 8001)
│       └── app/                    # AI & PDF to SVG conversion pipeline
├── docker-compose.yml              # Local/Coolify Docker configuration for services
├── package.json                    # Root workspace package.json & orchestration scripts
└── README.md                       # Project documentation
```

---

## 🚀 Quick Start & Local Setup

### 1. System Requirements
* **Node.js**: v20.x or higher
* **Python**: v3.12 (for microservices)
* **Inkscape / mutool** *(Optional, required only for full `.ai` file vector conversion)*
* **Supabase Instance**: Local Supabase CLI or Supabase Cloud Project

### 2. Environment Setup

Copy `.env.example` into `apps/web/.env`:

```bash
cp .env.example apps/web/.env
```

Ensure the following key variables are configured in `apps/web/.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_STORAGE_BUCKET=memorial-media

NEXT_PUBLIC_SITE_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:8000
DESIGN_IMPORT_SERVICE_URL=http://localhost:8001

AI_SHARED_SECRET=your_dev_shared_secret
DESIGN_IMPORT_SECRET=your_dev_shared_secret
```

### 3. Microservice Virtual Environments

Set up Python virtual environments for both services:

**AI Microservice:**
```bash
cd services/ai
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ../..
```

**Design Import Microservice:**
```bash
cd services/design-import
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ../..
```

### 4. Database Setup & Seeding

1. Execute the SQL migrations in `apps/web/supabase/migrations/` sequentially in your Supabase SQL Editor (or via Supabase CLI).
2. Install workspace dependencies and seed the database with initial templates and demo accounts:

```bash
npm install
npm run db:seed
```

*Demo Login Credentials:*
* **Email:** `demo@memorial.test`
* **Password:** `password123`

### 5. Running the Platform

To start all services concurrently (Web App on `:3000`, AI Service on `:8000`, Design Import Service on `:8001`):

```bash
npm run dev:all
```

Alternatively, you can run individual components separately:

```bash
npm run dev:web            # Web Application only (localhost:3000)
npm run dev:ai             # AI Microservice only (localhost:8000)
npm run dev:design-import  # Vector Design Import Microservice only (localhost:8001)
```

---

## 📜 Available NPM Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev:all` | Launches Web App, AI Microservice, and Design Import Service concurrently |
| `npm run dev:web` | Starts Next.js dev server (`apps/web`) |
| `npm run dev:ai` | Starts Python FastAPI AI service |
| `npm run dev:design-import` | Starts Python FastAPI Vector Design Import service |
| `npm run build` | Builds production bundle for Next.js web application |
| `npm run lint` | Runs ESLint verification across TypeScript codebase |
| `npm run typecheck` | Validates TypeScript types across the web app |
| `npm run db:seed` | Seeds database templates, categories, and demo user |

---

## 🗄️ Database Migrations Overview

The database schema is managed via incremental Supabase SQL migrations located in `apps/web/supabase/migrations/`:

* **`0001_init.sql`**: Core user profiles, memorials, obituaries, templates, and storage configuration.
* **`0005_design_studio.sql`**: Design Studio documents, pages, layers, fonts, and assets.
* **`0007_rsvp.sql`**: Memorial service event RSVP system.
* **`0012_template_storage_import_jobs.sql`**: Async vector template import job queue.
* **`0017_design_flipbooks.sql` & `0023_memorial_flipbooks.sql`**: Flipbook page turn configurations.
* **`0021_notifications.sql` & `0022_notification_optimization.sql`**: In-app notification engine.
* **`0025_shop.sql` - `0029_shop_template_full.sql`**: Product catalog, orders, shipping, and storefront reviews.
* **`0033_payment_accounts_and_transactions.sql` - `0044_platform_managed_reconciliation_locks.sql`**: Financial ledger, donation processing, Stripe Connect integration, and payout safety locks.
* **`0045_prevent_destructive_memorial_deletion.sql`**: Safety constraints preventing accidental deletion of active memorial pages.

---

## 🚢 Deployment Architecture

| Component | Target Platform | Notes |
| :--- | :--- | :--- |
| **Next.js Web App** | Vercel | Set root directory to `apps/web` |
| **Database & Auth** | Supabase (Cloud / Self-Hosted) | Enable RLS and public read access on `memorial-media` bucket |
| **AI Service** | Coolify / Docker / Render | Runs FastAPI image pinned to Python 3.12 |
| **Design Import Service** | Coolify / Docker | Dockerfile includes Inkscape & mutool dependencies |

*Note: For production service-to-service security, set `AI_SHARED_SECRET` and `DESIGN_IMPORT_SECRET`. Web calls enforce this secret via `x-ai-secret` and `x-design-import-secret` headers.*

---

## 📄 License

Private & Proprietary - All rights reserved.
