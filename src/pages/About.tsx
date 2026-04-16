import { motion } from 'motion/react';
import { Heart, ShieldCheck, Leaf, FlaskConical, Users, Award, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function About() {
  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="relative bg-brand-900 py-48 text-brand-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-400 blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-300 blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 text-center space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-300 font-bold">Our Genesis</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight">
              A Laboratory of <br />
              <span className="text-brand-300 italic font-light">Culinary Healing</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-brand-100/80 leading-relaxed font-medium"
          >
            NutriBake was born from a singular vision: that clinical nutrition and artisanal mastery should not be mutually exclusive, but rather, synergistic.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 md:px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'The Mission', desc: 'To engineer high-performance, therapeutic confectionery that empowers individuals to meet clinical health goals without sacrificing the joy of taste.', icon: Heart },
            { title: 'The Vision', desc: 'Redefining the global standard for functional food, where every ingredient is chosen for its molecular impact and artisanal potential.', icon: Leaf },
            { title: 'The Values', desc: 'Uncompromising scientific integrity, radical transparency in sourcing, and a relentless pursuit of culinary perfection.', icon: ShieldCheck },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
            >
              <Card className="border-brand-200 shadow-premium rounded-[2.5rem] p-10 bg-white h-full flex flex-col group hover:border-brand-400 transition-all">
                <div className="h-16 w-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-700 mb-8 group-hover:bg-brand-900 group-hover:text-brand-50 transition-all">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-brand-900 mb-4">{item.title}</h3>
                <p className="text-brand-600 leading-relaxed text-lg font-medium">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto px-4 md:px-6 py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-bold">The Methodology</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-900 leading-tight">
                Where Science <br />
                <span className="text-brand-500 italic font-light">Meets the Oven</span>
              </h2>
            </div>
            <p className="text-xl text-brand-600 leading-relaxed font-medium">
              Our process is rigorous, transparent, and driven by data. We don't just bake; we formulate. Every recipe undergoes a multi-stage clinical analysis before it reaches your hands.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { title: 'Clinical Testing', desc: 'Rigorous analysis of glycemic impact and nutrient density.', icon: FlaskConical },
                { title: 'Expert Team', desc: 'Collaboration between PhD nutritionists and Michelin-star chefs.', icon: Users },
                { title: 'Certified Quality', desc: 'Adhering to the highest standards of food safety and health.', icon: Award },
                { title: 'Patient First', desc: 'Feedback-driven development to meet real-world health needs.', icon: Heart },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 group-hover:bg-brand-900 group-hover:text-brand-50 transition-all">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-brand-900 text-lg">{item.title}</h4>
                    <p className="text-sm text-brand-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-100 rounded-[4rem] -z-10 transition-transform group-hover:scale-105" />
            <img 
              src="https://picsum.photos/seed/about-lab/1000/1200" 
              alt="Our Laboratory" 
              className="rounded-[3.5rem] shadow-premium w-full object-cover aspect-[4/5]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-10 right-10 glass p-8 rounded-3xl shadow-premium max-w-xs space-y-3">
              <p className="text-sm font-bold text-brand-900 leading-relaxed italic">
                "We are not just making sweets; we are engineering wellness, one molecule at a time."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-200" />
                <div>
                  <p className="text-xs font-bold text-brand-900">Dr. Sarah Chen</p>
                  <p className="text-[10px] text-brand-500 uppercase font-bold">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
