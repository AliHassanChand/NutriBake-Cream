import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Calculator, 
  FlaskConical, 
  Save,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ingredients as mockIngredients } from '@/data/mockData';

interface RecipeIngredient {
  ingredientId: string;
  amount: number; // in grams
}

export default function NutritionLab() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [amount, setAmount] = useState('');

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

  const healthTags = useMemo(() => {
    const tags = [];
    if (totals.sugar < 5 && recipeIngredients.length > 0) tags.push({ label: 'Diabetic Friendly', color: 'bg-green-100 text-green-700' });
    if (totals.protein > 15) tags.push({ label: 'High Protein', color: 'bg-blue-100 text-blue-700' });
    if (totals.calories < 200 && recipeIngredients.length > 0) tags.push({ label: 'Low Calorie', color: 'bg-yellow-100 text-yellow-700' });
    return tags;
  }, [totals, recipeIngredients]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-900">Nutrition Lab</h1>
          <p className="text-brand-600">Design and analyze therapeutic recipes with clinical precision.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-brand-200 text-brand-700">
            <Calculator className="mr-2 h-4 w-4" /> Reset Lab
          </Button>
          <Button className="bg-brand-700 hover:bg-brand-800 text-brand-50 rounded-xl">
            <Save className="mr-2 h-4 w-4" /> Save Recipe
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipe Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-brand-200 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-serif font-bold text-brand-900">Recipe Builder</CardTitle>
              <CardDescription>Add ingredients and specify quantities to calculate nutritional impact.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipe-name" className="text-brand-700 font-bold">Recipe Name</Label>
                <Input 
                  id="recipe-name" 
                  placeholder="e.g. Therapeutic Almond Delight" 
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="rounded-xl border-brand-200 focus:ring-brand-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-brand-50 border border-brand-100">
                <div className="md:col-span-1 space-y-2">
                  <Label className="text-brand-700 font-bold">Ingredient</Label>
                  <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                    <SelectTrigger className="rounded-xl border-brand-200 bg-white">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockIngredients.map(ing => (
                        <SelectItem key={ing.id} value={ing.id}>{ing.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-brand-700 font-bold">Amount (g)</Label>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="rounded-xl border-brand-200 bg-white"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addIngredient} className="w-full bg-brand-900 text-brand-50 hover:bg-brand-800 rounded-xl h-10">
                    <Plus className="mr-2 h-4 w-4" /> Add to Recipe
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-brand-400">Current Ingredients</h4>
                {recipeIngredients.length > 0 ? (
                  <div className="space-y-3">
                    {recipeIngredients.map((item, i) => {
                      const ing = mockIngredients.find(ing => ing.id === item.ingredientId);
                      return (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-4 rounded-xl border border-brand-100 bg-white hover:border-brand-200 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                              <FlaskConical className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-bold text-brand-900">{ing?.name}</p>
                              <p className="text-xs text-brand-500">{item.amount}g • {((ing?.nutritionPer100g.calories || 0) * item.amount / 100).toFixed(0)} kcal</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeIngredient(i)}
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-brand-200 rounded-2xl">
                    <p className="text-brand-400 italic">No ingredients added yet. Start building your recipe above.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nutrition Analysis */}
        <div className="space-y-6">
          <Card className="border-brand-200 shadow-sm rounded-2xl sticky top-8">
            <CardHeader>
              <CardTitle className="text-xl font-serif font-bold text-brand-900">Analysis</CardTitle>
              <CardDescription>Real-time nutritional breakdown of your recipe.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-brand-900 text-brand-50 text-center">
                  <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Calories</p>
                  <p className="text-3xl font-serif font-bold">{totals.calories.toFixed(0)}</p>
                  <p className="text-[10px] opacity-60">kcal</p>
                </div>
                <div className="p-4 rounded-2xl bg-brand-100 text-brand-900 text-center">
                  <p className="text-xs uppercase tracking-widest text-brand-500 mb-1">Protein</p>
                  <p className="text-3xl font-serif font-bold">{totals.protein.toFixed(1)}</p>
                  <p className="text-[10px] text-brand-500">grams</p>
                </div>
                <div className="p-4 rounded-2xl bg-brand-100 text-brand-900 text-center">
                  <p className="text-xs uppercase tracking-widest text-brand-500 mb-1">Sugar</p>
                  <p className="text-3xl font-serif font-bold">{totals.sugar.toFixed(1)}</p>
                  <p className="text-[10px] text-brand-500">grams</p>
                </div>
                <div className="p-4 rounded-2xl bg-brand-100 text-brand-900 text-center">
                  <p className="text-xs uppercase tracking-widest text-brand-500 mb-1">Fat</p>
                  <p className="text-3xl font-serif font-bold">{totals.fat.toFixed(1)}</p>
                  <p className="text-[10px] text-brand-500">grams</p>
                </div>
              </div>

              <Separator className="bg-brand-200" />

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-brand-400">Health Classification</h4>
                <div className="flex flex-wrap gap-2">
                  {healthTags.length > 0 ? (
                    healthTags.map((tag, i) => (
                      <Badge key={i} className={`${tag.color} border-none rounded-full px-3 py-1 text-xs font-bold`}>
                        <CheckCircle2 className="mr-1 h-3 w-3" /> {tag.label}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-xs text-brand-400 italic flex items-center gap-2">
                      <Info className="h-3 w-3" /> Add ingredients to see classification.
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 space-y-3">
                <div className="flex items-center gap-2 text-brand-700 font-bold text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Lab Notes</span>
                </div>
                <p className="text-xs text-brand-600 leading-relaxed">
                  {totals.sugar > 10 ? 
                    "Warning: High sugar content detected. This recipe may not be suitable for diabetic patients." : 
                    "This recipe maintains a healthy glycemic profile based on current ingredient ratios."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
