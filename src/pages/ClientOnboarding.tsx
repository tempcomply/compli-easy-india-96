import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, FileText, ArrowRight } from 'lucide-react';
import { IncorporateNewFlow } from '@/components/onboarding/IncorporateNewFlow';
import { OnboardExistingFlow } from '@/components/onboarding/OnboardExistingFlow';

type OnboardingPath = 'incorporate' | 'existing' | null;

const ClientOnboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<OnboardingPath>(null);

  // DEMO MODE: Commented out auth check
  /*
  if (!user) {
    navigate('/client-auth');
    return null;
  }
  */

  if (!selectedPath) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to ComplianceAI</CardTitle>
            <CardDescription className="text-base">
              Let's get your company set up
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedPath('incorporate')}
                className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all p-6 text-left bg-card hover:bg-accent/50"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 text-primary">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Incorporate a New Company</h3>
                    <p className="text-sm text-muted-foreground">
                      Start from scratch and register your new business with our help
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>

              <button
                onClick={() => setSelectedPath('existing')}
                className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all p-6 text-left bg-card hover:bg-accent/50"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 text-primary">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Onboard an Existing Company</h3>
                    <p className="text-sm text-muted-foreground">
                      Already have a registered company? Let us manage your compliance
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedPath === 'incorporate') {
    return <IncorporateNewFlow onBack={() => setSelectedPath(null)} />;
  }

  if (selectedPath === 'existing') {
    return <OnboardExistingFlow onBack={() => setSelectedPath(null)} />;
  }

  return null;
};

export default ClientOnboarding;
