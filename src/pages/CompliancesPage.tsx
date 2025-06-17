import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Building, Shield, Home, FileText } from 'lucide-react';
import AddAssetDialog from '@/components/compliances/AddAssetDialog';
import ComplianceCategoryDialog from '@/components/compliances/ComplianceCategoryDialog';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  status: 'pending' | 'filed' | 'completed';
  frequency?: string;
}

const CompliancesPage = () => {
  // Sample data for different compliance categories
  const [companyCompliances, setCompanyCompliances] = useState<ComplianceItem[]>([
    {
      id: '1',
      title: 'Annual Return Filing',
      description: 'Submit annual return to Registrar of Companies',
      dueDate: '2024-12-31',
      status: 'pending',
      frequency: 'Annual'
    },
    {
      id: '2',
      title: 'Board Meeting Minutes',
      description: 'Quarterly board meeting documentation',
      dueDate: '2024-03-31',
      status: 'completed',
      frequency: 'Quarterly'
    }
  ]);

  const [licenceCompliances, setLicenceCompliances] = useState<ComplianceItem[]>([
    {
      id: '3',
      title: 'Trade License Renewal',
      description: 'Municipal trade license renewal',
      dueDate: '2024-06-30',
      status: 'pending',
      frequency: 'Annual'
    },
    {
      id: '4',
      title: 'GST Registration',
      description: 'Goods and Services Tax registration',
      status: 'completed'
    }
  ]);

  const [propertyCompliances, setPropertyCompliances] = useState<ComplianceItem[]>([
    {
      id: '5',
      title: 'Property Tax Payment',
      description: 'Municipal property tax payment',
      dueDate: '2024-04-15',
      status: 'filed',
      frequency: 'Annual'
    }
  ]);

  const [otherCompliances, setOtherCompliances] = useState<ComplianceItem[]>([]);

  const handleAddAsset = (assetType: string) => {
    console.log('Adding asset of type:', assetType);
    // Here you would implement the logic to add new assets
  };

  const handleAddCompliance = (category: string) => {
    console.log('Adding compliance for category:', category);
    // Here you would implement the logic to add new compliances
  };

  const handleFileCompliance = (id: string) => {
    console.log('Filing compliance:', id);
    // Here you would implement the logic to file compliances
  };

  const getComplianceStats = (compliances: ComplianceItem[]) => {
    const pending = compliances.filter(c => c.status === 'pending').length;
    const total = compliances.length;
    return { pending, total };
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compliances</h1>
            <p className="text-muted-foreground mt-1">
              Manage your assets and their compliance requirements
            </p>
          </div>
          <AddAssetDialog onAddAsset={handleAddAsset}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </AddAssetDialog>
        </header>

        {/* Company Asset - Full width card */}
        <ComplianceCategoryDialog
          categoryTitle="Company Compliances"
          categoryDescription="Annual returns, board meetings, and corporate governance requirements"
          compliances={companyCompliances}
          onAddCompliance={() => handleAddCompliance('company')}
          onFileCompliance={handleFileCompliance}
        >
          <Card className="cursor-pointer border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">The Company Itself</CardTitle>
                    <p className="text-muted-foreground text-lg">Corporate governance and statutory compliances</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary">
                        {getComplianceStats(companyCompliances).pending} pending
                      </Badge>
                      <Badge variant="outline">
                        {getComplianceStats(companyCompliances).total} total
                      </Badge>
                    </div>
                  </div>
                </div>
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardHeader>
          </Card>
        </ComplianceCategoryDialog>

        {/* Other categories in a grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Licences */}
          <ComplianceCategoryDialog
            categoryTitle="Licences"
            categoryDescription="Business licenses, permits, and regulatory approvals"
            compliances={licenceCompliances}
            onAddCompliance={() => handleAddCompliance('licences')}
            onFileCompliance={handleFileCompliance}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 h-48">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Licences</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Business licenses, permits, and regulatory approvals
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {getComplianceStats(licenceCompliances).pending} pending
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {getComplianceStats(licenceCompliances).total} total
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </ComplianceCategoryDialog>

          {/* Properties */}
          <ComplianceCategoryDialog
            categoryTitle="Properties"
            categoryDescription="Real estate properties, land, buildings, and premises"
            compliances={propertyCompliances}
            onAddCompliance={() => handleAddCompliance('properties')}
            onFileCompliance={handleFileCompliance}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 h-48">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Home className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Properties</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Real estate properties and premises compliance
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {getComplianceStats(propertyCompliances).pending} pending
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {getComplianceStats(propertyCompliances).total} total
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </ComplianceCategoryDialog>

          {/* Others */}
          <ComplianceCategoryDialog
            categoryTitle="Other Compliances"
            categoryDescription="Miscellaneous compliance requirements and obligations"
            compliances={otherCompliances}
            onAddCompliance={() => handleAddCompliance('others')}
            onFileCompliance={handleFileCompliance}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 h-48">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>
                  <CardTitle className="text-xl">Others</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Miscellaneous compliance requirements
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {getComplianceStats(otherCompliances).pending} pending
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {getComplianceStats(otherCompliances).total} total
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </ComplianceCategoryDialog>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompliancesPage;
