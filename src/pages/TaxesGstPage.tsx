
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { FileText, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaxesGstPage = () => {
  return (
    <MainLayout>
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center py-16">
        <FileText className="w-14 h-14 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">GST (Goods and Services Tax)</h2>
        <p className="text-muted-foreground text-center mb-4">
          All your GST return filings in one place. Add your GST registrations to get started.
        </p>
        <Button>
          <FilePlus className="w-4 h-4 mr-1" />
          Get Started with GST
        </Button>
      </div>
    </MainLayout>
  );
};

export default TaxesGstPage;
