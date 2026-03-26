import Link from "next/link";
import { getSourceLinks, type ClaimRecord, type ConfidenceLevel, type MetricRecord, type TrustStatus } from "@/data/atlas";

export function formatPeople(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function formatSquareMeters(value: number) {
  return `${new Intl.NumberFormat("ru-RU").format(value)} м²`;
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function SiteTopline({ activePage }: { activePage?: string } = {}) {
  const pages = [
    { href: "/", label: "Flagship" },
    { href: "/detailed/", label: "Detailed" },
    { href: "/versions/", label: "Versions" },
    { href: "/machines/", label: "Machines" },
    { href: "/appendix/", label: "Appendix" },
  ];

  return (
    <div className="site-topline">
      <Link href="/" className="brand-mark">
        Project Totoro
      </Link>
      <nav className="page-links" aria-label="Навигация по страницам">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            aria-current={activePage === page.label ? "page" : undefined}
            className={activePage === page.label ? "is-current" : undefined}
          >
            {page.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PageMasthead({
  page,
  title,
  description
}: {
  page: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-masthead">
      <div className="masthead-particles" aria-hidden="true" />
      <SiteTopline activePage={page} />
      <div className="page-title-block">
        <Eyebrow>{page}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}

export function PageSection({
  id,
  eyebrow,
  title,
  text,
  children
}: {
  id?: string;
  eyebrow: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <section className="atlas-section" id={id}>
      <div className="section-intro">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function VisualFrame({
  title,
  caption,
  children,
  className
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={`visual-frame ${className ?? ""}`.trim()}>
      <figcaption className="visual-caption">
        <span className="visual-title">{title}</span>
        <span className="visual-text">{caption}</span>
      </figcaption>
      <div className="visual-canvas">{children}</div>
    </figure>
  );
}

export function TrustBadge({ status }: { status: TrustStatus }) {
  return <span className={`trust-badge trust-${status}`}>{status}</span>;
}

export function ConfidenceBadge({ confidence }: { confidence: ConfidenceLevel }) {
  return <span className={`confidence-badge confidence-${confidence}`}>{confidence}</span>;
}

export function MetricCard({ metric }: { metric: MetricRecord }) {
  return (
    <article className="metric-card">
      <div className="metric-topline">
        <span>{metric.label}</span>
        <div className="trust-pair">
          <TrustBadge status={metric.status} />
          <ConfidenceBadge confidence={metric.confidence} />
        </div>
      </div>
      <strong>
        {metric.value}
        {metric.unit === "residents" ? "" : ` ${metric.unit}`}
      </strong>
      <p>{metric.target}</p>
      <small>{metric.formula}</small>
    </article>
  );
}

export function ClaimCard({ claim }: { claim: ClaimRecord }) {
  return (
    <article className="claim-card">
      <div className="card-header-row">
        <h3>{claim.title}</h3>
        <div className="trust-pair">
          <TrustBadge status={claim.status} />
          <ConfidenceBadge confidence={claim.confidence} />
        </div>
      </div>
      <p>{claim.text}</p>
      <div className="claim-detail-grid">
        <div>
          <span>Почему важно</span>
          <strong>{claim.whyItMatters}</strong>
        </div>
        <div>
          <span>Граница</span>
          <strong>{claim.limits}</strong>
        </div>
      </div>
      <SourceDisclosure sourceIds={claim.sourceIds} label="Опоры claim" />
    </article>
  );
}

export function MetricStrip({ items }: { items: MetricRecord[] }) {
  return (
    <div className="metric-strip">
      {items.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}

export function SourceDisclosure({
  sourceIds,
  label = "Методика и источники"
}: {
  sourceIds: string[];
  label?: string;
}) {
  const sources = getSourceLinks(sourceIds);

  if (!sources.length) {
    return null;
  }

  return (
    <details className="source-disclosure">
      <summary>{label}</summary>
      <div className="source-disclosure-body">
        {sources.map((source) => (
          <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
            <span>{source.title}</span>
            <small>{source.note}</small>
          </a>
        ))}
      </div>
    </details>
  );
}

export function TrustLegend({
  items
}: {
  items: Array<{ label: string; title: string; detail: string }>;
}) {
  return (
    <div className="trust-legend">
      {items.map((item) => (
        <article key={item.label} className="trust-legend-card">
          <div className="card-header-row">
            <strong>{item.title}</strong>
            <span className={`trust-badge trust-${item.label}`}>{item.label}</span>
          </div>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

export function FooterPortal({ currentPath }: { currentPath?: string } = {}) {
  const links = [
    { href: "/versions/", label: "Открыть лабораторию версий", style: "button-primary" },
    { href: "/machines/", label: "Сравнить климатические машины", style: "button-secondary" },
    { href: "/appendix/", label: "Проверить appendix и provenance", style: "button-secondary" },
  ];

  return (
    <footer className="atlas-footer">
      <div>
        <Eyebrow>Дальше</Eyebrow>
        <h2>Project Totoro — это не одна картинка, а семейство проверяемых сценариев.</h2>
      </div>
      <div className="footer-links">
        {links
          .filter((link) => link.href !== currentPath)
          .map((link) => (
            <Link key={link.href} href={link.href} className={link.style}>
              {link.label}
            </Link>
          ))}
      </div>
    </footer>
  );
}

export function ComparisonBoard({
  title,
  value,
  detail
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="comparison-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

export function SectionLinks({
  links,
  title = "Внутри страницы"
}: {
  links: Array<{ href: string; label: string }>;
  title?: string;
}) {
  return (
    <aside className="section-links" aria-label={title}>
      {links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </aside>
  );
}

export function AppendixTable({
  columns,
  rows
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
