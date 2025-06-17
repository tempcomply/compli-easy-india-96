
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Users, Banknote } from 'lucide-react';
import GetStartedCard from '@/components/taxes/GetStartedCard';
import MakePaymentDialog from '@/components/taxes/MakePaymentDialog';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const EMPLOYEE_TAX_FIELDS = [
  { name: "pf_code", label: "PF Establishment Code" },
  { name: "esi_code", label: "ESI Number" },
  { name: "pt_state", label: "PT State" },
];

const PAYMENT_FIELDS = [
  { name: "pf_code", label: "PF Code", required: true },
  { name: "month", label: "Month", required: true },
];

const TaxesEmployeeTaxesPage = () => {
  const [isSetup, setIsSetup] = useState(false);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 py-12">

        <GetStartedCard
          icon={<Users className="w-8 h-8 text-primary" />}
          title="Employee Taxes Setup"
          subtitle="Setup your employee-related tax details to begin."
          fields={EMPLOYEE_TAX_FIELDS}
          isComplete={isSetup}
          onSubmit={() => {
            setIsSetup(true);
            toast({ title: "Employee Tax Setup Complete", description: "You can now make payments." });
          }}
        />

        <Card className="w-full max-w-lg shadow-sm animate-fade-in">
          <CardContent className="p-6 flex flex-col gap-6 items-center">
            <Banknote className="w-8 h-8 text-green-600" />
            <div className="text-lg font-semibold">Make a PF/ESI/PT Payment</div>
            <MakePaymentDialog
              triggerLabel="Make Employee Tax Payment"
              fields={PAYMENT_FIELDS}
              onPay={() => toast({ title: "Payment Initiated", description: "Employee tax payment details captured." })}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TaxesEmployeeTaxesPage;
