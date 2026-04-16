import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical,
  Download,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: number;
}

const mockOrders: Order[] = [
  { id: 'ORD-001', customer: 'John Doe', date: '2023-10-12', total: 45.50, status: 'completed', items: 3 },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2023-10-13', total: 22.00, status: 'processing', items: 1 },
  { id: 'ORD-003', customer: 'Robert Brown', date: '2023-10-13', total: 120.75, status: 'pending', items: 5 },
  { id: 'ORD-004', customer: 'Emily Davis', date: '2023-10-14', total: 35.20, status: 'completed', items: 2 },
  { id: 'ORD-005', customer: 'Michael Wilson', date: '2023-10-14', total: 55.00, status: 'cancelled', items: 4 },
];

export default function OrdersManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = mockOrders.filter(o => 
    o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold text-brand-900">Order Management</h1>
          <p className="text-brand-600 font-medium">Track and manage customer orders across all channels.</p>
        </div>
        <Button variant="outline" className="h-12 rounded-2xl border-brand-200 text-brand-700 hover:bg-brand-50 px-6">
          <Download className="mr-2 h-5 w-5" /> Export Orders
        </Button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Orders', value: '1,284', icon: ShoppingBag, color: 'bg-brand-100 text-brand-700' },
          { label: 'Pending', value: '12', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Completed', value: '1,240', icon: CheckCircle2, color: 'bg-green-100 text-green-700' },
          { label: 'Cancelled', value: '32', icon: XCircle, color: 'bg-red-100 text-red-700' },
        ].map((stat, i) => (
          <Card key={i} className="border-brand-200 shadow-soft rounded-[2rem] overflow-hidden group hover:border-brand-400 transition-all">
            <CardContent className="p-8 flex items-center gap-6">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.color)}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">{stat.label}</p>
                <p className="text-2xl font-serif font-bold text-brand-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Table */}
      <Card className="border-brand-200 shadow-premium rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-brand-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-serif font-bold text-brand-900">Recent Transactions</CardTitle>
              <CardDescription className="text-brand-500 font-medium">A detailed log of all customer purchases and fulfillment status.</CardDescription>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
                <Input 
                  placeholder="Search by Order ID or Customer..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-2xl border-brand-200 bg-brand-50/30 focus:ring-brand-400 font-medium"
                />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-brand-200 text-brand-600 hover:bg-brand-50">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-brand-50/50">
              <TableRow className="hover:bg-transparent border-brand-100 h-16">
                <TableHead className="pl-8 text-brand-700 font-bold uppercase tracking-widest text-[10px]">Order ID</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Customer</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Date</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Items</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Total</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                <TableHead className="pr-8 text-right text-brand-700 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-brand-50/30 border-brand-100 transition-colors h-20">
                  <TableCell className="pl-8">
                    <span className="font-bold text-brand-900">{order.id}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-brand-900">{order.customer}</span>
                      <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">Retail Customer</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-brand-600 font-medium text-sm">{order.date}</TableCell>
                  <TableCell className="text-brand-600 font-bold text-sm">{order.items} Units</TableCell>
                  <TableCell className="font-bold text-brand-900 text-base">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border-none shadow-sm",
                      statusColors[order.status]
                    )}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-brand-300 hover:text-brand-900 hover:bg-brand-100 transition-all">
                      <Eye className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
