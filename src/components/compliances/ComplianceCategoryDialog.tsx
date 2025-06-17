
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
import { Plus, Calendar, Upload } from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  status: 'pending' | 'filed' | 'completed';
  frequency?: string;
}

interface ComplianceCategoryDialogProps {
  children: React.ReactNode;
  categoryTitle: string;
  categoryDescription: string;
  compliances: ComplianceItem[];
  onAddCompliance: () => void;
  onFileCompliance: (id: string) => void;
}

const ComplianceCategoryDialog: React.FC<ComplianceCategoryDialogProps> = ({
  children,
  categoryTitle,
  categoryDescription,
  compliances,
  onAddCompliance,
  onFileCompliance
}) => {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{categoryTitle}</DialogTitle>
          <DialogDescription className="text-base">
            {categoryDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Compliance Items</h3>
            <Button onClick={onAddCompliance}>
              <Plus className="w-4 h-4 mr-2" />
              Add Compliance
            </Button>
          </div>

          {compliances.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No compliances found for this category.</p>
              <Button onClick={onAddCompliance} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add First Compliance
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {compliances.map((compliance) => (
                <Card key={compliance.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{compliance.title}</h4>
                          {compliance.frequency && (
                            <Badge variant="outline" className="text-xs">
                              {compliance.frequency}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {compliance.description}
                        </p>
                        {compliance.dueDate && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Due: {new Date(compliance.dueDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(compliance.status)}>
                          {compliance.status.toUpperCase()}
                        </Badge>
                        {compliance.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => onFileCompliance(compliance.id)}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            File
                          </Button>
                        )}
                      </div>
                    </div>
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

export default ComplianceCategoryDialog;
