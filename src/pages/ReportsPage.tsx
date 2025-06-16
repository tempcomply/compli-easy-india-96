
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  Download, 
  Plus, 
  Search, 
  Calendar,
  ExternalLink,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'tax' | 'compliance' | 'financial';
  uploadDate: string;
  dueDate?: string;
  size: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
}

interface Integration {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
  description: string;
  features: string[];
}

const dummyReports: Report[] = [
  {
    id: '1',
    name: 'GST Return March 2024',
    type: 'tax',
    uploadDate: '2024-04-05',
    dueDate: '2024-04-20',
    size: '2.5 MB',
    status: 'submitted'
  },
  {
    id: '2',
    name: 'ITR for FY 2023-24',
    type: 'tax',
    uploadDate: '2024-03-15',
    dueDate: '2024-07-31',
    size: '1.8 MB',
    status: 'draft'
  },
  {
    id: '3',
    name: 'Annual Compliance Report',
    type: 'compliance',
    uploadDate: '2024-03-20',
    dueDate: '2024-06-30',
    size: '4.2 MB',
    status: 'approved'
  }
];

const integrations: Integration[] = [
  {
    id: '1',
    name: 'Zoho Books',
    logo: '/api/placeholder/40/40',
    connected: false,
    description: 'Accounting software for small businesses',
    features: ['Financial Reports', 'Tax Reports', 'Invoice Data', 'Expense Reports']
  },
  {
    id: '2',
    name: 'RazorpayX Banking',
    logo: '/api/placeholder/40/40',
    connected: true,
    description: 'Business banking and financial services',
    features: ['Bank Statements', 'Transaction Reports', 'Tax Documents', 'Compliance Reports']
  },
  {
    id: '3',
    name: 'Tally',
    logo: '/api/placeholder/40/40',
    connected: false,
    description: 'Complete business management software',
    features: ['GST Reports', 'Financial Statements', 'Inventory Reports', 'Payroll Reports']
  }
];

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>(dummyReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('reports');

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tax': return 'bg-purple-100 text-purple-800';
      case 'compliance': return 'bg-orange-100 text-orange-800';
      case 'financial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="h-8 w-8" />
              Reports & Documents
            </h1>
            <p className="text-muted-foreground mt-1">
              Upload, manage, and download reports for tax filing and compliance
            </p>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">My Reports</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Report
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-semibold text-lg">{report.name}</h3>
                          <Badge className={getTypeColor(report.type)} variant="secondary">
                            {report.type.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>Uploaded: {new Date(report.uploadDate).toLocaleDateString()}</span>
                          {report.dueDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {new Date(report.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          <span>Size: {report.size}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {integrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <img 
                            src={integration.logo} 
                            alt={integration.name}
                            className="w-6 h-6"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {integration.connected ? (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600">Connected</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <AlertCircle className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">Not Connected</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={integration.connected ? "outline" : "default"}
                    >
                      {integration.connected ? (
                        <>
                          <Settings className="mr-2 h-4 w-4" />
                          Manage
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Connect
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Get help with your reports and compliance requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Support Ticket
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Browse Help Articles
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common support tasks and resources
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document Issue
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Integration Setup Help
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Report Generation Help
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
