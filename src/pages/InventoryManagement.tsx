import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  MoreVertical,
  Download,
  Database,
  CheckCircle2,
  Calendar,
  Truck
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
import { ingredients as mockIngredients } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIngredients = mockIngredients.filter(ing => 
    ing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold text-brand-900">Inventory Tracking</h1>
          <p className="text-brand-600 font-medium">Monitor and manage therapeutic ingredient stock levels with precision.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 rounded-2xl border-brand-200 text-brand-700 hover:bg-brand-50 px-6">
            <Download className="mr-2 h-5 w-5" /> Export Report
          </Button>
          <Button className="h-12 bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-2xl px-8 shadow-premium transition-all hover:scale-105 active:scale-95">
            <Plus className="mr-2 h-5 w-5" /> Add Reagent
          </Button>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Ingredients', value: mockIngredients.length, icon: Database, color: 'bg-brand-100 text-brand-700', sub: 'Active Database' },
          { label: 'Low Stock Alerts', value: 2, icon: AlertTriangle, color: 'bg-red-100 text-red-700', sub: 'Requires Attention' },
          { label: 'Inventory Health', value: 'Optimal', icon: CheckCircle2, color: 'bg-green-100 text-green-700', sub: 'System Status' },
        ].map((stat, i) => (
          <Card key={i} className="border-brand-200 shadow-soft rounded-[2rem] overflow-hidden group hover:border-brand-400 transition-all">
            <CardContent className="p-8 flex items-center gap-6">
              <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.color)}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-400">{stat.label}</p>
                <p className="text-3xl font-serif font-bold text-brand-900">{stat.value}</p>
                <p className="text-[10px] font-bold text-brand-500 uppercase tracking-wider">{stat.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inventory Table */}
      <Card className="border-brand-200 shadow-premium rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-brand-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-serif font-bold text-brand-900">Ingredient Database</CardTitle>
              <CardDescription className="text-brand-500 font-medium">Real-time stock monitoring and replenishment management.</CardDescription>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
                <Input 
                  placeholder="Search ingredients..." 
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
                <TableHead className="pl-8 text-brand-700 font-bold uppercase tracking-widest text-[10px]">Ingredient</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Stock Level</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Min. Threshold</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Supply Chain</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                <TableHead className="pr-8 text-right text-brand-700 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ing) => {
                const stockPercentage = (ing.stock / (ing.minStock * 5)) * 100;
                const isLow = ing.stock <= ing.minStock;
                
                return (
                  <TableRow key={ing.id} className="hover:bg-brand-50/30 border-brand-100 transition-colors h-24">
                    <TableCell className="pl-8">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center border border-brand-100">
                          <Database className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-900 text-base">{ing.name}</span>
                          <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">SKU: #ING-{ing.id.padStart(3, '0')}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2 w-40">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-brand-900">{ing.stock} {ing.unit}</span>
                          <span className={cn(isLow ? "text-red-500" : "text-brand-400")}>
                            {Math.min(100, Math.round(stockPercentage))}%
                          </span>
                        </div>
                        <Progress 
                          value={stockPercentage} 
                          className={cn(
                            "h-2 rounded-full",
                            isLow ? "bg-red-100" : "bg-brand-100"
                          )}
                          indicatorClassName={isLow ? "bg-red-500" : "bg-brand-900"}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-brand-600 font-bold text-sm">
                      {ing.minStock} {ing.unit}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-700">
                          <Truck className="h-3.5 w-3.5 opacity-40" />
                          Global Nutri-Supplies
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-brand-400 font-bold uppercase">
                          <Calendar className="h-3 w-3 opacity-40" />
                          Last: 12 Oct 2023
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border-none shadow-sm",
                        isLow ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      )}>
                        {isLow ? 'Critical Level' : 'Optimal Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-8 text-right">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-brand-300 hover:text-brand-900 hover:bg-brand-100 transition-all">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
