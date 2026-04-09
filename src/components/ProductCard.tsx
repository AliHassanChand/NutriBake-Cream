import { motion } from 'motion/react';
import { Product } from '@/types/index';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }: { product: Product, key?: string }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-soft transition-all hover:shadow-premium"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-5 right-5">
          <Badge className="bg-white/90 text-brand-900 backdrop-blur-md border-none px-4 py-1.5 rounded-full font-bold shadow-sm capitalize">
            {product.category.replace('-', ' ')}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="flex flex-1 flex-col p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-serif font-bold text-brand-900 leading-tight group-hover:text-brand-700 transition-colors">
              {product.name}
            </h3>
            <span className="text-xl font-serif font-bold text-brand-900">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-brand-500 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Cal', val: product.nutrition.calories },
            { label: 'Pro', val: `${product.nutrition.protein}g` },
            { label: 'Sug', val: `${product.nutrition.sugar}g` },
            { label: 'Fat', val: `${product.nutrition.fat}g` },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-brand-50/50 border border-brand-100">
              <span className="text-xs font-bold text-brand-900">{stat.val}</span>
              <span className="text-[9px] uppercase tracking-wider text-brand-400 font-bold">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Button className="flex-1 h-12 bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-2xl font-bold shadow-sm transition-all active:scale-95">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Link to={`/products/${product.id}`}>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-brand-200 text-brand-700 hover:bg-brand-50 transition-all active:scale-95">
              <Info className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
