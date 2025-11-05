import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

type ExistingCompanyFlowProps = {
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

const ENTITY_TYPES = [
  'Private Limited Company',
  'Limited Liability Partnership (LLP)',
  'One Person Company (OPC)',
  'Partnership Firm',
  'Sole Proprietorship'
];

const LICENSES = [
  { id: 'pan', name: 'PAN', mandatory: true },
  { id: 'tan', name: 'TAN', mandatory: true },
  { id: 'gst', name: 'GST Registration', mandatory: false },
  { id: 'msme', name: 'MSME Registration', mandatory: false },
  { id: 'iec', name: 'IEC', mandatory: false },
  { id: 'fssai', name: 'FSSAI', mandatory: false },
  { id: 'shopact', name: 'Shop Act', mandatory: false },
];

export const ExistingCompanyFlow = ({ onBack, onComplete }: ExistingCompanyFlowProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    entityType: '',
    cin: '',
    companyName: '',
    incorporationDate: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    ownershipType: '',
    selectedLicenses: ['pan', 'tan'],
    licenseNumbers: {} as Record<string, string>,
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

  const updateLicenseNumber = (licenseId: string, number: string) => {
    setFormData(prev => ({
      ...prev,
      licenseNumbers: { ...prev.licenseNumbers, [licenseId]: number }
    }));
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

  const toggleLicense = (licenseId: string) => {
    const license = LICENSES.find(l => l.id === licenseId);
    if (license?.mandatory) return;

    if (formData.selectedLicenses.includes(licenseId)) {
      updateFormData('selectedLicenses', formData.selectedLicenses.filter(l => l !== licenseId));
    } else {
      updateFormData('selectedLicenses', [...formData.selectedLicenses, licenseId]);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
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
      title: "Onboarding Complete! (Demo)",
      description: "Your company has been successfully onboarded",
    });
    console.log('Existing Company Data:', { ...formData, promoters });
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
          {/* Step 1: Company Type & Identification */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Company Type & Identification</h2>
                <p className="text-muted-foreground">Let's identify your company</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Type of Entity</Label>
                  <Select value={formData.entityType} onValueChange={(v) => updateFormData('entityType', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ENTITY_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>CIN / LLPIN</Label>
                  <Input
                    placeholder="U74999DL2020PTC123456"
                    value={formData.cin}
                    onChange={(e) => updateFormData('cin', e.target.value.toUpperCase())}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    placeholder="ABC Private Limited"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Incorporation Date</Label>
                  <Input
                    type="date"
                    value={formData.incorporationDate}
                    onChange={(e) => updateFormData('incorporationDate', e.target.value)}
                  />
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-4">Registered Address</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Address Line 1</Label>
                      <Input
                        value={formData.addressLine1}
                        onChange={(e) => updateFormData('addressLine1', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Address Line 2</Label>
                      <Input
                        value={formData.addressLine2}
                        onChange={(e) => updateFormData('addressLine2', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Pincode</Label>
                        <Input
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
                          <SelectValue placeholder="Select" />
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
              </div>
            </div>
          )}

          {/* Step 2: Promoter Details */}
          {step === 2 && (
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
                              <Label>DIN/DPIN</Label>
                              <Input
                                value={promoter.din}
                                onChange={(e) => updatePromoter(index, 'din', e.target.value)}
                                placeholder="Mandatory"
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
                            {showAddressInPromoter[index] ? 'Hide' : 'Show'} Address (As per records)
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

          {/* Step 3: Licenses & Registrations */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Licenses & Registrations</h2>
                <p className="text-muted-foreground text-sm">
                  Add your company's licenses and enter their numbers
                </p>
              </div>

              <div className="space-y-4">
                {LICENSES.map(license => (
                  <Card
                    key={license.id}
                    className={`p-4 transition-all ${
                      formData.selectedLicenses.includes(license.id) ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={formData.selectedLicenses.includes(license.id)}
                        disabled={license.mandatory}
                        onCheckedChange={() => toggleLicense(license.id)}
                      />
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="font-semibold">{license.name}</h3>
                          {license.mandatory && (
                            <p className="text-xs text-muted-foreground">Mandatory</p>
                          )}
                        </div>
                        {formData.selectedLicenses.includes(license.id) && (
                          <Input
                            placeholder={`Enter ${license.name} number`}
                            value={formData.licenseNumbers[license.id] || ''}
                            onChange={(e) => updateLicenseNumber(license.id, e.target.value)}
                          />
                        )}
                      </div>
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
            {step < 3 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleFinish}>Continue</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
