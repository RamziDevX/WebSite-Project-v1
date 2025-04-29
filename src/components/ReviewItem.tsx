
import React from 'react';
import { Review } from '../data/products';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-terra-light text-terra-dark font-medium rounded-full w-8 h-8 flex items-center justify-center mr-3">
            {review.username[0].toUpperCase()}
          </div>
          <span className="font-medium">{review.username}</span>
        </div>
        <span className="text-gray-400 text-sm">{review.date}</span>
      </div>
      
      <div className="mt-2">
        {renderStars(review.rating)}
      </div>
      
      <p className="mt-2 text-gray-700">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewItem;
