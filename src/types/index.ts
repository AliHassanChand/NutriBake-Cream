export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'diabetic' | 'high-protein' | 'low-calorie' | 'standard';
  nutrition: {
    calories: number;
    protein: number;
    sugar: number;
    fat: number;
  };
  ingredients: string[];
}

export interface Order {
  id: string;
  customerName: string;
  items: { productId: string; quantity: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  stock: number;
  unit: string;
  minStock: number;
  nutritionPer100g: {
    calories: number;
    protein: number;
    sugar: number;
    fat: number;
  };
}

export interface Staff {
  id: string;
  name: string;
  role: 'admin' | 'chef' | 'nutritionist' | 'staff';
  email: string;
  status: 'active' | 'inactive';
}
