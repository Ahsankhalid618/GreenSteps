"use client";

import React from "react";
import { useAuthContext } from "@/components/providers/AuthProvider";
import {
  Navigation,
  HeroSection,
  Stats,
  FeaturesSection,
  HowItWorksSection,
  BenefitsSection,
  CTASection,
  Footer,
  LoggedInRedirect,
} from "@/components/landing";

export default function HomePage() {
  const { user } = useAuthContext();

  if (user) {
    return <LoggedInRedirect userName={user.name} />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
      <Navigation />
      <HeroSection />
      <Stats />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
