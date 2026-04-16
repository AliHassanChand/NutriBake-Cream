import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-900">System Overview</h1>
          <p className="text-brand-600 font-medium text-sm md:text-base">Welcome back, Administrator. Here's the current state of your NutriBake ecosystem.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <Link to="/dashboard/pos" className="w-full sm:w-auto">
            <Button className="h-12 w-full sm:w-auto rounded-2xl bg-brand-900 text-brand-50 hover:bg-brand-800 px-8 shadow-premium transition-all hover:scale-105 active:scale-95">
              <Plus className="mr-2 h-5 w-5" /> Create New Order
            </Button>
          </Link>
          <Button variant="outline" className="h-12 w-full sm:w-auto rounded-2xl border-brand-200 text-brand-700 hover:bg-brand-50 px-6">
            <Download className="mr-2 h-5 w-5" /> Export Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-brand-200 shadow-soft rounded-[2rem] overflow-hidden group hover:border-brand-400 transition-all bg-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center transition-transform group-hover:scale-110">
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div className={cn(
                    "flex items-center text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm",
                    stat.trend === 'up' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400 mb-2">{stat.title}</h3>
                <p className="text-4xl font-serif font-bold text-brand-900">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-brand-200 shadow-premium rounded-[2rem] md:rounded-[2.5rem] bg-white overflow-hidden">
          <CardHeader className="p-6 md:p-8 border-b border-brand-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl md:text-2xl font-serif font-bold text-brand-900">Revenue Dynamics</CardTitle>
                <p className="text-xs md:text-sm text-brand-500 font-medium">Weekly financial performance analysis.</p>
              </div>
              <Badge variant="outline" className="rounded-full border-brand-200 text-brand-400 font-bold">Last 7 Days</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[400px] p-4 md:p-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7d6852" stopOpacity={1} />
                    <stop offset="100%" stopColor="#9c8466" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f2ed" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9c8466', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9c8466', fontWeight: 600 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '24px', 
                    border: '1px solid #e8e2d6', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    padding: '16px'
                  }}
                  cursor={{ fill: '#f5f2ed', radius: 12 }}
                />
                <Bar dataKey="sales" fill="url(#barGradient)" radius={[12, 12, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-brand-200 shadow-premium rounded-[2rem] md:rounded-[2.5rem] bg-white overflow-hidden">
          <CardHeader className="p-6 md:p-8 border-b border-brand-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl md:text-2xl font-serif font-bold text-brand-900">Order Velocity</CardTitle>
                <p className="text-xs md:text-sm text-brand-500 font-medium">Real-time order volume trends.</p>
              </div>
              <Badge variant="outline" className="rounded-full border-brand-200 text-brand-400 font-bold">Live Stream</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] md:h-[400px] p-4 md:p-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9c8466" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#9c8466" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f2ed" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9c8466', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9c8466', fontWeight: 600 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '24px', 
                    border: '1px solid #e8e2d6', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    padding: '16px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#9c8466" 
                  strokeWidth={4} 
                  dot={{ fill: '#9c8466', strokeWidth: 2, r: 6, stroke: '#fff' }} 
                  activeDot={{ r: 8, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-brand-200 shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
        <CardHeader className="p-8 border-b border-brand-100 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-serif font-bold text-brand-900">Recent Transactions</CardTitle>
            <p className="text-sm text-brand-500 font-medium">Latest customer orders and fulfillment status.</p>
          </div>
          <Button variant="ghost" className="text-brand-900 font-bold hover:bg-brand-50 rounded-xl px-6">View All Orders</Button>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'ORD-001', customer: 'John Doe', product: 'Stevia Almond Muffin', amount: '$14.00', status: 'Preparing' },
              { id: 'ORD-002', customer: 'Jane Smith', product: 'Low-Cal Lemon Tart', amount: '$16.50', status: 'Pending' },
              { id: 'ORD-003', customer: 'Robert Brown', product: 'Whey Protein Brownie', amount: '$5.00', status: 'Ready' },
            ].map((order, i) => (
              <div key={i} className="flex flex-col gap-4 p-6 rounded-[2rem] bg-brand-50/50 border border-brand-100 hover:border-brand-300 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-900 font-bold text-lg">
                    {order.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <Badge className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-none shadow-sm",
                    order.status === 'Ready' ? "bg-green-100 text-green-700" : 
                    order.status === 'Preparing' ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                  )}>
                    {order.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-brand-900 text-lg">{order.customer}</p>
                  <p className="text-xs text-brand-500 font-medium">{order.product} • {order.id}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-brand-100">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Total Amount</span>
                  <span className="font-bold text-brand-900 text-lg">{order.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
