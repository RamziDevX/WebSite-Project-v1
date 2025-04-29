import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../data/products';
import { toast } from 'sonner';

// Define the structure of a cart item
export interface CartItem {
  product: Product;
  quantity: number;
}

// Define the structure of our cart state
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Define the actions we can dispatch to our reducer
type CartAction = 
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Define the context type
interface CartContextType {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

// Initial state for our cart
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Helper function to calculate totals
const calculateCartTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  return items.reduce((totals, item) => {
    return {
      totalItems: totals.totalItems + item.quantity,
      totalPrice: totals.totalPrice + (item.product.price * item.quantity)
    };
  }, { totalItems: 0, totalPrice: 0 });
};

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      let updatedItems;
      if (existingItem) {
        // If the item already exists, increase its quantity
        updatedItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Otherwise, add a new item
        updatedItems = [...state.items, { product: action.payload, quantity: 1 }];
      }
      
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload);
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }
    
    case 'INCREASE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.product.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }
    
    case 'DECREASE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.product.id === action.payload
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
      
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }
    
    case 'LOAD_CART': {
      const { totalItems, totalPrice } = calculateCartTotals(action.payload);
      
      return {
        items: action.payload,
        totalItems,
        totalPrice
      };
    }
    
    default:
      return state;
  }
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.items));
  }, [cart.items]);
  
  // Actions
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`Added ${product.name} to your cart`);
  };
  
  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.info('Item removed from cart');
  };
  
  const increaseQuantity = (productId: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
  };
  
  const decreaseQuantity = (productId: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
  };
  
  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Create a custom hook for consuming the context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
