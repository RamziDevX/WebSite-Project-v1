
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const isNewArrival = product.views < 10;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {isNewArrival && (
            <Badge className="absolute top-2 right-2 bg-terra hover:bg-terra-dark">
              New Arrival
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-charcoal-dark truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1 mb-2">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-terra-dark">
              {product.price.toLocaleString()} DZD
            </span>
            <Button 
              size="sm"
              onClick={handleAddToCart}
              className="bg-terra hover:bg-terra-dark flex items-center gap-1"
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </Button>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>{product.views} views</span>
            <span>{product.sold} sold</span>
            <span>{product.reviews.length} reviews</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
