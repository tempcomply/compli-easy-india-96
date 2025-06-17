import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Building, Shield, Home, Users } from 'lucide-react';
import AddAssetDialog from '@/components/compliances/AddAssetDialog';
import AssetDetailsDialog from '@/components/compliances/AssetDetailsDialog';

interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'expired' | 'pending';
  details: any;
  issueDate?: string;
  expiryDate?: string;
}

const CompliancesPage = () => {
  const [licenceAssets] = useState<Asset[]>([]);
  const [propertyAssets] = useState<Asset[]>([]);
  const [employeeAssets] = useState<Asset[]>([]);

  const handleAddAsset = (assetType: string) => {
    console.log('Adding asset of type:', assetType);
    // Here you would implement the logic to add new assets
  };

  // Dummy company name - in real app this would come from context/API
  const companyName = "TechInnovate Solutions Pvt Ltd";

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
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Building className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{companyName}</CardTitle>
                  <p className="text-muted-foreground text-lg">Corporate governance and statutory compliances</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="h-4"></div>
          </CardContent>
        </Card>

        {/* Other categories in a grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Licences */}
          <AssetDetailsDialog
            categoryTitle="Licences"
            categoryDescription="Business licenses, permits, and regulatory approvals"
            assets={licenceAssets}
            onAddAsset={() => handleAddAsset('licences')}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 h-56">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Shield className="h-6 w-6 text-gray-600" />
                  </div>
                  <CardTitle className="text-xl">Licences</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Business licenses, permits, and regulatory approvals
                </p>
                <div className="h-8"></div>
              </CardContent>
            </Card>
          </AssetDetailsDialog>

          {/* Properties */}
          <AssetDetailsDialog
            categoryTitle="Properties"
            categoryDescription="Real estate properties, land, buildings, and premises"
            assets={propertyAssets}
            onAddAsset={() => handleAddAsset('properties')}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 h-56">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Home className="h-6 w-6 text-gray-600" />
                  </div>
                  <CardTitle className="text-xl">Properties</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Real estate properties and premises compliance
                </p>
                <div className="h-8"></div>
              </CardContent>
            </Card>
          </AssetDetailsDialog>

          {/* Employees */}
          <AssetDetailsDialog
            categoryTitle="Employees"
            categoryDescription="Employee records, documentation, and compliance"
            assets={employeeAssets}
            onAddAsset={() => handleAddAsset('employees')}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 h-56">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <CardTitle className="text-xl">Employees</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Employee records and compliance requirements
                </p>
                <div className="h-8"></div>
              </CardContent>
            </Card>
          </AssetDetailsDialog>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompliancesPage;
