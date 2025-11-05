import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ComplianceOverviewProps = {
  onBack: () => void;
  onContinue: () => void;
};

const COMPLIANCES = [
  {
    name: 'Annual Return Filing',
    frequency: 'Annual',
    associatedWith: 'Entity (Pvt Ltd)',
    description: 'Mandatory annual filing under Companies Act, 2013',
    category: 'Entity'
  },
  {
    name: 'Board Meetings',
    frequency: 'Quarterly',
    associatedWith: 'Entity (Pvt Ltd)',
    description: 'Minimum 4 board meetings required per year',
    category: 'Entity'
  },
  {
    name: 'GST Return Filing',
    frequency: 'Monthly',
    associatedWith: 'GST Registration',
    description: 'Monthly GST returns (GSTR-1, GSTR-3B)',
    category: 'Tax'
  },
  {
    name: 'Income Tax Filing',
    frequency: 'Annual',
    associatedWith: 'PAN',
    description: 'Annual income tax return filing',
    category: 'Tax'
  },
  {
    name: 'TDS Return Filing',
    frequency: 'Quarterly',
    associatedWith: 'TAN',
    description: 'Quarterly TDS return filing',
    category: 'Tax'
  },
  {
    name: 'Audit (if applicable)',
    frequency: 'Annual',
    associatedWith: 'Entity',
    description: 'Annual statutory audit based on turnover',
    category: 'Entity'
  }
];

export const ComplianceOverviewScreen = ({ onBack, onContinue }: ComplianceOverviewProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl space-y-6">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Your Compliance & Filing Overview</h1>
          <p className="text-muted-foreground">
            Here's what you'll need to manage based on your company structure
          </p>
        </div>

        <div className="grid gap-4">
          {COMPLIANCES.map((compliance, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{compliance.name}</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{compliance.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground">
                      <span className="font-medium">Frequency:</span> {compliance.frequency}
                    </span>
                    <span className="text-muted-foreground">
                      <span className="font-medium">Linked with:</span> {compliance.associatedWith}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {compliance.category}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <Button size="lg" onClick={onContinue} className="min-w-[250px]">
            Continue to Provider Selection
          </Button>
        </div>
      </div>
    </div>
  );
};
