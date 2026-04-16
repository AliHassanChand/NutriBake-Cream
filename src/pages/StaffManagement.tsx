import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Shield, 
  MoreVertical,
  UserPlus,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { staff as mockStaff } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { ChefHat, CheckCircle2 } from 'lucide-react';

export default function StaffManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = mockStaff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleColors = {
    admin: 'bg-purple-100 text-purple-700',
    chef: 'bg-orange-100 text-orange-700',
    nutritionist: 'bg-green-100 text-green-700',
    staff: 'bg-blue-100 text-blue-700',
    researcher: 'bg-cyan-100 text-cyan-700',
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold text-brand-900">Team & Laboratory Staff</h1>
          <p className="text-brand-600 font-medium">Manage clinical nutritionists, artisanal chefs, and system administrators.</p>
        </div>
        <Button className="bg-brand-900 hover:bg-brand-800 text-brand-50 rounded-2xl h-12 px-8 shadow-premium transition-all hover:scale-105 active:scale-95">
          <UserPlus className="mr-2 h-5 w-5" /> Onboard Member
        </Button>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Personnel', value: mockStaff.length, icon: Users, color: 'bg-brand-100 text-brand-700', trend: '+2 this month' },
          { label: 'Nutritionists', value: 2, icon: Shield, color: 'bg-green-100 text-green-700', trend: 'Clinical Team' },
          { label: 'Pastry Chefs', value: 3, icon: ChefHat, color: 'bg-orange-100 text-orange-700', trend: 'Artisanal Team' },
          { label: 'Active Sessions', value: 5, icon: CheckCircle2, color: 'bg-blue-100 text-blue-700', trend: 'Real-time' },
        ].map((stat, i) => (
          <Card key={i} className="border-brand-200 shadow-soft rounded-[2rem] overflow-hidden group hover:border-brand-400 transition-all">
            <CardContent className="p-8 flex flex-col gap-4">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.color)}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-400">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-serif font-bold text-brand-900">{stat.value}</p>
                  <span className="text-[10px] font-bold text-brand-500">{stat.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Staff Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Card className="border-brand-200 shadow-premium rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="p-8 border-b border-brand-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-serif font-bold text-brand-900">Personnel Directory</CardTitle>
                  <p className="text-sm text-brand-500">Access control and role management for the NutriBake ecosystem.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-300" />
                    <Input 
                      placeholder="Search..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 rounded-2xl border-brand-200 bg-brand-50/30 focus:ring-brand-400 font-medium"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-brand-200 text-brand-600 hover:bg-brand-50">
                    <Filter className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-brand-50/50">
                  <TableRow className="hover:bg-transparent border-brand-100 h-16">
                    <TableHead className="pl-8 text-brand-700 font-bold uppercase tracking-widest text-[10px]">Member</TableHead>
                    <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Designation</TableHead>
                    <TableHead className="text-brand-700 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                    <TableHead className="pr-8 text-right text-brand-700 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((person) => (
                    <TableRow key={person.id} className="hover:bg-brand-50/30 border-brand-100 transition-colors h-20">
                      <TableCell className="pl-8">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-brand-900 text-brand-50 flex items-center justify-center text-lg font-bold shadow-sm">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-brand-900 text-base">{person.name}</span>
                            <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">ID: #STF-{person.id.padStart(3, '0')}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border-none shadow-sm",
                          roleColors[person.role as keyof typeof roleColors]
                        )}>
                          {person.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <div className={cn(
                            "h-2.5 w-2.5 rounded-full animate-pulse",
                            person.status === 'active' ? 'bg-green-500' : 'bg-brand-300'
                          )} />
                          <span className="text-sm font-bold text-brand-700 capitalize">{person.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="pr-8 text-right">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-brand-300 hover:text-brand-900 hover:bg-brand-100 transition-all">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Shift Schedule */}
          <Card className="border-brand-200 shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
            <CardHeader className="p-8 border-b border-brand-100">
              <CardTitle className="text-xl font-serif font-bold text-brand-900">Laboratory Shifts</CardTitle>
              <p className="text-xs text-brand-500 font-bold uppercase tracking-widest">Current Rotation</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {[
                { time: '06:00 - 14:00', label: 'Morning Batch', staff: 'Chef Marcus, Dr. Elena', color: 'bg-orange-50' },
                { time: '14:00 - 22:00', label: 'Afternoon Analysis', staff: 'Chef Sarah, Researcher Leo', color: 'bg-blue-50' },
                { time: '22:00 - 06:00', label: 'Night Sterilization', staff: 'Admin Alice', color: 'bg-purple-50' },
              ].map((shift, i) => (
                <div key={i} className={cn("p-5 rounded-3xl border border-brand-100 space-y-2", shift.color)}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-brand-900">{shift.label}</span>
                    <span className="text-[10px] font-bold text-brand-500 uppercase tracking-wider">{shift.time}</span>
                  </div>
                  <p className="text-xs text-brand-600 font-medium">{shift.staff}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full h-12 rounded-2xl border-brand-200 text-brand-900 font-bold">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-brand-900 bg-brand-900 text-brand-50 shadow-premium rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-serif font-bold">Team Performance</CardTitle>
              <p className="text-xs text-brand-300 font-bold uppercase tracking-widest">Monthly KPI</p>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-brand-300">Recipe Accuracy</span>
                  <span className="text-brand-50">98%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-400 w-[98%]" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-brand-300">Hygiene Standards</span>
                  <span className="text-brand-50">100%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 w-[100%]" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-brand-300">On-time Delivery</span>
                  <span className="text-brand-50">92%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-[92%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
