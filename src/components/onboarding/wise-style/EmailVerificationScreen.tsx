import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

type EmailVerificationProps = {
  onVerified: (email: string) => void;
};

export const EmailVerificationScreen = ({ onVerified }: EmailVerificationProps) => {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  const handleSendVerification = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid business email",
        variant: "destructive",
      });
      return;
    }

    // Demo: Simulate sending verification email
    setIsVerifying(true);
    setTimeout(() => {
      toast({
        title: "Verification link sent!",
        description: `Check ${email} for verification link`,
      });
      // Demo: Auto-verify after 2 seconds
      setTimeout(() => {
        setIsVerified(true);
      }, 2000);
    }, 1000);
  };

  const handleContinue = () => {
    onVerified(email);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Email Verified!</h2>
            <p className="text-muted-foreground">
              Your email {email} has been successfully verified.
            </p>
          </div>
          <Button onClick={handleContinue} size="lg" className="w-full">
            Continue
          </Button>
        </Card>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6">
          <div className="animate-pulse">
            <div className="h-12 w-12 bg-primary/20 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verifying your email...</h2>
            <p className="text-muted-foreground text-sm">
              We've sent a verification link to {email}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Create your ComplianceAI account</h1>
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <a href="/client-auth?mode=signin" className="text-primary hover:underline">
              Log in
            </a>
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                First, enter your business email address
              </Label>
              <p className="text-xs text-muted-foreground">
                Kindly enter business email for organized and faster validation
              </p>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                onKeyDown={(e) => e.key === 'Enter' && handleSendVerification()}
              />
            </div>

            <Button 
              onClick={handleSendVerification} 
              size="lg" 
              className="w-full"
              disabled={!email}
            >
              Next
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              By registering, you accept our{' '}
              <a href="/terms" className="underline">Terms of use</a>
              {' '}and{' '}
              <a href="/privacy" className="underline">Privacy Policy</a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
