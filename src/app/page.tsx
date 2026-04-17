"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Users,
  AlertTriangle,
  ShieldCheck,
  Star,
  MessageCircle,
  CheckCircle2,
  Lock,
  Zap,
  Phone,
  X,
} from "lucide-react";
import { trackLead, getUtmParams } from "@/lib/utils";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function CtaButton({
  children,
  href,
  variant = "primary",
  className = "",
  size = "default",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  size?: "default" | "lg";
}) {
  const [utmSuffix, setUtmSuffix] = useState("");
  useEffect(() => { setUtmSuffix(getUtmParams()); }, []);

  const base =
    variant === "primary"
      ? "bg-[#F5A623] hover:bg-[#FFB84D] text-black font-bold shadow-[0_0_30px_rgba(245,166,35,0.25)] hover:shadow-[0_0_40px_rgba(245,166,35,0.35)] transition-all duration-300"
      : variant === "outline"
      ? "border border-white/20 text-white hover:bg-white/5 transition-all duration-300"
      : "text-[#F5A623] hover:text-[#FFB84D] hover:bg-[#F5A623]/5 transition-all duration-300";

  const sizeClass =
    size === "lg"
      ? "px-14 py-7 text-xl font-extrabold rounded-xl"
      : "px-10 py-4 text-lg rounded-xl";

  return (
    <a
      href={`${href}${utmSuffix}`}
      onClick={() => trackLead()}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer ${base} ${sizeClass} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function SectionWrapper({
  children,
  bg = "primary",
  className = "",
  id,
  gradient,
}: {
  children: React.ReactNode;
  bg?: "primary" | "secondary";
  className?: string;
  id?: string;
  gradient?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-24 md:py-32 px-6 md:px-8 ${
        bg === "secondary" ? "bg-[#111111]" : "bg-[#0A0A0A]"
      } ${className}`}
    >
      {gradient && (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,71,217,0.15),rgba(59,130,246,0.10))] pointer-events-none" />
      )}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="relative max-w-[1200px] mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

function CountUp({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

function Accordion({
  items,
  defaultOpen = -1,
}: {
  items: { trigger: React.ReactNode; content: React.ReactNode }[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="max-w-[800px] mx-auto">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl mb-4 overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full px-6 py-5 text-lg font-semibold text-white hover:bg-white/5 flex items-center justify-between text-left transition-colors"
          >
            {item.trigger}
            <ChevronDown
              className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const tools = [
  "Make", "N8N", "HeyGen", "Fal.ai", "Metricool", "OpenAI",
  "ElevenLabs", "Google Drive", "Apify", "ChatPDF", "Whisper", "Blotato",
];

function ToolCarousel() {
  return (
    <div className="overflow-hidden mt-16 w-full">
      <div className="flex animate-scroll-left w-max">
        {[...tools, ...tools].map((tool, i) => (
          <div
            key={i}
            className="flex-shrink-0 bg-white rounded-xl px-6 py-3 mx-2 flex items-center justify-center"
          >
            <span className="text-black font-semibold text-sm whitespace-nowrap">
              {tool}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [navBlur, setNavBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavBlur(window.scrollY > 50);
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowMobileCta(heroBottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-8 transition-all duration-300 ${
          navBlur ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <span className="text-white font-bold text-lg">Maestros da IA</span>
        <CtaButton href="https://chat.maestrosdaia.com" variant="outline" className="!px-6 !py-2 !text-sm !rounded-lg border-[#F5A623]/40 text-[#F5A623]">
          Começar Agora
        </CtaButton>
      </header>

      {/* SECTION 1: HERO */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 md:pt-40 pb-16 bg-[#0A0A0A] overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute w-[600px] h-[600px] rounded-full bg-green-500/15 blur-[120px]"
            style={{ top: "10%", left: "20%", animation: "aurora1 30s ease-in-out infinite" }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[100px]"
            style={{ top: "40%", right: "15%", animation: "aurora2 25s ease-in-out infinite" }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-[#F5A623]/5 blur-[80px]"
            style={{ bottom: "10%", left: "40%", animation: "aurora1 20s ease-in-out infinite reverse" }}
          />
        </div>

        <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center text-center max-w-[900px] mx-auto">
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Módulo Exclusivo | +500 Alunos Transformados
          </motion.div>

          <motion.p variants={fadeIn} className="text-[#F5A623] text-base md:text-xl font-medium tracking-wide mb-6">
            Você ainda perde 20+ horas por semana criando conteúdo manualmente?
          </motion.p>

          <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl lg:text-[64px] font-extrabold leading-[1.1] text-white tracking-tight">
            Crie 30 Dias de Conteúdo em{" "}
            <span className="text-[#F5A623]">2 Horas</span> — Com IA Fazendo{" "}
            <span className="text-[#F5A623]">95% do Trabalho</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 max-w-[700px] mt-6 leading-relaxed">
            O sistema exato que nos levou de 0 a 20 mil seguidores em 30 dias no TikTok e 10 mil no Instagram — sem gastar um centavo em tráfego pago, sem equipe, sem aparecer na câmera se você não quiser.
          </motion.p>

          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              "200% de crescimento por semana",
              "Menos de 2h/semana",
              "Zero programação",
              "Sem câmera obrigatória",
            ].map((badge) => (
              <motion.span
                key={badge}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 text-white/90 text-sm px-4 py-2 rounded-full"
              >
                ✅ {badge}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
            <CtaButton href="https://chat.maestrosdaia.com" className="w-full sm:w-auto">
              QUERO AUTOMATIZAR MEU CONTEÚDO AGORA
            </CtaButton>
            <CtaButton href="https://wa.me/5511995631610" variant="outline" className="w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </CtaButton>
          </motion.div>

          <motion.p variants={fadeIn} className="text-sm text-white/45 text-center mt-3">
            Acesso imediato. Sem risco. Garantia incondicional.
          </motion.p>
        </motion.div>

        <ToolCarousel />

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-8 mb-8"
        >
          <ChevronDown className="w-6 h-6 text-[#F5A623]" />
        </motion.div>
      </section>

      {/* SECTION 2: PAIN AMPLIFICATION */}
      <SectionWrapper bg="secondary" id="pain">
        <motion.div variants={fadeIn} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full px-4 py-2 text-sm font-medium">
            <AlertTriangle className="w-4 h-4" />
            Atenção
          </span>
        </motion.div>

        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center max-w-[800px] mx-auto">
          A Verdade Que Ninguém Te Conta Sobre Criar Conteúdo em 2026
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-xl text-white/70 text-center mt-6 mb-10">
          Você reconhece algum desses sintomas?
        </motion.p>

        <motion.div variants={stagger} className="max-w-[700px] mx-auto">
          {[
            { bold: "O algoritmo te engole", desc: "Posta todo dia mas os números não saem do lugar" },
            { bold: "Sem ideias", desc: "Fica olhando a tela em branco sem saber o que postar" },
            { bold: "Tempo zero", desc: "Entre clientes, operação e vida pessoal, sobram 0 horas para conteúdo" },
            { bold: "Equipe cara", desc: "Social media R$3K/mês, videomaker R$4K, copywriter R$2.5K... Isso se encontrar bons" },
            { bold: "Resultados medíocres", desc: "Posta, posta, posta... e os views morrem em 200" },
            { bold: "Concorrentes viralizando", desc: "Enquanto você luta por um like, seus concorrentes estão em todos os lugares" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInLeft}
              className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-4 md:p-5 mb-3"
            >
              <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-white/70">
                <span className="font-semibold text-white">{item.bold}</span> — {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 text-center max-w-[700px] mx-auto mt-12">
          Se você se identificou com pelo menos 2 desses pontos, a culpa{" "}
          <span className="font-bold text-white">não é sua</span>. O jogo mudou. E quem não entendeu isso ainda está jogando com as regras de 2023.
        </motion.p>

        <motion.div variants={scaleIn} className="bg-gradient-to-r from-[#F5A623]/10 to-transparent border border-[#F5A623]/20 rounded-2xl p-8 md:p-10 max-w-[700px] mx-auto mt-10 text-center">
          <div className="text-5xl md:text-7xl font-extrabold text-[#F5A623]">
            <CountUp end={47} suffix="x" />
          </div>
          <p className="text-white/70 text-lg mt-4">
            Em 2026, criadores que usam IA para conteúdo produzem <span className="font-bold text-white">47x mais</span> do que quem faz manual. Não é exagero. É matemática: enquanto você grava 1 vídeo, o sistema que vou te mostrar pesquisa, roteiriza, grava com avatar, edita e posta automaticamente — tudo sem você tocar no celular.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* SECTION 3: SOLUTION — 4 PILLARS */}
      <SectionWrapper bg="primary" gradient id="solution">
        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          Apresentamos: O{" "}
          <span className="text-[#F5A623]">Sistema Completo</span> de Criação de Conteúdo com IA
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 text-center max-w-[600px] mx-auto mt-4">
          <span className="font-bold text-white">14</span> aulas práticas.{" "}
          <span className="font-bold text-white">4</span> pilares.{" "}
          <span className="font-bold text-white">1</span> resultado: seu conteúdo no piloto automático.
        </motion.p>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mt-12">
          {[
            {
              emoji: "🌍",
              title: "Inteligência Global",
              desc: "Nosso agente de IA monitora os 100+ melhores criadores do seu nicho em 10+ países (Japão, Alemanha, EUA, Índia...) e identifica o que está viralizando ANTES de chegar ao Brasil. Você nunca mais precisa 'ter ideias' — a IA traz os dados.",
            },
            {
              emoji: "🔬",
              title: "Engenharia Reversa",
              desc: "A IA filtra apenas os vídeos com 50K+ views, 1K+ comentários ou 10K+ likes. Depois transcreve, analisa hooks, formatos e temas — e te entrega um relatório completo do que funciona. É como ter um time de pesquisa de R$15K/mês trabalhando de graça.",
            },
            {
              emoji: "🎬",
              title: "Produção em Escala",
              desc: "Com um clique, o agente roteirista cria roteiros prontos para gravação usando a estrutura de 10 linhas dos vídeos virais. Não quer aparecer? Sem problema — use avatares de IA que falam com sua voz, seus gestos, sua cara. Ou não. Funciona dos dois jeitos.",
            },
            {
              emoji: "🚀",
              title: "Distribuição Automatizada",
              desc: "O vídeo editado vai direto do Google Drive para Instagram, TikTok, YouTube e todas as plataformas — com título otimizado por IA, descrição SEO e agendamento automático. Você dorme, o sistema posta.",
            },
          ].map((pillar, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4, borderColor: "rgba(245,166,35,0.3)" }}
              className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-[#F5A623]/10 flex items-center justify-center text-4xl">
                {pillar.emoji}
              </div>
              <h3 className="text-xl font-bold text-white mt-4">{pillar.title}</h3>
              <p className="text-white/70 text-base mt-3 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeIn} className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 max-w-[900px] mx-auto mt-12 text-center">
          <p className="text-white/70 text-lg leading-relaxed">
            Juntos, esses 4 pilares eliminam os 3 maiores custos de criação de conteúdo:{" "}
            <span className="font-bold text-white">tempo</span> (de 20h para 2h/semana),{" "}
            <span className="font-bold text-white">dinheiro</span> (de R$9.5K/mês em equipe para R$0) e{" "}
            <span className="font-bold text-white">energia mental</span> (de &quot;o que eu posto hoje?&quot; para piloto automático).
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-6">
            {["⏱ 20h → 2h/semana", "💰 R$9.5K → R$0", "🧠 Piloto automático"].map((stat) => (
              <span key={stat} className="bg-[#F5A623]/10 text-[#F5A623] px-4 py-2 rounded-full text-sm font-medium">
                {stat}
              </span>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* SECTION 4: CURRICULUM */}
      <SectionWrapper bg="secondary" id="curriculum">
        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          Exatamente O Que Você Vai Aprender{" "}
          <span className="text-[#F5A623]">(e Implementar)</span>
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 text-center max-w-[600px] mx-auto mt-4">
          Não são aulas teóricas. Cada aula termina com uma{" "}
          <span className="font-semibold text-white">automação funcionando</span>.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-12">
          <Accordion
            defaultOpen={0}
            items={[
              {
                trigger: (
                  <div className="flex items-center flex-1 min-w-0">
                    <span className="bg-[#F5A623]/15 text-[#F5A623] text-xs font-bold px-2 py-1 rounded-md mr-3 flex-shrink-0">M1</span>
                    <span className="truncate">Automação de Redes Sociais</span>
                    <span className="text-white/45 text-sm ml-auto pl-3 flex-shrink-0">4 aulas</span>
                  </div>
                ),
                content: (
                  <div>
                    {[
                      { title: "Automatize Postagens nas Redes Sociais", time: "30 min", desc: "Monte uma automação no Make que pega vídeos do Google Drive, transcreve com Whisper, gera títulos e descrições com IA, e posta automaticamente no Instagram, YouTube e TikTok. Resultado: crescimento de 200% por semana comprovado.", tools: "Make, Google Drive, CloudConvert, OpenAI Whisper, Metricool" },
                      { title: "O Algoritmo Trabalhando Por Você", time: "35 min", desc: "Crie um agente espião que monitora 100+ contas de concorrentes internacionais, filtra os posts virais (50K+ views), transcreve os roteiros e salva tudo numa planilha. Você terá uma mina de ouro de ideias validadas.", tools: "Make, Apify, Google Sheets, OpenAI Whisper" },
                      { title: "Geração de Vídeos com IA", time: "14 min", desc: "Gere vídeos com IA usando Fal.ai (modelo Wan 2.5) direto no N8N. De uma imagem + prompt, saia com um vídeo pronto com sincronização labial.", tools: "N8N, Fal.ai" },
                      { title: "Crescimento Orgânico: A Metodologia", time: "17 min", desc: "A estratégia exata de 4 pilares que nos levou a 20K no TikTok e 10K no Instagram em 30 dias, com zero tráfego pago. Aula conceitual que conecta todas as automações.", tools: "" },
                    ].map((lesson, i) => (
                      <div key={i} className="border-t border-white/5 px-6 py-4">
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-white">Aula {i + 1} — {lesson.title}</p>
                          <span className="text-white/45 text-xs ml-2 flex-shrink-0">{lesson.time}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-1 leading-relaxed">{lesson.desc}</p>
                        {lesson.tools && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {lesson.tools.split(", ").map((t) => (
                              <span key={t} className="bg-white/5 text-white/70 text-xs px-2 py-1 rounded-md">🛠 {t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                trigger: (
                  <div className="flex items-center flex-1 min-w-0">
                    <span className="bg-[#F5A623]/15 text-[#F5A623] text-xs font-bold px-2 py-1 rounded-md mr-3 flex-shrink-0">M2</span>
                    <span className="truncate">Copywriting & Roteiros com IA</span>
                    <span className="text-white/45 text-sm ml-auto pl-3 flex-shrink-0">2 aulas</span>
                  </div>
                ),
                content: (
                  <div>
                    {[
                      { num: 5, title: "Agente Copywriter com RAG", time: "31 min", desc: "Construa um agente que consulta livros do Hormozi, Brunson e outros mestres de marketing via RAG (ChatPDF), e gera uma landing page completa: headlines, benefícios, prova social, FAQ, CTAs, código HTML responsivo — tudo baseado na sabedoria dos maiores copywriters do mundo.", tools: "Make, ChatPDF, OpenRouter (Claude), Google Docs, WhatsApp" },
                      { num: 6, title: "Agente Roteirista", time: "14 min", desc: "Transforme sua base de vídeos virais em roteiros prontos para gravação. Estrutura de 10 linhas: hook → desenvolvimento → plot twist → resolução → punchline. Personalizado com SEU estilo de falar.", tools: "Make, Google Sheets, OpenRouter" },
                    ].map((lesson) => (
                      <div key={lesson.num} className="border-t border-white/5 px-6 py-4">
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-white">Aula {lesson.num} — {lesson.title}</p>
                          <span className="text-white/45 text-xs ml-2 flex-shrink-0">{lesson.time}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-1 leading-relaxed">{lesson.desc}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {lesson.tools.split(", ").map((t) => (
                            <span key={t} className="bg-white/5 text-white/70 text-xs px-2 py-1 rounded-md">🛠 {t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                trigger: (
                  <div className="flex items-center flex-1 min-w-0">
                    <span className="bg-[#F5A623]/15 text-[#F5A623] text-xs font-bold px-2 py-1 rounded-md mr-3 flex-shrink-0">M3</span>
                    <span className="truncate">Avatares & Clones de IA</span>
                    <span className="text-white/45 text-sm ml-auto pl-3 flex-shrink-0">3 aulas</span>
                  </div>
                ),
                content: (
                  <div>
                    {[
                      { num: 7, title: "Avatares de IA", time: "17 min", desc: "Panorama completo do HeyGen: crie avatares a partir de vídeos ou fotos, clone sua voz, integre com ElevenLabs. Descubra como CEOs estão escalando produção de conteúdo sem gastar 1 minuto na câmera.", tools: "HeyGen, ElevenLabs" },
                      { num: 8, title: "Seu Primeiro Clone de IA", time: "6 min", desc: "Tutorial passo a passo: grave 2 minutos, suba no HeyGen, e tenha seu avatar de IA falando qualquer texto que você digitar. Setup completo em 10 minutos.", tools: "HeyGen" },
                      { num: 9, title: "Conteúdo 100% Automatizado com Avatares", time: "24 min", desc: "O sistema COMPLETO: pesquisa → roteiro → avatar gera vídeo → postagem automática. Tudo conectado via Make + HeyGen + Google Drive. Produção de conteúdo no piloto automático total.", tools: "Make, HeyGen, Google Sheets, Google Drive, ElevenLabs" },
                    ].map((lesson) => (
                      <div key={lesson.num} className="border-t border-white/5 px-6 py-4">
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-white">Aula {lesson.num} — {lesson.title}</p>
                          <span className="text-white/45 text-xs ml-2 flex-shrink-0">{lesson.time}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-1 leading-relaxed">{lesson.desc}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {lesson.tools.split(", ").map((t) => (
                            <span key={t} className="bg-white/5 text-white/70 text-xs px-2 py-1 rounded-md">🛠 {t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                trigger: (
                  <div className="flex items-center flex-1 min-w-0">
                    <span className="bg-[#F5A623]/15 text-[#F5A623] text-xs font-bold px-2 py-1 rounded-md mr-3 flex-shrink-0">M4</span>
                    <span className="truncate">Carrosséis & Anúncios</span>
                    <span className="text-white/45 text-sm ml-auto pl-3 flex-shrink-0">5 aulas</span>
                  </div>
                ),
                content: (
                  <div>
                    {[
                      { num: 10, title: "Blotato vs Metricool", time: "8 min", desc: "Comparação estratégica das duas melhores plataformas de postagem automática. Aprenda a usar as duas com fallback automático — seu conteúdo posta \"sim ou sim\".", tools: "Metricool, Blotato" },
                      { num: 11, title: "Posts Automáticos com Metricool", time: "22 min", desc: "Publique carrosséis automaticamente: Google Drive → análise de capa com Vision da OpenAI → caption gerada por IA → postagem agendada no Instagram.", tools: "Make, Google Drive, OpenAI Vision, Metricool" },
                      { num: 12, title: "Carrosséis com IA", time: "30 min", desc: "Gere carrosséis de 5 slides com IA (Imagen 4 Ultra do Google via Fal.ai) direto no N8N. Cada slide com texto em português, design profissional, salvos no Google Drive.", tools: "N8N, Fal.ai (Imagen 4 Ultra), Google Drive" },
                      { num: 13, title: "Carrosséis que Auto-Publicam", time: "19 min", desc: "Da geração à publicação sem tocar em nada: IA cria os slides → gera caption → posta no Instagram via Blotato. Carrosséis publicados com sucesso demonstrados na aula.", tools: "N8N, Fal.ai, Blotato" },
                      { num: 14, title: "Anúncios Estáticos para Vendas", time: "8 min", desc: "Espie os anúncios dos seus concorrentes na Facebook Ads Library, transcreva e traduza com IA (Vision), e use como inspiração para seus criativos. Análise automática de imagens e vídeos.", tools: "N8N, Facebook Ads Library, OpenAI Vision" },
                    ].map((lesson) => (
                      <div key={lesson.num} className="border-t border-white/5 px-6 py-4">
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-white">Aula {lesson.num} — {lesson.title}</p>
                          <span className="text-white/45 text-xs ml-2 flex-shrink-0">{lesson.time}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-1 leading-relaxed">{lesson.desc}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {lesson.tools.split(", ").map((t) => (
                            <span key={t} className="bg-white/5 text-white/70 text-xs px-2 py-1 rounded-md">🛠 {t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </motion.div>

        <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-3 mt-12">
          {["14 Aulas", "4+ Horas", "Automações Prontas", "1 Ano de Acesso"].map((stat) => (
            <span key={stat} className="bg-white/5 border border-white/10 text-white text-sm px-4 py-2 rounded-full">
              {stat}
            </span>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* SECTION 5: SOCIAL PROOF */}
      <SectionWrapper bg="primary" gradient id="proof">
        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          Resultados <span className="text-[#F5A623]">Reais</span> de Quem Já Implementou
        </motion.h2>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto mt-12">
          {[
            { num: 20, suffix: "K", label: "seguidores", desc: "no TikTok + Instagram em 30 dias" },
            { num: 2, suffix: "h", label: "por semana", desc: "(antes eram 20+ horas)" },
            { num: 200, suffix: "%", label: "crescimento", desc: "por semana comprovado" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-[#F5A623]">
                <CountUp end={stat.num} suffix={stat.suffix} />
              </div>
              <p className="text-lg font-semibold text-white mt-2">{stat.label}</p>
              <p className="text-sm text-white/70 mt-1">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={stagger} className="mt-16">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:gap-4 max-w-[900px] mx-auto">
            {[
              { name: "Bruno", quote: "Processo de uma semana, hoje em 4-6 horas com automação" },
              { name: "André", quote: "Pouco tempo de curso, já vendi projetos com ticket médio considerável" },
              { name: "Alice", quote: "Muito mais do que esperava. IA como aliada estratégica" },
              { name: "Ricardo", quote: "Metade do que achava impossível, hoje faço em casa e no trabalho" },
              { name: "Rodrigo Eve", quote: "Se eu consegui, você vai conseguir também" },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="snap-center min-w-[280px] md:min-w-0 bg-[#1A1A1A] border border-white/5 rounded-2xl p-6 relative flex-shrink-0"
              >
                <span className="absolute top-4 right-4 text-[#F5A623] text-4xl opacity-30 leading-none">&quot;</span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#F5A623]/20 text-[#F5A623] flex items-center justify-center font-bold text-lg">
                    {t.name[0]}
                  </div>
                  <span className="font-semibold text-white">{t.name}</span>
                </div>
                <p className="text-white/70 text-sm mt-3 italic leading-relaxed">&quot;{t.quote}&quot;</p>
                <div className="flex gap-0.5 mt-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-[#F5A623] fill-[#F5A623]" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* SECTION 6: VALUE STACK */}
      <SectionWrapper bg="secondary" id="value">
        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          Quanto Custaria Montar Tudo Isso <span className="text-[#F5A623]">Sozinho</span>?
        </motion.h2>

        <motion.div variants={stagger} className="max-w-[700px] mx-auto mt-12">
          {[
            { item: "14 aulas práticas com automações prontas", price: "R$4.000" },
            { item: "Agente espião de concorrentes (pesquisa 100+ contas)", price: "R$3.000/mês" },
            { item: "Agente roteirista com IA (roteiros ilimitados)", price: "R$2.500/mês" },
            { item: "Sistema de avatar/clone de IA configurado", price: "R$2.000" },
            { item: "Automação de carrosséis com geração por IA", price: "R$1.500/mês" },
            { item: "Postagem automática multi-plataforma", price: "R$1.200/mês" },
            { item: "Agente copywriter com RAG (livros de marketing)", price: "R$3.500/mês" },
            { item: "Templates de automação copy-paste-activate", price: "R$2.000" },
          ].map((row, i) => (
            <motion.div
              key={i}
              variants={fadeInRight}
              className={`flex justify-between items-center py-4 px-6 border-b border-white/5 ${
                i % 2 === 0 ? "bg-white/[0.02]" : ""
              }`}
            >
              <span className="text-white font-medium flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm md:text-base">{row.item}</span>
              </span>
              <span className="text-white/70 font-semibold tabular-nums whitespace-nowrap ml-4 text-sm md:text-base">{row.price}</span>
            </motion.div>
          ))}

          <motion.div
            variants={scaleIn}
            className="bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-xl mt-4 py-5 px-6 flex justify-between items-center"
          >
            <span className="font-bold text-white text-base md:text-lg">VALOR TOTAL ANUAL</span>
            <span className="font-extrabold text-[#F5A623] text-xl md:text-2xl">R$142.400</span>
          </motion.div>
        </motion.div>

        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-center text-white/70 max-w-[600px] mx-auto mt-12 leading-relaxed">
          Você não vai pagar <span className="line-through text-white/45">R$142K</span>. Nem{" "}
          <span className="line-through text-white/45">R$50K</span>. Nem{" "}
          <span className="line-through text-white/45">R$10K</span>.{" "}
          <span className="font-bold text-white">Este módulo completo está incluído na Formação Maestros da IA.</span>
        </motion.p>
      </SectionWrapper>

      {/* SECTION 7: OFFER & PRICING */}
      <SectionWrapper bg="primary" gradient id="pricing" className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(245,166,35,0.03)_50%,rgba(0,0,0,0)_100%)] pointer-events-none" />

        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center relative">
          Acesse o Módulo Completo Dentro da{" "}
          <span className="text-[#F5A623]">Formação Maestros da IA</span>
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 text-center max-w-[600px] mx-auto mt-4 relative">
          14 aulas de criação de conteúdo com IA + TUDO que a formação oferece:
        </motion.p>

        <motion.div variants={stagger} className="max-w-[600px] mx-auto mt-8 relative">
          {[
            "Este módulo completo (14 aulas, 4+ horas)",
            "+ 9 outros módulos (75 implementações progressivas)",
            "11+ agentes autônomos de IA prontos",
            "Arsenal IA: 100+ ferramentas, prompts e códigos testados",
            "Arquivos Confidenciais (números reais do sistema de R$2.5M)",
            "Templates copy-paste-activate",
            "12 mentorias ao vivo com os fundadores (tier R$3K)",
            "Comunidade exclusiva de networking",
            "1 ano de acesso + atualizações mensais",
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInLeft} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-white/70">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mt-12 relative">
          <motion.div variants={fadeInUp} className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <span className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full">FORMAÇÃO COMPLETA</span>
            <p className="text-sm font-bold text-white/70 tracking-widest mt-4">TUDO INCLUSO</p>
            <p className="text-white/45 line-through text-lg mt-4">R$7.000</p>
            <p className="text-4xl font-extrabold text-white mt-1">R$3.000 <span className="text-lg font-normal text-white/70">à vista</span></p>
            <p className="text-white/70 text-sm mt-1">ou 12x R$323,38</p>
            <CtaButton href="https://chat.maestrosdaia.com" className="w-full mt-6 !justify-center">
              QUERO COMEÇAR AGORA
            </CtaButton>
            <ul className="mt-6 space-y-2">
              {["12 mentorias ao vivo", "Comunidade exclusiva", "Garantia 7 dias", "10 módulos completos"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border-2 border-[#F5A623]/50 rounded-2xl p-8 relative order-first md:order-last animate-pulse-glow">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F5A623] text-black text-xs font-bold px-4 py-1.5 rounded-full">
              MAIS POPULAR
            </span>
            <span className="bg-[#F5A623]/10 text-[#F5A623] text-xs font-bold px-3 py-1 rounded-full">COMECE PELO ESSENCIAL</span>
            <p className="text-sm font-bold text-white/70 tracking-widest mt-4">ACESSO FUNDAMENTAL</p>
            <p className="text-white/45 line-through text-lg mt-4">R$30.000</p>
            <p className="text-4xl font-extrabold text-[#F5A623] mt-1">R$997 <span className="text-lg font-normal text-white/70">à vista</span></p>
            <p className="text-white/70 text-sm mt-1">ou 12x R$97</p>
            <CtaButton href="https://chat.maestrosdaia.com" className="w-full mt-6 !justify-center">
              GARANTIR MINHA VAGA
            </CtaButton>
            <ul className="mt-6 space-y-2">
              {["Acesso ao módulo completo", "Garantia 90 dias de execução", "Templates prontos", "1 ano de acesso"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeIn} className="text-center mt-8 relative">
          <CtaButton href="https://chat.maestrosdaia.com" variant="ghost" className="mx-auto">
            <MessageCircle className="w-5 h-5" />
            Não sabe qual plano é pra você? Fale com nosso assistente →
          </CtaButton>
        </motion.div>
      </SectionWrapper>

      {/* SECTION 8: GUARANTEE */}
      <SectionWrapper bg="secondary" id="guarantee">
        <motion.div variants={scaleIn} className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
            <ShieldCheck className="w-16 h-16 text-[#F5A623]" />
          </div>
        </motion.div>

        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white text-center mt-6">
          O Risco É <span className="text-[#F5A623]">100% Nosso</span>
        </motion.h2>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mt-10">
          <motion.div variants={fadeInUp} className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[#F5A623]/15 rounded-2xl p-8 order-last md:order-first">
            <div className="flex items-center gap-2 text-white/45 text-sm font-medium">🛡️ Tier R$3K</div>
            <h3 className="text-xl font-bold text-white mt-3">
              Garantia <span className="text-[#F5A623]">7 Dias</span>
            </h3>
            <p className="text-white/70 text-base mt-4 leading-relaxed">
              Acesse TUDO. Se em 7 dias você não sentir que isso vale pelo menos 10x o investimento, devolvemos{" "}
              <span className="font-semibold text-[#F5A623]">100% do seu dinheiro</span>. Sem perguntas. Sem burocracia.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[#F5A623]/15 rounded-2xl p-8">
            <div className="flex items-center gap-2 text-white/45 text-sm font-medium">🛡️ Tier R$997</div>
            <h3 className="text-xl font-bold text-white mt-3">
              Garantia <span className="text-[#F5A623]">90 Dias</span> de Execução
            </h3>
            <p className="text-white/70 text-base mt-4 leading-relaxed">
              Assista às aulas, implemente as automações, rode o sistema. Se em 90 dias você não triplicar o valor investido, devolvemos{" "}
              <span className="font-semibold text-[#F5A623]">100% dos seus R$997</span> +{" "}
              <span className="font-semibold text-[#F5A623]">1 hora de consultoria gratuita</span> para consertar seu funil. Nós assumimos o risco.
            </p>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SECTION 9: FOUNDERS */}
      <SectionWrapper bg="primary" id="founders">
        <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          Quem São os <span className="text-[#F5A623]">Maestros</span> Por Trás do Sistema
        </motion.h2>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto mt-12">
          <motion.div variants={fadeInUp} className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F5A623]/30 to-[#F5A623]/10 mx-auto flex items-center justify-center">
              <span className="text-2xl font-bold text-[#F5A623]">AE</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-4">Arthur Endo</h3>
            <p className="text-[#F5A623] text-sm font-medium">Co-Fundador</p>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Músico premiado com turnês internacionais. Doutor Honoris Causa. Zero background em programação. Transformou um simples curso de violão em R$2.5 milhões em 15 meses usando agentes de IA.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F5A623]/30 to-[#F5A623]/10 mx-auto flex items-center justify-center">
              <span className="text-2xl font-bold text-[#F5A623]">LZ</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-4">Lyria Zoccal</h3>
            <p className="text-[#F5A623] text-sm font-medium">Co-Fundadora</p>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Administradora com experiência em grandes empresas de tech (SAP). Especialista em IA aplicada a processos corporativos e ERP. Consultora Enterprise.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-[#1A1A1A] border-l-4 border-[#F5A623] rounded-r-2xl p-8 max-w-[800px] mx-auto mt-12 relative"
        >
          <span className="absolute -top-2 left-4 text-[#F5A623] text-6xl opacity-20 leading-none">&quot;</span>
          <p className="text-white/70 text-base leading-relaxed italic">
            Nenhum dos dois sabia programar. Gastaram{" "}
            <span className="font-semibold text-white not-italic">R$8K em consultoria de IA</span> e receberam um PDF genérico. Gastaram{" "}
            <span className="font-semibold text-white not-italic">R$12K em ferramentas</span> e nunca integraram. Contrataram um{" "}
            <span className="font-semibold text-white not-italic">dev freelancer</span> e o chatbot respondeu &quot;Não entendi&quot; 70% das vezes. Até que descobriram: você não precisa PROGRAMAR IA — precisa{" "}
            <span className="text-[#F5A623] font-bold not-italic">ORQUESTRAR IA</span>. Como um maestro rege uma orquestra.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* SECTION 10: FAQ */}
      <SectionWrapper bg="secondary" id="faq">
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white text-center">
          Perguntas Frequentes
        </motion.h2>

        <motion.div variants={fadeInUp} className="mt-12">
          <Accordion
            items={[
              {
                trigger: <span>Preciso saber programar?</span>,
                content: (
                  <div className="px-6 pb-5 text-white/70 leading-relaxed">
                    Zero. Todas as automações são montadas com ferramentas visuais (Make, N8N) com nossos templates prontos. Se você sabe arrastar e soltar, sabe usar.
                  </div>
                ),
              },
              {
                trigger: <span>Funciona para qualquer nicho?</span>,
                content: (
                  <div className="px-6 pb-5 text-white/70 leading-relaxed">
                    Sim. O sistema de pesquisa busca concorrentes do SEU nicho em 10+ países. Já usamos para fitness, educação, tech, saúde, gastronomia e mais.
                  </div>
                ),
              },
              {
                trigger: <span>E se eu não quiser aparecer na câmera?</span>,
                content: (
                  <div className="px-6 pb-5 text-white/70 leading-relaxed">
                    Perfeito. O módulo 3 ensina a criar avatares de IA que falam com sua voz e aparência — ou usar avatares genéricos. Você nunca precisa gravar se não quiser.
                  </div>
                ),
              },
              {
                trigger: <span>As ferramentas são pagas?</span>,
                content: (
                  <div className="px-6 pb-5 text-white/70 leading-relaxed">
                    Algumas sim (Make, HeyGen, Metricool), mas mostramos as opções mais baratas e alternativas gratuitas quando existem. O investimento em ferramentas gira em torno de R$100-200/mês.
                  </div>
                ),
              },
              {
                trigger: <span>Em quanto tempo vejo resultados?</span>,
                content: (
                  <div className="px-6 pb-5 text-white/70 leading-relaxed">
                    A primeira automação (postagem automática) pode estar rodando no mesmo dia. Nosso resultado comprovado: 20K seguidores em 30 dias com o sistema completo.
                  </div>
                ),
              },
              {
                trigger: <span>Posso acessar depois dos 7/90 dias?</span>,
                content: (
                  <div className="px-6 pb-5 text-white/70 leading-relaxed">
                    Sim, você tem 1 ano de acesso completo a todo o conteúdo, com atualizações mensais inclusas.
                  </div>
                ),
              },
            ]}
          />
        </motion.div>
      </SectionWrapper>

      {/* SECTION 11: FINAL CTA */}
      <section
        id="final-cta"
        className="relative py-24 md:py-32 px-6 bg-[#0A0A0A] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0A0A0A_0%,rgba(245,166,35,0.05)_50%,#0A0A0A_100%)] pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative max-w-[700px] mx-auto text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white">
            Seus Concorrentes Já Estão Automatizando.{" "}
            <span className="text-[#F5A623]">E Você?</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 mt-6 max-w-[600px] mx-auto">
            Cada dia sem esse sistema é mais um dia perdendo para quem já usa IA para criar conteúdo{" "}
            <span className="font-bold text-white">47x mais rápido</span>.
          </motion.p>

          <motion.div variants={fadeIn} className="bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-xl px-6 py-4 max-w-[500px] mx-auto mt-8">
            <p className="text-[#F5A623] font-medium text-sm">
              ⚠️ Vagas com preço de lançamento limitadas. O valor sobe ao atingir 60 membros fundadores.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8">
            <CtaButton href="https://chat.maestrosdaia.com" size="lg" className="w-full sm:w-auto !shadow-[0_0_40px_rgba(245,166,35,0.3)]">
              GARANTIR MINHA VAGA AGORA
            </CtaButton>
          </motion.div>

          <motion.p variants={fadeIn} className="text-sm text-white/45 mt-4">
            Pagamento seguro | Garantia de reembolso | Acesso imediato
          </motion.p>

          <motion.div variants={fadeIn} className="flex justify-center gap-6 mt-6">
            <span className="flex items-center gap-1.5 text-white/45 text-xs">
              <Lock className="w-4 h-4" /> Seguro
            </span>
            <span className="flex items-center gap-1.5 text-white/45 text-xs">
              <CheckCircle2 className="w-4 h-4" /> Garantia
            </span>
            <span className="flex items-center gap-1.5 text-white/45 text-xs">
              <Zap className="w-4 h-4" /> Imediato
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 12: FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-lg font-bold text-white">Maestros da IA</span>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/maestrosdaia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://tiktok.com/@maestrosdaia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.3 8.3 0 005.58 2.15V11.7a4.85 4.85 0 01-2.28-.59l-.01-.01.01.01V6.69h2.28z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <a href="#" className="text-sm text-white/45 hover:text-white underline-offset-4 hover:underline">Termos de Uso</a>
            <span className="text-white/20">|</span>
            <a href="#" className="text-sm text-white/45 hover:text-white underline-offset-4 hover:underline">Política de Privacidade</a>
          </div>

          <p className="text-xs text-white/45 text-center mt-4">
            © 2026 Maestria Academy Ltda / Lyra Arte LTDA
          </p>

          <a
            href="https://wa.me/5511995631610"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-white/45 hover:text-[#F5A623] mt-4 transition-colors"
          >
            <Phone className="w-4 h-4" />
            WhatsApp: +55 11 99563-1610
          </a>

          <div className="pb-8" />
        </div>
      </footer>

      {/* STICKY MOBILE CTA BAR */}
      <AnimatePresence>
        {showMobileCta && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10 px-4 py-3 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white font-semibold">A partir de 12x R$97</span>
              <a
                href="https://chat.maestrosdaia.com"
                onClick={() => trackLead()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F5A623] hover:bg-[#FFB84D] text-black text-sm px-6 py-2.5 rounded-lg font-bold transition-colors"
              >
                Começar Agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
