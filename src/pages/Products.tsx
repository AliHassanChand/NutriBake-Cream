import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'diabetic', label: 'Diabetic Friendly' },
  { id: 'high-protein', label: 'High Protein' },
  { id: 'low-calorie', label: 'Low Calorie' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const currentCategory = searchParams.get('cat') || 'all';

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [currentCategory, searchQuery]);

  const setCategory = (cat: string) => {
    if (cat === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-brand-100 py-12 md:py-20 border-b border-brand-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-900">Therapeutic Collection</h1>
            <p className="text-lg md:text-xl text-brand-600">
              Browse our laboratory-crafted treats, filtered by your specific health needs.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-400 mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-400" />
                <input 
                  type="text" 
                  placeholder="Find a treat..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 rounded-xl border border-brand-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-400 mb-4">Categories</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={currentCategory === cat.id ? 'default' : 'ghost'}
                    onClick={() => setCategory(cat.id)}
                    className={`justify-start rounded-xl h-11 ${
                      currentCategory === cat.id 
                        ? 'bg-brand-700 text-brand-50 hover:bg-brand-800' 
                        : 'text-brand-600 hover:bg-brand-100'
                    }`}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-900 text-brand-50 space-y-4">
              <h4 className="font-serif font-bold text-lg">Need Guidance?</h4>
              <p className="text-xs text-brand-300 leading-relaxed">
                Not sure which treat is right for your condition? Our clinical nutritionists are here to help.
              </p>
              <Button variant="outline" className="w-full border-brand-700 text-brand-50 hover:bg-brand-800 rounded-xl text-xs">
                Consult a Nutritionist
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <p className="text-brand-600 text-sm md:text-base">
                Showing <span className="font-bold text-brand-900">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="rounded-xl border-brand-200 text-brand-600 w-full sm:w-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Sort by: Featured
                </Button>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-brand-100 flex items-center justify-center text-brand-400">
                  <X className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-900">No products found</h3>
                <p className="text-brand-600 max-w-xs">
                  We couldn't find any products matching your current filters. Try adjusting your search.
                </p>
                <Button 
                  variant="link" 
                  className="text-brand-700 font-bold"
                  onClick={() => {
                    setSearchQuery('');
                    setCategory('all');
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
