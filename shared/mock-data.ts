import type { User, Chat, ChatMessage, Restaurant, MenuItem } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
// SavorEats Mock Data
export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Napoli Woodfire Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    rating: 4.8,
    reviewCount: 1240,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    tags: ['Pizza', 'Italian', 'Wood-fired'],
    featured: true,
  },
  {
    id: 'r2',
    name: 'Burger & Co.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    rating: 4.6,
    reviewCount: 850,
    deliveryTime: '15-25 min',
    deliveryFee: 1.99,
    tags: ['Burgers', 'American', 'Fast Food'],
  },
  {
    id: 'r3',
    name: 'Sakura Sushi House',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80',
    rating: 4.9,
    reviewCount: 2100,
    deliveryTime: '35-45 min',
    deliveryFee: 4.99,
    tags: ['Sushi', 'Japanese', 'Seafood'],
    featured: true,
  },
  {
    id: 'r4',
    name: 'Green Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    rating: 4.7,
    reviewCount: 530,
    deliveryTime: '20-30 min',
    deliveryFee: 0.99,
    tags: ['Healthy', 'Salads', 'Vegan'],
  },
  {
    id: 'r5',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    rating: 4.5,
    reviewCount: 920,
    deliveryTime: '20-35 min',
    deliveryFee: 1.49,
    tags: ['Mexican', 'Tacos', 'Spicy'],
  },
  {
    id: 'r6',
    name: 'The Sweet Tooth',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
    rating: 4.8,
    reviewCount: 410,
    deliveryTime: '15-20 min',
    deliveryFee: 2.49,
    tags: ['Desserts', 'Bakery', 'Coffee'],
  }
];
export const MOCK_MENU_ITEMS: MenuItem[] = [
  // Napoli Woodfire Pizza
  {
    id: 'm1',
    restaurantId: 'r1',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80',
    category: 'Pizzas',
    popular: true,
  },
  {
    id: 'm2',
    restaurantId: 'r1',
    name: 'Pepperoni Pizza',
    description: 'Tomato sauce, mozzarella, and double pepperoni.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80',
    category: 'Pizzas',
    popular: true,
  },
  {
    id: 'm3',
    restaurantId: 'r1',
    name: 'Truffle Mushroom Pizza',
    description: 'White base, wild mushrooms, mozzarella, truffle oil, and parmesan.',
    price: 19.99,
    category: 'Pizzas',
  },
  {
    id: 'm4',
    restaurantId: 'r1',
    name: 'Garlic Knots',
    description: 'Freshly baked dough knots tossed in garlic butter and herbs.',
    price: 6.99,
    category: 'Sides',
  },
  // Burger & Co.
  {
    id: 'm5',
    restaurantId: 'r2',
    name: 'Classic Cheeseburger',
    description: '100% beef patty, american cheese, lettuce, tomato, pickles, and house sauce.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80',
    category: 'Burgers',
    popular: true,
  },
  {
    id: 'm6',
    restaurantId: 'r2',
    name: 'Double Bacon Smash',
    description: 'Two smashed patties, crispy bacon, cheddar, caramelized onions.',
    price: 15.99,
    category: 'Burgers',
    popular: true,
  },
  {
    id: 'm7',
    restaurantId: 'r2',
    name: 'Truffle Fries',
    description: 'Crispy fries tossed in truffle oil and parmesan cheese.',
    price: 5.99,
    category: 'Sides',
  },
  // Sakura Sushi House
  {
    id: 'm8',
    restaurantId: 'r3',
    name: 'Spicy Tuna Roll',
    description: 'Fresh tuna, spicy mayo, cucumber, topped with sesame seeds.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80',
    category: 'Rolls',
    popular: true,
  },
  {
    id: 'm9',
    restaurantId: 'r3',
    name: 'Dragon Roll',
    description: 'Eel, cucumber, topped with avocado and unagi sauce.',
    price: 14.99,
    category: 'Specialty Rolls',
  },
  {
    id: 'm10',
    restaurantId: 'r3',
    name: 'Salmon Nigiri (2pc)',
    description: 'Fresh salmon over pressed vinegared rice.',
    price: 6.99,
    category: 'Nigiri',
  }
];