
import React,  { useEffect, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import ReviewItem from '../components/ReviewItem';
import ReviewForm from '../components/ReviewForm';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, incrementViews, addReview } = useProducts();
  const { addToCart } = useCart();
  const viewIncremented = useRef(false);

  const product = getProductById(id || '');
  
  useEffect(() => {
    if (product && ! viewIncremented.current) {
      incrementViews(product.id);
      viewIncremented.current = true;
    }else if (!product) {
      // Product not found, redirect to homepage
      navigate('/');
    }
  }, [product, incrementViews, navigate]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-charcoal-dark">{product.name}</h1>
          <p className="text-sm text-gray-500 uppercase mt-2">{product.category}</p>
          
          <div className="mt-6">
            <p className="text-2xl font-bold text-terra-dark">
              {product.price.toLocaleString()} DZD
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Product Metrics</div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm">{product.views} views</span>
                <span className="text-sm">{product.sold} sold</span>
                <span className="text-sm">{product.reviews.length} reviews</span>
              </div>
            </div>
            <div>
              <Button
                onClick={handleAddToCart}
                className="bg-terra hover:bg-terra-dark flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
          </div>
        )}
        
        <ReviewForm productId={product.id} onSubmit={addReview} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
