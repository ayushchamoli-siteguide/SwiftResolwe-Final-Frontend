import React from "react";
import Hero from "@/components/swift/sections/Hero";
import TrustMetrics from "@/components/swift/sections/TrustMetrics";
import TechManifesto from "@/components/swift/sections/TechManifesto";
import ResolutionTiers from "@/components/swift/sections/ResolutionTiers";
import PanelNeutrals from "@/components/swift/sections/PanelNeutrals";
import DualTrack from "@/components/swift/sections/DualTrack";
import EnterpriseSectors from "@/components/swift/sections/EnterpriseSectors";
import CaseManagers from "@/components/swift/sections/CaseManagers";
import EconomicAdvantage from "@/components/swift/sections/EconomicAdvantage";
import Jurisdictional from "@/components/swift/sections/Jurisdictional";
import FAQ from "@/components/swift/sections/FAQ";

export default function Landing() {
  return (
    <main data-testid="landing-main" className="relative">
      <Hero />
      <TrustMetrics />
      <TechManifesto />
      <ResolutionTiers />
      <PanelNeutrals />
      <DualTrack />
      <EnterpriseSectors />
      <CaseManagers />
      <EconomicAdvantage />
      <Jurisdictional />
      <FAQ />
    </main>
  );
}
