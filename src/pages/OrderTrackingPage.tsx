import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { api } from '@/lib/api-client';
import { Order, OrderStatus } from '@shared/types';
import { CheckCircle2, Clock, MapPin, Package, ChefHat, Bike, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
const STATUS_STEPS: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: 'placed', label: 'Order Placed', icon: Package },
  { status: 'preparing', label: 'Preparing', icon: ChefHat },
  { status: 'delivering', label: 'On the Way', icon: Bike },
  { status: 'delivered', label: 'Delivered', icon: Home },
];
export function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  useEffect(() => {
    let mounted = true;
    const fetchOrder = async () => {
      try {
        if (!id) return;
        const data = await api<Order>(`/api/orders/${id}`);
        if (mounted) {
          setOrder(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load order');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    fetchOrder();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchOrder, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [id]);
  const handleSimulateProgress = async () => {
    if (!order) return;
    const currentIndex = STATUS_STEPS.findIndex(s => s.status === order.status);
    if (currentIndex < STATUS_STEPS.length - 1) {
      setIsSimulating(true);
      const nextStatus = STATUS_STEPS[currentIndex + 1].status;
      try {
        const updated = await api<Order>(`/api/orders/${order.id}/status`, {
          method: 'PATCH',
          body: JSON.stringify({ status: nextStatus })
        });
        setOrder(updated);
        toast.success(`Order status updated to: ${STATUS_STEPS[currentIndex + 1].label}`);
      } catch (err) {
        toast.error('Failed to update order status');
        console.error('Failed to update status', err);
      } finally {
        setIsSimulating(false);
      }
    }
  };
  if (loading && !order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AppNavbar />
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
          <Skeleton className="h-12 w-3/4 mb-8" />
          <Skeleton className="h-64 w-full rounded-2xl mb-8" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </main>
      </div>
    );
  }
  if (error || !order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AppNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Error Loading Order</h1>
          <p className="text-muted-foreground mb-6">{error || 'Order not found'}</p>
          <Button asChild><Link to="/">Return Home</Link></Button>
        </div>
      </div>
    );
  }
  const currentStepIndex = STATUS_STEPS.findIndex(s => s.status === order.status);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card border rounded-3xl p-6 md:p-10 shadow-sm mb-8"
        >
          <div className="relative">
            {/* Progress Bar Background */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-muted rounded-full -z-10 hidden sm:block" />
            {/* Active Progress Bar */}
            <motion.div
              className="absolute top-6 left-6 h-1 bg-primary rounded-full -z-10 hidden sm:block"
              initial={{ width: 0 }}
              animate={{ width: `${(Math.max(0, currentStepIndex) / (STATUS_STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-0">
              {STATUS_STEPS.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={step.status} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.15, duration: 0.4 }}
                    className="flex sm:flex-col items-center gap-4 sm:gap-3 relative"
                  >
                    <motion.div
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                      className={`h-12 w-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                        isCompleted
                          ? 'bg-primary border-primary text-primary-foreground shadow-md'
                          : 'bg-background border-muted text-muted-foreground'
                      } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div className="sm:text-center">
                      <p className={`font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-primary font-medium mt-0.5 animate-pulse">
                          In Progress
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {order.status !== 'delivered' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex justify-center"
            >
              <Button 
                onClick={handleSimulateProgress} 
                variant="outline" 
                className="gap-2 rounded-full shadow-sm hover:shadow-md transition-all"
                disabled={isSimulating}
              >
                <RefreshCw className={`h-4 w-4 ${isSimulating ? 'animate-spin' : ''}`} /> 
                {isSimulating ? 'Updating...' : 'Simulate Next Step'}
              </Button>
            </motion.div>
          )}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Estimated Delivery
            </h3>
            <p className="text-3xl font-bold">
              {order.status === 'delivered' ? 'Delivered' : '15-25 min'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card border rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Delivery Address
            </h3>
            <p className="font-medium">{order.deliveryAddress}</p>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 bg-card border rounded-2xl p-6 shadow-sm"
        >
          <h3 className="font-semibold mb-4">Order Details</h3>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-3 border-t mt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}