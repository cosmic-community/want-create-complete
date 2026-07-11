# Future Fashion ERP

![App Preview](https://imgix.cosmicjs.com/6dc6d710-7d41-11f1-94ad-a52b70e9a615-autopilot-photo-1556905055-8f358a7a47b2-1783785539319.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A complete Enterprise Resource Planning (ERP) system for **Future Fashion Ready-Made Garments**, a garment manufacturer operating in a special free zone. This application manages business partners, inventory, warehouses, purchase orders, production orders, and the chart of accounts — all powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 📊 **Dashboard Overview** — Key metrics at a glance across all modules
- 🏢 **Business Partners** — Manage suppliers and customers with balances and contact info
- 📦 **Products & Materials** — Track raw materials, supplies, and finished goods inventory
- 🏬 **Warehouses** — Organize storage locations by type and manager
- 🛒 **Purchase Orders** — View purchase orders with line items and totals
- 🧵 **Production Orders** — Track client garment orders with specs and delivery dates
- 📊 **Chart of Accounts** — Full accounting structure with account hierarchy
- 💵 **US Dollar** primary currency support with multi-currency partner balances
- 📱 Fully responsive, modern UI with clean navigation

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a5267b267f2f6a3f805a093&clone_repository=6a52693d67f2f6a3f805a0eb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: I want to create a complete ERP system for Future Fashion Ready-Made Garments. Future Fashion is a company operating within a special free zone. It manufactures ready-made garments based on production orders received from clients, with specifications and designs tailored to their requirements. The company imports a significant portion of its raw materials and operating supplies. It also purchases some raw materials and operating supplies from local suppliers, both formally and informally. The finished products are exported. The primary currency is the US dollar. The main program tabs are:
> 1. Database
> 2. Warehouses
> 3. Purchase Orders
> 4. Purchases and Sales
> 5. Suppliers and Customers
> 6. Payments and Receivables
> 7. Banks and Treasury
> 8. Shipping and Customs Clearance
> 9. Taxes
> 10. Financial Reports
> 11. Production Orders
> 12. Production Tracking
> 13. Finished Products
> 14. Manufacturing Costs
> 15. Production Reports
> 16. Chart of Accounts
> 17. Settings"

### Code Generation Prompt

> Build a Next.js application for a website called "Want create complete". Create a beautiful, modern, responsive design with a homepage and pages for each content type. I want to create a complete ERP system for Future Fashion Ready-Made Garments.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) — headless CMS ([docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account and bucket

### Installation

```bash
bun install
```

Set your environment variables (these are provided automatically in the Cosmic dashboard):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all products with connected warehouse data
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single purchase order
const { object: po } = await cosmic.objects
  .findOne({ type: 'purchase-orders', slug: 'po-1001' })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from six object types: `business-partners`, `products`, `warehouses`, `purchase-orders`, `production-orders`, and `chart-of-accounts`. Connected fields (like a product's warehouse or a purchase order's supplier) are resolved using the Cosmic `depth` parameter. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel**: Import the repo and set the environment variables in the project settings.
- **Netlify**: Connect the repo, set env vars, and deploy.

For production, set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's dashboard.

<!-- README_END -->