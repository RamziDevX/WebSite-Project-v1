
import React from 'react';
import { CartItem as CartItemType } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  
  return (
    <div className="flex items-center border-b py-4 flex-wrap">
      <div className="w-24 h-24 mr-4 flex-shrink-0">
        <Link to={`/product/${item.product.id}`}>
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover rounded"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/product/${item.product.id}`}>
          <h3 className="font-medium text-charcoal-dark">{item.product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500">{item.product.category}</p>
        <div className="mt-2 text-terra-dark font-medium">
          {item.product.price.toLocaleString()} DZD
        </div>
      </div>
      
      <div className="flex items-center mt-2 md:mt-0">
        <div className="flex items-center border rounded overflow-hidden mr-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => decreaseQuantity(item.product.id)}
          >
            -
          </Button>
          <span className="px-3">{item.quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => increaseQuantity(item.product.id)}
          >
            +
          </Button>
        </div>
        
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={() => removeFromCart(item.product.id)}
        >
          Remove
        </Button>
      </div>
      
      <div className="w-full md:w-auto md:ml-auto mt-2 md:mt-0 text-right">
        <p className="font-bold">
          {(item.product.price * item.quantity).toLocaleString()} DZD
        </p>
      </div>
    </div>
  );
};

export default CartItem;
