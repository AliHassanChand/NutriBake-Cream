import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Cart() {
  // Mock cart items based on first few products
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 2 },
    { ...products[1], quantity: 1 },
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 px-4">
        <div className="h-32 w-32 rounded-full bg-brand-50 flex items-center justify-center text-brand-200">
          <ShoppingBag className="h-16 w-16" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif font-bold text-brand-900">Your lab kit is empty</h2>
          <p className="text-brand-500 max-w-xs mx-auto">Looks like you haven't selected any therapeutic treats yet.</p>
        </div>
        <Link to="/products">
          <Button className="h-14 px-10 bg-brand-900 text-brand-50 rounded-2xl font-bold shadow-premium">
            Browse Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 md:px-6">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-900 font-bold transition-colors text-sm">
            <ChevronLeft className="h-4 w-4" /> Back to Collection
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-900">Your Selection</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative"
                >
                  <Card className="border-brand-200 shadow-soft rounded-[2rem] overflow-hidden bg-white hover:border-brand-400 transition-all">
                    <CardContent className="p-4 md:p-6 flex flex-col sm:flex-row gap-6 md:gap-8 items-center">
                      <div className="h-24 w-24 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-2xl bg-brand-50">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-2 text-center sm:text-left">
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">{item.category}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full">Therapeutic Batch</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900">{item.name}</h3>
                        <div className="flex items-center gap-4 justify-center sm:justify-start text-xs font-bold text-brand-500">
                          <span>{item.nutrition.calories} kcal</span>
                          <span className="h-1 w-1 rounded-full bg-brand-200" />
                          <span>{item.nutrition.protein}g Protein</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        <div className="flex items-center gap-2 bg-brand-50 p-1 rounded-xl border border-brand-100">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-8 w-8 rounded-lg text-brand-600 hover:bg-white"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 md:w-8 text-center font-bold text-brand-900">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-8 w-8 rounded-lg text-brand-600 hover:bg-white"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-center sm:text-right min-w-[80px]">
                          <p className="text-lg md:text-xl font-serif font-bold text-brand-900">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-[10px] text-brand-400 font-bold uppercase">${item.price} / unit</p>
                        </div>

                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem(item.id)}
                          className="h-10 w-10 rounded-xl text-brand-200 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <Card className="border-brand-900 bg-brand-900 text-brand-50 shadow-premium rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-8 md:p-10 space-y-6 md:space-y-8">
                  <h3 className="text-xl md:text-2xl font-serif font-bold">Order Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-brand-300 font-medium text-sm md:text-base">
                      <span>Subtotal</span>
                      <span className="text-brand-50 font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-brand-300 font-medium text-sm md:text-base">
                      <span>Clinical Shipping</span>
                      <span className="text-brand-50 font-bold">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-white/10 my-4" />
                    <div className="flex justify-between items-end">
                      <span className="text-base md:text-lg font-serif font-bold">Total</span>
                      <span className="text-3xl md:text-4xl font-serif font-bold text-brand-300">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <Button className="w-full h-16 bg-brand-400 text-brand-900 hover:bg-brand-300 rounded-2xl text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                      Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="text-[10px] text-center text-brand-400 font-bold uppercase tracking-widest">
                      Secure Clinical Transaction
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6 px-4">
                {[
                  { icon: ShieldCheck, title: 'Quality Guaranteed', desc: 'Every batch is clinically tested for nutritional accuracy.' },
                  { icon: Truck, title: 'Temperature Controlled', desc: 'Shipped in specialized containers to preserve molecular integrity.' },
                  { icon: CreditCard, title: 'Secure Payment', desc: 'Encrypted transactions for your peace of mind.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-brand-900">{item.title}</h4>
                      <p className="text-xs text-brand-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
