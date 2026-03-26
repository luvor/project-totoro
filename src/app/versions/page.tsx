import Image from "next/image";
import { ScrollReveal, SectionDivider, VersionMatrix } from "@/components/atlas-interactives";
import {
  ConfidenceBadge,
  FooterPortal,
  PageMasthead,
  PageSection,
  SourceDisclosure,
  TrustBadge,
  VisualFrame
} from "@/components/atlas-ui";
import { variants } from "@/data/atlas";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = {
  title: "Project Totoro — Versions",
  description: "Сравнение четырёх версий климатического города: flagship, budget, comfort-stable и compact climate village."
};

export default function VersionsPage() {
  return (
    <main className="atlas-page" id="main-content">
      <div className="page-backdrop" aria-hidden="true" />
      <div className="gradient-mesh" aria-hidden="true" />
      <PageMasthead
        page="Versions"
        title="Лаборатория версий"
        description="Один климатический язык, но несколько вариантов развития: от flagship-района до компактного климатического посёлка."
      />

      <ScrollReveal>
        <PageSection
          eyebrow="Version Matrix"
          title="Четыре способа сделать климатический город"
          text="Версии нужны не ради вариативного moodboard, а чтобы показать, как идея меняется с бюджетом, масштабом, уровнем комфорта и требованиями к инфраструктуре."
        >
          <VersionMatrix variants={variants} />
        </PageSection>
      </ScrollReveal>

      <ScrollReveal>
        <div className="svg-duo-grid" style={{ marginBottom: 28 }}>
          <VisualFrame
            title="Compact Climate Village"
            caption="Компактный сценарий сохраняет пористость, деревья и дневной свет даже при минимальном бюджете."
          >
            <Image
              src={`${basePath}/images/renders/versions-compact.webp`}
              alt="Компактный климатический посёлок — вид сверху"
              width={640}
              height={400}
              style={{ width: "100%", height: "auto", borderRadius: "var(--radius-md)" }}
            />
          </VisualFrame>
          <VisualFrame
            title="Flagship Sprawl"
            caption="Flagship-район раскрывает полную климатическую логику с максимальным инженерным насыщением."
          >
            <Image
              src={`${basePath}/images/renders/versions-sprawl.webp`}
              alt="Flagship-район — панорамный вид"
              width={640}
              height={400}
              style={{ width: "100%", height: "auto", borderRadius: "var(--radius-md)" }}
            />
          </VisualFrame>
        </div>
      </ScrollReveal>

      <SectionDivider variant="glow" />

      <ScrollReveal>
        <PageSection
          eyebrow="Version Cards"
          title="Где каждая версия сильна и где у неё слабое место"
          text="Flagship раскрывается глубже всех, но остальные версии тоже остаются полноценными сценариями с рисками, ценой и понятным контекстом применения."
        >
          <div className="card-grid two">
            {variants.map((variant) => (
              <article key={variant.id} className="claim-card">
                <div className="card-header-row">
                  <h3>
                    {variant.label} · {variant.title}
                  </h3>
                  <div className="trust-pair">
                    <TrustBadge status={variant.status} />
                    <ConfidenceBadge confidence={variant.confidence} />
                  </div>
                </div>
                <p>{variant.coreIdea}</p>
                <dl className="detail-list">
                  <div>
                    <dt>Масштаб</dt>
                    <dd>
                      {variant.population} · {variant.area}
                    </dd>
                  </div>
                  <div>
                    <dt>Green model</dt>
                    <dd>{variant.greenModel}</dd>
                  </div>
                  <div>
                    <dt>Comfort model</dt>
                    <dd>{variant.comfortModel}</dd>
                  </div>
                  <div>
                    <dt>Best use case</dt>
                    <dd>{variant.bestUseCase}</dd>
                  </div>
                  <div>
                    <dt>Tradeoff</dt>
                    <dd>{variant.tradeoffs}</dd>
                  </div>
                </dl>
                <div className="bullet-list-block">
                  {variant.risks.map((risk) => (
                    <p key={risk}>{risk}</p>
                  ))}
                </div>
                <SourceDisclosure sourceIds={variant.sourceIds} label="Опоры версии" />
              </article>
            ))}
          </div>
        </PageSection>
      </ScrollReveal>

      <SectionDivider variant="wave" />

      <ScrollReveal>
        <PageSection
          eyebrow="Budget Without Dignity Loss"
          title="Бюджетность не должна резать человеческое достоинство"
          text="Budget-версия честно экономит на дорогих слоях, но не имеет права разрушить accessibility, greenery, daylight, базовые civic-места и повседневную близость."
        >
          <div className="bullet-band">
            <article className="feature-panel">
              <h3>Можно сократить</h3>
              <p>Часть закрытых галерей, избыточную инженерную роскошь, часть expensive indoor-wow и темп ввода cooling.</p>
            </article>
            <article className="feature-panel">
              <h3>Нельзя сокращать</h3>
              <p>Step-free continuity, деревья, тень, свет в жилье, школы, тихие комнаты и базовый civic-слой.</p>
            </article>
            <article className="feature-panel">
              <h3>Иначе проект ломается</h3>
              <p>Если срезать dignity-layer, получится просто аккуратный квартал, а не новый климатический тип города.</p>
            </article>
          </div>
          <SourceDisclosure sourceIds={["who-age-friendly", "who-green", "who-urban-planning"]} />
        </PageSection>
      </ScrollReveal>

      <ScrollReveal>
        <FooterPortal currentPath="/versions/" />
      </ScrollReveal>
    </main>
  );
}
