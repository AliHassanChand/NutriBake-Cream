import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Database, 
  Users, 
  FlaskConical, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Package, label: 'Products', path: '/dashboard/products' },
  { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders' },
  { icon: Database, label: 'Inventory', path: '/dashboard/inventory' },
  { icon: Users, label: 'Staff', path: '/dashboard/staff' },
  { icon: FlaskConical, label: 'Nutrition Lab', path: '/dashboard/lab' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-brand-100/50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-80 flex-col border-r border-brand-200 bg-white shadow-soft">
        <div className="flex h-24 items-center px-10 border-b border-brand-100">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 text-brand-50 transition-transform group-hover:rotate-12">
              <span className="text-xl font-bold">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-tight text-brand-900 leading-none">NutriBake</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-brand-500 font-bold">Admin Portal</span>
            </div>
          </Link>
        </div>
        
        <ScrollArea className="flex-1 px-6 py-8">
          <div className="space-y-1">
            <span className="px-4 text-[10px] uppercase tracking-[0.2em] text-brand-400 font-bold mb-4 block">Main Menu</span>
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-4 h-12 rounded-2xl transition-all duration-300 px-4",
                    location.pathname === item.path 
                      ? "bg-brand-900 text-brand-50 hover:bg-brand-800 hover:text-brand-50 shadow-premium" 
                      : "text-brand-600 hover:bg-brand-100 hover:text-brand-900"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 transition-transform", location.pathname === item.path && "scale-110")} />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                  {location.pathname === item.path && (
                    <motion.div layoutId="active-pill" className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-300" />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          <div className="mt-12 space-y-4">
            <span className="px-4 text-[10px] uppercase tracking-[0.2em] text-brand-400 font-bold block">Lab Status</span>
            <div className="px-4 py-4 rounded-3xl bg-brand-50 border border-brand-100 space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="text-brand-500">Active Experiments</span>
                <span className="text-brand-900">12</span>
              </div>
              <div className="h-1.5 w-full bg-brand-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  className="h-full bg-brand-700"
                />
              </div>
              <p className="text-[10px] text-brand-500 leading-tight">
                Laboratory efficiency is currently at <span className="text-brand-900 font-bold">88%</span>.
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-6 border-t border-brand-100">
          <div className="mb-4 flex items-center gap-4 px-4 py-4 rounded-[2rem] bg-brand-50 border border-brand-100 shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-brand-200 flex items-center justify-center text-brand-700 font-bold text-lg">
              AA
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-brand-900">Admin Alice</span>
              <span className="text-[10px] text-brand-500 uppercase font-bold tracking-wider">System Admin</span>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-4 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-2xl h-12 px-4 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-bold text-sm">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 border-b border-brand-200 bg-white/80 backdrop-blur-md px-10 flex items-center justify-between shadow-soft z-10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-400 font-bold">Dashboard</span>
            <h2 className="text-2xl font-serif font-bold text-brand-900">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Overview'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-brand-200 text-brand-600 hover:bg-brand-50 transition-all">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-10 w-px bg-brand-200 mx-2" />
            <Link to="/dashboard/pos">
              <Button className="h-12 bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-2xl px-8 font-bold shadow-premium transition-all hover:scale-105 active:scale-95">
                Create New Order
              </Button>
            </Link>
          </div>
        </header>
        
        <ScrollArea className="flex-1 p-10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
