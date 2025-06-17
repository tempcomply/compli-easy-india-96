
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
import { Shield, Lightbulb, Building } from 'lucide-react';

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
    id: 'ipr',
    title: 'IPR',
    description: 'Intellectual Property Rights - patents, trademarks, copyrights',
    icon: Lightbulb,
  },
  {
    id: 'properties',
    title: 'Properties',
    description: 'Real estate properties, land, buildings, and premises',
    icon: Building,
  },
];

const AddAssetDialog: React.FC<AddAssetDialogProps> = ({ children, onAddAsset }) => {
  const [open, setOpen] = useState(false);

  const handleAssetSelect = (assetType: string) => {
    onAddAsset(assetType);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
          <DialogDescription>
            Choose the type of asset you want to add to your compliance management
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 md:grid-cols-3 py-4">
          {assetTypes.map((asset) => (
            <Card 
              key={asset.id} 
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
              onClick={() => handleAssetSelect(asset.id)}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddAssetDialog;
