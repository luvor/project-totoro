import { Composition, Still } from "remotion";
import { HeroLoop } from "./compositions/HeroLoop";
import { PricingExplainer } from "./compositions/PricingExplainer";
import { MasterplanOverview } from "./compositions/MasterplanOverview";
import { MachineScenarios } from "./compositions/MachineScenarios";
import { DistrictMetrics } from "./compositions/DistrictMetrics";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroLoop"
        component={HeroLoop}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PricingExplainer"
        component={PricingExplainer}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MasterplanOverview"
        component={MasterplanOverview}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MachineScenarios"
        component={MachineScenarios}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DistrictMetrics"
        component={DistrictMetrics}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Static images (stills) for each schema */}
      <Still
        id="MasterplanStill"
        component={MasterplanOverview}
        width={1920}
        height={1080}
      />
      <Still
        id="MachineScenariosStill"
        component={MachineScenarios}
        width={1920}
        height={1080}
      />
      <Still
        id="DistrictMetricsStill"
        component={DistrictMetrics}
        width={1920}
        height={1080}
      />
    </>
  );
};
