import { ScrollReveal, SectionDivider, VersionMatrix } from "@/components/atlas-interactives";
import {
  FooterPortal,
  PageMasthead,
  PageSection,
  SourceDisclosure
} from "@/components/atlas-ui";
import { variants } from "@/data/atlas";

export const metadata = {
  title: "Project Totoro — Versions",
  description: "Сравнение четырёх версий климатического города: flagship, budget, comfort-stable и compact climate village."
};

export default function VersionsPage() {
  return (
    <main className="atlas-page">
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
                    <span className={`trust-badge trust-${variant.status}`}>{variant.status}</span>
                    <span className={`confidence-badge confidence-${variant.confidence}`}>{variant.confidence}</span>
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
        <FooterPortal />
      </ScrollReveal>
    </main>
  );
}
