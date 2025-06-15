
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Banknote, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaxesOtherTaxesPage = () => {
  return (
    <MainLayout>
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center py-16">
        <Banknote className="w-14 h-14 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Other Taxes</h2>
        <p className="text-muted-foreground text-center mb-4">
          Excise, Customs, and miscellaneous. Add details for these taxes to get started.
        </p>
        <Button>
          <FilePlus className="w-4 h-4 mr-1" />
          Get Started with Other Taxes
        </Button>
      </div>
    </MainLayout>
  );
};

export default TaxesOtherTaxesPage;
