
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Banknote as NoteIcon, FileText, Banknote } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const OTHER_TAX_FIELDS = [
  { name: "tax_type", label: "Tax Type" },
  { name: "registration_no", label: "Registration Number" },
  { name: "description", label: "Description" },
];

const PAYMENT_FIELDS = [
  { name: "tax_type", label: "Tax Type", required: true },
  { name: "period", label: "Period", required: true },
];

const TaxesOtherTaxesPage = () => {
  const [isSetup, setIsSetup] = useState(false);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 py-12">

        <GetStartedCard
          icon={<NoteIcon className="w-8 h-8 text-primary" />}
          title="Other Tax Setup"
          subtitle="Add other tax registration details to begin."
          fields={OTHER_TAX_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "Other Tax Setup Complete", description: "You can now make payments." });
          }}
        />

        <Card className="w-full max-w-lg shadow-sm animate-fade-in">
          <CardContent className="p-6 flex flex-col gap-6 items-center">
            <Banknote className="w-8 h-8 text-green-600" />
            <div className="text-lg font-semibold">Make a Miscellaneous Tax Payment</div>
            <MakePaymentDialog
              triggerLabel="Make Other Tax Payment"
              fields={PAYMENT_FIELDS}
              onPay={() => toast({ title: "Payment Initiated", description: "Other tax payment details captured." })}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TaxesOtherTaxesPage;
