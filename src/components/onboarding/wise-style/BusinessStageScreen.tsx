import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, FileText, ArrowRight, ChevronLeft } from 'lucide-react';

type BusinessStage = 'incorporate' | 'existing' | null;

type BusinessStageProps = {
  onSelect: (stage: 'incorporate' | 'existing') => void;
  onBack: () => void;
};

export const BusinessStageScreen = ({ onSelect, onBack }: BusinessStageProps) => {
  const [selected, setSelected] = useState<BusinessStage>(null);

  const handleContinue = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl space-y-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Let's get to know your business stage</h1>
          <p className="text-muted-foreground">
            We'll tailor the setup based on your choice
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className={`p-8 cursor-pointer transition-all hover:shadow-lg ${
              selected === 'incorporate' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelected('incorporate')}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-full bg-primary/10">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                {selected === 'incorporate' && (
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Incorporate a New Company</h3>
                <p className="text-sm text-muted-foreground">
                  Start from scratch and register your new business with our expert guidance
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-8 cursor-pointer transition-all hover:shadow-lg ${
              selected === 'existing' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelected('existing')}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                {selected === 'existing' && (
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Already Have a Company</h3>
                <p className="text-sm text-muted-foreground">
                  Already registered? Let us manage your compliance and filings seamlessly
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selected}
            className="min-w-[200px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
