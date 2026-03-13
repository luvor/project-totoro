import Link from "next/link";
import { costScenario, sources, type CostScenario, type RuleCard, type SectionSpec } from "@/data/concept";

export function formatResidents(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function formatTenge(value: number, digits = 1) {
  return `${new Intl.NumberFormat("ru-RU", {
    notation: "compact",
    maximumFractionDigits: digits
  }).format(value)} ₸`;
}

export function formatPerSquareMeter(value: number) {
  return `${new Intl.NumberFormat("ru-RU").format(value)} ₸/м²`;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export function AnchorRail({ sections }: { sections: SectionSpec[] }) {
  return (
    <nav className="anchor-rail" aria-label="Навигация по секциям">
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`}>
          {section.title}
        </a>
      ))}
      <Link href="/appendix/">Appendix</Link>
    </nav>
  );
}

export function ScenarioSummary({ scenario }: { scenario: CostScenario }) {
  return (
    <div className="scenario-summary">
      <div>
        <span className="kicker">Base build-out</span>
        <strong>{scenario.scenario}</strong>
      </div>
      <div>
        <span className="kicker">Planning range</span>
        <strong>{formatTenge(sumColumn(scenario, "low"))} - {formatTenge(sumColumn(scenario, "high"))}</strong>
      </div>
      <div>
        <span className="kicker">All-in сценарий</span>
        <strong>
          {formatTenge(scenario.allInRange.low)} - {formatTenge(scenario.allInRange.high)}
        </strong>
      </div>
    </div>
  );
}

export function sumColumn(scenario: CostScenario, column: "low" | "base" | "high") {
  return scenario.categoryTotals.reduce((sum, category) => sum + category[column], 0);
}

export function RuleGrid({ items }: { items: RuleCard[] }) {
  return (
    <div className="rule-grid">
      {items.map((rule) => (
        <article key={rule.title} className="rule-card">
          <h3>{rule.title}</h3>
          <p className="rule-ban">{rule.cannotDo}</p>
          <p className="rule-must">{rule.mustDo}</p>
          <dl>
            <div>
              <dt>Почему</dt>
              <dd>{rule.why}</dd>
            </div>
            <div>
              <dt>Проверка</dt>
              <dd>{rule.metric}</dd>
            </div>
            <div>
              <dt>Цена решения</dt>
              <dd>{rule.tradeoff}</dd>
            </div>
            <div>
              <dt>Что ломается</dt>
              <dd>{rule.failureMode}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export function CostTable({ scenario = costScenario }: { scenario?: CostScenario }) {
  return (
    <div className="table-shell">
      <table>
        <caption>CAPEX по категориям, только build-out без земли и стоимости капитала</caption>
        <thead>
          <tr>
            <th>Категория</th>
            <th>Low</th>
            <th>Base</th>
            <th>High</th>
            <th>Смысл</th>
          </tr>
        </thead>
        <tbody>
          {scenario.categoryTotals.map((category) => (
            <tr key={category.label}>
              <th>{category.label}</th>
              <td>{formatTenge(category.low)}</td>
              <td>{formatTenge(category.base)}</td>
              <td>{formatTenge(category.high)}</td>
              <td>{category.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SourceList({ sourceIds }: { sourceIds: string[] }) {
  return (
    <div className="source-list">
      {sourceIds.map((sourceId) => {
        const source = sources.find((entry) => entry.id === sourceId);
        if (!source) {
          return null;
        }

        return (
          <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
            <span>{source.title}</span>
            <small>{source.note}</small>
          </a>
        );
      })}
    </div>
  );
}
