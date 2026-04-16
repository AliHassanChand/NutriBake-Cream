import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  ArrowLeft, 
  ChevronRight, 
  FlaskConical, 
  ShieldCheck, 
  Leaf, 
  Zap,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-serif font-bold text-brand-900">Product Not Found</h1>
        <Link to="/products" className="text-brand-700 font-bold mt-4 inline-block hover:underline">
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <nav className="flex items-center gap-2 text-sm font-medium text-brand-500">
          <Link to="/" className="hover:text-brand-900 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="hover:text-brand-900 transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-brand-900 font-bold">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-[3rem] shadow-premium bg-brand-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-8 left-8">
              <Badge className="bg-white/90 text-brand-900 backdrop-blur-md border-none px-6 py-2 rounded-full font-bold shadow-lg text-sm uppercase tracking-widest">
                {product.category.replace('-', ' ')}
              </Badge>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                <FlaskConical className="h-4 w-4" />
                <span>Laboratory Certified Formulation</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl md:text-3xl font-serif font-bold text-brand-700">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-lg md:text-xl text-brand-600 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Nutritional Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Calories', val: product.nutrition.calories, unit: 'kcal', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
                { label: 'Protein', val: product.nutrition.protein, unit: 'g', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Sugar', val: product.nutrition.sugar, unit: 'g', icon: Leaf, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Fat', val: product.nutrition.fat, unit: 'g', icon: CheckCircle2, color: 'text-purple-500', bg: 'bg-purple-50' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col p-6 rounded-[2rem] bg-white border border-brand-100 shadow-soft">
                  <div className={`h-10 w-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-serif font-bold text-brand-900">{stat.val}<span className="text-xs ml-1">{stat.unit}</span></span>
                  <span className="text-[10px] uppercase tracking-widest text-brand-400 font-bold mt-1">{stat.label}</span>
                </div>
              ))}
            </div>

            <Separator className="bg-brand-100" />

            {/* Ingredients */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-400">Clinical Reagents (Ingredients)</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <Badge key={i} variant="outline" className="rounded-full border-brand-200 text-brand-700 px-4 py-1.5 font-bold bg-brand-50/50">
                    {ing}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="flex-1 h-16 md:h-20 bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-[1.5rem] text-lg md:text-xl font-bold shadow-premium transition-all hover:scale-[1.02] active:scale-[0.98]">
                <ShoppingCart className="mr-3 h-5 w-5 md:h-6 md:w-6" /> Add to Formulation
              </Button>
              <Button variant="outline" className="h-16 md:h-20 px-10 rounded-[1.5rem] border-brand-200 text-brand-900 font-bold text-base md:text-lg hover:bg-brand-50">
                Lab Analysis
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10">
              {[
                { title: 'Clinically Tested', icon: ShieldCheck },
                { title: 'Natural Sweeteners', icon: Leaf },
                { title: 'Zero Refined Sugar', icon: CheckCircle2 },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-3 text-brand-500">
                  <badge.icon className="h-5 w-5 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">{badge.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detailed Analysis Section */}
        <section className="mt-20 md:mt-32 space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-900">Molecular Breakdown</h2>
            <p className="text-brand-600 max-w-2xl mx-auto font-medium text-sm md:text-base">
              Our clinical analysis reveals the superior nutritional profile of this formulation compared to traditional alternatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <Card className="border-brand-200 shadow-premium rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10 space-y-4 md:space-y-6">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                  <Leaf className="h-6 w-6 md:h-7 md:w-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900">Glycemic Stability</h3>
                <p className="text-brand-600 leading-relaxed font-medium text-sm md:text-base">
                  Utilizing natural sweeteners like Stevia and Erythritol, this formulation maintains a flat glycemic response, preventing insulin spikes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand-200 shadow-premium rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10 space-y-4 md:space-y-6">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 md:h-7 md:w-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900">Bioavailability</h3>
                <p className="text-brand-600 leading-relaxed font-medium text-sm md:text-base">
                  Ingredients are processed to maximize nutrient absorption, ensuring your body receives the full benefit of every therapeutic component.
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand-200 shadow-premium rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10 space-y-4 md:space-y-6">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Zap className="h-6 w-6 md:h-7 md:w-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-900">Metabolic Support</h3>
                <p className="text-brand-600 leading-relaxed font-medium text-sm md:text-base">
                  High protein and fiber content support a healthy metabolism and provide sustained energy throughout the day.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
