"use client";

import { useOnboarding } from "@/contexts/onboarding-context";
import CompanyInfoStep from "@/components/onboarding/company-info-step";
import TeamSetupStep from "@/components/onboarding/team-setup-step";
import FinalSetupStep from "@/components/onboarding/final-setup-step";

export default function OnboardingPage() {
  const { currentStep } = useOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep />;
      case 2:
        return <TeamSetupStep />;
      case 3:
        return <FinalSetupStep />;
      default:
        return <CompanyInfoStep />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Company Information";
      case 2:
        return "Team Setup";
      case 3:
        return "Final Setup";
      default:
        return "Company Information";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
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
              <div
                className={`w-16 h-1 rounded ${
                  currentStep > 1 ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div
                className={`w-16 h-1 rounded ${
                  currentStep > 2 ? "bg-blue-600" : "bg-gray-200"
                }`}
              ></div>
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
            Step {currentStep} of 3: {getStepTitle()}
          </p>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-lg shadow-lg p-8">{renderStep()}</div>
      </div>
    </div>
  );
}
