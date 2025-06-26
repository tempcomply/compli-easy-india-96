import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Briefcase, FileText, Users, Building2, Eye, Scale, Shield, Receipt, Truck, Globe, Heart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';

type ServiceStatus = 'requested' | 'in_progress' | 'under_review' | 'completed' | 'cancelled';
type ServiceCategory = 'legal' | 'compliance' | 'licensing' | 'corporate' | 'tax' | 'intellectual_property' | 'employment' | 'permits';

interface Service {
  id: string;
  title: string;
  description: string;
  requestedDate: string;
  status: ServiceStatus;
  category: ServiceCategory;
  estimatedCost: string;
  estimatedDays: string;
}

const dummyServices: Service[] = [
  {
    id: '1',
    title: 'FSSAI License Application',
    description: 'Apply for Food Safety and Standards Authority license',
    requestedDate: '2024-01-10',
    status: 'in_progress',
    category: 'licensing',
    estimatedCost: '₹8,000',
    estimatedDays: '30-45 days',
  },
  {
    id: '2',
    title: 'GST Registration',
    description: 'Complete GST registration for new business entity',
    requestedDate: '2024-01-05',
    status: 'completed',
    category: 'tax',
    estimatedCost: '₹5,000',
    estimatedDays: '7-10 days',
  },
];

const availableServices = {
  'Legal Services': {
    icon: Scale,
    services: [
      { name: 'Legal Notice Drafting', description: 'Formal legal notices for business disputes', price: '₹3,000-5,000', days: '2-3 days' },
      { name: 'Contract Review & Analysis', description: 'Legal review of existing contracts', price: '₹3,000-6,000', days: '3-5 days' },
    ]
  },
  'Business Registration': {
    icon: Building2,
    services: [
      { name: 'Private Limited Company Registration', description: 'Complete incorporation of private limited company', price: '₹8,000-15,000', days: '15-20 days' },
      { name: 'LLP Registration', description: 'Limited Liability Partnership registration', price: '₹6,000-10,000', days: '10-15 days' },
      { name: 'Partnership Firm Registration', description: 'Traditional partnership firm registration', price: '₹3,000-5,000', days: '7-10 days' },
      { name: 'One Person Company (OPC)', description: 'Single member company registration', price: '₹7,000-12,000', days: '12-18 days' },
      { name: 'Section 8 Company Registration', description: 'Non-profit company registration', price: '₹10,000-20,000', days: '30-45 days' },
      { name: 'Producer Company Registration', description: 'Agricultural producer company setup', price: '₹15,000-25,000', days: '25-35 days' },
    ]
  },
  'Tax Services': {
    icon: Receipt,
    services: [
      { name: 'GST Registration', description: 'Goods and Services Tax registration', price: '₹2,000-5,000', days: '7-10 days' },
      { name: 'Income Tax Return Filing', description: 'Annual ITR filing for businesses', price: '₹3,000-8,000', days: '5-7 days' },
      { name: 'TDS Return Filing', description: 'Tax Deducted at Source return filing', price: '₹2,000-4,000', days: '3-5 days' },
      { name: 'GST Return Filing', description: 'Monthly/Quarterly GST return filing', price: '₹1,500-3,000', days: '2-3 days' },
      { name: 'Tax Audit', description: 'Statutory tax audit for businesses', price: '₹15,000-30,000', days: '20-30 days' },
      { name: 'Transfer Pricing Documentation', description: 'TP documentation for multinational transactions', price: '₹25,000-50,000', days: '30-45 days' },
    ]
  },
  'Licensing & Permits': {
    icon: Shield,
    services: [
      { name: 'FSSAI License', description: 'Food Safety and Standards Authority license', price: '₹5,000-15,000', days: '30-45 days' },
      { name: 'BIS Certification', description: 'Bureau of Indian Standards certification', price: '₹10,000-25,000', days: '45-60 days' },
      { name: 'ISO Certification', description: 'International Organization for Standardization', price: '₹25,000-50,000', days: '60-90 days' },
      { name: 'Drug License', description: 'Pharmaceutical business license', price: '₹8,000-20,000', days: '30-45 days' },
      { name: 'Import Export Code (IEC)', description: 'Import Export business license', price: '₹3,000-5,000', days: '7-10 days' },
      { name: 'Factory License', description: 'Manufacturing facility license', price: '₹10,000-20,000', days: '45-60 days' },
      { name: 'Trade License', description: 'Local municipal trade license', price: '₹2,000-8,000', days: '15-30 days' },
      { name: 'Pollution Control Board', description: 'Environmental clearance and NOC', price: '₹15,000-30,000', days: '60-90 days' },
    ]
  },
  'Intellectual Property': {
    icon: FileText,
    services: [
      { name: 'Trademark Registration', description: 'Brand name and logo trademark protection', price: '₹8,000-15,000', days: '12-18 months' },
      { name: 'Patent Filing', description: 'Invention and innovation patent application', price: '₹15,000-30,000', days: '18-24 months' },
      { name: 'Copyright Registration', description: 'Creative work and content copyright', price: '₹5,000-10,000', days: '45-60 days' },
      { name: 'Design Registration', description: 'Industrial design protection', price: '₹8,000-12,000', days: '6-12 months' },
      { name: 'Trademark Search', description: 'Comprehensive trademark availability search', price: '₹2,000-3,000', days: '2-3 days' },
      { name: 'IP Portfolio Management', description: 'Complete intellectual property management', price: '₹20,000-40,000', days: 'Ongoing' },
    ]
  },
  'Compliance Services': {
    icon: Users,
    services: [
      { name: 'PF Registration', description: 'Provident Fund registration for employees', price: '₹3,000-5,000', days: '10-15 days' },
      { name: 'ESI Registration', description: 'Employee State Insurance registration', price: '₹3,000-5,000', days: '10-15 days' },
      { name: 'Professional Tax Registration', description: 'State-wise professional tax registration', price: '₹2,000-4,000', days: '7-10 days' },
      { name: 'Labour Law Compliance', description: 'Complete labour law compliance setup', price: '₹10,000-20,000', days: '20-30 days' },
      { name: 'MSME Registration', description: 'Micro, Small & Medium Enterprise registration', price: '₹2,000-3,000', days: '5-7 days' },
      { name: 'Startup India Registration', description: 'Government startup recognition certificate', price: '₹5,000-8,000', days: '15-20 days' },
    ]
  },
  'Corporate Services': {
    icon: Building2,
    services: [
      { name: 'Board Resolution Drafting', description: 'Corporate board resolutions for decisions', price: '₹2,000-3,000', days: '1-2 days' },
      { name: 'Share Transfer', description: 'Equity transfer and documentation', price: '₹5,000-8,000', days: '7-10 days' },
      { name: 'Director Appointment/Resignation', description: 'Change in company directors', price: '₹3,000-5,000', days: '5-7 days' },
      { name: 'Annual Compliance', description: 'Annual ROC filings and compliance', price: '₹8,000-15,000', days: '10-15 days' },
      { name: 'Name Change', description: 'Company name change process', price: '₹8,000-12,000', days: '30-45 days' },
      { name: 'Registered Office Change', description: 'Change of registered office address', price: '₹5,000-8,000', days: '15-20 days' },
    ]
  },
  'Digital Services': {
    icon: Globe,
    services: [
      { name: 'Digital Signature Certificate', description: 'Class 2 or Class 3 DSC for directors', price: '₹1,000-2,000', days: '1-2 days' },
      { name: 'Domain Registration', description: 'Business domain name registration', price: '₹500-2,000', days: '1 day' },
      { name: 'Website Development', description: 'Professional business website creation', price: '₹15,000-50,000', days: '15-30 days' },
      { name: 'E-commerce Setup', description: 'Online store setup and integration', price: '₹25,000-75,000', days: '20-40 days' },
      { name: 'Digital Marketing Setup', description: 'Social media and digital presence setup', price: '₹10,000-25,000', days: '10-15 days' },
    ]
  }
};

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>(dummyServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('requestedDate');
  const [isServicesDialogOpen, setIsServicesDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  const handleRequestService = (serviceName: string, category: string) => {
    const newService: Service = {
      id: Date.now().toString(),
      title: serviceName,
      description: `Professional ${serviceName.toLowerCase()} service`,
      requestedDate: new Date().toISOString().split('T')[0],
      status: 'requested',
      category: category.toLowerCase().replace(/\s+/g, '_') as ServiceCategory,
      estimatedCost: 'Quote pending',
      estimatedDays: 'TBD',
    };
    setServices([...services, newService]);
    setIsServicesDialogOpen(false);
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="h-8 w-8" />
              Business Services
            </h1>
            <p className="text-muted-foreground">
              Complete business services from registrations to compliance and legal support
            </p>
          </div>
        </div>

        <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Services</TabsTrigger>
            <TabsTrigger value="ongoing">My Services ({services.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(availableServices).map(([category, data]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <data.icon className="h-6 w-6" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {data.services.map((service, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">{service.name}</h4>
                              <p className="text-xs text-muted-foreground">{service.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="text-xs">
                                  <div className="font-medium text-primary">{service.price}</div>
                                  <div className="text-muted-foreground">{service.days}</div>
                                </div>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleRequestService(service.name, category)}
                                >
                                  Request
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ongoing" className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="requestedDate">Requested Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold">No services requested yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse our services to get started with your business needs.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setActiveTab('browse')}>
                    Browse Services
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredServices.map((service) => (
                  <Card key={service.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span>Requested: {new Date(service.requestedDate).toLocaleDateString()}</span>
                          <span>Cost: {service.estimatedCost}</span>
                          <span>Timeline: {service.estimatedDays}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
