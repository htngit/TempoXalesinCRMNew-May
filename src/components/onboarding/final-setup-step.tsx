"use client";

import { useState } from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { createClient } from "../../../supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Users, Target, CheckCircle2, Loader2 } from "lucide-react";

export default function FinalSetupStep() {
  const { companyInfo, teamSetup, setCurrentStep } = useOnboarding();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklyReports: true,
    marketingEmails: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error getting user:", userError);
        return;
      }

      // Create or update tenant record
      const { data: tenant, error: tenantError } = await supabase
        .from("tenants")
        .upsert(
          {
            name: companyInfo.name,
            industry: companyInfo.industry || null,
            company_size: companyInfo.companySize || null,
            website: companyInfo.website || null,
            address: companyInfo.address || null,
            owner_id: user.id,
            onboarding_complete: true,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "owner_id",
            ignoreDuplicates: false,
          },
        )
        .select();

      if (tenantError) {
        console.error("Error creating tenant:", tenantError);
        alert("Error creating organization: " + tenantError.message);
        return;
      }

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error in handleComplete:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Step 3: Final Setup
        </h1>
        <p className="text-gray-600">
          Review your information and complete the setup
        </p>
      </div>

      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4">
          {/* Company Info Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {companyInfo.name}
                </p>
                {companyInfo.industry && (
                  <p>
                    <strong>Industry:</strong> {companyInfo.industry}
                  </p>
                )}
                {companyInfo.companySize && (
                  <p>
                    <strong>Size:</strong> {companyInfo.companySize}
                  </p>
                )}
                {companyInfo.website && (
                  <p>
                    <strong>Website:</strong> {companyInfo.website}
                  </p>
                )}
                {companyInfo.address && (
                  <p>
                    <strong>Address:</strong> {companyInfo.address}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Team Setup Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teamSetup?.department && (
                  <p>
                    <strong>Department:</strong> {teamSetup.department}
                  </p>
                )}
                {teamSetup?.goals && (
                  <p>
                    <strong>Goals:</strong> {teamSetup.goals}
                  </p>
                )}
                {teamSetup?.teamMembers && teamSetup.teamMembers.length > 0 && (
                  <p>
                    <strong>Team Members:</strong>{" "}
                    {teamSetup.teamMembers.length} people
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emailNotifications"
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="emailNotifications"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email notifications for important activities
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="weeklyReports"
                checked={preferences.weeklyReports}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    weeklyReports: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="weeklyReports"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Weekly reports
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketingEmails"
                checked={preferences.marketingEmails}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    marketingEmails: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="marketingEmails"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Marketing emails and tips
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle2 className="w-5 h-5" />
            <p className="font-medium">
              Congratulations! Your setup is almost complete. Click the button
              below to finish and start using XalesIn CRM.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={handleBack} className="px-8 py-2">
          Back
        </Button>
        <Button
          onClick={handleComplete}
          disabled={isLoading}
          className="px-8 py-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Completing...
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </div>
    </div>
  );
}
