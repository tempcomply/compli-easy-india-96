
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Calendar, Receipt, FileCheck, AlertTriangle, CreditCard, Clock, CheckCircle2, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import AddComplianceDialog from '@/components/compliances/AddComplianceDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TaxStatus = 'pending' | 'filed' | 'under_review' | 'completed' | 'payment_pending' | 'paid';

interface Tax {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaxStatus;
  category: string;
  requiresCA: boolean;
  amount?: number;
  paymentMethod?: string;
  frequency: 'monthly' | 'quarterly' | 'annual';
  autoPayEnabled?: boolean;
}

const dummyTaxes: Tax[] = [
  {
    id: '1',
    title: 'GST Return Filing',
    description: 'Monthly GST return submission',
    dueDate: '2024-01-20',
    status: 'payment_pending',
    category: 'GST',
    requiresCA: true,
    amount: 45000,
    frequency: 'monthly',
    autoPayEnabled: true,
  },
  {
    id: '2',
    title: 'Income Tax Return',
    description: 'Annual income tax filing',
    dueDate: '2024-07-31',
    status: 'under_review',
    category: 'Income Tax',
    requiresCA: true,
    amount: 125000,
    frequency: 'annual',
    autoPayEnabled: false,
  },
  {
    id: '3',
    title: 'TDS Return',
    description: 'Quarterly TDS return filing',
    dueDate: '2024-01-31',
    status: 'filed',
    category: 'TDS',
    requiresCA: true,
    amount: 35000,
    frequency: 'quarterly',
    autoPayEnabled: true,
  },
  {
    id: '4',
    title: 'Professional Tax',
    description: 'Monthly professional tax payment',
    dueDate: '2024-01-15',
    status: 'paid',
    category: 'Professional Tax',
    requiresCA: false,
    amount: 2500,
    frequency: 'monthly',
    autoPayEnabled: true,
  },
  {
    id: '5',
    title: 'PF Contribution',
    description: 'Monthly Provident Fund contribution',
    dueDate: '2024-01-15',
    status: 'pending',
    category: 'PF/ESI',
    requiresCA: false,
    amount: 18500,
    frequency: 'monthly',
    autoPayEnabled: true,
  },
];

const paymentHistory = [
  {
    id: '1',
    taxTitle: 'Professional Tax',
    amount: 2500,
    paymentDate: '2024-01-15',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN123456789'
  },
  {
    id: '2',
    taxTitle: 'GST Return',
    amount: 45000,
    paymentDate: '2023-12-20',
    status: 'completed',
    paymentMethod: 'UPI',
    transactionId: 'TXN987654321'
  },
  {
    id: '3',
    taxTitle: 'TDS Return',
    amount: 35000,
    paymentDate: '2023-12-31',
    status: 'completed',
    paymentMethod: 'Net Banking',
    transactionId: 'TXN456789123'
  },
];

const availableTaxes = {
  'GST': [
    { id: 'gst1', title: 'GST Return Filing', description: 'Monthly GST return submission', requiresCA: true, amount: 45000 },
    { id: 'gst2', title: 'GST Annual Return', description: 'Annual GST return filing', requiresCA: true, amount: 85000 },
    { id: 'gst3', title: 'GSTR-1', description: 'Outward supplies return', requiresCA: true, amount: 15000 },
    { id: 'gst4', title: 'GSTR-3B', description: 'Summary return and cash payment', requiresCA: true, amount: 25000 },
  ],
  'Income Tax': [
    { id: 'it1', title: 'Income Tax Return', description: 'Annual income tax filing', requiresCA: true, amount: 125000 },
    { id: 'it2', title: 'Advance Tax Payment', description: 'Quarterly advance tax installments', requiresCA: true, amount: 75000 },
    { id: 'it3', title: 'Form 16 Generation', description: 'Salary certificate for employees', requiresCA: false, amount: 5000 },
  ],
  'TDS': [
    { id: 'tds1', title: 'TDS Return', description: 'Tax Deducted at Source return', requiresCA: true, amount: 35000 },
    { id: 'tds2', title: 'TCS Return', description: 'Tax Collected at Source return', requiresCA: true, amount: 28000 },
  ],
  'PF/ESI': [
    { id: 'pf1', title: 'PF Contribution', description: 'Monthly Provident Fund contribution', requiresCA: false, amount: 18500 },
    { id: 'esi1', title: 'ESI Contribution', description: 'Monthly ESI contribution', requiresCA: false, amount: 12000 },
  ],
  'Professional Tax': [
    { id: 'pt1', title: 'Professional Tax Return', description: 'Monthly professional tax filing', requiresCA: false, amount: 2500 },
    { id: 'pt2', title: 'Professional Tax Registration', description: 'State professional tax registration', requiresCA: false, amount: 1500 },
  ],
};

const TaxesPage = () => {
  const [taxes, setTaxes] = useState<Tax[]>(dummyTaxes);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [activeTab, setActiveTab] = useState('overview');

  const handleAddTax = (tax: any, dueDate: string) => {
    const newTax: Tax = {
      id: Date.now().toString(),
      title: tax.title,
      description: tax.description,
      dueDate,
      status: 'pending',
      category: tax.category,
      requiresCA: tax.requiresCA || false,
      amount: tax.amount || 0,
      frequency: 'monthly',
      autoPayEnabled: false,
    };
    setTaxes([...taxes, newTax]);
  };

  const handlePayTax = (taxId: string) => {
    setTaxes(taxes.map(t => 
      t.id === taxId ? { ...t, status: 'paid' } : t
    ));
  };

  const handleFileTax = (taxId: string) => {
    setTaxes(taxes.map(t => 
      t.id === taxId ? { ...t, status: 'filed' } : t
    ));
  };

  const toggleAutoPay = (taxId: string) => {
    setTaxes(taxes.map(t => 
      t.id === taxId ? { ...t, autoPayEnabled: !t.autoPayEnabled } : t
    ));
  };

  const filteredTaxes = taxes.filter(tax =>
    tax.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tax.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tax.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'payment_pending': return 'bg-orange-100 text-orange-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPendingAmount = taxes
    .filter(tax => tax.status === 'payment_pending' || tax.status === 'pending')
    .reduce((sum, tax) => sum + (tax.amount || 0), 0);

  const autoPayTaxes = taxes.filter(tax => tax.autoPayEnabled);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Receipt className="h-8 w-8" />
              Tax Management Hub
            </h1>
            <p className="text-muted-foreground">
              Unified platform for all your tax payments and compliance needs
            </p>
          </div>
          <AddComplianceDialog
            availableCompliances={availableTaxes}
            onAdd={handleAddTax}
            complianceType="taxes"
          >
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tax Obligation
            </Button>
          </AddComplianceDialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalPendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across {taxes.filter(t => t.status === 'payment_pending' || t.status === 'pending').length} obligations
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Auto-Pay Enabled</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{autoPayTaxes.length}</div>
              <p className="text-xs text-muted-foreground">
                Automated payments active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Due This Month</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {taxes.filter(t => new Date(t.dueDate).getMonth() === new Date().getMonth()).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Obligations due
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month Paid</CardTitle>
              <CreditCard className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{paymentHistory
                  .filter(p => new Date(p.paymentDate).getMonth() === new Date().getMonth())
                  .reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total payments made
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Tax Overview</TabsTrigger>
            <TabsTrigger value="payments">Payment Center</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tax obligations..."
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
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {filteredTaxes.map((tax) => (
                <Card key={tax.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {tax.title}
                          {tax.requiresCA && (
                            <Badge variant="destructive" className="text-xs flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Requires CA
                            </Badge>
                          )}
                          {tax.autoPayEnabled && (
                            <Badge variant="secondary" className="text-xs">
                              Auto-Pay
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{tax.description}</p>
                      </div>
                      <Badge variant="outline">{tax.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Due: {tax.dueDate}</span>
                        </div>
                        {tax.amount && (
                          <div className="flex items-center gap-2">
                            <Receipt className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">₹{tax.amount.toLocaleString()}</span>
                          </div>
                        )}
                        <Badge className={getStatusColor(tax.status)}>
                          {tax.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {(tax.status === 'payment_pending' || tax.status === 'pending') && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleAutoPay(tax.id)}
                            >
                              {tax.autoPayEnabled ? 'Disable Auto-Pay' : 'Enable Auto-Pay'}
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handlePayTax(tax.id)}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Pay Now
                            </Button>
                          </>
                        )}
                        {tax.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleFileTax(tax.id)}
                          >
                            <FileCheck className="mr-2 h-4 w-4" />
                            File
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Payment Center</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Pay multiple taxes at once or set up automated payments
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <Button className="w-full justify-start" size="lg">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pay All Pending Taxes (₹{totalPendingAmount.toLocaleString()})
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Enable Auto-Pay for All
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Payments
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Net Banking</p>
                        <p className="text-sm text-muted-foreground">Direct bank transfer</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">UPI</p>
                        <p className="text-sm text-muted-foreground">Instant payments</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Credit Card</p>
                        <p className="text-sm text-muted-foreground">Earn rewards</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Track all your tax payment history
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{payment.taxTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.paymentDate} • {payment.paymentMethod}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Transaction ID: {payment.transactionId}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                        <Badge className="bg-green-100 text-green-800">
                          {payment.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View All Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TaxesPage;
