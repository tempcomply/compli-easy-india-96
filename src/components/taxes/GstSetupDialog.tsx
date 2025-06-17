
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Key } from 'lucide-react';

interface GstSetupDialogProps {
  onSetupComplete: () => void;
}

const GstSetupDialog: React.FC<GstSetupDialogProps> = ({ onSetupComplete }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    gstin: '',
    legalName: '',
    tradeName: '',
    state: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('GST Setup Data:', formData);
    onSetupComplete();
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="px-8">
          <Play className="mr-2 h-5 w-5" />
          Get Started with GST
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Basic Information
          </DialogTitle>
          <DialogDescription>
            One-time setup for GST filing
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gstin">GSTIN</Label>
            <Input
              id="gstin"
              placeholder="Enter your GSTIN"
              value={formData.gstin}
              onChange={(e) => handleInputChange('gstin', e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Identification on GST portal</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="legalName">Legal Name</Label>
            <Input
              id="legalName"
              placeholder="Enter legal name"
              value={formData.legalName}
              onChange={(e) => handleInputChange('legalName', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradeName">Trade Name</Label>
            <Input
              id="tradeName"
              placeholder="Enter trade name"
              value={formData.tradeName}
              onChange={(e) => handleInputChange('tradeName', e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Auto-validated via GSTIN</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State of Registration</Label>
            <Input
              id="state"
              placeholder="Enter state"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">For proper return type</p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Complete Setup
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GstSetupDialog;
