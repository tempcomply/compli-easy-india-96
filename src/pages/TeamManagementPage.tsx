
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Filter, Mail, Phone, Edit, Trash2, UserCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CA' | 'CS' | 'Lawyer' | 'Compliance Manager' | 'Junior Associate' | 'Senior Associate';
  specialization: string[];
  status: 'active' | 'inactive';
  joinedDate: string;
  clientsAssigned: number;
  avatar?: string;
}

const dummyTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Arjun Patel',
    email: 'arjun@example.com',
    phone: '+91 98765 43210',
    role: 'CA',
    specialization: ['GST', 'Income Tax', 'Audit'],
    status: 'active',
    joinedDate: '2023-01-15',
    clientsAssigned: 25,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 87654 32109',
    role: 'CS',
    specialization: ['Corporate Law', 'Compliance', 'ROC Filings'],
    status: 'active',
    joinedDate: '2023-03-20',
    clientsAssigned: 18,
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 76543 21098',
    role: 'Lawyer',
    specialization: ['Contract Law', 'Intellectual Property', 'Dispute Resolution'],
    status: 'active',
    joinedDate: '2022-11-10',
    clientsAssigned: 12,
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    email: 'sneha@example.com',
    phone: '+91 65432 10987',
    role: 'Compliance Manager',
    specialization: ['Regulatory Compliance', 'Risk Management', 'Policy Development'],
    status: 'active',
    joinedDate: '2023-02-01',
    clientsAssigned: 30,
  },
  {
    id: '5',
    name: 'Amit Singh',
    email: 'amit@example.com',
    phone: '+91 54321 09876',
    role: 'Junior Associate',
    specialization: ['Data Entry', 'Document Preparation'],
    status: 'inactive',
    joinedDate: '2023-06-15',
    clientsAssigned: 8,
  },
];

const TeamManagementPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(dummyTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddMember = handleSubmit((data) => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      specialization: data.specialization ? data.specialization.split(',').map((s: string) => s.trim()) : [],
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      clientsAssigned: 0,
    };
    setTeamMembers([...teamMembers, newMember]);
    setIsAddMemberDialogOpen(false);
    reset();
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'CA': return 'bg-blue-100 text-blue-800';
      case 'CS': return 'bg-green-100 text-green-800';
      case 'Lawyer': return 'bg-purple-100 text-purple-800';
      case 'Compliance Manager': return 'bg-orange-100 text-orange-800';
      case 'Senior Associate': return 'bg-indigo-100 text-indigo-800';
      case 'Junior Associate': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Users className="h-8 w-8" />
              Team Management
            </h1>
            <p className="text-muted-foreground">
              Manage your professional team with roles and hierarchy for compliance support
            </p>
          </div>
          <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Team Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    {...register('name', { required: true })}
                    placeholder="Enter full name"
                  />
                  {errors.name && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    {...register('email', { required: true })}
                    type="email"
                    placeholder="Enter email address"
                  />
                  {errors.email && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    {...register('phone', { required: true })}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Select {...register('role', { required: true })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">Chartered Accountant</SelectItem>
                      <SelectItem value="CS">Company Secretary</SelectItem>
                      <SelectItem value="Lawyer">Lawyer</SelectItem>
                      <SelectItem value="Compliance Manager">Compliance Manager</SelectItem>
                      <SelectItem value="Senior Associate">Senior Associate</SelectItem>
                      <SelectItem value="Junior Associate">Junior Associate</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialization (comma separated)</label>
                  <Input
                    {...register('specialization')}
                    placeholder="e.g., GST, Income Tax, Audit"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Member
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="CA">CA</SelectItem>
              <SelectItem value="CS">CS</SelectItem>
              <SelectItem value="Lawyer">Lawyer</SelectItem>
              <SelectItem value="Compliance Manager">Compliance Manager</SelectItem>
              <SelectItem value="Senior Associate">Senior Associate</SelectItem>
              <SelectItem value="Junior Associate">Junior Associate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-base">{member.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${getRoleColor(member.role)} text-xs`}>
                          {member.role}
                        </Badge>
                        <Badge className={`${getStatusColor(member.status)} text-xs`}>
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{member.clientsAssigned} clients assigned</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Specializations:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialization.map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                  <span>Joined: {new Date(member.joinedDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">No team members found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or add new team members.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TeamManagementPage;
