
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, MapPin, User, Building, Shield } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'expired' | 'pending';
  details: any;
  issueDate?: string;
  expiryDate?: string;
}

interface AssetDetailsDialogProps {
  children: React.ReactNode;
  categoryTitle: string;
  categoryDescription: string;
  assets: Asset[];
  onAddAsset: () => void;
}

// Sample data for different asset types
const sampleLicences: Asset[] = [
  {
    id: '1',
    name: 'FSSAI License',
    type: 'Food Safety License',
    status: 'active',
    details: { licenseNumber: 'FSSAI-12345678901234', authority: 'Food Safety and Standards Authority of India' },
    issueDate: '2023-01-15',
    expiryDate: '2026-01-14'
  },
  {
    id: '2',
    name: 'GST Registration',
    type: 'Tax Registration',
    status: 'active',
    details: { gstNumber: '27AAAAA0000A1Z5', state: 'Maharashtra' },
    issueDate: '2020-05-01',
    expiryDate: 'Permanent'
  },
  {
    id: '3',
    name: 'Shop & Establishment License',
    type: 'Trade License',
    status: 'pending',
    details: { applicationNumber: 'SE-2024-001234', municipality: 'Pune Municipal Corporation' },
    issueDate: '2024-02-01',
    expiryDate: '2025-01-31'
  },
  {
    id: '4',
    name: 'Fire Safety Certificate',
    type: 'Safety License',
    status: 'active',
    details: { certificateNumber: 'FSC-MH-2023-5678', authority: 'Maharashtra Fire Services' },
    issueDate: '2023-06-15',
    expiryDate: '2024-06-14'
  }
];

const sampleProperties: Asset[] = [
  {
    id: '1',
    name: 'Corporate Office - Pune',
    type: 'Commercial Property',
    status: 'active',
    details: { 
      state: 'Maharashtra', 
      district: 'Pune', 
      surveyNumber: 'S.No. 123/1A', 
      area: '2500 sq ft',
      registrationNumber: 'MH-PUNE-2020-001234'
    }
  },
  {
    id: '2',
    name: 'Warehouse - Mumbai',
    type: 'Industrial Property',
    status: 'active',
    details: { 
      state: 'Maharashtra', 
      district: 'Mumbai Suburban', 
      surveyNumber: 'S.No. 456/2B', 
      area: '5000 sq ft',
      registrationNumber: 'MH-MUM-2021-005678'
    }
  },
  {
    id: '3',
    name: 'Branch Office - Bangalore',
    type: 'Commercial Property',
    status: 'pending',
    details: { 
      state: 'Karnataka', 
      district: 'Bangalore Urban', 
      surveyNumber: 'S.No. 789/3C', 
      area: '1800 sq ft',
      registrationNumber: 'KA-BLR-2024-001122'
    }
  }
];

const sampleEmployees: Asset[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    type: 'Software Engineer',
    status: 'active',
    details: { pan: 'ABCDE1234F', salary: '₹8,50,000', joiningDate: '2022-03-15', employeeId: 'EMP001' }
  },
  {
    id: '2',
    name: 'Priya Sharma',
    type: 'Marketing Manager',
    status: 'active',
    details: { pan: 'FGHIJ5678K', salary: '₹12,00,000', joiningDate: '2021-08-20', employeeId: 'EMP002' }
  },
  {
    id: '3',
    name: 'Amit Patel',
    type: 'Financial Analyst',
    status: 'active',
    details: { pan: 'LMNOP9012Q', salary: '₹7,20,000', joiningDate: '2023-01-10', employeeId: 'EMP003' }
  },
  {
    id: '4',
    name: 'Sunita Reddy',
    type: 'HR Specialist',
    status: 'active',
    details: { pan: 'RSTUV3456W', salary: '₹6,80,000', joiningDate: '2022-11-05', employeeId: 'EMP004' }
  },
  {
    id: '5',
    name: 'Vikram Singh',
    type: 'Operations Head',
    status: 'active',
    details: { pan: 'XYZAB7890C', salary: '₹15,50,000', joiningDate: '2020-04-18', employeeId: 'EMP005' }
  }
];

const AssetDetailsDialog: React.FC<AssetDetailsDialogProps> = ({
  children,
  categoryTitle,
  categoryDescription,
  assets: propAssets,
  onAddAsset
}) => {
  const [open, setOpen] = useState(false);

  // Use sample data based on category
  const getSampleAssets = () => {
    if (categoryTitle === 'Licences') return sampleLicences;
    if (categoryTitle === 'Properties') return sampleProperties;
    if (categoryTitle === 'Employees') return sampleEmployees;
    return propAssets;
  };

  const assets = getSampleAssets();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = () => {
    if (categoryTitle === 'Licences') return Shield;
    if (categoryTitle === 'Properties') return Building;
    if (categoryTitle === 'Employees') return User;
    return Shield;
  };

  const IconComponent = getIcon();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <IconComponent className="h-6 w-6" />
            {categoryTitle}
          </DialogTitle>
          <DialogDescription className="text-base">
            {categoryDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{categoryTitle} List</h3>
            <Button onClick={onAddAsset}>
              <Plus className="w-4 h-4 mr-2" />
              Add {categoryTitle.slice(0, -1)}
            </Button>
          </div>

          {assets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No {categoryTitle.toLowerCase()} found.</p>
              <Button onClick={onAddAsset} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add First {categoryTitle.slice(0, -1)}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {assets.map((asset) => (
                <Card key={asset.id} className="border">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{asset.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{asset.type}</p>
                      </div>
                      <Badge className={getStatusColor(asset.status)}>
                        {asset.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {categoryTitle === 'Licences' && (
                      <>
                        {asset.details.licenseNumber && (
                          <div className="text-sm">
                            <span className="font-medium">License Number: </span>
                            {asset.details.licenseNumber}
                          </div>
                        )}
                        {asset.details.gstNumber && (
                          <div className="text-sm">
                            <span className="font-medium">GST Number: </span>
                            {asset.details.gstNumber}
                          </div>
                        )}
                        {asset.details.authority && (
                          <div className="text-sm">
                            <span className="font-medium">Authority: </span>
                            {asset.details.authority}
                          </div>
                        )}
                        {asset.expiryDate && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Expires: {asset.expiryDate}
                          </div>
                        )}
                      </>
                    )}
                    
                    {categoryTitle === 'Properties' && (
                      <>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-4 h-4" />
                          {asset.details.district}, {asset.details.state}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Survey No: </span>
                          {asset.details.surveyNumber}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Area: </span>
                          {asset.details.area}
                        </div>
                        {asset.details.registrationNumber && (
                          <div className="text-sm">
                            <span className="font-medium">Reg. No: </span>
                            {asset.details.registrationNumber}
                          </div>
                        )}
                      </>
                    )}
                    
                    {categoryTitle === 'Employees' && (
                      <>
                        <div className="text-sm">
                          <span className="font-medium">Employee ID: </span>
                          {asset.details.employeeId}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">PAN: </span>
                          {asset.details.pan}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Salary: </span>
                          {asset.details.salary}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          Joined: {asset.details.joiningDate}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssetDetailsDialog;
