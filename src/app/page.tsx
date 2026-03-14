import Link from "next/link";
import {
  AnimatedMetricStrip,
  CostPanel,
  FlourishingShowcase,
  HeroDial,
  MachineSwitcher,
  MasterplanExplorer,
  PersonaRoutesExplorer,
  ResilienceSimulator,
  RulebookOverlay,
  ScrollReveal,
  SectionDivider,
  SummerComfortScene
} from "@/components/atlas-interactives";
import {
  ClaimCard,
  FooterPortal,
  MetricStrip,
  PageSection,
  SectionLinks,
  SourceDisclosure,
  TrustLegend
} from "@/components/atlas-ui";
import { claims, district, machines, mainSections, metrics, personas, rules, trustLegend } from "@/data/atlas";

const coreMetrics = metrics.filter((metric) =>
  ["population", "district-area", "service-radius", "summer-shade", "base-capex", "step-free"].includes(metric.id)
);

const flourishingMetrics = metrics.filter((metric) =>
  ["daylight-access", "trees-distance", "child-radius", "elder-access", "active-frontage"].includes(metric.id)
);

export default function Home() {
  return (
    <main className="atlas-page">
      <div className="page-backdrop" aria-hidden="true" />
      <div className="gradient-mesh" aria-hidden="true" />

      <header className="home-hero-shell" id="hero">
        <div className="hero-particles" aria-hidden="true" />
        <div className="site-topline">
          <Link href="/" className="brand-mark">
            Project Totoro
          </Link>
          <nav className="page-links" aria-label="Навигация по страницам">
            <Link href="/">Flagship</Link>
            <Link href="/versions/">Versions</Link>
            <Link href="/machines/">Machines</Link>
            <Link href="/appendix/">Appendix</Link>
          </nav>
        </div>
        <div className="home-hero-grid">
          <HeroDial modes={district.climateModes} headline={district.name} intro={district.coreClaim} />
        </div>
        <AnimatedMetricStrip items={coreMetrics} />
      </header>

      <SectionLinks links={mainSections.map((section) => ({ href: `#${section.id}`, label: section.label }))} />

      <ScrollReveal>
        <div id="story" className="story-band">
          {district.promises.map((promise) => (
            <article key={promise.title} className="story-card">
              <span className="kicker">Обещание</span>
              <h3>{promise.title}</h3>
              <p>{promise.detail}</p>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <SectionDivider variant="glow" />

      <ScrollReveal>
        <PageSection
          id="failure"
          eyebrow="Проблема"
          title="Почему холодные города ломаются"
          text="Проблема не только в морозе. Город ломают длинные обязательные поездки, wind exposure, летний перегрев, поздно придуманная доступность и отсутствие видимой климатической логики."
        >
          <div className="card-grid three">
            {district.failureReasons.map((reason) => (
              <article key={reason.title} className="reason-card">
                <h3>{reason.title}</h3>
                <p>{reason.summary}</p>
                <strong>{reason.symptom}</strong>
              </article>
            ))}
          </div>
          <SourceDisclosure sourceIds={["edmonton-guidelines", "edmonton-strategy", "who-urban-planning"]} />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="wave" />

      <ScrollReveal>
        <PageSection
          id="real"
          eyebrow="Доверие"
          title="Почему это не очередной мегапроект-фантазия"
          text="Сайт отделяет benchmark от estimate и concept, показывает provenance у метрик и не обещает биологических чудес там, где среда может дать только хорошие условия, а не медицинскую гарантию."
        >
          <TrustLegend items={trustLegend} />
          <div className="card-grid two">
            {claims.map((claim) => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
          <div className="bullet-band">
            {district.whyReal.map((item) => (
              <article key={item} className="feature-panel">
                <h3>Почему это реально</h3>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="glow" />

      <ScrollReveal>
        <PageSection
          id="masterplan"
          eyebrow="Как устроен город"
          title="Masterplan Explorer"
          text="Flagship-сценарий остаётся линейной историей, но сам генплан можно исследовать как климатическую систему: выбирать кварталы и переключать сезонные режимы."
        >
          <MasterplanExplorer quarters={district.quarters} modes={district.climateModes} />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="fade" />

      <ScrollReveal>
        <PageSection
          id="personas"
          eyebrow="Повседневность"
          title="Город тестируется людьми, а не абстрактной иконкой"
          text="Каждая важная сцена проходит через ребёнка, подростка, офисного жителя, пожилого человека, low-income reality check и пользователя кресла. Это и есть 8-and-80 test в действии."
        >
          <PersonaRoutesExplorer personas={personas} />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="wave" />

      <ScrollReveal>
        <PageSection
          id="machine"
          eyebrow="Климатическая машина"
          title="Один городской центр, но три инженерных пути"
          text="Климатический собор остаётся общим образом во всех сценариях, но технологии, зависимости и летние режимы различаются. Поэтому сайт не продаёт одну магическую истину."
        >
          <MachineSwitcher machines={machines} />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="glow" />

      <ScrollReveal>
        <PageSection
          id="summer"
          eyebrow="Лето"
          title="Летний город продуман так же серьёзно, как зимний"
          text="Проект не перекошен только в сторону мороза. Тень, cooling commons, night purge и деревья работают как обязательная инфраструктура, а не как приятная опция."
        >
          <SummerComfortScene />
          <div className="card-grid three">
            {district.summerStrategies.map((strategy) => (
              <article key={strategy.title} className="reason-card">
                <h3>{strategy.title}</h3>
                <p>{strategy.detail}</p>
              </article>
            ))}
          </div>
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="fade" />

      <ScrollReveal>
        <PageSection
          id="flourishing"
          eyebrow="Human Flourishing OS"
          title="Это город не только про выживание, но и про процветание"
          text="Среда помогает движению, свету, зелени, социальности и тишине. Но claims про здоровье подаются аккуратно: не как гарантия идеального человека, а как повышение шансов на полноценную жизнь."
        >
          <div className="two-column-band">
            <FlourishingShowcase />
            <div className="content-stack">
              <div className="card-grid one">
                {district.flourishingSystems.map((system) => (
                  <article key={system.id} className="feature-panel">
                    <div className="card-header-row">
                      <h3>{system.title}</h3>
                      <span className={`confidence-badge confidence-${system.confidence}`}>{system.confidence}</span>
                    </div>
                    <p>{system.summary}</p>
                  </article>
                ))}
              </div>
              <MetricStrip items={flourishingMetrics} />
            </div>
          </div>
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="glow" />

      <ScrollReveal>
        <PageSection
          id="rulebook"
          eyebrow="Кодекс"
          title="У каждого правила есть человеческое объяснение"
          text="Здесь нет пустых запретов. Каждый запрет говорит, что нельзя делать, что обязательно, какой метрикой это проверить и что сломается, если дизайнерское эго победит городскую логику."
        >
          <RulebookOverlay rules={rules} />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="wave" />

      <ScrollReveal>
        <PageSection
          id="risks"
          eyebrow="Реализуемость"
          title="День без ядра и другие uncomfortable questions"
          text="Утопия не имеет права быть хрупкой. Поэтому сайт показывает сценарии частичного отказа и объясняет, как район деградирует без потери базового человеческого достоинства."
        >
          <ResilienceSimulator scenarios={district.riskScenarios} />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="fade" />

      <ScrollReveal>
        <PageSection
          id="costs"
          eyebrow="Стоимость и фазы"
          title="Почти утопия стоит дорого, но должна стоить внятно"
          text="Flagship остаётся дорогим сценарием, но каждая цифра привязана к build-out логике, а не к абстрактному вау-эффекту. Фазирование показывает, как не строить зависимую прелюдию вместо живого куска города."
        >
          <CostPanel costScenario={district.costScenario} phases={district.phases} />
        </PageSection>
      </ScrollReveal>

      <ScrollReveal>
        <FooterPortal />
      </ScrollReveal>
    </main>
  );
}
