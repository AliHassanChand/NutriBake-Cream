import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-900 py-16 text-brand-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-900">
                <span className="text-lg font-bold">N</span>
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-brand-50">NutriBake</span>
            </Link>
            <p className="text-sm text-brand-300 leading-relaxed">
              Healing through nutrition, crafted with care. We specialize in therapeutic confectionery that tastes as good as it feels.
            </p>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-brand-400">Shop</h4>
            <ul className="space-y-3 text-sm text-brand-300">
              <li><Link to="/products?cat=diabetic" className="hover:text-brand-50 transition-colors">Diabetic-Friendly</Link></li>
              <li><Link to="/products?cat=high-protein" className="hover:text-brand-50 transition-colors">High-Protein</Link></li>
              <li><Link to="/products?cat=low-calorie" className="hover:text-brand-50 transition-colors">Low-Calorie</Link></li>
              <li><Link to="/products" className="hover:text-brand-50 transition-colors">All Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-brand-400">Company</h4>
            <ul className="space-y-3 text-sm text-brand-300">
              <li><Link to="/about" className="hover:text-brand-50 transition-colors">Our Story</Link></li>
              <li><Link to="/nutrition" className="hover:text-brand-50 transition-colors">Nutrition Lab</Link></li>
              <li><Link to="/contact" className="hover:text-brand-50 transition-colors">Contact Us</Link></li>
              <li><Link to="/careers" className="hover:text-brand-50 transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-brand-400">Newsletter</h4>
            <p className="mb-4 text-sm text-brand-300">Join our community for health tips and new recipes.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full rounded-md border border-brand-700 bg-brand-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
              <button className="rounded-md bg-brand-50 px-4 py-2 text-sm font-bold text-brand-900 hover:bg-brand-200 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-brand-800 pt-8 text-center text-xs text-brand-500">
          <p>© {new Date().getFullYear()} NutriBake Laboratory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
