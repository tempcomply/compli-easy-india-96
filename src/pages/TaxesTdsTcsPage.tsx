
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Landmark, Play } from 'lucide-react';
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

const tdsTcsForms = [
  {
    id: 'form24q',
    name: 'Form 24Q',
    description: 'Quarterly TDS return for tax deducted on salary payments',
    frequency: 'Quarterly',
    importance: 'high',
  },
  {
    id: 'form26q',
    name: 'Form 26Q',
    description: 'Quarterly TDS return for tax deducted on payments other than salary',
    frequency: 'Quarterly',
    importance: 'high',
  },
  {
    id: 'form27q',
    name: 'Form 27Q',
    description: 'Quarterly TCS return for tax collected at source',
    frequency: 'Quarterly',
    importance: 'medium',
  },
  {
    id: 'form27eq',
    name: 'Form 27EQ',
    description: 'Quarterly TDS return for tax deducted on e-commerce transactions',
    frequency: 'Quarterly',
    importance: 'medium',
  }
];

const TaxesTdsTcsPage = () => {
  const [isSetup, setIsSetup] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [formData, setFormData] = useState({
    tan: '',
    deductorName: '',
    pinCode: '',
  });
  
  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSetup(true);
    setSetupOpen(false);
    toast({ title: "TDS/TCS Setup Complete", description: "You can now file returns and make payments." });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const EmptyState = () => (
    <div className="text-center py-16 space-y-6">
      <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
        <Landmark className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">TDS/TCS Compliance Made Easy</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Set up your TDS and TCS compliance system. We'll help you file quarterly returns and manage deductions efficiently.
        </p>
      </div>
      <div className="space-y-4">
        <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-8">
              <Play className="mr-2 h-5 w-5" />
              Get Started with TDS/TCS
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5" />
                TDS/TCS Setup
              </DialogTitle>
              <DialogDescription>
                Add below details to initiate TDS & TCS filings.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSetupSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tan">TAN</Label>
                <Input
                  id="tan"
                  placeholder="Enter your TAN"
                  value={formData.tan}
                  onChange={(e) => handleInputChange('tan', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deductorName">Deductor Name</Label>
                <Input
                  id="deductorName"
                  placeholder="Enter deductor name"
                  value={formData.deductorName}
                  onChange={(e) => handleInputChange('deductorName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pinCode">Office PIN Code</Label>
                <Input
                  id="pinCode"
                  placeholder="Enter office PIN code"
                  value={formData.pinCode}
                  onChange={(e) => handleInputChange('pinCode', e.target.value)}
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
        <h2 className="text-2xl font-bold">TDS/TCS Return Forms</h2>
        <p className="text-muted-foreground">Select the appropriate form to file your TDS/TCS return</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {tdsTcsForms.map((form) => (
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
                  { name: "quarter", label: "Quarter (e.g. Q1 FY24-25)", required: true },
                  { name: "deduction_amount", label: "Total Deduction Amount", required: true, type: "number" }
                ]}
                paymentFields={[
                  { name: "tax_amount", label: "Tax Amount (INR)", required: true, type: "number" },
                  { name: "challan_no", label: "Challan Number", type: "text" }
                ]}
                onPay={(data) => {
                  console.log(`Filing ${form.name} with data:`, data);
                  toast({ title: "Return Filed Successfully", description: `${form.name} has been filed.` });
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
            TDS/TCS
          </h1>
          <p className="text-muted-foreground">
            Tax Deducted at Source and Tax Collected at Source compliance
          </p>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesTdsTcsPage;
