"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Target,
  Zap,
  ChevronRight,
  ShieldAlert,
  Flame,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const stats = [
  { value: "10K+", label: "Audits Completed" },
  { value: "4.2", label: "Avg Starting Score" },
  { value: "7.8", label: "Avg After 30 Days" },
  { value: "100%", label: "Free Forever" },
];

const features = [
  {
    icon: Target,
    title: "Objective Scoring",
    desc: "Get rated /10 across 6 critical dimensions — looks, fitness, discipline, finance, social, and overall. Cold, data-driven, no ego protection.",
    color: "emerald",
  },
  {
    icon: Brain,
    title: "Psychological X-Ray",
    desc: "Our AI digs into behavioral patterns you don't even realize you have. Hidden coping mechanisms, self-sabotage loops, and blind spots — exposed.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "30-Day Protocol",
    desc: "Not generic advice. A week-by-week, hyper-specific action plan designed around YOUR weaknesses. Execute or stay average.",
    color: "amber",
  },
  {
    icon: TrendingUp,
    title: "Future Projection",
    desc: "See two possible futures: what happens if you follow the protocol, and what happens if you stay the same. Reality hits different when it's written down.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Cultural Context",
    desc: "Built for the Indian grind. We understand UPI micro-spending, hostel food, parental pressure, and the hustle culture. No Western cookie-cutter advice.",
    color: "orange",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    desc: "Powered by advanced LLM intelligence. Every audit is unique, deeply personalized, and gets smarter with context. No two reports are the same.",
    color: "pink",
  },
];

const colorMap: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

export default function LandingPage() {
  return (
    <>
      {/* ─── GLOBAL STYLE OVERRIDES (scoped via style tag) ─── */}
      <style>{`
        /* Premium palette CSS variables */
        :root {
          --wine:      #6B1A2A;
          --burgundy:  #8B1D3A;
          --gold:      #C9963A;
          --gold-soft: #E0B96A;
          --cream:     #F5ECD7;
          --charcoal:  #1A1410;
          --ink:       #110E0A;
          --surface:   #1E1812;
          --muted:     #3A3025;
          --text-main: #F0E6D3;
          --text-dim:  #8A7C6A;
        }

        /* Override global background */
        body, html {
          background: var(--ink) !important;
        }

        /* Premium noise grain overlay */
        .premium-noise::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px 180px;
          opacity: 0.55;
        }

        /* Gold shimmer animation */
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .gold-shimmer {
          background: linear-gradient(
            90deg,
            #C9963A 0%,
            #E8C97A 40%,
            #C9963A 60%,
            #A07020 100%
          );
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        /* Luxury text gradient for hero */
        .text-gradient-luxury {
          background: linear-gradient(135deg, #E0B96A 0%, #C9963A 50%, #8B1D3A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Ambient orb float */
        @keyframes float-luxury {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-28px) scale(1.04); }
        }
        .orb-float { animation: float-luxury 9s ease-in-out infinite; }
        .orb-float-delay { animation: float-luxury 12s ease-in-out infinite 3s; }
        .orb-float-slow  { animation: float-luxury 15s ease-in-out infinite 6s; }

        /* Premium card hover glow */
        .card-luxury {
          background: linear-gradient(145deg, #1E1812 0%, #170F0A 100%);
          border: 1px solid rgba(201,150,58,0.12);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
        }
        .card-luxury:hover {
          border-color: rgba(201,150,58,0.35);
          box-shadow: 0 0 40px rgba(139,29,58,0.18), 0 8px 32px rgba(0,0,0,0.4);
          transform: translateY(-3px);
        }

        /* Founder image ring */
        .founder-ring {
          background: conic-gradient(from 0deg, #C9963A, #8B1D3A, #C9963A, #E0B96A, #8B1D3A, #C9963A);
          animation: spin-ring 8s linear infinite;
          border-radius: 9999px;
          padding: 3px;
        }
        @keyframes spin-ring {
          to { transform: rotate(360deg); }
        }

        /* Journey glow card */
        .journey-card {
          background: linear-gradient(145deg, rgba(139,29,58,0.12) 0%, rgba(26,20,16,0.9) 100%);
          border: 1px solid rgba(201,150,58,0.2);
          box-shadow: inset 0 0 80px rgba(139,29,58,0.08), 0 0 60px rgba(139,29,58,0.12);
        }

        /* Stat card luxury */
        .stat-luxury {
          background: linear-gradient(135deg, #1E1812 0%, #15100D 100%);
          border: 1px solid rgba(201,150,58,0.15);
          transition: all 0.3s ease;
        }
        .stat-luxury:hover {
          border-color: rgba(201,150,58,0.4);
          box-shadow: 0 0 30px rgba(201,150,58,0.1);
        }

        /* Thin gold divider */
        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,150,58,0.4), transparent);
          margin: 0 auto;
          width: 60%;
        }

        /* Phase card overrides */
        .phase-before {
          background: linear-gradient(145deg, rgba(139,29,58,0.08) 0%, rgba(26,14,10,0.9) 100%);
          border-color: rgba(139,29,58,0.25) !important;
        }
        .phase-before:hover { border-color: rgba(139,29,58,0.5) !important; }
        .phase-after {
          background: linear-gradient(145deg, rgba(201,150,58,0.06) 0%, rgba(26,20,10,0.9) 100%);
          border-color: rgba(201,150,58,0.2) !important;
        }
        .phase-after:hover { border-color: rgba(201,150,58,0.45) !important; }

        /* CTA glow */
        .cta-premium {
          background: linear-gradient(160deg, rgba(139,29,58,0.08) 0%, rgba(201,150,58,0.05) 100%);
          border-color: rgba(201,150,58,0.22) !important;
          box-shadow: 0 0 80px rgba(139,29,58,0.15), inset 0 0 40px rgba(201,150,58,0.04);
        }

        /* Gold badge */
        .gold-badge {
          background: linear-gradient(135deg, rgba(201,150,58,0.15), rgba(139,29,58,0.15));
          border: 1px solid rgba(201,150,58,0.3);
          color: #E0B96A;
        }

        /* How it works step cards */
        .step-card {
          background: linear-gradient(145deg, #1A1410 0%, #130E0B 100%);
          border: 1px solid rgba(201,150,58,0.1);
          transition: all 0.3s ease;
        }
        .step-card:hover {
          border-color: rgba(201,150,58,0.35);
          box-shadow: 0 0 40px rgba(139,29,58,0.15);
          transform: translateY(-4px);
        }
      `}</style>

      <div
        className="premium-noise min-h-screen flex flex-col items-center relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #110E0A 0%, #1A0F0B 30%, #140C0F 60%, #0F0C0A 100%)",
          color: "#F0E6D3",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {/* ── AMBIENT ORBS (luxury palette) ── */}
        <div
          className="orb-float absolute pointer-events-none"
          style={{
            top: "-8%", left: "18%",
            width: 700, height: 700,
            background: "radial-gradient(circle, rgba(139,29,58,0.22) 0%, transparent 70%)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />
        <div
          className="orb-float-delay absolute pointer-events-none"
          style={{
            top: "35%", right: "-8%",
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(201,150,58,0.14) 0%, transparent 70%)",
            filter: "blur(120px)",
            borderRadius: "50%",
          }}
        />
        <div
          className="orb-float-slow absolute pointer-events-none"
          style={{
            bottom: "5%", left: "5%",
            width: 350, height: 350,
            background: "radial-gradient(circle, rgba(107,26,42,0.18) 0%, transparent 70%)",
            filter: "blur(90px)",
            borderRadius: "50%",
          }}
        />

        {/* ── HEADER (unchanged logic, luxury skin) ── */}
        <header
          className="w-full max-w-6xl mx-auto px-6 py-5 flex justify-between items-center z-10 relative"
          style={{ borderBottom: "1px solid rgba(201,150,58,0.08)" }}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Activity className="w-7 h-7 transition-transform group-hover:scale-110" style={{ color: "#C9963A" }} />
              <div className="absolute inset-0 blur-lg rounded-full" style={{ background: "rgba(201,150,58,0.25)" }} />
            </div>
            <span className="text-xl font-extrabold tracking-tighter" style={{ color: "#F0E6D3", fontFamily: "'Georgia', serif" }}>
              LIFEMAXXER<span className="gold-shimmer">.AI</span>
            </span>
          </Link>
          <nav className="flex gap-3">
            <Link href="/audit">
              <Button
                variant="outline"
                className="transition-all"
                style={{
                  border: "1px solid rgba(201,150,58,0.3)",
                  color: "#E0B96A",
                  background: "rgba(201,150,58,0.06)",
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.03em",
                }}
              >
                Start Audit
              </Button>
            </Link>
          </nav>
        </header>

        <main className="flex-1 w-full flex flex-col items-center relative z-10 px-6">

          {/* ── HERO (original JSX, upgraded colours) ── */}
          <div className="max-w-4xl mx-auto text-center mt-16 md:mt-28 mb-28 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="gold-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-sm">
                <Flame className="w-3.5 h-3.5" style={{ color: "#C9963A" }} />
                100% Free · No Signup · Brutally Honest
              </div>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.05]"
                style={{ color: "#F0E6D3", fontFamily: "'Georgia', serif" }}
              >
                Stop lying<br className="hidden md:block" /> to yourself.{" "}
                <br />
                <span className="text-gradient-luxury">
                  Look in the mirror.
                </span>
              </h1>
              <p
                className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                style={{ color: "#8A7C6A", fontFamily: "'Georgia', serif" }}
              >
                An elite, AI-powered evaluation of your looks, fitness, discipline,
                and finances. Get brutally honest scores and a strict 30-day
                transformation protocol.{" "}
                <span style={{ color: "#C9963A", fontWeight: 500 }}>No paywalls. No sugarcoating.</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/audit">
                  <Button
                    variant="premium"
                    size="lg"
                    className="w-full sm:w-auto group text-base px-8"
                    style={{
                      background: "linear-gradient(135deg, #8B1D3A 0%, #C9963A 100%)",
                      color: "#F5ECD7",
                      border: "none",
                      boxShadow: "0 4px 32px rgba(139,29,58,0.4), 0 1px 0 rgba(255,255,255,0.08) inset",
                      fontFamily: "'Georgia', serif",
                      letterSpacing: "0.03em",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 48px rgba(139,29,58,0.6), 0 1px 0 rgba(255,255,255,0.1) inset")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 32px rgba(139,29,58,0.4), 0 1px 0 rgba(255,255,255,0.08) inset")}
                  >
                    Start Your Free Audit
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="text-xs" style={{ color: "#5A4D3D" }}>
                  Takes 2 minutes. Prepare for reality.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── STATS ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto mb-28"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="stat-luxury rounded-2xl p-6 text-center"
                >
                  <p className="text-3xl md:text-4xl font-black mb-1 gold-shimmer">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "#5A4D3D", fontFamily: "'Georgia', serif" }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* gold divider */}
          <div className="gold-divider mb-28" />

          {/* ── HOW IT WORKS ── */}
          <section className="w-full max-w-5xl mx-auto mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "#F0E6D3", fontFamily: "'Georgia', serif" }}
              >
                How It Works
              </h2>
              <p style={{ color: "#5A4D3D", fontFamily: "'Georgia', serif" }} className="max-w-lg mx-auto">
                Three steps. Two minutes. One wake-up call.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Answer Honestly", desc: "Fill out a 5-section deep audit covering your physical state, habits, finances, social life, and goals. No faking allowed.", icon: "📝" },
                { step: "02", title: "AI Analyzes You", desc: "Our AI processes your data through behavioral psychology frameworks and returns a comprehensive, brutally honest assessment.", icon: "🧠" },
                { step: "03", title: "Get Your Protocol", desc: "Receive dimension scores, hidden psychological insights, prioritized fixes, and a custom 30-day action plan.", icon: "⚡" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="step-card relative p-8 rounded-2xl backdrop-blur-sm group"
                >
                  <div
                    className="absolute top-6 right-6 text-6xl font-black select-none"
                    style={{ color: "rgba(201,150,58,0.08)", fontFamily: "'Georgia', serif" }}
                  >
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#E0B96A", fontFamily: "'Georgia', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6A5E4E" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* gold divider */}
          <div className="gold-divider mb-28" />

          {/* ── BEFORE & AFTER ── */}
          <section className="w-full max-w-5xl mx-auto mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "#F0E6D3", fontFamily: "'Georgia', serif" }}
              >
                The Before &amp; After
              </h2>
              <p style={{ color: "#5A4D3D", fontFamily: "'Georgia', serif" }} className="max-w-lg mx-auto">
                Which side are you on?
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="phase-before relative group overflow-hidden rounded-2xl border p-8 text-left transition-colors"
              >
                <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full" style={{ background: "rgba(139,29,58,0.1)" }} />
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: "#C17070", fontFamily: "'Georgia', serif" }}>
                  <ShieldAlert className="w-5 h-5" /> Phase 1: Delusion
                </h3>
                <ul className="space-y-4" style={{ color: "#6A5E4E" }}>
                  {["6+ hours screen time daily","Relying on motivation, no systems","Bleeding money on micro-transactions",'"I\'ll start on Monday" mindset',"Comparing yourself to others constantly"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-lg" style={{ color: "#8B1D3A" }}>✕</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="phase-after relative group overflow-hidden rounded-2xl border p-8 text-left transition-colors"
              >
                <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full" style={{ background: "rgba(201,150,58,0.08)" }} />
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: "#C9963A", fontFamily: "'Georgia', serif" }}>
                  <Flame className="w-5 h-5" /> Phase 2: Locked In
                </h3>
                <ul className="space-y-4" style={{ color: "#6A5E4E" }}>
                  {["Deep work blocks. Zero distractions.","Lifting heavy 4x a week","High-value networking & building assets","Cold, objective self-awareness","Every rupee tracked, every minute counted"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-lg" style={{ color: "#C9963A" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* ── FEATURES GRID ── */}
          <section className="w-full max-w-6xl mx-auto mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "#F0E6D3", fontFamily: "'Georgia', serif" }}
              >
                What You Get
              </h2>
              <p style={{ color: "#5A4D3D", fontFamily: "'Georgia', serif" }} className="max-w-lg mx-auto">
                Every audit includes all of this. For free. Forever.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, i) => {
                const colors = colorMap[feature.color];
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`card-luxury p-7 rounded-2xl backdrop-blur-sm`}
                  >
                    <div className={`mb-5 w-12 h-12 rounded-xl flex items-center justify-center border ${colors}`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#E0B96A", fontFamily: "'Georgia', serif" }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6A5E4E" }}>{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* gold divider */}
          <div className="gold-divider mb-28" />

          {/* ─────────────────────────────────────────────────────
              ✨ NEW SECTION — ABOUT THE FOUNDER
          ───────────────────────────────────────────────────── */}
          <section className="w-full max-w-5xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p
                className="text-xs uppercase tracking-[0.25em] mb-3"
                style={{ color: "#C9963A", fontFamily: "'Georgia', serif" }}
              >
                The Person Behind It
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#F0E6D3", fontFamily: "'Georgia', serif" }}
              >
                Meet the Founder
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">

              {/* LEFT — Founder card */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center md:items-start gap-7 card-luxury rounded-3xl p-10"
              >
                {/* Rotating gold ring avatar */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <div className="founder-ring absolute inset-0" />
                  {/* Inner image placeholder */}
                  <div
                    className="absolute inset-[3px] rounded-full flex items-center justify-center text-4xl select-none"
                    style={{
                      background: "linear-gradient(135deg, #1E1410 0%, #2A1A14 100%)",
                      border: "1px solid rgba(201,150,58,0.15)",
                    }}
                  >
                    <Image
    src="/images/founder.jpg"
    alt="Founder"
    fill
    className="object-cover rounded-full"
  />
                  </div>
                </div>

                {/* Founder info */}
                <div>
                  <h3
                    className="text-2xl font-black mb-1"
                    style={{ color: "#E0B96A", fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
                  >
                    Tanish Ghadge
                  </h3>
                  <p
                    className="text-xs uppercase tracking-widest mb-4"
                    style={{ color: "#6A5E4E", fontFamily: "'Georgia', serif" }}
                  >
                    Founder · LifeMaxxer AI
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#7A6E5E", fontFamily: "'Georgia', serif" }}
                  >
I was tired of self-improvement advice that sounded good but changed nothing.

So I built a system that tells the truth.
Even when it hurts.                  </p>
                </div>

                {/* Small social proof strip */}
                <div className="flex gap-4 text-xs" style={{ color: "#5A4D3D", fontFamily: "'Georgia', serif" }}>
                  <span>📍 Pune, India</span>
                  <span>·</span>
                  <span>3+ years building</span>
                  <span>·</span>
                  <span>10K+ lives audited</span>
                </div>
              </motion.div>

              {/* RIGHT — Founder's Journey card */}
              {/* ─────────────────────────────────────────────────────
                  ✨ NEW SECTION — FOUNDER'S JOURNEY PANEL
              ───────────────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="journey-card rounded-3xl p-10 h-full"
              >
                {/* Title row */}
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(201,150,58,0.15)", border: "1px solid rgba(201,150,58,0.25)" }}
                  >
                    <Quote className="w-4 h-4" style={{ color: "#C9963A" }} />
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "#E0B96A", fontFamily: "'Georgia', serif", letterSpacing: "-0.01em" }}
                  >
                    The Journey
                  </h3>
                </div>

                {/* Story paragraphs */}
                <div className="space-y-5" style={{ fontFamily: "'Georgia', serif" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "#7A6E5E" }}>
                    At 19, Tanish scored a 4.1 out of 10 on his own life audit. He was skipping the gym, bleeding money on impulse buys, and telling himself he'd "fix it next month." The loop never ended — until he started writing down every score, every habit, every rupee.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#7A6E5E" }}>
                    The data was humiliating. It was also the first honest conversation he'd had with himself in years. Started out lost in a sea of generic advice, trying everything and getting nowhere.
Turned frustration into fuel — cut through the noise, tested everything on himself, and kept only what actually worked. Within 90 days, his scores climbed to 7.4. Not because he found motivation — but because he stopped hiding from the numbers.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#7A6E5E" }}>
                    LifeMaxxer was built for that 19-year-old. For every person who suspects they're not living up to their potential but doesn't have a mirror honest enough to show them why. No coaches. No paywalls. Just the truth.
                  </p>
                </div>

                {/* Pull quote */}
                <div
                  className="mt-8 pl-5 py-1"
                  style={{ borderLeft: "2px solid rgba(201,150,58,0.4)" }}
                >
                  <p
                    className="text-sm italic"
                    style={{ color: "#C9963A", fontFamily: "'Georgia', serif" }}
                  >
                    "The data doesn't care about your feelings. And neither does your potential. Build brick for brick"
                  </p>
                  <p
                    className="text-xs mt-2"
                    style={{ color: "#5A4D3D", fontFamily: "'Georgia', serif" }}
                  >
                    — Tanish 
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
          {/* ─── END NEW SECTIONS ─── */}

          {/* gold divider */}
          <div className="gold-divider mb-28" />

          {/* ── CTA ── */}
          <section className="w-full max-w-3xl mx-auto mb-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="cta-premium relative p-12 rounded-3xl border overflow-hidden"
            >
              <div className="absolute inset-0 blur-3xl rounded-full" style={{ background: "rgba(139,29,58,0.08)" }} />
              <div className="relative z-10">
                <h2
                  className="text-3xl md:text-4xl font-black mb-4"
                  style={{ color: "#F0E6D3", fontFamily: "'Georgia', serif" }}
                >
                  Ready to face reality?
                </h2>
                <p
                  className="max-w-md mx-auto mb-8 text-sm leading-relaxed"
                  style={{ color: "#6A5E4E", fontFamily: "'Georgia', serif" }}
                >
                  Most people avoid the truth. The ones who don&#39;t are the ones who actually change. Which one are you?
                </p>
                <Link href="/audit">
                  <Button
                    variant="premium"
                    size="lg"
                    className="group text-base px-8"
                    style={{
                      background: "linear-gradient(135deg, #8B1D3A 0%, #C9963A 100%)",
                      color: "#F5ECD7",
                      border: "none",
                      boxShadow: "0 4px 32px rgba(139,29,58,0.4)",
                      fontFamily: "'Georgia', serif",
                      letterSpacing: "0.03em",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 48px rgba(139,29,58,0.65)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 32px rgba(139,29,58,0.4)")}
                  >
                    Take The Audit Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer
          className="w-full py-8 text-center text-sm relative z-10"
          style={{
            borderTop: "1px solid rgba(201,150,58,0.1)",
            color: "#3A3025",
            fontFamily: "'Georgia', serif",
          }}
        >
          <p>
            © {new Date().getFullYear()} LifeMaxxer AI. All rights reserved. Do the work.
          </p>
        </footer>
      </div>
    </>
  );
}