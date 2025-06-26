
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, Mail, Phone, UserCheck, UserX } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'CA' | 'CS' | 'Lawyer' | 'Compliance Manager' | 'Junior Associate';
  status: 'active' | 'inactive';
  phone: string;
  specializations: string[];
  clientsAssigned: number;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'CA Sharma',
    email: 'ca.sharma@firm.com',
    role: 'CA',
    status: 'active',
    phone: '+91 98765 43210',
    specializations: ['GST', 'Income Tax', 'Audit'],
    clientsAssigned: 15
  },
  {
    id: '2',
    name: 'CS Priya',
    email: 'cs.priya@firm.com',
    role: 'CS',
    status: 'active',
    phone: '+91 98765 43211',
    specializations: ['Company Law', 'Corporate Compliance'],
    clientsAssigned: 8
  },
  {
    id: '3',
    name: 'Advocate Kumar',
    email: 'adv.kumar@firm.com',
    role: 'Lawyer',
    status: 'active',
    phone: '+91 98765 43212',
    specializations: ['Corporate Law', 'Contracts', 'Litigation'],
    clientsAssigned: 12
  },
  {
    id: '4',
    name: 'Compliance Manager',
    email: 'compliance@firm.com',
    role: 'Compliance Manager',
    status: 'active',
    phone: '+91 98765 43213',
    specializations: ['Regulatory Compliance', 'Risk Management'],
    clientsAssigned: 25
  }
];

const TeamManagementPage = () => {
  const [members] = useState<TeamMember[]>(teamMembers);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'CA': return 'bg-blue-100 text-blue-800';
      case 'CS': return 'bg-green-100 text-green-800';
      case 'Lawyer': return 'bg-purple-100 text-purple-800';
      case 'Compliance Manager': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Users className="h-8 w-8" />
              Team Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your professional team and their client assignments.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card key={member.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge className={`text-xs ${getRoleColor(member.role)}`}>
                      {member.role}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    {member.status === 'active' ? (
                      <UserCheck className="h-5 w-5 text-green-500" />
                    ) : (
                      <UserX className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {member.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {member.phone}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Specializations:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">{member.clientsAssigned}</span> clients assigned
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Hierarchy & Roles</CardTitle>
            <CardDescription>
              Manage roles and permissions for your team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Senior Professionals</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Can manage all client accounts</li>
                    <li>• Full access to compliance tools</li>
                    <li>• Can assign tasks to junior staff</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Junior Associates</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Limited client access (assigned only)</li>
                    <li>• Basic compliance tools access</li>
                    <li>• Require approval for major actions</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TeamManagementPage;
