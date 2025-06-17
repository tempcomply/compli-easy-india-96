
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
    color: 'from-blue-500/10 to-blue-600/20',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    key: 'income-tax',
    label: 'Income Tax',
    icon: Receipt,
    description: 'Advance tax, Self-assessment, ITR & Regular Assessments in one place.',
    color: 'from-green-500/10 to-green-600/20',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
  },
  {
    key: 'tds-tcs',
    label: 'TDS & TCS',
    icon: Landmark,
    description: 'Manage Tax Deducted/Collected at Source (TDS & TCS) filings.',
    color: 'from-purple-500/10 to-purple-600/20',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    key: 'employee-taxes',
    label: 'Employee-related Taxes',
    icon: Users,
    description: 'Handle PF, ESI, Professional Tax, and other employee taxes.',
    color: 'from-orange-500/10 to-orange-600/20',
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-600',
  },
  {
    key: 'state-local',
    label: 'State & Local Taxes',
    icon: Building2,
    description: 'Track state-specific and local body tax registrations and obligations.',
    color: 'from-indigo-500/10 to-indigo-600/20',
    borderColor: 'border-indigo-200',
    iconColor: 'text-indigo-600',
  },
  {
    key: 'other-taxes',
    label: 'Other Taxes',
    icon: Banknote,
    description: 'Excise, customs, and other miscellaneous business tax filings.',
    color: 'from-gray-500/10 to-gray-600/20',
    borderColor: 'border-gray-200',
    iconColor: 'text-gray-600',
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
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {taxCategories.map((cat) => (
            <div
              key={cat.key}
              className="cursor-pointer"
              onClick={() => navigate(`${basePath}/${cat.key}`)}
            >
              <div className={`
                p-6 
                bg-gradient-to-br ${cat.color} 
                border ${cat.borderColor} 
                rounded-lg 
                hover:shadow-md 
                transition-shadow duration-200 
                flex flex-col 
                space-y-4
              `}>
                <div className={`
                  p-2 rounded-lg bg-white/80 w-fit
                `}>
                  <cat.icon className={`w-6 h-6 ${cat.iconColor}`} />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-lg font-semibold ${cat.iconColor}`}>
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
