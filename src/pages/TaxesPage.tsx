
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import {
  FileText,
  Receipt,
  Landmark,
  Users,
  Banknote,
  Building2,
} from 'lucide-react';

const taxCategories = [
  {
    key: 'gst',
    label: 'GST',
    icon: FileText,
    description: 'File your Goods and Services Tax (GST) returns.',
    importance: 'high',
  },
  {
    key: 'income-tax',
    label: 'Income Tax',
    icon: Receipt,
    description: 'Advance tax, Self-assessment, ITR & Regular Assessments in one place.',
    importance: 'high',
  },
  {
    key: 'tds-tcs',
    label: 'TDS & TCS',
    icon: Landmark,
    description: 'Manage Tax Deducted/Collected at Source (TDS & TCS) filings.',
    importance: 'medium',
  },
  {
    key: 'employee-taxes',
    label: 'Employee-related Taxes',
    icon: Users,
    description: 'Handle PF, ESI, Professional Tax, and other employee taxes.',
    importance: 'medium',
  },
  {
    key: 'state-local',
    label: 'State & Local Taxes',
    icon: Building2,
    description: 'Track state-specific and local body tax registrations and obligations.',
    importance: 'low',
  },
  {
    key: 'other-taxes',
    label: 'Other Taxes',
    icon: Banknote,
    description: 'Excise, customs, and other miscellaneous business tax filings.',
    importance: 'low',
  },
];

function useTaxesBasePath() {
  return '/client/taxes';
}

const TaxesPage = () => {
  const navigate = useNavigate();
  const basePath = useTaxesBasePath();

  const getCardSize = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'md:col-span-2';
      case 'medium':
        return 'md:col-span-1';
      case 'low':
        return 'md:col-span-1';
      default:
        return 'md:col-span-1';
    }
  };

  return (
    <MainLayout>
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Receipt className="w-10 h-10 text-primary" />
            Taxes & Filings
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Manage every major Indian business tax from a single dashboard. Click a tax type to view or initiate filings.
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {taxCategories.map((cat) => (
            <div
              key={cat.key}
              className={`cursor-pointer ${getCardSize(cat.importance)}`}
              onClick={() => navigate(`${basePath}/${cat.key}`)}
            >
              <div className="p-6 bg-card border rounded-lg hover:shadow-md transition-shadow duration-200 flex flex-col space-y-4 h-full">
                <div className="p-2 rounded-lg bg-muted w-fit">
                  <cat.icon className="w-6 h-6 text-foreground" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default TaxesPage;
