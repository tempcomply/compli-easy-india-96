
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Receipt, 
  Landmark, 
  Users, 
  Banknote, 
  Building2 
} from 'lucide-react';

// List tax categories with route keys for navigation
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

// Helper for base path (adapt for client/professional as needed)
function useTaxesBasePath() {
  // Could derive from location/params if necessary
  return '/client/taxes';
}

const TaxesPage = () => {
  const navigate = useNavigate();
  const basePath = useTaxesBasePath();

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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {taxCategories.map(cat => (
            <div
              key={cat.key}
              className="bg-card border rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col items-stretch"
              onClick={() => navigate(`${basePath}/${cat.key}`)}
              role="button"
              tabIndex={0}
            >
              <div className="flex flex-row items-center gap-3 px-6 pt-6">
                <cat.icon className="w-10 h-10 text-muted-foreground" />
                <span className="text-xl font-semibold">{cat.label}</span>
              </div>
              <div className="px-6 py-2 text-muted-foreground flex-1">{cat.description}</div>
              <div className="px-6 pb-4 pt-2 flex">
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`${basePath}/${cat.key}`);
                  }}
                  className="ml-auto"
                  size="sm"
                  variant="secondary"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TaxesPage;
