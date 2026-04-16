import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Calculator, 
  FlaskConical, 
  Save,
  Info,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  RefreshCw,
  FileText,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ingredients as mockIngredients } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface RecipeIngredient {
  ingredientId: string;
  amount: number; // in grams
}

export default function NutritionLab() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [labNotes, setLabNotes] = useState('');

  const addIngredient = () => {
    if (!selectedIngredient || !amount) return;
    setRecipeIngredients([...recipeIngredients, { ingredientId: selectedIngredient, amount: parseFloat(amount) }]);
    setSelectedIngredient('');
    setAmount('');
  };

  const removeIngredient = (index: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };

  const totals = useMemo(() => {
    return recipeIngredients.reduce((acc, curr) => {
      const ingredient = mockIngredients.find(i => i.id === curr.ingredientId);
      if (!ingredient) return acc;
      
      const factor = curr.amount / 100;
      return {
        calories: acc.calories + (ingredient.nutritionPer100g.calories * factor),
        protein: acc.protein + (ingredient.nutritionPer100g.protein * factor),
        sugar: acc.sugar + (ingredient.nutritionPer100g.sugar * factor),
        fat: acc.fat + (ingredient.nutritionPer100g.fat * factor),
      };
    }, { calories: 0, protein: 0, sugar: 0, fat: 0 });
  }, [recipeIngredients]);

  // Simulated traditional version for comparison
  const traditionalTotals = {
    calories: totals.calories * 1.8,
    protein: totals.protein * 0.4,
    sugar: totals.sugar * 4.5,
    fat: totals.fat * 2.2,
  };

  const healthTags = useMemo(() => {
    const tags = [];
    if (totals.sugar < 5 && recipeIngredients.length > 0) tags.push({ label: 'Diabetic Friendly', color: 'bg-green-100 text-green-700' });
    if (totals.protein > 15) tags.push({ label: 'High Protein', color: 'bg-blue-100 text-blue-700' });
    if (totals.calories < 200 && recipeIngredients.length > 0) tags.push({ label: 'Low Calorie', color: 'bg-yellow-100 text-yellow-700' });
    return tags;
  }, [totals, recipeIngredients]);

  const substitutions = useMemo(() => {
    const subs = [];
    const highSugar = recipeIngredients.some(ri => {
      const ing = mockIngredients.find(i => i.id === ri.ingredientId);
      return ing && ing.nutritionPer100g.sugar > 20;
    });
    if (highSugar) subs.push({ from: 'Refined Sugar', to: 'Monk Fruit Extract', reason: '90% lower glycemic impact', impact: '-85% Sugar' });
    
    const highFat = recipeIngredients.some(ri => {
      const ing = mockIngredients.find(i => i.id === ri.ingredientId);
      return ing && ing.nutritionPer100g.fat > 30;
    });
    if (highFat) subs.push({ from: 'Butter', to: 'Avocado Puree', reason: 'Heart-healthy monounsaturated fats', impact: '-40% Sat Fat' });
    
    if (recipeIngredients.length > 0 && totals.protein < 10) {
      subs.push({ from: 'Wheat Flour', to: 'Almond Flour', reason: 'Increases protein and healthy fats', impact: '+12g Protein' });
    }

    return subs;
  }, [recipeIngredients, totals.protein]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 tracking-tight">Therapeutic Nutrition Lab</h1>
          <p className="text-brand-600 font-medium text-base md:text-lg">Molecular analysis and recipe optimization for clinical outcomes.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Button variant="outline" onClick={() => setShowComparison(!showComparison)} className="h-14 px-8 rounded-[1.5rem] border-brand-200 text-brand-700 font-bold hover:bg-brand-50 shadow-sm w-full sm:w-auto">
            <Calculator className="mr-2 h-5 w-5" /> {showComparison ? 'Hide Comparison' : 'Compare Traditional'}
          </Button>
          <Button className="h-14 px-8 bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-[1.5rem] font-bold shadow-premium transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
            <Save className="mr-2 h-5 w-5" /> Export Lab Report
          </Button>
        </div>
      </div>

      {/* Lab Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Molecular Stability', value: '98.4%', icon: FlaskConical, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Glycemic Impact', value: 'Low', icon: AlertCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Bioavailability', value: 'High', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Lab Version', value: 'v4.2.0', icon: Info, color: 'text-brand-600', bg: 'bg-brand-50' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-[2rem] bg-white border border-brand-100 shadow-soft flex items-center gap-5">
            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400">{stat.label}</p>
              <p className="text-xl font-serif font-bold text-brand-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Recipe Builder */}
        <div className="lg:col-span-8 space-y-10">
          <Card className="border-brand-200 shadow-premium rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white">
            <CardHeader className="p-6 md:p-10 border-b border-brand-100 bg-brand-50/30">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-brand-900 text-brand-50 flex items-center justify-center shadow-lg shrink-0">
                  <FlaskConical className="h-6 w-6 md:h-7 md:w-7" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-serif font-bold text-brand-900">Recipe Formulation</CardTitle>
                  <CardDescription className="text-brand-500 font-medium text-sm md:text-base">Precision ingredient mapping for therapeutic confectionery.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-10 space-y-8 md:space-y-10">
              <div className="space-y-4">
                <Label htmlFor="recipe-name" className="text-brand-900 font-bold text-sm uppercase tracking-widest ml-1">Project / Recipe Name</Label>
                <Input 
                  id="recipe-name" 
                  placeholder="e.g. Low-Glycemic Almond Macaron v2.4" 
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="h-14 md:h-16 rounded-2xl border-brand-200 focus:ring-brand-400 bg-brand-50/30 font-bold text-base md:text-lg px-6"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-brand-50 border border-brand-100 shadow-inner">
                <div className="md:col-span-6 space-y-3">
                  <Label className="text-brand-700 font-bold text-xs uppercase tracking-widest ml-1">Select Reagent</Label>
                  <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                    <SelectTrigger className="h-14 rounded-2xl border-brand-200 bg-white shadow-sm font-bold">
                      <SelectValue placeholder="Search database..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-brand-200">
                      {mockIngredients.map(ing => (
                        <SelectItem key={ing.id} value={ing.id} className="rounded-xl focus:bg-brand-50">{ing.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3 space-y-3">
                  <Label className="text-brand-700 font-bold text-xs uppercase tracking-widest ml-1">Mass (g)</Label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-14 rounded-2xl border-brand-200 bg-white shadow-sm font-bold text-center"
                  />
                </div>
                <div className="md:col-span-3 flex items-end">
                  <Button onClick={addIngredient} className="w-full h-14 bg-brand-900 text-brand-50 hover:bg-brand-800 rounded-2xl shadow-lg transition-all active:scale-95 font-bold text-lg">
                    <Plus className="mr-2 h-5 w-5" /> Inject
                  </Button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between px-2">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-400">Molecular Composition</h4>
                  <Badge variant="outline" className="rounded-full border-brand-200 text-brand-500 font-bold px-4 py-1">
                    {recipeIngredients.length} Active Components
                  </Badge>
                </div>
                
                {recipeIngredients.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {recipeIngredients.map((item, i) => {
                      const ing = mockIngredients.find(ing => ing.id === item.ingredientId);
                      return (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-6 rounded-3xl border border-brand-100 bg-white hover:border-brand-400 hover:shadow-soft transition-all group"
                        >
                          <div className="flex items-center gap-6">
                            <div className="h-14 w-14 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-brand-50 transition-all duration-500 shadow-sm">
                              <FlaskConical className="h-7 w-7" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-bold text-brand-900 text-lg">{ing?.name}</p>
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">{item.amount}g</span>
                                <span className="h-1 w-1 rounded-full bg-brand-200" />
                                <span className="text-xs font-bold text-brand-900 bg-brand-100 px-2 py-0.5 rounded-full">{((ing?.nutritionPer100g.calories || 0) * item.amount / 100).toFixed(0)} kcal</span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeIngredient(i)}
                            className="h-12 w-12 text-brand-200 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                          >
                            <Trash2 className="h-6 w-6" />
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-32 text-center border-2 border-dashed border-brand-100 rounded-[3rem] bg-brand-50/20">
                    <FlaskConical className="h-16 w-16 text-brand-200 mx-auto mb-6 animate-pulse" />
                    <p className="text-brand-400 font-bold text-lg italic">Laboratory database empty. <br />Please inject reagents to begin molecular analysis.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Molecular Structure Visualization (Simulated) */}
          <Card className="border-brand-200 shadow-premium rounded-[3rem] overflow-hidden bg-white">
            <CardHeader className="p-10 border-b border-brand-100">
              <CardTitle className="text-2xl font-serif font-bold text-brand-900">Molecular Structure Visualization</CardTitle>
              <CardDescription className="text-brand-500 font-medium">Simulated representation of the recipe's chemical stability.</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <div className="h-96 w-full bg-brand-900 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
                
                {/* Decorative Atoms */}
                <AnimatePresence>
                  {recipeIngredients.length > 0 ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {recipeIngredients.map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: 1,
                            x: Math.sin(i + Date.now() / 2000) * 120,
                            y: Math.cos(i + Date.now() / 2000) * 120
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }}
                          className="absolute h-14 w-14 rounded-full bg-brand-400/30 border-2 border-brand-300 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(212,163,115,0.4)]"
                        >
                          <div className="h-5 w-5 rounded-full bg-white animate-pulse" />
                        </motion.div>
                      ))}
                      
                      {/* Connecting Lines (Simulated) */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        {recipeIngredients.length > 1 && recipeIngredients.map((_, i) => {
                          if (i === 0) return null;
                          return (
                            <line 
                              key={i}
                              x1="50%" y1="50%" 
                              x2={`${50 + Math.sin(i) * 30}%`} 
                              y2={`${50 + Math.cos(i) * 30}%`} 
                              stroke="white" 
                              strokeWidth="1" 
                            />
                          );
                        })}
                      </svg>

                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="h-64 w-64 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center"
                      >
                        <div className="h-48 w-48 border-2 border-dashed border-white/20 rounded-full" />
                      </motion.div>
                      
                      <div className="absolute text-center space-y-2 bg-brand-900/80 backdrop-blur-xl p-8 rounded-full border border-white/10 shadow-2xl">
                        <p className="text-4xl font-serif font-bold text-white tracking-widest">STABLE</p>
                        <p className="text-[10px] font-bold text-brand-300 uppercase tracking-[0.3em]">Molecular Integrity</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <FlaskConical className="h-12 w-12 text-white/20 mx-auto" />
                      <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Waiting for data injection...</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          {/* Lab Notes */}
          <Card className="border-brand-200 shadow-premium rounded-[3rem] overflow-hidden bg-white">
            <CardHeader className="p-10 border-b border-brand-100">
              <div className="flex items-center gap-4">
                <FileText className="h-6 w-6 text-brand-400" />
                <CardTitle className="text-2xl font-serif font-bold text-brand-900">Clinical Lab Notes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10">
              <Textarea 
                placeholder="Document clinical observations, stability tests, and formulation adjustments..." 
                value={labNotes}
                onChange={(e) => setLabNotes(e.target.value)}
                className="min-h-[200px] rounded-[2rem] border-brand-200 bg-brand-50/30 p-8 font-medium text-brand-800 focus:ring-brand-400"
              />
            </CardContent>
          </Card>
        </div>

        {/* Nutrition Analysis Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-brand-200 shadow-premium rounded-[2rem] md:rounded-[3rem] sticky top-8 overflow-hidden bg-white">
            <CardHeader className="bg-brand-900 text-brand-50 p-6 md:p-10">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-serif font-bold">Lab Analysis</CardTitle>
                  <CardDescription className="text-brand-300 font-medium">Real-time clinical breakdown</CardDescription>
                </div>
                <Badge className="bg-brand-400 text-brand-900 font-bold px-3 py-1">v4.2.0</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-10 space-y-8 md:space-y-10">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { label: 'Calories', val: totals.calories.toFixed(0), unit: 'kcal', trad: traditionalTotals.calories.toFixed(0), color: 'text-brand-900' },
                  { label: 'Protein', val: totals.protein.toFixed(1), unit: 'g', trad: traditionalTotals.protein.toFixed(1), color: 'text-blue-600' },
                  { label: 'Sugar', val: totals.sugar.toFixed(1), unit: 'g', trad: traditionalTotals.sugar.toFixed(1), color: 'text-red-500' },
                  { label: 'Fat', val: totals.fat.toFixed(1), unit: 'g', trad: traditionalTotals.fat.toFixed(1), color: 'text-orange-500' },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-brand-50/50 border border-brand-100 space-y-2 relative overflow-hidden group hover:bg-white hover:shadow-soft transition-all">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-400 font-bold">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className={cn("text-4xl font-serif font-bold", stat.color)}>{stat.val}</p>
                      <p className="text-xs text-brand-500 font-bold uppercase tracking-widest">{stat.unit}</p>
                    </div>
                    {showComparison && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-4 mt-4 border-t border-brand-200"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[10px] text-brand-400 font-bold uppercase tracking-widest">Traditional Benchmark</p>
                          <p className="text-sm font-bold text-red-400">{stat.trad} {stat.unit}</p>
                        </div>
                        <div className="h-2 w-full bg-brand-200 rounded-full overflow-hidden relative">
                          <div className="h-full bg-red-400 opacity-20" style={{ width: '100%' }} />
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (parseFloat(stat.val) / parseFloat(stat.trad)) * 100)}%` }}
                            className="h-full bg-brand-900 absolute top-0 left-0" 
                          />
                        </div>
                        <p className="text-[10px] text-brand-50 mt-2 font-bold uppercase tracking-widest">
                          {Math.round((1 - parseFloat(stat.val) / parseFloat(stat.trad)) * 100)}% Reduction
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Substitution Suggestions */}
              {substitutions.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-400 ml-1">Optimization Suggestions</h4>
                  <div className="space-y-4">
                    {substitutions.map((sub, i) => (
                      <div key={i} className="p-5 rounded-3xl bg-brand-50 border border-brand-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-3 w-3 text-brand-400" />
                            <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Substitution</span>
                          </div>
                          <Badge className="bg-brand-900 text-brand-50 text-[10px] font-bold px-2 py-0.5">{sub.impact}</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-red-400 line-through">{sub.from}</span>
                          <ChevronRight className="h-4 w-4 text-brand-300" />
                          <span className="text-sm font-bold text-green-600">{sub.to}</span>
                        </div>
                        <p className="text-xs text-brand-500 font-medium italic">{sub.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator className="bg-brand-100" />

              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-400 ml-1">Clinical Classification</h4>
                <div className="flex flex-wrap gap-3">
                  {healthTags.length > 0 ? (
                    healthTags.map((tag, i) => (
                      <Badge key={i} className={`${tag.color} border-none rounded-full px-5 py-2 text-[10px] font-bold shadow-sm uppercase tracking-widest`}>
                        <CheckCircle2 className="mr-2 h-3.5 w-3.5" /> {tag.label}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-xs text-brand-400 italic flex items-center gap-3 bg-brand-50 p-5 rounded-2xl w-full border border-brand-100">
                      <Info className="h-5 w-5 shrink-0" /> Awaiting ingredient injection for classification.
                    </p>
                  )}
                </div>
              </div>

              <div className={cn(
                "p-8 rounded-[2.5rem] border transition-all duration-700 space-y-4 shadow-sm",
                totals.sugar > 10 ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"
              )}>
                <div className={cn(
                  "flex items-center gap-3 font-bold text-sm uppercase tracking-widest",
                  totals.sugar > 10 ? "text-red-700" : "text-green-700"
                )}>
                  {totals.sugar > 10 ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                  <span>Clinical Summary</span>
                </div>
                <p className={cn(
                  "text-sm leading-relaxed font-medium italic",
                  totals.sugar > 10 ? "text-red-600" : "text-green-600"
                )}>
                  {recipeIngredients.length === 0 ? 
                    "Please formulate a recipe to receive a clinical summary." :
                    totals.sugar > 10 ? 
                    "CRITICAL: High glycemic load detected. This formulation exceeds the recommended sugar threshold for therapeutic confectionery. Substitution advised." : 
                    "OPTIMAL: This formulation maintains a superior glycemic profile. Suitable for diabetic-friendly therapeutic distribution."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
