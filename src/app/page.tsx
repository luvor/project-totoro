import { PitchHero } from "@/components/pitch-hero";
import {
  PitchProblem,
  PitchMetrics,
  PitchHowItWorks,
  PitchLife,
  PitchCTA
} from "@/components/pitch-sections";

export default function Home() {
  return (
    <main id="main-content">
      <PitchHero />
      <PitchProblem />
      <PitchMetrics />
      <PitchHowItWorks />
      <PitchLife />
      <PitchCTA />
    </main>
  );
}
