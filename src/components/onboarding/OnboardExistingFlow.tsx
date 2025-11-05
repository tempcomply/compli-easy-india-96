import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type ExistingData = {
  companyName: string;
  businessStructure: string;
  cinNumber: string;
  incorporationDate: string;
  pan: string;
  tan: string;
  gst: string;
  msme: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  pincode: string;
  numDirectors: string;
  numEmployees: string;
  complianceStatus: string;
  mobile: string;
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

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
];

const EMPLOYEE_RANGES = [
  '1-10',
  '11-50',
  '51-100',
  '101-500',
  '500+',
];

const COMPLIANCE_STATUS = [
  'Up to date',
  'Slightly behind',
  'Significantly behind',
  'Not sure',
];

const SERVICES = [
  'Annual Compliance',
  'GST Filing',
  'Income Tax Filing',
  'Audit Support',
  'Legal Documentation',
  'Payroll & TDS',
  'Other Services',
];

export const OnboardExistingFlow = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ExistingData>({
    companyName: '',
    businessStructure: '',
    cinNumber: '',
    incorporationDate: '',
    pan: '',
    tan: '',
    gst: '',
    msme: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
    pincode: '',
    numDirectors: '',
    numEmployees: '',
    complianceStatus: '',
    mobile: '',
    services: [],
  });
  
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const totalSteps = 5;

  const updateFormData = (field: keyof ExistingData, value: any) => {
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
        description: "Your company has been successfully onboarded.",
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
          <CardTitle>Onboard Existing Company</CardTitle>
          <CardDescription>
            {step === 1 && "Let's identify your company"}
            {step === 2 && "Statutory information and registrations"}
            {step === 3 && "Registered office address"}
            {step === 4 && "Current structure and compliance status"}
            {step === 5 && "What help do you need?"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label>Legal Company Name</Label>
                <Input
                  placeholder="ABC Private Limited"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                />
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
                <Label>CIN/Registration Number</Label>
                <Input
                  placeholder="U74999DL2020PTC123456"
                  value={formData.cinNumber}
                  onChange={(e) => updateFormData('cinNumber', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Date of Incorporation</Label>
                <Input
                  type="date"
                  value={formData.incorporationDate}
                  onChange={(e) => updateFormData('incorporationDate', e.target.value)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label>PAN Number</Label>
                <Input
                  placeholder="AAAAA0000A"
                  maxLength={10}
                  value={formData.pan}
                  onChange={(e) => updateFormData('pan', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-2">
                <Label>TAN Number (Optional)</Label>
                <Input
                  placeholder="AAAA00000A"
                  maxLength={10}
                  value={formData.tan}
                  onChange={(e) => updateFormData('tan', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-2">
                <Label>GST Number (Optional)</Label>
                <Input
                  placeholder="00AAAAA0000A0Z0"
                  maxLength={15}
                  value={formData.gst}
                  onChange={(e) => updateFormData('gst', e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-2">
                <Label>MSME Registration Number (Optional)</Label>
                <Input
                  placeholder="UDYAM-XX-00-0000000"
                  value={formData.msme}
                  onChange={(e) => updateFormData('msme', e.target.value.toUpperCase())}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label>Address Line 1</Label>
                <Input
                  placeholder="Building/House No., Street"
                  value={formData.addressLine1}
                  onChange={(e) => updateFormData('addressLine1', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Address Line 2 (Optional)</Label>
                <Input
                  placeholder="Area, Locality"
                  value={formData.addressLine2}
                  onChange={(e) => updateFormData('addressLine2', e.target.value)}
                />
              </div>

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
            </>
          )}

          {step === 4 && (
            <>
              <div className="space-y-2">
                <Label>Number of Directors/Partners/Members</Label>
                <Input
                  type="number"
                  placeholder="2"
                  min="1"
                  value={formData.numDirectors}
                  onChange={(e) => updateFormData('numDirectors', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Number of Employees</Label>
                <Select value={formData.numEmployees} onValueChange={(v) => updateFormData('numEmployees', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYEE_RANGES.map(range => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Current Compliance Status</Label>
                <Select value={formData.complianceStatus} onValueChange={(v) => updateFormData('complianceStatus', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPLIANCE_STATUS.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Primary Contact Number</Label>
                <Input
                  placeholder="+91 00000 00000"
                  value={formData.mobile}
                  onChange={(e) => updateFormData('mobile', e.target.value)}
                />
              </div>
            </>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <Label>What help do you need from us?</Label>
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
