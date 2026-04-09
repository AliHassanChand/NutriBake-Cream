import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  return (
    <div className="pb-20">
      <div className="bg-brand-100 py-24 border-b border-brand-200">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
          <h1 className="text-5xl font-serif font-bold text-brand-900">Get in Touch</h1>
          <p className="text-xl text-brand-600 max-w-2xl mx-auto">
            Have questions about our therapeutic treats or need a custom nutrition plan? Our team is here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { title: 'Email Us', value: 'hello@nutribake.com', icon: Mail, desc: 'For general inquiries and support.' },
              { title: 'Call Us', value: '+1 (555) 123-4567', icon: Phone, desc: 'Mon-Fri from 9am to 6pm.' },
              { title: 'Visit Us', value: '123 Nutrition Way, Lab City', icon: MapPin, desc: 'Our main laboratory and bakery.' },
            ].map((item, i) => (
              <Card key={i} className="border-brand-200 shadow-sm rounded-2xl p-6 bg-white">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-900">{item.title}</h3>
                    <p className="text-brand-700 font-medium">{item.value}</p>
                    <p className="text-xs text-brand-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-brand-200 shadow-xl rounded-3xl p-8 bg-white">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" className="rounded-xl border-brand-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" className="rounded-xl border-brand-200" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl border-brand-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="rounded-xl border-brand-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more about your needs..." className="rounded-xl border-brand-200 min-h-[150px]" />
                </div>
                <Button className="w-full h-14 bg-brand-900 text-brand-50 hover:bg-brand-800 rounded-2xl text-lg font-bold">
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
