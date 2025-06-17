
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Building2, Banknote } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATE_TAX_FIELDS = [
  { name: "registration_no", label: "Registration Number" },
  { name: "tax_type", label: "Tax Type" },
  { name: "region", label: "Region/State" },
  { name: "business_address", label: "Business Address" },
  { name: "property_details", label: "Property Details" }
];

const stateTaxForms = [
  {
    id: 'vat_return',
    name: 'VAT Return',
    description: 'State Value Added Tax return filing',
    frequency: 'Monthly',
    importance: 'high',
  },
  {
    id: 'property_tax',
    name: 'Property Tax',
    description: 'Municipal property tax payment for business premises',
    frequency: 'Annual',
    importance: 'high',
  },
  {
    id: 'water_tax',
    name: 'Water Tax',
    description: 'Municipal water tax and charges',
    frequency: 'Quarterly',
    importance: 'medium',
  },
  {
    id: 'trade_license',
    name: 'Trade License Fee',
    description: 'Annual trade license renewal fee payment',
    frequency: 'Annual',
    importance: 'medium',
  }
];

const TaxesStateLocalPage = () => {
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
        <Building2 className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">State & Local Tax Management</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Manage state-specific taxes, municipal taxes, and local body obligations efficiently.
        </p>
      </div>
      <div className="space-y-4">
        <GetStartedCard
          icon={<Building2 className="w-8 h-8 text-primary" />}
          title="State/Local Tax Setup"
          subtitle="Add registration and region to start tracking these taxes."
          fields={STATE_TAX_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "State/Local Tax Setup Complete", description: "You can now manage state and local tax payments." });
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
        <h2 className="text-2xl font-bold">State & Local Tax Forms</h2>
        <p className="text-muted-foreground">Manage state-specific and local body tax obligations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stateTaxForms.map((form) => (
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
                triggerLabel={`Pay ${form.name}`}
                fields={[
                  { name: "registration_no", label: "Registration Number", required: true },
                  { name: "tax_type", label: "Tax Type", required: true },
                ]}
                paymentFields={[
                  { name: "amount", label: "Amount to Pay (INR)", required: true, type: "number" }
                ]}
                onPay={(data) => {
                  console.log(`Processing ${form.name} payment:`, data);
                  toast({ title: "Payment Initiated", description: `${form.name} payment has been initiated.` });
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
            <Building2 className="h-8 w-8 text-blue-600" />
            State & Local Taxes
          </h1>
          <p className="text-muted-foreground">
            State-specific taxes, municipal taxes, and local body obligations
          </p>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesStateLocalPage;
