"use client";

import { useEffect, useId, useRef, useState } from "react";
import type {
  ClimateMode,
  ClimateModeId,
  ClimateRule,
  CostScenario,
  MachineSpec,
  MachineSummerState,
  PersonaSeason,
  PersonaSpec,
  PhaseSpec,
  QuarterSpec,
  RiskScenario,
  VariantSpec
} from "@/data/atlas";
import {
  CompactVillageGraphic,
  FlourishingWheelGraphic,
  HeroClimateGraphic,
  MachineCutawayGraphic,
  MasterplanGraphic,
  NuclearSummerGraphic,
  PersonaRouteGraphic,
  ResilienceGraphic,
  RuleOverlayGraphic,
  SeasonalCalendarGraphic,
  SummerStreetGraphic,
  TechnologyBarsGraphic,
  VariantClusterGraphic
} from "@/components/atlas-visuals";
import { ConfidenceBadge, SourceDisclosure, TrustBadge, VisualFrame } from "@/components/atlas-ui";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const delayClass = delay > 0 ? ` scroll-reveal-delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`scroll-reveal${visible ? " is-visible" : ""}${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function CountUp({
  value,
  duration = 1200,
  suffix = "",
  prefix = "",
}: {
  value: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const hasRun = useRef(false);

  // Extract numeric part for animation
  const numericMatch = value.match(/^([+-]?\d[\d\s.,]*)/);
  const numericStr = numericMatch?.[1]?.replace(/[\s.]/g, "").replace(",", ".") ?? "";
  const targetNum = parseFloat(numericStr);
  const restStr = numericMatch ? value.slice(numericMatch[0].length) : value;
  const isAnimatable = !isNaN(targetNum) && isFinite(targetNum);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isAnimatable) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.unobserve(el);

          const start = performance.now();
          const isInt = Number.isInteger(targetNum);

          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = targetNum * eased;
            const formatted = isInt
              ? new Intl.NumberFormat("ru-RU").format(Math.round(current))
              : current.toFixed(1).replace(".", ",");
            setDisplay(`${formatted}${restStr}`);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplay(value);
            }
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, targetNum, isAnimatable, restStr]);

  return (
    <span ref={ref} className="count-up-value">
      {prefix}{display}{suffix}
    </span>
  );
}

export function SectionDivider({
  variant = "glow",
}: {
  variant?: "glow" | "wave" | "fade";
}) {
  return (
    <div className={`section-divider section-divider-${variant}`} aria-hidden="true" />
  );
}

function SegmentedTabs<T extends string>({
  items,
  value,
  onChange,
  label
}: {
  items: Array<{ id: T; label: string }>;
  value: T;
  onChange: (next: T) => void;
  label: string;
}) {
  const listId = useId();

  return (
    <div className="segmented-tabs" role="tablist" aria-label={label} id={listId}>
      {items.map((item) => {
        const tabId = `${listId}-${item.id}`;
        const panelId = `${tabId}-panel`;
        const active = item.id === value;

        return (
          <button
            key={item.id}
            id={tabId}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={panelId}
            className={active ? "is-active" : undefined}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function HeroDial({
  modes,
  headline,
  intro
}: {
  modes: ClimateMode[];
  headline: string;
  intro: string;
}) {
  const [activeMode, setActiveMode] = useState<ClimateModeId>(modes[0].id);
  const current = modes.find((mode) => mode.id === activeMode) ?? modes[0];

  return (
    <div className="hero-dial-grid">
      <div className="hero-copy">
        <div className="hero-topline">
          <span className="hero-overline">Flagship climate district</span>
          <div className="trust-pair">
            <TrustBadge status="concept" />
            <ConfidenceBadge confidence="high" />
          </div>
        </div>
        <h1>{headline}</h1>
        <p className="hero-lead">{intro}</p>
        <SegmentedTabs
          items={modes.map((mode) => ({ id: mode.id, label: mode.label }))}
          value={activeMode}
          onChange={setActiveMode}
          label="Режимы климата"
        />
        <article className="hero-mode-panel" id={`hero-mode-${activeMode}`}>
          <strong>{current.headline}</strong>
          <p>{current.summary}</p>
        </article>
        <div className="hero-action-row">
          <a href="#masterplan" className="button-primary">
            Смотреть генплан
          </a>
          <a href="#story" className="button-secondary">
            Читать историю
          </a>
        </div>
      </div>
      <VisualFrame
        title="Hero Climate Dial"
        caption="Одна и та же морфология показывает, как район живёт зимой, летом, в пургу и в жару."
      >
        <HeroClimateGraphic mode={activeMode} />
      </VisualFrame>
    </div>
  );
}

export function MasterplanExplorer({
  quarters,
  modes
}: {
  quarters: QuarterSpec[];
  modes: ClimateMode[];
}) {
  const [activeQuarterId, setActiveQuarterId] = useState(quarters[0]?.id ?? "");
  const [activeMode, setActiveMode] = useState<ClimateModeId>("winter");
  const quarter = quarters.find((item) => item.id === activeQuarterId) ?? quarters[0];

  return (
    <div className="explorer-layout">
      <div className="explorer-sidebar">
        <SegmentedTabs
          items={modes.map((mode) => ({ id: mode.id, label: mode.label }))}
          value={activeMode}
          onChange={setActiveMode}
          label="Сезоны генплана"
        />
        <div className="pill-grid" role="tablist" aria-label="Кварталы района">
          {quarters.map((item) => {
            const active = item.id === activeQuarterId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`quarter-pill ${active ? "is-active" : ""}`.trim()}
                onClick={() => setActiveQuarterId(item.id)}
              >
                <span>{item.shortLabel}</span>
                <strong>{item.title}</strong>
              </button>
            );
          })}
        </div>
        <article className="explorer-card">
          <div className="card-header-row">
            <h3>{quarter.title}</h3>
            <span className="mini-pill">{quarter.population}</span>
          </div>
          <p>{quarter.role}</p>
          <dl className="detail-list">
            <div>
              <dt>Зимой</dt>
              <dd>{quarter.winterRole}</dd>
            </div>
            <div>
              <dt>Летом</dt>
              <dd>{quarter.summerRole}</dd>
            </div>
            <div>
              <dt>Сервисы</dt>
              <dd>{quarter.services.join(", ")}</dd>
            </div>
          </dl>
        </article>
      </div>
      <VisualFrame
        title="Masterplan Explorer"
        caption="Квартал и сезон переключаются независимо: так видно, что один и тот же район работает как климатическая система круглый год."
      >
        <MasterplanGraphic activeQuarter={quarter} mode={activeMode} />
      </VisualFrame>
    </div>
  );
}

export function PersonaRoutesExplorer({ personas }: { personas: PersonaSpec[] }) {
  const [activePersonaId, setActivePersonaId] = useState(personas[0]?.id ?? "");
  const [activeSeason, setActiveSeason] = useState<PersonaSeason>("winter");
  const persona = personas.find((item) => item.id === activePersonaId) ?? personas[0];
  const current = persona.seasonRoutes[activeSeason];

  return (
    <div className="explorer-layout">
      <div className="explorer-sidebar">
        <SegmentedTabs
          items={[
            { id: "winter" as const, label: "Зима" },
            { id: "summer" as const, label: "Лето" }
          ]}
          value={activeSeason}
          onChange={setActiveSeason}
          label="Сезоны повседневности"
        />
        <div className="pill-grid" role="tablist" aria-label="Персоны">
          {personas.map((item) => {
            const active = item.id === activePersonaId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`quarter-pill ${active ? "is-active" : ""}`.trim()}
                onClick={() => setActivePersonaId(item.id)}
              >
                <strong>{item.name}</strong>
                <span>{item.summary}</span>
              </button>
            );
          })}
        </div>
        <article className="explorer-card">
          <div className="card-header-row">
            <h3>{persona.name}</h3>
            <span className="mini-pill">{current.minutes} мин</span>
          </div>
          <p>{persona.summary}</p>
          <dl className="detail-list">
            <div>
              <dt>Режим</dt>
              <dd>{current.modeMix}</dd>
            </div>
            <div>
              <dt>{activeSeason === "winter" ? "Cold exposure" : "Shade exposure"}</dt>
              <dd>{activeSeason === "winter" ? current.coldExposure : current.shadeExposure}</dd>
            </div>
          </dl>
        </article>
      </div>
      <VisualFrame
        title="Persona Routes"
        caption="Город тестируется не одной абстрактной фигурой, а людьми с разными доходами, возрастом и физическими возможностями."
      >
        <PersonaRouteGraphic persona={persona} season={activeSeason} />
      </VisualFrame>
    </div>
  );
}

export function MachineSwitcher({ machines }: { machines: MachineSpec[] }) {
  const [activeMachineId, setActiveMachineId] = useState(machines[0]?.id ?? "");
  const [activeMode, setActiveMode] = useState<"winterMode" | "shoulderMode" | "summerMode">("winterMode");
  const machine = machines.find((item) => item.id === activeMachineId) ?? machines[0];

  return (
    <div className="machine-layout">
      <div className="explorer-sidebar">
        <SegmentedTabs
          items={machines.map((item) => ({ id: item.id, label: item.label }))}
          value={activeMachineId}
          onChange={setActiveMachineId}
          label="Сценарии центральной машины"
        />
        <SegmentedTabs
          items={[
            { id: "winterMode" as const, label: "Зима" },
            { id: "shoulderMode" as const, label: "Межсезонье" },
            { id: "summerMode" as const, label: "Лето" }
          ]}
          value={activeMode}
          onChange={setActiveMode}
          label="Режимы машины"
        />
        <article className="explorer-card">
          <div className="card-header-row">
            <h3>{machine.title}</h3>
            <div className="trust-pair">
              <TrustBadge status={machine.status} />
              <ConfidenceBadge confidence={machine.confidence} />
            </div>
          </div>
          <p>{machine.summary}</p>
          <dl className="detail-list">
            <div>
              <dt>CAPEX band</dt>
              <dd>{machine.capexBand}</dd>
            </div>
            <div>
              <dt>Зависимости</dt>
              <dd>{machine.dependencies}</dd>
            </div>
            <div>
              <dt>Public life</dt>
              <dd>{machine.publicLifeImplications}</dd>
            </div>
          </dl>
          <SourceDisclosure sourceIds={machine.sourceIds} label="Источники сценария" />
        </article>
      </div>
      <div className="visual-stack">
        <VisualFrame
          title="Primary Climate Machine Cutaway"
          caption="Даже спор о технологии показывается через сезоны и общественную жизнь, а не как набор труб вне города."
        >
          <MachineCutawayGraphic machine={machine} mode={activeMode} />
        </VisualFrame>
        <VisualFrame
          title="Technology Comparison Bars"
          caption="Доли условны: они нужны, чтобы объяснить, на чём держится логика сценария и что значит летний режим."
        >
          <TechnologyBarsGraphic machine={machine} />
        </VisualFrame>
      </div>
    </div>
  );
}

export function NuclearSummerSimulator({ machine }: { machine: MachineSpec }) {
  const states = machine.summerStates ?? [];
  const [activeStateId, setActiveStateId] = useState(states[0]?.id ?? "");
  const activeState = states.find((item) => item.id === activeStateId) ?? states[0];

  if (!activeState) {
    return null;
  }

  return (
    <div className="machine-layout">
      <div className="explorer-sidebar">
        <SegmentedTabs
          items={states.map((item) => ({ id: item.id, label: item.label }))}
          value={activeStateId}
          onChange={setActiveStateId}
          label="Летние режимы атомного сценария"
        />
        <article className="explorer-card">
          <div className="card-header-row">
            <h3>{activeState.label}</h3>
            <div className="trust-pair">
              <TrustBadge status={machine.status} />
              <ConfidenceBadge confidence={machine.confidence} />
            </div>
          </div>
          <p>{activeState.summary}</p>
          <dl className="detail-list">
            {activeState.mix.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.share}%</dd>
              </div>
            ))}
          </dl>
          <p className="machine-simulator-note">
            Здесь не “лишнее тепло куда-то девают”, а меняется режим системы: тепловой отбор уменьшается, а cooling, storage, ГВС и export играют разную роль.
          </p>
        </article>
      </div>
      <VisualFrame
        title="Nuclear Summer Simulator"
        caption="От тёплого дня до жаркой недели: атомный сценарий объясняется как режимируемый климатический контур, а не как грубая схема постоянного сброса тепла."
      >
        <NuclearSummerGraphic state={activeState as MachineSummerState} />
      </VisualFrame>
    </div>
  );
}

export function VersionMatrix({ variants }: { variants: VariantSpec[] }) {
  const [activeVariantId, setActiveVariantId] = useState(variants[0]?.id ?? "");
  const variant = variants.find((item) => item.id === activeVariantId) ?? variants[0];

  return (
    <div className="machine-layout">
      <div className="explorer-sidebar">
        <SegmentedTabs
          items={variants.map((item) => ({ id: item.id, label: item.label }))}
          value={activeVariantId}
          onChange={setActiveVariantId}
          label="Версии развития"
        />
        <article className="explorer-card">
          <div className="card-header-row">
            <h3>{variant.title}</h3>
            <div className="trust-pair">
              <TrustBadge status={variant.status} />
              <ConfidenceBadge confidence={variant.confidence} />
            </div>
          </div>
          <p>{variant.coreIdea}</p>
          <dl className="detail-list">
            <div>
              <dt>Население</dt>
              <dd>{variant.population}</dd>
            </div>
            <div>
              <dt>Площадь</dt>
              <dd>{variant.area}</dd>
            </div>
            <div>
              <dt>Контекст</dt>
              <dd>{variant.bestUseCase}</dd>
            </div>
            <div>
              <dt>Tradeoff</dt>
              <dd>{variant.tradeoffs}</dd>
            </div>
          </dl>
          <SourceDisclosure sourceIds={variant.sourceIds} label="Опоры версии" />
        </article>
      </div>
      <div className="visual-stack">
        <VisualFrame
          title="Version Matrix"
          caption="Четыре версии показывают не новые картинки ради картинки, а разные уровни бюджета, масштаба и климатического насыщения."
        >
          <VariantClusterGraphic variants={variants} activeVariantId={activeVariantId} />
        </VisualFrame>
        <VisualFrame
          title="Compact Climate Village"
          caption="Самая компактная версия остаётся пористой, зелёной и дневной, а не скатывается в герметичный indoor-world."
        >
          <CompactVillageGraphic />
        </VisualFrame>
      </div>
    </div>
  );
}

export function RulebookOverlay({ rules }: { rules: ClimateRule[] }) {
  const [activeRuleId, setActiveRuleId] = useState(rules[0]?.id ?? "");
  const rule = rules.find((item) => item.id === activeRuleId) ?? rules[0];

  return (
    <div className="machine-layout">
      <div className="explorer-sidebar">
        <div className="pill-grid" role="tablist" aria-label="Кодекс города">
          {rules.map((item) => {
            const active = item.id === activeRuleId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`quarter-pill ${active ? "is-active" : ""}`.trim()}
                onClick={() => setActiveRuleId(item.id)}
              >
                <strong>{item.title}</strong>
                <span>{item.season}</span>
              </button>
            );
          })}
        </div>
        <article className="explorer-card">
          <h3>{rule.title}</h3>
          <p className="callout-negative">{rule.cannotDo}</p>
          <p className="callout-positive">{rule.mustDo}</p>
          <dl className="detail-list">
            <div>
              <dt>Почему</dt>
              <dd>{rule.why}</dd>
            </div>
            <div>
              <dt>Проверка</dt>
              <dd>{rule.metric}</dd>
            </div>
            <div>
              <dt>Что ломается</dt>
              <dd>{rule.failureMode}</dd>
            </div>
          </dl>
        </article>
      </div>
      <VisualFrame
        title="Rulebook Overlay"
        caption="Кодекс города объясняется не лозунгами, а spatial logic: где правило действует и что происходит, если его игнорировать."
      >
        <RuleOverlayGraphic activeRuleTitle={rule.title} />
      </VisualFrame>
    </div>
  );
}

export function ResilienceSimulator({ scenarios }: { scenarios: RiskScenario[] }) {
  const [activeRiskId, setActiveRiskId] = useState(scenarios[0]?.id ?? "");
  const scenario = scenarios.find((item) => item.id === activeRiskId) ?? scenarios[0];

  return (
    <div className="machine-layout">
      <div className="explorer-sidebar">
        <SegmentedTabs
          items={scenarios.map((item) => ({ id: item.id, label: item.title }))}
          value={activeRiskId}
          onChange={setActiveRiskId}
          label="Сценарии отказа"
        />
        <article className="explorer-card">
          <h3>{scenario.title}</h3>
          <p>{scenario.summary}</p>
          <dl className="detail-list">
            <div>
              <dt>Что ломается</dt>
              <dd>{scenario.whatBreaks}</dd>
            </div>
            <div>
              <dt>Что остаётся</dt>
              <dd>{scenario.whatKeepsWorking}</dd>
            </div>
            <div>
              <dt>Fallback</dt>
              <dd>{scenario.fallbackProtocol}</dd>
            </div>
          </dl>
        </article>
      </div>
      <VisualFrame
        title="Day Without Core"
        caption="Устойчивость показывает не бессмертие системы, а понятную частичную деградацию без потери человеческого достоинства."
      >
        <ResilienceGraphic scenario={scenario} />
      </VisualFrame>
    </div>
  );
}

export function CostPanel({
  costScenario,
  phases
}: {
  costScenario: CostScenario;
  phases: PhaseSpec[];
}) {
  const [band, setBand] = useState<"low" | "base" | "high">("base");

  return (
    <div className="machine-layout">
      <div className="explorer-sidebar">
        <SegmentedTabs
          items={[
            { id: "low" as const, label: "Low" },
            { id: "base" as const, label: "Base" },
            { id: "high" as const, label: "High" }
          ]}
          value={band}
          onChange={setBand}
          label="CAPEX сценарии"
        />
        <article className="explorer-card">
          <h3>{costScenario.scenario}</h3>
          <p className="cost-emphasis">
            {band === "low" && costScenario.low}
            {band === "base" && costScenario.base}
            {band === "high" && costScenario.high}
          </p>
          <dl className="detail-list">
            <div>
              <dt>All-in</dt>
              <dd>{costScenario.allIn}</dd>
            </div>
            <div>
              <dt>Включено</dt>
              <dd>{costScenario.included.join(", ")}</dd>
            </div>
            <div>
              <dt>Отдельно</dt>
              <dd>{costScenario.excluded.join(", ")}</dd>
            </div>
          </dl>
        </article>
      </div>
      <div className="visual-stack">
        <VisualFrame
          title="CAPEX and Phasing"
          caption="Даже дорогая утопия остаётся проверяемой, когда цифры и очереди поданы как decision-ready narrative."
        >
          <SeasonalCalendarGraphic />
        </VisualFrame>
        <div className="phase-grid">
          {phases.map((phase) => (
            <article key={phase.id} className="phase-card">
              <span>{phase.label}</span>
              <strong>{phase.residents}</strong>
              <p>{phase.focus}</p>
              <em>{phase.capex}</em>
              <small>{phase.unlock}</small>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SummerComfortScene() {
  return (
    <div className="visual-stack">
      <VisualFrame
        title="Summer Comfort Scene"
        caption="Летний город проектируется не только от фасада, а от тени, night purge, cooling commons и tree canopy."
      >
        <SummerStreetGraphic />
      </VisualFrame>
      <VisualFrame
        title="Annual Climate Calendar"
        caption="Один район, но несколько сезонных operational modes. Поэтому проект не разваливается на “зимнюю” и “летнюю” версию."
      >
        <SeasonalCalendarGraphic />
      </VisualFrame>
    </div>
  );
}

export function FlourishingShowcase() {
  return (
    <VisualFrame
      title="Human Flourishing OS"
      caption="Слой процветания не обещает биологических чудес, а показывает, какие городские системы поддерживают свет, движение, зелень, покой и belonging."
    >
      <FlourishingWheelGraphic />
    </VisualFrame>
  );
}

export function PrintButton() {
  return (
    <button
      type="button"
      className="button-secondary"
      onClick={() => {
        window.print();
      }}
    >
      Печать / PDF
    </button>
  );
}

export function AnimatedMetricStrip({
  items,
}: {
  items: Array<{
    id: string;
    label: string;
    value: string;
    unit: string;
    target: string;
    status: string;
    confidence: string;
    formula: string;
  }>;
}) {
  return (
    <div className="metric-strip">
      {items.map((metric) => (
        <article key={metric.id} className="metric-card">
          <div className="metric-topline">
            <span>{metric.label}</span>
            <div className="trust-pair">
              <span className={`trust-badge trust-${metric.status}`}>{metric.status}</span>
              <span className={`confidence-badge confidence-${metric.confidence}`}>{metric.confidence}</span>
            </div>
          </div>
          <strong>
            <CountUp value={metric.value} />
            {metric.unit === "residents" ? "" : ` ${metric.unit}`}
          </strong>
          <p>{metric.target}</p>
          <small>{metric.formula}</small>
        </article>
      ))}
    </div>
  );
}
