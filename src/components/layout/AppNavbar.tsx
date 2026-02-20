import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore } from '@/store/cartStore';
import { Link } from 'react-router-dom';
export function AppNavbar() {
  const items = useCartStore(s => s.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-primary">
              <span className="text-primary-foreground font-bold text-xl leading-none">S</span>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight hidden sm:inline-block">
              SavorEats
            </span>
          </Link>
        </div>
        <div className="flex-1 max-w-md hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            type="search" 
            placeholder="Search restaurants, cuisines, or dishes..." 
            className="w-full pl-10 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-background transition-all rounded-full h-10" 
          />
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