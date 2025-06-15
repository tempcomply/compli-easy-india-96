
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { FileText } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Banknote } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const GST_FIELDS = [
  { name: "gstin", label: "GSTIN" },
  { name: "legal_name", label: "Legal Name" },
  { name: "reg_address", label: "Registered Address" }
];

const PAYMENT_FIELDS = [
  { name: "gstin", label: "GSTIN", required: true },
  { name: "period", label: "Period (e.g. Apr 2025)", required: true },
];

const TaxesGstPage = () => {
  const [isSetup, setIsSetup] = useState(false);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 py-12">

        <GetStartedCard
          icon={<FileText className="w-8 h-8 text-primary" />}
          title="GST Setup"
          subtitle="Get started by providing your GST registration details."
          fields={GST_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "GST Setup Complete", description: "You can now make GST payments." });
          }}
        />

        <Card className="w-full max-w-lg shadow-sm animate-fade-in">
          <CardContent className="p-6 flex flex-col gap-6 items-center">
            <Banknote className="w-8 h-8 text-green-600" />
            <div className="text-lg font-semibold">Make a GST Payment</div>
            <MakePaymentDialog
              triggerLabel="Make GST Payment"
              fields={PAYMENT_FIELDS}
              onPay={() => toast({ title: "Payment Initiated", description: "GST payment details captured." })}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TaxesGstPage;

