import { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Search, Plus, Minus, Trash2, Receipt, CreditCard, User, CheckCircle2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { products } from '@/data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface CartItem {
  productId: string;
  quantity: number;
}

export default function POSInterface() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId);
      return acc + (product?.price || 0) * item.quantity;
    }, 0);
  }, [cart]);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setCart([]);
      setCustomerName('');
    }, 3000);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex gap-8">
      {/* Product Selection */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-400" />
          <Input 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-12 rounded-2xl border-brand-200 bg-white shadow-sm text-lg"
          />
        </div>

        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="border-brand-200 hover:border-brand-400 cursor-pointer transition-all hover:shadow-md rounded-2xl overflow-hidden group"
                onClick={() => addToCart(product.id)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <Badge className="absolute top-2 right-2 bg-brand-900/80 backdrop-blur-sm text-brand-50 text-[10px]">
                    {product.category.replace('-', ' ')}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-brand-900 truncate">{product.name}</h3>
                  <p className="text-lg font-serif font-bold text-brand-700">${product.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Cart / Checkout */}
      <Card className="w-96 border-brand-200 shadow-xl rounded-3xl flex flex-col overflow-hidden bg-white">
        <CardHeader className="bg-brand-50/50 border-b border-brand-100 p-6">
          <CardTitle className="text-xl font-serif font-bold text-brand-900 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> Current Order
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full px-6 py-4">
            <AnimatePresence mode="popLayout">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const product = products.find(p => p.id === item.productId);
                    return (
                      <motion.div 
                        key={item.productId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-brand-50 border border-brand-100"
                      >
                        <img src={product?.image} className="h-12 w-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-brand-900 truncate">{product?.name}</p>
                          <p className="text-xs text-brand-500">${product?.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-full bg-white border border-brand-200"
                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.productId, -1); }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-full bg-white border border-brand-200"
                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.productId, 1); }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-300">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <p className="text-brand-400 italic">Your cart is empty.</p>
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex-col p-6 bg-brand-50/50 border-t border-brand-100 space-y-4">
          <div className="w-full space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-brand-400">Customer Details</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-400" />
              <Input 
                placeholder="Customer Name" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="pl-10 rounded-xl border-brand-200 bg-white"
              />
            </div>
          </div>

          <div className="w-full space-y-2 pt-2">
            <div className="flex justify-between text-sm text-brand-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-600">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator className="bg-brand-200" />
            <div className="flex justify-between text-xl font-serif font-bold text-brand-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            disabled={cart.length === 0 || !customerName}
            onClick={handleCheckout}
            className="w-full h-14 bg-brand-700 hover:bg-brand-800 text-brand-50 rounded-2xl text-lg font-bold shadow-lg shadow-brand-700/20"
          >
            {isSuccess ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6" /> Order Placed
              </motion.div>
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Complete Order
              </div>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
