
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";

const EMPLOYEE_TAX_FIELDS = [
  { name: "pf_code", label: "PF Establishment Code" },
  { name: "esi_code", label: "ESI Number" },
  { name: "pt_state", label: "PT State" },
];

const employeeTaxForms = [
  {
    id: 'pf_monthly',
    name: 'PF Monthly Return',
    description: 'Monthly Provident Fund contribution and return filing',
    frequency: 'Monthly',
    importance: 'high',
  },
  {
    id: 'esi_monthly',
    name: 'ESI Monthly Return',
    description: 'Monthly Employee State Insurance contribution and return',
    frequency: 'Monthly',
    importance: 'high',
  },
  {
    id: 'pt_monthly',
    name: 'PT Monthly Return',
    description: 'Monthly Professional Tax deduction and payment',
    frequency: 'Monthly',
    importance: 'medium',
  },
  {
    id: 'pf_annual',
    name: 'PF Annual Return',
    description: 'Annual Provident Fund return and compliance certificate',
    frequency: 'Annual',
    importance: 'medium',
  }
];

const TaxesEmployeeTaxesPage = () => {
  const [isSetup, setIsSetup] = useState(false);
  
  const handleSetupComplete = (data: any) => {
    setIsSetup(true);
    toast({ title: "Employee Tax Setup Complete", description: "You can now manage employee tax compliance." });
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
        <Users className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Employee Tax Management</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Manage PF, ESI, and Professional Tax compliance for your employees. Set up once and automate your monthly filings.
        </p>
      </div>
      <div className="space-y-4">
        <GetStartedCard
          icon={<Users className="w-8 h-8 text-primary" />}
          title="Employee Taxes Setup"
          subtitle="Setup your employee-related tax details to begin."
          fields={EMPLOYEE_TAX_FIELDS}
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
        <h2 className="text-2xl font-bold">Employee Tax Compliance</h2>
        <p className="text-muted-foreground">Manage PF, ESI, and Professional Tax filings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {employeeTaxForms.map((form) => (
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
                  { name: "period", label: "Period (MM/YYYY)", required: true },
                  { name: "employee_count", label: "Number of Employees", required: true, type: "number" }
                ]}
                paymentFields={[
                  { name: "contribution_amount", label: "Contribution Amount (INR)", required: true, type: "number" },
                  { name: "payment_mode", label: "Payment Mode", type: "text" }
                ]}
                onPay={(data) => {
                  console.log(`Filing ${form.name} with data:`, data);
                  toast({ title: "Filing Completed", description: `${form.name} has been filed successfully.` });
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
            <Users className="h-8 w-8 text-blue-600" />
            Employee Taxes
          </h1>
          <p className="text-muted-foreground">
            PF, ESI, and Professional Tax compliance management
          </p>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesEmployeeTaxesPage;
