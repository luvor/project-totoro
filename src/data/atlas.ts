import claimsJson from "../../content/claims.json";
import districtsJson from "../../content/districts.json";
import machinesJson from "../../content/machines.json";
import metricsJson from "../../content/metrics.json";
import personasJson from "../../content/personas.json";
import rulesJson from "../../content/rules.json";
import sourcesJson from "../../content/sources.json";
import variantsJson from "../../content/variants.json";

export type TrustStatus = "benchmark" | "estimate" | "assumption" | "concept";
export type ConfidenceLevel = "low" | "medium" | "high";
export type ClimateModeId = "winter" | "summer" | "blizzard" | "heat";
export type PersonaSeason = "winter" | "summer";
export type MachineCapexBand = "base" | "upper-mid" | "high" | "low";

export type SourceLink = {
  id: string;
  title: string;
  url: string;
  note: string;
};

export type MetricRecord = {
  id: string;
  theme: string;
  label: string;
  value: string;
  unit: string;
  target: string;
  status: TrustStatus;
  confidence: ConfidenceLevel;
  sourceIds: string[];
  formula: string;
  owner: string;
};

export type ClaimRecord = {
  id: string;
  title: string;
  text: string;
  status: TrustStatus;
  confidence: ConfidenceLevel;
  sourceIds: string[];
  whyItMatters: string;
  limits: string;
};

export type QuarterSpec = {
  id: string;
  shortLabel: string;
  title: string;
  population: string;
  role: string;
  winterRole: string;
  summerRole: string;
  services: string[];
};

export type ClimateMode = {
  id: ClimateModeId;
  label: string;
  headline: string;
  summary: string;
  accent: string;
};

export type PromiseCard = {
  title: string;
  detail: string;
};

export type FailureReason = {
  title: string;
  summary: string;
  symptom: string;
};

export type SummerStrategy = {
  title: string;
  detail: string;
};

export type FlourishingSystem = {
  id: string;
  title: string;
  summary: string;
  confidence: ConfidenceLevel;
};

export type PhaseSpec = {
  id: string;
  label: string;
  residents: string;
  capex: string;
  focus: string;
  unlock: string;
};

export type RiskScenario = {
  id: string;
  title: string;
  summary: string;
  whatBreaks: string;
  whatKeepsWorking: string;
  fallbackProtocol: string;
};

export type CostScenario = {
  scenario: string;
  low: string;
  base: string;
  high: string;
  allIn: string;
  included: string[];
  excluded: string[];
};

export type DistrictSpec = {
  id: string;
  name: string;
  tagline: string;
  coreClaim: string;
  residents: number;
  areaKm2: number;
  grossFloorAreaM2: number;
  publicRealmSharePct: number;
  tramLoopKm: number;
  quarters: QuarterSpec[];
  climateModes: ClimateMode[];
  promises: PromiseCard[];
  failureReasons: FailureReason[];
  whyReal: string[];
  summerStrategies: SummerStrategy[];
  flourishingSystems: FlourishingSystem[];
  phases: PhaseSpec[];
  riskScenarios: RiskScenario[];
  costScenario: CostScenario;
};

export type VariantSpec = {
  id: string;
  label: string;
  title: string;
  population: string;
  area: string;
  coreIdea: string;
  costPosition: string;
  greenModel: string;
  comfortModel: string;
  spatialModel: string;
  bestUseCase: string;
  tradeoffs: string;
  risks: string[];
  status: TrustStatus;
  confidence: ConfidenceLevel;
  sourceIds: string[];
};

export type TechnologyShare = {
  label: string;
  share: number;
};

export type MachineSummerState = {
  id: string;
  label: string;
  summary: string;
  mix: TechnologyShare[];
};

export type MachineSpec = {
  id: string;
  label: string;
  title: string;
  summary: string;
  winterMode: string;
  shoulderMode: string;
  summerMode: string;
  failureMode: string;
  dependencies: string;
  capexBand: MachineCapexBand;
  riskProfile: string;
  publicProgram: string[];
  technologyMix: TechnologyShare[];
  summerStates?: MachineSummerState[];
  externalDependencies: string;
  publicLifeImplications: string;
  status: TrustStatus;
  confidence: ConfidenceLevel;
  sourceIds: string[];
};

export type PersonaRouteMode = {
  minutes: number;
  modeMix: string;
  coldExposure: string;
  shadeExposure: string;
  route: string[];
};

export type PersonaSpec = {
  id: string;
  name: string;
  summary: string;
  seasonRoutes: Record<PersonaSeason, PersonaRouteMode>;
};

export type ClimateRule = {
  id: string;
  title: string;
  season: string;
  cannotDo: string;
  mustDo: string;
  why: string;
  metric: string;
  tradeoff: string;
  failureMode: string;
};

export const sources = sourcesJson as SourceLink[];
export const metrics = metricsJson as MetricRecord[];
export const claims = claimsJson as ClaimRecord[];
export const variants = variantsJson as VariantSpec[];
export const machines = machinesJson as MachineSpec[];
export const personas = personasJson as PersonaSpec[];
export const rules = rulesJson as ClimateRule[];
export const district = (districtsJson as { flagshipDistrict: DistrictSpec }).flagshipDistrict;

export const trustLegend: Array<{
  label: TrustStatus;
  title: string;
  detail: string;
}> = [
  {
    label: "benchmark",
    title: "Benchmark",
    detail: "Опирается на внешний референс, публикацию или опубликованный кейс."
  },
  {
    label: "estimate",
    title: "Estimate",
    detail: "Расчёт или planning-range на основе бенчмарков и проектных допущений."
  },
  {
    label: "assumption",
    title: "Assumption",
    detail: "Нужное допущение модели, которое ещё нельзя считать подтверждённым."
  },
  {
    label: "concept",
    title: "Concept",
    detail: "Дизайнерская или системная гипотеза, которую ещё нужно доказывать дальше."
  }
];

export const mainSections = [
  { id: "hero", label: "Hero" },
  { id: "failure", label: "Проблема" },
  { id: "real", label: "Почему это реально" },
  { id: "masterplan", label: "Генплан" },
  { id: "personas", label: "Повседневность" },
  { id: "machine", label: "Климатическая машина" },
  { id: "summer", label: "Лето" },
  { id: "flourishing", label: "Human Flourishing OS" },
  { id: "rulebook", label: "Кодекс" },
  { id: "risks", label: "День без ядра" },
  { id: "costs", label: "Стоимость" }
];

export const versionComparisonFields = [
  "население и площадь",
  "тип daily-life geography",
  "energy/climate system",
  "зелёный контур",
  "летний комфорт",
  "стоимость",
  "риски и слабые места",
  "для какого контекста подходит"
];

export const machineModes: Array<{
  id: "winterMode" | "shoulderMode" | "summerMode";
  label: string;
}> = [
  { id: "winterMode", label: "Зима" },
  { id: "shoulderMode", label: "Межсезонье" },
  { id: "summerMode", label: "Лето" }
];

export const personTypes = personas.map((persona) => ({
  id: persona.id,
  label: persona.name
}));

export const climateModeMap = Object.fromEntries(
  district.climateModes.map((mode) => [mode.id, mode])
) as Record<ClimateModeId, ClimateMode>;

export const metricsByTheme = metrics.reduce<Record<string, MetricRecord[]>>((acc, metric) => {
  acc[metric.theme] ??= [];
  acc[metric.theme].push(metric);
  return acc;
}, {});

export const sourcesById = Object.fromEntries(sources.map((source) => [source.id, source])) as Record<string, SourceLink>;

export function getSourceLinks(sourceIds: string[]) {
  return sourceIds.map((sourceId) => sourcesById[sourceId]).filter(Boolean);
}

export function getQuarterById(quarterId: string) {
  return district.quarters.find((quarter) => quarter.id === quarterId) ?? district.quarters[0];
}

export function getMachineById(machineId: string) {
  return machines.find((machine) => machine.id === machineId) ?? machines[0];
}

export function getVariantById(variantId: string) {
  return variants.find((variant) => variant.id === variantId) ?? variants[0];
}

export function getPersonaById(personaId: string) {
  return personas.find((persona) => persona.id === personaId) ?? personas[0];
}
