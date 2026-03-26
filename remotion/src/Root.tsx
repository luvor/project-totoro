import { Composition } from "remotion";
import { HeroLoop } from "./compositions/HeroLoop";
import { PricingExplainer } from "./compositions/PricingExplainer";

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
    </>
  );
};
