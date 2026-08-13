# 🌌 Dark Star Book & Merch Platform

A modern, full-stack Next.js web application for book publishing, custom merchandise e-commerce, interactive community events (**Rondo Block Party**), and an enterprise-grade admin management suite.

---

## 🚀 Tech Stack

### **Frontend & Framework**
* **Framework:** [Next.js 16.2.6](https://nextjs.org/) (App Router, Server Components, Server Actions)
* **Library:** [React 19.2.6](https://react.dev/) & [TypeScript 6.0.3](https://www.typescriptlang.org/)
* **Styling & UI Design:**
  * [TailwindCSS 4.3.0](https://tailwindcss.com/) & PostCSS
  * [Radix UI](https://www.radix-ui.com/) (Accordion, Slot, UI Primitives)
  * [Framer Motion 12.38.0](https://www.framer.com/motion/) (Smooth animations & micro-interactions)
  * [Lucide React](https://lucide.dev/) (Modern icon library)
  * [Sonner](https://sonner.emilkowal.si/) (Toast notifications)
* **3D Visualizations:** [Cobe](https://github.com/shadinger/cobe) (Interactive 3D WebGL Globe)
* **Rich Text Editing:** [Tiptap Editor](https://tiptap.dev/) (StarterKit, Markdown, Tables, Links extensions)

### **Backend & Database**
* **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security, Custom RPCs, Real-time Subscriptions)
* **SDK:** `@supabase/supabase-js` (v2) & `@supabase/ssr` (v0.10)
* **Payment Gateways & Fulfillment:**
  * [Stripe API](https://stripe.com/) (`stripe` v22.1.1)
  * [PayPal API](https://developer.paypal.com/) & Webhook Fulfillment
* **Document Generation:** [jsPDF](https://github.com/parallax/jsPDF) & `jspdf-autotable` (Invoice & order export generation)
* **Data Validation:** [Zod 4.4.3](https://zod.dev/)

### **Testing & Development**
* **Test Runner:** Native Node.js Test Runner (`node --test`)
* **Package Manager:** `pnpm` (v10.33.2)
* **Linter & Type Checker:** ESLint 9 & TypeScript Compiler

---

## ✨ Core Features

### 🛒 1. E-Commerce Storefront & Custom Print Studio (`/store`)
* **Product Catalog:** Browse products with categories, variant selection (size, color), live stock tracking, and pricing updates.
* **Custom Print Studio:** Interactive design preview with custom print areas and customized product pricing models.
* **Customer Product Reviews:** Verified purchase review eligibility and rating system.
* **Geocoded Cart & Shipping:** Address autocomplete and reverse geocoding via Nominatim with dynamic shipping rate calculations.

### 💳 2. Payment Checkout & Order Fulfillment (`/checkout`, `/track-order`)
* **Dual Payment Integrations:** Seamless checkout flow supporting both Stripe and PayPal.
* **Order Tracking:** Public and customer account order lookup with real-time status indicators (`Processing`, `In Production`, `Shipped`, `Delivered`).
* **Automated Webhooks & Email Notifications:** Automated fulfillment triggers and customer confirmation emails.

### 🏷️ 3. Rules-Based Discount & Coupon Subsystem
* **Flexible Promotion Rules:** Cart-level percentages/fixed discounts, product line-item targeting, minimum cart value criteria, and customer-specific coupon assignments.
* **Validation & Safety:** Server-side usage limits, rate-limited coupon previews, application reservation validation, and reconciliation tools.

### 🎉 4. Rondo Block Party / Rondo Days Community Hub (`/Rondo-Block-Party`)
* **Community Showcase:** Interactive landing section highlighting event details and community stories.
* **Content Management & Submissions:** Public story submission form and rich-text CMS content.
* **Digital Media:** EPUB digital book download distribution and QR code engagement tracking.

### 🛠️ 5. Comprehensive Admin Management Suite (`/admin`)
* **Analytics Dashboard:** Live metrics covering sales revenue, order volumes, customer retention, and activity logs.
* **Order Management:** View, search, update status, create manual orders, and export order slips or PDF invoices.
* **Customer CRM:** Manage customer profiles, transaction history, and promo assignments.
* **Coupon & Promotions Suite:** Full CRUD for creating, scheduling, target assignment, and bulk deletion of discount codes.
* **Pricing Management:** Control homepage pricing tier cards, features, and custom storefront product costs.
* **Rondo Days CMS:** Dedicated WYSIWYG editor for customizing community party content, announcements, and tracking QR metrics.
* **Role-Based Access Control (RBAC):** Granular permissions separating Super Admins and Staff accounts.

---

## 📁 Project Directory Structure

```text
Dark-star-book/
├── app/                        # Next.js 16 App Router Pages & Routes
│   ├── (public)/               # Public pages (Home, Contact, Thank You)
│   ├── Rondo-Block-Party/      # Rondo Block Party community feature page
│   ├── account/                # Customer profile & account area
│   ├── admin/                  # Admin dashboard & management routes
│   │   ├── dashboard/          # Admin analytics & control center
│   │   └── login/              # Admin authentication login page
│   ├── api/                    # API Endpoints (Stripe, PayPal webhooks, coupons, tracking)
│   ├── checkout/               # Storefront shopping checkout flow
│   ├── store/                  # E-commerce product catalog & print studio
│   ├── track-order/            # Real-time order status tracking
│   └── globals.css             # Base styles and TailwindCSS imports
├── components/                 # Reusable React UI Components
│   ├── admin/                  # Admin control management components (Orders, Coupons, CRM)
│   ├── shop/                   # E-commerce store components (Cart, Product Card, Print Studio)
│   ├── ui/                     # UI Primitives & Radix components
│   ├── landing-page.tsx        # Dynamic home landing page view
│   └── navbar.tsx              # Application header navigation
├── lib/                        # Business Logic, Loaders & Integrations
│   ├── promotions/             # Coupon calculation & discount rules engine
│   ├── supabase/               # Supabase database clients & helpers
│   ├── admin-data.ts           # Admin data fetching & manipulation methods
│   ├── email-notifications.ts  # Automated customer notification service
│   ├── paypal.ts               # PayPal API & webhook processing
│   ├── shop-checkout-compute.ts# Checkout computation & quote logic
│   └── stripe-server.ts        # Stripe payment intent server utilities
├── supabase/                   # Supabase SQL Migrations & Database Schemas
│   ├── schema.sql              # Core database tables & constraints
│   ├── discount_coupons_*.sql  # Discount system schemas & RLS procedures
│   ├── shop_ecommerce.sql      # Product, variant, cart & order schemas
│   └── rondo_days.sql          # Rondo community content tables
├── tests/                      # Automated Test Suite (Node test runner)
└── package.json                # Project dependencies and script scripts
```

---

## ⚙️ Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **pnpm**: v9.0.0 or higher (recommended package manager)
* **Supabase Account**: PostgreSQL database instance with RLS enabled
* **Stripe & PayPal Accounts**: Developer credentials for API keys and webhooks

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/dark-star-book.git
   cd dark-star-book
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and configure the following key variables:
   ```env
   # Supabase Setup
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

   # Stripe Payments
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

   # PayPal Payments
   PAYPAL_CLIENT_ID=your-paypal-client-id
   PAYPAL_CLIENT_SECRET=your-paypal-client-secret
   PAYPAL_WEBHOOK_ID=your-paypal-webhook-id

   # Application URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run Database Migrations:**
   Apply the SQL schemas inside the `supabase/` folder to your Supabase project in sequential order.

5. **Start Development Server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

The project includes an extensive test suite built using Node's native test runner to verify checkout baseline contracts, coupon schema validations, promotion preview rules, and reservation handling:

```bash
# Run all tests
pnpm test

# Run specific feature tests
pnpm run test:checkout-baseline
pnpm run test:coupon-schema
pnpm run test:promotions
pnpm run test:admin-promotions
```

---

## 📜 License

Private & Proprietary — All rights reserved by Dark Star Book.
