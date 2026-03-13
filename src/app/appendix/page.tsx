import Link from "next/link";
import {
  benchmarkNotes,
  costScenario,
  districtSpec,
  energyCoreSpec,
  phases,
  rules,
  sections,
  sources
} from "@/data/concept";
import { CostTable, Eyebrow, ScenarioSummary, formatPerSquareMeter, formatTenge } from "@/components/site-blocks";

export const metadata = {
  title: "Тепловое Кольцо — Appendix",
  description: "Печатное приложение с цифрами, правилами и допущениями по концепту Тепловое Кольцо."
};

export default function AppendixPage() {
  return (
    <main className="appendix-page">
      <div className="appendix-header">
        <div>
          <Eyebrow>Printable appendix</Eyebrow>
          <h1>Тепловое Кольцо — цифры, допущения и правила</h1>
          <p>
            Отдельный print-friendly view с параметрами района, CAPEX-структурой, фазированием и benchmark-ссылками.
          </p>
        </div>
        <Link href="/" className="button-secondary">
          Вернуться к лонгриду
        </Link>
      </div>

      <section className="appendix-block">
        <h2>1. Базовая модель района</h2>
        <div className="appendix-grid">
          <article>
            <span>Население</span>
            <strong>{new Intl.NumberFormat("ru-RU").format(districtSpec.residents)}</strong>
          </article>
          <article>
            <span>Площадь</span>
            <strong>{districtSpec.areaKm2} км²</strong>
          </article>
          <article>
            <span>Общий GFA</span>
            <strong>{new Intl.NumberFormat("ru-RU").format(districtSpec.grossFloorAreaM2)} м²</strong>
          </article>
          <article>
            <span>Плотность</span>
            <strong>{districtSpec.densityPerHa} жителей/га</strong>
          </article>
          <article>
            <span>Тепловая нагрузка</span>
            <strong>{energyCoreSpec.thermalLoadMwth}</strong>
          </article>
          <article>
            <span>Периметр mobility</span>
            <strong>{districtSpec.tramLoopKm} км кольца</strong>
          </article>
        </div>
      </section>

      <section className="appendix-block">
        <h2>2. CAPEX и unit economics</h2>
        <ScenarioSummary scenario={costScenario} />
        <div className="appendix-grid narrow">
          <article>
            <span>Low / resident</span>
            <strong>{formatTenge(costScenario.perResident.low)}</strong>
          </article>
          <article>
            <span>Base / resident</span>
            <strong>{formatTenge(costScenario.perResident.base)}</strong>
          </article>
          <article>
            <span>High / resident</span>
            <strong>{formatTenge(costScenario.perResident.high)}</strong>
          </article>
          <article>
            <span>Base / GFA</span>
            <strong>{formatPerSquareMeter(costScenario.perM2.base)}</strong>
          </article>
        </div>
        <CostTable scenario={costScenario} />
      </section>

      <section className="appendix-block">
        <h2>3. Что включено и что исключено</h2>
        <div className="appendix-columns">
          <article className="paper-card">
            <h3>Included</h3>
            <ul>
              {costScenario.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="paper-card">
            <h3>Excluded</h3>
            <ul>
              {costScenario.excluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="appendix-block">
        <h2>4. Фазирование</h2>
        <div className="appendix-columns">
          {phases.map((phase) => (
            <article key={phase.phase} className="paper-card">
              <span>{phase.phase}</span>
              <h3>{phase.residents}</h3>
              <p>{phase.focus}</p>
              <strong>{formatTenge(phase.capex)}</strong>
              <small>{phase.unlock}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="appendix-block">
        <h2>5. Правила города</h2>
        <div className="appendix-rule-list">
          {rules.map((rule) => (
            <article key={rule.title} className="paper-card">
              <h3>{rule.title}</h3>
              <p>{rule.cannotDo}</p>
              <p>{rule.mustDo}</p>
              <strong>{rule.metric}</strong>
              <small>{rule.failureMode}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="appendix-block">
        <h2>6. Допущения и benchmark notes</h2>
        <div className="paper-card">
          <ul>
            {costScenario.assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="note-stack">
            {benchmarkNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="appendix-block">
        <h2>7. Источники по разделам</h2>
        <div className="appendix-rule-list">
          {sections.map((section) => (
            <article key={section.id} className="paper-card">
              <h3>{section.title}</h3>
              <p>{section.narrativeGoal}</p>
              <small>Визуалы: {section.visuals.join(", ")}</small>
              <ul>
                {section.sources.map((sourceId) => {
                  const source = sources.find((entry) => entry.id === sourceId);

                  if (!source) {
                    return null;
                  }

                  return (
                    <li key={source.id}>
                      <a href={source.url} target="_blank" rel="noreferrer">
                        {source.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
