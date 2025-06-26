
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";

const STATE_TAX_FIELDS = [
  { name: "registration_no", label: "Registration Number" },
  { name: "tax_type", label: "Tax Type" },
  { name: "region", label: "Region/State" },
];

const stateLocalTaxTypes = [
  {
    id: 'vat_state',
    name: 'State VAT',
    description: 'State Value Added Tax for goods sold within the state',
    frequency: 'Monthly',
    importance: 'high',
  },
  {
    id: 'property_tax',
    name: 'Property Tax',
    description: 'Municipal property tax for commercial and residential properties',
    frequency: 'Annual',
    importance: 'high',
  },
  {
    id: 'local_body_tax',
    name: 'Local Body Tax',
    description: 'Local municipal taxes and cess payments',
    frequency: 'Quarterly',
    importance: 'medium',
  },
  {
    id: 'entertainment_tax',
    name: 'Entertainment Tax',
    description: 'State entertainment tax on entertainment services',
    frequency: 'Monthly',
    importance: 'low',
  }
];

const TaxesStateLocalPage = () => {
  const [isSetup, setIsSetup] = useState(false);
  
  const handleSetupComplete = (data: any) => {
    setIsSetup(true);
    toast({ title: "State/Local Tax Setup Complete", description: "You can now manage state and local tax compliance." });
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
        <Building2 className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">State & Local Tax Management</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Manage your state and local tax obligations including VAT, property tax, and municipal taxes across different regions.
        </p>
      </div>
      <div className="space-y-4">
        <GetStartedCard
          icon={<Building2 className="w-8 h-8 text-primary" />}
          title="State/Local Tax Setup"
          subtitle="Add registration and region to start tracking these taxes."
          fields={STATE_TAX_FIELDS}
          onSubmit={handleSetupComplete}
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
        <h2 className="text-2xl font-bold">State & Local Tax Compliance</h2>
        <p className="text-muted-foreground">Manage various state and local tax obligations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stateLocalTaxTypes.map((tax) => (
          <Card key={tax.id} className={`${getCardSize(tax.importance)} hover:shadow-md transition-shadow`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{tax.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {tax.frequency}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {tax.description}
              </p>
              <MakePaymentDialog
                triggerLabel={`File ${tax.name}`}
                fields={[
                  { name: "period", label: "Tax Period", required: true },
                  { name: "assessment_value", label: "Assessment Value", required: true, type: "number" }
                ]}
                paymentFields={[
                  { name: "tax_amount", label: "Tax Amount (INR)", required: true, type: "number" },
                  { name: "payment_mode", label: "Payment Mode", type: "text" }
                ]}
                onPay={(data) => {
                  console.log(`Filing ${tax.name} with data:`, data);
                  toast({ title: "Payment Completed", description: `${tax.name} payment has been processed.` });
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
            State VAT, property tax, and local municipal tax management
          </p>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesStateLocalPage;
