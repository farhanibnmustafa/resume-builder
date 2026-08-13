# 🚀 QuickCopy2 - Enterprise E-Commerce & Custom Printing Platform

QuickCopy2 is a multi-tenant, enterprise-grade e-commerce and custom print management platform built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL & Storage)**. 

The platform supports four distinct storefront systems sharing unified order management, a product customizer engine, direct file upload workflows, tax engines, email/PDF generation, and payment gateway integrations.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Architecture & 4 Storefront Systems](#-architecture--4-storefront-systems)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Database & Storage Architecture](#-database--storage-architecture)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Setup](#-getting-started--setup)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Deployment Workflow](#-deployment-workflow)

---

## 🌐 Overview

QuickCopy2 delivers customized printing services (T-shirts, Hoodies, DTF transfers, UV gangsheets, buttons, color copies, and custom quotes) across specialized branded channels. 

Whether operating as the main retail site, powering school merchandise catalogs (AIMS), serving white-label domain partners (ThePrintFirm), or handling point-of-sale customer kiosks on the shop floor (In-Store), all orders converge into a single administrative workflow for production management, design proof approvals, and fulfillment.

---

## 🏗️ Architecture & 4 Storefront Systems

The application operates as a unified Next.js 15 mono-application using Route & Subdomain Middleware splitting:

```
QuickCopy2 Platform
├── 1. Main Storefront (/)         --> Primary B2C/B2B print-on-demand platform
├── 2. AIMS Platform (/AIMS)       --> Specialized school merchandise catalog & tax-exempt apparel
├── 3. ThePrintFirm (/theprintfirm)--> White-label partner storefronts with custom domain rewrites
└── 4. In-Store Kiosk (/instore)   --> Sales-floor order creation system without customer pricing
```

### 1. Main Web Storefront (`/`)
- Interactive customization design engines (T-Shirts, Hoodies, Gangsheets, Buttons, Transfers).
- Multi-product shopping cart and state sales tax calculation.
- Direct checkout with instant order confirmation, payment capture, and automated receipts.

### 2. AIMS Storefront (`/AIMS`)
- School merchandise catalog system with product variant selection (sizes, colors, categories).
- Tax-exempt apparel processing logic.
- Dedicated password-protected management dashboard (`/AIMS/orders`).

### 3. ThePrintFirm White-Label Platform (`/theprintfirm`)
- Dynamic brand customization (logo, color palettes, store configurations).
- Domain routing via middleware to present customized white-label storefronts.
- Dedicated dashboard (`/theprintfirm/orders`) and branded email communication.

### 4. In-Store Kiosk System (`/instore`)
- Customer and staff sales-floor kiosk interface.
- Price-hidden UI ("Calculating status") designed for in-store order submission.
- Automated payment link generation (PayPal / Handcash) sent directly to customer email/SMS.

---

## ✨ Key Features

### 🎨 Custom Product Designers & Builders
- **T-Shirt & Hoodie Customizers**: Visual preview, front/back print areas, color selectors, size breakdown tables, and size-tier pricing.
- **DTF & Sublimation Gangsheet Builders**: Interactive visual canvas for drag-and-drop gangsheet layout, canvas sizing, resolution validation, and print-ready export.
- **UV Gangsheet Builder**: Layout tools tailored for UV printing specifications.
- **Custom Buttons & Color Copies**: Multi-option configuration forms with instant quantity-based price updates.
- **Quote Request System**: Comprehensive custom print project quote request pipeline with admin response controls.

### 📦 Universal Checkout & Tax Calculation Engine
- Unified checkout flow supporting single or multi-item purchases.
- Integrated **Minnesota Sales Tax Calculator** (6.875% tax rate with automatic tax exemption for apparel items such as T-Shirts and Hoodies).
- Dynamic shipping and local pickup choices.

### 📊 Unified Admin & Orders Dashboard (`/orders` & `/admin`)
- Centralized administration across all 4 storefront sources (`main`, `instore`, `theprintfirm`, `aims`).
- Production status pipeline tracking (`pending`, `processing`, `completed`, `shipped`).
- Designer assignment and time-tracking workload analytics.
- Design proof upload and customer approval workflows with push notification alerts.
- Order file inspector with direct download of high-res print assets.

### 📁 File Upload & Storage Management
- Powered by Supabase Storage (`order-files` bucket).
- Direct API uploads for smaller files and signed upload URL generation for files exceeding 4MB.
- File integrity checks, checksum validation, and image dimension extraction stored in `file_metadata`.

### 💳 Payment & Email Automation
- **Payments**: PayPal SDK integration featuring order authorization, immediate capture, automated retries, test payment mode, and webhook handlers. Stripe integration options included.
- **Emails**: Resend API coupled with React Email templates for customer order confirmations, payment receipts, status updates, quote alerts, and admin new-order notifications.
- **PDF Generation**: `@react-pdf/renderer` generates branded PDF order receipts attached directly to confirmation emails.
- **Discord Webhooks**: Real-time order notification updates dispatched to internal staff Discord channels.

---

## 💻 Technology Stack

### Frontend
- **Framework**: Next.js 15.5.4 (App Router)
- **UI Library**: React 19.2.0 & TypeScript 5
- **Styling**: Tailwind CSS 4.1.14 & Radix UI primitives
- **State Management**: Zustand (Client cart & user states) & TanStack Query (Server state caching)
- **Canvas & Graphics**: Fabric.js / Konva / Canvas utilities for product visualizers
- **Animations**: Framer Motion

### Backend & Infrastructure
- **Server**: Next.js API Routes (Node.js runtime)
- **Database**: Supabase PostgreSQL database
- **Storage**: Supabase Storage Buckets (`order-files`)
- **Authentication**: Cookie-based session middleware with Bcrypt password hashing
- **Email Delivery**: Resend API & `@react-email/components`
- **PDF Rendering**: `@react-pdf/renderer`
- **Payment Processing**: `@paypal/paypal-js` & `@stripe/stripe-js`

---

## 🗄️ Database & Storage Architecture

The database utilizes a **Two-Tier Storage Architecture** optimized for product-specific customization attributes alongside unified order queries:

### Tier 1: Product-Specific Order Tables
Stores product options, design coordinates, print dimensions, and file references:
- `tshirt_orders`
- `hoodie_orders`
- `dtf_transfer_orders`
- `gangsheet_orders`
- `uv_gangsheet_orders`
- `sublimation_gangsheet_orders`
- `button_orders`
- `color_copies_orders`
- `qr_code_orders`

### Tier 2: System & Multi-Product Tables
Handles system-level catalogs and multi-product cart orders:
- `aims_orders` & `aims_products`
- `theprintfirm_orders` & `theprintfirm_products`
- `instore_orders`
- `quotes`

### Core Support & Config Tables
- `file_metadata`: Upload tracking, dimensions, file paths.
- `aims_config` & `theprintfirm_config`: Branding setups.
- `users`: Staff, manager, and designer access roles.

---

## 📂 Project Directory Structure

```
qc2-mvp-v0.2/
├── app/                        # Next.js 15 App Router Pages & APIs
│   ├── (main-site)/            # Main website homepage & product builders
│   ├── AIMS/                   # AIMS school merch storefront & dashboard
│   ├── theprintfirm/           # ThePrintFirm white-label storefront & dashboard
│   ├── instore/                # In-store kiosk ordering interface
│   ├── admin/                  # Master admin dashboard
│   ├── orders/                 # Unified orders management hub
│   ├── checkout/               # Universal checkout system
│   └── api/                    # API endpoints (checkout, uploads, emails, paypal)
├── components/                 # Reusable React components
│   ├── TShirtDesigner.tsx      # T-Shirt customizer form
│   ├── CustomHoodieForm.tsx    # Hoodie customizer form
│   ├── CustomGangsheetForm.tsx # Visual gangsheet builder
│   ├── PayPalButton.tsx        # PayPal checkout component
│   ├── aims/                   # AIMS UI components
│   ├── theprintfirm/           # White-label UI components
│   ├── orders/                 # Order management components
│   └── ui/                     # Radix & Tailwind UI primitives
├── lib/                        # Core business logic, services & SQL schema
│   ├── supabase.ts             # Supabase client setup
│   ├── tax-calculator.ts       # Minnesota sales tax rules engine
│   ├── file-storage-service.ts # Uploads & storage manager
│   ├── email-service.ts        # Resend email notifications
│   ├── pdf-service.ts          # PDF receipt renderer
│   ├── payment-retry-service.ts# PayPal retry & recovery service
│   └── sql/                    # Migration & database setup scripts
├── emails/                     # React Email HTML templates
├── public/                     # Static media assets, icons & graphics
├── scripts/                    # Database migrations, backfills, & audit utilities
├── middleware.ts               # Routing, auth, and custom domain middleware
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS styling configuration
└── package.json                # Project dependencies and script commands
```

---

## 🚀 Getting Started & Setup

### Prerequisites

- **Node.js**: v18.17+ or v20+
- **npm** or **pnpm**
- **Supabase Account**: PostgreSQL instance and storage bucket enabled

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd qc2-mvp-v0.2
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_ENV=sandbox # Or 'production'

# Resend Email Configuration
RESEND_API_KEY=your-resend-api-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=support@quickcopy2.com
ADMIN_EMAILS_CC=admin1@quickcopy2.com,admin2@quickcopy2.com

# Site Security Sessions
ADMIN_PASSWORD=your-secure-admin-password
```

### 3. Run Database Migrations

Execute the SQL setup scripts in your Supabase SQL Editor:
1. `lib/unified-database-schema.sql` (Creates order tables & indexes)
2. `lib/setup-storage-buckets.sql` (Configures `order-files` bucket & policies)

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches Next.js dev server |
| `npm run build` | Builds application for production |
| `npm run start` | Starts Next.js production server |
| `npm run lint` | Runs ESLint code quality checks |
| `npm run typecheck` | Validates TypeScript types across the codebase |
| `npm run test:unit` | Executes unit tests via Vitest |
| `npm run analyze` | Analyzes bundle sizes using `@next/bundle-analyzer` |
| `npm run stripe:webhook` | Starts local Stripe CLI webhook listener |

---

## 🚢 Deployment Workflow

This project is configured for deployment on **Vercel**:

1. **Environment Variables**: Ensure all production credentials (Supabase, PayPal Production Keys, Resend API key, Site URLs) are added in the Vercel Dashboard settings.
2. **Production Deployment**: Push to `main` branch or trigger deployment manually through Vercel CLI / Dashboard.
3. **Verification**: Run post-deployment verification checks outlined in `DEPLOYMENT_CHECKLIST.md`.

---

## 📄 License

Private & Proprietary - QuickCopy2. All rights reserved.
