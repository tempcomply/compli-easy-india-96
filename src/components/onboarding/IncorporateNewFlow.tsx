import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type IncorporateData = {
  proposedNames: string[];
  businessStructure: string;
  industry: string;
  natureOfBusiness: string;
  estimatedCapital: string;
  hasPAN: string;
  timeline: string;
  state: string;
  city: string;
  pincode: string;
  mobile: string;
  alternateMobile: string;
  numDirectors: string;
  documentsReady: string;
  hasForeignDirector: string;
  services: string[];
};

const BUSINESS_STRUCTURES = [
  'Private Limited Company',
  'Public Limited Company',
  'Limited Liability Partnership (LLP)',
  'One Person Company (OPC)',
  'Partnership Firm',
  'Sole Proprietorship',
];

const INDUSTRIES = [
  'Information Technology',
  'Manufacturing',
  'Trading',
  'Services',
  'Healthcare',
  'Education',
  'Real Estate',
  'E-commerce',
  'Other',
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
];

const SERVICES = [
  'Company Registration',
  'GST Registration',
  'Trademark Registration',
  'MSME Registration',
  'Compliance Management',
  'Other Services',
];

export const IncorporateNewFlow = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<IncorporateData>({
    proposedNames: ['', '', ''],
    businessStructure: '',
    industry: '',
    natureOfBusiness: '',
    estimatedCapital: '',
    hasPAN: '',
    timeline: '',
    state: '',
    city: '',
    pincode: '',
    mobile: '',
    alternateMobile: '',
    numDirectors: '',
    documentsReady: '',
    hasForeignDirector: '',
    services: [],
  });
  
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const totalSteps = 5;

  const updateFormData = (field: keyof IncorporateData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = async () => {
    try {
      await completeOnboarding(formData.businessStructure);
      toast({
        title: "Onboarding complete!",
        description: "Your incorporation request has been submitted.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete onboarding",
        variant: "destructive",
      });
    }
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">Step {step} of {totalSteps}</p>
          </div>
          <CardTitle>Incorporate a New Company</CardTitle>
          <CardDescription>
            {step === 1 && "Let's start with basic company details"}
            {step === 2 && "Tell us about your business activity"}
            {step === 3 && "Where will your company be registered?"}
            {step === 4 && "Information about directors/partners"}
            {step === 5 && "What services do you need?"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-4">
                <Label>Proposed Company Names (up to 3 options)</Label>
                {formData.proposedNames.map((name, index) => (
                  <Input
                    key={index}
                    placeholder={`Option ${index + 1}`}
                    value={name}
                    onChange={(e) => {
                      const newNames = [...formData.proposedNames];
                      newNames[index] = e.target.value;
                      updateFormData('proposedNames', newNames);
                    }}
                  />
                ))}
              </div>
              
              <div className="space-y-2">
                <Label>Business Structure</Label>
                <Select value={formData.businessStructure} onValueChange={(v) => updateFormData('businessStructure', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business structure" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_STRUCTURES.map(structure => (
                      <SelectItem key={structure} value={structure}>{structure}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Industry/Sector</Label>
                <Select value={formData.industry} onValueChange={(v) => updateFormData('industry', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label>Nature of Business Activity</Label>
                <Input
                  placeholder="E.g., Software Development, Trading in Electronics"
                  value={formData.natureOfBusiness}
                  onChange={(e) => updateFormData('natureOfBusiness', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Estimated Paid-up Capital</Label>
                <Input
                  placeholder="₹ 1,00,000"
                  value={formData.estimatedCapital}
                  onChange={(e) => updateFormData('estimatedCapital', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Do you have a PAN card?</Label>
                <RadioGroup value={formData.hasPAN} onValueChange={(v) => updateFormData('hasPAN', v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="pan-yes" />
                    <Label htmlFor="pan-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pan-no" />
                    <Label htmlFor="pan-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Expected Timeline for Incorporation</Label>
                <Select value={formData.timeline} onValueChange={(v) => updateFormData('timeline', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Within 7 days</SelectItem>
                    <SelectItem value="normal">Within 15 days</SelectItem>
                    <SelectItem value="flexible">Within 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label>State</Label>
                <Select value={formData.state} onValueChange={(v) => updateFormData('state', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  placeholder="Enter city name"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Pincode</Label>
                <Input
                  placeholder="000000"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => updateFormData('pincode', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input
                  placeholder="+91 00000 00000"
                  value={formData.mobile}
                  onChange={(e) => updateFormData('mobile', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Alternate Contact Number (Optional)</Label>
                <Input
                  placeholder="+91 00000 00000"
                  value={formData.alternateMobile}
                  onChange={(e) => updateFormData('alternateMobile', e.target.value)}
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="space-y-2">
                <Label>Number of Directors/Partners</Label>
                <Input
                  type="number"
                  placeholder="2"
                  min="1"
                  value={formData.numDirectors}
                  onChange={(e) => updateFormData('numDirectors', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Are the required documents ready?</Label>
                <RadioGroup value={formData.documentsReady} onValueChange={(v) => updateFormData('documentsReady', v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="docs-yes" />
                    <Label htmlFor="docs-yes">Yes, all documents are ready</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="docs-partial" />
                    <Label htmlFor="docs-partial">Partially ready</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="docs-no" />
                    <Label htmlFor="docs-no">No, need help with documentation</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Any Foreign National as Director?</Label>
                <RadioGroup value={formData.hasForeignDirector} onValueChange={(v) => updateFormData('hasForeignDirector', v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="foreign-yes" />
                    <Label htmlFor="foreign-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="foreign-no" />
                    <Label htmlFor="foreign-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <Label>What services do you need?</Label>
              <div className="space-y-3">
                {SERVICES.map(service => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('services', [...formData.services, service]);
                        } else {
                          updateFormData('services', formData.services.filter(s => s !== service));
                        }
                      }}
                    />
                    <Label htmlFor={service} className="font-normal cursor-pointer">
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {step < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Complete Setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
