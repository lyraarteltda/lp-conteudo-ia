"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
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
  Globe,
  FlaskConical,
  Video,
  Rocket,
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";
import { trackLead, getUtmParams } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

/* ─── Color tokens (semantic, NOT white/70) ─── */
const c = {
  heading: "#F0F6FC",
  body: "#B8C4D4",
  caption: "#7D8CA1",
  muted: "#4A5568",
  gold: "#F5A623",
  goldLight: "#FFD666",
  surface0: "#09090B",
  surface1: "#0D1117",
  surface2: "#161B22",
  surface3: "#1C2333",
  surface4: "#242C3D",
};

/* ─── CTA Button with shimmer ─── */
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
      ? "relative overflow-hidden bg-gradient-to-r from-[#F5A623] to-[#E8951A] hover:from-[#FFB84D] hover:to-[#F5A623] text-black font-bold shadow-[0_0_30px_rgba(245,166,35,0.2)] hover:shadow-[0_0_50px_rgba(245,166,35,0.35)]"
      : variant === "outline"
      ? "border border-[#7D8CA1]/30 text-[#B8C4D4] hover:border-[#F5A623]/50 hover:text-[#F0F6FC] hover:bg-white/[0.03]"
      : "text-[#F5A623] hover:text-[#FFD666] hover:bg-[#F5A623]/5";

  const sizeClass =
    size === "lg"
      ? "px-12 py-5 text-lg font-extrabold rounded-xl gap-3"
      : "px-8 py-3.5 text-base rounded-xl gap-2";

  return (
    <motion.a
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      href={`${href}${utmSuffix}`}
      onClick={() => trackLead()}
      className={`inline-flex items-center justify-center cursor-pointer transition-all duration-300 ${base} ${sizeClass} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

/* ─── Section divider ─── */
function SectionDivider() {
  return (
    <div className="relative h-px">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5A623]/15 to-transparent blur-sm" />
    </div>
  );
}

/* ─── Tool carousel ─── */
const tools = [
  "Make", "N8N", "HeyGen", "Fal.ai", "Metricool", "OpenAI",
  "ElevenLabs", "Google Drive", "Apify", "ChatPDF", "Whisper", "Blotato",
];

function ToolCarousel() {
  return (
    <div className="overflow-hidden mt-20 w-full">
      <div className="flex animate-scroll-left w-max">
        {[...tools, ...tools].map((tool, i) => (
          <div key={i} className="flex-shrink-0 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-lg px-5 py-2.5 mx-1.5">
            <span className="text-[#B8C4D4] font-medium text-sm whitespace-nowrap">{tool}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Accordion ─── */
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
          className={`bg-[${c.surface3}]/50 backdrop-blur-sm border rounded-xl mb-3 overflow-hidden transition-all duration-300 ${
            open === i ? "border-[#F5A623]/20 bg-[#1C2333]/80" : "border-white/[0.06] hover:border-white/[0.12]"
          }`}
        >
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full px-6 py-5 text-base font-semibold text-[#F0F6FC] hover:bg-white/[0.03] flex items-center justify-between text-left transition-colors"
          >
            {item.trigger}
            <ChevronDown
              className={`w-4 h-4 text-[#7D8CA1] flex-shrink-0 transition-transform duration-300 ${
                open === i ? "rotate-180 text-[#F5A623]" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
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

/* ─── Avatar gradients for testimonials ─── */
const avatarGradients = [
  "from-[#F5A623] to-[#FF6B35]",
  "from-[#6366F1] to-[#8B5CF6]",
  "from-[#10B981] to-[#34D399]",
  "from-[#EC4899] to-[#F43F5E]",
  "from-[#3B82F6] to-[#60A5FA]",
];

/* ─── Pillar icons ─── */
const pillarIcons = [Globe, FlaskConical, Video, Rocket];

/* ─── MAIN PAGE ─── */
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [dismissedMobileCta, setDismissedMobileCta] = useState(false);
  const [navBlur, setNavBlur] = useState(false);
  const { scrollYProgress } = useScroll();

  /* Lenis smooth scroll — connected to GSAP ticker + ScrollTrigger */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(lenis.raf); };
  }, []);

  /* Scroll listener for nav + mobile CTA */
  useEffect(() => {
    const handleScroll = () => {
      setNavBlur(window.scrollY > 50);
      if (heroRef.current) {
        setShowMobileCta(heroRef.current.getBoundingClientRect().bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* GSAP — only counter animations (reveal/stagger handled by Framer Motion whileInView) */
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".gsap-counter").forEach((el) => {
      const end = parseFloat(el.dataset.end || "0");
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => {
          el.textContent = (el.dataset.prefix || "") + Math.floor(obj.val).toLocaleString("pt-BR") + (el.dataset.suffix || "");
        },
      });
    });
  }, { scope: mainRef });

  return (
    <main ref={mainRef}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F5A623] to-[#FFD666] z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* NAV */}
      <header
        className={`fixed top-[2px] left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
          navBlur ? "bg-[#09090B]/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        <span className="font-display font-bold text-lg text-[#F0F6FC] tracking-tight">Maestros da IA</span>
        <CtaButton href="https://chat.maestrosdaia.com" variant="outline" className="!px-5 !py-2 !text-sm !rounded-lg">
          Começar Agora
        </CtaButton>
      </header>

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 md:pt-40 pb-12 overflow-hidden noise-bg"
        style={{ background: `linear-gradient(180deg, ${c.surface0} 0%, ${c.surface1} 100%)` }}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[700px] h-[700px] rounded-full bg-[#F5A623]/[0.06] blur-[150px]" style={{ top: "5%", left: "15%", animation: "aurora1 25s ease-in-out infinite" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/[0.04] blur-[120px]" style={{ top: "30%", right: "10%", animation: "aurora2 20s ease-in-out infinite" }} />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-500/[0.03] blur-[80px]" style={{ bottom: "20%", left: "50%", animation: "aurora1 18s ease-in-out infinite reverse" }} />
        </div>
        <div className="absolute inset-0 grid-bg pointer-events-none" />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center text-center max-w-[1000px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-[#F5A623]/[0.08] text-[#F5A623] border border-[#F5A623]/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Módulo Exclusivo | +500 Alunos Transformados
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[#F5A623] text-sm md:text-base font-medium tracking-widest uppercase mb-6">
            Você ainda perde 20+ horas por semana criando conteúdo manualmente?
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="font-display text-[clamp(2rem,5.5vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em]"
          >
            <span className="text-[#F0F6FC]">Crie 30 Dias de Conteúdo em </span>
            <span className="bg-gradient-to-r from-[#F5A623] to-[#FFD666] bg-clip-text text-transparent">2 Horas</span>
            <span className="text-[#F0F6FC]"> — Com IA Fazendo </span>
            <span className="bg-gradient-to-r from-[#F5A623] to-[#FFD666] bg-clip-text text-transparent">95% do Trabalho</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl max-w-[700px] mt-8 leading-relaxed" style={{ color: c.body }}>
            O sistema exato que nos levou de 0 a 20 mil seguidores em 30 dias no TikTok e 10 mil no Instagram — sem gastar um centavo em tráfego pago, sem equipe, sem aparecer na câmera se você não quiser.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap justify-center gap-3 mt-8">
            {["200% de crescimento por semana", "Menos de 2h/semana", "Zero programação", "Sem câmera obrigatória"].map((badge) => (
              <span key={badge} className="bg-white/[0.04] border border-white/[0.08] text-[#B8C4D4] text-sm px-4 py-2 rounded-lg">
                ✅ {badge}
              </span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
            <CtaButton href="https://chat.maestrosdaia.com" size="lg">
              QUERO AUTOMATIZAR MEU CONTEÚDO AGORA
              <ArrowRight className="w-5 h-5" />
            </CtaButton>
            <CtaButton href="https://wa.me/5511995631610" variant="outline" className="!border-white/10">
              <Phone className="w-4 h-4" />
              Falar no WhatsApp
            </CtaButton>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-sm mt-4" style={{ color: c.caption }}>
            Acesso imediato. Sem risco. Garantia incondicional.
          </motion.p>
        </motion.div>

        <ToolCarousel />

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="mt-10 mb-4">
          <ChevronDown className="w-5 h-5 text-[#7D8CA1]" />
        </motion.div>
      </section>

      {/* ═══ PAIN AMPLIFICATION ═══ */}
      <SectionDivider />
      <section id="pain" className="relative py-24 md:py-32 px-6 md:px-10 noise-bg" style={{ background: c.surface2 }}>
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
        <div className="relative max-w-[1200px] mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-red-500/[0.08] text-red-400 border border-red-500/15 rounded-full px-4 py-2 text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              Atenção
            </span>
          </div>

          <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-[-0.02em] text-center max-w-[800px] mx-auto" style={{ color: c.heading }}>
            A Verdade Que Ninguém Te Conta Sobre Criar Conteúdo em 2026
          </h2>

          <p className="text-lg text-center mt-5 mb-10" style={{ color: c.body }}>
            Você reconhece algum desses sintomas?
          </p>

          <div className="max-w-[700px] mx-auto">
            {[
              { bold: "O algoritmo te engole", desc: "Posta todo dia mas os números não saem do lugar" },
              { bold: "Sem ideias", desc: "Fica olhando a tela em branco sem saber o que postar" },
              { bold: "Tempo zero", desc: "Entre clientes, operação e vida pessoal, sobram 0 horas para conteúdo" },
              { bold: "Equipe cara", desc: "Social media R$3K/mês, videomaker R$4K, copywriter R$2.5K... Isso se encontrar bons" },
              { bold: "Resultados medíocres", desc: "Posta, posta, posta... e os views morrem em 200" },
              { bold: "Concorrentes viralizando", desc: "Enquanto você luta por um like, seus concorrentes estão em todos os lugares" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-lg p-4 mb-2.5 hover:border-red-500/15 transition-all duration-300 hover:-translate-y-0.5">
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p style={{ color: c.body }}>
                  <span className="font-semibold" style={{ color: c.heading }}>{item.bold}</span> — {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-lg text-center max-w-[700px] mx-auto mt-10 leading-relaxed" style={{ color: c.body }}>
            Se você se identificou com pelo menos 2 desses pontos, a culpa <span className="font-bold" style={{ color: c.heading }}>não é sua</span>. O jogo mudou. E quem não entendeu isso ainda está jogando com as regras de 2023.
          </p>

          <div className="bg-gradient-to-r from-[#F5A623]/[0.06] to-transparent border border-[#F5A623]/15 rounded-xl p-8 max-w-[700px] mx-auto mt-10 text-center">
            <div className="font-display text-5xl md:text-7xl font-bold text-[#F5A623]">
              <span className="gsap-counter" data-end="47" data-suffix="x">47x</span>
            </div>
            <p className="text-base mt-4 leading-relaxed" style={{ color: c.body }}>
              Em 2026, criadores que usam IA para conteúdo produzem <span className="font-semibold" style={{ color: c.heading }}>47x mais</span> do que quem faz manual. Não é exagero. É matemática: enquanto você grava 1 vídeo, o sistema que vou te mostrar pesquisa, roteiriza, grava com avatar, edita e posta automaticamente — tudo sem você tocar no celular.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SOLUTION — 4 PILLARS (BENTO GRID) ═══ */}
      <SectionDivider />
      <section id="solution" className="relative py-28 md:py-40 px-6 md:px-10 noise-bg" style={{ background: c.surface1 }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#6366F1]/[0.04] blur-[120px] -top-20 -right-20" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#F5A623]/[0.03] blur-[100px] -bottom-20 -left-20" />
        </div>
        <div className="relative max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-[-0.02em] text-center" style={{ color: c.heading }}>
            Apresentamos: O{" "}
            <span className="bg-gradient-to-r from-[#F5A623] to-[#FFD666] bg-clip-text text-transparent">Sistema Completo</span>{" "}
            de Criação de Conteúdo com IA
          </h2>

          <p className="text-lg text-center max-w-[600px] mx-auto mt-4" style={{ color: c.body }}>
            <span className="font-semibold" style={{ color: c.heading }}>14</span> aulas práticas.{" "}
            <span className="font-semibold" style={{ color: c.heading }}>4</span> pilares.{" "}
            <span className="font-semibold" style={{ color: c.heading }}>1</span> resultado: seu conteúdo no piloto automático.
          </p>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1000px] mx-auto mt-14">
            {[
              { title: "Inteligência Global", desc: "Nosso agente de IA monitora os 100+ melhores criadores do seu nicho em 10+ países (Japão, Alemanha, EUA, Índia...) e identifica o que está viralizando ANTES de chegar ao Brasil. Você nunca mais precisa 'ter ideias' — a IA traz os dados.", span: "md:col-span-2 md:row-span-2" },
              { title: "Engenharia Reversa", desc: "A IA filtra apenas os vídeos com 50K+ views, 1K+ comentários ou 10K+ likes. Depois transcreve, analisa hooks, formatos e temas — e te entrega um relatório completo do que funciona. É como ter um time de pesquisa de R$15K/mês trabalhando de graça.", span: "" },
              { title: "Produção em Escala", desc: "Com um clique, o agente roteirista cria roteiros prontos para gravação usando a estrutura de 10 linhas dos vídeos virais. Não quer aparecer? Sem problema — use avatares de IA que falam com sua voz, seus gestos, sua cara. Ou não. Funciona dos dois jeitos.", span: "" },
              { title: "Distribuição Automatizada", desc: "O vídeo editado vai direto do Google Drive para Instagram, TikTok, YouTube e todas as plataformas — com título otimizado por IA, descrição SEO e agendamento automático. Você dorme, o sistema posta.", span: "md:col-span-3" },
            ].map((pillar, i) => {
              const Icon = pillarIcons[i];
              const isLarge = i === 0;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, borderColor: "rgba(245,166,35,0.25)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative bg-[${c.surface3}]/60 backdrop-blur-sm border border-white/[0.08] rounded-xl transition-all duration-300 hover:shadow-[0_8px_40px_rgba(245,166,35,0.06)] ${pillar.span} ${isLarge ? "p-8 md:p-10" : i === 3 ? "p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6" : "p-6"}`}
                >
                  <div className={`${isLarge ? "w-16 h-16" : "w-12 h-12"} rounded-lg bg-gradient-to-br from-[#F5A623]/15 to-[#F5A623]/5 border border-[#F5A623]/15 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`${isLarge ? "w-8 h-8" : "w-6 h-6"} text-[#F5A623]`} />
                  </div>
                  <div>
                    <h3 className={`${isLarge ? "text-2xl mt-5" : "text-lg mt-3"} font-display font-bold`} style={{ color: c.heading }}>{pillar.title}</h3>
                    <p className={`${isLarge ? "text-base mt-3" : "text-sm mt-2"} leading-relaxed`} style={{ color: c.body }}>{pillar.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-[${c.surface3}]/40 border border-white/[0.06] rounded-xl p-6 md:p-8 max-w-[1000px] mx-auto mt-8">
            <p className="text-center leading-relaxed" style={{ color: c.body }}>
              Juntos, esses 4 pilares eliminam os 3 maiores custos de criação de conteúdo:{" "}
              <span className="font-semibold" style={{ color: c.heading }}>tempo</span> (de 20h para 2h/semana),{" "}
              <span className="font-semibold" style={{ color: c.heading }}>dinheiro</span> (de R$9.5K/mês em equipe para R$0) e{" "}
              <span className="font-semibold" style={{ color: c.heading }}>energia mental</span> (de &quot;o que eu posto hoje?&quot; para piloto automático).
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5">
              {["⏱ 20h → 2h/semana", "💰 R$9.5K → R$0", "🧠 Piloto automático"].map((stat) => (
                <span key={stat} className="bg-[#F5A623]/[0.08] text-[#F5A623] px-4 py-2 rounded-lg text-sm font-medium">
                  {stat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CURRICULUM ═══ */}
      <SectionDivider />
      <section id="curriculum" className="relative py-24 md:py-32 px-6 md:px-10 noise-bg" style={{ background: c.surface2 }}>
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-30" />
        <div className="relative max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-[-0.02em] text-center" style={{ color: c.heading }}>
            Exatamente O Que Você Vai Aprender{" "}
            <span className="bg-gradient-to-r from-[#F5A623] to-[#FFD666] bg-clip-text text-transparent">(e Implementar)</span>
          </h2>
          <p className="text-lg text-center max-w-[600px] mx-auto mt-4" style={{ color: c.body }}>
            Não são aulas teóricas. Cada aula termina com uma <span className="font-semibold" style={{ color: c.heading }}>automação funcionando</span>.
          </p>

          <div className="mt-12">
            <Accordion
              defaultOpen={0}
              items={[
                {
                  trigger: (
                    <div className="flex items-center flex-1 min-w-0">
                      <span className="bg-[#F5A623]/10 text-[#F5A623] text-xs font-bold px-2.5 py-1 rounded mr-3 flex-shrink-0">M1</span>
                      <span className="truncate">Automação de Redes Sociais</span>
                      <span className="text-sm ml-auto pl-3 flex-shrink-0" style={{ color: c.caption }}>4 aulas</span>
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
                        <div key={i} className="border-t border-white/[0.04] px-6 py-4">
                          <div className="flex items-start justify-between">
                            <p className="font-medium" style={{ color: c.heading }}>Aula {i + 1} — {lesson.title}</p>
                            <span className="text-xs ml-2 flex-shrink-0" style={{ color: c.caption }}>{lesson.time}</span>
                          </div>
                          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: c.body }}>{lesson.desc}</p>
                          {lesson.tools && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {lesson.tools.split(", ").map((t) => (
                                <span key={t} className="bg-white/[0.04] text-xs px-2 py-1 rounded" style={{ color: c.caption }}>{t}</span>
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
                      <span className="bg-[#F5A623]/10 text-[#F5A623] text-xs font-bold px-2.5 py-1 rounded mr-3 flex-shrink-0">M2</span>
                      <span className="truncate">Copywriting & Roteiros com IA</span>
                      <span className="text-sm ml-auto pl-3 flex-shrink-0" style={{ color: c.caption }}>2 aulas</span>
                    </div>
                  ),
                  content: (
                    <div>
                      {[
                        { num: 5, title: "Agente Copywriter com RAG", time: "31 min", desc: "Construa um agente que consulta livros do Hormozi, Brunson e outros mestres de marketing via RAG (ChatPDF), e gera uma landing page completa: headlines, benefícios, prova social, FAQ, CTAs, código HTML responsivo — tudo baseado na sabedoria dos maiores copywriters do mundo.", tools: "Make, ChatPDF, OpenRouter (Claude), Google Docs, WhatsApp" },
                        { num: 6, title: "Agente Roteirista", time: "14 min", desc: "Transforme sua base de vídeos virais em roteiros prontos para gravação. Estrutura de 10 linhas: hook → desenvolvimento → plot twist → resolução → punchline. Personalizado com SEU estilo de falar.", tools: "Make, Google Sheets, OpenRouter" },
                      ].map((lesson) => (
                        <div key={lesson.num} className="border-t border-white/[0.04] px-6 py-4">
                          <div className="flex items-start justify-between">
                            <p className="font-medium" style={{ color: c.heading }}>Aula {lesson.num} — {lesson.title}</p>
                            <span className="text-xs ml-2 flex-shrink-0" style={{ color: c.caption }}>{lesson.time}</span>
                          </div>
                          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: c.body }}>{lesson.desc}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {lesson.tools.split(", ").map((t) => (
                              <span key={t} className="bg-white/[0.04] text-xs px-2 py-1 rounded" style={{ color: c.caption }}>{t}</span>
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
                      <span className="bg-[#F5A623]/10 text-[#F5A623] text-xs font-bold px-2.5 py-1 rounded mr-3 flex-shrink-0">M3</span>
                      <span className="truncate">Avatares & Clones de IA</span>
                      <span className="text-sm ml-auto pl-3 flex-shrink-0" style={{ color: c.caption }}>3 aulas</span>
                    </div>
                  ),
                  content: (
                    <div>
                      {[
                        { num: 7, title: "Avatares de IA", time: "17 min", desc: "Panorama completo do HeyGen: crie avatares a partir de vídeos ou fotos, clone sua voz, integre com ElevenLabs. Descubra como CEOs estão escalando produção de conteúdo sem gastar 1 minuto na câmera.", tools: "HeyGen, ElevenLabs" },
                        { num: 8, title: "Seu Primeiro Clone de IA", time: "6 min", desc: "Tutorial passo a passo: grave 2 minutos, suba no HeyGen, e tenha seu avatar de IA falando qualquer texto que você digitar. Setup completo em 10 minutos.", tools: "HeyGen" },
                        { num: 9, title: "Conteúdo 100% Automatizado com Avatares", time: "24 min", desc: "O sistema COMPLETO: pesquisa → roteiro → avatar gera vídeo → postagem automática. Tudo conectado via Make + HeyGen + Google Drive. Produção de conteúdo no piloto automático total.", tools: "Make, HeyGen, Google Sheets, Google Drive, ElevenLabs" },
                      ].map((lesson) => (
                        <div key={lesson.num} className="border-t border-white/[0.04] px-6 py-4">
                          <div className="flex items-start justify-between">
                            <p className="font-medium" style={{ color: c.heading }}>Aula {lesson.num} — {lesson.title}</p>
                            <span className="text-xs ml-2 flex-shrink-0" style={{ color: c.caption }}>{lesson.time}</span>
                          </div>
                          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: c.body }}>{lesson.desc}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {lesson.tools.split(", ").map((t) => (
                              <span key={t} className="bg-white/[0.04] text-xs px-2 py-1 rounded" style={{ color: c.caption }}>{t}</span>
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
                      <span className="bg-[#F5A623]/10 text-[#F5A623] text-xs font-bold px-2.5 py-1 rounded mr-3 flex-shrink-0">M4</span>
                      <span className="truncate">Carrosséis & Anúncios</span>
                      <span className="text-sm ml-auto pl-3 flex-shrink-0" style={{ color: c.caption }}>5 aulas</span>
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
                        <div key={lesson.num} className="border-t border-white/[0.04] px-6 py-4">
                          <div className="flex items-start justify-between">
                            <p className="font-medium" style={{ color: c.heading }}>Aula {lesson.num} — {lesson.title}</p>
                            <span className="text-xs ml-2 flex-shrink-0" style={{ color: c.caption }}>{lesson.time}</span>
                          </div>
                          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: c.body }}>{lesson.desc}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {lesson.tools.split(", ").map((t) => (
                              <span key={t} className="bg-white/[0.04] text-xs px-2 py-1 rounded" style={{ color: c.caption }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {["14 Aulas", "4+ Horas", "Automações Prontas", "1 Ano de Acesso"].map((stat) => (
              <span key={stat} className="bg-white/[0.04] border border-white/[0.06] text-sm px-4 py-2 rounded-lg" style={{ color: c.heading }}>{stat}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <SectionDivider />
      <section id="proof" className="relative py-28 md:py-40 px-6 md:px-10 noise-bg" style={{ background: c.surface1 }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/[0.04] blur-[130px] top-1/4 -left-40" />
        </div>
        <div className="relative max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-[-0.02em] text-center" style={{ color: c.heading }}>
            Resultados <span className="bg-gradient-to-r from-[#F5A623] to-[#FFD666] bg-clip-text text-transparent">Reais</span> de Quem Já Implementou
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[900px] mx-auto mt-14">
            {[
              { end: 20, suffix: "K", label: "seguidores", desc: "no TikTok + Instagram em 30 dias" },
              { end: 2, suffix: "h", label: "por semana", desc: "(antes eram 20+ horas)" },
              { end: 200, suffix: "%", label: "crescimento", desc: "por semana comprovado" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#1C2333]/60 backdrop-blur-sm border border-white/[0.08] rounded-xl p-8 text-center hover:border-[#F5A623]/20 transition-all duration-300">
                <div className="font-display text-4xl md:text-5xl font-bold text-[#F5A623]">
                  <span className="gsap-counter" data-end={stat.end} data-suffix={stat.suffix}>{stat.end}{stat.suffix}</span>
                </div>
                <p className="text-base font-semibold mt-2" style={{ color: c.heading }}>{stat.label}</p>
                <p className="text-sm mt-1" style={{ color: c.caption }}>{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonials — masonry style with rotation */}
          <div className="mt-16 columns-1 md:columns-3 gap-4 max-w-[1000px] mx-auto">
            {[
              { name: "Bruno", quote: "Processo de uma semana, hoje em 4-6 horas com automação", rotate: "rotate-0" },
              { name: "André", quote: "Pouco tempo de curso, já vendi projetos com ticket médio considerável", rotate: "md:-rotate-1" },
              { name: "Alice", quote: "Muito mais do que esperava. IA como aliada estratégica", rotate: "md:rotate-1" },
              { name: "Ricardo", quote: "Metade do que achava impossível, hoje faço em casa e no trabalho", rotate: "md:rotate-0" },
              { name: "Rodrigo Eve", quote: "Se eu consegui, você vai conseguir também", rotate: "md:-rotate-1" },
            ].map((t, i) => (
              <div key={i} className={`break-inside-avoid mb-4 ${t.rotate}`}>
                <div className="bg-[#1C2333]/60 backdrop-blur-sm border border-white/[0.08] hover:border-[#F5A623]/15 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGradients[i]} flex items-center justify-center ring-2 ring-white/[0.08] ring-offset-2 ring-offset-[#1C2333]`}>
                      <span className="font-bold text-white text-sm">{t.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm block" style={{ color: c.heading }}>{t.name}</span>
                      <span className="text-xs" style={{ color: c.caption }}>Aluno Maestros da IA</span>
                    </div>
                  </div>
                  <p className="text-sm italic leading-relaxed" style={{ color: c.body }}>&quot;{t.quote}&quot;</p>
                  <div className="flex gap-0.5 mt-3">
                    {[1,2,3,4,5].map((s) => (<Star key={s} className="w-3.5 h-3.5 text-[#F5A623] fill-[#F5A623]" />))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUE STACK ═══ */}
      <SectionDivider />
      <section id="value" className="relative py-20 md:py-28 px-6 md:px-10 noise-bg" style={{ background: c.surface2 }}>
        <div className="relative max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-[-0.02em] text-center" style={{ color: c.heading }}>
            Quanto Custaria Montar Tudo Isso <span className="bg-gradient-to-r from-[#F5A623] to-[#FFD666] bg-clip-text text-transparent">Sozinho</span>?
          </h2>

          <div className="max-w-[700px] mx-auto mt-12">
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
              <div key={i} className={`flex justify-between items-center py-3.5 px-4 border-b border-white/[0.04] rounded-lg ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                <span className="flex items-center gap-3" style={{ color: c.heading }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm">{row.item}</span>
                </span>
                <span className="font-semibold tabular-nums whitespace-nowrap ml-4 text-sm" style={{ color: c.caption }}>{row.price}</span>
              </div>
            ))}
            <div className="bg-[#F5A623]/[0.06] border border-[#F5A623]/15 rounded-lg mt-3 py-4 px-4 flex justify-between items-center">
              <span className="font-bold text-sm" style={{ color: c.heading }}>VALOR TOTAL ANUAL</span>
              <span className="font-display font-bold text-xl text-[#F5A623]">R$142.400</span>
            </div>
          </div>

          <p className="text-xl text-center max-w-[600px] mx-auto mt-10 leading-relaxed" style={{ color: c.body }}>
            Você não vai pagar <span className="line-through" style={{ color: c.muted }}>R$142K</span>. Nem <span className="line-through" style={{ color: c.muted }}>R$50K</span>. Nem <span className="line-through" style={{ color: c.muted }}>R$10K</span>. <span className="font-bold" style={{ color: c.heading }}>Este módulo completo está incluído na Formação Maestros da IA.</span>
          </p>
        </div>
      </section>

      {/* ═══ PRICING — SPOTLIGHT PATTERN ═══ */}
      <SectionDivider />
      <section id="pricing" className="relative py-28 md:py-40 px-6 md:px-10 noise-bg" style={{ background: c.surface1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5A623]/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-[-0.02em] text-center" style={{ color: c.heading }}>
            Acesse o Módulo Completo Dentro da{" "}
            <span className="bg-gradient-to-r from-[#F5A623] to-[#FFD666] bg-clip-text text-transparent">Formação Maestros da IA</span>
          </h2>

          <p className="text-lg text-center max-w-[600px] mx-auto mt-4" style={{ color: c.body }}>
            14 aulas de criação de conteúdo com IA + TUDO que a formação oferece:
          </p>

          <div className="max-w-[600px] mx-auto mt-8">
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
              <div key={i} className="flex items-start gap-3 py-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                <span className="text-sm" style={{ color: c.body }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Spotlight Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mt-14 items-start">
            {/* R$3K — secondary */}
            <div className="bg-[#1C2333]/50 backdrop-blur-sm border border-white/[0.08] rounded-xl p-7 md:mt-8 opacity-90">
              <span className="bg-white/[0.06] text-xs font-bold px-3 py-1 rounded-full" style={{ color: c.caption }}>FORMAÇÃO COMPLETA</span>
              <p className="text-xs font-bold tracking-[0.15em] mt-4" style={{ color: c.caption }}>TUDO INCLUSO</p>
              <p className="line-through text-base mt-3" style={{ color: c.muted }}>R$7.000</p>
              <p className="text-3xl font-display font-bold mt-1" style={{ color: c.heading }}>R$3.000 <span className="text-base font-normal" style={{ color: c.caption }}>à vista</span></p>
              <p className="text-sm mt-1" style={{ color: c.caption }}>ou 12x R$323,38</p>
              <CtaButton href="https://chat.maestrosdaia.com" variant="outline" className="w-full mt-6 !justify-center">
                QUERO COMEÇAR AGORA
              </CtaButton>
              <ul className="mt-5 space-y-2">
                {["12 mentorias ao vivo", "Comunidade exclusiva", "Garantia 7 dias", "10 módulos completos"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: c.body }}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* R$997 — SPOTLIGHT */}
            <div className="relative order-first md:order-last">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#F5A623]/30 via-[#F5A623]/10 to-transparent blur-sm pointer-events-none" />
              <div className="relative bg-[#1C2333]/80 backdrop-blur-md border-2 border-[#F5A623]/30 rounded-2xl p-8 animate-pulse-glow">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F5A623] to-[#E8951A] text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_4px_16px_rgba(245,166,35,0.25)]">
                  MAIS POPULAR
                </span>
                <span className="bg-[#F5A623]/[0.08] text-[#F5A623] text-xs font-bold px-3 py-1 rounded-full">COMECE PELO ESSENCIAL</span>
                <p className="text-xs font-bold tracking-[0.15em] mt-4" style={{ color: c.caption }}>ACESSO FUNDAMENTAL</p>
                <p className="line-through text-base mt-3" style={{ color: c.muted }}>R$30.000</p>
                <p className="text-4xl font-display font-bold text-[#F5A623] mt-1">R$997 <span className="text-base font-normal" style={{ color: c.caption }}>à vista</span></p>
                <p className="text-sm mt-1" style={{ color: c.caption }}>ou 12x R$97</p>
                <CtaButton href="https://chat.maestrosdaia.com" size="lg" className="w-full mt-6 !justify-center">
                  GARANTIR MINHA VAGA
                  <ArrowRight className="w-5 h-5" />
                </CtaButton>
                <ul className="mt-5 space-y-2">
                  {["Acesso ao módulo completo", "Garantia 90 dias de execução", "Templates prontos", "1 ano de acesso"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: c.body }}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <CtaButton href="https://chat.maestrosdaia.com" variant="ghost" className="mx-auto">
              <MessageCircle className="w-4 h-4" />
              Não sabe qual plano é pra você? Fale com nosso assistente →
            </CtaButton>
          </div>
        </div>
      </section>

      {/* ═══ GUARANTEE ═══ */}
      <SectionDivider />
      <section id="guarantee" className="relative py-20 md:py-28 px-6 md:px-10 noise-bg" style={{ background: c.surface2 }}>
        <div className="relative max-w-[1200px] mx-auto">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F5A623]/15 to-[#F5A623]/5 border border-[#F5A623]/15 flex items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-[#F5A623]" />
            </div>
          </div>

          <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-center mt-5" style={{ color: c.heading }}>
            O Risco É <span className="text-[#F5A623]">100% Nosso</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto mt-10">
            <div className="bg-[#1C2333]/50 backdrop-blur-sm border border-[#F5A623]/10 rounded-xl p-7 order-last md:order-first hover:border-[#F5A623]/20 transition-colors duration-300">
              <span className="text-xs font-medium" style={{ color: c.caption }}>🛡️ Tier R$3K</span>
              <h3 className="font-display text-lg font-bold mt-2" style={{ color: c.heading }}>
                Garantia <span className="text-[#F5A623]">7 Dias</span>
              </h3>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: c.body }}>
                Acesse TUDO. Se em 7 dias você não sentir que isso vale pelo menos 10x o investimento, devolvemos <span className="font-semibold text-[#F5A623]">100% do seu dinheiro</span>. Sem perguntas. Sem burocracia.
              </p>
            </div>
            <div className="bg-[#1C2333]/50 backdrop-blur-sm border border-[#F5A623]/10 rounded-xl p-7 hover:border-[#F5A623]/20 transition-colors duration-300">
              <span className="text-xs font-medium" style={{ color: c.caption }}>🛡️ Tier R$997</span>
              <h3 className="font-display text-lg font-bold mt-2" style={{ color: c.heading }}>
                Garantia <span className="text-[#F5A623]">90 Dias</span> de Execução
              </h3>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: c.body }}>
                Assista às aulas, implemente as automações, rode o sistema. Se em 90 dias você não triplicar o valor investido, devolvemos <span className="font-semibold text-[#F5A623]">100% dos seus R$997</span> + <span className="font-semibold text-[#F5A623]">1 hora de consultoria gratuita</span> para consertar seu funil. Nós assumimos o risco.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOUNDERS ═══ */}
      <SectionDivider />
      <section id="founders" className="relative py-28 md:py-36 px-6 md:px-10 noise-bg" style={{ background: c.surface1 }}>
        <div className="relative max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-[-0.02em] text-center" style={{ color: c.heading }}>
            Quem São os <span className="text-[#F5A623]">Maestros</span> Por Trás do Sistema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mt-12">
            <div className="bg-[#1C2333]/60 backdrop-blur-sm border border-white/[0.08] rounded-xl overflow-hidden hover:border-[#F5A623]/15 transition-colors duration-300">
              <div className="h-1.5 bg-gradient-to-r from-[#F5A623] to-[#FF6B35]" />
              <div className="p-7">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5A623] to-[#FF6B35] flex items-center justify-center ring-3 ring-[#F5A623]/10 flex-shrink-0">
                    <span className="text-lg font-bold text-white">AE</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold" style={{ color: c.heading }}>Arthur Endo</h3>
                    <p className="text-[#F5A623] text-xs font-semibold tracking-[0.1em] uppercase">Co-Fundador & CEO</p>
                  </div>
                </div>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: c.body }}>
                  Músico premiado com turnês internacionais. Doutor Honoris Causa. Zero background em programação. Transformou um simples curso de violão em R$2.5 milhões em 15 meses usando agentes de IA.
                </p>
              </div>
            </div>

            <div className="bg-[#1C2333]/60 backdrop-blur-sm border border-white/[0.08] rounded-xl overflow-hidden hover:border-[#6366F1]/15 transition-colors duration-300">
              <div className="h-1.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" />
              <div className="p-7">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center ring-3 ring-[#6366F1]/10 flex-shrink-0">
                    <span className="text-lg font-bold text-white">LZ</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold" style={{ color: c.heading }}>Lyria Zoccal</h3>
                    <p className="text-[#F5A623] text-xs font-semibold tracking-[0.1em] uppercase">Co-Fundadora & COO</p>
                  </div>
                </div>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: c.body }}>
                  Administradora com experiência em grandes empresas de tech (SAP). Especialista em IA aplicada a processos corporativos e ERP. Consultora Enterprise.
                </p>
              </div>
            </div>
          </div>

          <div className="border-l-2 border-[#F5A623]/30 rounded-r-xl p-7 max-w-[800px] mx-auto mt-12 relative" style={{ background: `${c.surface3}80` }}>
            <span className="absolute -top-1 left-4 text-[#F5A623] text-5xl opacity-15 leading-none font-serif">&quot;</span>
            <p className="text-base leading-relaxed italic" style={{ color: c.body }}>
              Nenhum dos dois sabia programar. Gastaram <span className="font-semibold not-italic" style={{ color: c.heading }}>R$8K em consultoria de IA</span> e receberam um PDF genérico. Gastaram <span className="font-semibold not-italic" style={{ color: c.heading }}>R$12K em ferramentas</span> e nunca integraram. Contrataram um <span className="font-semibold not-italic" style={{ color: c.heading }}>dev freelancer</span> e o chatbot respondeu &quot;Não entendi&quot; 70% das vezes. Até que descobriram: você não precisa PROGRAMAR IA — precisa <span className="text-[#F5A623] font-bold not-italic">ORQUESTRAR IA</span>. Como um maestro rege uma orquestra.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <SectionDivider />
      <section id="faq" className="relative py-20 md:py-28 px-6 md:px-10 noise-bg" style={{ background: c.surface2 }}>
        <div className="relative max-w-[1200px] mx-auto">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-center" style={{ color: c.heading }}>
            Perguntas Frequentes
          </h2>
          <div className="mt-10">
            <Accordion
              items={[
                { trigger: <span>Preciso saber programar?</span>, content: <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: c.body }}>Zero. Todas as automações são montadas com ferramentas visuais (Make, N8N) com nossos templates prontos. Se você sabe arrastar e soltar, sabe usar.</div> },
                { trigger: <span>Funciona para qualquer nicho?</span>, content: <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: c.body }}>Sim. O sistema de pesquisa busca concorrentes do SEU nicho em 10+ países. Já usamos para fitness, educação, tech, saúde, gastronomia e mais.</div> },
                { trigger: <span>E se eu não quiser aparecer na câmera?</span>, content: <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: c.body }}>Perfeito. O módulo 3 ensina a criar avatares de IA que falam com sua voz e aparência — ou usar avatares genéricos. Você nunca precisa gravar se não quiser.</div> },
                { trigger: <span>As ferramentas são pagas?</span>, content: <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: c.body }}>Algumas sim (Make, HeyGen, Metricool), mas mostramos as opções mais baratas e alternativas gratuitas quando existem. O investimento em ferramentas gira em torno de R$100-200/mês.</div> },
                { trigger: <span>Em quanto tempo vejo resultados?</span>, content: <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: c.body }}>A primeira automação (postagem automática) pode estar rodando no mesmo dia. Nosso resultado comprovado: 20K seguidores em 30 dias com o sistema completo.</div> },
                { trigger: <span>Posso acessar depois dos 7/90 dias?</span>, content: <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: c.body }}>Sim, você tem 1 ano de acesso completo a todo o conteúdo, com atualizações mensais inclusas.</div> },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <SectionDivider />
      <section id="final-cta" className="relative py-28 md:py-40 px-6 overflow-hidden noise-bg" style={{ background: c.surface1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5A623]/[0.03] to-transparent pointer-events-none" />
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-30" />
        <div className="relative max-w-[700px] mx-auto text-center">
          <h2 className="font-display text-[clamp(1.5rem,4vw,3.5rem)] font-bold tracking-[-0.02em]" style={{ color: c.heading }}>
            Seus Concorrentes Já Estão Automatizando.{" "}
            <span className="bg-gradient-to-r from-[#F5A623] to-[#FFD666] bg-clip-text text-transparent">E Você?</span>
          </h2>

          <p className="text-lg mt-6 max-w-[600px] mx-auto leading-relaxed" style={{ color: c.body }}>
            Cada dia sem esse sistema é mais um dia perdendo para quem já usa IA para criar conteúdo <span className="font-semibold" style={{ color: c.heading }}>47x mais rápido</span>.
          </p>

          <div className="bg-[#F5A623]/[0.06] border border-[#F5A623]/15 rounded-lg px-6 py-4 max-w-[500px] mx-auto mt-8">
            <p className="text-[#F5A623] font-medium text-sm">
              ⚠️ Vagas com preço de lançamento limitadas. O valor sobe ao atingir 60 membros fundadores.
            </p>
          </div>

          <div className="mt-8">
            <CtaButton href="https://chat.maestrosdaia.com" size="lg" className="!shadow-[0_0_50px_rgba(245,166,35,0.25)]">
              GARANTIR MINHA VAGA AGORA
              <ArrowRight className="w-5 h-5" />
            </CtaButton>
          </div>

          <p className="text-sm mt-4" style={{ color: c.caption }}>
            Pagamento seguro | Garantia de reembolso | Acesso imediato
          </p>

          <div className="flex justify-center gap-8 mt-6">
            {[
              { icon: Lock, label: "Seguro" },
              { icon: CheckCircle2, label: "Garantia" },
              { icon: Zap, label: "Imediato" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs" style={{ color: c.caption }}>
                <Icon className="w-4 h-4" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <SectionDivider />
      <footer className="py-12 px-6" style={{ background: c.surface0, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-display text-lg font-bold" style={{ color: c.heading }}>Maestros da IA</span>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/maestrosdaia" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0F6FC] transition-colors" style={{ color: c.muted }} aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://tiktok.com/@maestrosdaia" target="_blank" rel="noopener noreferrer" className="hover:text-[#F0F6FC] transition-colors" style={{ color: c.muted }} aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.3 8.3 0 005.58 2.15V11.7a4.85 4.85 0 01-2.28-.59l-.01-.01.01.01V6.69h2.28z"/></svg>
              </a>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <a href="#" className="text-sm hover:underline underline-offset-4" style={{ color: c.caption }}>Termos de Uso</a>
            <span style={{ color: c.muted }}>|</span>
            <a href="#" className="text-sm hover:underline underline-offset-4" style={{ color: c.caption }}>Política de Privacidade</a>
          </div>
          <p className="text-xs text-center mt-4" style={{ color: c.caption }}>© 2026 Maestria Academy Ltda / Lyra Arte LTDA</p>
          <a href="https://wa.me/5511995631610" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm hover:text-[#F5A623] mt-4 transition-colors" style={{ color: c.caption }}>
            <Phone className="w-4 h-4" />
            WhatsApp: +55 11 99563-1610
          </a>
          <div className="pb-8" />
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showMobileCta && !dismissedMobileCta && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#09090B]/80 backdrop-blur-xl border-t border-[#F5A623]/15 px-4 py-3 md:hidden"
          >
            <button
              onClick={() => setDismissedMobileCta(true)}
              className="absolute -top-8 right-3 w-6 h-6 rounded-full bg-[#09090B]/80 backdrop-blur-sm border border-white/[0.08] flex items-center justify-center transition-colors"
              style={{ color: c.caption }}
              aria-label="Fechar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: c.heading }}>A partir de 12x R$97</span>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href="https://chat.maestrosdaia.com"
                onClick={() => trackLead()}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-gradient-to-r from-[#F5A623] to-[#E8951A] text-black text-sm px-6 py-2.5 rounded-lg font-bold shadow-[0_0_20px_rgba(245,166,35,0.25)]"
              >
                Começar Agora
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
