
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Receipt, Banknote } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const IT_FIELDS = [
  { name: "pan", label: "PAN" },
  { name: "assess_year", label: "Assessment Year" },
  { name: "mobile", label: "Contact Mobile" }
];

const PAYMENT_FIELDS = [
  { name: "pan", label: "PAN", required: true },
  { name: "assessment_year", label: "Assessment Year", required: true },
];

const TaxesIncomeTaxPage = () => {
  const [isSetup, setIsSetup] = useState(false);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 py-12">

        <GetStartedCard
          icon={<Receipt className="w-8 h-8 text-primary" />}
          title="Income Tax Setup"
          subtitle="Provide below to start Income Tax return filings."
          fields={IT_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "Income Tax Setup Complete", description: "You can now make Income Tax payments." });
          }}
        />

        <Card className="w-full max-w-lg shadow-sm animate-fade-in">
          <CardContent className="p-6 flex flex-col gap-6 items-center">
            <Banknote className="w-8 h-8 text-green-600" />
            <div className="text-lg font-semibold">Make Income Tax Payment</div>
            <MakePaymentDialog
              triggerLabel="Make Income Tax Payment"
              fields={PAYMENT_FIELDS}
              onPay={() => toast({ title: "Payment Initiated", description: "Income tax payment details captured." })}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TaxesIncomeTaxPage;

