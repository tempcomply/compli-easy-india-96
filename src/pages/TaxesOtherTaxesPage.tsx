import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";

const OTHER_TAX_FIELDS = [
  { name: "tax_type", label: "Tax Type", type: "text" },
  { name: "registration_no", label: "Registration Number", type: "text" },
  { name: "description", label: "Description", type: "text" },
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
  const [isSetupDialogOpen, setIsSetupDialogOpen] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  
  const handleSetupSubmit = handleSubmit((data) => {
    console.log('Other Tax setup data:', data);
    setIsSetup(true);
    setIsSetupDialogOpen(false);
    toast({ title: "Other Tax Setup Complete", description: "You can now manage miscellaneous tax compliance." });
  });

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
        <Dialog open={isSetupDialogOpen} onOpenChange={setIsSetupDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <FileText className="w-5 h-5" />
              Get Started
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Other Tax Setup
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSetupSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add other tax registration details to begin.
              </p>
              {OTHER_TAX_FIELDS.map((field) => (
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
        <h2 className="text-2xl font-bold">Other Tax Compliance</h2>
        <p className="text-muted-foreground">Manage miscellaneous and specialized tax obligations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {otherTaxTypes.map((tax) => (
          <Card key={tax.id} className="hover:shadow-md transition-shadow">
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
