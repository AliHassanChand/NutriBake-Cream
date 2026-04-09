import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const data = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 2000, orders: 12 },
  { name: 'Thu', sales: 2780, orders: 20 },
  { name: 'Fri', sales: 1890, orders: 15 },
  { name: 'Sat', sales: 2390, orders: 25 },
  { name: 'Sun', sales: 3490, orders: 30 },
];

const stats = [
  { title: 'Total Revenue', value: '$24,560', change: '+12.5%', icon: TrendingUp, trend: 'up' },
  { title: 'Active Orders', value: '42', change: '+5.2%', icon: ShoppingBag, trend: 'up' },
  { title: 'New Customers', value: '124', change: '-2.4%', icon: Users, trend: 'down' },
  { title: 'Health Impact', value: '85%', change: '+10%', icon: Activity, trend: 'up' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-brand-200 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-brand-100 text-brand-700">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                    stat.trend === 'up' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-brand-500 mb-1">{stat.title}</h3>
                <p className="text-3xl font-serif font-bold text-brand-900">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-brand-200 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-serif font-bold text-brand-900">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9c8466' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9c8466' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e8e2d6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  cursor={{ fill: '#f5f2ed' }}
                />
                <Bar dataKey="sales" fill="#7d6852" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-brand-200 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-serif font-bold text-brand-900">Order Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9c8466' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9c8466' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e8e2d6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Line type="monotone" dataKey="orders" stroke="#9c8466" strokeWidth={3} dot={{ fill: '#9c8466', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-brand-200 shadow-sm rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-serif font-bold text-brand-900">Recent Orders</CardTitle>
          <Button variant="link" className="text-brand-700 font-bold">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { id: 'ORD-001', customer: 'John Doe', product: 'Stevia Almond Muffin', amount: '$14.00', status: 'Preparing' },
              { id: 'ORD-002', customer: 'Jane Smith', product: 'Low-Cal Lemon Tart', amount: '$16.50', status: 'Pending' },
              { id: 'ORD-003', customer: 'Robert Brown', product: 'Whey Protein Brownie', amount: '$5.00', status: 'Ready' },
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-brand-50 transition-colors border border-transparent hover:border-brand-100">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold">
                    {order.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-brand-900">{order.customer}</p>
                    <p className="text-sm text-brand-500">{order.product} • {order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-900">{order.amount}</p>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                    order.status === 'Ready' ? "bg-green-100 text-green-700" : 
                    order.status === 'Preparing' ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                  )}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
