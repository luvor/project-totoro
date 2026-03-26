import { PitchHero } from "@/components/pitch-hero";
import {
  PitchProblem,
  PitchMetrics,
  PitchHowItWorks,
  PitchLife,
  PitchCTA
} from "@/components/pitch-sections";
import { PitchPricing } from "@/components/pitch-pricing";
import { PitchCinema } from "@/components/pitch-cinema";

export default function Home() {
  return (
    <main id="main-content">
      <PitchHero />
      <div className="section-divider" />
      <PitchProblem />
      <div className="section-divider" />
      <PitchMetrics />
      <div className="section-divider" />
      <PitchHowItWorks />
      <PitchCinema />
      <div className="section-divider" />
      <PitchLife />
      <div className="section-divider" />
      <PitchPricing />
      <div className="section-divider" />
      <PitchCTA />
    </main>
  );
}
