
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Calendar,
  Building,
  CreditCard,
  Receipt,
  Landmark,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  category: 'banking' | 'tax' | 'compliance' | 'financial';
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'as-needed';
  status: 'uploaded' | 'pending' | 'overdue';
  lastUpdated?: string;
  dueDate?: string;
  usedFor: string[];
}

const requiredDocuments: RequiredDocument[] = [
  {
    id: '1',
    name: 'Monthly Bank Statement',
    description: 'Current account bank statement for the month',
    category: 'banking',
    frequency: 'monthly',
    status: 'uploaded',
    lastUpdated: '2024-03-15',
    usedFor: ['GST Filing', 'Income Tax', 'TDS Returns', 'Financial Audit']
  },
  {
    id: '2',
    name: 'Sales Invoices',
    description: 'All sales invoices issued during the period',
    category: 'financial',
    frequency: 'monthly',
    status: 'pending',
    dueDate: '2024-04-10',
    usedFor: ['GST Filing', 'Income Tax', 'Sales Tax Returns']
  },
  {
    id: '3',
    name: 'Purchase Invoices',
    description: 'All purchase invoices and bills received',
    category: 'financial',
    frequency: 'monthly',
    status: 'uploaded',
    lastUpdated: '2024-03-20',
    usedFor: ['GST Filing', 'Income Tax', 'Input Tax Credit']
  },
  {
    id: '4',
    name: 'Salary Register',
    description: 'Employee salary details and payroll summary',
    category: 'compliance',
    frequency: 'monthly',
    status: 'overdue',
    dueDate: '2024-03-31',
    usedFor: ['TDS on Salary', 'PF Returns', 'ESI Returns', 'Professional Tax']
  },
  {
    id: '5',
    name: 'TDS Certificates',
    description: 'Form 16A and other TDS certificates received',
    category: 'tax',
    frequency: 'quarterly',
    status: 'uploaded',
    lastUpdated: '2024-01-15',
    usedFor: ['Income Tax Filing', 'TDS Returns', 'Advance Tax Calculation']
  },
  {
    id: '6',
    name: 'Investment Proofs',
    description: 'Investment receipts for tax saving under 80C, 80D etc.',
    category: 'tax',
    frequency: 'yearly',
    status: 'pending',
    dueDate: '2024-07-31',
    usedFor: ['Income Tax Filing', 'Tax Planning']
  },
  {
    id: '7',
    name: 'Fixed Deposit Statements',
    description: 'FD certificates and interest statements',
    category: 'financial',
    frequency: 'yearly',
    status: 'uploaded',
    lastUpdated: '2024-02-28',
    usedFor: ['Income Tax Filing', 'TDS on Interest', 'Financial Planning']
  },
  {
    id: '8',
    name: 'Property Documents',
    description: 'Property tax receipts, rent agreements, sale deeds',
    category: 'compliance',
    frequency: 'yearly',
    status: 'uploaded',
    lastUpdated: '2024-01-10',
    usedFor: ['Income Tax Filing', 'Property Tax', 'Capital Gains']
  }
];

const ReportsPage = () => {
  const [documents, setDocuments] = useState<RequiredDocument[]>(requiredDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'banking': return <CreditCard className="h-4 w-4" />;
      case 'tax': return <Receipt className="h-4 w-4" />;
      case 'compliance': return <Landmark className="h-4 w-4" />;
      case 'financial': return <Building className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'banking': return 'bg-blue-100 text-blue-800';
      case 'tax': return 'bg-purple-100 text-purple-800';
      case 'compliance': return 'bg-orange-100 text-orange-800';
      case 'financial': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'banking', label: 'Banking' },
    { value: 'tax', label: 'Tax Documents' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'financial', label: 'Financial' }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Required Documents
          </h1>
          <p className="text-muted-foreground mt-1">
            Documents needed for tax filing and compliance requirements
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getCategoryIcon(document.category)}
                      <h3 className="font-semibold text-lg">{document.name}</h3>
                      <Badge className={getCategoryColor(document.category)} variant="secondary">
                        {document.category.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(document.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(document.status)}
                          {document.status.toUpperCase()}
                        </div>
                      </Badge>
                      <Badge variant="outline">
                        {document.frequency}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {document.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        {document.lastUpdated && (
                          <span>Last Updated: {new Date(document.lastUpdated).toLocaleDateString()}</span>
                        )}
                        {document.dueDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {new Date(document.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Used for:</p>
                        <div className="flex flex-wrap gap-1">
                          {document.usedFor.map((usage, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {usage}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {document.status === 'uploaded' ? (
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    ) : (
                      <Button size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-16">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
