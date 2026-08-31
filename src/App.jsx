const pillars = [
  {
    id: "01",
    title: "Ideias que ganham forma",
    description:
      "Projetos criados por estudantes que transformam curiosidade em experimentação.",
    tone: "coral",
    symbol: "↗",
  },
  {
    id: "02",
    title: "Aprender fazendo",
    description:
      "Um espaço para compartilhar processos, descobertas e novas possibilidades.",
    tone: "blue",
    symbol: "✦",
  },
  {
    id: "03",
    title: "Uma escola em movimento",
    description:
      "Conhecimento, criatividade e colaboração reunidos em uma experiência única.",
    tone: "yellow",
    symbol: "+",
  },
];

function Brand() {
  return (
    <span className="brand">
      <span className="brand__seal">E</span>
      <span>
        expo<span className="brand__dot">.</span>bentinho
      </span>
      <small>2026</small>
    </span>
  );
}

export default function App() {
  return (
    <>
      <header className="topbar">
        <a href="#inicio" aria-label="Expo Bentinho 2026 — início">
          <Brand />
        </a>
        <nav aria-label="Principal">
          <a href="#sobre">Sobre a expo</a>
          <a href="#experiencia">Experiência</a>
          <a href="#programacao">Programação</a>
        </nav>
        <a className="topbar__button" href="#programacao">
          Ver programação <span>↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero__copy">
            <p className="eyebrow"><i /> Mostra de projetos &amp; descobertas</p>
            <h1>O futuro começa <em>com uma ideia.</em></h1>
            <p className="hero__text">
              A Expo Bentinho 2026 celebra a criatividade, a pesquisa e tudo
              aquilo que acontece quando a gente aprende colocando a mão na massa.
            </p>
            <div className="hero__actions">
              <a className="button button--ink" href="#sobre">
                Conheça o evento <span>↓</span>
              </a>
              <a className="inline-link" href="#experiencia">
                Descubra a experiência <span>↗</span>
              </a>
            </div>
          </div>

          <div className="hero__art" aria-hidden="true">
            <span className="hero__sun" />
            <span className="hero__circle hero__circle--large" />
            <span className="hero__circle hero__circle--small" />
            <span className="hero__orbit hero__orbit--wide" />
            <span className="hero__orbit hero__orbit--tall" />
            <span className="hero__star">✦</span>
            <span className="hero__arrow">↗</span>
            <span className="hero__note hero__note--top">
              curiosidade<br /><b>em movimento</b>
            </span>
            <span className="hero__note hero__note--bottom">
              BENTINHO<br /><b>2026</b>
            </span>
          </div>
          <div className="hero__scroll">Explore <span /> 01 / 03</div>
        </section>

        <section className="about section" id="sobre">
          <p className="section__label">01 / Sobre a expo</p>
          <div className="about__grid">
            <h2>Um encontro entre <span>perguntas e possibilidades.</span></h2>
            <div>
              <p className="lead">
                A Expo Bentinho é um convite para olhar de perto o que os
                estudantes imaginam, investigam e constroem.
              </p>
              <p className="body-copy">
                Mais do que uma mostra, é um momento de troca: ideias saem do
                papel, processos ganham voz e cada projeto revela um jeito
                diferente de entender o mundo.
              </p>
              <a className="inline-link" href="#experiencia">
                Conheça o que te espera <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="experience section" id="experiencia">
          <div className="experience__heading">
            <p className="section__label">02 / A experiência</p>
            <p>Três palavras para entrar no clima<br />da Expo Bentinho 2026.</p>
          </div>
          <div className="pillars">
            {pillars.map((pillar) => (
              <article className={`pillar pillar--${pillar.tone}`} key={pillar.id}>
                <span className="pillar__id">{pillar.id}</span>
                <span className="pillar__symbol">{pillar.symbol}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <span className="pillar__arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="program section" id="programacao">
          <p className="section__label">03 / Programação</p>
          <div className="program__grid">
            <h2>Reserve espaço <em>para descobrir.</em></h2>
            <div>
              <p className="lead">
                A programação completa da Expo Bentinho 2026 será divulgada em breve.
              </p>
              <p className="body-copy">
                Fique atento aos canais da escola para acompanhar as novidades,
                horários e detalhes de visitação.
              </p>
              <span className="status"><i /> Programação em breve</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Brand />
        <p>Uma celebração de ideias, projetos<br />e novas descobertas.</p>
        <span>© 2026</span>
      </footer>
    </>
  );
}
