# 🏆 Hall of Fame Platform

A modern, high-performance, full-stack monorepo platform designed for stepping community organizations and honors/recognition platforms. Powered by **Next.js 16 (App Router)**, **React 19**, **Supabase (PostgreSQL with RLS-first multi-tenancy)**, and **Stripe**, managed via **Turborepo** and **pnpm workspaces**.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Key Features](#-key-features)
- [Monorepo Structure](#-monorepo-structure)
- [Getting Started](#-getting-started)
- [Database & Supabase Setup](#-database--supabase-setup)
- [Stripe Integration & Local Webhooks](#-stripe-integration--local-webhooks)
- [Available Scripts](#-available-scripts)
- [Self-Hosting & Production Deployment](#-self-hosting--production-deployment)
- [License](#-license)

---

## 🌟 Overview

The **Hall of Fame Platform** provides stepping groups, honors societies, and recognition organizations with an all-in-one digital ecosystem. It combines public-facing marketing and community discovery (inductee directory, honoree spotlights, voting campaigns, e-commerce merch shop, event ticketing, and blog editorial system) with secure, multi-tenant administrative controls for tenant management, order fulfillment, nominations processing, and user access control.

---

## 🛠️ Tech Stack & Architecture

### **Core Frameworks & Tools**
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5.8+](https://www.typescriptlang.org/)
- **Monorepo Manager**: [Turborepo 2.9](https://turbo.build/repo) + [pnpm Workspaces](https://pnpm.io/)
- **Runtime**: Node.js 22+

### **Database, Auth & Storage**
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL 15+)
- **Security**: Row-Level Security (RLS) enforcement across all tables
- **Authentication**: Supabase Auth (Email/Password, Magic Links, OAuth)
- **Storage Buckets**: Supabase Storage (blog media, inductee avatars, event banners, product assets)

### **E-Commerce & Payments**
- **Payments**: [Stripe SDK](https://stripe.com/) & [Stripe CLI](https://stripe.com/docs/stripe-cli)
- **Billing Models**: Dynamic One-time Checkout (Tickets, Merchandise) & Recurring Subscriptions (Creator Memberships)
- **Webhooks**: Stripe Webhook Listener engine (`/api/stripe/webhook`)

### **Styling, UI & Design System**
- **CSS Framework**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Design Theme**: Custom Dark Mode with Gold Gradient tokens (`@hof/config-tailwind`)
- **UI Components**: Base UI, Shadcn UI primitives, Framer Motion (animations), Lucide React (icons)
- **Notifications**: Sonner

### **Content, Data & Media**
- **Rich Text Editor**: [TipTap Editor](https://tiptap.dev/) with GFM Markdown extensions
- **Data Tables**: [TanStack Table v8](https://tanstack.com/table/v8)
- **Forms & Validation**: React Hook Form + Zod
- **Ticket Generation & QR**: `qrcode.react`, `jspdf`, `jspdf-autotable`
- **Data Visualization**: Recharts, `react-globe.gl`
- **Email Delivery**: [Resend API](https://resend.com/)

---

## 🔥 Key Features

### 🏛️ 1. Hall of Fame Directory & Honoree Spotlights
- **Inductee & Founder Portals**: Comprehensive profiles, year cohorts, categories, and bio showcases.
- **Search & Filter**: Search by year, inductee name, or category with real-time URL state synchronization.
- **Featured Honorees**: Custom hero banners highlighting prominent community inductees.

### 🗳️ 2. Voting Campaigns & Community Ballots
- **Campaign Engine**: Admin-driven creation of vote campaigns with active ballot start/end dates.
- **Category Ballots**: Structured voting per category with candidate spotlighting.
- **Promotional Banners**: Public banner prompts encouraging community participation.

### 🎟️ 3. Event Ticketing & Live Staff Check-in
- **Multi-Tier Tickets**: General Admission, VIP, and custom tiered pricing structures.
- **Instant Stripe Checkout**: Dynamic price generation without pre-populating catalog items.
- **Digital Pass & PDF Downloads**: Automatic QR code rendering and downloadable branded PDF tickets.
- **Staff Check-In Portal (`/ticket-check-in`)**: Fast, mobile-friendly QR scanner and manual search for event staff check-ins.

### 🛍️ 4. Merch E-Commerce Shop
- **Product Catalog**: Digital & physical products, variant management (sizes, colors, stock).
- **Print Area Customization**: Configure custom print zones for merchandise production.
- **Price Snapshotting**: Order price locking to prevent discrepancy during checkouts.
- **Ratings & Reviews**: Verified buyer reviews with guest token support.
- **Order Management Workflow**: Real-time status transitions (Pending, Processing, Shipped, Delivered, Cancelled).

### 🏢 5. Multi-Tenant Architecture (`/t/{tenant-slug}/...`)
- **Tenant Isolation**: Schema enforcement through `tenants` and `tenant_memberships` tables.
- **RLS-First Security**: Tenant members access only their authorized console views and records.

### 🔐 6. Admin Console & Audit Engine (`/admin`)
- **Role-Based Access Control (RBAC)**: Custom administrative roles and permission overrides.
- **Activity & Audit Logging**: Track all critical administrative mutations across users and content.
- **Customer CRM Database**: View user order history, membership tiers, and participation records.

### 📰 7. Editorial Blog & CMS
- **Rich-Text Publishing**: TipTap powered markdown editor with embed support.
- **Comments & Moderation**: Public discussion with administrative moderation queue.
- **Static Page Builder**: Manage custom CMS pages dynamically.

### 📝 8. Nominations & Community Submissions
- **Submission Engine**: Public nomination forms with customized field requirements.
- **Admin Review Queue**: Dedicated admin workflow for approving or archiving nominations.

---

## 📁 Monorepo Structure

```
hall-of-fame/
├── apps/
│   └── web/                     # Main Next.js 16 Application (Public Marketing + Multi-tenant Console + Admin)
├── packages/
│   ├── config-eslint/           # Shared ESLint configurations
│   ├── config-tailwind/         # Shared Tailwind CSS v4 design tokens (Dark mode + Gold gradients)
│   ├── config-typescript/       # Shared tsconfig definitions
│   └── supabase/                # Shared Supabase clients, schema typings & environment validators
├── supabase/
│   ├── migrations/              # PostgreSQL SQL schema migrations and RLS policies
│   ├── seed.sql                 # Initial seed data for local development
│   └── config.toml              # Supabase CLI local server configuration
├── docs/                        # Project documentation (Vercel guide, UI baselines)
├── scripts/                     # Helper bash scripts (verification, Supabase setup, self-hosting)
├── package.json                 # Root monorepo dependencies & scripts
├── pnpm-workspace.yaml          # Monorepo workspace configuration
└── turbo.json                   # Turborepo task pipeline configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `>= 20.9.0` (v22+ recommended)
- **pnpm**: `^11.8.0` (`corepack enable pnpm` or `npm i -g pnpm`)
- **Docker Desktop**: *(Optional, required only for running local Supabase CLI)*

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/hall-of-fame.git
   cd hall-of-fame
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `apps/web/.env.local`:
   ```bash
   cp .env.example apps/web/.env.local
   ```
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Start Development Server:**
   ```bash
   pnpm dev
   ```
   Access the web app at **`http://localhost:3000`**.

---

## 🗄️ Database & Supabase Setup

### Local Supabase Development

If using Docker Desktop for local database development:

```bash
pnpm setup:local-supabase
```
*This starts local Supabase containers, applies all migrations in `supabase/migrations/`, seeds the database, and automatically updates `apps/web/.env.local` with local connection keys.*

To interact with local Supabase manually:
```bash
pnpm dlx supabase@latest start
pnpm dlx supabase@latest db reset
```
- **Supabase Studio**: `http://127.0.0.1:54323`
- **Inbucket (Email Preview)**: `http://127.0.0.1:54324`

---

## 💳 Stripe Integration & Local Webhooks

Stripe powers paid event tickets, merchandise orders, and creator membership subscriptions.

### Setting Up Local Stripe Webhooks

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) (`brew install stripe/stripe-cli/stripe` on macOS).
2. Authenticate the CLI:
   ```bash
   stripe login
   ```
3. In `apps/web/.env.local`, set:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   ```
4. In terminal 1, run the web app:
   ```bash
   pnpm dev
   ```
5. In terminal 2, launch the Stripe listener:
   ```bash
   pnpm stripe:listen
   ```
6. Copy the printed webhook signing secret (`whsec_...`) into `apps/web/.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
   *Restart `pnpm dev` after setting the secret.*

---

## ⚙️ Available Scripts

Execute scripts from the monorepo root:

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts all workspace packages in development mode via Turborepo. |
| `pnpm build` | Executes production build across all workspaces. |
| `pnpm lint` | Runs ESLint checks across all apps and packages. |
| `pnpm typecheck` | Validates TypeScript types across the monorepo without emitting files. |
| `pnpm stripe:listen` | Starts local Stripe CLI webhook forwarding to `localhost:3000/api/stripe/webhook`. |
| `pnpm setup:local-supabase` | Initializes local Supabase Docker stack, applies migrations, and writes env configuration. |
| `pnpm check:env` | Verifies that no sensitive server environment secrets are leaked in public configs. |
| `pnpm self-host:apply-migrations` | Applies database migrations to a self-hosted VPS production database. |
| `pnpm self-host:stack-up` | Launches the production self-hosted Docker Compose stack. |

---

## 🌐 Self-Hosting & Production Deployment

### 1. Vercel Deployment (App Hosting)
Deploy `apps/web` as a single Vercel project:
- Set Root Directory to `apps/web`.
- Configure Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`).
- Refer to [`docs/vercel.md`](docs/vercel.md) for full instructions.

### 2. VPS / Docker Self-Hosting (Pattern B)
For host environments utilizing VPS Docker setups:
- Detailed guide available in [`scripts/self-host/README.md`](scripts/self-host/README.md).
- Follow [`scripts/self-host/pattern-b.md`](scripts/self-host/pattern-b.md) for isolated stack deployments with TLS proxies.

---

## 📄 License

This repository is private and proprietary. All rights reserved.
