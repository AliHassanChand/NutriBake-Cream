import { motion } from 'motion/react';
import { Heart, ShieldCheck, Leaf, FlaskConical, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="bg-brand-900 py-32 text-brand-50">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold"
          >
            Our Story: <span className="text-brand-300 italic">Healing</span> Through Taste
          </motion.h1>
          <p className="max-w-2xl mx-auto text-xl text-brand-300 leading-relaxed">
            Founded at the intersection of clinical nutrition and artisanal baking, NutriBake is dedicated to proving that therapeutic diets can be a source of joy.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 md:px-6 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'The Mission', desc: 'To provide high-quality, therapeutic confectionery that supports specific health goals without compromising on flavor.', icon: Heart },
            { title: 'The Vision', desc: 'A world where dietary restrictions are no longer a barrier to enjoying the finest culinary experiences.', icon: Leaf },
            { title: 'The Values', desc: 'Scientific integrity, artisanal craftsmanship, and a deep commitment to patient well-being.', icon: ShieldCheck },
          ].map((item, i) => (
            <Card key={i} className="border-brand-200 shadow-xl rounded-3xl p-8 bg-white">
              <div className="h-14 w-14 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-700 mb-6">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-900 mb-4">{item.title}</h3>
              <p className="text-brand-600 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Team / Process */}
      <section className="container mx-auto px-4 md:px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-900">The Laboratory Process</h2>
            <p className="text-lg text-brand-600 leading-relaxed">
              Every NutriBake product begins in our laboratory. We analyze the molecular composition of ingredients to ensure they align with therapeutic guidelines.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <FlaskConical className="h-8 w-8 text-brand-500" />
                <h4 className="font-bold text-brand-900">Clinical Testing</h4>
                <p className="text-sm text-brand-500">Rigorous analysis of glycemic impact and nutrient density.</p>
              </div>
              <div className="space-y-2">
                <Users className="h-8 w-8 text-brand-500" />
                <h4 className="font-bold text-brand-900">Expert Team</h4>
                <p className="text-sm text-brand-500">Collaboration between PhD nutritionists and Michelin-star chefs.</p>
              </div>
              <div className="space-y-2">
                <Award className="h-8 w-8 text-brand-500" />
                <h4 className="font-bold text-brand-900">Certified Quality</h4>
                <p className="text-sm text-brand-500">Adhering to the highest standards of food safety and health.</p>
              </div>
              <div className="space-y-2">
                <Heart className="h-8 w-8 text-brand-500" />
                <h4 className="font-bold text-brand-900">Patient First</h4>
                <p className="text-sm text-brand-500">Feedback-driven development to meet real-world health needs.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/team/800/1000" 
              alt="Our Team" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

import { Card } from '@/components/ui/card';
