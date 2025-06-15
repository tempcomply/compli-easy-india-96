
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Building2, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaxesStateLocalPage = () => {
  return (
    <MainLayout>
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center py-16">
        <Building2 className="w-14 h-14 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">State & Local Taxes</h2>
        <p className="text-muted-foreground text-center mb-4">
          State specific, local body taxes, etc. Add a registration to begin tracking state/local taxes.
        </p>
        <Button>
          <FilePlus className="w-4 h-4 mr-1" />
          Get Started with State/Local Taxes
        </Button>
      </div>
    </MainLayout>
  );
};

export default TaxesStateLocalPage;
