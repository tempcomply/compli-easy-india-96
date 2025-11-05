import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Star, Users, Mail, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type ServiceProviderProps = {
  onBack: () => void;
};

const SERVICE_PROVIDERS = [
  {
    id: 'sp1',
    name: 'CompliAce Solutions',
    logo: '🏢',
    pricing: '₹15,000/year',
    team: '1 CA + 1 Compliance Analyst',
    support: 'Chat & Email',
    rating: 4.8,
    badge: 'Recommended'
  },
  {
    id: 'sp2',
    name: 'TaxPro Partners',
    logo: '💼',
    pricing: '₹18,000/year',
    team: '2 CAs + Dedicated Manager',
    support: 'Phone & WhatsApp',
    rating: 4.9,
    badge: 'Top Rated'
  },
  {
    id: 'sp3',
    name: 'LegalEdge Advisors',
    logo: '⚖️',
    pricing: '₹12,000/year',
    team: '1 CA + Legal Team',
    support: 'Email Only',
    rating: 4.5,
    badge: 'Fastest Setup'
  }
];

export const ServiceProviderScreen = ({ onBack }: ServiceProviderProps) => {
  const [selectedOption, setSelectedOption] = useState<'invite' | 'select' | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInvite = () => {
    if (!inviteEmail) {
      toast({
        title: "Email required",
        description: "Please enter professional's email",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Invitation sent! (Demo)",
      description: `Invite sent to ${inviteEmail}`,
    });
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  const handleSelectProvider = () => {
    if (!selectedProvider) {
      toast({
        title: "Select a provider",
        description: "Please choose a service provider",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Setup Complete! (Demo)",
      description: "Your account is ready",
    });
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  const handleDemoMode = () => {
    navigate('/dashboard?demo=true');
  };

  if (!selectedOption) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-3xl space-y-6">
          <Button variant="ghost" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Choose Your Compliance Partner</h1>
            <p className="text-muted-foreground">
              Select how you want to manage your compliance and filings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="p-8 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedOption('invite')}
            >
              <div className="space-y-4">
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Invite Your Own Professional</h3>
                  <p className="text-sm text-muted-foreground">
                    Already have a CA or consultant? Invite them to manage your compliance through our platform
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedOption('select')}
            >
              <div className="space-y-4">
                <div className="p-3 rounded-full bg-primary/10 w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Select from Our Verified Providers</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from our list of verified, experienced service providers
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center pt-4">
            <Button variant="link" onClick={handleDemoMode}>
              Or explore demo dashboard first →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedOption === 'invite') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6">
          <Button variant="ghost" onClick={() => setSelectedOption(null)}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Mail className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Invite Your Professional</h2>
                <p className="text-sm text-muted-foreground">
                  They'll receive an invitation to join as your service provider
                </p>
              </div>

              <div className="space-y-2">
                <Label>Professional's Email Address</Label>
                <Input
                  type="email"
                  placeholder="professional@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button size="lg" className="w-full" onClick={handleInvite}>
                Send Invitation & Finish Setup
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-5xl space-y-6">
        <Button variant="ghost" onClick={() => setSelectedOption(null)}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Select a Service Provider</h1>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            You can change your provider after 12 months or earlier if there are service issues.
            We'll take detailed info and documents after your onboarding is complete.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICE_PROVIDERS.map((provider) => (
            <Card
              key={provider.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedProvider === provider.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedProvider(provider.id)}
            >
              <div className="space-y-4">
                {provider.badge && (
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      ⭐ {provider.badge}
                    </span>
                    {selectedProvider === provider.id && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                )}
                
                <div className="text-center">
                  <div className="text-4xl mb-2">{provider.logo}</div>
                  <h3 className="font-semibold text-lg">{provider.name}</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pricing:</span>
                    <span className="font-semibold">{provider.pricing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team:</span>
                    <span className="font-medium text-xs">{provider.team}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Support:</span>
                    <span className="font-medium">{provider.support}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{provider.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <Button size="lg" onClick={handleSelectProvider} className="min-w-[200px]">
            Finish Setup
          </Button>
        </div>
      </div>
    </div>
  );
};
