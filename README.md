# Coffissimo Coffee - Premium E-commerce Website

A modern, highly aesthetic, responsive e-commerce website for a premium coffee shop. Built with Next.js 14, TypeScript, Tailwind CSS, and a suite of modern React libraries.

![Coffissimo Coffee](https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80)

## Features

### Core Functionality
- **Entry Flow**: Choose between Delivery (via Uber Eats/DoorDash) or Pick Up
- **Branch Selection**: Select a branch to see location-specific prices, availability, and offers
- **Product Catalog**: Browse products with category filters, search, and sorting
- **Product Detail**: View tasting notes, select grind type, choose subscription options
- **Cart Management**: Slide-over cart + full cart page with quantity controls
- **Checkout**: Complete pickup orders with customer details and pickup time
- **Order Tracking**: View order history and confirmation details

### Branch-Specific Features
- Different prices per branch
- Different availability (in stock, low stock, out of stock)
- Branch-specific offer banners on home page
- Checkout blocked when branch is closed

### Design Highlights
- Premium, minimal, editorial aesthetic
- Refined serif typography (Playfair Display) + clean sans-serif (Inter)
- Warm neutral color palette with espresso accents
- Subtle grain texture overlay
- Smooth animations and page transitions
- Mobile-first responsive design
- Sticky header with scroll compression

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd coffee-e

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
coffee-e/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with providers
│   ├── branches/             # Branch selection page
│   ├── shop/                 # Shop & product detail pages
│   ├── cart/                 # Full cart page
│   ├── checkout/             # Checkout flow
│   ├── order-confirmation/   # Order success page
│   ├── orders/               # Order history
│   ├── visit/                # Café locations
│   ├── about/                # Brand story
│   ├── faqs/                 # FAQ accordion
│   └── subscriptions/        # Subscription info
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Header, Footer
│   ├── home/                 # Hero, Collections, etc.
│   ├── branch/               # Branch cards
│   ├── product/              # Product cards & grid
│   ├── cart/                 # Cart sheet
│   └── entry/                # Entry modal
├── lib/
│   ├── data.ts               # Seed data (branches, products)
│   ├── types.ts              # TypeScript types
│   ├── store.ts              # Zustand store
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

## Key Design Decisions

### State Management
- **Zustand** with persistence middleware for cart, selected branch, and orders
- Cart is cleared when switching branches to prevent price/availability conflicts
- Order type (delivery/pickup) and selected branch are global state

### Branch-Specific Logic
- `branchProducts` table links products to branches with individual prices and availability
- Home page hero shows branch-specific offers
- Checkout is blocked if selected branch is closed

### Subscription Model
- Products can be subscribable with frequency options (weekly, bi-weekly, monthly)
- Discounts: 15% (weekly), 12% (bi-weekly), 10% (monthly)
- Subscription plan is stored per cart item

### Form Validation
- Zod schemas for type-safe form validation
- React Hook Form for performant form handling
- Clear error messages and accessible form labels

### Animation Strategy
- Framer Motion for:
  - Page transitions (fade/slide)
  - Hover micro-interactions
  - Modal/sheet animations
  - Scroll-triggered reveals
- Parallax effects on editorial sections
- Smooth accordion animations for FAQs

## Data Model

### Branch
```typescript
interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  hours: { open: string; close: string; days: string };
  isOpen: boolean;
  offers: BranchOffer[];
  deliveryLinks: { uberEats: string; doorDash: string };
}
```

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  images: string[];
  tastingNotes: string[];
  origin: string;
  roastLevel: RoastLevel;
  grindOptions: GrindType[];
  isSubscribable: boolean;
}
```

### BranchProduct
```typescript
interface BranchProduct {
  branchId: string;
  productId: string;
  price: number;
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
  featured?: boolean;
}
```

## Accessibility

- Keyboard navigation for all interactive elements
- Clear focus rings (2px solid ring)
- Proper ARIA labels on form inputs
- Screen reader friendly modals and sheets
- Sufficient color contrast ratios

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.

---

Built with care for exceptional coffee experiences.
