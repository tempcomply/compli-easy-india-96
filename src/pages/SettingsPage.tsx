
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { User, Wrench, Link, Building2, Calculator, FileText, BookOpen } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const SettingsPage = () => {
  const { userProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';
  
  const integrationApps = [
    {
      id: 'razorpay-x',
      name: 'RazorpayX Banking',
      description: 'Connect your banking and payment solutions',
      icon: <Building2 className="h-8 w-8" />,
      isAvailable: true,
      category: 'Banking'
    },
    {
      id: 'xpayroll',
      name: 'XPayroll',
      description: 'Automated payroll management system',
      icon: <Calculator className="h-8 w-8" />,
      isAvailable: false,
      category: 'Payroll'
    },
    {
      id: 'tally',
      name: 'Tally',
      description: 'Accounting and inventory management',
      icon: <FileText className="h-8 w-8" />,
      isAvailable: false,
      category: 'Accounting'
    },
    {
      id: 'zoho-books',
      name: 'Zoho Books',
      description: 'Online accounting software',
      icon: <BookOpen className="h-8 w-8" />,
      isAvailable: false,
      category: 'Accounting'
    }
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences.
          </p>
        </header>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-4xl">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="developer" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Developer</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>
                  Update your personal information and login credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={userProfile?.email || ''} 
                    disabled 
                    className="max-w-md"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your email address cannot be changed.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="entity-name" className="text-sm font-medium">
                    Entity Name
                  </label>
                  <Input 
                    id="entity-name" 
                    type="text" 
                    defaultValue={userProfile?.businessName || ''}
                    className="max-w-md"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="current-password" className="text-sm font-medium">
                    Current Password
                  </label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    className="max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">
                    New Password
                  </label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    className="max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    className="max-w-md"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>App Integrations</CardTitle>
                <CardDescription>
                  Connect your external services and manage integrations to streamline your workflow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {integrationApps.map((app) => (
                    <Card key={app.id} className="relative">
                      {!app.isAvailable && (
                        <div className="absolute top-2 right-2 z-10">
                          <Badge variant="secondary" className="text-xs">
                            Coming Soon
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-primary">
                            {app.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{app.name}</h3>
                            <p className="text-xs text-muted-foreground">{app.category}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {app.description}
                        </p>
                        <Button 
                          className="w-full" 
                          variant={app.isAvailable ? "default" : "secondary"}
                          disabled={!app.isAvailable}
                        >
                          {app.isAvailable ? 'Connect' : 'Coming Soon'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="developer" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Developer Controls</CardTitle>
                <CardDescription>
                  API keys, webhooks, and advanced configuration options.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Developer tools and API access will be available in future updates.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
