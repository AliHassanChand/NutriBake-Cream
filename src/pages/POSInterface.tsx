import { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Receipt, 
  CreditCard, 
  User, 
  CheckCircle2, 
  X, 
  Banknote, 
  Smartphone, 
  FileText,
  Printer,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'digital'>('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'brownies', 'cookies', 'cakes', 'tarts'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
  };

  const resetPOS = () => {
    setIsSuccess(false);
    setCart([]);
    setCustomerName('');
    setOrderNotes('');
    setPaymentMethod('card');
  };

  if (isSuccess) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-brand-200 shadow-premium rounded-[3rem] overflow-hidden bg-white">
            <div className="bg-brand-900 p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="h-24 w-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
              >
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-serif font-bold text-white mb-2">Order Finalized</h2>
              <p className="text-brand-200 font-medium">Transaction ID: #TXN-{Math.floor(Math.random() * 1000000)}</p>
            </div>
            <CardContent className="p-10 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-brand-400 font-bold uppercase tracking-widest text-xs">Customer</span>
                  <span className="text-brand-900 font-bold">{customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-400 font-bold uppercase tracking-widest text-xs">Payment Method</span>
                  <span className="text-brand-900 font-bold capitalize">{paymentMethod}</span>
                </div>
                <Separator className="bg-brand-100" />
                <div className="space-y-2">
                  {cart.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    return (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="text-brand-600 font-medium">{item.quantity}x {product?.name}</span>
                        <span className="text-brand-900 font-bold">${((product?.price || 0) * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
                <Separator className="bg-brand-100" />
                <div className="flex justify-between items-end pt-2">
                  <span className="text-brand-400 font-bold uppercase tracking-widest text-xs">Total Paid</span>
                  <span className="text-3xl font-serif font-bold text-brand-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 rounded-2xl border-brand-200 font-bold text-brand-700">
                  <Printer className="mr-2 h-5 w-5" /> Print Receipt
                </Button>
                <Button onClick={resetPOS} className="h-14 bg-brand-900 text-brand-50 rounded-2xl font-bold shadow-lg">
                  New Order <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 min-h-0 lg:h-[calc(100vh-180px)]">
      {/* Product Selection */}
      <div className="flex-1 flex flex-col gap-8 min-h-0">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-brand-300" />
            <Input 
              placeholder="Search therapeutic confections..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-16 pl-14 rounded-[1.5rem] border-brand-200 bg-white shadow-soft text-lg font-medium focus:ring-brand-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "h-12 px-6 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all",
                  activeCategory === cat 
                    ? "bg-brand-900 text-brand-50 shadow-premium" 
                    : "border-brand-200 text-brand-600 hover:bg-brand-50"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 pb-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="border-brand-200 cursor-pointer transition-all hover:shadow-premium rounded-[2rem] overflow-hidden group bg-white"
                  onClick={() => addToCart(product.id)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-brand-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 border-none shadow-sm">
                      {product.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-2">
                    <h3 className="font-bold text-brand-900 text-lg leading-tight group-hover:text-brand-700 transition-colors">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-serif font-bold text-brand-900">${product.price.toFixed(2)}</p>
                      <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-400 group-hover:bg-brand-900 group-hover:text-brand-50 transition-all">
                        <Plus className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Cart / Checkout */}
      <Card className="w-full lg:w-[480px] border-brand-200 shadow-premium rounded-[2rem] md:rounded-[3rem] flex flex-col overflow-hidden bg-white shrink-0">
        <CardHeader className="bg-brand-50/50 border-b border-brand-100 p-6 md:p-8">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl md:text-2xl font-serif font-bold text-brand-900 flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" /> Current Order
            </CardTitle>
            <Badge variant="outline" className="rounded-full border-brand-200 text-brand-400 font-bold">
              {cart.reduce((acc, item) => acc + item.quantity, 0)} Items
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 min-h-[300px] lg:min-h-0">
          <ScrollArea className="h-full px-4 md:px-8 py-6">
            <AnimatePresence mode="popLayout">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {cart.map((item) => {
                    const product = products.find(p => p.id === item.productId);
                    return (
                      <motion.div 
                        key={item.productId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-4 p-4 rounded-3xl bg-brand-50/50 border border-brand-100 group"
                      >
                        <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                          <img src={product?.image} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-brand-900 truncate">{product?.name}</p>
                          <p className="text-sm font-bold text-brand-400">${product?.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-1 rounded-2xl border border-brand-100 shadow-sm">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-xl hover:bg-brand-50 text-brand-400"
                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.productId, -1); }}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-bold w-6 text-center text-brand-900">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-xl hover:bg-brand-50 text-brand-400"
                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.productId, 1); }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.productId)}
                          className="h-10 w-10 text-brand-200 hover:text-red-500 hover:bg-red-50 rounded-xl"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-32 space-y-6">
                  <div className="h-24 w-24 rounded-full bg-brand-50 flex items-center justify-center text-brand-200">
                    <ShoppingCart className="h-12 w-12" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-serif font-bold text-brand-900">Cart is Empty</p>
                    <p className="text-sm text-brand-400 font-medium">Select confections to begin formulation.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex-col p-6 md:p-8 bg-brand-50/50 border-t border-brand-100 space-y-6">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">Customer</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
                <Input 
                  placeholder="Name..." 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="h-14 pl-12 rounded-2xl border-brand-200 bg-white shadow-sm font-medium"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">Payment Method</Label>
              <div className="flex gap-2">
                {[
                  { id: 'card', icon: CreditCard },
                  { id: 'cash', icon: Banknote },
                  { id: 'digital', icon: Smartphone },
                ].map((method) => (
                  <Button
                    key={method.id}
                    variant={paymentMethod === method.id ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={cn(
                      "flex-1 h-14 rounded-2xl border-brand-200 transition-all",
                      paymentMethod === method.id ? "bg-brand-900 text-brand-50 shadow-lg" : "bg-white text-brand-400 hover:bg-brand-50"
                    )}
                  >
                    <method.icon className="h-6 w-6" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">Order Notes</Label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 h-5 w-5 text-brand-300" />
              <Textarea 
                placeholder="Add special clinical instructions..." 
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="min-h-[80px] pl-12 rounded-2xl border-brand-200 bg-white shadow-sm font-medium pt-4"
              />
            </div>
          </div>

          <div className="w-full space-y-3 pt-2">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-brand-400 uppercase tracking-widest text-[10px]">Subtotal</span>
              <span className="text-brand-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-brand-400 uppercase tracking-widest text-[10px]">Clinical Tax (8%)</span>
              <span className="text-brand-900">${tax.toFixed(2)}</span>
            </div>
            <Separator className="bg-brand-200" />
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-1">Total Amount</span>
              <span className="text-4xl font-serif font-bold text-brand-900">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            disabled={cart.length === 0 || !customerName}
            onClick={handleCheckout}
            className="w-full h-16 bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-[1.5rem] text-xl font-bold shadow-premium transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6" /> Process Payment
            </div>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
