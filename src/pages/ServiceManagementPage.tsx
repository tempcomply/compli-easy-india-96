
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Plus, Search, Edit, Trash2, Eye, DollarSign, Clock, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  status: 'active' | 'inactive';
  clientsUsed: number;
  lastUpdated: string;
}

const dummyServices: Service[] = [
  {
    id: '1',
    name: 'GST Registration',
    category: 'Tax Services',
    description: 'Complete GST registration process for new businesses',
    price: '₹2,000 - ₹5,000',
    duration: '7-10 days',
    status: 'active',
    clientsUsed: 45,
    lastUpdated: '2024-03-15',
  },
  {
    id: '2',
    name: 'Private Limited Company Registration',
    category: 'Business Registration',
    description: 'Complete incorporation of private limited company with all documentation',
    price: '₹8,000 - ₹15,000',
    duration: '15-20 days',
    status: 'active',
    clientsUsed: 32,
    lastUpdated: '2024-03-10',
  },
  {
    id: '3',
    name: 'Income Tax Return Filing',
    category: 'Tax Services',
    description: 'Annual ITR filing for individuals and businesses',
    price: '₹3,000 - ₹8,000',
    duration: '5-7 days',
    status: 'active',
    clientsUsed: 78,
    lastUpdated: '2024-03-20',
  },
  {
    id: '4',
    name: 'Trademark Registration',
    category: 'Intellectual Property',
    description: 'Brand name and logo trademark protection process',
    price: '₹8,000 - ₹15,000',
    duration: '12-18 months',
    status: 'active',
    clientsUsed: 23,
    lastUpdated: '2024-02-28',
  },
  {
    id: '5',
    name: 'FSSAI License',
    category: 'Licensing & Permits',
    description: 'Food Safety and Standards Authority license application',
    price: '₹5,000 - ₹15,000',
    duration: '30-45 days',
    status: 'inactive',
    clientsUsed: 12,
    lastUpdated: '2024-01-15',
  },
];

const serviceCategories = [
  'Tax Services',
  'Business Registration',
  'Licensing & Permits',
  'Intellectual Property',
  'Legal Services',
  'Compliance Services',
  'Corporate Services',
];

const ServiceManagementPage = () => {
  const [services, setServices] = useState<Service[]>(dummyServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddService = handleSubmit((data) => {
    const newService: Service = {
      id: Date.now().toString(),
      name: data.name,
      category: data.category,
      description: data.description,
      price: data.price,
      duration: data.duration,
      status: 'active',
      clientsUsed: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setServices([...services, newService]);
    setIsAddServiceDialogOpen(false);
    reset();
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Tax Services': 'bg-blue-100 text-blue-800',
      'Business Registration': 'bg-green-100 text-green-800',
      'Licensing & Permits': 'bg-purple-100 text-purple-800',
      'Intellectual Property': 'bg-orange-100 text-orange-800',
      'Legal Services': 'bg-red-100 text-red-800',
      'Compliance Services': 'bg-indigo-100 text-indigo-800',
      'Corporate Services': 'bg-pink-100 text-pink-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
              <Briefcase className="h-8 w-8" />
              Service Management
            </h1>
            <p className="text-muted-foreground">
              Manage the services you provide to clients with pricing and timelines
            </p>
          </div>
          <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Name</label>
                  <Input
                    {...register('name', { required: true })}
                    placeholder="Enter service name"
                  />
                  {errors.name && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select {...register('category', { required: true })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    {...register('description', { required: true })}
                    placeholder="Describe the service"
                    rows={3}
                  />
                  {errors.description && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <Input
                    {...register('price', { required: true })}
                    placeholder="e.g., ₹5,000 - ₹10,000"
                  />
                  {errors.price && <span className="text-xs text-red-500">Required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Input
                    {...register('duration', { required: true })}
                    placeholder="e.g., 7-10 days"
                  />
                  {errors.duration && <span className="text-xs text-red-500">Required</span>}
                </div>
                <Button type="submit" className="w-full">
                  Add Service
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

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
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {serviceCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{service.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getCategoryColor(service.category)} text-xs`}>
                        {service.category}
                      </Badge>
                      <Badge className={`${getStatusColor(service.status)} text-xs`}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-sm font-medium">{service.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{service.duration}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Clients Served</p>
                    <p className="text-sm font-medium">{service.clientsUsed}</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                  <span>Updated: {new Date(service.lastUpdated).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">No services found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or add new services.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ServiceManagementPage;
