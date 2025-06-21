
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Upload, 
  FileText, 
  Download, 
  Eye,
  Calendar,
  Building,
  CreditCard,
  Receipt,
  Landmark,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocuments, documentCategories, Document } from '@/hooks/useDocuments';

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

const DocumentsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { documents, loading, downloadDocument, viewDocument } = useDocuments();
  const [activeCategory, setActiveCategory] = useState('All Documents');
  const [requiredDocsCategory, setRequiredDocsCategory] = useState<string>('all');
  
  // Filter documents based on search query and active category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'All Documents') return matchesSearch;
    return matchesSearch && doc.category === activeCategory;
  });

  // Filter required documents
  const filteredRequiredDocuments = requiredDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = requiredDocsCategory === 'all' || doc.category === requiredDocsCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle document view
  const handleViewDocument = (documentId: string) => {
    navigate(`/documents/${documentId}`);
  };

  // Handle document download
  const handleDownloadDocument = (documentId: string) => {
    downloadDocument(documentId);
  };

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

  const requiredDocsCategories = [
    { value: 'all', label: 'All Documents' },
    { value: 'banking', label: 'Banking' },
    { value: 'tax', label: 'Tax Documents' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'financial', label: 'Financial' }
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground mt-1">
              Manage your document repository and required documents for filing
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => navigate('/documents/upload')}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </header>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="repository" className="space-y-4">
          <TabsList>
            <TabsTrigger value="repository">Document Repository</TabsTrigger>
            <TabsTrigger value="required">Required Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="repository" className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <p>Loading documents...</p>
              </div>
            ) : (
              <Tabs 
                defaultValue="All Documents" 
                onValueChange={setActiveCategory}
                className="space-y-4"
              >
                <TabsList className="flex flex-wrap">
                  {documentCategories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {documentCategories.map((category) => (
                  <TabsContent key={category} value={category} className="space-y-4">
                    {filteredDocuments.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <FileText className="h-12 w-12 text-muted-foreground opacity-25 mb-4" />
                          <h3 className="text-lg font-medium mb-1">No documents found</h3>
                          <p className="text-muted-foreground text-sm">
                            Try adjusting your search or upload new documents
                          </p>
                          <Button className="mt-4" onClick={() => navigate('/documents/upload')}>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Document
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredDocuments.map((doc) => (
                          <DocumentCard 
                            key={doc.id} 
                            document={doc} 
                            onView={handleViewDocument}
                            onDownload={handleDownloadDocument}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </TabsContent>

          <TabsContent value="required" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex gap-2 flex-wrap">
                {requiredDocsCategories.map((category) => (
                  <Button
                    key={category.value}
                    variant={requiredDocsCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRequiredDocsCategory(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredRequiredDocuments.map((document) => (
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

            {filteredRequiredDocuments.length === 0 && (
              <div className="text-center py-16">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No documents found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const DocumentCard: React.FC<{ 
  document: Document,
  onView: (id: string) => void,
  onDownload: (id: string) => void
}> = ({ document, onView, onDownload }) => {
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted p-4 flex items-center justify-center border-b h-40">
        <FileText className="h-16 w-16 text-muted-foreground opacity-50" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium mb-1 truncate" title={document.name}>
          {document.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {document.type}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {document.fileSize}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Uploaded on {document.uploadedAt}
          {document.uploadedBy && ` by ${document.uploadedBy}`}
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="w-full" onClick={() => onView(document.id)}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="w-full" onClick={() => onDownload(document.id)}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsPage;
