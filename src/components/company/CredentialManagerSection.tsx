
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Plus, Edit, Trash2 } from 'lucide-react';

interface Credential {
  id: string;
  portal: string;
  username: string;
  password: string;
  notes?: string;
  category: string;
}

const dummyCredentials: Credential[] = [
  {
    id: '1',
    portal: 'MCA Portal',
    username: 'tech_innovate_mca',
    password: 'password123',
    notes: 'Login for MCA filings and company compliances',
    category: 'Government'
  },
  {
    id: '2',
    portal: 'GST Portal',
    username: 'tech_innovate_gst',
    password: 'gst2024!',
    notes: 'For GST filing and returns',
    category: 'Tax'
  },
  {
    id: '3',
    portal: 'Income Tax Portal',
    username: 'techinnovate@tax',
    password: 'itr2024@',
    notes: 'For ITR filing and tax compliance',
    category: 'Tax'
  },
  {
    id: '4',
    portal: 'EPF Portal',
    username: 'tech_innovate_epf',
    password: 'epf123',
    notes: 'Employee Provident Fund portal',
    category: 'Employee'
  },
  {
    id: '5',
    portal: 'ESIC Portal',
    username: 'tech_innovate_esic',
    password: 'esic456',
    notes: 'Employee State Insurance portal',
    category: 'Employee'
  }
];

const CredentialManagerSection = () => {
  const [credentials, setCredentials] = useState<Credential[]>(dummyCredentials);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (credentialId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [credentialId]: !prev[credentialId]
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Government': return 'bg-blue-100 text-blue-800';
      case 'Tax': return 'bg-green-100 text-green-800';
      case 'Employee': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedCredentials = credentials.reduce((acc, credential) => {
    if (!acc[credential.category]) {
      acc[credential.category] = [];
    }
    acc[credential.category].push(credential);
    return acc;
  }, {} as Record<string, Credential[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Credential Manager</h2>
          <p className="text-muted-foreground">
            Securely store and manage your portal credentials
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Credential
        </Button>
      </div>

      {Object.entries(groupedCredentials).map(([category, categoryCredentials]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {category} Portals
            <Badge variant="outline">{categoryCredentials.length}</Badge>
          </h3>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryCredentials.map((credential) => (
              <Card key={credential.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{credential.portal}</CardTitle>
                    <Badge className={getCategoryColor(credential.category)} variant="secondary">
                      {credential.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Username</span>
                      <span className="text-sm font-medium">{credential.username}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Password</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium font-mono">
                          {showPasswords[credential.id] ? credential.password : '••••••••'}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => togglePasswordVisibility(credential.id)}
                        >
                          {showPasswords[credential.id] ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {credential.notes && (
                      <div className="mt-3">
                        <span className="text-sm text-muted-foreground">Notes</span>
                        <p className="text-sm mt-1">{credential.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CredentialManagerSection;
