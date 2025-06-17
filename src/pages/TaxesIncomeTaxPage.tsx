
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Receipt, Banknote } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IT_FIELDS = [
  { name: "pan", label: "PAN" },
  { name: "assess_year", label: "Assessment Year" },
  { name: "mobile", label: "Contact Mobile" },
  { name: "annual_income", label: "Annual Income" },
  { name: "business_type", label: "Business Type" }
];

const incomeTaxForms = [
  {
    id: 'itr1',
    name: 'ITR-1 (Sahaj)',
    description: 'For individuals having income from salary, one house property and other sources',
    frequency: 'Annual',
    importance: 'high',
  },
  {
    id: 'itr3',
    name: 'ITR-3',
    description: 'For individuals/HUFs having income from business or profession',
    frequency: 'Annual',
    importance: 'high',
  },
  {
    id: 'advance_tax',
    name: 'Advance Tax',
    description: 'Quarterly advance tax payment for estimated income',
    frequency: 'Quarterly',
    importance: 'medium',
  },
  {
    id: 'tds_return',
    name: 'TDS Return',
    description: 'Tax Deducted at Source return filing',
    frequency: 'Quarterly',
    importance: 'medium',
  }
];

const TaxesIncomeTaxPage = () => {
  const [isSetup, setIsSetup] = useState(false);

  const getCardSize = (importance: string) => {
    switch (importance) {
      case 'high': return 'md:col-span-2';
      case 'medium': return 'md:col-span-1';
      case 'low': return 'md:col-span-1';
      default: return 'md:col-span-1';
    }
  };

  const EmptyState = () => (
    <div className="text-center py-16 space-y-6">
      <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
        <Receipt className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Income Tax Filing Made Simple</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Get started with your Income Tax compliance. We'll guide you through the setup process and help you file your returns on time.
        </p>
      </div>
      <div className="space-y-4">
        <GetStartedCard
          icon={<Receipt className="w-8 h-8 text-primary" />}
          title="Income Tax Setup"
          subtitle="Provide below to start Income Tax return filings."
          fields={IT_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "Income Tax Setup Complete", description: "You can now file Income Tax returns." });
          }}
        />
        <p className="text-sm text-muted-foreground">
          Setup takes less than 5 minutes
        </p>
      </div>
    </div>
  );

  const SetupComplete = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Income Tax Forms</h2>
        <p className="text-muted-foreground">Select a form to file your Income Tax return</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {incomeTaxForms.map((form) => (
          <Card key={form.id} className={`${getCardSize(form.importance)} hover:shadow-md transition-shadow`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{form.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {form.frequency}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {form.description}
              </p>
              <MakePaymentDialog
                triggerLabel={`File ${form.name}`}
                fields={[
                  { name: "pan", label: "PAN", required: true },
                  { name: "assessment_year", label: "Assessment Year", required: true },
                ]}
                paymentFields={[
                  { name: "amount", label: "Tax Amount (INR)", required: true, type: "number" }
                ]}
                onPay={(data) => {
                  console.log(`Filing ${form.name} with payment:`, data);
                  toast({ title: "Filing Initiated", description: `${form.name} filing has been started.` });
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Receipt className="h-8 w-8 text-blue-600" />
            Income Tax
          </h1>
          <p className="text-muted-foreground">
            Income Tax filing and compliance management
          </p>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesIncomeTaxPage;
