import React from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowRight,
  Baby,
  Bike,
  Check,
  ChevronDown,
  CircleDollarSign,
  Cross,
  Eye,
  HeartPulse,
  Hospital,
  Layers3,
  Microscope,
  ShieldCheck,
  Sparkles,
  Syringe,
  UserRoundCheck,
  Zap,
} from "lucide-react";
import "./styles.css";

const FRAME_COUNT = 160;
const frameUrls = Array.from(
  { length: FRAME_COUNT },
  (_, index) => `/assets/frames/img (${index + 1}).jpg`,
);

const colorStates = [
  {
    name: "Saudável",
    label: "Cicatrização normal",
    note: "O azul indica equilíbrio do pH e evolução estável do tecido em recuperação.",
    color: "#1aa7ff",
    Icon: ShieldCheck,
  },
  {
    name: "Atenção",
    label: "Alteração de pH detectada",
    note: "O roxo sinaliza uma mudança no ambiente da ferida para acompanhamento mais próximo.",
    color: "#8a48ff",
    Icon: Activity,
  },
  {
    name: "Infecção",
    label: "Possível infecção detectada",
    note: "O vermelho indica uma resposta compatível com atividade bacteriana e necessidade de avaliação.",
    color: "#ff3d55",
    Icon: Cross,
  },
];

const audiences = [
  {
    title: "Pais e Crianças",
    body: "Mais tranquilidade em cortes, arranhões e pequenos cuidados do dia a dia, sem remover o curativo a cada dúvida.",
    Icon: Baby,
    tone: "blue",
  },
  {
    title: "Atletas",
    body: "Monitoramento inteligente para abrasões, bolhas e lesões leves, com praticidade durante a rotina de recuperação.",
    Icon: Bike,
    tone: "purple",
  },
  {
    title: "Idosos e Diabéticos",
    body: "Acompanhamento visual para peles sensíveis e feridas que exigem observação cuidadosa e intervenção precoce.",
    Icon: HeartPulse,
    tone: "red",
  },
];

const reasons = [
  {
    title: "Menos custos hospitalares",
    body: "Sinais visuais mais cedo podem reduzir complicações, retornos e trocas desnecessárias de curativo.",
    Icon: Hospital,
  },
  {
    title: "Detecção mais rápida",
    body: "Sensores colorimétricos reagem a alterações de pH associadas à atividade bacteriana.",
    Icon: Microscope,
  },
  {
    title: "Uso mais consciente de antibióticos",
    body: "Informação antecipada apoia decisões clínicas mais precisas e evita escaladas tardias.",
    Icon: Syringe,
  },
  {
    title: "Mais conforto no cuidado",
    body: "Acompanhe a cicatrização sem a dor e a ansiedade de remover o curativo repetidamente.",
    Icon: Sparkles,
  },
  {
    title: "Hidrogel acessível e inteligente",
    body: "Uma matriz biocompatível pensada para unir tecnologia avançada e aplicação cotidiana.",
    Icon: Layers3,
  },
];

const showcaseItems = [
  {
    title: "Sensor azul",
    text: "Estado visual de cicatrização equilibrada, com leitura clara e discreta.",
    image: "/assets/generated/product-blue.png",
  },
  {
    title: "Sensor roxo",
    text: "Atenção preventiva para mudanças no pH antes que o desconforto aumente.",
    image: "/assets/generated/hero-bandage.png",
  },
  {
    title: "Kits BioCheck",
    text: "Formatos pensados para casa, rotina esportiva e acompanhamento profissional.",
    image: "/assets/generated/product-kit.png",
  },
];

const pricing = [
  {
    name: "Unidade Individual",
    description: "Para acompanhar um cuidado pontual com tecnologia simples e intuitiva.",
    details: ["1 curativo BioCheck", "Sensor colorimétrico integrado", "Guia visual de leitura"],
    cta: "Ver Detalhes",
  },
  {
    name: "Kit Família",
    description: "Uma solução prática para pequenos cuidados recorrentes em casa.",
    details: ["Curativos em múltiplos tamanhos", "Indicação visual por cor", "Uso confortável no dia a dia"],
    cta: "Explorar BioCheck",
    featured: true,
  },
  {
    name: "Kit Profissional/Médico",
    description: "Para equipes que buscam monitoramento visual em fluxos de cuidado.",
    details: ["Apresentação para rotina clínica", "Apoio ao acompanhamento preventivo", "Tecnologia de hidrogel de baixo custo"],
    cta: "Conhecer Tecnologia",
  },
];

function IntroSequence() {
  const [frame, setFrame] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [loaded, setLoaded] = React.useState(0);

  React.useEffect(() => {
    let active = true;
    let timer;

    const preload = frameUrls.map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image();
          image.onload = () => {
            if (active) setLoaded((value) => value + 1);
            resolve();
          };
          image.onerror = resolve;
          image.src = src;
        }),
    );

    Promise.all(preload).then(() => {
      if (!active) return;
      timer = window.setInterval(() => {
        setFrame((current) => {
          if (current >= FRAME_COUNT - 1) {
            window.clearInterval(timer);
            window.setTimeout(() => {
              if (active) setDone(true);
            }, 650);
            return current;
          }
          return current + 1;
        });
      }, 28);
    });

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const progress = Math.max(loaded / FRAME_COUNT, (frame + 1) / FRAME_COUNT);

  return (
    <div className={`intro ${done ? "intro--done" : ""}`} aria-hidden={done}>
      <img className="intro__frame" src={frameUrls[frame]} alt="" />
      <div className="intro__grain" />
      <div className="intro__hud">
        <img src="/assets/logos/logo-icon-cropped.png" alt="" />
        <div className="intro__bar" aria-label="Carregando experiência BioCheck">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="nav">
      <a className="nav__brand" href="#top" aria-label="Início BioCheck">
        <img src="/assets/logos/logo-icon-cropped.png" alt="" />
      </a>
      <nav aria-label="Navegação principal">
        <a href="#how">Como Funciona</a>
        <a href="#showcase">Produto</a>
        <a href="#about">Quem Somos</a>
        <a href="#pricing">Planos</a>
      </nav>
      <a className="button button--small button--primary" href="#showcase">
        Explorar
        <ArrowRight size={16} />
      </a>
    </header>
  );
}

function SensorOrb({ color = "#8a48ff", label = "Sensor BioCheck" }) {
  return (
    <div className="sensor-orb" style={{ "--sensor": color }} aria-label={label}>
      <div className="sensor-orb__ring" />
      <div className="sensor-orb__dots">
        {Array.from({ length: 25 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__copy reveal">
        <img className="hero__logo" src="/assets/logos/logo-slogan-cropped.png" alt="BioCheck. Sua saúde visível em cada detalhe." />
        <h1>A Cor Que Protege Você</h1>
        <p>
          Monitoramento de infecção em tempo real com sensores colorimétricos. Saiba quando a cicatrização está
          evoluindo sem a dor de remover o curativo.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#how">
            Conhecer Tecnologia
            <ArrowRight size={18} />
          </a>
          <a className="button button--ghost" href="#showcase">
            Ver Detalhes
            <ChevronDown size={18} />
          </a>
        </div>
      </div>

      <div className="hero__visual reveal reveal--delay">
        <div className="hero__halo" />
        <img className="hero__bandage" src="/assets/generated/hero-bandage.png" alt="Curativo inteligente transparente com sensor BioCheck roxo" />
        <div className="hero__glass hero__glass--one">
          <Zap size={18} />
          <span>Monitoramento em tempo real</span>
        </div>
        <div className="hero__glass hero__glass--two">
          <UserRoundCheck size={18} />
          <span>Mais conforto ao cicatrizar</span>
        </div>
      </div>
      <a className="hero__scroll" href="#how" aria-label="Ir para Como Funciona">
        <span>Como Funciona</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}

function HowItWorks() {
  const [active, setActive] = React.useState(1);
  const selected = colorStates[active];

  return (
    <section className="section how" id="how">
      <div className="section__heading reveal">
        <span>Como Funciona</span>
        <h2>Cores inteligentes. Cicatrização mais clara.</h2>
        <p>
          Os sensores BioCheck respondem a alterações de pH no ambiente da ferida, oferecendo uma indicação visual
          imediata sobre o estado da cicatrização.
        </p>
      </div>

      <div className="scale reveal">
        <div className="scale__track" aria-label="Escala colorimétrica BioCheck">
          {colorStates.map((state, index) => (
            <button
              className={`scale__point ${active === index ? "scale__point--active" : ""}`}
              key={state.name}
              type="button"
              style={{ "--state": state.color }}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              aria-label={`Selecionar estado ${state.name}`}
            >
              <span>{state.name}</span>
            </button>
          ))}
        </div>

        <div className="scale__stage" style={{ "--active": selected.color }}>
          <div>
            <SensorOrb color={selected.color} label={`Sensor no estado ${selected.name}`} />
          </div>
          <article>
            <selected.Icon size={32} />
            <h3>{selected.name}</h3>
            <strong>{selected.label}</strong>
            <p>{selected.note}</p>
          </article>
        </div>

        <div className="scale__cards">
          {colorStates.map((state, index) => (
            <button
              key={state.name}
              type="button"
              className={`state-card ${active === index ? "state-card--active" : ""}`}
              onClick={() => setActive(index)}
              style={{ "--state": state.color }}
              aria-label={`Ver detalhes de ${state.name}`}
            >
              <state.Icon size={24} />
              <span>{state.name}</span>
              <small>{state.label}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section className="section showcase" id="showcase">
      <div className="section__heading reveal">
        <span>Vitrine do Produto</span>
        <h2>Uma experiência visual para o cuidado inteligente.</h2>
        <p>
          Renders de produto e detalhes de sensor mostram como a tecnologia BioCheck combina transparência,
          suavidade e leitura imediata.
        </p>
      </div>

      <div className="showcase__hero reveal">
        <img src="/assets/generated/product-kit.png" alt="Kit BioCheck com curativos inteligentes em diferentes estados de cor" />
        <div className="showcase__panel">
          <Eye size={28} />
          <h3>Leitura por cor, sem interromper o cuidado.</h3>
          <p>
            A película transparente e o sensor circular deixam a resposta colorimétrica visível com estética limpa,
            discreta e futurista.
          </p>
          <a className="button button--ghost" href="#pricing">
            Ver Detalhes
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="gallery-grid">
        {showcaseItems.map((item) => (
          <article className="gallery-card reveal" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="section who" id="who">
      <div className="section__heading reveal">
        <span>Para Quem É</span>
        <h2>Projetado para diferentes jornadas de cicatrização.</h2>
      </div>

      <div className="audience-grid">
        {audiences.map((item) => (
          <article className={`audience-card audience-card--${item.tone} reveal`} key={item.title}>
            <div className="audience-card__media">
              <item.Icon size={42} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyBioCheck() {
  return (
    <section className="section why" id="why">
      <div className="section__heading reveal">
        <span>Por Que BioCheck</span>
        <h2>Mais segurança, conforto e precisão no acompanhamento.</h2>
      </div>

      <div className="reasons-grid">
        {reasons.map((item) => (
          <article className="reason-card reveal" key={item.title}>
            <item.Icon size={30} />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="about__copy reveal">
        <span>Quem Somos</span>
        <h2>Tecnologia futurista com vocação acessível.</h2>
        <p>
          A BioCheck Technologies desenvolve curativos inteligentes equipados com sensores colorimétricos integrados a
          uma matriz de hidrogel, capazes de monitorar a cicatrização em tempo real e detectar sinais de infecção de
          forma precoce.
        </p>
        <p>
          Nossa missão é tornar a informação sobre a saúde da pele mais visível, confortável e prática. Olhamos para um
          futuro em que o cuidado médico inteligente seja mais próximo das pessoas, mais preventivo e mais simples de
          interpretar.
        </p>
      </div>
      <div className="about__visual reveal reveal--delay">
        <img src="/assets/generated/product-blue.png" alt="Sensor BioCheck azul em curativo transparente" />
        <div className="about__metrics">
          <span>
            <Check size={16} />
            Inovação acessível
          </span>
          <span>
            <Check size={16} />
            Saúde inteligente
          </span>
          <span>
            <Check size={16} />
            Conforto no cuidado
          </span>
        </div>
      </div>
    </section>
  );
}

function Partnership() {
  return (
    <section className="section partnership">
      <div className="partnership__card reveal">
        <div>
          <span>Parceria Oficial com IPear</span>
          <h2>Pesquisa, tecnologia e cuidado conectados.</h2>
          <p>
            A parceria fortalece o desenvolvimento de soluções médicas inteligentes com uma visão de inovação
            responsável, acessível e alinhada ao futuro da saúde.
          </p>
        </div>
        <div className="ipear-mark" aria-label="Logo IPear">
          <strong>IPear</strong>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="section__heading reveal">
        <span>Planos</span>
        <h2>Opções pensadas para cada rotina de cuidado.</h2>
        <p>
          Estruturas simples, elegantes e flexíveis para quem busca monitoramento inteligente com segurança e
          praticidade.
        </p>
      </div>

      <div className="pricing-grid">
        {pricing.map((plan) => (
          <article className={`pricing-card ${plan.featured ? "pricing-card--featured" : ""} reveal`} key={plan.name}>
            <CircleDollarSign size={30} />
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <ul>
              {plan.details.map((detail) => (
                <li key={detail}>
                  <Check size={16} />
                  {detail}
                </li>
              ))}
            </ul>
            <a className={`button ${plan.featured ? "button--primary" : "button--ghost"}`} href="#contact">
              {plan.cta}
              <ArrowRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function MissionBand() {
  return (
    <section className="section mission-section">
      <div className="mission reveal">
        <div className="mission__image">
          <img src="/assets/generated/hero-bandage.png" alt="Detalhe do curativo inteligente BioCheck" />
        </div>
        <div className="mission__copy">
          <h2>Sua saúde visível em cada detalhe.</h2>
          <p>
            A BioCheck une sensores colorimétricos e hidrogel biocompatível para transformar sinais invisíveis em
            informação visual, confortável e acionável.
          </p>
          <div className="mission__checks">
            {["Matriz biocompatível", "Tecnologia informada por ciência", "Leitura colorimétrica", "Cuidado cotidiano"].map((item) => (
              <span key={item}>
                <Check size={16} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <footer className="footer" id="contact">
      <div>
        <img src="/assets/logos/logo-slogan-cropped.png" alt="BioCheck. Sua saúde visível em cada detalhe." />
        <p>Tecnologia inteligente e acessível para tornar o cuidado com feridas mais claro, confortável e seguro.</p>
      </div>
      <form className="footer__form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="email">Receba novidades</label>
        <div>
          <input id="email" type="email" placeholder="voce@exemplo.com" aria-label="Endereço de e-mail" />
          <button className="button button--primary" type="submit">
            Acompanhar
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </footer>
  );
}

function App() {
  return (
    <>
      <IntroSequence />
      <div className="page">
        <Nav />
        <main>
          <Hero />
          <HowItWorks />
          <ProductShowcase />
          <WhoItsFor />
          <WhyBioCheck />
          <About />
          <Partnership />
          <Pricing />
          <MissionBand />
        </main>
        <ContactFooter />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
