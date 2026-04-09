import { Product, Order, Ingredient, Staff } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Stevia Almond Muffin',
    description: 'A light, fluffy muffin sweetened with natural stevia and packed with heart-healthy almonds.',
    price: 4.5,
    image: 'https://picsum.photos/seed/muffin/800/600',
    category: 'diabetic',
    nutrition: { calories: 180, protein: 6, sugar: 0.5, fat: 12 },
    ingredients: ['Almond Flour', 'Stevia', 'Eggs', 'Coconut Oil']
  },
  {
    id: '2',
    name: 'Whey Protein Brownie',
    description: 'Rich chocolate brownie infused with high-quality whey protein for muscle recovery.',
    price: 5.0,
    image: 'https://picsum.photos/seed/brownie/800/600',
    category: 'high-protein',
    nutrition: { calories: 220, protein: 15, sugar: 8, fat: 10 },
    ingredients: ['Whey Protein', 'Dark Chocolate', 'Oat Flour', 'Greek Yogurt']
  },
  {
    id: '3',
    name: 'Low-Cal Lemon Tart',
    description: 'Zesty lemon tart with a thin, crispy crust, perfect for a guilt-free treat.',
    price: 5.5,
    image: 'https://picsum.photos/seed/lemon/800/600',
    category: 'low-calorie',
    nutrition: { calories: 120, protein: 2, sugar: 4, fat: 5 },
    ingredients: ['Lemon Juice', 'Erythritol', 'Whole Wheat Flour', 'Egg Whites']
  },
  {
    id: '4',
    name: 'Keto Avocado Cookie',
    description: 'Soft and chewy cookies made with ripe avocados and dark chocolate chips.',
    price: 3.5,
    image: 'https://picsum.photos/seed/cookie/800/600',
    category: 'low-calorie',
    nutrition: { calories: 150, protein: 3, sugar: 1, fat: 14 },
    ingredients: ['Avocado', 'Almond Flour', 'Dark Chocolate Chips', 'Erythritol']
  }
];

export const ingredients: Ingredient[] = [
  { id: 'i1', name: 'Almond Flour', stock: 50, unit: 'kg', minStock: 10, nutritionPer100g: { calories: 576, protein: 21, sugar: 4, fat: 49 } },
  { id: 'i2', name: 'Stevia', stock: 5, unit: 'kg', minStock: 1, nutritionPer100g: { calories: 0, protein: 0, sugar: 0, fat: 0 } },
  { id: 'i3', name: 'Dark Chocolate', stock: 20, unit: 'kg', minStock: 5, nutritionPer100g: { calories: 546, protein: 5, sugar: 48, fat: 31 } },
  { id: 'i4', name: 'Whey Protein', stock: 15, unit: 'kg', minStock: 3, nutritionPer100g: { calories: 360, protein: 80, sugar: 5, fat: 2 } }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    items: [{ productId: '1', quantity: 2 }, { productId: '2', quantity: 1 }],
    total: 14.0,
    status: 'preparing',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    items: [{ productId: '3', quantity: 3 }],
    total: 16.5,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

export const staff: Staff[] = [
  { id: 's1', name: 'Dr. Sarah Chen', role: 'nutritionist', email: 'sarah@nutribake.com', status: 'active' },
  { id: 's2', name: 'Chef Marco', role: 'chef', email: 'marco@nutribake.com', status: 'active' },
  { id: 's3', name: 'Admin Alice', role: 'admin', email: 'alice@nutribake.com', status: 'active' }
];
