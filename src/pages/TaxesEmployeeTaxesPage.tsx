
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";

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
  const [setupOpen, setSetupOpen] = useState(false);
  const [formData, setFormData] = useState({
    pfCode: '',
    esiCode: '',
    ptState: '',
  });
  
  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSetup(true);
    setSetupOpen(false);
    toast({ title: "Employee Tax Setup Complete", description: "You can now manage employee tax compliance." });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-8">
              <Play className="mr-2 h-5 w-5" />
              Get Started with Employee Taxes
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employee Taxes Setup
              </DialogTitle>
              <DialogDescription>
                Setup your employee-related tax details to begin.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSetupSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pfCode">PF Establishment Code</Label>
                <Input
                  id="pfCode"
                  placeholder="Enter PF establishment code"
                  value={formData.pfCode}
                  onChange={(e) => handleInputChange('pfCode', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="esiCode">ESI Number</Label>
                <Input
                  id="esiCode"
                  placeholder="Enter ESI number"
                  value={formData.esiCode}
                  onChange={(e) => handleInputChange('esiCode', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ptState">PT State</Label>
                <Input
                  id="ptState"
                  placeholder="Enter PT state"
                  value={formData.ptState}
                  onChange={(e) => handleInputChange('ptState', e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setSetupOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Complete Setup
                </Button>
              </div>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
