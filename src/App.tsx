
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProfessionalProtectedRoute from "@/components/ProfessionalProtectedRoute";

// Import all your pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ClientAuth from "./pages/ClientAuth";
import ProfessionalAuth from "./pages/ProfessionalAuth";
import Dashboard from "./pages/Dashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import Onboarding from "./pages/Onboarding";
import ClientOnboarding from "./pages/ClientOnboarding";
import ProfessionalOnboarding from "./pages/ProfessionalOnboarding";
import CompliancesPage from "./pages/CompliancesPage";
import LicensesPage from "./pages/LicensesPage";
import TaxesPage from "./pages/TaxesPage";
import TaxesGstPage from "./pages/TaxesGstPage";
import TaxesIncomeTaxPage from "./pages/TaxesIncomeTaxPage";
import TaxesTdsTcsPage from "./pages/TaxesTdsTcsPage";
import TaxesEmployeeTaxesPage from "./pages/TaxesEmployeeTaxesPage";
import TaxesStateLocalPage from "./pages/TaxesStateLocalPage";
import TaxesOtherTaxesPage from "./pages/TaxesOtherTaxesPage";
import ReportsPage from "./pages/ReportsPage";
import ServicesPage from "./pages/ServicesPage";
import DocumentsPage from "./pages/DocumentsPage";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import DocumentViewPage from "./pages/DocumentViewPage";
import TeamPage from "./pages/TeamPage";
import OrganizationPage from "./pages/OrganizationPage";
import SettingsPage from "./pages/SettingsPage";
import TasksPage from "./pages/TasksPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import AddComplianceTaskPage from "./pages/AddComplianceTaskPage";
import ClientsPage from "./pages/ClientsPage";
import AddClientPage from "./pages/AddClientPage";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import ClientDocumentsPage from "./pages/ClientDocumentsPage";
import CompaniesPage from "./pages/CompaniesPage";
import PaymentsPage from "./pages/PaymentsPage";
import MessagesPage from "./pages/MessagesPage";
import LegalServicesPage from "./pages/LegalServicesPage";
import AssetsPage from "./pages/AssetsPage";
import ClientCompanyPage from "./pages/ClientCompanyPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Mission from "./pages/Mission";
import Partner from "./pages/Partner";
import GetStarted from "./pages/GetStarted";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/client-auth" element={<ClientAuth />} />
              <Route path="/professional-auth" element={<ProfessionalAuth />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/get-started" element={<GetStarted />} />
              
              {/* Protected routes for users/clients */}
              <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              <Route path="/client-onboarding" element={<ProtectedRoute><ClientOnboarding /></ProtectedRoute>} />
              
              {/* Client routes */}
              <Route path="/client/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/client/compliances" element={<ProtectedRoute><CompliancesPage /></ProtectedRoute>} />
              <Route path="/client/licenses" element={<ProtectedRoute><LicensesPage /></ProtectedRoute>} />
              <Route path="/client/taxes" element={<ProtectedRoute><TaxesPage /></ProtectedRoute>} />
              <Route path="/client/taxes/gst" element={<ProtectedRoute><TaxesGstPage /></ProtectedRoute>} />
              <Route path="/client/taxes/income-tax" element={<ProtectedRoute><TaxesIncomeTaxPage /></ProtectedRoute>} />
              <Route path="/client/taxes/tds-tcs" element={<ProtectedRoute><TaxesTdsTcsPage /></ProtectedRoute>} />
              <Route path="/client/taxes/employee-taxes" element={<ProtectedRoute><TaxesEmployeeTaxesPage /></ProtectedRoute>} />
              <Route path="/client/taxes/state-local" element={<ProtectedRoute><TaxesStateLocalPage /></ProtectedRoute>} />
              <Route path="/client/taxes/other-taxes" element={<ProtectedRoute><TaxesOtherTaxesPage /></ProtectedRoute>} />
              <Route path="/client/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
              <Route path="/client/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
              <Route path="/client/documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
              <Route path="/client/documents/upload" element={<ProtectedRoute><DocumentUploadPage /></ProtectedRoute>} />
              <Route path="/client/documents/:id" element={<ProtectedRoute><DocumentViewPage /></ProtectedRoute>} />
              <Route path="/client/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
              <Route path="/client/organization" element={<ProtectedRoute><OrganizationPage /></ProtectedRoute>} />
              <Route path="/client/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="/client/company" element={<ProtectedRoute><ClientCompanyPage /></ProtectedRoute>} />
              
              {/* Professional routes */}
              <Route path="/professional/home" element={<ProfessionalProtectedRoute><ProfessionalDashboard /></ProfessionalProtectedRoute>} />
              <Route path="/professional/onboarding" element={<ProfessionalProtectedRoute><ProfessionalOnboarding /></ProfessionalProtectedRoute>} />
              <Route path="/professional/tasks" element={<ProfessionalProtectedRoute><TasksPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/tasks/add" element={<ProfessionalProtectedRoute><AddComplianceTaskPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/company/:id" element={<ProfessionalProtectedRoute><CompanyDetailsPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/clients" element={<ProfessionalProtectedRoute><ClientsPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/clients/add" element={<ProfessionalProtectedRoute><AddClientPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/clients/:id" element={<ProfessionalProtectedRoute><ClientDetailsPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/clients/:id/documents" element={<ProfessionalProtectedRoute><ClientDocumentsPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/companies" element={<ProfessionalProtectedRoute><CompaniesPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/payments" element={<ProfessionalProtectedRoute><PaymentsPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/messages" element={<ProfessionalProtectedRoute><MessagesPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/legal-services" element={<ProfessionalProtectedRoute><LegalServicesPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/assets" element={<ProfessionalProtectedRoute><AssetsPage /></ProfessionalProtectedRoute>} />
              
              {/* Professional viewing client routes */}
              <Route path="/professional/:clientId/home" element={<ProfessionalProtectedRoute><Dashboard /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/compliances" element={<ProfessionalProtectedRoute><CompliancesPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/taxes" element={<ProfessionalProtectedRoute><TaxesPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/taxes/gst" element={<ProfessionalProtectedRoute><TaxesGstPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/taxes/income-tax" element={<ProfessionalProtectedRoute><TaxesIncomeTaxPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/taxes/tds-tcs" element={<ProfessionalProtectedRoute><TaxesTdsTcsPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/taxes/employee-taxes" element={<ProfessionalProtectedRoute><TaxesEmployeeTaxesPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/taxes/state-local" element={<ProfessionalProtectedRoute><TaxesStateLocalPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/taxes/other-taxes" element={<ProfessionalProtectedRoute><TaxesOtherTaxesPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/reports" element={<ProfessionalProtectedRoute><ReportsPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/services" element={<ProfessionalProtectedRoute><ServicesPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/documents" element={<ProfessionalProtectedRoute><DocumentsPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/team" element={<ProfessionalProtectedRoute><TeamPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/organization" element={<ProfessionalProtectedRoute><OrganizationPage /></ProfessionalProtectedRoute>} />
              <Route path="/professional/:clientId/settings" element={<ProfessionalProtectedRoute><SettingsPage /></ProfessionalProtectedRoute>} />
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
