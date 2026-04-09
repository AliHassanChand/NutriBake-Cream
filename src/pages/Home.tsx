import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Leaf, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/bakery-hero/1920/1080" 
            alt="Bakery Hero" 
            className="h-full w-full object-cover brightness-[0.4] scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/40 via-transparent to-brand-50" />
        </div>
        
        <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl space-y-10"
          >
            <div className="inline-flex items-center gap-3 rounded-full glass-dark px-5 py-2 text-sm font-semibold text-brand-50 border-brand-50/10">
              <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
              Laboratory-Crafted Confectionery
            </div>
            
            <h1 className="text-7xl font-serif font-bold leading-[0.9] text-brand-50 md:text-[10rem] tracking-tighter text-balance">
              Healing <br />
              <span className="text-brand-300 italic font-light">Through</span> Taste
            </h1>
            
            <p className="max-w-xl text-xl text-brand-100/80 leading-relaxed md:text-2xl font-medium text-balance">
              Where clinical nutrition meets artisanal mastery. Discover treats designed for your health, crafted for your joy.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-6">
              <Link to="/products">
                <Button size="lg" className="h-16 px-10 bg-brand-50 text-brand-900 hover:bg-brand-200 rounded-2xl text-lg font-bold shadow-premium transition-all hover:scale-105 active:scale-95">
                  Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/nutrition">
                <Button size="lg" variant="outline" className="h-16 px-10 border-brand-50/30 text-brand-50 hover:bg-brand-50/10 rounded-2xl text-lg font-bold backdrop-blur-sm transition-all hover:scale-105 active:scale-95">
                  The Laboratory
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-300 font-bold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-300 to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-bold">Our Philosophy</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-900 leading-tight text-balance">
                Science in every <span className="text-brand-500 italic">crumb</span>.
              </h2>
            </div>
            <p className="text-xl text-brand-600 leading-relaxed text-balance">
              We believe that dietary restrictions shouldn't mean flavor restrictions. Our lab analyzes molecular structures to recreate the textures you love using therapeutic ingredients.
            </p>
            <div className="grid grid-cols-1 gap-8">
              {[
                { title: 'Molecular Precision', desc: 'Analyzing glycemic impact at a cellular level.', icon: ShieldCheck },
                { title: 'Artisanal Soul', desc: 'Hand-crafted by Michelin-trained pastry chefs.', icon: Heart },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-900 group-hover:text-brand-50">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-serif font-bold text-brand-900">{item.title}</h4>
                    <p className="text-brand-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] shadow-premium">
              <img 
                src="https://picsum.photos/seed/lab-process/1000/1250" 
                alt="Laboratory Process" 
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-10 rounded-[2.5rem] shadow-premium max-w-xs space-y-4 hidden md:block">
              <div className="flex gap-2">
                {[1,2,3,4,5].map(i => <div key={i} className="h-1 w-8 rounded-full bg-brand-900" />)}
              </div>
              <p className="text-sm font-medium text-brand-900 italic">
                "The texture is indistinguishable from traditional pastry, yet the nutritional profile is clinically superior."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-200" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand-900">Dr. Elena Vance</span>
                  <span className="text-[10px] text-brand-500 uppercase font-bold">Chief Nutritionist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="bg-brand-900 py-32 text-brand-50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-400 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-300 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-400 font-bold">Collections</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                Tailored for your <br />
                <span className="text-brand-300 italic font-light">well-being</span>.
              </h2>
            </div>
            <Link to="/products">
              <Button variant="outline" className="h-14 px-8 border-brand-50/20 text-brand-50 hover:bg-brand-50 hover:text-brand-900 rounded-2xl font-bold transition-all">
                View All Collections
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[800px] md:h-[600px]">
            <div className="md:col-span-7 relative group overflow-hidden rounded-[2.5rem]">
              <img 
                src="https://picsum.photos/seed/diabetic-cat/1200/800" 
                alt="Diabetic Friendly" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 p-10 space-y-4">
                <h3 className="text-4xl font-serif font-bold">Diabetic Friendly</h3>
                <p className="text-brand-200 max-w-md text-lg">Low glycemic index treats crafted with natural monk fruit and almond flour.</p>
                <Link to="/products?cat=diabetic" className="inline-flex items-center gap-2 text-brand-300 font-bold hover:text-brand-50 transition-colors">
                  Shop Collection <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="md:col-span-5 grid grid-rows-2 gap-8">
              <div className="relative group overflow-hidden rounded-[2.5rem]">
                <img 
                  src="https://picsum.photos/seed/protein-cat/800/600" 
                  alt="High Protein" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 p-8 space-y-2">
                  <h3 className="text-2xl font-serif font-bold">High Protein</h3>
                  <Link to="/products?cat=high-protein" className="inline-flex items-center gap-2 text-brand-300 font-bold hover:text-brand-50 transition-colors text-sm">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-[2.5rem]">
                <img 
                  src="https://picsum.photos/seed/lowcal-cat/800/600" 
                  alt="Low Calorie" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 p-8 space-y-2">
                  <h3 className="text-2xl font-serif font-bold">Low Calorie</h3>
                  <Link to="/products?cat=low-calorie" className="inline-flex items-center gap-2 text-brand-300 font-bold hover:text-brand-50 transition-colors text-sm">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-bold">The Laboratory Selection</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-900">Weekly Favorites</h2>
          </div>
          <Link to="/products">
            <Button variant="link" className="text-brand-900 font-bold text-lg group p-0 h-auto">
              View Full Catalog <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[4rem] bg-brand-100 py-32 px-10 text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-300 blur-[150px]" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-900 leading-tight">
              Ready to experience <br />
              <span className="text-brand-500 italic font-light">therapeutic</span> joy?
            </h2>
            <p className="text-xl text-brand-600 font-medium">
              Join 10,000+ health-conscious individuals who have transformed their relationship with sweets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/products">
                <Button size="lg" className="h-16 px-12 bg-brand-900 text-brand-50 hover:bg-brand-800 rounded-2xl text-lg font-bold shadow-premium">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="h-16 px-12 border-brand-900/20 text-brand-900 hover:bg-brand-900 hover:text-brand-50 rounded-2xl text-lg font-bold transition-all">
                  Consult a Nutritionist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
