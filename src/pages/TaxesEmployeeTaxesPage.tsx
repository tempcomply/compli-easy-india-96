import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";

const EMPLOYEE_TAX_FIELDS = [
  { name: "pf_code", label: "PF Establishment Code", type: "text" },
  { name: "esi_code", label: "ESI Number", type: "text" },
  { name: "pt_state", label: "PT State", type: "text" },
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
  const [isSetupDialogOpen, setIsSetupDialogOpen] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  
  const handleSetupSubmit = handleSubmit((data) => {
    console.log('Employee Tax setup data:', data);
    setIsSetup(true);
    setIsSetupDialogOpen(false);
    toast({ title: "Employee Tax Setup Complete", description: "You can now manage employee tax compliance." });
  });

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
        <Dialog open={isSetupDialogOpen} onOpenChange={setIsSetupDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Users className="w-5 h-5" />
              Get Started
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Employee Tax Setup
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSetupSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Setup your employee-related tax details to begin.
              </p>
              {EMPLOYEE_TAX_FIELDS.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                  </label>
                  <Input
                    id={field.name}
                    type={field.type || "text"}
                    {...register(field.name, { required: true })}
                    disabled={isSubmitting}
                  />
                  {errors[field.name] && (
                    <span className="text-xs text-red-500">Required</span>
                  )}
                </div>
              ))}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Setting up..." : "Complete Setup"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
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

      <div className="grid gap-6 md:grid-cols-2">
        {employeeTaxForms.map((form) => (
          <Card key={form.id} className="hover:shadow-md transition-shadow">
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
