"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ScoreRing } from "@/components/ui/score-ring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Target,
  Share2,
  RotateCcw,
  Activity,
  Download,
  Flame,
  Eye,
  EyeOff,
} from "lucide-react";

/* ─────────────────────────────────────────────
   ALL ORIGINAL LOGIC — UNTOUCHED
───────────────────────────────────────────── */
const scoreColors: Record<string, string> = {
  overall:    "#10b981",
  fitness:    "#ef4444",
  looks:      "#3b82f6",
  discipline: "#8b5cf6",
  finance:    "#f59e0b",
  social:     "#ec4899",
};

function getScoreColor(score: number, baseColor: string): string {
  if (score < 4) return "#ef4444";
  if (score < 6) return "#f59e0b";
  return baseColor;
}

export default function Dashboard() {
  const { id }    = useParams();
  const router    = useRouter();
  const [report,     setReport]     = useState<any>(null);
  const [loading,    setLoading]    = useState(true);
  const [copied,     setCopied]     = useState(false);
  const [showIssues, setShowIssues] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      let found = false;

      if (supabase && typeof id === "string") {
        const { data, error } = await supabase
          .from("reports").select("*").eq("id", id).single();
        if (data) { setReport(data); found = true; }
        else console.log("Supabase fetch failed, trying localStorage:", error);
      }

      if (!found && typeof id === "string") {
        try {
          const reports = JSON.parse(localStorage.getItem("lifemaxxer_reports") || "{}");
          if (reports[id]) { setReport(reports[id]); found = true; }
        } catch (e) { console.error("localStorage parse error:", e); }
      }

      if (!found) {
        setReport({
          ai_response: {
            scores: { looks: 6.5, fitness: 4.0, discipline: 3.5, social: 7.0, finance: 5.5, overall: 5.3 },
            analysis: "You are coasting on basic potential. You have okay social skills and aren't completely broke, but your fitness is a joke and your discipline relies purely on fleeting motivation. You keep telling yourself you'll start next week, but next week never comes.",
            hidden_issues: [
              "You use doomscrolling as a coping mechanism for anxiety about the future.",
              "You mistake being 'busy' with your phone for actual productive work.",
              "You seek cheap dopamine instead of doing the hard, boring work that matters.",
            ],
            priorities: [
              "Eliminate processed sugar and start lifting 4x a week.",
              "Implement a strict 10 PM phone cutoff — no exceptions.",
              "Track every single rupee spent via UPI to realize how much you waste.",
            ],
            thirty_day_protocol: {
              week1: ["Zero junk food. No Swiggy/Zomato.", "Lift weights 4x this week.", "Read 10 pages of a book daily."],
              week2: ["Add 30 min cardio.", "Start tracking expenses.", "No social media before 12 PM."],
              week3: ["Network with 2 ambitious individuals.", "Increase lifting weight by 5%.", "Journal 5 minutes every night."],
              week4: ["Review all progress objectively.", "Lock in the new identity.", "Plan the next 30 days."],
            },
            indian_context_advice: "Stop relying on hostel maggi and outside food. The cheap oil is destroying your testosterone. Also, your habit of paying ₹150 here and ₹100 there on UPI is bleeding your allowance dry. Start cooking basic meals and use YNAB or Walnut to track every transaction.",
            future_projection: {
              if_followed: "In 6 months, you will be visibly leaner, financially stable, and operating with a locked-in mindset. People will notice the change and start asking what happened.",
              if_ignored:  "In 5 years, you will be exactly where you are now, just older, more tired, and full of regret watching your peers surpass you.",
            },
          },
        });
      }
      setLoading(false);
    }
    fetchReport();
  }, [id]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <>
        <style>{`
          @keyframes orb-float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.04)} }
          .orb-a{animation:orb-float 10s ease-in-out infinite}
          .orb-b{animation:orb-float 14s ease-in-out infinite 3s}
          @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
          .gold-spin{color:#C9963A}
        `}</style>
        <div
          className="min-h-screen flex flex-col items-center justify-center gap-5 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg,#0F0B09 0%,#160E0B 40%,#0D0A08 100%)" }}
        >
          <div className="orb-a absolute pointer-events-none" style={{ top:"-5%",right:"10%",width:500,height:500,background:"radial-gradient(circle,rgba(139,29,58,0.18) 0%,transparent 70%)",filter:"blur(100px)",borderRadius:"50%" }} />
          <div className="orb-b absolute pointer-events-none" style={{ bottom:"5%",left:"-5%",width:400,height:400,background:"radial-gradient(circle,rgba(201,150,58,0.1) 0%,transparent 70%)",filter:"blur(110px)",borderRadius:"50%" }} />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="relative">
              <Activity className="w-10 h-10 gold-spin animate-spin" />
              <div className="absolute inset-0 blur-xl rounded-full" style={{ background:"rgba(201,150,58,0.2)" }} />
            </div>
            <p className="animate-pulse" style={{ color:"#C9963A",fontFamily:"'Georgia',serif",letterSpacing:"0.06em",fontSize:"0.875rem" }}>
              Retrieving your analysis...
            </p>
          </div>
        </div>
      </>
    );
  }

  /* ── Not found state ── */
  if (!report) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background:"linear-gradient(160deg,#0F0B09 0%,#160E0B 100%)" }}
      >
        <AlertTriangle className="w-10 h-10" style={{ color:"#C17070" }} />
        <p style={{ color:"#C17070",fontFamily:"'Georgia',serif" }}>Report not found.</p>
        <Link href="/audit">
          <button
            style={{ border:"1px solid rgba(201,150,58,0.3)",color:"#C9963A",background:"rgba(201,150,58,0.08)",padding:"0.5rem 1.25rem",borderRadius:"0.75rem",fontFamily:"'Georgia',serif",cursor:"pointer" }}
          >
            Take New Audit
          </button>
        </Link>
      </div>
    );
  }

  const { ai_response } = report;

  const handleShare = () => {
    const text = `I got rated ${ai_response.scores.overall}/10 by LifeMaxxer AI 💀\n\nFitness: ${ai_response.scores.fitness}/10\nLooks: ${ai_response.scores.looks}/10\nDiscipline: ${ai_response.scores.discipline}/10\nFinance: ${ai_response.scores.finance}/10\nSocial: ${ai_response.scores.social}/10\n\nGet exposed: lifemaxxer.ai`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const overallScore = ai_response.scores.overall;
  const scoreVerdict =
    overallScore >= 8 ? "Elite" :
    overallScore >= 6 ? "Above Average" :
    overallScore >= 4 ? "Mediocre" : "Critical";
  const verdictColor =
    overallScore >= 8 ? "#6EE7B7" :
    overallScore >= 6 ? "#93C5FD" :
    overallScore >= 4 ? "#FCD34D" : "#FCA5A5";

  return (
    <>
      {/* ══════════════════════════════════════
          PREMIUM GLOBAL STYLES
      ══════════════════════════════════════ */}
      <style>{`
        :root {
          --wine:      #6B1A2A;
          --burgundy:  #8B1D3A;
          --gold:      #C9963A;
          --gold-soft: #E0B96A;
          --ink:       #0F0B09;
          --surface:   #18110E;
          --surface2:  #201510;
          --text-main: #F0E6D3;
          --text-dim:  #7A6E5E;
          --text-faint:#4A3D30;
        }

        /* Noise grain */
        .dash-noise::after {
          content:"";
          position:fixed;
          inset:0;
          z-index:0;
          pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          background-size:200px 200px;
          opacity:0.5;
        }

        @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        .gold-text{
          background:linear-gradient(90deg,#C9963A 0%,#E8C97A 40%,#C9963A 60%,#A07020 100%);
          background-size:400px 100%;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 4s linear infinite;
        }

        @keyframes orb-float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-24px) scale(1.05)}}
        .orb-a{animation:orb-float 10s ease-in-out infinite}
        .orb-b{animation:orb-float 14s ease-in-out infinite 3s}
        .orb-c{animation:orb-float 18s ease-in-out infinite 6s}

        /* Score card */
        .score-card-luxury {
          background:linear-gradient(145deg,#1E1812 0%,#150F0C 100%);
          border:1px solid rgba(201,150,58,0.14);
          border-radius:1.25rem;
          transition:all 0.3s ease;
        }
        .score-card-luxury:hover {
          border-color:rgba(201,150,58,0.35);
          box-shadow:0 0 36px rgba(139,29,58,0.18),0 8px 28px rgba(0,0,0,0.45);
          transform:translateY(-3px);
        }
        .score-card-overall {
          background:linear-gradient(145deg,rgba(201,150,58,0.08) 0%,rgba(26,20,12,0.95) 100%);
          border:1px solid rgba(201,150,58,0.28);
          box-shadow:0 0 40px rgba(201,150,58,0.1);
        }

        /* Glass panel cards */
        .glass-card-luxury {
          background:linear-gradient(145deg,rgba(32,21,16,0.92) 0%,rgba(20,12,9,0.96) 100%);
          border:1px solid rgba(201,150,58,0.13);
          backdrop-filter:blur(20px);
          -webkit-backdrop-filter:blur(20px);
          box-shadow:0 0 0 1px rgba(201,150,58,0.05) inset,0 20px 60px rgba(0,0,0,0.5);
          transition:border-color 0.3s ease,box-shadow 0.3s ease;
        }
        .glass-card-luxury:hover {
          border-color:rgba(201,150,58,0.22);
          box-shadow:0 0 0 1px rgba(201,150,58,0.08) inset,0 24px 64px rgba(0,0,0,0.55),0 0 60px rgba(139,29,58,0.1);
        }

        /* Hidden issues card */
        .card-issues {
          background:linear-gradient(145deg,rgba(139,29,58,0.1) 0%,rgba(18,10,8,0.97) 100%);
          border:1px solid rgba(139,29,58,0.25);
          backdrop-filter:blur(20px);
          transition:all 0.3s ease;
        }
        .card-issues:hover { border-color:rgba(139,29,58,0.42); }

        /* Priorities card */
        .card-priorities {
          background:linear-gradient(145deg,rgba(201,150,58,0.07) 0%,rgba(18,12,8,0.97) 100%);
          border:1px solid rgba(201,150,58,0.2);
          backdrop-filter:blur(20px);
          box-shadow:0 0 40px rgba(201,150,58,0.06);
        }

        /* Week cards */
        .week-card {
          background:linear-gradient(145deg,#1A1108 0%,#130D09 100%);
          border:1px solid rgba(201,150,58,0.1);
          transition:all 0.28s ease;
          border-radius:1rem;
        }
        .week-card:hover {
          border-color:rgba(201,150,58,0.32);
          box-shadow:0 0 30px rgba(139,29,58,0.14);
          transform:translateY(-3px);
        }
        .week-header {
          background:rgba(10,7,5,0.6);
          border-bottom:1px solid rgba(201,150,58,0.1);
          border-radius:1rem 1rem 0 0;
        }

        /* Future projection cards */
        .card-ignored {
          background:linear-gradient(145deg,rgba(139,29,58,0.1) 0%,rgba(12,8,8,0.98) 100%);
          border:1px solid rgba(139,29,58,0.22);
          backdrop-filter:blur(16px);
        }
        .card-followed {
          background:linear-gradient(145deg,rgba(201,150,58,0.07) 0%,rgba(10,14,10,0.98) 100%);
          border:1px solid rgba(201,150,58,0.22);
          backdrop-filter:blur(16px);
          box-shadow:0 0 40px rgba(201,150,58,0.07);
        }

        /* Action buttons */
        .btn-action {
          background:rgba(20,13,9,0.9);
          border:1px solid rgba(201,150,58,0.18);
          color:#9A8A78;
          font-family:'Georgia',serif;
          font-size:0.8rem;
          letter-spacing:0.03em;
          padding:0.45rem 1rem;
          border-radius:0.75rem;
          display:inline-flex;
          align-items:center;
          gap:0.4rem;
          cursor:pointer;
          transition:all 0.22s ease;
        }
        .btn-action:hover {
          border-color:rgba(201,150,58,0.4);
          color:#C9963A;
          background:rgba(201,150,58,0.07);
          box-shadow:0 0 16px rgba(201,150,58,0.1);
        }

        /* Premium CTA */
        .btn-cta-primary {
          background:linear-gradient(135deg,#8B1D3A 0%,#C9963A 100%);
          color:#F5ECD7;
          border:none;
          font-family:'Georgia',serif;
          letter-spacing:0.04em;
          padding:0.65rem 1.5rem;
          border-radius:0.875rem;
          display:inline-flex;
          align-items:center;
          gap:0.5rem;
          cursor:pointer;
          box-shadow:0 4px 24px rgba(139,29,58,0.4);
          transition:all 0.25s ease;
        }
        .btn-cta-primary:hover {
          box-shadow:0 6px 40px rgba(139,29,58,0.6),0 0 24px rgba(201,150,58,0.18);
          transform:translateY(-1px) scale(1.01);
        }

        /* Gold divider */
        .gold-hr {
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(201,150,58,0.22),transparent);
          margin:0;
        }

        /* Section title */
        .section-title {
          font-family:'Georgia',serif;
          font-weight:800;
          letter-spacing:-0.02em;
          color:#F0E6D3;
        }

        /* Field label */
        .field-label {
          font-family:'Georgia',serif;
          font-size:0.7rem;
          letter-spacing:0.1em;
          text-transform:uppercase;
          color:#5A4D3D;
        }

        /* Analysis text */
        .analysis-text {
          font-family:'Georgia',serif;
          font-size:0.9375rem;
          line-height:1.8;
          color:#9A8A78;
        }

        /* Priority number badge */
        .priority-num {
          width:1.6rem;
          height:1.6rem;
          border-radius:50%;
          background:linear-gradient(135deg,rgba(201,150,58,0.15),rgba(139,29,58,0.15));
          border:1px solid rgba(201,150,58,0.25);
          color:#C9963A;
          font-size:0.7rem;
          font-weight:700;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          font-family:'Georgia',serif;
        }

        /* Cultural context box */
        .cultural-box {
          background:linear-gradient(135deg,rgba(201,150,58,0.07),rgba(139,29,58,0.07));
          border:1px solid rgba(201,150,58,0.18);
          border-radius:0.875rem;
          padding:1rem 1.25rem;
          margin-top:1.5rem;
        }

        /* Eye toggle */
        .eye-btn {
          background:transparent;
          border:1px solid rgba(201,150,58,0.15);
          color:#5A4D3D;
          padding:0.25rem 0.4rem;
          border-radius:0.5rem;
          cursor:pointer;
          transition:all 0.2s ease;
        }
        .eye-btn:hover {
          border-color:rgba(201,150,58,0.35);
          color:#C9963A;
        }

        /* Header border */
        .header-border {
          border-bottom:1px solid rgba(201,150,58,0.08);
        }

        /* Week number badge */
        .week-num {
          width:1.5rem;
          height:1.5rem;
          border-radius:0.4rem;
          background:rgba(201,150,58,0.12);
          border:1px solid rgba(201,150,58,0.2);
          color:#C9963A;
          font-size:0.7rem;
          display:flex;
          align-items:center;
          justify-content:center;
          font-family:'Courier New',monospace;
        }

        /* Print */
        @media print {
          .no-print { display:none !important; }
          body { background:#fff !important; color:#000 !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          PREMIUM BACKGROUND
      ══════════════════════════════════════ */}
      <div
        className="dash-noise min-h-screen relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg,#0F0B09 0%,#160E0B 30%,#120A0D 65%,#0D0A08 100%)",
          fontFamily: "'Georgia',serif",
        }}
      >
        {/* Ambient orbs */}
        <div className="orb-a absolute pointer-events-none" style={{ top:"-5%",right:"8%",width:560,height:560,background:"radial-gradient(circle,rgba(139,29,58,0.18) 0%,transparent 70%)",filter:"blur(110px)",borderRadius:"50%" }} />
        <div className="orb-b absolute pointer-events-none" style={{ bottom:"10%",left:"-5%",width:440,height:440,background:"radial-gradient(circle,rgba(201,150,58,0.11) 0%,transparent 70%)",filter:"blur(120px)",borderRadius:"50%" }} />
        <div className="orb-c absolute pointer-events-none" style={{ top:"45%",left:"35%",width:300,height:300,background:"radial-gradient(circle,rgba(107,26,42,0.09) 0%,transparent 70%)",filter:"blur(80px)",borderRadius:"50%" }} />

        <div className="relative z-10 p-6 md:p-10">
          <div className="max-w-6xl mx-auto space-y-10">

            {/* ── HEADER ── */}
            <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 header-border pb-6">
              <div>
                <Link href="/" className="inline-flex items-center gap-2 mb-4 transition-opacity hover:opacity-75">
                  <Activity className="w-4 h-4" style={{ color:"#C9963A" }} />
                  <span className="font-extrabold tracking-tight" style={{ color:"#F0E6D3",fontSize:"1rem" }}>
                    LIFEMAXXER<span className="gold-text">.AI</span>
                  </span>
                </Link>
                <h1 className="section-title text-3xl md:text-4xl">
                  Your Reality Check
                </h1>
                <p className="mt-1.5 flex items-center gap-2" style={{ color:"#5A4D3D",fontSize:"0.875rem" }}>
                  Verdict:{" "}
                  <span className="font-bold" style={{ color: verdictColor, fontFamily:"'Georgia',serif" }}>
                    {scoreVerdict}
                  </span>
                </p>
              </div>

              {/* Action buttons row */}
              <div className="flex flex-wrap items-center gap-2.5 no-print">
                <button className="btn-action" onClick={() => window.print()}>
                  <Download className="w-3.5 h-3.5" /> Save PDF
                </button>
                <button className="btn-action" onClick={handleShare}>
                  {copied
                    ? <><CheckCircle className="w-3.5 h-3.5" style={{ color:"#6EE7B7" }} /> Copied!</>
                    : <><Share2 className="w-3.5 h-3.5" /> Share Score</>
                  }
                </button>
                <button
                  className="btn-action"
                  onClick={() => {
                    const text = `I got rated ${ai_response.scores.overall}/10 by LifeMaxxer AI 💀\n\nFitness: ${ai_response.scores.fitness}/10\nLooks: ${ai_response.scores.looks}/10\nDiscipline: ${ai_response.scores.discipline}/10\nFinance: ${ai_response.scores.finance}/10\nSocial: ${ai_response.scores.social}/10\n\nGet exposed: lifemaxxer.ai`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Post to X
                </button>
                <button className="btn-action" onClick={() => router.push("/audit")}>
                  <RotateCcw className="w-3.5 h-3.5" /> Re-Audit
                </button>
              </div>
            </header>

            {/* ── SCORE CARDS ── */}
            <section>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(ai_response.scores).map(([key, score]: [string, any], index) => (
                  <motion.div
                    key={key}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <div
                      className={`flex flex-col items-center p-5 ${
                        key === "overall" ? "score-card-overall" : "score-card-luxury"
                      }`}
                      style={{ borderRadius: "1.25rem" }}
                    >
                      <ScoreRing
                        score={score}
                        size={90}
                        label={key.toUpperCase()}
                        color={getScoreColor(score, scoreColors[key] || "#10b981")}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <div className="space-y-8">

              {/* ── EXECUTIVE SUMMARY + HIDDEN ISSUES ── */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Executive summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card-luxury rounded-2xl h-full"
                >
                  <div className="px-7 pt-7 pb-4">
                    <h3 className="flex items-center gap-2 mb-1" style={{ color:"#E0B96A",fontFamily:"'Georgia',serif",fontWeight:700,fontSize:"1rem" }}>
                      <Target className="w-4 h-4" style={{ color:"#93C5FD" }} /> Executive Summary
                    </h3>
                  </div>
                  <div className="gold-hr mx-7" />
                  <div className="px-7 pb-7 pt-5">
                    <p className="analysis-text">{ai_response.analysis}</p>
                    {ai_response.indian_context_advice && (
                      <div className="cultural-box">
                        <p className="flex items-center gap-1.5 mb-2" style={{ color:"#C9963A",fontSize:"0.75rem",fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",fontFamily:"'Georgia',serif" }}>
                          <Flame className="w-3.5 h-3.5" /> Cultural Reality Check
                        </p>
                        <p className="analysis-text" style={{ fontSize:"0.875rem" }}>
                          {ai_response.indian_context_advice}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Hidden issues */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="card-issues rounded-2xl h-full"
                >
                  <div className="px-7 pt-7 pb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2" style={{ color:"#C17070",fontFamily:"'Georgia',serif",fontWeight:700,fontSize:"1rem" }}>
                      <AlertTriangle className="w-4 h-4" /> Hidden Issues
                    </h3>
                    <button className="eye-btn" onClick={() => setShowIssues(!showIssues)}>
                      {showIssues ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="gold-hr mx-7" style={{ background:"linear-gradient(90deg,transparent,rgba(139,29,58,0.3),transparent)" }} />
                  <div className="px-7 pb-7 pt-5">
                    {showIssues ? (
                      <ul className="space-y-5">
                        {ai_response.hidden_issues.map((issue: string, i: number) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex gap-3"
                            style={{ color:"#9A8A78",fontFamily:"'Georgia',serif",fontSize:"0.9rem",lineHeight:1.7 }}
                          >
                            <span style={{ color:"#8B1D3A",marginTop:"0.2rem",flexShrink:0,fontWeight:700 }}>✕</span>
                            {issue}
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color:"#4A3D30",fontStyle:"italic",fontFamily:"'Georgia',serif",fontSize:"0.875rem" }}>
                        Hidden — click the eye icon to reveal.
                      </p>
                    )}
                  </div>
                </motion.div>
              </section>

              {/* ── PRIORITIES ── */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card-priorities rounded-2xl"
              >
                <div className="px-7 pt-7 pb-4">
                  <h3 className="flex items-center gap-2" style={{ color:"#C9963A",fontFamily:"'Georgia',serif",fontWeight:700,fontSize:"1rem" }}>
                    <CheckCircle className="w-4 h-4" /> Highest Leverage Priorities
                  </h3>
                </div>
                <div className="gold-hr mx-7" />
                <div className="px-7 pb-7 pt-5">
                  <ul className="space-y-4">
                    {ai_response.priorities.map((priority: string, i: number) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex gap-3 items-start"
                        style={{ color:"#9A8A78",fontFamily:"'Georgia',serif",fontSize:"0.9rem",lineHeight:1.7 }}
                      >
                        <span className="priority-num">{i + 1}</span>
                        {priority}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.section>

              {/* ── 30-DAY PROTOCOL ── */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="section-title text-xl mb-6 flex items-center gap-2">
                  <Flame className="w-5 h-5" style={{ color:"#C9963A" }} /> The 30-Day Protocol
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(ai_response.thirty_day_protocol).map(([week, tasks]: [string, any], index) => (
                    <motion.div
                      key={week}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="week-card h-full"
                    >
                      <div className="week-header px-5 py-4 flex items-center gap-2">
                        <span className="week-num">{index + 1}</span>
                        <span style={{ fontFamily:"'Courier New',monospace",fontSize:"0.7rem",color:"#C9963A",textTransform:"uppercase",letterSpacing:"0.1em" }}>
                          Week {index + 1}
                        </span>
                      </div>
                      <div className="px-5 py-5">
                        <ul className="space-y-3">
                          {tasks.map((task: string, i: number) => (
                            <li key={i} className="flex items-start gap-2" style={{ color:"#7A6E5E",fontFamily:"'Georgia',serif",fontSize:"0.82rem",lineHeight:1.65 }}>
                              <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color:"#4A3D30" }} />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* ── FUTURE PROJECTION ── */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="card-ignored rounded-2xl">
                  <div className="p-8">
                    <h3 className="flex items-center gap-2 mb-5" style={{ color:"rgba(193,112,112,0.7)",fontFamily:"'Georgia',serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase" }}>
                      <AlertTriangle className="w-4 h-4" /> If You Do Nothing
                    </h3>
                    <p style={{ color:"rgba(192,100,100,0.85)",fontFamily:"'Georgia',serif",fontSize:"1.0625rem",lineHeight:1.8,fontStyle:"italic" }}>
                      &quot;{ai_response.future_projection.if_ignored}&quot;
                    </p>
                  </div>
                </div>
                <div className="card-followed rounded-2xl">
                  <div className="p-8">
                    <h3 className="flex items-center gap-2 mb-5" style={{ color:"rgba(201,150,58,0.7)",fontFamily:"'Georgia',serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase" }}>
                      <CheckCircle className="w-4 h-4" /> If You Execute
                    </h3>
                    <p style={{ color:"#C9963A",fontFamily:"'Georgia',serif",fontSize:"1.0625rem",lineHeight:1.8,fontStyle:"italic" }}>
                      &quot;{ai_response.future_projection.if_followed}&quot;
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* ── BOTTOM CTA ── */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-center pt-4 pb-8 no-print"
              >
                <p style={{ color:"#4A3D30",fontSize:"0.875rem",fontFamily:"'Georgia',serif",marginBottom:"1.25rem",letterSpacing:"0.03em" }}>
                  Your move. The protocol is in your hands.
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <button className="btn-cta-primary" onClick={() => router.push("/audit")}>
                    <RotateCcw className="w-4 h-4" /> Take Another Audit
                  </button>
                  <button className="btn-action" style={{ padding:"0.65rem 1.25rem" }} onClick={handleShare}>
                    <Share2 className="w-4 h-4" /> Share Results
                  </button>
                </div>
              </motion.section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}