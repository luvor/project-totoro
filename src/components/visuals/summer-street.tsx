import { Bench, LampPost, PersonChild, PersonSitting, PersonWalking, TreeDeciduous } from "./shared-shapes";

export function SummerStreetGraphic() {
  return (
    <svg viewBox="0 0 560 400" role="img" aria-labelledby="summer-street-title">
      <title id="summer-street-title">Архитектурный разрез летней улицы с аркадами, деревьями и прохладными карманами</title>
      <defs>
        <linearGradient id="summer-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4e8f0" />
          <stop offset="100%" stopColor="#f1efe7" />
        </linearGradient>
        <clipPath id="street-clip">
          <rect width="560" height="400" rx="32" />
        </clipPath>
      </defs>

      <rect width="560" height="400" rx="32" fill="url(#summer-sky)" />

      <circle cx="460" cy="52" r="24" fill="#f0c27f" opacity="0.4" />
      <circle cx="460" cy="52" r="14" fill="#f0c27f" opacity="0.7" />

      <line x1="460" y1="52" x2="180" y2="300" stroke="#d4a050" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 6" />
      <line x1="460" y1="52" x2="320" y2="300" stroke="#d4a050" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 6" />

      <rect x="0" y="290" width="560" height="110" fill="#c8c4b8" clipPath="url(#street-clip)" />
      <rect x="0" y="294" width="560" height="4" fill="#a09880" opacity="0.5" />

      <g opacity="0.5">
        <rect x="80" y="320" width="400" height="8" rx="4" fill="#ef9461" opacity="0.4" />
        <text x="280" y="316" textAnchor="middle" fontSize="7" fill="#8a6a4a">отопление</text>

        <rect x="100" y="342" width="360" height="6" rx="3" fill="#7aaabe" opacity="0.4" />
        <text x="280" y="338" textAnchor="middle" fontSize="7" fill="#8a6a4a">cooling</text>

        <rect x="120" y="360" width="320" height="5" rx="2.5" fill="#8a9a7a" opacity="0.3" />
        <text x="280" y="358" textAnchor="middle" fontSize="7" fill="#8a6a4a">дренаж</text>
      </g>

      <rect x="140" y="270" width="280" height="24" rx="0" fill="#e0ddd4" />
      <rect x="140" y="268" width="280" height="4" fill="#d0cdc4" />

      <g>
        <rect x="28" y="110" width="116" height="180" fill="#d6c4a8" />
        <rect x="24" y="104" width="124" height="10" rx="2" fill="#1f3e56" />
        <rect x="40" y="126" width="18" height="24" rx="2" fill="#8ab0c0" opacity="0.5" />
        <rect x="66" y="126" width="18" height="24" rx="2" fill="#8ab0c0" opacity="0.5" />
        <rect x="92" y="126" width="18" height="24" rx="2" fill="#8ab0c0" opacity="0.5" />
        <rect x="118" y="126" width="18" height="24" rx="2" fill="#8ab0c0" opacity="0.5" />
        <rect x="40" y="162" width="18" height="24" rx="2" fill="#8ab0c0" opacity="0.4" />
        <rect x="66" y="162" width="18" height="24" rx="2" fill="#8ab0c0" opacity="0.4" />
        <rect x="92" y="162" width="18" height="24" rx="2" fill="#8ab0c0" opacity="0.4" />
        <rect x="118" y="162" width="18" height="24" rx="2" fill="#8ab0c0" opacity="0.4" />
        <rect x="38" y="150" width="22" height="3" rx="1" fill="#b0a090" />
        <rect x="64" y="150" width="22" height="3" rx="1" fill="#b0a090" />
        <rect x="90" y="150" width="22" height="3" rx="1" fill="#b0a090" />
        <rect x="116" y="150" width="22" height="3" rx="1" fill="#b0a090" />
        <g fill="#c8b898">
          <path d="M 36 290 L 36 230 Q 36 210 54 210 Q 72 210 72 230 L 72 290 Z" fill="#8a7a60" opacity="0.3" />
          <path d="M 78 290 L 78 230 Q 78 210 96 210 Q 114 210 114 230 L 114 290 Z" fill="#8a7a60" opacity="0.3" />
          <path d="M 36 210 Q 54 195 72 210" fill="none" stroke="#a09070" strokeWidth="3" />
          <path d="M 78 210 Q 96 195 114 210" fill="none" stroke="#a09070" strokeWidth="3" />
        </g>
        <rect x="34" y="208" width="4" height="82" fill="#b0a090" />
        <rect x="70" y="208" width="4" height="82" fill="#b0a090" />
        <rect x="112" y="208" width="4" height="82" fill="#b0a090" />
      </g>

      <g>
        <rect x="416" y="96" width="120" height="194" fill="#b8c8a0" />
        <rect x="412" y="88" width="128" height="12" rx="2" fill="#1b394f" />
        <rect x="420" y="88" width="20" height="8" rx="1" fill="#4a6a7a" />
        <rect x="445" y="88" width="20" height="8" rx="1" fill="#4a6a7a" />
        <rect x="470" y="88" width="20" height="8" rx="1" fill="#4a6a7a" />
        <rect x="495" y="88" width="20" height="8" rx="1" fill="#4a6a7a" />
        <rect x="428" y="112" width="16" height="22" rx="2" fill="#8ab0c0" opacity="0.5" />
        <rect x="452" y="112" width="16" height="22" rx="2" fill="#8ab0c0" opacity="0.5" />
        <rect x="476" y="112" width="16" height="22" rx="2" fill="#8ab0c0" opacity="0.5" />
        <rect x="500" y="112" width="16" height="22" rx="2" fill="#8ab0c0" opacity="0.5" />
        <rect x="428" y="146" width="16" height="22" rx="2" fill="#8ab0c0" opacity="0.4" />
        <rect x="452" y="146" width="16" height="22" rx="2" fill="#8ab0c0" opacity="0.4" />
        <rect x="476" y="146" width="16" height="22" rx="2" fill="#8ab0c0" opacity="0.4" />
        <rect x="500" y="146" width="16" height="22" rx="2" fill="#8ab0c0" opacity="0.4" />
        <rect x="424" y="100" width="4" height="190" rx="2" fill="#7aaa5a" opacity="0.5" />
        <rect x="448" y="105" width="3" height="180" rx="1.5" fill="#7aaa5a" opacity="0.4" />
        <rect x="472" y="100" width="4" height="188" rx="2" fill="#7aaa5a" opacity="0.5" />
        <rect x="496" y="108" width="3" height="178" rx="1.5" fill="#7aaa5a" opacity="0.4" />
        <rect x="520" y="100" width="4" height="190" rx="2" fill="#7aaa5a" opacity="0.5" />
        <rect x="454" y="250" width="30" height="40" rx="4" fill="#1b394f" opacity="0.5" />
      </g>

      <g>
        <ellipse cx="200" cy="280" rx="40" ry="10" fill="rgba(0,0,0,0.1)" />
        <ellipse cx="300" cy="276" rx="45" ry="12" fill="rgba(0,0,0,0.12)" />
        <ellipse cx="380" cy="280" rx="35" ry="9" fill="rgba(0,0,0,0.1)" />

        <TreeDeciduous x={200} y={268} scale={1.5} crownColor="#6aad5a" />
        <TreeDeciduous x={300} y={262} scale={1.7} crownColor="#7aba6a" />
        <TreeDeciduous x={380} y={268} scale={1.3} crownColor="#5a9a4a" />
      </g>

      <g>
        <rect x="240" y="278" width="80" height="12" rx="6" fill="#a7d3dc" opacity="0.7" />
        <circle cx="260" cy="284" r="3" fill="#6abace" opacity="0.6" />
        <circle cx="280" cy="284" r="4" fill="#6abace" opacity="0.7" />
        <circle cx="300" cy="284" r="3" fill="#6abace" opacity="0.6" />
        <text x="280" y="278" textAnchor="middle" fontSize="6" fill="#3a7a8a" opacity="0.8">mist nozzles</text>
      </g>

      <PersonWalking x={170} y={278} scale={1} fill="#2a4050" />
      <PersonWalking x={340} y={276} scale={0.9} fill="#2a4050" flip />
      <PersonSitting x={250} y={276} scale={0.9} fill="#2a4050" />
      <PersonChild x={260} y={278} scale={1} fill="#2a4050" />
      <PersonWalking x={440} y={280} scale={0.85} fill="#2a4050" />

      <Bench x={222} y={280} scale={0.9} fill="#6a5a4a" />
      <LampPost x={155} y={270} scale={0.9} />
      <LampPost x={395} y={270} scale={0.9} />

      <text x="44" y="40" fill="#183147" fontSize="18" fontWeight="700">
        Летний городской разрез
      </text>
      <text x="44" y="60" fill="#4c6577" fontSize="11">
        Глубокая тень, canopy, аркады, cooling pocket и подземные коммуникации
      </text>

      <text x="75" y="260" textAnchor="middle" fill="#183147" fontSize="9" opacity="0.7">аркада</text>
      <text x="280" y="260" textAnchor="middle" fill="#183147" fontSize="9" opacity="0.7">теневая улица</text>
      <text x="475" y="260" textAnchor="middle" fill="#183147" fontSize="9" opacity="0.7">зелёный фасад</text>

      <line x1="140" y1="252" x2="420" y2="252" stroke="#183147" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="280" y="250" textAnchor="middle" fontSize="7" fill="#183147" opacity="0.4">18 м</text>
    </svg>
  );
}
