import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import NutritionLabDashboard from './pages/NutritionLab';
import InventoryManagement from './pages/InventoryManagement';
import KitchenWorkflow from './pages/KitchenWorkflow';
import OrdersManagement from './pages/OrdersManagement';
import StaffManagement from './pages/StaffManagement';
import POSInterface from './pages/POSInterface';
import ProductManagement from './pages/ProductManagement';
import Cart from './pages/Cart';
import NutritionLab from './pages/NutritionLab';
import Analytics from './pages/Analytics';
import RecipeManagement from './pages/RecipeManagement';
import ProductDetail from './pages/ProductDetail';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/products" element={<ProductManagement />} />
          <Route path="/dashboard/recipes" element={<RecipeManagement />} />
          <Route path="/dashboard/orders" element={<OrdersManagement />} />
          <Route path="/dashboard/kitchen" element={<KitchenWorkflow />} />
          <Route path="/dashboard/inventory" element={<InventoryManagement />} />
          <Route path="/dashboard/staff" element={<StaffManagement />} />
          <Route path="/dashboard/lab" element={<NutritionLab />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/pos" element={<POSInterface />} />
        </Routes>
      </DashboardLayout>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/nutrition" element={<NutritionLab />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
