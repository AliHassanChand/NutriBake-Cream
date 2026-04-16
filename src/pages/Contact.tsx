import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  return (
    <div className="pb-32">
      <div className="relative bg-brand-50 py-32 overflow-hidden border-b border-brand-100">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-200 blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-500 font-bold">Connect With Us</span>
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-brand-900 leading-tight">
              Get in <span className="text-brand-500 italic font-light">Touch</span>
            </h1>
          </motion.div>
          <p className="text-xl text-brand-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Whether you have questions about our therapeutic formulations or need a custom clinical nutrition plan, our expert team is ready to assist.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { title: 'Electronic Mail', value: 'lab@nutribake.com', icon: Mail, desc: 'For clinical inquiries and support.' },
              { title: 'Direct Line', value: '+1 (555) 123-4567', icon: Phone, desc: 'Available Mon-Fri, 9am - 6pm EST.' },
              { title: 'Laboratory HQ', value: '123 Nutrition Way, Lab City', icon: MapPin, desc: 'Our primary research and production facility.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Card className="border-brand-200 shadow-soft rounded-[2rem] p-8 bg-white group hover:border-brand-400 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-700 group-hover:bg-brand-900 group-hover:text-brand-50 transition-all">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-brand-400">{item.title}</h3>
                      <p className="text-xl font-serif font-bold text-brand-900">{item.value}</p>
                      <p className="text-sm text-brand-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-brand-200 shadow-premium rounded-[3rem] p-12 bg-white">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="first-name" className="text-xs font-bold uppercase tracking-widest text-brand-400 ml-1">First Name</Label>
                      <Input id="first-name" placeholder="John" className="h-14 rounded-2xl border-brand-200 bg-brand-50/30 focus:bg-white transition-all px-6 font-medium" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="last-name" className="text-xs font-bold uppercase tracking-widest text-brand-400 ml-1">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" className="h-14 rounded-2xl border-brand-200 bg-brand-50/30 focus:bg-white transition-all px-6 font-medium" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-brand-400 ml-1">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="h-14 rounded-2xl border-brand-200 bg-brand-50/30 focus:bg-white transition-all px-6 font-medium" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-brand-400 ml-1">Inquiry Subject</Label>
                    <Input id="subject" placeholder="How can we assist your health journey?" className="h-14 rounded-2xl border-brand-200 bg-brand-50/30 focus:bg-white transition-all px-6 font-medium" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-brand-400 ml-1">Detailed Message</Label>
                    <Textarea id="message" placeholder="Describe your requirements or questions in detail..." className="rounded-2xl border-brand-200 bg-brand-50/30 focus:bg-white transition-all p-6 font-medium min-h-[200px]" />
                  </div>
                  <Button className="w-full h-16 bg-brand-900 text-brand-50 hover:bg-brand-800 rounded-[1.5rem] text-xl font-bold shadow-premium transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <Send className="mr-3 h-6 w-6" /> Dispatch Inquiry
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
