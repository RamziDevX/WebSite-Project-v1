
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface ReviewFormProps {
  productId: string;
  onSubmit: (productId: string, review: { username: string; rating: number; comment: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !comment.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Submit the review
    onSubmit(productId, {
      username: username.trim(),
      rating,
      comment: comment.trim()
    });
    
    // Reset form
    setUsername('');
    setRating(5);
    setComment('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          required
          className="w-full"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="mr-1 focus:outline-none"
            >
              <svg
                className={`w-6 h-6 ${value <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating} / 5)</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Review
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product"
          required
          className="w-full h-24"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting || !username.trim() || !comment.trim()}
        className="bg-terra hover:bg-terra-dark"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;
