
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Building2, Banknote } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const STATE_TAX_FIELDS = [
  { name: "registration_no", label: "Registration Number" },
  { name: "tax_type", label: "Tax Type" },
  { name: "region", label: "Region/State" },
];

const PAYMENT_FIELDS = [
  { name: "registration_no", label: "Registration Number", required: true },
  { name: "tax_type", label: "Tax Type", required: true },
];

const TaxesStateLocalPage = () => {
  const [isSetup, setIsSetup] = useState(false);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 py-12">

        <GetStartedCard
          icon={<Building2 className="w-8 h-8 text-primary" />}
          title="State/Local Tax Setup"
          subtitle="Add registration and region to start tracking these taxes."
          fields={STATE_TAX_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "State/Local Tax Setup Complete", description: "You can now make payments." });
          }}
        />

        <Card className="w-full max-w-lg shadow-sm animate-fade-in">
          <CardContent className="p-6 flex flex-col gap-6 items-center">
            <Banknote className="w-8 h-8 text-green-600" />
            <div className="text-lg font-semibold">Make a State/Local Tax Payment</div>
            <MakePaymentDialog
              triggerLabel="Make State/Local Tax Payment"
              fields={PAYMENT_FIELDS}
              onPay={() => toast({ title: "Payment Initiated", description: "State/local tax payment details captured." })}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TaxesStateLocalPage;
