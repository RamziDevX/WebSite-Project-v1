
import React, { createContext, useContext, useState } from 'react';
import { Product, products as initialProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  incrementViews: (productId: string) => void;
  addReview: (productId: string, review: { username: string; rating: number; comment: string }) => void;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const incrementViews = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, views: product.views + 1 }
          : product
      )
    );
  };

  const addReview = (productId: string, reviewData: { username: string; rating: number; comment: string }) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.id === productId) {
          const newReview = {
            id: `r${product.reviews.length + 1}-${Date.now()}`,
            ...reviewData,
            date: new Date().toISOString().split('T')[0]
          };
          
          return {
            ...product,
            reviews: [...product.reviews, newReview]
          };
        }
        return product;
      })
    );
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const value = {
    products,
    incrementViews,
    addReview,
    getProductById
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
