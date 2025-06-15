
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Landmark, Banknote } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const TDS_FIELDS = [
  { name: "tan", label: "TAN" },
  { name: "deductor_name", label: "Deductor Name" },
  { name: "pin_code", label: "Office PIN Code" }
];

const PAYMENT_FIELDS = [
  { name: "tan", label: "TAN", required: true },
  { name: "quarter", label: "Quarter (e.g. Q1 FY24-25)", required: true },
];

const TaxesTdsTcsPage = () => {
  const [isSetup, setIsSetup] = useState(false);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 py-12">

        <GetStartedCard
          icon={<Landmark className="w-8 h-8 text-primary" />}
          title="TDS/TCS Setup"
          subtitle="Add below details to initiate TDS & TCS filings."
          fields={TDS_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "TDS/TCS Setup Complete", description: "You can now make TDS & TCS payments." });
          }}
        />

        <Card className="w-full max-w-lg shadow-sm animate-fade-in">
          <CardContent className="p-6 flex flex-col gap-6 items-center">
            <Banknote className="w-8 h-8 text-green-600" />
            <div className="text-lg font-semibold">Make a TDS/TCS Payment</div>
            <MakePaymentDialog
              triggerLabel="Make TDS/TCS Payment"
              fields={PAYMENT_FIELDS}
              onPay={() => toast({ title: "Payment Initiated", description: "TDS/TCS payment details captured." })}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TaxesTdsTcsPage;

