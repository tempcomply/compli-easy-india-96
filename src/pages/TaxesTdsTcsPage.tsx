
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Landmark, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaxesTdsTcsPage = () => {
  return (
    <MainLayout>
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center py-16">
        <Landmark className="w-14 h-14 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">TDS & TCS</h2>
        <p className="text-muted-foreground text-center mb-4">
          Manage your Tax Deducted/Collected at Source filings. Add details to get started.
        </p>
        <Button>
          <FilePlus className="w-4 h-4 mr-1" />
          Get Started with TDS & TCS
        </Button>
      </div>
    </MainLayout>
  );
};

export default TaxesTdsTcsPage;
