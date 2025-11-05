import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

type IncorporateFlowProps = {
  onBack: () => void;
  onComplete: (data: any) => void;
};

type PromoterData = {
  fullName: string;
  email: string;
  mobile: string;
  nationality: string;
  dob: string;
  pan: string;
  aadhaar: string;
  din: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isCollapsed: boolean;
};

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry',
];

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
  'Retail', 'Hospitality', 'Real Estate', 'Agriculture', 'Other'
];

const SERVICES = [
  { id: 'pan', name: 'PAN', mandatory: true },
  { id: 'tan', name: 'TAN', mandatory: true },
  { id: 'gst', name: 'GST Registration', mandatory: false },
  { id: 'msme', name: 'MSME Registration', mandatory: false },
  { id: 'iec', name: 'IEC', mandatory: false },
  { id: 'trademark', name: 'Trademark', mandatory: false },
  { id: 'fssai', name: 'FSSAI', mandatory: false },
];

export const IncorporateFlow = ({ onBack, onComplete }: IncorporateFlowProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    companyName: '',
    numPromoters: '2',
    industry: '',
    businessDescription: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    ownershipType: '',
    selectedServices: ['pan', 'tan'],
  });

  const [promoters, setPromoters] = useState<PromoterData[]>([
    {
      fullName: '', email: '', mobile: '', nationality: 'INDIAN',
      dob: '', pan: '', aadhaar: '', din: '',
      addressLine1: '', addressLine2: '', city: '', state: '', pincode: '',
      isCollapsed: false
    }
  ]);

  const [showAddressInPromoter, setShowAddressInPromoter] = useState<boolean[]>([false]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPromoter = () => {
    setPromoters([...promoters, {
      fullName: '', email: '', mobile: '', nationality: 'INDIAN',
      dob: '', pan: '', aadhaar: '', din: '',
      addressLine1: '', addressLine2: '', city: '', state: '', pincode: '',
      isCollapsed: false
    }]);
    setShowAddressInPromoter([...showAddressInPromoter, false]);
  };

  const removePromoter = (index: number) => {
    if (promoters.length > 1) {
      setPromoters(promoters.filter((_, i) => i !== index));
      setShowAddressInPromoter(showAddressInPromoter.filter((_, i) => i !== index));
    }
  };

  const togglePromoterCollapse = (index: number) => {
    const updated = [...promoters];
    updated[index].isCollapsed = !updated[index].isCollapsed;
    setPromoters(updated);
  };

  const updatePromoter = (index: number, field: keyof PromoterData, value: any) => {
    const updated = [...promoters];
    updated[index][field] = value as never;
    setPromoters(updated);
  };

  const toggleService = (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (service?.mandatory) return;

    if (formData.selectedServices.includes(serviceId)) {
      updateFormData('selectedServices', formData.selectedServices.filter(s => s !== serviceId));
    } else {
      updateFormData('selectedServices', [...formData.selectedServices, serviceId]);
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleFinish = () => {
    toast({
      title: "Setup Complete! (Demo)",
      description: "Your incorporation request has been submitted",
    });
    console.log('Incorporation Data:', { ...formData, promoters });
    onComplete({ ...formData, promoters });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl space-y-6">
        <Button variant="ghost" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-8">
          {/* Step 1: Basic Company Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Basic Company Details</h2>
                <p className="text-muted-foreground">Tell us about your new company</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Expected Company Name</Label>
                  <Input
                    placeholder="ABC Private Limited"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Number of Promoters</Label>
                  <Select value={formData.numPromoters} onValueChange={(v) => updateFormData('numPromoters', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 199 }, (_, i) => i + 2).map(num => (
                        <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select value={formData.industry} onValueChange={(v) => updateFormData('industry', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map(ind => (
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Business Description</Label>
                  <Textarea
                    placeholder="Describe your business activities..."
                    value={formData.businessDescription}
                    onChange={(e) => updateFormData('businessDescription', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Registered Office Address */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Registered Office Address</h2>
                <p className="text-muted-foreground">Where will your company be registered?</p>
              </div>

              <div className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      placeholder="City"
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
                  <Label>Ownership Type</Label>
                  <Select value={formData.ownershipType} onValueChange={(v) => updateFormData('ownershipType', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="own">Own</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="shared">Shared</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Promoter Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Promoter Details</h2>
                <p className="text-muted-foreground">Directors/Partners of the company</p>
              </div>

              <div className="space-y-4">
                {promoters.map((promoter, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">
                          {promoter.fullName || `Promoter ${index + 1}`}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePromoterCollapse(index)}
                        >
                          {promoter.isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                        </Button>
                      </div>
                      {promoters.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePromoter(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {!promoter.isCollapsed && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                              value={promoter.fullName}
                              onChange={(e) => updatePromoter(index, 'fullName', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={promoter.email}
                              onChange={(e) => updatePromoter(index, 'email', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Mobile</Label>
                            <Input
                              value={promoter.mobile}
                              onChange={(e) => updatePromoter(index, 'mobile', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Date of Birth</Label>
                            <Input
                              type="date"
                              value={promoter.dob}
                              onChange={(e) => updatePromoter(index, 'dob', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Nationality</Label>
                          <Input
                            value={promoter.nationality}
                            onChange={(e) => updatePromoter(index, 'nationality', e.target.value)}
                          />
                        </div>

                        {promoter.nationality === 'INDIAN' && (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>PAN</Label>
                              <Input
                                maxLength={10}
                                value={promoter.pan}
                                onChange={(e) => updatePromoter(index, 'pan', e.target.value.toUpperCase())}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Aadhaar</Label>
                              <Input
                                maxLength={12}
                                value={promoter.aadhaar}
                                onChange={(e) => updatePromoter(index, 'aadhaar', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>DIN/DPIN (if any)</Label>
                              <Input
                                value={promoter.din}
                                onChange={(e) => updatePromoter(index, 'din', e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const updated = [...showAddressInPromoter];
                              updated[index] = !updated[index];
                              setShowAddressInPromoter(updated);
                            }}
                          >
                            {showAddressInPromoter[index] ? 'Hide' : 'Show'} Address
                          </Button>

                          {showAddressInPromoter[index] && (
                            <div className="mt-4 space-y-4 p-4 border rounded-lg">
                              <div className="space-y-2">
                                <Label>Address Line 1</Label>
                                <Input
                                  value={promoter.addressLine1}
                                  onChange={(e) => updatePromoter(index, 'addressLine1', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Address Line 2</Label>
                                <Input
                                  value={promoter.addressLine2}
                                  onChange={(e) => updatePromoter(index, 'addressLine2', e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label>City</Label>
                                  <Input
                                    value={promoter.city}
                                    onChange={(e) => updatePromoter(index, 'city', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>State</Label>
                                  <Select 
                                    value={promoter.state} 
                                    onValueChange={(v) => updatePromoter(index, 'state', v)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="State" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {INDIAN_STATES.map(state => (
                                        <SelectItem key={state} value={state}>{state}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Pincode</Label>
                                  <Input
                                    maxLength={6}
                                    value={promoter.pincode}
                                    onChange={(e) => updatePromoter(index, 'pincode', e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}

                <Button variant="outline" onClick={addPromoter} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Promoter
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Licenses & Registrations */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Licenses and Registrations</h2>
                <p className="text-muted-foreground text-sm">
                  We've pre-selected the mandatory essentials (PAN & TAN). You can add more now or later from your dashboard.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {SERVICES.map(service => (
                  <Card
                    key={service.id}
                    className={`p-4 cursor-pointer transition-all ${
                      formData.selectedServices.includes(service.id) ? 'ring-2 ring-primary' : ''
                    } ${service.mandatory ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md'}`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        {service.mandatory && (
                          <p className="text-xs text-muted-foreground mt-1">Mandatory</p>
                        )}
                      </div>
                      <Checkbox
                        checked={formData.selectedServices.includes(service.id)}
                        disabled={service.mandatory}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            {step < 4 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleFinish}>Finish Setup</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
