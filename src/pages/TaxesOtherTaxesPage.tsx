
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Play } from 'lucide-react';
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
  const [setupOpen, setSetupOpen] = useState(false);
  const [formData, setFormData] = useState({
    taxType: '',
    registrationNo: '',
    description: '',
  });
  
  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSetup(true);
    setSetupOpen(false);
    toast({ title: "Other Tax Setup Complete", description: "You can now manage miscellaneous tax compliance." });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-8">
              <Play className="mr-2 h-5 w-5" />
              Get Started with Other Taxes
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Other Tax Setup
              </DialogTitle>
              <DialogDescription>
                Add other tax registration details to begin.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSetupSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taxType">Tax Type</Label>
                <Input
                  id="taxType"
                  placeholder="Enter tax type"
                  value={formData.taxType}
                  onChange={(e) => handleInputChange('taxType', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNo">Registration Number</Label>
                <Input
                  id="registrationNo"
                  placeholder="Enter registration number"
                  value={formData.registrationNo}
                  onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
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
        <h2 className="text-2xl font-bold">Other Tax Compliance</h2>
        <p className="text-muted-foreground">Manage miscellaneous and specialized tax obligations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
