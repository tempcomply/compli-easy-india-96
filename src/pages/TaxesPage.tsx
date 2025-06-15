
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Receipt, 
  Landmark, 
  Users, 
  Banknote, 
  Building2, 
  FilePlus
} from 'lucide-react';

const taxCategories = [
  {
    key: 'gst',
    label: 'GST',
    icon: FileText,
    description: 'Goods and Services Tax return filings.',
  },
  {
    key: 'tds-tcs',
    label: 'TDS & TCS',
    icon: Landmark,
    description: 'Tax Deducted/Collected at Source filings.',
  },
  {
    key: 'income-tax',
    label: 'Income Tax',
    icon: Receipt,
    description: 'Advance, Self-assessment, ITR & Regular Assessments.',
  },
  {
    key: 'employee-taxes',
    label: 'Employee-related Taxes',
    icon: Users,
    description: 'PF, ESI, Professional Tax, etc.',
  },
  {
    key: 'state-local',
    label: 'State & Local Taxes',
    icon: Building2,
    description: 'State specific, local body taxes, etc.',
  },
  {
    key: 'other-taxes',
    label: 'Other Taxes',
    icon: Banknote,
    description: 'Excise, Customs, and miscellaneous.',
  },
];


const EmptyCategoryState = ({
  icon: Icon,
  title,
  description,
  onAction,
  actionLabel = "Get Started",
}: {
  icon: React.ElementType,
  title: string,
  description: string,
  onAction?: () => void,
  actionLabel?: string,
}) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-3">
    <div className="mb-2">
      <Icon className="w-12 h-12 text-muted-foreground" />
    </div>
    <h2 className="font-semibold text-xl">{title}</h2>
    <div className="text-muted-foreground text-center max-w-md">{description}</div>
    {onAction && (
      <Button className="mt-3" onClick={onAction}>
        <FilePlus className="w-4 h-4 mr-2" />
        {actionLabel}
      </Button>
    )}
  </div>
);

const TaxesPage = () => {
  // For now, all tabs show just an empty state per category.
  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Receipt className="w-8 h-8" />
          Taxes & Filings
        </h1>
        <p className="text-muted-foreground mb-6 max-w-xl">
          Track, initiate, and file all your Indian business tax obligations from one place. Select a category to get started.
        </p>

        <Tabs defaultValue="gst" className="w-full">
          <TabsList className="mb-4 flex flex-wrap gap-2">
            {taxCategories.map(cat => (
              <TabsTrigger key={cat.key} value={cat.key} className="flex items-center gap-2 px-4 py-2">
                <cat.icon className="w-5 h-5" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {taxCategories.map(cat => (
            <TabsContent key={cat.key} value={cat.key}>
              <EmptyCategoryState
                icon={cat.icon}
                title={cat.label}
                description={cat.description}
                // Placeholder: you can attach onAction logic later
                onAction={() => { /* future: open dialog or navigate */}}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TaxesPage;
