import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Users, User, Key, Receipt, Briefcase } from 'lucide-react';
import CompanyDetailsSection from '@/components/company/CompanyDetailsSection';
import DirectorsSection from '@/components/company/DirectorsSection';
import ShareholdersSection from '@/components/company/ShareholdersSection';
import CredentialManagerSection from '@/components/company/CredentialManagerSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

// Dummy data for company details
const dummyCompanyData = {
  name: 'ABC Corporation',
  registrationNumber: 'REG123456789',
  incorporationDate: '2020-05-15',
  registeredAddress: '123 Business Street, Corporate City, 56789',
  businessType: 'Private Limited Company',
  industry: 'Technology',
  fiscalYear: 'April - March',
  taxId: 'TAX987654321',
  website: 'https://abccorp.example.com',
  email: 'contact@abccorp.example.com',
  phone: '+1 (555) 123-4567',
  status: 'Active',
  description: 'ABC Corporation is a technology company specializing in software development and digital solutions.'
};

// Dummy data for directors
const dummyDirectors = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Chief Executive Officer',
    appointmentDate: '2020-05-15',
    email: 'john.smith@abccorp.example.com',
    phone: '+1 (555) 111-2222',
    address: '456 Executive Lane, Corporate City, 56789',
    din: 'DIN0001122' // Director Identification Number
  },
  {
    id: '2',
    name: 'Jane Doe',
    position: 'Chief Financial Officer',
    appointmentDate: '2020-05-15',
    email: 'jane.doe@abccorp.example.com',
    phone: '+1 (555) 333-4444',
    address: '789 Finance Avenue, Corporate City, 56789',
    din: 'DIN0003344'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    position: 'Chief Technology Officer',
    appointmentDate: '2020-06-01',
    email: 'michael.johnson@abccorp.example.com',
    phone: '+1 (555) 555-6666',
    address: '101 Tech Boulevard, Corporate City, 56789',
    din: 'DIN0005566'
  }
];

// Dummy data for shareholders
const dummyShareholders = [
  {
    id: '1',
    name: 'John Smith',
    shareholding: '35%',
    shareClass: 'Ordinary',
    sharesHeld: '35,000',
    dateAcquired: '2020-05-15',
    email: 'john.smith@abccorp.example.com',
    phone: '+1 (555) 111-2222'
  },
  {
    id: '2',
    name: 'Jane Doe',
    shareholding: '25%',
    shareClass: 'Ordinary',
    sharesHeld: '25,000',
    dateAcquired: '2020-05-15',
    email: 'jane.doe@abccorp.example.com',
    phone: '+1 (555) 333-4444'
  },
  {
    id: '3',
    name: 'Venture Capital Partners',
    shareholding: '20%',
    shareClass: 'Preferred',
    sharesHeld: '20,000',
    dateAcquired: '2020-06-15',
    email: 'investments@vcpartners.example.com',
    phone: '+1 (555) 777-8888'
  },
  {
    id: '4',
    name: 'Employee Stock Option Pool',
    shareholding: '15%',
    shareClass: 'Ordinary',
    sharesHeld: '15,000',
    dateAcquired: '2020-07-01',
    email: 'hr@abccorp.example.com',
    phone: '+1 (555) 999-0000'
  },
  {
    id: '5',
    name: 'Michael Johnson',
    shareholding: '5%',
    shareClass: 'Ordinary',
    sharesHeld: '5,000',
    dateAcquired: '2020-06-01',
    email: 'michael.johnson@abccorp.example.com',
    phone: '+1 (555) 555-6666'
  }
];

const OrganizationPage = () => {
  const [activeTab, setActiveTab] = useState('entity-info');

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Organization Details</h1>
          <p className="text-muted-foreground mt-1">
            Manage your entity information, associates, and credentials
          </p>
        </header>

        <Tabs defaultValue="entity-info" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="entity-info" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Entity Info</span>
            </TabsTrigger>
            <TabsTrigger value="associates" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Associates</span>
            </TabsTrigger>
            <TabsTrigger value="credentials" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">Credentials</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="entity-info" className="mt-6">
            <EntityInfoSection company={dummyCompanyData} />
          </TabsContent>
          
          <TabsContent value="associates" className="mt-6">
            <DirectorsSection directors={dummyDirectors} />
          </TabsContent>
          
          <TabsContent value="credentials" className="mt-6">
            <CredentialManagerSection />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const EntityInfoSection = ({ company }: { company: any }) => {
  return (
    <div className="space-y-6">
      <CompanyDetailsSection company={company} />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Tax Information
          </CardTitle>
          <CardDescription>
            Tax registration numbers and identifiers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="pan">PAN Number</Label>
              <Input id="pan" value="ABCDE1234F" readOnly />
            </div>
            <div>
              <Label htmlFor="tan">TAN Number</Label>
              <Input id="tan" value="KLMN12345O" readOnly />
            </div>
            <div>
              <Label htmlFor="gst">GST Number</Label>
              <Input id="gst" value="22ABCDE1234F2Z1" readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Employee & Contractor Information
          </CardTitle>
          <CardDescription>
            Employment and contractor registration details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pf">PF Registration</Label>
              <Input id="pf" value="HRBLR12345000000123" readOnly />
            </div>
            <div>
              <Label htmlFor="esi">ESI Registration</Label>
              <Input id="esi" value="31001234560000999" readOnly />
            </div>
            <div>
              <Label htmlFor="pt">Professional Tax</Label>
              <Input id="pt" value="PTMH123456789" readOnly />
            </div>
            <div>
              <Label htmlFor="lws">Labor Welfare Scheme</Label>
              <Input id="lws" value="LWS/MH/123456" readOnly />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationPage;
