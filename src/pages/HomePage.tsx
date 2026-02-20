import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { MOCK_RESTAURANTS } from '@shared/mock-data';
import { Link } from 'react-router-dom';
import { Star, Clock, Bike, ArrowRight, SearchX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useSearchStore } from '@/store/searchStore';
import { Button } from '@/components/ui/button';
const CATEGORIES = [
  { name: 'All', icon: '🍽️' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Burgers', icon: '🍔' },
  { name: 'Healthy', icon: '🥗' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Mexican', icon: '��' },
];
export function HomePage() {
  const searchQuery = useSearchStore(s => s.searchQuery);
  const activeCategory = useSearchStore(s => s.activeCategory);
  const setActiveCategory = useSearchStore(s => s.setActiveCategory);
  const setSearchQuery = useSearchStore(s => s.setSearchQuery);
  const filteredRestaurants = useMemo(() => {
    return MOCK_RESTAURANTS.filter(restaurant => {
      const matchesSearch = 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || restaurant.tags.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);
  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-stone-900 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
              alt="Delicious food spread"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl space-y-6"
            >
              <Badge className="bg-primary/20 text-primary-foreground hover:bg-primary/30 border-primary/30 px-3 py-1 text-sm backdrop-blur-sm">
                Fast Delivery in your area
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-balance">
                Cravings satisfied, <span className="text-primary">delivered.</span>
              </h1>
              <p className="text-lg md:text-xl text-stone-300 max-w-xl text-pretty">
                Discover the best local restaurants and get your favorite meals delivered straight to your door in minutes.
              </p>
            </motion.div>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
          {/* Categories */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Explore Categories</h2>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex w-max space-x-4">
                {CATEGORIES.map((category, i) => {
                  const isActive = activeCategory === category.name;
                  return (
                    <motion.button
                      key={category.name}
                      initial={{ opacity: 0, scale: 0.9, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCategory(category.name)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-colors duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-foreground border-primary shadow-md'
                          : 'bg-background hover:bg-muted hover:border-muted-foreground/30'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </motion.button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" className="hidden sm:flex" />
            </ScrollArea>
          </section>
          {/* Featured Restaurants */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                {searchQuery ? 'Search Results' : 'Featured Restaurants'}
              </h2>
              {!searchQuery && (
                <button className="text-primary font-medium flex items-center hover:underline transition-all">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              )}
            </div>
            {filteredRestaurants.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredRestaurants.map((restaurant, index) => (
                    <motion.div
                      layout
                      key={restaurant.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Link
                        to={`/restaurant/${restaurant.id}`}
                        className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {restaurant.featured && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-primary text-primary-foreground shadow-sm">Featured</Badge>
                            </div>
                          )}
                          <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1 shadow-sm">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            {restaurant.deliveryTime}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                              {restaurant.name}
                            </h3>
                            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                              <span className="text-sm font-bold">{restaurant.rating}</span>
                              <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {restaurant.tags.map(tag => (
                              <span key={tag} className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-auto pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Bike className="h-4 w-4" />
                              <span>${restaurant.deliveryFee} Delivery</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center bg-muted/30 rounded-3xl border border-dashed"
              >
                <div className="h-24 w-24 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <SearchX className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No restaurants found</h3>
                <p className="text-muted-foreground max-w-md mb-8">
                  We couldn't find any restaurants matching "{searchQuery}" in the {activeCategory} category.
                </p>
                <Button onClick={handleClearFilters} size="lg" className="rounded-full shadow-sm">
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}