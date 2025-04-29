
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white py-4 px-6 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-terra-dark">
            Dzair Styles
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-charcoal-dark hover:text-terra-dark transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-charcoal-dark hover:text-terra-dark transition-colors">
            All Products
          </Link>
          <Link to="/cart" className="relative">
            <Button 
              variant="outline"
              className="flex items-center gap-2 border-terra hover:bg-terra-light hover:text-white"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-terra text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="relative mr-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-terra text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-inner animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/"
              className="text-charcoal-dark hover:text-terra-dark py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products"
              className="text-charcoal-dark hover:text-terra-dark py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
