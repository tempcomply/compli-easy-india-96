
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Building, Shield, Home, Users, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
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

interface Compliance {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  category: 'licence' | 'asset' | 'employee';
  relatedAsset: string;
}

const CompliancesPage = () => {
  const [licenceAssets] = useState<Asset[]>([]);
  const [assetAssets] = useState<Asset[]>([]);
  const [employeeAssets] = useState<Asset[]>([]);

  // Sample compliance data
  const [compliances] = useState<Compliance[]>([
    {
      id: '1',
      title: 'FSSAI License Renewal',
      description: 'Annual renewal of Food Safety and Standards Authority license',
      dueDate: '2024-07-30',
      status: 'pending',
      category: 'licence',
      relatedAsset: 'FSSAI License'
    },
    {
      id: '2',
      title: 'GST Return Filing - GSTR-3B',
      description: 'Monthly GST return filing for March 2024',
      dueDate: '2024-04-20',
      status: 'overdue',
      category: 'licence',
      relatedAsset: 'GST Registration'
    },
    {
      id: '3',
      title: 'Property Tax Payment',
      description: 'Annual property tax payment for Corporate Office',
      dueDate: '2024-06-15',
      status: 'completed',
      category: 'asset',
      relatedAsset: 'Corporate Office - Pune'
    },
    {
      id: '4',
      title: 'Fire Safety Certificate Renewal',
      description: 'Annual fire safety compliance certificate renewal',
      dueDate: '2024-06-14',
      status: 'pending',
      category: 'licence',
      relatedAsset: 'Fire Safety Certificate'
    },
    {
      id: '5',
      title: 'Employee PF Compliance',
      description: 'Monthly PF contribution and compliance check',
      dueDate: '2024-04-10',
      status: 'completed',
      category: 'employee',
      relatedAsset: 'All Employees'
    },
    {
      id: '6',
      title: 'Vehicle Insurance Renewal',
      description: 'Annual vehicle insurance renewal for company vehicles',
      dueDate: '2024-08-20',
      status: 'pending',
      category: 'asset',
      relatedAsset: 'Company Vehicles'
    }
  ]);

  const handleAddAsset = (assetType: string) => {
    console.log('Adding asset of type:', assetType);
    // Here you would implement the logic to add new assets
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'overdue': return AlertCircle;
      case 'pending': return Calendar;
      default: return Calendar;
    }
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
              Add
            </Button>
          </AddAssetDialog>
        </header>

        {/* Company Asset - Full width card */}
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Building className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{companyName}</CardTitle>
                  <p className="text-muted-foreground text-lg">Corporate governance and statutory compliances</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="h-6"></div>
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
                  <div className="p-2 bg-muted rounded-lg">
                    <Shield className="h-6 w-6 text-muted-foreground" />
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

          {/* Assets */}
          <AssetDetailsDialog
            categoryTitle="Assets"
            categoryDescription="Real estate properties, vehicles, and physical assets"
            assets={assetAssets}
            onAddAsset={() => handleAddAsset('assets')}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 h-56">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-muted rounded-lg">
                    <Home className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-xl">Assets</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Real estate properties, vehicles, and physical assets
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
                  <div className="p-2 bg-muted rounded-lg">
                    <Users className="h-6 w-6 text-muted-foreground" />
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

        {/* Compliance Requirements Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Compliance Requirements</h2>
            <p className="text-muted-foreground">
              {compliances.filter(c => c.status === 'pending').length} pending, {compliances.filter(c => c.status === 'overdue').length} overdue
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {compliances.map((compliance) => {
              const StatusIcon = getStatusIcon(compliance.status);
              return (
                <Card key={compliance.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <StatusIcon className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-lg">{compliance.title}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(compliance.status)} variant="outline">
                        {compliance.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {compliance.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Due: {compliance.dueDate}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Related to: {compliance.relatedAsset}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompliancesPage;
