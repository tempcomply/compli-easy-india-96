
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Settings, Plus, FileText, Building2, Users, Calculator, Gavel, Shield } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  isActive: boolean;
  pricing: string;
  icon: React.ReactNode;
  clientsUsing: number;
}

const services: Service[] = [
  {
    id: '1',
    name: 'GST Compliance',
    category: 'Tax Services',
    description: 'Complete GST filing and compliance management',
    isActive: true,
    pricing: '₹5,000/month',
    icon: <FileText className="h-6 w-6" />,
    clientsUsing: 25
  },
  {
    id: '2',
    name: 'Company Registration',
    category: 'Legal Services',
    description: 'End-to-end company registration and incorporation',
    isActive: true,
    pricing: '₹15,000 one-time',
    icon: <Building2 className="h-6 w-6" />,
    clientsUsing: 12
  },
  {
    id: '3',
    name: 'Payroll Management',
    category: 'HR Services',
    description: 'Complete payroll processing and compliance',
    isActive: true,
    pricing: '₹2,000/employee/month',
    icon: <Users className="h-6 w-6" />,
    clientsUsing: 8
  },
  {
    id: '4',
    name: 'Income Tax Filing',
    category: 'Tax Services',
    description: 'Personal and business income tax return filing',
    isActive: true,
    pricing: '₹3,000/return',
    icon: <Calculator className="h-6 w-6" />,
    clientsUsing: 45
  },
  {
    id: '5',
    name: 'Legal Consultation',
    category: 'Legal Services',
    description: 'General legal advice and consultation',
    isActive: false,
    pricing: '₹2,000/hour',
    icon: <Gavel className="h-6 w-6" />,
    clientsUsing: 0
  },
  {
    id: '6',
    name: 'Compliance Audit',
    category: 'Audit Services',
    description: 'Regular compliance audits and risk assessment',
    isActive: true,
    pricing: '₹25,000/audit',
    icon: <Shield className="h-6 w-6" />,
    clientsUsing: 15
  }
];

const ServiceManagementPage = () => {
  const [serviceList, setServiceList] = useState<Service[]>(services);

  const toggleService = (serviceId: string) => {
    setServiceList(serviceList.map(service => 
      service.id === serviceId 
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tax Services': return 'bg-blue-100 text-blue-800';
      case 'Legal Services': return 'bg-purple-100 text-purple-800';
      case 'HR Services': return 'bg-green-100 text-green-800';
      case 'Audit Services': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Settings className="h-8 w-8" />
              Service Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage the services you provide to your clients.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceList.map((service) => (
            <Card key={service.id} className={`${service.isActive ? 'border-green-200' : 'border-gray-200'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-primary">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge className={`text-xs ${getCategoryColor(service.category)}`}>
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  <Switch 
                    checked={service.isActive}
                    onCheckedChange={() => toggleService(service.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div>
                      <p className="text-sm font-medium">{service.pricing}</p>
                      <p className="text-xs text-muted-foreground">
                        {service.clientsUsing} clients using
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${service.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Service Analytics</CardTitle>
              <CardDescription>Overview of your service performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Active Services</span>
                  <span className="font-medium">{serviceList.filter(s => s.isActive).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Clients Served</span>
                  <span className="font-medium">{serviceList.reduce((acc, s) => acc + s.clientsUsing, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Most Popular Service</span>
                  <span className="font-medium">Income Tax Filing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common service management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Update Service Pricing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Create Service Package
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Generate Service Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Manage Client Assignments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceManagementPage;
