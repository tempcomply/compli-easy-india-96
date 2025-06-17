
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Landmark, Banknote } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TDS_FIELDS = [
  { name: "tan", label: "TAN" },
  { name: "deductor_name", label: "Deductor Name" },
  { name: "pin_code", label: "Office PIN Code" },
  { name: "registration_date", label: "TAN Registration Date" },
  { name: "business_nature", label: "Nature of Business" }
];

const tdsForms = [
  {
    id: 'tds_24q',
    name: 'TDS Return 24Q',
    description: 'Quarterly return for TDS on salary payments',
    frequency: 'Quarterly',
    importance: 'high',
  },
  {
    id: 'tds_26q',
    name: 'TDS Return 26Q',
    description: 'Quarterly return for TDS on payments other than salary',
    frequency: 'Quarterly',
    importance: 'high',
  },
  {
    id: 'tcs_27q',
    name: 'TCS Return 27Q',
    description: 'Quarterly return for Tax Collected at Source',
    frequency: 'Quarterly',
    importance: 'medium',
  },
  {
    id: 'tds_27eq',
    name: 'TDS Return 27EQ',
    description: 'Quarterly return for TDS on e-commerce transactions',
    frequency: 'Quarterly',
    importance: 'medium',
  }
];

const TaxesTdsTcsPage = () => {
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
        <Landmark className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">TDS/TCS Filing Made Simple</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Get started with your TDS/TCS compliance. We'll guide you through the setup process and help you file your returns on time.
        </p>
      </div>
      <div className="space-y-4">
        <GetStartedCard
          icon={<Landmark className="w-8 h-8 text-primary" />}
          title="TDS/TCS Setup"
          subtitle="Add below details to initiate TDS & TCS filings."
          fields={TDS_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "TDS/TCS Setup Complete", description: "You can now file TDS & TCS returns." });
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
        <h2 className="text-2xl font-bold">TDS/TCS Forms</h2>
        <p className="text-muted-foreground">Select a form to file your TDS/TCS return</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tdsForms.map((form) => (
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
                  { name: "tan", label: "TAN", required: true },
                  { name: "quarter", label: "Quarter (e.g. Q1 FY24-25)", required: true },
                ]}
                paymentFields={[
                  { name: "amount", label: "Amount to Pay (INR)", required: true, type: "number" }
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
            <Landmark className="h-8 w-8 text-blue-600" />
            TDS & TCS
          </h1>
          <p className="text-muted-foreground">
            Tax Deducted/Collected at Source filing and compliance
          </p>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesTdsTcsPage;
