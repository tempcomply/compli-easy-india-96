import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Shield, 
  Plus, 
  Lightbulb,
  Award,
  Factory,
  Truck,
  Wifi,
  Eye
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'company' | 'property' | 'intellectual_property' | 'license' | 'equipment' | 'vehicle' | 'digital';
  category: string;
  status: 'active' | 'expired' | 'pending';
  value: string;
}

const dummyAssets: Asset[] = [
  {
    id: '1',
    name: 'TechInnovate Solutions Pvt Ltd',
    type: 'company',
    category: 'Private Limited Company',
    status: 'active',
    value: '₹10,00,000',
  },
  {
    id: '2',
    name: 'Office Building - Sector 18',
    type: 'property',
    category: 'Commercial Property',
    status: 'active',
    value: '₹2,50,00,000',
  },
  {
    id: '3',
    name: 'CRM Software Patent',
    type: 'intellectual_property',
    category: 'Software Patent',
    status: 'active',
    value: '₹15,00,000',
  },
  {
    id: '4',
    name: 'FSSAI License',
    type: 'license',
    category: 'Food Safety License',
    status: 'active',
    value: '₹5,000',
  }
];

const CompliancesPageNew = () => {
  const [assets, setAssets] = useState<Asset[]>(dummyAssets);

  const companyAsset = assets.find(asset => asset.type === 'company');
  const otherAssets = assets.filter(asset => asset.type !== 'company');

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'company': return Building;
      case 'property': return Building;
      case 'intellectual_property': return Lightbulb;
      case 'license': return Award;
      case 'equipment': return Factory;
      case 'vehicle': return Truck;
      case 'digital': return Wifi;
      default: return Shield;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </header>

        {/* Company Asset - Main Asset Card */}
        {companyAsset && (
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{companyAsset.name}</CardTitle>
                    <p className="text-muted-foreground text-lg">{companyAsset.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(companyAsset.status)}>
                        {companyAsset.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Authorized Capital: {companyAsset.value}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Other Assets */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Other Assets</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherAssets.map((asset) => {
              const IconComponent = getAssetIcon(asset.type);
              return (
                <Card key={asset.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{asset.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{asset.category}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(asset.status)} variant="secondary">
                        {asset.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Value:</span>
                      <span className="font-medium">{asset.value}</span>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="mr-1 h-3 w-3" />
                      View Details
                    </Button>
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

export default CompliancesPageNew;
