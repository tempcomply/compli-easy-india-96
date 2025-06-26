import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TaxCategoryCard from "@/components/TaxCategoryCard";
import {
  Receipt,
  Landmark,
  FileText,
  Building2,
  Users,
  Wallet,
} from "lucide-react";

const taxCategories = [
  {
    icon: Receipt,
    label: "Income Tax",
    description: "File your income tax returns and manage compliance.",
    cta: "File ITR",
    path: "/taxes/income-tax",
  },
  {
    icon: Landmark,
    label: "TDS/TCS",
    description: "Manage Tax Deducted at Source and Tax Collected at Source.",
    cta: "Manage TDS/TCS",
    path: "/taxes/tds-tcs",
  },
  {
    icon: FileText,
    label: "GST",
    description: "File your GST returns and manage compliance.",
    cta: "File GST",
    path: "/taxes/gst",
  },
  {
    icon: Building2,
    label: "State & Local Taxes",
    description: "Manage state-level taxes like VAT and property tax.",
    cta: "Manage State Taxes",
    path: "/taxes/state-local",
  },
  {
    icon: Users,
    label: "Employee Taxes",
    description: "Manage PF, ESI, and other employee-related taxes.",
    cta: "Manage Employee Taxes",
    path: "/taxes/employee-taxes",
  },
  {
    icon: Wallet,
    label: "Other Taxes",
    description: "Manage customs duty, excise duty, and other miscellaneous taxes.",
    cta: "Manage Other Taxes",
    path: "/taxes/other-taxes",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-bold text-xl text-gray-900">
              Secretary
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/services" className="hover:text-blue-600">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-blue-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Your Business's{" "}
            <span className="text-blue-600">Digital Secretary</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Built for the Founder's office, our comprehensive business management suite powers seamless compliance, tax management, and legal operations for businesses of all sizes.
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Streamline your business operations with AI-powered compliance tracking, automated tax filing, and professional advisory services - all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg">
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Tax Categories Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Explore Tax Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxCategories.map((category) => (
              <TaxCategoryCard
                key={category.label}
                icon={category.icon}
                label={category.label}
                description={category.description}
                cta={category.cta}
                onClick={() => (window.location.href = category.path)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; 2024 Secretary. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
