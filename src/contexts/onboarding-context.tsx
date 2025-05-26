"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CompanyInfo {
  name: string;
  industry: string;
  companySize: string;
  website: string;
  address: string;
}

interface TeamSetup {
  department: string;
  goals: string;
  teamMembers: Array<{
    name: string;
    email: string;
    role: string;
  }>;
}

interface OnboardingContextType {
  companyInfo: CompanyInfo;
  setCompanyInfo: (info: CompanyInfo) => void;
  teamSetup: TeamSetup | null;
  setTeamSetup: (setup: TeamSetup) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateCompanyInfo: (field: keyof CompanyInfo, value: string) => void;
  updateTeamSetup: (setup: Partial<TeamSetup>) => void;
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

  const [teamSetup, setTeamSetup] = useState<TeamSetup | null>({
    department: "",
    goals: "",
    teamMembers: [],
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateCompanyInfo = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));
  };

  const updateTeamSetup = (setup: Partial<TeamSetup>) => {
    setTeamSetup((prev) => ({ ...prev, ...setup }) as TeamSetup);
  };

  return (
    <OnboardingContext.Provider
      value={{
        companyInfo,
        setCompanyInfo,
        teamSetup,
        setTeamSetup,
        currentStep,
        setCurrentStep,
        updateCompanyInfo,
        updateTeamSetup,
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
