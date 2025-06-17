
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Banknote as NoteIcon, FileText, Banknote } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OTHER_TAX_FIELDS = [
  { name: "tax_type", label: "Tax Type" },
  { name: "registration_no", label: "Registration Number" },
  { name: "description", label: "Description" },
  { name: "issuing_authority", label: "Issuing Authority" },
  { name: "business_category", label: "Business Category" }
];

const otherTaxForms = [
  {
    id: 'excise_duty',
    name: 'Excise Duty',
    description: 'Central Excise duty on manufactured goods',
    frequency: 'Monthly',
    importance: 'high',
  },
  {
    id: 'customs_duty',
    name: 'Customs Duty',
    description: 'Import/Export customs duty and documentation',
    frequency: 'Per Transaction',
    importance: 'high',
  },
  {
    id: 'entertainment_tax',
    name: 'Entertainment Tax',
    description: 'State entertainment tax on shows and events',
    frequency: 'Per Event',
    importance: 'medium',
  },
  {
    id: 'stamp_duty',
    name: 'Stamp Duty',
    description: 'Stamp duty on legal documents and agreements',
    frequency: 'Per Document',
    importance: 'low',
  }
];

const TaxesOtherTaxesPage = () => {
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
        <NoteIcon className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Other Tax Management</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Manage excise, customs, entertainment tax and other miscellaneous business tax obligations.
        </p>
      </div>
      <div className="space-y-4">
        <GetStartedCard
          icon={<NoteIcon className="w-8 h-8 text-primary" />}
          title="Other Tax Setup"
          subtitle="Add other tax registration details to begin."
          fields={OTHER_TAX_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "Other Tax Setup Complete", description: "You can now manage miscellaneous tax payments." });
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
        <h2 className="text-2xl font-bold">Other Tax Forms</h2>
        <p className="text-muted-foreground">Manage miscellaneous tax obligations and payments</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {otherTaxForms.map((form) => (
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
                  { name: "tax_type", label: "Tax Type", required: true },
                  { name: "period", label: "Period", required: true },
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
            <NoteIcon className="h-8 w-8 text-blue-600" />
            Other Taxes
          </h1>
          <p className="text-muted-foreground">
            Excise, customs, and other miscellaneous business tax filings
          </p>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesOtherTaxesPage;
