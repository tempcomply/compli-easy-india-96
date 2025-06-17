
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText } from 'lucide-react';
import GstSetupDialog from '@/components/taxes/GstSetupDialog';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';

const gstForms = [
  {
    id: 'gstr1',
    name: 'GSTR-1',
    description: 'Details of outward supplies of taxable goods and/or services effected',
    frequency: 'Monthly/Quarterly',
    importance: 'high',
  },
  {
    id: 'gstr3b',
    name: 'GSTR-3B',
    description: 'Monthly return to be furnished by every registered person',
    frequency: 'Monthly',
    importance: 'high',
  },
  {
    id: 'gstr9',
    name: 'GSTR-9',
    description: 'Annual return to be furnished by every registered person',
    frequency: 'Annual',
    importance: 'medium',
  },
  {
    id: 'gstr4',
    name: 'GSTR-4',
    description: 'Return for composition taxable person',
    frequency: 'Quarterly',
    importance: 'low',
  }
];

const TaxesGstPage = () => {
  const navigate = useNavigate();
  const [isSetup, setIsSetup] = useState(false);
  
  const handleSetupComplete = () => {
    setIsSetup(true);
  };

  const getCardSize = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'md:col-span-2';
      case 'medium':
        return 'md:col-span-1';
      case 'low':
        return 'md:col-span-1';
      default:
        return 'md:col-span-1';
    }
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
        <GstSetupDialog onSetupComplete={handleSetupComplete} />
        <p className="text-sm text-muted-foreground">
          Setup takes less than 5 minutes
        </p>
      </div>
    </div>
  );

  const SetupComplete = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">GST Filing Forms</h2>
        <p className="text-muted-foreground">Select a form to file your GST return</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {gstForms.map((form) => (
          <Card key={form.id} className={`${getCardSize(form.importance)} hover:shadow-md transition-shadow`}>
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
              <MakePaymentDialog
                triggerLabel={`File ${form.name}`}
                fields={[]}
                paymentFields={[
                  { name: "amount", label: "Amount to Pay (INR)", required: true, type: "number" }
                ]}
                onPay={(data) => {
                  console.log(`Filing ${form.name} with payment:`, data);
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/client/taxes')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
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
