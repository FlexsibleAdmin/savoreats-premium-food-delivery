import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCartStore } from '@/store/cartStore';
import { api } from '@/lib/api-client';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Order } from '@shared/types';
const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
});
type CheckoutForm = z.infer<typeof checkoutSchema>;
export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore(s => s.items);
  const clearCart = useCartStore(s => s.clearCart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const taxes = subtotal * 0.08;
  const total = subtotal + deliveryFee + taxes;
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AppNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/')}>Browse Restaurants</Button>
        </div>
      </div>
    );
  }
  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    try {
      const order = await api<Order>('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          items,
          total,
          deliveryAddress: `${data.address}, ${data.city}`,
          userId: 'anonymous', // In a real app, this would be the logged-in user's ID
        }),
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order/${order.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 w-full">
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...register('fullName')} placeholder="John Doe" />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" {...register('address')} placeholder="123 Main St" />
                  {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register('city')} placeholder="New York" />
                    {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" {...register('phone')} placeholder="(555) 123-4567" />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button 
                type="submit" 
                form="checkout-form" 
                className="w-full mt-6 h-12 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}