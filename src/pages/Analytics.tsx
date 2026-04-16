import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const salesData = [
  { name: 'Mon', sales: 4000, orders: 240 },
  { name: 'Tue', sales: 3000, orders: 198 },
  { name: 'Wed', sales: 2000, orders: 150 },
  { name: 'Thu', sales: 2780, orders: 190 },
  { name: 'Fri', sales: 1890, orders: 130 },
  { name: 'Sat', sales: 2390, orders: 170 },
  { name: 'Sun', sales: 3490, orders: 210 },
];

const categoryData = [
  { name: 'Diabetic Friendly', value: 45 },
  { name: 'High Protein', value: 25 },
  { name: 'Low Calorie', value: 20 },
  { name: 'Gluten Free', value: 10 },
];

const COLORS = ['#D4A373', '#A98467', '#606C38', '#283618'];

export default function Analytics() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-900">Advanced Analytics</h1>
          <p className="text-brand-600 font-medium text-base md:text-lg">Real-time business intelligence and therapeutic distribution metrics.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button variant="outline" className="h-12 w-full sm:w-auto rounded-2xl border-brand-200 text-brand-700 font-bold">
            <Calendar className="mr-2 h-5 w-5" /> Last 30 Days
          </Button>
          <Button className="h-12 w-full sm:w-auto bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-2xl px-8 font-bold shadow-premium">
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$45,231.89', trend: '+20.1%', up: true, icon: DollarSign, color: 'text-brand-900', bg: 'bg-brand-50' },
          { label: 'Total Orders', value: '1,245', trend: '+12.5%', up: true, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Patients', value: '842', trend: '-2.4%', up: false, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Lab Efficiency', value: '94.2%', trend: '+4.3%', up: true, icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-brand-200 shadow-soft rounded-[2rem] overflow-hidden group hover:border-brand-400 transition-all">
            <CardContent className="p-8 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  stat.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-400">{stat.label}</p>
                <p className="text-3xl font-serif font-bold text-brand-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Chart */}
        <Card className="lg:col-span-8 border-brand-200 shadow-premium rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="p-6 md:p-8 border-b border-brand-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl md:text-2xl font-serif font-bold text-brand-900">Revenue Performance</CardTitle>
                <CardDescription className="text-xs md:text-sm text-brand-500 font-medium">Daily revenue trends across all therapeutic categories.</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-brand-50 border border-brand-100">
                  <div className="h-2 w-2 rounded-full bg-brand-900" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-700">Sales</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-8">
            <div className="h-[300px] md:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4A373" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D4A373" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#A98467', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#A98467', fontSize: 12, fontWeight: 600 }}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '16px', 
                      border: '1px solid #E9EDC9',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#D4A373" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="lg:col-span-4 border-brand-200 shadow-premium rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white">
          <CardHeader className="p-6 md:p-8 border-b border-brand-100">
            <CardTitle className="text-xl md:text-2xl font-serif font-bold text-brand-900">Category Mix</CardTitle>
            <CardDescription className="text-xs md:text-sm text-brand-500 font-medium">Distribution of therapeutic confections.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="h-[250px] md:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-8">
              {categoryData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-xs font-bold text-brand-700">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-brand-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="border-brand-200 shadow-premium rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-brand-100">
          <CardTitle className="text-2xl font-serif font-bold text-brand-900">Distribution Log</CardTitle>
          <CardDescription className="text-brand-500 font-medium">Real-time tracking of therapeutic confections across regions.</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {[
              { region: 'North America', status: 'Optimal', load: '88%', trend: 'up' },
              { region: 'European Union', status: 'High Demand', load: '94%', trend: 'up' },
              { region: 'Asia Pacific', status: 'Stable', load: '72%', trend: 'down' },
              { region: 'Middle East', status: 'Growing', load: '65%', trend: 'up' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-4 md:p-6 rounded-3xl bg-brand-50 border border-brand-100 hover:border-brand-400 transition-all gap-6">
                <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-white flex items-center justify-center text-brand-900 shadow-sm shrink-0">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 text-base md:text-lg">{item.region}</h4>
                    <p className="text-[10px] text-brand-500 font-bold uppercase tracking-widest">{item.status}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-8 md:gap-12 w-full sm:w-auto">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] md:text-sm font-bold text-brand-900">Capacity Load</p>
                    <p className="text-xl md:text-2xl font-serif font-bold text-brand-700">{item.load}</p>
                  </div>
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                    item.trend === 'up' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {item.trend === 'up' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
