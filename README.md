# Hair Palace - E-commerce Storefront

A modern, full-featured e-commerce storefront built with Next.js 14, TypeScript, and Tailwind CSS. Integrates with a custom Storefront HTTP API for product management, shopping cart, and order processing.

## Features

- **Product Browsing**: Browse all products with pagination and filtering
- **Product Search**: Search products by name or description
- **Category Navigation**: Browse products by category
- **Product Details**: Detailed product pages with variant selection
- **Shopping Cart**: Full cart management (add, update, remove items)
- **Checkout Flow**: Complete checkout with customer information
- **Order Tracking**: Track order status by order number and email
- **Responsive Design**: Mobile-first, responsive layout
- **Session Management**: Persistent cart using session IDs
- **Type-Safe**: Built with TypeScript for type safety

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Icons**: Lucide React
- **API**: Custom Storefront HTTP API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the storefront directory:
```bash
cd storefront
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
The `.env.local` file is already configured with the API URL:
```env
NEXT_PUBLIC_STORE_API_URL=https://acoustic-seahorse-440.convex.site/api/store/hair-palace
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
storefront/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── products/            # Product listing and detail pages
│   ├── categories/          # Category pages
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout flow
│   └── orders/              # Order tracking page
├── components/              # Reusable components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer
│   └── ProductCard.tsx      # Product card component
├── contexts/                # React Context providers
│   ├── SessionContext.tsx   # Session management
│   └── CartContext.tsx      # Cart state management
├── lib/                     # Utility functions and API client
│   ├── api.ts               # API client functions
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Helper functions
└── public/                  # Static assets
```

## Available Pages

- **/** - Home page with featured products
- **/products** - Product listing with filters
- **/products/[slug]** - Individual product details
- **/categories** - All categories
- **/categories/[slug]** - Category with products
- **/cart** - Shopping cart
- **/checkout** - Checkout flow
- **/orders** - Order tracking

## API Integration

The storefront integrates with a RESTful API for:
- Products (list, search, details, related)
- Categories (list, details, products)
- Cart (get, add item, update quantity, remove item)
- Orders (checkout, status tracking)

## Building for Production

```bash
npm run build
npm start
```

## Design System

The storefront uses a modern, minimalist design based on the provided design system:
- **Colors**: Black (#000000), White (#FFFFFF), Gray (#F7F8FA)
- **Typography**: Poppins font family
- **Components**: Rounded corners (16px cards, 8px buttons)
- **Spacing**: Consistent spacing scale
- **Responsive**: Mobile-first approach

See [design-system.json](./design-system.json) for complete design specifications.
