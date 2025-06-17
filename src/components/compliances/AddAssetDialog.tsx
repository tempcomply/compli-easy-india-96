
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Home, Users, ArrowLeft } from 'lucide-react';

interface AddAssetDialogProps {
  children: React.ReactNode;
  onAddAsset: (assetType: string) => void;
}

const assetTypes = [
  {
    id: 'licences',
    title: 'Licences',
    description: 'Business licenses, permits, and regulatory approvals',
    icon: Shield,
  },
  {
    id: 'assets',
    title: 'Assets',
    description: 'Real estate properties, vehicles, and physical assets',
    icon: Home,
  },
  {
    id: 'employees',
    title: 'Employees',
    description: 'Employee records, documentation, and compliance',
    icon: Users,
  },
];

// Comprehensive licence types with accurate data
const licenceTypes = [
  { id: 'gst', name: 'GST Registration', fields: ['gstNumber', 'state', 'registrationDate'] },
  { id: 'fssai', name: 'FSSAI License', fields: ['licenseNumber', 'licenseType', 'validityPeriod'] },
  { id: 'shopEstablishment', name: 'Shop & Establishment License', fields: ['licenseNumber', 'municipality', 'validityPeriod'] },
  { id: 'tradeLicense', name: 'Trade License', fields: ['licenseNumber', 'authority', 'businessType'] },
  { id: 'fireSafety', name: 'Fire Safety Certificate', fields: ['certificateNumber', 'authority', 'validityPeriod'] },
  { id: 'pollution', name: 'Pollution Control Board License', fields: ['licenseNumber', 'authority', 'industryType'] },
  { id: 'labor', name: 'Labor License', fields: ['licenseNumber', 'laborDepartment', 'numberOfEmployees'] },
  { id: 'factory', name: 'Factory License', fields: ['licenseNumber', 'factoryAct', 'machineryDetails'] },
  { id: 'import', name: 'Import Export Code (IEC)', fields: ['iecNumber', 'dgftOffice', 'validityPeriod'] },
  { id: 'professional', name: 'Professional Tax Registration', fields: ['registrationNumber', 'state', 'employeeCount'] },
  { id: 'msme', name: 'MSME Registration', fields: ['udyamNumber', 'category', 'investment'] },
  { id: 'iso', name: 'ISO Certification', fields: ['certificateNumber', 'isoStandard', 'certifyingBody'] }
];

// Comprehensive asset types
const assetTypes2 = [
  { id: 'realEstate', name: 'Real Estate Property', fields: ['propertyName', 'address', 'surveyNumber', 'area'] },
  { id: 'vehicle', name: 'Vehicle', fields: ['vehicleNumber', 'vehicleType', 'model', 'year'] },
  { id: 'machinery', name: 'Machinery & Equipment', fields: ['equipmentName', 'modelNumber', 'manufacturer', 'purchaseDate'] },
  { id: 'office', name: 'Office Equipment', fields: ['equipmentName', 'brand', 'serialNumber', 'purchaseDate'] },
  { id: 'land', name: 'Land', fields: ['surveyNumber', 'area', 'location', 'landType'] },
  { id: 'building', name: 'Building', fields: ['buildingName', 'address', 'builtUpArea', 'constructionYear'] }
];

const AddAssetDialog: React.FC<AddAssetDialogProps> = ({ children, onAddAsset }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubType(null);
    setFormData({});
  };

  const handleSubTypeSelect = (subTypeId: string) => {
    setSelectedSubType(subTypeId);
    setFormData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting:', { category: selectedCategory, subType: selectedSubType, data: formData });
    onAddAsset(selectedCategory || '');
    setOpen(false);
    setSelectedCategory(null);
    setSelectedSubType(null);
    setFormData({});
  };

  const handleBack = () => {
    if (selectedSubType) {
      setSelectedSubType(null);
      setFormData({});
    } else {
      setSelectedCategory(null);
    }
  };

  const renderCategorySelection = () => (
    <div className="grid gap-4 md:grid-cols-3 py-4">
      {assetTypes.map((asset) => (
        <Card 
          key={asset.id} 
          className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
          onClick={() => handleCategorySelect(asset.id)}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
              <asset.icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">{asset.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground text-center">
              {asset.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSubTypeSelection = () => {
    if (selectedCategory === 'employees') {
      return renderEmployeeForm();
    }

    const subTypes = selectedCategory === 'licences' ? licenceTypes : assetTypes2;
    
    return (
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 max-h-96 overflow-y-auto">
          {subTypes.map((subType) => (
            <Card 
              key={subType.id} 
              className="cursor-pointer hover:shadow-md transition-shadow border hover:border-primary/20 p-3"
              onClick={() => handleSubTypeSelect(subType.id)}
            >
              <CardTitle className="text-sm font-medium">{subType.name}</CardTitle>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderDetailForm = () => {
    const subTypes = selectedCategory === 'licences' ? licenceTypes : assetTypes2;
    const selectedType = subTypes.find(t => t.id === selectedSubType);
    
    if (!selectedType) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{selectedType.name} Details</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {selectedType.fields.map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field} className="capitalize">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Label>
              <Input
                id={field}
                value={formData[field] || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={handleBack}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add {selectedType.name}
          </Button>
        </div>
      </div>
    );
  };

  const renderEmployeeForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Employee Details</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pan">PAN Number</Label>
          <Input
            id="pan"
            value={formData.pan || ''}
            onChange={(e) => handleInputChange('pan', e.target.value)}
            placeholder="Enter PAN number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            value={formData.salary || ''}
            onChange={(e) => handleInputChange('salary', e.target.value)}
            placeholder="Enter salary amount"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            value={formData.designation || ''}
            onChange={(e) => handleInputChange('designation', e.target.value)}
            placeholder="Enter designation"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={handleBack}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          Add Employee
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {(selectedCategory || selectedSubType) && (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <DialogTitle>
              {!selectedCategory ? 'Add New Asset' : 
               selectedCategory === 'employees' ? 'Add Employee' :
               !selectedSubType ? `Select ${selectedCategory === 'licences' ? 'License' : 'Asset'} Type` :
               'Enter Details'}
            </DialogTitle>
          </div>
          <DialogDescription>
            {!selectedCategory ? 'Choose the type of asset you want to add to your compliance management' :
             selectedCategory === 'employees' ? 'Enter employee information' :
             !selectedSubType ? `Select the specific type of ${selectedCategory === 'licences' ? 'license' : 'asset'} to add` :
             'Fill in the required information'}
          </DialogDescription>
        </DialogHeader>
        
        {!selectedCategory && renderCategorySelection()}
        {selectedCategory && !selectedSubType && renderSubTypeSelection()}
        {selectedCategory && selectedSubType && renderDetailForm()}
      </DialogContent>
    </Dialog>
  );
};

export default AddAssetDialog;
