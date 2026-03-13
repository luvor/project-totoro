import Link from "next/link";
import {
  benchmarkNotes,
  costScenario,
  dailyCycle,
  districtSpec,
  energyCoreSpec,
  failureReasons,
  phases,
  rules,
  sections,
  typologies
} from "@/data/concept";
import {
  AnchorRail,
  CostTable,
  Eyebrow,
  RuleGrid,
  ScenarioSummary,
  SectionHeading,
  SourceList,
  formatPerSquareMeter,
  formatResidents,
  formatTenge,
  sumColumn
} from "@/components/site-blocks";
import {
  AxonometricGraphic,
  CapexGraphic,
  DailyCycleGraphic,
  EnergyCoreGraphic,
  FailureGraphic,
  HeroPlanGraphic,
  HousingGraphic,
  MasterPlanGraphic,
  MobilityGraphic,
  PhaseGraphic,
  VisualFrame
} from "@/components/visuals";

const sectionMap = Object.fromEntries(sections.map((section) => [section.id, section]));

export default function Home() {
  const buildOutBase = sumColumn(costScenario, "base");

  return (
    <main className="page-shell">
      <div className="page-backdrop" aria-hidden="true" />
      <AnchorRail sections={sections} />

      <section className="hero-section" id="hero">
        <div className="hero-copy">
          <Eyebrow>Новый район для холодной столицы</Eyebrow>
          <h1>
            Тепловое Кольцо.
            <span> Район, где зима становится инфраструктурой комфорта, а не оправданием плохой жизни.</span>
          </h1>
          <p className="hero-lead">
            Это greenfield-район на краю Астаны для {formatResidents(districtSpec.residents)} жителей: шесть смешанных
            кварталов, центральный тепловой собор, low-car мобильность и адресная urban logic без человейников,
            продуваемых пустырей и ежедневних поездок через полгорода.
          </p>
          <div className="hero-actions">
            <a href="#masterplan" className="button-primary">
              Посмотреть генплан
            </a>
            <Link href="/appendix/" className="button-secondary">
              Открыть printable appendix
            </Link>
          </div>
          <div className="metric-grid">
            {districtSpec.metrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <VisualFrame
            title="Город вокруг тепла"
            caption="Тепловое ядро находится в центре не ради эффекта, а потому что оно задаёт короткие маршруты и устойчивую зимнюю геометрию."
          >
            <HeroPlanGraphic />
          </VisualFrame>
        </div>
      </section>

      <section className="story-band">
        <div className="story-card">
          <span className="kicker">Главная идея</span>
          <p>
            Район не должен компенсировать плохой климат машиной. Он должен проектироваться так, чтобы базовая жизнь
            оставалась короткой, тёплой и понятной даже в январе.
          </p>
        </div>
        <div className="story-card">
          <span className="kicker">Что здесь революционного</span>
          <p>
            Инженерия становится общественной архитектурой: тепло больше не hidden utility, а центр идентичности и
            ежедневной жизни.
          </p>
        </div>
        <div className="story-card">
          <span className="kicker">Почему это реалистично</span>
          <p>
            Все ключевые элементы уже существуют как технологии. Новое здесь не магия, а дисциплина в том, как их
            собрать в одну городскую систему.
          </p>
        </div>
      </section>

      <section id="failure" className="content-section">
        <div className="section-copy">
          <SectionHeading
            eyebrow="01 · Почему холодные города ломаются"
            title="Проблема не в морозе самом по себе"
            text="Плохой холодный город ломается из-за ветра, длинных обязательных поездок, спрятанного тепла и поздно придуманной доступности. Это не природная данность, а следствие планировочных ошибок."
          />
          <div className="reason-grid">
            {failureReasons.map((reason) => (
              <article key={reason.title} className="reason-card">
                <h3>{reason.title}</h3>
                <p>{reason.summary}</p>
                <strong>{reason.symptom}</strong>
              </article>
            ))}
          </div>
          <SourceList sourceIds={sectionMap.failure.sources} />
        </div>
        <VisualFrame
          title="Диаграмма зимнего провала"
          caption="Если ветер, сервисы и доступность спроектированы плохо, человек вынужден покупать себе индивидуальную климатическую капсулу в виде машины."
        >
          <FailureGraphic />
        </VisualFrame>
      </section>

      <section id="masterplan" className="content-section">
        <div className="section-copy">
          <SectionHeading
            eyebrow="02 · Генплан"
            title="Шесть кварталов вокруг одного общественного центра"
            text="Тепловое Кольцо занимает 5.4 км² и строится как компактный крайний район, а не как расползающийся спутник. Каждый квартал держит собственный civic-кластер, но все вместе работают вокруг центрального теплового собора и 9.6-километрового транзитного кольца."
          />
          <div className="bullet-stack">
            <article className="feature-panel">
              <h3>Повседневный радиус</h3>
              <p>
                Базовые сервисы находятся в радиусе {districtSpec.dailyServiceRadiusM} м. Это убирает саму причину для
                большинства ежедневних поездок через весь город.
              </p>
            </article>
            <article className="feature-panel">
              <h3>Высота работает на адресность</h3>
              <p>
                Основная застройка держится в диапазоне {districtSpec.heightBands.typical}, а {districtSpec.heightBands.nodal}
                появляются только у остановок и civic-узлов.
              </p>
            </article>
            <article className="feature-panel">
              <h3>Публичное пространство не остаточное</h3>
              <p>
                {districtSpec.publicRealmSharePct}% территории остаётся за улицами, дворами, садами, площадями и
                step-free маршрутами, а не съедается парковкой и санитарными разрывами.
              </p>
            </article>
          </div>
          <SourceList sourceIds={sectionMap.masterplan.sources} />
        </div>
        <div className="visual-stack">
          <VisualFrame
            title="Генплан района"
            caption="Каждый квартал живёт самостоятельно, но центр и кольцо делают район единым организмом."
          >
            <MasterPlanGraphic />
          </VisualFrame>
          <VisualFrame
            title="Аксонометрия высот"
            caption="Рост высоты происходит только там, где он создаёт транспортный и civic-смысл, а не просто продаваемый объём."
          >
            <AxonometricGraphic />
          </VisualFrame>
        </div>
      </section>

      <section id="energy" className="content-section">
        <div className="section-copy">
          <SectionHeading
            eyebrow="03 · Тепловая система"
            title="Тепловой собор — это не метафора, а тип здания"
            text={`Ядро района закрывает ${energyCoreSpec.thermalLoadMwth}. Вместо ставки на одну технологию система собирается как гибрид: насосы, электрокотлы, waste heat, storage и газовый резерв под экстремальные сутки.`}
          />
          <div className="duo-grid">
            <article className="feature-panel">
              <h3>Публичная программа</h3>
              <ul>
                {energyCoreSpec.publicProgram.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="feature-panel">
              <h3>Отказоустойчивость</h3>
              <ul>
                {energyCoreSpec.reliability.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <SourceList sourceIds={sectionMap.energy.sources} />
        </div>
        <VisualFrame
          title="Разрез теплового ядра"
          caption="Самое важное зимнее здание района совмещает рынок, термы, библиотеку и инженерную надёжность. Оно красиво потому, что работает."
        >
          <EnergyCoreGraphic />
        </VisualFrame>
      </section>

      <section id="mobility" className="content-section">
        <div className="section-copy">
          <SectionHeading
            eyebrow="04 · Повседневная мобильность"
            title="Low-car, но без насильственной экзотики"
            text="Здесь можно иметь автомобиль, но не нужно жить вокруг него. Машина уходит на периметр, а внутри района ценность создают короткие маршруты, тёплые переходы, понятные пересадки и step-free логика движения."
          />
          <div className="mode-list">
            {districtSpec.modalSplit.map((mode) => (
              <div key={mode.label} className="mode-row">
                <span>{mode.label}</span>
                <div className="mode-bar">
                  <div style={{ width: `${mode.value}%` }} />
                </div>
                <strong>{mode.value}%</strong>
              </div>
            ))}
          </div>
          <div className="bullet-stack">
            <article className="feature-panel">
              <h3>12 км зимних галерей</h3>
              <p>
                Галереи не заменяют улицу, а страхуют самые ветреные и критичные отрезки: школы, пересадки, civic-кластер
                и путь к ядру.
              </p>
            </article>
            <article className="feature-panel">
              <h3>Step-free по умолчанию</h3>
              <p>
                Основной маршрут для коляски, кресла, сервиса и ходьбы совпадает. Отдельный “маршрут для доступности”
                здесь считается проектной ошибкой.
              </p>
            </article>
          </div>
          <SourceList sourceIds={sectionMap.mobility.sources} />
        </div>
        <VisualFrame
          title="Схема зимней мобильности"
          caption="Пешеходная и транзитная сеть читаются одинаково хорошо в пургу, темноте и гололёде. Авто остаётся как редкий режим, а не база городской геометрии."
        >
          <MobilityGraphic />
        </VisualFrame>
      </section>

      <section id="housing" className="content-section">
        <div className="section-copy">
          <SectionHeading
            eyebrow="05 · Жильё и общественные пространства"
            title="Плотность без человейника"
            text={`Базовый район даёт около ${new Intl.NumberFormat("ru-RU").format(
              districtSpec.grossFloorAreaM2
            )} м² GFA и плотность ${districtSpec.densityPerHa} жителей на гектар. Но эта плотность собрана не башнями, а несколькими типологиями с разными ролями.`}
          />
          <div className="typology-grid">
            {typologies.map((typology) => (
              <article key={typology.title} className="typology-card">
                <span>{typology.height}</span>
                <h3>{typology.title}</h3>
                <p>{typology.role}</p>
                <strong>{typology.whyItWorks}</strong>
              </article>
            ))}
          </div>
          <div className="timeline-list">
            {dailyCycle.map((moment) => (
              <article key={moment.time} className="timeline-card">
                <span>{moment.time}</span>
                <h3>{moment.title}</h3>
                <p>{moment.detail}</p>
              </article>
            ))}
          </div>
          <SourceList sourceIds={sectionMap.housing.sources} />
        </div>
        <div className="visual-stack">
          <VisualFrame
            title="Типологии вместо одного шаблона"
            caption="Каждый тип жилья решает свою задачу: двор, passage, civic-узел или край района."
          >
            <HousingGraphic />
          </VisualFrame>
          <VisualFrame
            title="Суточный цикл района"
            caption="Если хороший день не рвётся между домом, школой, работой и бытом, значит городская модель работает."
          >
            <DailyCycleGraphic />
          </VisualFrame>
        </div>
      </section>

      <section id="rules" className="content-section rules-section">
        <div className="section-copy full-width">
          <SectionHeading
            eyebrow="06 · Правила города"
            title="Каждое правило объясняется человеческим языком"
            text="Здесь нет магических запретов. У каждого ограничения есть причина, метрика проверки и понятный сценарий провала, если правило проигнорировать."
          />
          <RuleGrid items={rules} />
          <SourceList sourceIds={sectionMap.rules.sources} />
        </div>
      </section>

      <section id="costs" className="content-section costs-section">
        <div className="section-copy">
          <SectionHeading
            eyebrow="07 · Стоимость и реализуемость"
            title="Почти утопия стоит дорого. Но она стоит внятно."
            text={`Planning-range для полного build-out составляет ${formatTenge(
              sumColumn(costScenario, "low")
            )} - ${formatTenge(sumColumn(costScenario, "high"))} без земли и стоимости финансирования. Base scenario — ${formatTenge(
              buildOutBase
            )}, или ${formatPerSquareMeter(costScenario.perM2.base)} по общему GFA.`}
          />
          <ScenarioSummary scenario={costScenario} />
          <div className="duo-grid">
            <article className="feature-panel">
              <h3>Что включено</h3>
              <ul>
                {costScenario.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="feature-panel">
              <h3>Что идёт отдельно</h3>
              <ul>
                {costScenario.excluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <CostTable scenario={costScenario} />
          <div className="phase-list">
            {phases.map((phase) => (
              <article key={phase.phase} className="phase-card">
                <span>{phase.phase}</span>
                <h3>{phase.residents}</h3>
                <p>{phase.focus}</p>
                <strong>{phase.unlock}</strong>
                <em>{formatTenge(phase.capex)}</em>
              </article>
            ))}
          </div>
          <div className="note-stack">
            {benchmarkNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
          <SourceList sourceIds={sectionMap.costs.sources} />
        </div>
        <div className="visual-stack">
          <VisualFrame
            title="Три волны реализации"
            caption="Каждая очередь заканчивает рабочий кусок города, а не зависимую прелюдию к следующей фазе."
          >
            <PhaseGraphic />
          </VisualFrame>
          <VisualFrame
            title="CAPEX по категориям"
            caption="Жильё занимает основной объём, но критически важные деньги лежат в civic-инфраструктуре, тепловом ядре и public realm."
          >
            <CapexGraphic />
          </VisualFrame>
        </div>
      </section>

      <section className="closing-section">
        <div>
          <Eyebrow>08 · Итог</Eyebrow>
          <h2>Тёплый город будущего здесь не рисуется как игрушка</h2>
          <p>
            Он строится как дисциплина: короткая повседневность, климатическая инженерия, город без унижений на входах,
            mixed-use без человейников и фаза за фазой доказуемая реализуемость.
          </p>
        </div>
        <div className="closing-metrics">
          <article>
            <span>Base CAPEX</span>
            <strong>{formatTenge(buildOutBase)}</strong>
          </article>
          <article>
            <span>All-in range</span>
            <strong>
              {formatTenge(costScenario.allInRange.low)} - {formatTenge(costScenario.allInRange.high)}
            </strong>
          </article>
          <article>
            <span>Перспектива</span>
            <strong>Смело, но реально</strong>
          </article>
        </div>
      </section>
    </main>
  );
}
