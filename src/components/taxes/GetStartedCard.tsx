
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface Field {
  name: string;
  label: string;
  type?: string;
}

interface GetStartedCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  fields: Field[];
  onSubmit?: (data: Record<string, string>) => void;
  isComplete?: boolean;
}

const GetStartedCard: React.FC<GetStartedCardProps> = ({
  icon,
  title,
  subtitle,
  fields,
  onSubmit,
  isComplete = false,
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const handleCardSubmit = handleSubmit(data => {
    if (onSubmit) onSubmit(data);
  });

  return (
    <Card className="w-full max-w-lg mx-auto mb-8 animate-fade-in shadow-md">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="shrink-0 bg-primary/10 p-3 rounded-lg">{icon}</div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        </div>
      </CardHeader>
      <CardContent>
        {isComplete ? (
          <div className="text-green-600 font-medium">
            Setup Complete! You can now make payments.
          </div>
        ) : (
          <form className="flex flex-col gap-4 mt-3" onSubmit={handleCardSubmit}>
            {fields.map(f => (
              <div key={f.name} className="flex flex-col gap-1">
                <label className="font-medium text-sm" htmlFor={f.name}>
                  {f.label}
                </label>
                <Input
                  id={f.name}
                  type={f.type || "text"}
                  {...register(f.name, { required: true })}
                  disabled={isSubmitting}
                />
                {errors[f.name] && (
                  <span className="text-xs text-red-500">Required</span>
                )}
              </div>
            ))}
            <Button type="submit" className="mt-2" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save & Continue"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default GetStartedCard;

