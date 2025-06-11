import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Plus, 
  Search, 
  Building, 
  FileText, 
  Lightbulb, 
  Award,
  MapPin,
  Factory,
  ShoppingCart,
  Truck,
  Wifi,
  Eye,
  Calendar,
  AlertTriangle
} from 'lucide-react';

type AssetType = 'property' | 'intellectual_property' | 'license' | 'equipment' | 'vehicle' | 'digital';
type AssetStatus = 'active' | 'expired' | 'pending' | 'suspended';

interface Asset {
  id: string;
  name: string;
  type: AssetType;
  category: string;
  status: AssetStatus;
  value: string;
  acquisitionDate: string;
  expiryDate?: string;
  location?: string;
  description: string;
  registrationNumber?: string;
  issuingAuthority?: string;
}

const dummyAssets: Asset[] = [
  {
    id: '1',
    name: 'Office Building - Sector 18',
    type: 'property',
    category: 'Commercial Property',
    status: 'active',
    value: '₹2,50,00,000',
    acquisitionDate: '2020-08-20',
    location: 'Gurgaon, Haryana',
    description: 'Primary office space for headquarters operations'
  },
  {
    id: '2',
    name: 'ABC CRM Software Patent',
    type: 'intellectual_property',
    category: 'Patent',
    status: 'active',
    value: '₹15,00,000',
    acquisitionDate: '2022-01-10',
    expiryDate: '2042-01-10',
    registrationNumber: 'IN202201012345',
    issuingAuthority: 'Indian Patent Office',
    description: 'Customer relationship management software system'
  },
  {
    id: '3',
    name: 'FSSAI License',
    type: 'license',
    category: 'Food Safety License',
    status: 'active',
    value: '₹5,000',
    acquisitionDate: '2023-03-15',
    expiryDate: '2028-03-14',
    registrationNumber: 'FSSAI-12345678901234',
    issuingAuthority: 'Food Safety and Standards Authority of India',
    description: 'Food business operator license for cafeteria operations'
  }
];

const assetCategories = {
  property: {
    icon: Building,
    label: 'Properties',
    types: [
      'Commercial Property',
      'Residential Property', 
      'Industrial Land',
      'Agricultural Land',
      'Warehouse',
      'Retail Space'
    ]
  },
  intellectual_property: {
    icon: Lightbulb,
    label: 'Intellectual Property',
    types: [
      'Patent',
      'Trademark',
      'Copyright',
      'Trade Secret',
      'Design Patent',
      'Industrial Design'
    ]
  },
  license: {
    icon: Award,
    label: 'Licenses & Permits',
    types: [
      'FSSAI License',
      'BIS Certification',
      'ISO Certification',
      'Pollution Control Board',
      'Trade License',
      'Factory License',
      'Drug License',
      'Import Export License',
      'Professional License'
    ]
  },
  equipment: {
    icon: Factory,
    label: 'Equipment & Machinery',
    types: [
      'Manufacturing Equipment',
      'IT Equipment',
      'Office Furniture',
      'Medical Equipment',
      'Construction Equipment',
      'Laboratory Equipment'
    ]
  },
  vehicle: {
    icon: Truck,
    label: 'Vehicles & Fleet',
    types: [
      'Commercial Vehicle',
      'Company Car',
      'Two Wheeler',
      'Heavy Vehicle',
      'Construction Vehicle'
    ]
  },
  digital: {
    icon: Wifi,
    label: 'Digital Assets',
    types: [
      'Domain Name',
      'Software License',
      'Digital Certificate',
      'Cloud Infrastructure',
      'Database',
      'API Access'
    ]
  }
};

const AssetsPage = () => {
  const [assets, setAssets] = useState<Asset[]>(dummyAssets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    const matchesTab = activeTab === 'all' || asset.type === activeTab;
    
    return matchesSearch && matchesType && matchesTab;
  });

  const getStatusColor = (status: AssetStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'suspended': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: AssetType) => {
    const category = assetCategories[type];
    return category ? <category.icon className="h-4 w-4" /> : <Shield className="h-4 w-4" />;
  };

  const EmptyState = ({ type }: { type?: string }) => (
    <div className="text-center py-12">
      <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-2 text-sm font-semibold">No {type || 'assets'} found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Start by adding your first {type || 'asset'} to track compliances and taxes automatically.
      </p>
      <div className="mt-6">
        <Button onClick={() => setIsAddAssetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add {type || 'Asset'}
        </Button>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Assets & Licenses
            </h1>
            <p className="text-muted-foreground">
              Manage your organization's assets, properties, licenses, and intellectual property
            </p>
          </div>
          <Dialog open={isAddAssetOpen} onOpenChange={setIsAddAssetOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>
                  Add your existing assets, properties, licenses, or intellectual property to automatically track related compliances and taxes.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-3">
                  {Object.entries(assetCategories).map(([key, category]) => (
                    <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <category.icon className="h-5 w-5" />
                          {category.label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          {category.types.map((type) => (
                            <Button
                              key={type}
                              variant="outline"
                              size="sm"
                              className="justify-start h-auto py-2 text-left"
                              onClick={() => {
                                // This would handle adding specific asset type
                                setIsAddAssetOpen(false);
                              }}
                            >
                              {type}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

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
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(assetCategories).map(([key, category]) => (
                <SelectItem key={key} value={key}>{category.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:grid-cols-7 w-full">
            <TabsTrigger value="all">All Assets</TabsTrigger>
            {Object.entries(assetCategories).map(([key, category]) => (
              <TabsTrigger key={key} value={key} className="hidden md:flex">
                <category.icon className="h-4 w-4 mr-1" />
                <span className="hidden lg:inline">{category.label.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredAssets.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-4">
                {filteredAssets.map((asset) => (
                  <Card key={asset.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {getTypeIcon(asset.type)}
                            {asset.name}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{asset.category}</Badge>
                            <Badge className={getStatusColor(asset.status)}>
                              {asset.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">Value:</span>
                          <div className="font-medium">{asset.value}</div>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Acquired:</span>
                          <div className="font-medium">{new Date(asset.acquisitionDate).toLocaleDateString()}</div>
                        </div>
                        {asset.expiryDate && (
                          <div>
                            <span className="font-medium text-muted-foreground">Expires:</span>
                            <div className="font-medium flex items-center gap-1">
                              {new Date(asset.expiryDate).toLocaleDateString()}
                              {new Date(asset.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) && (
                                <AlertTriangle className="h-3 w-3 text-amber-500" />
                              )}
                            </div>
                          </div>
                        )}
                        {asset.location && (
                          <div>
                            <span className="font-medium text-muted-foreground">Location:</span>
                            <div className="font-medium">{asset.location}</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {Object.entries(assetCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-6">
              {filteredAssets.filter(asset => asset.type === key).length === 0 ? (
                <EmptyState type={category.label.toLowerCase()} />
              ) : (
                <div className="grid gap-4">
                  {filteredAssets.filter(asset => asset.type === key).map((asset) => (
                    <Card key={asset.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                              {getTypeIcon(asset.type)}
                              {asset.name}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{asset.category}</Badge>
                              <Badge className={getStatusColor(asset.status)}>
                                {asset.status.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-muted-foreground">Value:</span>
                            <div className="font-medium">{asset.value}</div>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Acquired:</span>
                            <div className="font-medium">{new Date(asset.acquisitionDate).toLocaleDateString()}</div>
                          </div>
                          {asset.expiryDate && (
                            <div>
                              <span className="font-medium text-muted-foreground">Expires:</span>
                              <div className="font-medium flex items-center gap-1">
                                {new Date(asset.expiryDate).toLocaleDateString()}
                                {new Date(asset.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) && (
                                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                                )}
                              </div>
                            </div>
                          )}
                          {asset.location && (
                            <div>
                              <span className="font-medium text-muted-foreground">Location:</span>
                              <div className="font-medium">{asset.location}</div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AssetsPage;
