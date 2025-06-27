import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy, Key, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const integrationApps = [
  {
    id: 'razorpay',
    name: 'RazorpayX Banking',
    description: 'Connect your RazorpayX account for seamless payment processing',
    logo: '💳',
    category: 'payment',
    status: 'coming_soon'
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Sync your accounting data with QuickBooks',
    logo: '📊',
    category: 'accounting',
    status: 'coming_soon'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get compliance notifications and updates in Slack',
    logo: '💬',
    category: 'communication',
    status: 'coming_soon'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Receive important compliance reminders via WhatsApp',
    logo: '📱',
    category: 'communication',
    status: 'coming_soon'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate workflows with 3000+ apps through Zapier',
    logo: '⚡',
    category: 'automation',
    status: 'coming_soon'
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Sync compliance deadlines with your Google Calendar',
    logo: '📅',
    category: 'productivity',
    status: 'coming_soon'
  }
];

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set preferences.
        </p>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <ProfileTab />
          </TabsContent>
          <TabsContent value="account" className="space-y-4">
            <AccountTab />
          </TabsContent>
          <TabsContent value="integrations" className="space-y-4">
            <IntegrationsTab />
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const ProfileTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your personal details and contact information.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+91 9876543210" />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AccountTab = () => {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("sdlfkj234ljknm234klmn234");

  const handleRegenerateApiKey = () => {
    // Logic to regenerate API key
    setApiKey("NEW_API_KEY_GENERATED");
    toast({
      title: "API Key Regenerated",
      description: "A new API key has been generated. Please update your integrations.",
    })
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key Copied",
      description: "API key copied to clipboard.",
    })
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and security settings.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndoe" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="********" disabled />
              <Button variant="link">Change Password</Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex items-center">
                <Input id="apiKey" type="text" value={apiKey} readOnly className="mr-2" />
                <Button variant="outline" size="sm" onClick={handleCopyApiKey}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="flex justify-end mt-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Key className="h-4 w-4 mr-2" />
                      Regenerate API Key
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will invalidate your current API key and require you to update all your integrations.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRegenerateApiKey}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const IntegrationsTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect your favorite tools and services to streamline your compliance workflow.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {integrationApps.map((app) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{app.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{app.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {app.description}
                  </p>
                  <Button variant="outline" size="sm" disabled>
                    Coming Soon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const NotificationsTab = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Choose how you want to receive updates and reminders.
        </p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Email Notifications</h4>
              <p className="text-xs text-muted-foreground">
                Receive updates and reminders via email.
              </p>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Push Notifications</h4>
              <p className="text-xs text-muted-foreground">
                Get real-time updates on your mobile device.
              </p>
            </div>
            <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
