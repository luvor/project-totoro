import {
  AppendixTable,
  FooterPortal,
  PageMasthead,
  PageSection,
  SourceDisclosure,
  TrustLegend,
  formatPeople,
  formatSquareMeters
} from "@/components/atlas-ui";
import { PrintButton, ScrollReveal, SectionDivider } from "@/components/atlas-interactives";
import { claims, district, machines, metrics, rules, sources, trustLegend, variants } from "@/data/atlas";

export const metadata = {
  title: "Project Totoro — Appendix",
  description: "Печатное приложение с provenance, методикой, цифрами, версиями и машинными сценариями проекта."
};

export default function AppendixPage() {
  return (
    <main className="atlas-page appendix-page" id="main-content">
      <div className="page-backdrop" aria-hidden="true" />
      <div className="gradient-mesh" aria-hidden="true" />
      <PageMasthead
        page="Appendix"
        title="Provenance, методика и проверяемые цифры"
        description="Print-friendly слой проекта: здесь собираются метрики, claims, machine scenarios, версии развития, риски и ссылки на опорные источники."
      />

      <div className="appendix-actions">
        <PrintButton />
      </div>

      <ScrollReveal>
        <PageSection
          eyebrow="Flagship Model"
          title="Базовая модель района"
          text="Эти параметры не обещают вечную истину, но фиксируют каноническую версию flagship-сценария, от которой отталкивается весь атлас."
        >
          <div className="comparison-grid">
            <article className="comparison-card">
              <span>Население</span>
              <strong>{formatPeople(district.residents)}</strong>
              <p>Три волны развития и шесть кварталов.</p>
            </article>
            <article className="comparison-card">
              <span>Площадь</span>
              <strong>{district.areaKm2} км²</strong>
              <p>Greenfield-район с компактной climate mesh.</p>
            </article>
            <article className="comparison-card">
              <span>GFA</span>
              <strong>{formatSquareMeters(district.grossFloorAreaM2)}</strong>
              <p>Среднеэтажная mixed-use плотность без башенного поля.</p>
            </article>
            <article className="comparison-card">
              <span>Public realm</span>
              <strong>{district.publicRealmSharePct}%</strong>
              <p>Улицы, сады, площади и protected routes.</p>
            </article>
          </div>
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="glow" />

      <ScrollReveal>
        <PageSection
          eyebrow="Trust Legend"
          title="Что здесь benchmark, estimate, assumption и concept"
          text="Этот слой нужен не для формальности. Он отделяет проверяемые числа и референсы от проектных гипотез и делает narrative более честным."
        >
          <TrustLegend items={trustLegend} />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="fade" />

      <ScrollReveal>
        <PageSection
          eyebrow="Metrics"
          title="Метрики и происхождение"
          text="Для каждой метрики фиксируются статус, confidence, источник, формула и owner. Это базовый минимум для decision-ready longread."
        >
          <AppendixTable
            columns={["ID", "Метка", "Значение", "Status", "Confidence", "Formula", "Owner"]}
            rows={metrics.map((metric) => [
              metric.id,
              metric.label,
              `${metric.value}${metric.unit === "residents" ? "" : ` ${metric.unit}`}`,
              metric.status,
              metric.confidence,
              metric.formula,
              metric.owner
            ])}
          />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="wave" />

      <ScrollReveal>
        <PageSection
          eyebrow="Claims"
          title="Ключевые тезисы и их границы"
          text="Claims не должны звучать сильнее, чем они реально доказаны. Поэтому каждый тезис хранит why-it-matters и limits."
        >
          <AppendixTable
            columns={["ID", "Тезис", "Status", "Confidence", "Почему важно", "Граница"]}
            rows={claims.map((claim) => [
              claim.id,
              claim.text,
              claim.status,
              claim.confidence,
              claim.whyItMatters,
              claim.limits
            ])}
          />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="glow" />

      <ScrollReveal>
        <PageSection
          eyebrow="Versions"
          title="Портфель версий"
          text="Все версии сравниваются по одной логике, а не разными словами для разных moodboards."
        >
          <AppendixTable
            columns={["ID", "Title", "Population", "Area", "Cost position", "Best use case", "Tradeoff"]}
            rows={variants.map((variant) => [
              variant.label,
              variant.title,
              variant.population,
              variant.area,
              variant.costPosition,
              variant.bestUseCase,
              variant.tradeoffs
            ])}
          />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="fade" />

      <ScrollReveal>
        <PageSection
          eyebrow="Machines"
          title="Machine scenarios"
          text="У каждой машины зафиксированы seasonal modes, risk profile, public life implications и внешние зависимости."
        >
          <AppendixTable
            columns={["ID", "Title", "Зима", "Лето", "Failure mode", "Dependencies", "CAPEX"]}
            rows={machines.map((machine) => [
              machine.label,
              machine.title,
              machine.winterMode,
              machine.summerMode,
              machine.failureMode,
              machine.dependencies,
              machine.capexBand
            ])}
          />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="wave" />

      <ScrollReveal>
        <PageSection
          eyebrow="Rulebook"
          title="Правила города"
          text="Кодекс фиксирует запрет, позитивное требование и failure mode. Это помогает превратить идею в реальный design brief."
        >
          <AppendixTable
            columns={["ID", "Rule", "Season", "Нельзя", "Нужно", "Проверка", "Failure mode"]}
            rows={rules.map((rule) => [
              rule.id,
              rule.title,
              rule.season,
              rule.cannotDo,
              rule.mustDo,
              rule.metric,
              rule.failureMode
            ])}
          />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="glow" />

      <ScrollReveal>
        <PageSection
          eyebrow="Phasing"
          title="Фазирование flagship-сценария"
          text="Каждая волна заканчивает рабочий кусок города и не оставляет жителя жить в вечной прелюдии к следующей очереди."
        >
          <AppendixTable
            columns={["Phase", "Residents", "CAPEX", "Focus", "Unlock"]}
            rows={district.phases.map((phase) => [phase.label, phase.residents, phase.capex, phase.focus, phase.unlock])}
          />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="fade" />

      <ScrollReveal>
        <PageSection
          eyebrow="Sources"
          title="Источник опор и evidence anchors"
          text="Ключевые ссылки вынесены в отдельный блок, чтобы понятнее читать происхождение идей, правил и health-claims."
        >
          <div className="card-grid two">
            {sources.map((source) => (
              <article key={source.id} className="reason-card">
                <h3>{source.title}</h3>
                <p>{source.note}</p>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.url}
                </a>
              </article>
            ))}
          </div>
          <SourceDisclosure
            sourceIds={[
              "who-green",
              "who-urban-planning",
              "who-age-friendly",
              "cdc-activity",
              "nih-vitamin-d",
              "world-bank-dh",
              "iaea-cogeneration"
            ]}
            label="Ключевые evidence anchors"
          />
        </PageSection>
      </ScrollReveal>

      <ScrollReveal>
        <FooterPortal currentPath="/appendix/" />
      </ScrollReveal>
    </main>
  );
}
