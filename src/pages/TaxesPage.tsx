
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import TaxCategoryCard from '@/components/TaxCategoryCard';
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
    cta: 'View GST',
  },
  {
    key: 'tds-tcs',
    label: 'TDS & TCS',
    icon: Landmark,
    description: 'Manage Tax Deducted/Collected at Source (TDS & TCS) filings.',
    cta: 'View TDS & TCS',
  },
  {
    key: 'income-tax',
    label: 'Income Tax',
    icon: Receipt,
    description:
      'Advance tax, Self-assessment, ITR & Regular Assessments in one place.',
    cta: 'View Income Tax',
  },
  {
    key: 'employee-taxes',
    label: 'Employee-related Taxes',
    icon: Users,
    description: 'Handle PF, ESI, Professional Tax, and other employee taxes.',
    cta: 'View Employee Taxes',
  },
  {
    key: 'state-local',
    label: 'State & Local Taxes',
    icon: Building2,
    description:
      'Track state-specific and local body tax registrations and obligations.',
    cta: 'View State/Local Taxes',
  },
  {
    key: 'other-taxes',
    label: 'Other Taxes',
    icon: Banknote,
    description:
      'Excise, customs, and other miscellaneous business tax filings.',
    cta: 'View Other Taxes',
  },
];

function useTaxesBasePath() {
  return '/client/taxes';
}

const TaxesPage = () => {
  const navigate = useNavigate();
  const basePath = useTaxesBasePath();

  return (
    <MainLayout>
      <section>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Receipt className="w-8 h-8 text-primary" />
            Taxes & Filings
          </h1>
          <p className="text-muted-foreground mb-1 max-w-2xl text-base">
            Manage every major Indian business tax from a single dashboard. Click a tax type to view or initiate filings.
          </p>
        </div>
        <div className="grid gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {taxCategories.map(cat => (
            <TaxCategoryCard
              key={cat.key}
              icon={cat.icon}
              label={cat.label}
              description={cat.description}
              cta={cat.cta}
              onClick={() => navigate(`${basePath}/${cat.key}`)}
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default TaxesPage;
