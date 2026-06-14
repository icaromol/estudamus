import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  MdCalendarToday,
  MdTimer,
  MdCheckCircle,
  MdAutorenew,
  MdEvent,
  MdHistory,
  MdArrowForward,
  MdMusicNote,
  MdTrendingUp,
  MdEmojiEvents,
  MdFlag,
} from "react-icons/md";

// ── Redirect se já logado ─────────────────────────────────────────────────────
function useRedirectIfLoggedIn() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user || !profile) return;
    if (profile.role === "teacher") navigate("/modo", { replace: true });
    else navigate("/aluno/planejamento", { replace: true });
  }, [user, profile, loading, navigate]);
}

// ── Componentes de seção ──────────────────────────────────────────────────────

function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#153b50]/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <img
          src="/logo_estudamus_horizontal_dark_blue.svg"
          alt="estudamus"
          className="h-6 brightness-0 invert"
        />
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-white/70 hover:text-white transition"
          >
            Entrar
          </Link>
          <Link
            to="/cadastro"
            className="text-sm font-semibold bg-white text-[#153b50] px-4 py-1.5 rounded-xl hover:bg-[#b2f0fb] transition"
          >
            Criar conta grátis
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-[#153b50] pt-28 pb-0 px-6 text-center overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <p className="inline-block text-xs font-semibold tracking-widest text-[#b2f0fb] uppercase mb-6">
          Plataforma de estudos musicais
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
          Você pratica.
          <br />
          Mas não sabe se está <span className="text-[#b2f0fb]">evoluindo</span>
          .
        </h1>
        <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
          O estudamus organiza seu repertório, distribui suas tarefas por dia e
          registra cada sessão de estudo — para que você entre no foco mais
          rápido e saia sabendo exatamente o que melhorou.
        </p>
        <Link
          to="/cadastro"
          className="inline-flex items-center gap-2 bg-white text-[#153b50] font-bold text-base px-8 py-3.5 rounded-2xl hover:bg-[#b2f0fb] transition shadow-lg"
        >
          Criar conta grátis
          <MdArrowForward size={18} />
        </Link>
        <p className="text-sm text-white/40 mt-4 mb-12">
          Só precisa de uma conta Google · Sem cartão de crédito
        </p>
      </div>

      {/* Mockup saindo para a seção seguinte — 30% visível abaixo do hero */}
      <div
        className="flex justify-center relative"
        style={{ marginBottom: "-15%" }}
      >
        <img
          src="/landing/hero/estudamus_planejamento.png"
          alt="Tela de planejamento do estudamus"
          className="w-[260px] sm:w-[300px] rounded-t-3xl shadow-2xl shadow-black/40"
        />
      </div>
    </section>
  );
}

const PAINS = [
  {
    quote: "Abro o estojo e fico 10 minutos decidindo o que tocar primeiro.",
  },
  {
    quote:
      "Toco a música inteira de novo e sinto que estudei. Mas na próxima aula está igual.",
  },
  {
    quote: "Tenho um recital chegando e não sei se vou dar conta.",
  },
];

function PainSection() {
  return (
    <section className="bg-[#f5f5f5] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#153b50] text-center mb-3">
          Quem estuda música conhece essa sensação.
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Não é falta de talento. É falta de estrutura.
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {PAINS.map(({ quote }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border-l-4 border-[#ff4c3e] shadow-sm"
            >
              <p className="text-gray-600 text-sm leading-relaxed">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    Icon: MdCalendarToday,
    title: "Sem decidir por onde começar",
    body: "Cada dia tem uma lista de tarefas definida: qual peça, qual aspecto técnico, quanto tempo. Você abre o app e começa.",
  },
  {
    Icon: MdTimer,
    title: 'Sem estudar "tocando do começo ao fim"',
    body: "O Pomodoro integrado divide o tempo em blocos de foco. Ao finalizar, você marca o que trabalhou — item por item.",
  },
  {
    Icon: MdTrendingUp,
    title: "Sem se perguntar se está evoluindo",
    body: "Cada peça tem um anel de progresso real, calculado pelo que você dominou no checklist técnico.",
  },
];

function SolutionSection() {
  return (
    <section className="bg-[#eff7fb] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#153b50] mb-3">
          O estudamus é seu plano de estudos automático.
        </h2>
        <p className="text-gray-500 mb-12 max-w-lg mx-auto">
          Você diz quais peças está estudando e quantos dias tem disponível. O
          app distribui as tarefas, prioriza o que precisa de mais atenção e
          mantém você no trilho.
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {PILLARS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 text-left shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#153b50] flex items-center justify-center mb-4">
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-[#153b50] text-sm mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Cada passo tem texto + imagem da tela correspondente
const STEPS = [
  {
    n: "1",
    title: "Cadastre seu repertório",
    body: "Digite o nome das músicas que está estudando. O app cria um checklist técnico automaticamente para cada uma.",
    img: "/landing/steps/estudamus_repertorio.png",
    imgAlt: "Tela de repertório do estudamus",
  },
  {
    n: "2",
    title: "Diga quando você tem tempo",
    body: "Marque os dias da semana e quantos minutos você tem. O app respeita sua rotina.",
    img: "/landing/steps/estudamus_disponibilidade.png",
    imgAlt: "Configuração de dias disponíveis",
  },
  {
    n: "3",
    title: "Entre em foco. É só tocar.",
    body: "O Pomodoro já carrega suas tarefas do dia. Você escolhe a peça, inicia o timer e estuda com intenção.",
    img: "/landing/steps/estudamus_pomodoro_timer.png",
    imgAlt: "Timer Pomodoro em andamento",
  },
];

function HowItWorksSection() {
  return (
    <section className="bg-[#f5f5f5] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#153b50] mb-3">
            Pronto para estudar em menos de 2 minutos.
          </h2>
          <p className="text-gray-500">
            O onboarding leva você do zero ao primeiro plano de estudos sem
            complicação.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {STEPS.map(({ n, title, body, img, imgAlt }, i) => (
            <div
              key={n}
              className={`flex flex-col sm:flex-row items-center gap-8 ${
                i % 2 === 1 ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Texto */}
              <div className="flex-1 text-left">
                <span className="text-5xl font-black text-[#b2f0fb] leading-none block mb-4">
                  {n}
                </span>
                <h3 className="font-bold text-[#153b50] text-lg mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>

              {/* Imagem */}
              <div className="flex-shrink-0">
                <img
                  src={img}
                  alt={imgAlt}
                  className="w-[200px] sm:w-[220px] rounded-3xl shadow-xl"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/cadastro"
            className="inline-flex items-center gap-2 bg-[#153b50] text-white font-bold text-sm px-8 py-3.5 rounded-2xl hover:bg-[#153b50]/90 transition shadow"
          >
            Começar agora, é grátis
            <MdArrowForward size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    Icon: MdCalendarToday,
    title: "Hoje",
    body: "Sua agenda musical do dia. Tarefas com tempo definido, ordenadas por prioridade.",
  },
  {
    Icon: MdTimer,
    title: "Pomodoro integrado",
    body: "Ciclos de foco (25/5, 50/10, 15/5 ou livre) com checklist ao finalizar.",
  },
  {
    Icon: MdCheckCircle,
    title: "Checklist por peça",
    body: "Cada música tem itens técnicos específicos. O progresso é real, não subjetivo.",
  },
  {
    Icon: MdAutorenew,
    title: "Modo manutenção",
    body: "Peças que você já aprendeu entram em rotação automática para não ficarem esquecidas.",
  },
  {
    Icon: MdEvent,
    title: "Recitais e prazos",
    body: "Cadastre um recital com data. O app prioriza as peças daquele programa automaticamente.",
  },
  {
    Icon: MdHistory,
    title: "Histórico de sessões",
    body: "Tudo que você estudou, quando, por quanto tempo e com qual dificuldade.",
  },
];

function FeaturesSection() {
  return (
    <section className="bg-[#eff7fb] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#153b50] text-center mb-3">
          Tudo que um músico em desenvolvimento precisa.
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Cada funcionalidade foi pensada para uma dor real do estudo musical.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-start"
            >
              <div className="w-9 h-9 rounded-xl bg-[#153b50] flex items-center justify-center shrink-0">
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#153b50] text-sm mb-1">
                  {title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Jornada + Objetivos lado a lado com imagem real
function GamificationSection() {
  return (
    <section className="bg-[#f5f5f5] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#153b50] mb-3">
            Estude com propósito. Evolua com motivação.
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Além do plano diário, o estudamus tem uma camada de motivação que
            transforma o progresso em conquista.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 items-start">
          {/* Jornada */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/landing/features/estudamus_gamificacao.png"
              alt="Jornada Musical — ranking e missões"
              className="w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#153b50] flex items-center justify-center shrink-0">
                  <MdEmojiEvents size={18} className="text-white" />
                </div>
                <h3 className="font-bold text-[#153b50] text-sm">
                  Jornada Musical
                </h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ganhe XP a cada sessão de estudo, suba de nível — de Aprendiz a
                Maestro — e complete missões semanais que mantêm você no ritmo
                mesmo nos dias sem aula.
              </p>
            </div>
          </div>

          {/* Objetivos */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/landing/features/estudamus_objetivos.png"
              alt="Objetivos — recitais, gravações e exames"
              className="w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#153b50] flex items-center justify-center shrink-0">
                  <MdFlag size={18} className="text-white" />
                </div>
                <h3 className="font-bold text-[#153b50] text-sm">Objetivos</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Cadastre seus eventos — recital, gravação, exame ou apresentação
                — e o app ajusta automaticamente a prioridade das peças para
                você chegar pronto na hora certa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="bg-[#153b50] py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
          <MdMusicNote size={24} className="text-[#b2f0fb]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Feito por músico, para músico.
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          O estudamus nasceu da frustração de não saber se o estudo da semana
          foi eficiente. De chegar na aula sem ter trabalhado o que precisava.
          De esquecer peças que levaram meses para aprender.
        </p>
        <p className="text-white/70 leading-relaxed">
          Não é um app genérico de produtividade com tema musical. É uma
          ferramenta construída em torno de como músicos de verdade aprendem.
        </p>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-[#b2f0fb] py-20 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#153b50] mb-4">
          Sua próxima sessão de estudo começa aqui.
        </h2>
        <p className="text-[#153b50]/70 mb-8 leading-relaxed">
          Crie sua conta grátis, cadastre suas peças e tenha um plano de estudos
          em menos de 2 minutos.
        </p>
        <Link
          to="/cadastro"
          className="inline-flex items-center gap-2 bg-[#153b50] text-white font-bold text-base px-8 py-3.5 rounded-2xl hover:bg-[#153b50]/90 transition shadow-lg"
        >
          Criar conta grátis com Google
          <MdArrowForward size={18} />
        </Link>
        <p className="text-[#153b50]/50 text-sm mt-4">
          Sem cartão. Sem compromisso. Cancele quando quiser — mas você não vai
          querer.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#292929] py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <img
          src="/logo_estudamus_horizontal_dark_blue.svg"
          alt="estudamus"
          className="h-5 brightness-0 invert opacity-60"
        />
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-xs text-white/40 hover:text-white/70 transition"
          >
            Entrar
          </Link>
          <Link
            to="/cadastro"
            className="text-xs text-white/40 hover:text-white/70 transition"
          >
            Criar conta
          </Link>
          <span className="text-xs text-white/20">Política de privacidade</span>
        </div>
        <p className="text-xs text-white/20">© 2025 estudamus</p>
      </div>
    </footer>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function LandingPage() {
  useRedirectIfLoggedIn();

  return (
    <div className="font-sans">
      <NavBar />
      <main>
        <Hero />
        <PainSection />
        <SolutionSection />
        <HowItWorksSection />
        <FeaturesSection />
        <GamificationSection />
        <ManifestoSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
