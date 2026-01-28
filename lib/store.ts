import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Branch, CartItem, Order, OrderType, GrindType, SubscriptionPlan } from './types';
import { generateOrderNumber } from './utils';

interface StoreState {
  // Order type
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  
  // Branch
  selectedBranch: Branch | null;
  setSelectedBranch: (branch: Branch | null) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  
  // Orders
  orders: Order[];
  createOrder: (customerName: string, customerPhone: string, pickupTime?: string) => Order;
  getOrder: (orderId: string) => Order | undefined;
  
  // UI state
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  showEntryModal: boolean;
  setShowEntryModal: (show: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Order type
      orderType: null,
      setOrderType: (type) => set({ orderType: type }),
      
      // Branch
      selectedBranch: null,
      setSelectedBranch: (branch) => {
        // Clear cart when changing branch
        set({ selectedBranch: branch, cart: [] });
      },
      
      // Cart
      cart: [],
      addToCart: (item) => {
        const id = `${item.productId}-${item.branchId}-${item.grind}-${item.subscriptionPlan?.frequency || 'onetime'}-${Date.now()}`;
        
        // Check if same product with same options exists
        const existingIndex = get().cart.findIndex(
          (cartItem) =>
            cartItem.productId === item.productId &&
            cartItem.branchId === item.branchId &&
            cartItem.grind === item.grind &&
            cartItem.subscriptionPlan?.frequency === item.subscriptionPlan?.frequency
        );
        
        if (existingIndex >= 0) {
          // Update quantity of existing item
          const newCart = [...get().cart];
          newCart[existingIndex].quantity += item.quantity;
          set({ cart: newCart });
        } else {
          // Add new item
          set({ cart: [...get().cart, { ...item, id }] });
        }
      },
      removeFromCart: (itemId) => {
        set({ cart: get().cart.filter((item) => item.id !== itemId) });
      },
      updateCartItemQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => {
          const itemTotal = item.unitPrice * item.quantity;
          if (item.subscriptionPlan) {
            return total + itemTotal * (1 - item.subscriptionPlan.discount / 100);
          }
          return total + itemTotal;
        }, 0);
      },
      getCartItemCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
      
      // Orders
      orders: [],
      createOrder: (customerName, customerPhone, pickupTime) => {
        const state = get();
        const order: Order = {
          id: `order-${Date.now()}`,
          orderNumber: generateOrderNumber(),
          branchId: state.selectedBranch?.id || '',
          items: [...state.cart],
          customerName,
          customerPhone,
          pickupTime,
          subtotal: state.getCartTotal(),
          total: state.getCartTotal(), // Could add taxes/fees here
          status: 'placed',
          createdAt: new Date().toISOString(),
        };
        set({ orders: [...state.orders, order], cart: [] });
        return order;
      },
      getOrder: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
      
      // UI state
      isCartOpen: false,
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      showEntryModal: true,
      setShowEntryModal: (show) => set({ showEntryModal: show }),
    }),
    {
      name: 'coffee-shop-storage',
      partialize: (state) => ({
        orderType: state.orderType,
        selectedBranch: state.selectedBranch,
        cart: state.cart,
        orders: state.orders,
        showEntryModal: state.showEntryModal,
      }),
    }
  )
);

// Helper hooks
export const useSelectedBranch = () => useStore((state) => state.selectedBranch);
export const useCart = () => useStore((state) => state.cart);
export const useCartTotal = () => useStore((state) => state.getCartTotal());
export const useCartItemCount = () => useStore((state) => state.getCartItemCount());
export const useOrderType = () => useStore((state) => state.orderType);
