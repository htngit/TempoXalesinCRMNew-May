"use client";

import { useState, useEffect } from "react";
import { useOnboarding } from "@/contexts/onboarding-context";
import { createClient } from "../../../supabase/client";
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
import { AlertCircle, CheckCircle2 } from "lucide-react";

const industries = [
  "Teknologi",
  "Keuangan",
  "Kesehatan",
  "Pendidikan",
  "Ritel",
  "Manufaktur",
  "Konstruksi",
  "Transportasi",
  "Media & Hiburan",
  "Lainnya",
];

const companySizes = [
  "1-10 karyawan",
  "11-50 karyawan",
  "51-200 karyawan",
  "201-500 karyawan",
  "500+ karyawan",
];

export default function CompanyInfoStep() {
  const { companyInfo, updateCompanyInfo, setCurrentStep } = useOnboarding();
  const [nameValidation, setNameValidation] = useState<{
    isChecking: boolean;
    isValid: boolean | null;
    message: string;
  }>({ isChecking: false, isValid: null, message: "" });
  const [websiteError, setWebsiteError] = useState("");

  const supabase = createClient();

  const validateCompanyName = async (name: string) => {
    if (!name.trim()) {
      setNameValidation({ isChecking: false, isValid: null, message: "" });
      return;
    }

    setNameValidation({
      isChecking: true,
      isValid: null,
      message: "Memeriksa ketersediaan nama...",
    });

    try {
      const { data, error } = await supabase
        .from("tenants")
        .select("name")
        .eq("name", name.trim())
        .maybeSingle();

      if (error) {
        console.error("Error checking company name:", error);
        setNameValidation({
          isChecking: false,
          isValid: null,
          message: "Terjadi kesalahan saat memeriksa nama perusahaan",
        });
        return;
      }

      if (data) {
        setNameValidation({
          isChecking: false,
          isValid: false,
          message:
            "Nama perusahaan ini sudah terdaftar. Silakan gunakan nama lain.",
        });
      } else {
        setNameValidation({
          isChecking: false,
          isValid: true,
          message: "Nama perusahaan tersedia!",
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setNameValidation({
        isChecking: false,
        isValid: null,
        message: "Terjadi kesalahan yang tidak terduga",
      });
    }
  };

  const validateWebsite = (url: string) => {
    if (!url.trim()) {
      setWebsiteError("");
      return true;
    }

    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/.*)?$/;
    if (!urlPattern.test(url)) {
      setWebsiteError("Format URL tidak valid. Contoh: https://example.com");
      return false;
    }

    setWebsiteError("");
    return true;
  };

  const handleNameBlur = () => {
    if (companyInfo.name.trim()) {
      validateCompanyName(companyInfo.name);
    }
  };

  const handleWebsiteChange = (value: string) => {
    updateCompanyInfo("website", value);
    validateWebsite(value);
  };

  const canContinue = () => {
    return (
      companyInfo.name.trim() !== "" &&
      nameValidation.isValid === true &&
      !websiteError &&
      !nameValidation.isChecking
    );
  };

  const handleContinue = () => {
    if (canContinue()) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Langkah 1: Informasi Perusahaan Anda
        </h1>
        <p className="text-gray-600">
          Berikan informasi dasar tentang perusahaan Anda untuk memulai
        </p>
      </div>

      <div className="space-y-6">
        {/* Company Name */}
        <div className="space-y-2">
          <Label
            htmlFor="companyName"
            className="text-sm font-medium text-gray-700"
          >
            Nama Perusahaan <span className="text-red-500">*</span>
          </Label>
          <Input
            id="companyName"
            type="text"
            value={companyInfo.name}
            onChange={(e) => {
              updateCompanyInfo("name", e.target.value);
              setNameValidation({
                isChecking: false,
                isValid: null,
                message: "",
              });
            }}
            onBlur={handleNameBlur}
            placeholder="Masukkan nama perusahaan"
            className={`${
              nameValidation.isValid === false
                ? "border-red-500"
                : nameValidation.isValid === true
                  ? "border-green-500"
                  : ""
            }`}
          />
          {nameValidation.message && (
            <div
              className={`flex items-center space-x-2 text-sm ${
                nameValidation.isValid === false
                  ? "text-red-600"
                  : nameValidation.isValid === true
                    ? "text-green-600"
                    : "text-gray-600"
              }`}
            >
              {nameValidation.isChecking ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              ) : nameValidation.isValid === false ? (
                <AlertCircle className="w-4 h-4" />
              ) : nameValidation.isValid === true ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : null}
              <span>{nameValidation.message}</span>
            </div>
          )}
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label
            htmlFor="industry"
            className="text-sm font-medium text-gray-700"
          >
            Industri Perusahaan
          </Label>
          <Select
            value={companyInfo.industry}
            onValueChange={(value) => updateCompanyInfo("industry", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih industri perusahaan" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Company Size */}
        <div className="space-y-2">
          <Label
            htmlFor="companySize"
            className="text-sm font-medium text-gray-700"
          >
            Ukuran Perusahaan (Jumlah Karyawan)
          </Label>
          <Select
            value={companyInfo.companySize}
            onValueChange={(value) => updateCompanyInfo("companySize", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih ukuran perusahaan" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label
            htmlFor="website"
            className="text-sm font-medium text-gray-700"
          >
            Website Perusahaan
          </Label>
          <Input
            id="website"
            type="url"
            value={companyInfo.website}
            onChange={(e) => handleWebsiteChange(e.target.value)}
            placeholder="https://example.com"
            className={websiteError ? "border-red-500" : ""}
          />
          {websiteError && (
            <div className="flex items-center space-x-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span>{websiteError}</span>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Alamat Perusahaan
          </Label>
          <Textarea
            id="address"
            value={companyInfo.address}
            onChange={(e) => updateCompanyInfo("address", e.target.value)}
            placeholder="Masukkan alamat lengkap perusahaan"
            rows={3}
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={handleContinue}
          disabled={!canContinue()}
          className="px-8 py-2"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}
