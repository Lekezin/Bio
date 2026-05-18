import React from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowRight,
  Baby,
  Bike,
  Check,
  ChevronDown,
  Cross,
  Eye,
  HeartPulse,
  Hospital,
  Layers3,
  Menu,
  Microscope,
  Send,
  ShieldCheck,
  Sparkles,
  Syringe,
  UserRoundCheck,
  X,
  Zap,
} from "lucide-react";
import "./styles.css";

/* ───── data ───── */

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
  },
  {
    title: "Atletas",
    body: "Monitoramento inteligente para abrasões, bolhas e lesões leves, com praticidade durante a rotina de recuperação.",
    Icon: Bike,
  },
  {
    title: "Idosos e Diabéticos",
    body: "Acompanhamento visual para peles sensíveis e feridas que exigem observação cuidadosa e intervenção precoce.",
    Icon: HeartPulse,
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
    title: "Uso consciente de antibióticos",
    body: "Informação antecipada apoia decisões clínicas mais precisas e evita escaladas tardias.",
    Icon: Syringe,
  },
  {
    title: "Mais conforto no cuidado",
    body: "Acompanhe a cicatrização sem a dor e a ansiedade de remover o curativo repetidamente.",
    Icon: Sparkles,
  },
  {
    title: "Hidrogel acessível",
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
    title: "Sensor em alerta",
    text: "Atenção preventiva para mudanças no pH antes que o desconforto aumente.",
    image: "/assets/generated/hero-bandage.png",
  },
  {
    title: "Kits BioCheck",
    text: "Formatos pensados para casa, rotina esportiva e acompanhamento profissional.",
    image: "/assets/generated/product-kit.png",
  },
];

const plans = [
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
    cta: "Conhecer Kit",
    featured: true,
  },
  {
    name: "Kit Profissional",
    description: "Para equipes que buscam monitoramento visual em fluxos de cuidado.",
    details: ["Apresentação para rotina clínica", "Apoio ao acompanhamento preventivo", "Tecnologia de hidrogel acessível"],
    cta: "Conhecer Tecnologia",
  },
];

/* ───── scroll reveal hook ───── */

function useReveal(threshold = 0.15) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, tag: Tag = "div" }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ───── nav ───── */

function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a className="nav__brand" href="#topo" aria-label="Início">
        <img src="/assets/logos/logo-icon-cropped.png" alt="BioCheck" />
      </a>

      <nav className={`nav__links ${open ? "nav__links--open" : ""}`} aria-label="Menu principal">
        <a href="#como-funciona" onClick={() => setOpen(false)}>Como Funciona</a>
        <a href="#produto" onClick={() => setOpen(false)}>Produto</a>
        <a href="#quem-somos" onClick={() => setOpen(false)}>Quem Somos</a>
        <a href="#planos" onClick={() => setOpen(false)}>Planos</a>
        <a href="#contato" className="nav__cta" onClick={() => setOpen(false)}>
          Fale Conosco
          <ArrowRight size={15} />
        </a>
      </nav>

      <button
        className="nav__toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

/* ───── hero ───── */

function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero__content">
        <Reveal className="hero__badge">
          <Zap size={14} />
          <span>Tecnologia Colorimétrica</span>
        </Reveal>
        <Reveal delay={80}>
          <h1>
            A Cor Que<br />
            <span className="hero__accent">Protege Você.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="hero__subtitle">
            Monitoramento de infecção em tempo real com sensores colorimétricos integrados ao curativo.
            Saiba quando a cicatrização está evoluindo — sem a dor de remover.
          </p>
        </Reveal>
        <Reveal className="hero__actions" delay={240}>
          <a className="btn btn--primary" href="#como-funciona">
            Conhecer Tecnologia
            <ArrowRight size={17} />
          </a>
          <a className="btn btn--outline" href="#produto">
            Ver Produto
            <ChevronDown size={17} />
          </a>
        </Reveal>
      </div>

      <Reveal className="hero__visual" delay={120}>
        <div className="hero__glow" />
        <img
          className="hero__img"
          src="/assets/generated/hero-bandage.png"
          alt="Curativo inteligente BioCheck com sensor colorimétrico"
        />
        <div className="hero__float hero__float--1">
          <Zap size={16} />
          <span>Monitoramento em tempo real</span>
        </div>
        <div className="hero__float hero__float--2">
          <UserRoundCheck size={16} />
          <span>Conforto na cicatrização</span>
        </div>
      </Reveal>

      <a className="hero__scroll" href="#como-funciona" aria-label="Ir para Como Funciona">
        <span>Saiba mais</span>
        <ChevronDown size={16} />
      </a>
    </section>
  );
}

/* ───── sensor orb ───── */

function SensorOrb({ color = "#1aa7ff", label = "Sensor BioCheck" }) {
  return (
    <div className="sensor-orb" style={{ "--sensor": color }} aria-label={label}>
      <div className="sensor-orb__ring" />
      <div className="sensor-orb__core" />
      <div className="sensor-orb__dots">
        {Array.from({ length: 25 }, (_, i) => <span key={i} />)}
      </div>
    </div>
  );
}

/* ───── how it works ───── */

function HowItWorks() {
  const [active, setActive] = React.useState(0);
  const selected = colorStates[active];

  return (
    <section className="section" id="como-funciona">
      <Reveal className="section__head">
        <span className="section__tag">Como Funciona</span>
        <h2>Cores inteligentes.<br />Cicatrização mais clara.</h2>
        <p>
          Os sensores BioCheck respondem a alterações de pH no ambiente da ferida,
          oferecendo uma indicação visual imediata sobre o estado da cicatrização.
        </p>
      </Reveal>

      <Reveal className="scale">
        <div className="scale__track">
          {colorStates.map((s, i) => (
            <button
              key={s.name}
              type="button"
              className={`scale__dot ${active === i ? "scale__dot--active" : ""}`}
              style={{ "--c": s.color }}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={`Selecionar estado ${s.name}`}
            >
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        <div className="scale__display" style={{ "--active": selected.color }}>
          <div className="scale__orb-wrap">
            <SensorOrb color={selected.color} label={`Sensor ${selected.name}`} />
          </div>
          <article className="scale__info">
            <selected.Icon size={28} />
            <h3>{selected.name}</h3>
            <strong>{selected.label}</strong>
            <p>{selected.note}</p>
          </article>
        </div>

        <div className="scale__cards">
          {colorStates.map((s, i) => (
            <button
              key={s.name}
              type="button"
              className={`scard ${active === i ? "scard--active" : ""}`}
              style={{ "--c": s.color }}
              onClick={() => setActive(i)}
              aria-label={`Ver detalhes: ${s.name}`}
            >
              <s.Icon size={22} />
              <span>{s.name}</span>
              <small>{s.label}</small>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ───── product showcase ───── */

function ProductShowcase() {
  return (
    <section className="section" id="produto">
      <Reveal className="section__head">
        <span className="section__tag">Vitrine do Produto</span>
        <h2>Cuidado inteligente, visualmente claro.</h2>
        <p>
          Veja como a tecnologia BioCheck combina transparência, suavidade e leitura imediata
          no cuidado com feridas.
        </p>
      </Reveal>

      <Reveal className="showcase__feature">
        <img src="/assets/generated/product-kit.png" alt="Kit BioCheck com curativos inteligentes" />
        <div className="showcase__overlay">
          <Eye size={26} />
          <h3>Leitura por cor, sem interromper o cuidado.</h3>
          <p>
            A película transparente e o sensor circular deixam a resposta colorimétrica visível
            com estética limpa, discreta e futurista.
          </p>
          <a className="btn btn--outline btn--sm" href="#planos">
            Ver Detalhes <ArrowRight size={14} />
          </a>
        </div>
      </Reveal>

      <div className="showcase__grid">
        {showcaseItems.map((item, i) => (
          <Reveal className="showcase__card" key={item.title} delay={i * 100}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───── who it's for ───── */

function WhoItsFor() {
  return (
    <section className="section section--narrow" id="para-quem">
      <Reveal className="section__head">
        <span className="section__tag">Para Quem É</span>
        <h2>Projetado para diferentes jornadas de cicatrização.</h2>
      </Reveal>

      <div className="audience">
        {audiences.map((a, i) => (
          <Reveal className="audience__card" key={a.title} delay={i * 120} tag="article">
            <div className="audience__icon">
              <a.Icon size={36} />
            </div>
            <h3>{a.title}</h3>
            <p>{a.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───── why biocheck ───── */

function WhyBioCheck() {
  return (
    <section className="section" id="por-que">
      <Reveal className="section__head">
        <span className="section__tag">Por Que BioCheck</span>
        <h2>Mais segurança, conforto e precisão.</h2>
      </Reveal>

      <div className="reasons">
        {reasons.map((r, i) => (
          <Reveal className="reasons__card" key={r.title} delay={i * 80} tag="article">
            <r.Icon size={26} />
            <h3>{r.title}</h3>
            <p>{r.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───── about ───── */

function About() {
  return (
    <section className="section about" id="quem-somos">
      <Reveal className="about__text">
        <span className="section__tag">Quem Somos</span>
        <h2>Tecnologia futurista com vocação acessível.</h2>
        <p>
          A BioCheck Technologies desenvolve curativos inteligentes equipados com sensores colorimétricos
          integrados a uma matriz de hidrogel, capazes de monitorar a cicatrização em tempo real e detectar
          sinais de infecção de forma precoce.
        </p>
        <p>
          Nossa missão é tornar a informação sobre a saúde da pele mais visível, confortável e prática.
          Olhamos para um futuro em que o cuidado médico inteligente seja mais próximo das pessoas,
          mais preventivo e mais simples de interpretar.
        </p>
      </Reveal>
      <Reveal className="about__img" delay={120}>
        <img src="/assets/generated/product-blue.png" alt="Sensor BioCheck azul" />
        <div className="about__badges">
          {["Inovação acessível", "Saúde inteligente", "Conforto no cuidado"].map((t) => (
            <span key={t}><Check size={14} /> {t}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ───── partnership ───── */

function Partnership() {
  const [logoOk, setLogoOk] = React.useState(true);
  return (
    <section className="section section--flush">
      <Reveal className="partner">
        <div className="partner__copy">
          <span className="section__tag">Parceria Oficial</span>
          <h2>Pesquisa, tecnologia e cuidado conectados.</h2>
          <p>
            A parceria com o IPear fortalece o desenvolvimento de soluções médicas inteligentes com
            uma visão de inovação responsável, acessível e alinhada ao futuro da saúde.
          </p>
        </div>
        <div className="partner__logo" aria-label="Logo IPear">
          {logoOk ? (
            <img src="/assets/logos/ipear-logo.png" alt="IPear" onError={() => setLogoOk(false)} />
          ) : (
            <strong>IPear</strong>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ───── pricing ───── */

function Pricing() {
  return (
    <section className="section" id="planos">
      <Reveal className="section__head">
        <span className="section__tag">Planos</span>
        <h2>Opções pensadas para cada rotina de cuidado.</h2>
        <p>
          Estruturas simples, flexíveis e acessíveis para quem busca monitoramento inteligente
          com segurança e praticidade.
        </p>
      </Reveal>

      <div className="pricing">
        {plans.map((p, i) => (
          <Reveal
            className={`pricing__card ${p.featured ? "pricing__card--featured" : ""}`}
            key={p.name}
            delay={i * 100}
            tag="article"
          >
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <ul>
              {p.details.map((d) => (
                <li key={d}><Check size={15} /> {d}</li>
              ))}
            </ul>
            <a className={`btn ${p.featured ? "btn--primary" : "btn--outline"} btn--sm`} href="#contato">
              {p.cta} <ArrowRight size={14} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───── mission band ───── */

function MissionBand() {
  return (
    <section className="section section--flush">
      <Reveal className="mission">
        <div className="mission__img">
          <img src="/assets/generated/hero-bandage.png" alt="Curativo inteligente BioCheck" />
        </div>
        <div className="mission__copy">
          <h2>Sua saúde visível em cada detalhe.</h2>
          <p>
            A BioCheck une sensores colorimétricos e hidrogel biocompatível para transformar
            sinais invisíveis em informação visual, confortável e acionável.
          </p>
          <div className="mission__tags">
            {["Matriz biocompatível", "Ciência aplicada", "Leitura colorimétrica", "Cuidado cotidiano"].map((t) => (
              <span key={t}><Check size={14} /> {t}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ───── contact footer ───── */

function ContactFooter() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setEmail("");
      setName("");
      setMessage("");
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  }

  return (
    <footer className="footer" id="contato">
      <div className="footer__brand">
        <img src="/assets/logos/logo-slogan-cropped.png" alt="BioCheck — Sua saúde visível em cada detalhe." />
        <p>
          Tecnologia inteligente e acessível para tornar o cuidado com feridas
          mais claro, confortável e seguro.
        </p>
      </div>

      <form className="footer__form" onSubmit={handleSubmit}>
        <h3>Fale Conosco</h3>
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Seu nome"
        />
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Seu e-mail"
        />
        <textarea
          placeholder="Sua mensagem..."
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="Mensagem"
        />
        <button className="btn btn--primary" type="submit" disabled={sending}>
          {sending ? "Enviando..." : sent ? "Enviado com sucesso ✓" : "Enviar Mensagem"}
          {!sending && !sent && <Send size={15} />}
        </button>
        {sent && <p className="footer__success">Obrigado! Entraremos em contato em breve.</p>}
      </form>

      <div className="footer__bottom">
        <p>© 2026 BioCheck Technologies. Todos os direitos reservados.</p>
        <div className="footer__links">
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
        </div>
      </div>
    </footer>
  );
}

/* ───── app ───── */

function App() {
  return (
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
  );
}

createRoot(document.getElementById("root")).render(<App />);
