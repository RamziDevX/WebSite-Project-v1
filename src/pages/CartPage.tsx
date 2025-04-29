
import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { ShoppingCart } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart } = useCart();
  
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <ShoppingCart size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild className="bg-terra hover:bg-terra-dark">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="hidden md:flex border-b pb-4 text-sm font-medium text-gray-500">
            <div className="w-1/2">Product</div>
            <div className="w-1/4 text-center">Quantity</div>
            <div className="w-1/4 text-right">Total</div>
          </div>
          
          <div className="divide-y">
            {cart.items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Total Items:</span> {cart.totalItems}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium text-gray-700 mb-1">Subtotal</p>
              <p className="text-2xl font-bold text-terra-dark">
                {cart.totalPrice.toLocaleString()} DZD
              </p>
              <p className="text-sm text-gray-500 mt-1">Shipping and taxes calculated at checkout</p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col md:flex-row justify-between">
            <Button 
              asChild
              variant="outline" 
              className="mb-4 md:mb-0"
            >
              <Link to="/">Continue Shopping</Link>
            </Button>
            <Button className="bg-terra hover:bg-terra-dark">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
