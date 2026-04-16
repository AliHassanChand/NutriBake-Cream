import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass shadow-soft">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-brand-50 transition-transform group-hover:rotate-12">
              <span className="text-2xl font-bold">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-tight text-brand-900 leading-none">NutriBake</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-500 font-bold">Therapeutic Lab</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-600">
            <Link to="/products" className="hover:text-brand-900 transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-900 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/nutrition" className="hover:text-brand-900 transition-colors relative group">
              Nutrition Lab
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-900 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="hover:text-brand-900 transition-colors relative group">
              Our Story
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-900 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="hover:text-brand-900 transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-900 transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center relative group">
            <Search className="absolute left-4 h-4 w-4 text-brand-400 transition-colors group-focus-within:text-brand-900" />
            <input 
              type="text" 
              placeholder="Search therapeutic treats..." 
              className="h-11 w-72 rounded-2xl border border-brand-200 bg-brand-100/50 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400/20 focus:bg-white transition-all"
            />
          </div>
          
          <div className="flex items-center gap-1 ml-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-2xl text-brand-700 hover:bg-brand-100">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-900 text-[10px] font-bold text-brand-50 ring-2 ring-white">
                  0
                </span>
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl text-brand-700 hover:bg-brand-100">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-11 w-11 rounded-2xl text-brand-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-brand-50 border-l-brand-200 w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-8 mt-12">
                  <div className="flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-widest text-brand-400 font-bold">Navigation</span>
                    <Link to="/products" className="text-2xl font-serif font-bold text-brand-900">Products</Link>
                    <Link to="/nutrition" className="text-2xl font-serif font-bold text-brand-900">Nutrition Lab</Link>
                    <Link to="/about" className="text-2xl font-serif font-bold text-brand-900">Our Story</Link>
                    <Link to="/contact" className="text-2xl font-serif font-bold text-brand-900">Contact</Link>
                  </div>
                  <div className="h-px bg-brand-200" />
                  <div className="flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-widest text-brand-400 font-bold">Account</span>
                    <Link to="/dashboard" className="text-2xl font-serif font-bold text-brand-900">Admin Dashboard</Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
