import type { RiskScenario } from "@/data/atlas";

export function ResilienceGraphic({ scenario }: { scenario: RiskScenario }) {
  return (
    <svg viewBox="0 0 560 360" role="img" aria-labelledby="resilience-title">
      <title id="resilience-title">{`Сценарий отказа и fallback-логика района: ${scenario.title}`}</title>
      <defs>
        <linearGradient id="resilience-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#121d2b" />
          <stop offset="100%" stopColor="#0a1420" />
        </linearGradient>
      </defs>

      <rect width="560" height="360" rx="30" fill="url(#resilience-bg)" />

      <text x="34" y="38" fill="#f7f4ee" fontSize="16" fontWeight="700">
        {scenario.title}
      </text>
      <text x="34" y="58" fill="#a7b8c6" fontSize="11">
        {scenario.summary}
      </text>

      <g transform="translate(280,170)">
        <circle cx="0" cy="0" r="85" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

        <path
          d="M -60 -60 A 85 85 0 0 1 60 -60 L 30 -30 A 42 42 0 0 0 -30 -30 Z"
          fill="rgba(239,148,97,0.25)"
          stroke="rgba(239,148,97,0.4)"
          strokeWidth="1"
        />
        <path
          d="M 60 -60 A 85 85 0 0 1 60 60 L 30 30 A 42 42 0 0 0 30 -30 Z"
          fill="rgba(143,200,121,0.2)"
          stroke="rgba(143,200,121,0.35)"
          strokeWidth="1"
        />
        <path
          d="M 60 60 A 85 85 0 0 1 -60 60 L -30 30 A 42 42 0 0 0 30 30 Z"
          fill="rgba(146,189,210,0.2)"
          stroke="rgba(146,189,210,0.35)"
          strokeWidth="1"
        />
        <path
          d="M -60 60 A 85 85 0 0 1 -60 -60 L -30 -30 A 42 42 0 0 0 -30 30 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        <circle cx="0" cy="0" r="28" fill="rgba(240,194,127,0.15)" stroke="rgba(240,194,127,0.3)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="14" fill="rgba(240,194,127,0.3)" />

        <g stroke="rgba(239,148,97,0.7)" strokeWidth="1.5" strokeLinecap="round">
          <line x1="-8" y1="-56" x2="8" y2="-42" />
          <line x1="8" y1="-56" x2="-8" y2="-42" />
        </g>

        <path d="M 50 -8 L 54 -2 L 62 -14" fill="none" stroke="rgba(143,200,121,0.7)" strokeWidth="1.5" strokeLinecap="round" />

        <path d="M 8 50 L 16 58 L 8 66" fill="none" stroke="rgba(146,189,210,0.7)" strokeWidth="1.5" strokeLinecap="round" />

        <text x="0" y="-65" textAnchor="middle" fontSize="7" fill="rgba(239,148,97,0.8)" letterSpacing="0.06em">ЛОМАЕТСЯ</text>
        <text x="70" y="4" textAnchor="middle" fontSize="7" fill="rgba(143,200,121,0.8)" letterSpacing="0.06em">РАБОТАЕТ</text>
        <text x="0" y="72" textAnchor="middle" fontSize="7" fill="rgba(146,189,210,0.8)" letterSpacing="0.06em">FALLBACK</text>
      </g>

      <g>
        <rect x="34" y="268" width="156" height="72" rx="14" fill="rgba(239,148,97,0.12)" stroke="rgba(239,148,97,0.2)" strokeWidth="1" />
        <circle cx="50" cy="282" r="5" fill="rgba(239,148,97,0.6)" />
        <text x="60" y="286" fill="#f7d0b8" fontSize="9" fontWeight="700" letterSpacing="0.04em">ЧТО ЛОМАЕТСЯ</text>
        <text x="46" y="302" fill="#dfe8ef" fontSize="9">
          {scenario.whatBreaks.length > 60 ? scenario.whatBreaks.slice(0, 58) + "..." : scenario.whatBreaks}
        </text>
        {scenario.whatBreaks.length > 60 && (
          <text x="46" y="316" fill="#dfe8ef" fontSize="9">
            {scenario.whatBreaks.slice(58, 116)}
          </text>
        )}

        <rect x="202" y="268" width="156" height="72" rx="14" fill="rgba(143,200,121,0.12)" stroke="rgba(143,200,121,0.2)" strokeWidth="1" />
        <circle cx="218" cy="282" r="5" fill="rgba(143,200,121,0.6)" />
        <text x="228" y="286" fill="#c8efc0" fontSize="9" fontWeight="700" letterSpacing="0.04em">ЧТО ОСТАЁТСЯ</text>
        <text x="214" y="302" fill="#dfe8ef" fontSize="9">
          {scenario.whatKeepsWorking.length > 60 ? scenario.whatKeepsWorking.slice(0, 58) + "..." : scenario.whatKeepsWorking}
        </text>
        {scenario.whatKeepsWorking.length > 60 && (
          <text x="214" y="316" fill="#dfe8ef" fontSize="9">
            {scenario.whatKeepsWorking.slice(58, 116)}
          </text>
        )}

        <rect x="370" y="268" width="156" height="72" rx="14" fill="rgba(146,189,210,0.12)" stroke="rgba(146,189,210,0.2)" strokeWidth="1" />
        <circle cx="386" cy="282" r="5" fill="rgba(146,189,210,0.6)" />
        <text x="396" y="286" fill="#c0ddef" fontSize="9" fontWeight="700" letterSpacing="0.04em">FALLBACK</text>
        <text x="382" y="302" fill="#dfe8ef" fontSize="9">
          {scenario.fallbackProtocol.length > 60 ? scenario.fallbackProtocol.slice(0, 58) + "..." : scenario.fallbackProtocol}
        </text>
        {scenario.fallbackProtocol.length > 60 && (
          <text x="382" y="316" fill="#dfe8ef" fontSize="9">
            {scenario.fallbackProtocol.slice(58, 116)}
          </text>
        )}
      </g>
    </svg>
  );
}
