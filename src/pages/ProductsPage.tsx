
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { useProducts } from '../context/ProductContext';

const ProductsPage: React.FC = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Apply filters whenever products, category, or search term changes
  useEffect(() => {
    let result = products;

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(lowerSearchTerm) || 
          product.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-charcoal-dark">All Products</h1>
        <p className="text-gray-600">
          Browse our collection of traditional and modern Algerian clothing
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mb-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600">No products found matching your criteria</h2>
          <Button 
            variant="link" 
            className="text-terra hover:text-terra-dark mt-2"
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
