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
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-900">Staff Management</h1>
          <p className="text-brand-600">Manage your laboratory team and access permissions.</p>
        </div>
        <Button className="bg-brand-700 hover:bg-brand-800 text-brand-50 rounded-xl">
          <UserPlus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Staff', value: mockStaff.length, icon: Users, color: 'bg-brand-100 text-brand-700' },
          { label: 'Nutritionists', value: 1, icon: Shield, color: 'bg-green-100 text-green-700' },
          { label: 'Chefs', value: 1, icon: ChefHat, color: 'bg-orange-100 text-orange-700' },
          { label: 'Active Now', value: 3, icon: CheckCircle2, color: 'bg-blue-100 text-blue-700' },
        ].map((stat, i) => (
          <Card key={i} className="border-brand-200 shadow-sm rounded-2xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-brand-500">{stat.label}</p>
                <p className="text-2xl font-serif font-bold text-brand-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Staff Table */}
      <Card className="border-brand-200 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-brand-100 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl font-serif font-bold text-brand-900">Team Directory</CardTitle>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-400" />
                <Input 
                  placeholder="Search team..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-brand-200"
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-xl border-brand-200 text-brand-600">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-brand-50">
              <TableRow className="hover:bg-transparent border-brand-100">
                <TableHead className="w-[300px] text-brand-700 font-bold">Name</TableHead>
                <TableHead className="text-brand-700 font-bold">Role</TableHead>
                <TableHead className="text-brand-700 font-bold">Email</TableHead>
                <TableHead className="text-brand-700 font-bold">Status</TableHead>
                <TableHead className="text-right text-brand-700 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((person) => (
                <TableRow key={person.id} className="hover:bg-brand-50/50 border-brand-100 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-brand-900">{person.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-none",
                      roleColors[person.role as keyof typeof roleColors]
                    )}>
                      {person.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-brand-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 opacity-40" />
                      {person.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm text-brand-700 capitalize">{person.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-full text-brand-400 hover:text-brand-900 hover:bg-brand-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
