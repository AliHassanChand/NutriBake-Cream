import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  MoreVertical,
  ArrowUpDown,
  Download
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

export default function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIngredients = mockIngredients.filter(ing => 
    ing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-900">Inventory Management</h1>
          <p className="text-brand-600">Monitor and manage your therapeutic ingredient stock levels.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-brand-200 text-brand-700">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button className="bg-brand-700 hover:bg-brand-800 text-brand-50 rounded-xl">
            <Plus className="mr-2 h-4 w-4" /> Add Ingredient
          </Button>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-brand-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-brand-500">Total Ingredients</p>
              <p className="text-2xl font-serif font-bold text-brand-900">{mockIngredients.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-brand-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center text-red-700">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-brand-500">Low Stock Alerts</p>
              <p className="text-2xl font-serif font-bold text-red-600">2</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-brand-200 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-brand-500">Inventory Health</p>
              <p className="text-2xl font-serif font-bold text-green-600">Optimal</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="border-brand-200 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-brand-100 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl font-serif font-bold text-brand-900">Ingredient List</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-400" />
                <Input 
                  placeholder="Search ingredients..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-brand-200"
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-xl border-brand-200 text-brand-600">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-brand-50">
              <TableRow className="hover:bg-transparent border-brand-100">
                <TableHead className="w-[300px] text-brand-700 font-bold">Ingredient Name</TableHead>
                <TableHead className="text-brand-700 font-bold">Current Stock</TableHead>
                <TableHead className="text-brand-700 font-bold">Min. Level</TableHead>
                <TableHead className="text-brand-700 font-bold">Status</TableHead>
                <TableHead className="text-right text-brand-700 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ing) => {
                const stockPercentage = (ing.stock / (ing.minStock * 5)) * 100;
                const isLow = ing.stock <= ing.minStock;
                
                return (
                  <TableRow key={ing.id} className="hover:bg-brand-50/50 border-brand-100 transition-colors">
                    <TableCell className="font-bold text-brand-900">{ing.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2 w-32">
                        <div className="flex justify-between text-xs font-medium">
                          <span>{ing.stock} {ing.unit}</span>
                          <span className="text-brand-400">{Math.min(100, Math.round(stockPercentage))}%</span>
                        </div>
                        <Progress 
                          value={stockPercentage} 
                          className={cn(
                            "h-1.5",
                            isLow ? "bg-red-100" : "bg-brand-100"
                          )}
                          indicatorClassName={isLow ? "bg-red-500" : "bg-brand-700"}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-brand-600">{ing.minStock} {ing.unit}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-none",
                        isLow ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      )}>
                        {isLow ? 'Low Stock' : 'In Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="rounded-full text-brand-400 hover:text-brand-900 hover:bg-brand-100">
                        <MoreVertical className="h-4 w-4" />
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

import { cn } from '@/lib/utils';
import { Database, CheckCircle2 } from 'lucide-react';
