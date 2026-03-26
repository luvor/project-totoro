import Image from "next/image";
import { MachineSwitcher, NuclearSummerSimulator, ResilienceSimulator, ScrollReveal, SectionDivider } from "@/components/atlas-interactives";
import { FooterPortal, PageMasthead, PageSection, SourceDisclosure, VisualFrame } from "@/components/atlas-ui";
import { district, machines } from "@/data/atlas";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const machineRenders: Record<string, { src: string; alt: string; caption: string }> = {
  "nuclear-fed-loop": {
    src: `${basePath}/images/renders/machines-nuclear.webp`,
    alt: "Атомный контур — визуализация сценария",
    caption: "Региональная атомная опора с district cooling и сезонным storage.",
  },
  "hybrid-chp": {
    src: `${basePath}/images/renders/machines-geothermal.webp`,
    alt: "Гибридная ТЭЦ — визуализация сценария",
    caption: "Геотермальная и газовая когенерация с локальными буферами.",
  },
  "all-electric-loop": {
    src: `${basePath}/images/renders/machines-solar.webp`,
    alt: "All-electric loop — визуализация сценария",
    caption: "Полностью электрический контур на солнечной и ветровой генерации.",
  },
};

export const metadata = {
  title: "Project Totoro — Machines",
  description: "Три сценария центральной климатической машины: гибридная ТЭЦ, атомный внешний контур и all-electric regenerative loop."
};

export default function MachinesPage() {
  const nuclearMachine = machines.find((machine) => machine.id === "nuclear-fed-loop");

  return (
    <main className="atlas-page" id="main-content">
      <div className="page-backdrop" aria-hidden="true" />
      <div className="gradient-mesh" aria-hidden="true" />
      <PageMasthead
        page="Machines"
        title="Лаборатория климатических машин"
        description="Климатический собор остаётся общим общественным образом, но инфраструктурный путь можно собирать как минимум тремя способами."
      />

      <ScrollReveal>
        <div className="card-grid three" style={{ marginBottom: 28 }}>
          {machines.map((machine) => {
            const render = machineRenders[machine.id];
            if (!render) return null;
            return (
              <VisualFrame key={machine.id} title={machine.label} caption={render.caption}>
                <Image
                  src={render.src}
                  alt={render.alt}
                  width={420}
                  height={280}
                  style={{ width: "100%", height: "auto", borderRadius: "var(--radius-md)" }}
                />
              </VisualFrame>
            );
          })}
        </div>
      </ScrollReveal>

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
        <FooterPortal currentPath="/machines/" />
      </ScrollReveal>
    </main>
  );
}
