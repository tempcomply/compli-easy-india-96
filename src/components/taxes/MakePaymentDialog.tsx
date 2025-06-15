
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface PaymentDialogProps {
  triggerLabel?: string;
  fields: { name: string; label: string; required?: boolean; type?: string }[];
  paymentFields?: { name: string; label: string; required?: boolean; type?: string }[];
  onPay?: (data: Record<string, string>) => void;
}

const MakePaymentDialog: React.FC<PaymentDialogProps> = ({
  triggerLabel = "Make Payment",
  fields,
  paymentFields = [
    { name: "amount", label: "Amount (INR)", required: true, type: "number" },
    { name: "payment_mode", label: "Payment Mode", type: "text" },
    { name: "reference", label: "Reference No.", type: "text" },
  ],
  onPay,
}) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const basicForm = useForm();
  const paymentForm = useForm();

  function handleBasicSubmit(data: any) {
    setStep(1);
  }

  function handlePaymentSubmit(data: any) {
    if (onPay) {
      onPay({ ...basicForm.getValues(), ...data });
    }
    setTimeout(() => {
      setOpen(false);
      setStep(0);
      basicForm.reset();
      paymentForm.reset();
    }, 1500);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full md:w-auto">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 0 ? "Enter Basic Details" : "Payment Details"}
          </DialogTitle>
          <DialogDescription>
            {step === 0
              ? "Enter necessary info before making payment."
              : "Fill in payment amount and details to proceed."}
          </DialogDescription>
        </DialogHeader>

        {step === 0 ? (
          <form
            className="flex flex-col gap-4 py-2"
            onSubmit={basicForm.handleSubmit(handleBasicSubmit)}
          >
            {fields.map(f => (
              <div key={f.name} className="flex flex-col gap-1">
                <label className="text-sm font-medium" htmlFor={f.name}>
                  {f.label}
                </label>
                <Input
                  id={f.name}
                  type={f.type || "text"}
                  {...basicForm.register(f.name, { required: !!f.required })}
                  required={!!f.required}
                />
              </div>
            ))}
            <DialogFooter>
              <Button type="submit">Next</Button>
            </DialogFooter>
          </form>
        ) : (
          <form
            className="flex flex-col gap-4 py-2"
            onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)}
          >
            {paymentFields.map(f => (
              <div key={f.name} className="flex flex-col gap-1">
                <label className="text-sm font-medium" htmlFor={f.name}>
                  {f.label}
                </label>
                <Input
                  id={f.name}
                  type={f.type || "text"}
                  {...paymentForm.register(f.name, { required: !!f.required })}
                  required={!!f.required}
                />
              </div>
            ))}
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button type="submit">Pay</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MakePaymentDialog;

