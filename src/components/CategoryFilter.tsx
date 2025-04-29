
import React from 'react';
import { categories } from '../data/products';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4 text-charcoal-dark">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={
              selectedCategory === category.id
                ? "bg-terra hover:bg-terra-dark"
                : "text-charcoal-dark hover:text-terra-dark"
            }
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
