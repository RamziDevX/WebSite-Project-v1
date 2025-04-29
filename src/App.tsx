
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProductProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-sand-light">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <footer className="bg-charcoal text-white py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                  <p className="mb-2">© 2025 Dzair Styles - All rights reserved</p>
                  <p className="text-sm text-gray-400">Beautiful Algerian Clothing</p>
                  <p className="text-sm text-gray-300">Developed by Oulaliahine Mohamed Ramzi and Abderraouf Soualmi</p>
                </div>
              </footer>
            </div>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
