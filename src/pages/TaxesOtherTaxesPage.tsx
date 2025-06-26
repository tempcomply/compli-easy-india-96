
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";

const OTHER_TAX_FIELDS = [
  { name: "tax_type", label: "Tax Type" },
  { name: "registration_no", label: "Registration Number" },
  { name: "description", label: "Description" },
];

const otherTaxTypes = [
  {
    id: 'customs_duty',
    name: 'Customs Duty',
    description: 'Import and export customs duty payments',
    frequency: 'As Required',
    importance: 'high',
  },
  {
    id: 'excise_duty',
    name: 'Excise Duty',
    description: 'Central excise duty on manufactured goods',
    frequency: 'Monthly',
    importance: 'high',
  },
  {
    id: 'service_tax',
    name: 'Service Tax (Legacy)',
    description: 'Legacy service tax payments for pre-GST periods',
    frequency: 'Quarterly',
    importance: 'medium',
  },
  {
    id: 'stamp_duty',
    name: 'Stamp Duty',
    description: 'Stamp duty on legal documents and agreements',
    frequency: 'As Required',
    importance: 'medium',
  }
];

const TaxesOtherTaxesPage = () => {
  const [isSetup, setIsSetup] = useState(false);
  
  const handleSetupComplete = (data: any) => {
    setIsSetup(true);
    toast({ title: "Other Tax Setup Complete", description: "You can now manage miscellaneous tax compliance." });
  };

  const getCardSize = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'md:col-span-2';
      case 'medium':
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
        <h2 className="text-2xl font-bold">Other Tax Management</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Manage miscellaneous taxes including customs duty, excise duty, and other specialized tax obligations.
        </p>
      </div>
      <div className="space-y-4">
        <GetStartedCard
          icon={<FileText className="w-8 h-8 text-primary" />}
          title="Other Tax Setup"
          subtitle="Add other tax registration details to begin."
          fields={OTHER_TAX_FIELDS}
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
        <h2 className="text-2xl font-bold">Other Tax Compliance</h2>
        <p className="text-muted-foreground">Manage miscellaneous and specialized tax obligations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {otherTaxTypes.map((tax) => (
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
                  { name: "period", label: "Period/Date", required: true },
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
            <FileText className="h-8 w-8 text-blue-600" />
            Other Taxes
          </h1>
          <p className="text-muted-foreground">
            Customs duty, excise duty, and miscellaneous tax management
          </p>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesOtherTaxesPage;
