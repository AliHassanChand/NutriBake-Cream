import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  MoreVertical,
  Image as ImageIcon,
  FlaskConical,
  Eye,
  Archive,
  Save,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { products as initialProducts } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'brownies',
    calories: '',
    protein: '',
    sugar: '',
    fat: '',
    image: 'https://picsum.photos/seed/new-bake/800/600'
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProduct = () => {
    const product = {
      id: (products.length + 1).toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price) || 0,
      category: newProduct.category,
      image: newProduct.image,
      nutrition: {
        calories: parseInt(newProduct.calories) || 0,
        protein: parseInt(newProduct.protein) || 0,
        sugar: parseInt(newProduct.sugar) || 0,
        fat: parseInt(newProduct.fat) || 0
      }
    };

    setProducts([product, ...products]);
    setIsDialogOpen(false);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: 'brownies',
      calories: '',
      protein: '',
      sugar: '',
      fat: '',
      image: 'https://picsum.photos/seed/new-bake/800/600'
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold text-brand-900">Product Catalog</h1>
          <p className="text-brand-600 font-medium">Manage your therapeutic confectionery formulations and retail offerings.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-2xl px-8 shadow-premium transition-all hover:scale-105 active:scale-95">
              <Plus className="mr-2 h-5 w-5" /> Create Formulation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] border-brand-200 p-0 overflow-hidden">
            <DialogHeader className="p-8 bg-brand-50 border-b border-brand-100">
              <DialogTitle className="text-2xl font-serif font-bold text-brand-900">New Formulation</DialogTitle>
              <DialogDescription className="text-brand-600 font-medium">
                Define the molecular and nutritional profile of your new therapeutic confection.
              </DialogDescription>
            </DialogHeader>
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-brand-400">Formulation Name</Label>
                  <Input 
                    placeholder="e.g. Clinical Almond Brownie" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="h-12 rounded-xl border-brand-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-brand-400">Category</Label>
                  <Select 
                    value={newProduct.category} 
                    onValueChange={(val) => setNewProduct({...newProduct, category: val})}
                  >
                    <SelectTrigger className="h-12 rounded-xl border-brand-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-brand-200">
                      <SelectItem value="brownies">Brownies</SelectItem>
                      <SelectItem value="cookies">Cookies</SelectItem>
                      <SelectItem value="cakes">Cakes</SelectItem>
                      <SelectItem value="tarts">Tarts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-brand-400">Description</Label>
                <Textarea 
                  placeholder="Describe the therapeutic benefits and flavor profile..." 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="rounded-xl border-brand-200 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-brand-400">Price ($)</Label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="h-12 rounded-xl border-brand-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-brand-400">Calories (kcal)</Label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    value={newProduct.calories}
                    onChange={(e) => setNewProduct({...newProduct, calories: e.target.value})}
                    className="h-12 rounded-xl border-brand-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-brand-400">Protein (g)</Label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    value={newProduct.protein}
                    onChange={(e) => setNewProduct({...newProduct, protein: e.target.value})}
                    className="h-12 rounded-xl border-brand-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-brand-400">Sugar (g)</Label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    value={newProduct.sugar}
                    onChange={(e) => setNewProduct({...newProduct, sugar: e.target.value})}
                    className="h-12 rounded-xl border-brand-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-brand-400">Fat (g)</Label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    value={newProduct.fat}
                    onChange={(e) => setNewProduct({...newProduct, fat: e.target.value})}
                    className="h-12 rounded-xl border-brand-200"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="p-8 bg-brand-50 border-t border-brand-100 gap-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="h-12 rounded-xl border-brand-200 font-bold">
                Cancel
              </Button>
              <Button onClick={handleCreateProduct} className="h-12 bg-brand-900 text-brand-50 rounded-xl px-8 font-bold shadow-lg">
                Save Formulation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-brand-200 shadow-premium rounded-[2.5rem] overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-brand-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-serif font-bold text-brand-900">Active Inventory</CardTitle>
              <CardDescription className="text-brand-500 font-medium">Catalog of all lab-certified and retail-ready confections.</CardDescription>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
                <Input 
                  placeholder="Search catalog..." 
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
                <TableHead className="pl-8 text-brand-700 font-bold uppercase tracking-widest text-[10px]">Formulation</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Classification</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Pricing</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Nutritional Profile</TableHead>
                <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                <TableHead className="pr-8 text-right text-brand-700 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-brand-50/30 border-brand-100 transition-colors h-28">
                  <TableCell className="pl-8">
                    <div className="flex items-center gap-5">
                      <div className="h-16 w-16 rounded-[1.25rem] overflow-hidden border border-brand-100 shadow-soft relative group">
                        <img src={product.image} className="h-full w-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-brand-900 text-base">{product.name}</span>
                          <FlaskConical className="h-3.5 w-3.5 text-brand-400" />
                        </div>
                        <span className="text-xs text-brand-500 line-clamp-1 max-w-[200px] font-medium">{product.description}</span>
                        <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">SKU: #PRD-{product.id.padStart(3, '0')}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-brand-100 text-brand-700 border-none shadow-sm">
                      {product.category.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-brand-900 text-lg">${product.price.toFixed(2)}</span>
                      <span className="text-[10px] text-brand-400 font-bold uppercase">Per Unit</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-[10px] border-brand-200 text-brand-600 bg-brand-50/50 font-bold">{product.nutrition.calories} KCAL</Badge>
                        <Badge variant="outline" className="text-[10px] border-brand-200 text-brand-600 bg-brand-50/50 font-bold">{product.nutrition.protein}G PRO</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-[10px] border-brand-200 text-brand-600 bg-brand-50/50 font-bold">{product.nutrition.sugar}G SGR</Badge>
                        <Badge variant="outline" className="text-[10px] border-brand-200 text-brand-600 bg-brand-50/50 font-bold">{product.nutrition.fat}G FAT</Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-green-100 text-green-700 border-none shadow-sm">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-brand-300 hover:text-brand-900 hover:bg-brand-100 transition-all">
                        <Edit2 className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                        className="h-10 w-10 rounded-xl text-brand-300 hover:text-red-600 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="h-5 w-5" />
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
