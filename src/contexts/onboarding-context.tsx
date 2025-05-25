"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CompanyInfo {
  name: string;
  industry: string;
  companySize: string;
  website: string;
  address: string;
}

interface OnboardingContextType {
  companyInfo: CompanyInfo;
  setCompanyInfo: (info: CompanyInfo) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateCompanyInfo: (field: keyof CompanyInfo, value: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "",
    industry: "",
    companySize: "",
    website: "",
    address: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateCompanyInfo = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        companyInfo,
        setCompanyInfo,
        currentStep,
        setCurrentStep,
        updateCompanyInfo,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
