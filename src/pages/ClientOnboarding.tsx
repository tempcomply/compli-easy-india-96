import React, { useState } from 'react';
import { EmailVerificationScreen } from '@/components/onboarding/wise-style/EmailVerificationScreen';
import { BusinessStageScreen } from '@/components/onboarding/wise-style/BusinessStageScreen';
import { IncorporateFlow } from '@/components/onboarding/wise-style/IncorporateFlow';
import { ExistingCompanyFlow } from '@/components/onboarding/wise-style/ExistingCompanyFlow';
import { ComplianceOverviewScreen } from '@/components/onboarding/wise-style/ComplianceOverviewScreen';
import { ServiceProviderScreen } from '@/components/onboarding/wise-style/ServiceProviderScreen';

type OnboardingStep = 'email' | 'stage' | 'incorporate' | 'existing' | 'compliance' | 'provider';

const ClientOnboarding = () => {
  const [step, setStep] = useState<OnboardingStep>('email');
  const [userEmail, setUserEmail] = useState('');
  const [onboardingData, setOnboardingData] = useState<any>(null);

  const handleEmailVerified = (email: string) => {
    setUserEmail(email);
    setStep('stage');
  };

  const handleStageSelect = (stage: 'incorporate' | 'existing') => {
    if (stage === 'incorporate') {
      setStep('incorporate');
    } else {
      setStep('existing');
    }
  };

  const handleFlowComplete = (data: any) => {
    setOnboardingData(data);
    setStep('compliance');
  };

  const handleComplianceReviewed = () => {
    setStep('provider');
  };

  if (step === 'email') {
    return <EmailVerificationScreen onVerified={handleEmailVerified} />;
  }

  if (step === 'stage') {
    return (
      <BusinessStageScreen
        onSelect={handleStageSelect}
        onBack={() => setStep('email')}
      />
    );
  }

  if (step === 'incorporate') {
    return (
      <IncorporateFlow
        onBack={() => setStep('stage')}
        onComplete={handleFlowComplete}
      />
    );
  }

  if (step === 'existing') {
    return (
      <ExistingCompanyFlow
        onBack={() => setStep('stage')}
        onComplete={handleFlowComplete}
      />
    );
  }

  if (step === 'compliance') {
    return (
      <ComplianceOverviewScreen
        onBack={() => setStep(onboardingData?.companyName ? 'existing' : 'incorporate')}
        onContinue={handleComplianceReviewed}
      />
    );
  }

  if (step === 'provider') {
    return (
      <ServiceProviderScreen
        onBack={() => setStep('compliance')}
      />
    );
  }

  return null;
};

export default ClientOnboarding;
