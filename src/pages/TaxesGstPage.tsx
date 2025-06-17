
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Play, CreditCard, Calendar } from 'lucide-react';

const gstForms = [
  {
    id: 'gstr1',
    name: 'GSTR-1',
    description: 'Details of outward supplies of taxable goods and/or services effected',
    frequency: 'Monthly/Quarterly',
    status: 'available'
  },
  {
    id: 'gstr3b',
    name: 'GSTR-3B',
    description: 'Monthly return to be furnished by every registered person',
    frequency: 'Monthly',
    status: 'available'
  },
  {
    id: 'gstr9',
    name: 'GSTR-9',
    description: 'Annual return to be furnished by every registered person',
    frequency: 'Annual',
    status: 'available'
  },
  {
    id: 'gstr4',
    name: 'GSTR-4',
    description: 'Return for composition taxable person',
    frequency: 'Quarterly',
    status: 'available'
  }
];

const TaxesGstPage = () => {
  const navigate = useNavigate();
  const [isSetup, setIsSetup] = useState(false);
  
  const handleGetStarted = () => {
    // In a real app, this would open a setup wizard
    setIsSetup(true);
  };

  const EmptyState = () => (
    <div className="text-center py-16 space-y-6">
      <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
        <FileText className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">GST Filing Made Simple</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Get started with your GST compliance. We'll guide you through the setup process and help you file your returns on time.
        </p>
      </div>
      <div className="space-y-4">
        <Button size="lg" onClick={handleGetStarted} className="px-8">
          <Play className="mr-2 h-5 w-5" />
          Get Started with GST
        </Button>
        <p className="text-sm text-muted-foreground">
          Setup takes less than 5 minutes
        </p>
      </div>
    </div>
  );

  const SetupComplete = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">GST Dashboard</h2>
          <p className="text-muted-foreground">Manage your GST filings and payments</p>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Make Payment
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Next Due Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">20th Jan 2025</div>
            <p className="text-sm text-muted-foreground">GSTR-3B for December 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              File GSTR-3B
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View Payment History
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Available GST Forms</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {gstForms.map((form) => (
            <Card key={form.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{form.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {form.frequency}
                    </Badge>
                  </div>
                  <Badge variant="secondary">Available</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {form.description}
                </p>
                <Button size="sm" className="w-full">
                  File {form.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/client/taxes')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Taxes
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="h-8 w-8 text-blue-600" />
              GST
            </h1>
            <p className="text-muted-foreground">
              Goods and Services Tax filing and compliance
            </p>
          </div>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesGstPage;
