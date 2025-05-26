"use client";

import { useState } from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Users } from "lucide-react";

interface TeamMember {
  name: string;
  email: string;
  role: string;
}

const roles = [
  "Admin",
  "Sales Manager",
  "Sales Representative",
  "Marketing Manager",
  "Customer Support",
  "Other",
];

export default function TeamSetupStep() {
  const { setCurrentStep, teamSetup, updateTeamSetup } = useOnboarding();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState<TeamMember>({
    name: "",
    email: "",
    role: "",
  });

  const addTeamMember = () => {
    if (newMember.name && newMember.email && newMember.role) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember({ name: "", email: "", role: "" });
    }
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    updateTeamSetup({
      teamMembers,
      department: teamSetup?.department || "",
      goals: teamSetup?.goals || "",
    });
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Step 2: Team Setup
        </h1>
        <p className="text-gray-600">
          Set up your team and invite members to join
        </p>
      </div>

      <div className="space-y-6">
        {/* Department */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Primary Department
          </Label>
          <Select
            value={teamSetup?.department || ""}
            onValueChange={(value) =>
              updateTeamSetup({ ...teamSetup, department: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select primary department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="customer-support">Customer Support</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="management">Management</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Goals */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Primary Goals for Using CRM
          </Label>
          <Textarea
            value={teamSetup?.goals || ""}
            onChange={(e) =>
              updateTeamSetup({ ...teamSetup, goals: e.target.value })
            }
            placeholder="Describe your team's primary goals in using this CRM..."
            rows={3}
          />
        </div>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Members (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add new member form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <Input
                placeholder="Full name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
              />
              <Select
                value={newMember.role}
                onValueChange={(value) =>
                  setNewMember({ ...newMember, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addTeamMember} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Team members list */}
            {teamMembers.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Team Members:</h4>
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">
                        {member.email} • {member.role}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={handleBack} className="px-8 py-2">
          Back
        </Button>
        <Button onClick={handleContinue} className="px-8 py-2">
          Continue
        </Button>
      </div>
    </div>
  );
}
