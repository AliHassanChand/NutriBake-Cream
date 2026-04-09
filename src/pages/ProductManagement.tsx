import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  MoreVertical,
  Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { products as mockProducts } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-900">Product Management</h1>
          <p className="text-brand-600">Add, edit, and manage your therapeutic confectionery catalog.</p>
        </div>
        <Button className="bg-brand-700 hover:bg-brand-800 text-brand-50 rounded-xl">
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <Card className="border-brand-200 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-brand-100 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl font-serif font-bold text-brand-900">Product Catalog</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-400" />
                <Input 
                  placeholder="Search catalog..." 
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
                <TableHead className="w-[400px] text-brand-700 font-bold">Product</TableHead>
                <TableHead className="text-brand-700 font-bold">Category</TableHead>
                <TableHead className="text-brand-700 font-bold">Price</TableHead>
                <TableHead className="text-brand-700 font-bold">Nutrition (Cal/Pro)</TableHead>
                <TableHead className="text-right text-brand-700 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-brand-50/50 border-brand-100 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl overflow-hidden border border-brand-100">
                        <img src={product.image} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-brand-900">{product.name}</span>
                        <span className="text-xs text-brand-500 truncate max-w-[250px]">{product.description}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-100 text-brand-700 border-none">
                      {product.category.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-brand-900">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-[10px] border-brand-200 text-brand-500">{product.nutrition.calories} kcal</Badge>
                      <Badge variant="outline" className="text-[10px] border-brand-200 text-brand-500">{product.nutrition.protein}g pro</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full text-brand-400 hover:text-brand-700 hover:bg-brand-100">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full text-brand-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
