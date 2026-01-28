export interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  hours: {
    open: string;
    close: string;
    days: string;
  };
  isOpen: boolean;
  offers: BranchOffer[];
  deliveryLinks: {
    uberEats: string;
    doorDash: string;
  };
  image: string;
  phone: string;
}

export interface BranchOffer {
  id: string;
  title: string;
  description: string;
  code?: string;
  image: string;
  discount?: number;
  validUntil: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  images: string[];
  tastingNotes: string[];
  origin: string;
  roastLevel: RoastLevel;
  tags: string[];
  grindOptions: GrindType[];
  weight: string;
  isSubscribable: boolean;
}

export interface BranchProduct {
  branchId: string;
  productId: string;
  price: number;
  availability: 'in_stock' | 'low_stock' | 'out_of_stock';
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  branchId: string;
  grind: GrindType;
  subscriptionPlan: SubscriptionPlan | null;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  branchId: string;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  pickupTime?: string;
  subtotal: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export type ProductCategory = 
  | 'espresso' 
  | 'filter' 
  | 'pods' 
  | 'matcha' 
  | 'gifts' 
  | 'equipment' 
  | 'merchandise';

export type RoastLevel = 'light' | 'medium' | 'medium-dark' | 'dark';

export type GrindType = 
  | 'whole_bean' 
  | 'espresso' 
  | 'french_press' 
  | 'v60' 
  | 'aeropress' 
  | 'moka_pot'
  | 'chemex';

export interface SubscriptionPlan {
  frequency: 'weekly' | 'biweekly' | 'monthly';
  discount: number; // percentage
}

export type OrderStatus = 'placed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export type OrderType = 'delivery' | 'pickup' | null;

// Form types
export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  pickupTime?: string;
}

// Filter types
export interface ProductFilters {
  category?: ProductCategory;
  roastLevel?: RoastLevel;
  tastingNotes?: string[];
  search?: string;
  sort?: 'featured' | 'price_low' | 'price_high' | 'name';
}
