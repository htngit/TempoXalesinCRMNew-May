"use client";

import { useOnboarding } from "@/contexts/onboarding-context";
import CompanyInfoStep from "@/components/onboarding/company-info-step";

export default function OnboardingPage() {
  const { currentStep } = useOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep />;
      default:
        return <CompanyInfoStep />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div className="w-16 h-1 bg-gray-200 rounded"></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div className="w-16 h-1 bg-gray-200 rounded"></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600">
            Langkah {currentStep} dari 3
          </p>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-lg shadow-lg p-8">{renderStep()}</div>
      </div>
    </div>
  );
}
