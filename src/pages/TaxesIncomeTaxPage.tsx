
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Receipt, Play } from 'lucide-react';
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

const incomeTaxForms = [
  {
    id: 'itr1',
    name: 'ITR-1 (Sahaj)',
    description: 'For individuals having income from salary, one house property and other sources',
    frequency: 'Annual',
    importance: 'high',
  },
  {
    id: 'itr2',
    name: 'ITR-2',
    description: 'For individuals and HUFs not having income from business or profession',
    frequency: 'Annual',
    importance: 'high',
  },
  {
    id: 'itr3',
    name: 'ITR-3',
    description: 'For individuals and HUFs having income from business or profession',
    frequency: 'Annual',
    importance: 'medium',
  },
  {
    id: 'itr4',
    name: 'ITR-4 (Sugam)',
    description: 'For individuals, HUFs and firms being a presumptive income',
    frequency: 'Annual',
    importance: 'medium',
  }
];

const TaxesIncomeTaxPage = () => {
  const [isSetup, setIsSetup] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [formData, setFormData] = useState({
    pan: '',
    assessmentYear: '',
    mobile: '',
  });
  
  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSetup(true);
    setSetupOpen(false);
    toast({ title: "Income Tax Setup Complete", description: "You can now file your returns and make payments." });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const EmptyState = () => (
    <div className="text-center py-16 space-y-6">
      <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
        <Receipt className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Income Tax Filing Made Simple</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Get started with your Income Tax compliance. We'll guide you through the setup process and help you file your returns on time.
        </p>
      </div>
      <div className="space-y-4">
        <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-8">
              <Play className="mr-2 h-5 w-5" />
              Get Started with Income Tax
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Income Tax Setup
              </DialogTitle>
              <DialogDescription>
                Provide below details to start Income Tax return filings.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSetupSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pan">PAN</Label>
                <Input
                  id="pan"
                  placeholder="Enter your PAN"
                  value={formData.pan}
                  onChange={(e) => handleInputChange('pan', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assessmentYear">Assessment Year</Label>
                <Input
                  id="assessmentYear"
                  placeholder="Enter assessment year"
                  value={formData.assessmentYear}
                  onChange={(e) => handleInputChange('assessmentYear', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Contact Mobile</Label>
                <Input
                  id="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
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
        <h2 className="text-2xl font-bold">Income Tax Return Forms</h2>
        <p className="text-muted-foreground">Select the appropriate ITR form to file your return</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {incomeTaxForms.map((form) => (
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
                  { name: "assessment_year", label: "Assessment Year", required: true },
                  { name: "income_amount", label: "Total Income", required: true, type: "number" }
                ]}
                paymentFields={[
                  { name: "tax_amount", label: "Tax Amount (INR)", required: true, type: "number" },
                  { name: "payment_mode", label: "Payment Mode", type: "text" }
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
            <Receipt className="h-8 w-8 text-blue-600" />
            Income Tax
          </h1>
          <p className="text-muted-foreground">
            Income Tax return filing and compliance
          </p>
        </div>

        {!isSetup ? <EmptyState /> : <SetupComplete />}
      </div>
    </MainLayout>
  );
};

export default TaxesIncomeTaxPage;
