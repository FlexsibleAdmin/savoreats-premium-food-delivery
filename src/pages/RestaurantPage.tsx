import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { MOCK_RESTAURANTS, MOCK_MENU_ITEMS } from '@shared/mock-data';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Star, Clock, Bike, Info, Plus, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { MenuItem } from '@shared/types';
export function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const restaurant = useMemo(() => MOCK_RESTAURANTS.find(r => r.id === id), [id]);
  const menuItems = useMemo(() => MOCK_MENU_ITEMS.filter(m => m.restaurantId === id), [id]);
  const addItem = useCartStore(s => s.addItem);
  // Group menu items by category
  const categories = useMemo(() => {
    const grouped = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof menuItems>);
    return Object.entries(grouped);
  }, [menuItems]);
  const handleAddItem = (item: MenuItem) => {
    addItem(item);
    toast.success(`Added ${item.name} to cart`, {
      description: 'Your item has been added to the cart.',
      action: {
        label: 'Checkout',
        onClick: () => navigate('/checkout')
      },
      duration: 4000,
    });
  };
  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AppNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Button asChild><Link to="/">Return Home</Link></Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />
      <main className="flex-1 pb-20">
        {/* Restaurant Hero */}
        <div className="relative h-64 md:h-80 lg:h-96 w-full bg-stone-900">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8 }}
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute top-4 left-4 sm:left-6 lg:left-8">
            <Button variant="secondary" size="icon" className="rounded-full shadow-md hover:scale-105 transition-transform" asChild>
              <Link to="/"><ChevronLeft className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1 text-foreground font-medium">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    {restaurant.rating} <span className="text-muted-foreground font-normal">({restaurant.reviewCount}+ ratings)</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {restaurant.deliveryTime}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Bike className="h-4 w-4" />
                    ${restaurant.deliveryFee} Delivery
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {restaurant.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="shrink-0 gap-2 rounded-full">
                <Info className="h-4 w-4" /> More Info
              </Button>
            </div>
          </motion.div>
          {/* Menu Sections */}
          <div className="space-y-12">
            {categories.map(([categoryName, items], categoryIndex) => (
              <motion.section
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold tracking-tight">{categoryName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {items.map((item, itemIndex) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                      className="group flex bg-card rounded-xl border shadow-sm hover:shadow-md transition-all p-4 gap-4"
                    >
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                          {item.popular && (
                            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none ml-2 shrink-0">Popular</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-semibold text-lg">${item.price.toFixed(2)}</span>
                          <Button
                            size="sm"
                            className="rounded-full px-4 shadow-sm hover:shadow-md transition-all active:scale-95"
                            onClick={() => handleAddItem(item)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add
                          </Button>
                        </div>
                      </div>
                      {item.image && (
                        <div className="h-28 w-28 rounded-lg overflow-hidden shrink-0 bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}