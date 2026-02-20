import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Home, Compass, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore } from '@/store/cartStore';
import { useSearchStore } from '@/store/searchStore';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
export function AppNavbar() {
  const items = useCartStore(s => s.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const searchQuery = useSearchStore(s => s.searchQuery);
  const setSearchQuery = useSearchStore(s => s.setSearchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Drawer */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
              <SheetHeader className="p-6 border-b text-left">
                <SheetTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-primary">
                    <span className="text-primary-foreground font-bold text-xl leading-none">S</span>
                  </div>
                  <span className="text-2xl font-display font-bold tracking-tight">
                    SavorEats
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="p-6 flex-1 flex flex-col gap-6">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="search"
                    placeholder="Search restaurants, cuisines..."
                    className="w-full pl-10 pr-10 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-background transition-all rounded-full h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <nav className="flex flex-col gap-2">
                  <Button variant="ghost" className="justify-start text-lg h-12" onClick={() => handleNavigation('/')}>
                    <Home className="mr-3 h-5 w-5 text-muted-foreground" /> Home
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg h-12" onClick={() => handleNavigation('/')}>
                    <Compass className="mr-3 h-5 w-5 text-muted-foreground" /> Explore
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg h-12" onClick={() => handleNavigation('/checkout')}>
                    <Package className="mr-3 h-5 w-5 text-muted-foreground" /> Checkout
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-primary">
              <span className="text-primary-foreground font-bold text-xl leading-none">S</span>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight hidden sm:inline-block">
              SavorEats
            </span>
          </Link>
        </div>
        {/* Desktop Search */}
        <div className="flex-1 max-w-md hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="Search restaurants, cuisines, or dishes..."
            className="w-full pl-10 pr-10 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-background transition-all rounded-full h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <CartDrawer trigger={
            <Button variant="outline" size="icon" className="relative rounded-full border-muted-foreground/20 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold shadow-sm animate-scale-in">
                  {itemCount}
                </span>
              )}
            </Button>
          } />
        </div>
      </div>
    </header>
  );
}