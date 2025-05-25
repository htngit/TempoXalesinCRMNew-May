import { OnboardingProvider } from "@/contexts/onboarding-context";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </OnboardingProvider>
  );
}
