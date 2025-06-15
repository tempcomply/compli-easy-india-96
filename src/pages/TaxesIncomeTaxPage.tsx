
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Receipt, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaxesIncomeTaxPage = () => {
  return (
    <MainLayout>
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center py-16">
        <Receipt className="w-14 h-14 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Income Tax</h2>
        <p className="text-muted-foreground text-center mb-4">
          Advance tax, Self-assessment, ITR & Regular Assessments. Add an assessment year to get started.
        </p>
        <Button>
          <FilePlus className="w-4 h-4 mr-1" />
          Get Started with Income Tax
        </Button>
      </div>
    </MainLayout>
  );
};

export default TaxesIncomeTaxPage;
