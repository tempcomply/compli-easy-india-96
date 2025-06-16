
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Shield, 
  FileText, 
  Plus, 
  Search, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Eye,
  Lightbulb,
  Award,
  Factory,
  Truck,
  Wifi
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'company' | 'property' | 'intellectual_property' | 'license' | 'equipment' | 'vehicle' | 'digital';
  category: string;
  status: 'active' | 'expired' | 'pending';
  value: string;
  complianceCount: number;
  pendingCompliances: number;
  nextDueDate?: string;
}

interface Compliance {
  id: string;
  assetId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'filed' | 'completed';
  type: 'annual' | 'monthly' | 'quarterly';
  requiresCA: boolean;
}

const dummyAssets: Asset[] = [
  {
    id: '1',
    name: 'TechInnovate Solutions Pvt Ltd',
    type: 'company',
    category: 'Private Limited Company',
    status: 'active',
    value: '₹10,00,000',
    complianceCount: 8,
    pendingCompliances: 3,
    nextDueDate: '2024-06-30'
  },
  {
    id: '2',
    name: 'Office Building - Sector 18',
    type: 'property',
    category: 'Commercial Property',
    status: 'active',
    value: '₹2,50,00,000',
    complianceCount: 2,
    pendingCompliances: 1,
    nextDueDate: '2024-05-15'
  },
  {
    id: '3',
    name: 'CRM Software Patent',
    type: 'intellectual_property',
    category: 'Software Patent',
    status: 'active',
    value: '₹15,00,000',
    complianceCount: 1,
    pendingCompliances: 0
  },
  {
    id: '4',
    name: 'FSSAI License',
    type: 'license',
    category: 'Food Safety License',
    status: 'active',
    value: '₹5,000',
    complianceCount: 1,
    pendingCompliances: 1,
    nextDueDate: '2024-07-15'
  }
];

const dummyCompliances: Compliance[] = [
  {
    id: '1',
    assetId: '1',
    title: 'Form 8 - Annual Filing',
    description: 'Statement of Account and Solvency',
    dueDate: '2024-06-30',
    status: 'pending',
    type: 'annual',
    requiresCA: false
  },
  {
    id: '2',
    assetId: '1',
    title: 'Form 11 - Annual Return',
    description: 'Annual return filing with ROC',
    dueDate: '2024-07-30',
    status: 'pending',
    type: 'annual',
    requiresCA: false
  },
  {
    id: '3',
    assetId: '2',
    title: 'Property Tax Assessment',
    description: 'Annual property tax filing',
    dueDate: '2024-05-15',
    status: 'pending',
    type: 'annual',
    requiresCA: false
  },
  {
    id: '4',
    assetId: '4',
    title: 'FSSAI License Renewal',
    description: 'Food safety license renewal',
    dueDate: '2024-07-15',
    status: 'pending',
    type: 'annual',
    requiresCA: false
  }
];

const CompliancesPageNew = () => {
  const [assets, setAssets] = useState<Asset[]>(dummyAssets);
  const [compliances, setCompliances] = useState<Compliance[]>(dummyCompliances);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

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

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAssetCompliances = (assetId: string) => {
    return compliances.filter(compliance => compliance.assetId === assetId);
  };

  const filteredAssets = otherAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assets & Compliance</h1>
            <p className="text-muted-foreground mt-1">
              Manage your assets and their compliance requirements
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              File Compliance
            </Button>
          </div>
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
                <Button 
                  variant="outline"
                  onClick={() => setSelectedAsset(companyAsset.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Compliances ({companyAsset.complianceCount})
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{companyAsset.pendingCompliances}</p>
                    <p className="text-sm text-muted-foreground">Pending Compliances</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{companyAsset.complianceCount - companyAsset.pendingCompliances}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
                {companyAsset.nextDueDate && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{new Date(companyAsset.nextDueDate).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">Next Due Date</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="assets" className="w-full">
          <TabsList>
            <TabsTrigger value="assets">Other Assets</TabsTrigger>
            <TabsTrigger value="all-compliances">All Compliances</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAssets.map((asset) => {
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
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="font-semibold text-yellow-600">{asset.pendingCompliances}</p>
                            <p className="text-xs text-muted-foreground">Pending</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-green-600">{asset.complianceCount - asset.pendingCompliances}</p>
                            <p className="text-xs text-muted-foreground">Complete</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedAsset(asset.id)}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                      </div>
                      
                      {asset.nextDueDate && (
                        <div className="text-xs text-muted-foreground">
                          Next due: {new Date(asset.nextDueDate).toLocaleDateString()}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="all-compliances" className="space-y-4">
            <div className="grid gap-4">
              {compliances.map((compliance) => (
                <Card key={compliance.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-semibold text-lg">{compliance.title}</h3>
                          <Badge className={getComplianceStatusColor(compliance.status)}>
                            {compliance.status.toUpperCase()}
                          </Badge>
                          {compliance.requiresCA && (
                            <Badge variant="destructive" className="text-xs">
                              Requires CA
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{compliance.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {new Date(compliance.dueDate).toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {assets.find(a => a.id === compliance.assetId)?.name}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {compliance.status === 'pending' && (
                          <Button size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            File
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompliancesPageNew;
