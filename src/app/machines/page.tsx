import { MachineSwitcher, NuclearSummerSimulator, ResilienceSimulator, ScrollReveal, SectionDivider } from "@/components/atlas-interactives";
import { FooterPortal, PageMasthead, PageSection, SourceDisclosure } from "@/components/atlas-ui";
import { district, machines } from "@/data/atlas";

export const metadata = {
  title: "Project Totoro — Machines",
  description: "Три сценария центральной климатической машины: гибридная ТЭЦ, атомный внешний контур и all-electric regenerative loop."
};

export default function MachinesPage() {
  const nuclearMachine = machines.find((machine) => machine.id === "nuclear-fed-loop");

  return (
    <main className="atlas-page">
      <div className="page-backdrop" aria-hidden="true" />
      <div className="gradient-mesh" aria-hidden="true" />
      <PageMasthead
        page="Machines"
        title="Лаборатория климатических машин"
        description="Климатический собор остаётся общим общественным образом, но инфраструктурный путь можно собирать как минимум тремя способами."
      />

      <ScrollReveal>
        <PageSection
          eyebrow="Scenario Switcher"
          title="Один городской центр, разные инженерные логики"
          text="Сайт не делает вид, что существует одна идеальная технология. Он показывает, как разные машины влияют на городскую жизнь, внешние зависимости, летний режим и риск отказа."
        >
          <MachineSwitcher machines={machines} />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="glow" />

      <ScrollReveal>
        <PageSection
          eyebrow="Nuclear Summer"
          title="Как атомный сценарий работает, когда теплеет"
          text="В атомной версии реактора в центре нет. Район получает региональную опору, а летом не заливается ненужным теплом: отбор снижается, а роль играют ГВС, storage, district cooling, термы и охлаждённые civic-interiors."
        >
          {nuclearMachine ? <NuclearSummerSimulator machine={nuclearMachine} /> : null}
          <div className="bullet-band">
            <article className="feature-panel">
              <h3>Что происходит летом</h3>
              <p>Падает тепловой отбор, растёт значение электричества, absorption/electric chillers, seasonal storage и public cooling commons.</p>
            </article>
            <article className="feature-panel">
              <h3>Что критично объяснить</h3>
              <p>Атомный сценарий нельзя показывать как &quot;лишнее тепло, которое мы куда-то денем&quot;. Он должен быть грамотно режимированным климатическим контуром.</p>
            </article>
            <article className="feature-panel">
              <h3>Где риск</h3>
              <p>Высокая магистральная и регуляторная зависимость. Поэтому локальный backup и понятная fallback-логика обязательны.</p>
            </article>
          </div>
          <SourceDisclosure sourceIds={["iaea-cogeneration", "iaea-non-electric", "world-nuclear-heat", "doe-district-cooling"]} />
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="wave" />

      <ScrollReveal>
        <PageSection
          eyebrow="Failure And Fallback"
          title="Машина должна деградировать частично, а не убивать весь город одним сбоем"
          text="Независимо от сценария, район обязан иметь локальные буферы, приоритетные контуры и общественные убежища. Это правило важнее красивой диаграммы generation-mix."
        >
          <ResilienceSimulator scenarios={district.riskScenarios} />
        </PageSection>
      </ScrollReveal>

      <ScrollReveal>
        <FooterPortal />
      </ScrollReveal>
    </main>
  );
}
