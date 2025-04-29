
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg mb-6">
      <Input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products..."
        className="mr-2"
      />
      <Button 
        type="submit" 
        className="bg-terra hover:bg-terra-dark whitespace-nowrap"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
