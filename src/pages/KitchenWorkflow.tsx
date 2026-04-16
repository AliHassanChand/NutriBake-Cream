import { useState } from 'react';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Timer,
  Flame,
  Snowflake,
  PackageCheck,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface KitchenOrder {
  id: string;
  product: string;
  quantity: number;
  status: 'preparing' | 'baking' | 'cooling' | 'ready';
  startTime: string;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  notes: string;
}

const mockKitchenOrders: KitchenOrder[] = [
  {
    id: 'K-101',
    product: 'Monk Fruit Brownies',
    quantity: 12,
    status: 'baking',
    startTime: '14:20',
    progress: 65,
    priority: 'high',
    notes: 'Low-glycemic batch. Ensure oven temp is stable at 175°C.'
  },
  {
    id: 'K-102',
    product: 'Almond Flour Macarons',
    quantity: 24,
    status: 'preparing',
    startTime: '14:45',
    progress: 20,
    priority: 'medium',
    notes: 'Keto-friendly. Use organic egg whites only.'
  },
  {
    id: 'K-103',
    product: 'Stevia Lemon Tart',
    quantity: 6,
    status: 'cooling',
    startTime: '13:50',
    progress: 90,
    priority: 'low',
    notes: 'Sugar-free glaze application pending cooling.'
  },
  {
    id: 'K-104',
    product: 'Protein Power Cookies',
    quantity: 36,
    status: 'ready',
    startTime: '13:15',
    progress: 100,
    priority: 'medium',
    notes: 'High-protein formulation. Ready for clinical packaging.'
  }
];

export default function KitchenWorkflow() {
  const [orders, setOrders] = useState<KitchenOrder[]>(mockKitchenOrders);

  const statusColors = {
    preparing: 'bg-blue-100 text-blue-700 border-blue-200',
    baking: 'bg-orange-100 text-orange-700 border-orange-200',
    cooling: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    ready: 'bg-green-100 text-green-700 border-green-200',
  };

  const statusIcons = {
    preparing: ChefHat,
    baking: Flame,
    cooling: Snowflake,
    ready: PackageCheck,
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold text-brand-900">Kitchen Workflow</h1>
          <p className="text-brand-600 font-medium">Real-time production management for therapeutic confections.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-soft border border-brand-100">
          <div className="flex items-center gap-2 px-4 py-2 border-r border-brand-100">
            <Timer className="h-5 w-5 text-brand-400" />
            <span className="text-sm font-bold text-brand-900">Avg. Prep: 42m</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-bold text-brand-900">3 Active Ovens</span>
          </div>
        </div>
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {(['preparing', 'baking', 'cooling', 'ready'] as const).map((status) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", 
                  status === 'preparing' ? 'bg-blue-500' : 
                  status === 'baking' ? 'bg-orange-500' : 
                  status === 'cooling' ? 'bg-cyan-500' : 'bg-green-500'
                )} />
                <h2 className="text-sm font-bold uppercase tracking-widest text-brand-900 capitalize">{status}</h2>
                <Badge variant="outline" className="text-[10px] border-brand-200 text-brand-400">
                  {orders.filter(o => o.status === status).length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-brand-300">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4 min-h-[200px]">
              {orders.filter(o => o.status === status).map((order) => {
                const Icon = statusIcons[order.status];
                return (
                  <motion.div
                    key={order.id}
                    layoutId={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <Card className="border-brand-200 shadow-soft rounded-2xl overflow-hidden hover:border-brand-400 transition-all cursor-pointer bg-white">
                      <CardContent className="p-5 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h3 className="font-bold text-brand-900 leading-tight">{order.product}</h3>
                            <p className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">Order #{order.id} • Qty: {order.quantity}</p>
                          </div>
                          {order.priority === 'high' && (
                            <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                            <span className="text-brand-400">Progress</span>
                            <span className="text-brand-900">{order.progress}%</span>
                          </div>
                          <Progress 
                            value={order.progress} 
                            className="h-1.5 rounded-full bg-brand-50"
                            indicatorClassName={cn(
                              status === 'preparing' ? 'bg-blue-500' : 
                              status === 'baking' ? 'bg-orange-500' : 
                              status === 'cooling' ? 'bg-cyan-500' : 'bg-green-500'
                            )}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-brand-50">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-brand-500 uppercase tracking-wider">
                            <Clock className="h-3 w-3" />
                            Started {order.startTime}
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-brand-300 group-hover:text-brand-900 group-hover:bg-brand-50 transition-all">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
              
              {orders.filter(o => o.status === status).length === 0 && (
                <div className="h-32 rounded-2xl border-2 border-dashed border-brand-100 flex items-center justify-center text-brand-300 text-xs font-medium">
                  No active batches
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lab Notes & Efficiency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-brand-200 shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
          <CardHeader className="p-8 border-b border-brand-100">
            <CardTitle className="text-xl font-serif font-bold text-brand-900">Clinical Production Notes</CardTitle>
            <CardDescription className="text-brand-500">Special instructions for active therapeutic batches.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {orders.filter(o => o.notes).map((order) => (
                <div key={order.id} className="flex gap-4 p-4 rounded-2xl bg-brand-50/50 border border-brand-100">
                  <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-700 shrink-0">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-brand-900">{order.product} <span className="text-brand-400 font-medium ml-2">#{order.id}</span></p>
                    <p className="text-sm text-brand-600 italic">"{order.notes}"</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-200 shadow-premium rounded-[2.5rem] bg-brand-900 text-brand-50 overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-serif font-bold">Kitchen Efficiency</CardTitle>
            <CardDescription className="text-brand-300 font-medium">Daily performance metrics.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-3xl font-serif font-bold">94%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-300">Target Accuracy</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <Progress value={94} className="h-2 bg-white/10" indicatorClassName="bg-green-400" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-3xl font-serif font-bold">12m</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-300">Avg. Turnaround</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <Progress value={78} className="h-2 bg-white/10" indicatorClassName="bg-blue-400" />
            </div>

            <Button className="w-full h-12 bg-white text-brand-900 hover:bg-brand-50 rounded-2xl font-bold shadow-soft">
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { FlaskConical } from 'lucide-react';
