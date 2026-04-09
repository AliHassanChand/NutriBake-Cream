import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  Truck, 
  MoreHorizontal,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { orders as mockOrders, products } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function KitchenWorkflow() {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState(mockOrders);

  const updateStatus = (orderId: string, newStatus: any) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => 
    activeTab === 'all' || order.status === activeTab
  );

  const statusConfig = {
    pending: { label: 'Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-700', next: 'preparing' },
    preparing: { label: 'Preparing', icon: ChefHat, color: 'bg-blue-100 text-blue-700', next: 'ready' },
    ready: { label: 'Ready', icon: CheckCircle2, color: 'bg-green-100 text-green-700', next: 'delivered' },
    delivered: { label: 'Delivered', icon: Truck, color: 'bg-brand-100 text-brand-700', next: null },
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-900">Kitchen Workflow</h1>
          <p className="text-brand-600">Manage the therapeutic production queue in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-brand-200 flex items-center justify-center text-[10px] font-bold text-brand-700">
                CH
              </div>
            ))}
          </div>
          <span className="text-sm font-medium text-brand-500">3 Chefs Active</span>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList className="bg-brand-100 p-1 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:text-brand-900 data-[state=active]:shadow-sm">All Orders</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:text-brand-900 data-[state=active]:shadow-sm">Pending</TabsTrigger>
            <TabsTrigger value="preparing" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:text-brand-900 data-[state=active]:shadow-sm">Preparing</TabsTrigger>
            <TabsTrigger value="ready" className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:text-brand-900 data-[state=active]:shadow-sm">Ready</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-400" />
              <input 
                placeholder="Search orders..." 
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-brand-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-xl border-brand-200 text-brand-600">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-brand-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-brand-50/50 border-b border-brand-100 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-serif font-bold text-brand-900">{order.id}</CardTitle>
                        <p className="text-sm text-brand-500">{order.customerName}</p>
                      </div>
                      <Badge className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-none",
                        statusConfig[order.status as keyof typeof statusConfig].color
                      )}>
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-3">
                      {order.items.map((item, idx) => {
                        const product = products.find(p => p.id === item.productId);
                        return (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-brand-700 font-medium">
                              <span className="font-bold text-brand-900">{item.quantity}x</span> {product?.name}
                            </span>
                            <Badge variant="outline" className="text-[10px] border-brand-200 text-brand-400">
                              {product?.category.replace('-', ' ')}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="pt-4 border-t border-brand-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-brand-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Ordered 12m ago</span>
                      </div>
                      <div className="font-bold text-brand-900">${order.total.toFixed(2)}</div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 rounded-xl border-brand-200 text-brand-600 hover:bg-brand-50">
                        Details
                      </Button>
                      {statusConfig[order.status as keyof typeof statusConfig].next && (
                        <Button 
                          onClick={() => updateStatus(order.id, statusConfig[order.status as keyof typeof statusConfig].next)}
                          className="flex-1 bg-brand-700 hover:bg-brand-800 text-brand-50 rounded-xl"
                        >
                          Next Stage <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Tabs>
      
      {/* Workflow Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {Object.entries(statusConfig).map(([key, config]) => (
          <Card key={key} className="border-brand-200 bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-xl", config.color)}>
                <config.icon className="h-5 w-5" />
              </div>
              <span className="text-2xl font-serif font-bold text-brand-900">
                {orders.filter(o => o.status === key).length}
              </span>
            </div>
            <p className="text-sm font-bold text-brand-900">{config.label}</p>
            <p className="text-xs text-brand-500">Current queue</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
