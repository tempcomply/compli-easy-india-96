
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Calendar, ClipboardCheck, AlertTriangle, Clock, CheckCircle2, Building, Users, FileText, Shield } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import AddComplianceDialog from '@/components/compliances/AddComplianceDialog';
import FileComplianceDialog from '@/components/compliances/FileComplianceDialog';
import ComplianceFilters from '@/components/compliances/ComplianceFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ComplianceStatus = 'pending-review' | 'under-process' | 'completed' | 'overdue' | 'upcoming';
type CompliancePriority = 'low' | 'medium' | 'high' | 'urgent';

interface Compliance {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: ComplianceStatus;
  priority: CompliancePriority;
  category: string;
  frequency: 'one-time' | 'monthly' | 'quarterly' | 'annual';
  assignedTo?: string;
  documents?: string[];
  cost?: number;
  autoRenewal?: boolean;
}

const dummyCompliances: Compliance[] = [
  {
    id: '1',
    title: 'Annual Board Resolution',
    description: 'Annual board meeting and resolution documentation',
    dueDate: '2024-03-31',
    status: 'pending-review',
    priority: 'high',
    category: 'corporate',
    frequency: 'annual',
    assignedTo: 'Legal Team',
    cost: 15000,
    autoRenewal: true,
  },
  {
    id: '2',
    title: 'ROC Annual Filing',
    description: 'Annual filing with Registrar of Companies',
    dueDate: '2024-09-30',
    status: 'under-process',
    priority: 'urgent',
    category: 'regulatory',
    frequency: 'annual',
    assignedTo: 'CA Sharma',
    cost: 25000,
    autoRenewal: true,
  },
  {
    id: '3',
    title: 'GST Audit',
    description: 'Annual GST audit and compliance verification',
    dueDate: '2024-12-31',
    status: 'upcoming',
    priority: 'medium',
    category: 'tax',
    frequency: 'annual',
    assignedTo: 'Tax Consultant',
    cost: 35000,
    autoRenewal: false,
  },
  {
    id: '4',
    title: 'ESI Registration Renewal',
    description: 'Employee State Insurance registration renewal',
    dueDate: '2024-02-28',
    status: 'overdue',
    priority: 'urgent',
    category: 'labor',
    frequency: 'annual',
    assignedTo: 'HR Team',
    cost: 5000,
    autoRenewal: true,
  },
  {
    id: '5',
    title: 'Environmental Clearance',
    description: 'Annual environmental compliance clearance',
    dueDate: '2024-06-30',
    status: 'completed',
    priority: 'high',
    category: 'environmental',
    frequency: 'annual',
    assignedTo: 'Compliance Officer',
    cost: 45000,
    autoRenewal: true,
  },
  {
    id: '6',
    title: 'Digital Signature Renewal',
    description: 'Director digital signature certificate renewal',
    dueDate: '2024-04-15',
    status: 'upcoming',
    priority: 'medium',
    category: 'digital',
    frequency: 'annual',
    assignedTo: 'IT Team',
    cost: 3000,
    autoRenewal: true,
  },
];

const availableCompliances = {
  'Corporate': [
    { id: 'corp1', title: 'Annual Board Resolution', description: 'Annual board meeting documentation', cost: 15000 },
    { id: 'corp2', title: 'Shareholder Meeting', description: 'Annual general meeting compliance', cost: 20000 },
    { id: 'corp3', title: 'Director Appointment', description: 'New director appointment formalities', cost: 8000 },
  ],
  'Regulatory': [
    { id: 'reg1', title: 'ROC Annual Filing', description: 'Registrar of Companies annual filing', cost: 25000 },
    { id: 'reg2', title: 'SEBI Compliance', description: 'Securities compliance requirements', cost: 50000 },
    { id: 'reg3', title: 'RBI Compliance', description: 'Reserve Bank compliance for financial services', cost: 35000 },
  ],
  'Tax': [
    { id: 'tax1', title: 'GST Audit', description: 'Annual GST audit and verification', cost: 35000 },
    { id: 'tax2', title: 'Income Tax Audit', description: 'Annual income tax audit', cost: 40000 },
    { id: 'tax3', title: 'Transfer Pricing Audit', description: 'Transfer pricing documentation', cost: 75000 },
  ],
  'Labor': [
    { id: 'lab1', title: 'PF Registration', description: 'Provident Fund registration compliance', cost: 5000 },
    { id: 'lab2', title: 'ESI Registration', description: 'Employee State Insurance compliance', cost: 5000 },
    { id: 'lab3', title: 'Labor License Renewal', description: 'Annual labor license renewal', cost: 8000 },
  ],
  'Environmental': [
    { id: 'env1', title: 'Environmental Clearance', description: 'Environmental compliance clearance', cost: 45000 },
    { id: 'env2', title: 'Pollution Control', description: 'Pollution control board compliance', cost: 25000 },
    { id: 'env3', title: 'Waste Management', description: 'Waste management compliance', cost: 15000 },
  ],
};

const CompanyCompliancesPage = () => {
  const [compliances, setCompliances] = useState<Compliance[]>(dummyCompliances);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAddCompliance = (compliance: any, dueDate: string) => {
    const newCompliance: Compliance = {
      id: Date.now().toString(),
      title: compliance.title,
      description: compliance.description,
      dueDate,
      status: 'upcoming',
      priority: 'medium',
      category: compliance.category?.toLowerCase() || 'other',
      frequency: 'annual',
      cost: compliance.cost || 0,
      autoRenewal: false,
    };
    setCompliances([...compliances, newCompliance]);
  };

  const handleFileCompliance = (complianceId: string) => {
    setCompliances(compliances.map(c => 
      c.id === complianceId ? { ...c, status: 'completed' } : c
    ));
  };

  const toggleAutoRenewal = (complianceId: string) => {
    setCompliances(compliances.map(c => 
      c.id === complianceId ? { ...c, autoRenewal: !c.autoRenewal } : c
    ));
  };

  const filteredCompliances = compliances.filter(compliance => {
    const matchesSearch = compliance.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      compliance.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || compliance.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || compliance.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || compliance.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriority('all');
    setSelectedStatus('all');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending-review': return 'bg-yellow-100 text-yellow-800';
      case 'under-process': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const overdueCompliances = compliances.filter(c => c.status === 'overdue');
  const upcomingCompliances = compliances.filter(c => c.status === 'upcoming');
  const inProgressCompliances = compliances.filter(c => c.status === 'under-process');
  const totalCost = compliances.reduce((sum, c) => sum + (c.cost || 0), 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <ClipboardCheck className="h-8 w-8" />
              Compliance Management Hub
            </h1>
            <p className="text-muted-foreground">
              Centralized compliance tracking and automation platform
            </p>
          </div>
          <AddComplianceDialog
            availableCompliances={availableCompliances}
            onAdd={handleAddCompliance}
            complianceType="compliances"
          >
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Compliance
            </Button>
          </AddComplianceDialog>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overdueCompliances.length}</div>
              <p className="text-xs text-muted-foreground">
                Requires immediate attention
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{inProgressCompliances.length}</div>
              <p className="text-xs text-muted-foreground">
                Currently being processed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{upcomingCompliances.length}</div>
              <p className="text-xs text-muted-foreground">
                Due in next 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <Building className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalCost.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Annual compliance budget
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <ComplianceFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onClearFilters={clearFilters}
            />

            <div className="grid gap-4">
              {filteredCompliances.map((compliance) => (
                <Card key={compliance.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {compliance.title}
                          {compliance.autoRenewal && (
                            <Badge variant="secondary" className="text-xs">
                              Auto-Renewal
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{compliance.description}</p>
                        {compliance.assignedTo && (
                          <p className="text-xs text-muted-foreground">
                            Assigned to: {compliance.assignedTo}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(compliance.priority)}>
                          {compliance.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{compliance.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Due: {compliance.dueDate}</span>
                        </div>
                        {compliance.cost && (
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">₹{compliance.cost.toLocaleString()}</span>
                          </div>
                        )}
                        <Badge className={getStatusColor(compliance.status)}>
                          {compliance.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleAutoRenewal(compliance.id)}
                        >
                          {compliance.autoRenewal ? 'Disable Auto-Renewal' : 'Enable Auto-Renewal'}
                        </Button>
                        {(compliance.status === 'pending-review' || compliance.status === 'under-process') && (
                          <FileComplianceDialog
                            compliance={compliance}
                            onFile={() => handleFileCompliance(compliance.id)}
                          >
                            <Button size="sm">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Complete
                            </Button>
                          </FileComplianceDialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Calendar</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Timeline view of all compliance deadlines
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['January', 'February', 'March', 'April'].map((month) => (
                    <div key={month} className="border-l-2 border-primary pl-4">
                      <h3 className="font-semibold text-lg">{month} 2024</h3>
                      <div className="mt-2 space-y-2">
                        {compliances
                          .filter(c => new Date(c.dueDate).toLocaleString('default', { month: 'long' }) === month)
                          .map(compliance => (
                            <div key={compliance.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <div>
                                <p className="font-medium">{compliance.title}</p>
                                <p className="text-sm text-muted-foreground">{compliance.dueDate}</p>
                              </div>
                              <Badge className={getStatusColor(compliance.status)}>
                                {compliance.status.replace('-', ' ').toUpperCase()}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(
                compliances.reduce((acc, compliance) => {
                  if (!acc[compliance.category]) acc[compliance.category] = [];
                  acc[compliance.category].push(compliance);
                  return acc;
                }, {} as Record<string, Compliance[]>)
              ).map(([category, categoryCompliances]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categoryCompliances.map(compliance => (
                        <div key={compliance.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="text-sm font-medium">{compliance.title}</p>
                            <p className="text-xs text-muted-foreground">{compliance.dueDate}</p>
                          </div>
                          <Badge className={getStatusColor(compliance.status)} variant="outline">
                            {compliance.status.split('-')[0]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automation Settings</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure automated compliance management
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Auto-Renewal for Recurring Compliances</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically renew annual and periodic compliances
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Smart Deadline Reminders</h3>
                      <p className="text-sm text-muted-foreground">
                        AI-powered reminders based on compliance complexity
                      </p>
                    </div>
                    <Button variant="outline">Setup</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Document Auto-Generation</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically generate compliance documents
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Vendor Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect with CAs, lawyers, and service providers
                      </p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Automations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {compliances.filter(c => c.autoRenewal).map(compliance => (
                    <div key={compliance.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">{compliance.title}</p>
                        <p className="text-sm text-muted-foreground">Auto-renewal enabled</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyCompliancesPage;
