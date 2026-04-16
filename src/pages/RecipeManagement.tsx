import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  FlaskConical,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChefHat,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const mockRecipes = [
  { id: 'RCP-001', name: 'Low-Glycemic Almond Macaron', version: 'v2.4', status: 'Approved', stability: '98%', author: 'Dr. Elena Vance' },
  { id: 'RCP-002', name: 'High-Protein Quinoa Brownie', version: 'v1.8', status: 'Testing', stability: '85%', author: 'Chef Marcus' },
  { id: 'RCP-003', name: 'Keto-Friendly Avocado Mousse', version: 'v3.1', status: 'Approved', stability: '99%', author: 'Dr. Elena Vance' },
  { id: 'RCP-004', name: 'Omega-3 Enriched Chia Muffin', version: 'v1.2', status: 'Draft', stability: 'N/A', author: 'Chef Sarah' },
];

export default function RecipeManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = mockRecipes.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold text-brand-900">Recipe Repository</h1>
          <p className="text-brand-600 font-medium">Manage and version clinical confectionery formulations.</p>
        </div>
        <Button className="bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-2xl h-12 px-8 shadow-premium transition-all hover:scale-105 active:scale-95">
          <Plus className="mr-2 h-5 w-5" /> New Formulation
        </Button>
      </div>

      {/* Recipe Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Recipes', value: '42', icon: FileText, color: 'bg-brand-100 text-brand-700' },
          { label: 'Approved', value: '28', icon: CheckCircle2, color: 'bg-green-100 text-green-700' },
          { label: 'In Testing', value: '10', icon: FlaskConical, color: 'bg-blue-100 text-blue-700' },
          { label: 'Drafts', value: '4', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
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

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe, i) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-brand-200 shadow-premium rounded-[2.5rem] overflow-hidden bg-white hover:border-brand-400 transition-all group">
              <CardHeader className="p-8 border-b border-brand-100 bg-brand-50/30">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-brand-900 text-brand-50 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                    <ChefHat className="h-6 w-6" />
                  </div>
                  <Badge className={cn(
                    "rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest border-none shadow-sm",
                    recipe.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                    recipe.status === 'Testing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  )}>
                    {recipe.status}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-serif font-bold text-brand-900">{recipe.name}</CardTitle>
                <CardDescription className="text-brand-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                  ID: {recipe.id} • Version: {recipe.version}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Molecular Stability</p>
                    <p className="text-xl font-serif font-bold text-brand-900">{recipe.stability}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Author</p>
                    <p className="text-sm font-bold text-brand-700">{recipe.author}</p>
                  </div>
                </div>
                
                <div className="h-1.5 w-full bg-brand-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      recipe.stability === 'N/A' ? 'w-0' : `w-[${recipe.stability}]`,
                      parseInt(recipe.stability) > 90 ? 'bg-green-500' : 'bg-brand-400'
                    )} 
                    style={{ width: recipe.stability === 'N/A' ? '0%' : recipe.stability }}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 h-12 bg-brand-50 text-brand-900 hover:bg-brand-900 hover:text-brand-50 rounded-xl font-bold transition-all">
                    View Details
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-brand-200 text-brand-400 hover:text-brand-900">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Lab Integration CTA */}
      <Card className="border-brand-900 bg-brand-900 text-brand-50 shadow-premium rounded-[3rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-brand-400 blur-[120px]" />
        </div>
        <CardContent className="p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <h2 className="text-4xl font-serif font-bold leading-tight">
              Need to optimize a <br />
              <span className="text-brand-300 italic font-light">formulation</span>?
            </h2>
            <p className="text-brand-200 text-lg">
              Use the Therapeutic Nutrition Lab to analyze molecular stability and glycemic impact before saving to the repository.
            </p>
          </div>
          <Button className="h-16 px-10 bg-brand-400 text-brand-900 hover:bg-brand-300 rounded-2xl text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
            Open Lab Interface <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
