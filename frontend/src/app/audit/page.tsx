"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  Target,
  AlertTriangle,
  Activity,
  Dumbbell,
  Clock,
  Wallet,
  Users,
  Crosshair,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

/* ─────────────────────────────────────────────
   ALL ORIGINAL LOGIC — UNTOUCHED
───────────────────────────────────────────── */
const steps = [
  { id: "physical",   title: "Physical & Biology",  icon: Dumbbell,  color: "emerald" },
  { id: "discipline", title: "Habits & Discipline",  icon: Clock,     color: "purple"  },
  { id: "wealth",     title: "Wealth & Ambition",    icon: Wallet,    color: "amber"   },
  { id: "social",     title: "Social Value",         icon: Users,     color: "blue"    },
  { id: "goals",      title: "Your Objectives",      icon: Crosshair, color: "red"     },
];

const badHabitOptions = [
  "Doom-Scrolling","Smoking / Vaping","Binge Eating Junk","Excessive Gaming",
  "Porn Addiction","Alcohol / Substances","Procrastination","Late Night Phone Use",
];

/* ── Select classes: upgraded with gold focus ring ── */
const selectClasses =
  "w-full rounded-xl p-3.5 text-sm transition-all outline-none cursor-pointer appearance-none " +
  "focus:ring-1 select-luxury";

export default function AuditPage() {
  const router = useRouter();
  const [currentStep,  setCurrentStep]  = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,        setError]        = useState<string | null>(null);

  const [formData, setFormData] = useState({
    age: "", gender: "", height: "", weight: "", bodyFat: "", dietType: "",
    wakeUpTime: "", screenTime: "", consistencyLevel: "", badHabits: [] as string[],
    income: "", spendingHabits: "", savings: "", sideHustle: "",
    confidenceLevel: "", friendsCount: "", datingLife: "", socialAnxiety: "",
    primaryGoal: "",
  });

  const handleNext = () => { if (currentStep < steps.length - 1) setCurrentStep(p => p + 1); };
  const handlePrev = () => { if (currentStep > 0) setCurrentStep(p => p - 1); };
  const updateForm = (key: string, value: string | string[]) =>
    setFormData(p => ({ ...p, [key]: value }));
  const toggleHabit = (habit: string) =>
    setFormData(p => ({
      ...p,
      badHabits: p.badHabits.includes(habit)
        ? p.badHabits.filter(h => h !== habit)
        : [...p.badHabits, habit],
    }));

  const handleSubmit = async () => {
    setIsSubmitting(true); setError(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.reportId) {
        if (data.reportData) {
          const reports = JSON.parse(localStorage.getItem("lifemaxxer_reports") || "{}");
          reports[data.reportId] = { ai_response: data.reportData, user_data: formData, created_at: new Date().toISOString() };
          localStorage.setItem("lifemaxxer_reports", JSON.stringify(reports));
        }
        const history = JSON.parse(localStorage.getItem("lifemaxxer_history") || "[]");
        if (!history.includes(data.reportId)) {
          history.unshift(data.reportId);
          localStorage.setItem("lifemaxxer_history", JSON.stringify(history));
        }
        router.push(`/dashboard/${data.reportId}`);
      } else {
        throw new Error(data.error || "Failed to generate report.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const progressValue = ((currentStep + 1) / steps.length) * 100;
  const StepIcon = steps[currentStep].icon;

  /* Step accent colour (for icon badge) */
  const stepAccent: Record<string, string> = {
    emerald: "#6EE7B7", purple: "#C4B5FD", amber: "#FCD34D",
    blue: "#93C5FD", red: "#FCA5A5",
  };
  const accentColor = stepAccent[steps[currentStep].color] || "#C9963A";

  return (
    <>
      {/* ══════════════════════════════════════
          PREMIUM GLOBAL STYLES (scoped)
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
          --muted:     #3A2A20;
          --text-main: #F0E6D3;
          --text-dim:  #7A6E5E;
          --text-faint:#4A3D30;
        }

        /* Noise grain overlay */
        .audit-noise::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          opacity: 0.5;
        }

        /* Gold shimmer on logo */
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .gold-text {
          background: linear-gradient(90deg, #C9963A 0%, #E8C97A 40%, #C9963A 60%, #A07020 100%);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        /* Ambient orb float */
        @keyframes orb-float {
          0%, 100% { transform: translateY(0)   scale(1);    }
          50%       { transform: translateY(-24px) scale(1.05); }
        }
        .orb-a { animation: orb-float 10s ease-in-out infinite; }
        .orb-b { animation: orb-float 14s ease-in-out infinite 3s; }
        .orb-c { animation: orb-float 18s ease-in-out infinite 6s; }

        /* Glassmorphic card */
        .glass-card {
          background: linear-gradient(145deg, rgba(32,21,16,0.92) 0%, rgba(20,12,9,0.96) 100%);
          border: 1px solid rgba(201,150,58,0.14);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(201,150,58,0.06) inset,
            0 24px 64px rgba(0,0,0,0.55),
            0 0 80px rgba(139,29,58,0.08);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          border-color: rgba(201,150,58,0.24);
          box-shadow:
            0 0 0 1px rgba(201,150,58,0.1) inset,
            0 28px 72px rgba(0,0,0,0.6),
            0 0 100px rgba(139,29,58,0.14);
        }

        /* Select elements */
        .select-luxury {
          background: linear-gradient(135deg, #1A100C 0%, #140C09 100%);
          border: 1px solid rgba(201,150,58,0.15);
          color: #E0D0B8;
          font-family: 'Georgia', serif;
        }
        .select-luxury:focus {
          border-color: rgba(201,150,58,0.45);
          box-shadow: 0 0 0 3px rgba(201,150,58,0.08), 0 0 20px rgba(201,150,58,0.08);
          ring-color: rgba(201,150,58,0.3);
        }
        .select-luxury:hover {
          border-color: rgba(201,150,58,0.28);
        }
        .select-luxury option {
          background: #1A100C;
          color: #E0D0B8;
        }

        /* Label style */
        .field-label {
          font-family: 'Georgia', serif;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7A6E5E;
          font-weight: 500;
        }

        /* Step indicator pills */
        .step-pill-active {
          background: linear-gradient(90deg, #8B1D3A 0%, #C9963A 100%);
          box-shadow: 0 0 12px rgba(201,150,58,0.35);
        }
        .step-pill-done {
          background: rgba(201,150,58,0.3);
        }
        .step-pill-pending {
          background: rgba(255,255,255,0.06);
        }

        /* Step progress bar fill */
        @keyframes fill-bar {
          from { width: 0%; }
        }
        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #8B1D3A 0%, #C9963A 100%);
          box-shadow: 0 0 12px rgba(201,150,58,0.4);
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
        }

        /* Bad habit toggle buttons */
        .habit-btn {
          background: rgba(20,12,9,0.8);
          border: 1px solid rgba(201,150,58,0.12);
          color: #7A6E5E;
          font-family: 'Georgia', serif;
          font-size: 0.8rem;
          padding: 0.65rem 1rem;
          border-radius: 0.75rem;
          text-align: left;
          transition: all 0.22s ease;
          cursor: pointer;
        }
        .habit-btn:hover {
          border-color: rgba(201,150,58,0.32);
          color: #C9963A;
          background: rgba(201,150,58,0.06);
        }
        .habit-btn.active {
          background: rgba(139,29,58,0.18);
          border-color: rgba(139,29,58,0.45);
          color: #E08090;
          box-shadow: 0 0 16px rgba(139,29,58,0.15);
        }

        /* CTA button premium */
        .btn-premium-audit {
          background: linear-gradient(135deg, #8B1D3A 0%, #C9963A 100%);
          color: #F5ECD7;
          border: none;
          font-family: 'Georgia', serif;
          letter-spacing: 0.04em;
          box-shadow: 0 4px 24px rgba(139,29,58,0.4);
          transition: all 0.25s ease;
        }
        .btn-premium-audit:hover:not(:disabled) {
          box-shadow: 0 6px 40px rgba(139,29,58,0.6), 0 0 30px rgba(201,150,58,0.2);
          transform: translateY(-1px) scale(1.01);
        }
        .btn-premium-audit:active:not(:disabled) {
          transform: translateY(0) scale(0.99);
        }
        .btn-premium-audit:disabled {
          opacity: 0.55;
        }

        /* Ghost back button */
        .btn-ghost-audit {
          background: transparent;
          border: 1px solid rgba(201,150,58,0.15);
          color: #7A6E5E;
          font-family: 'Georgia', serif;
          letter-spacing: 0.03em;
          transition: all 0.22s ease;
        }
        .btn-ghost-audit:hover:not(:disabled) {
          border-color: rgba(201,150,58,0.35);
          color: #C9963A;
          background: rgba(201,150,58,0.05);
        }

        /* Section heading */
        .step-heading {
          font-family: 'Georgia', serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #F0E6D3;
        }
        .step-subhead {
          font-family: 'Georgia', serif;
          font-size: 0.875rem;
          color: #5A4D3D;
        }

        /* Thin gold divider */
        .gold-hr {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,150,58,0.25), transparent);
          margin: 1.5rem 0;
        }

        /* Loader pulse glow */
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,150,58,0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(201,150,58,0); }
        }
        .loader-ring {
          animation: pulse-gold 2s ease-in-out infinite;
          border-radius: 50%;
        }

        /* Icon badge */
        .icon-badge {
          background: linear-gradient(135deg, rgba(201,150,58,0.12) 0%, rgba(139,29,58,0.12) 100%);
          border: 1px solid rgba(201,150,58,0.2);
        }

        /* Step counter mono tag */
        .step-counter {
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          background: rgba(20,12,9,0.9);
          border: 1px solid rgba(201,150,58,0.15);
          color: #7A6E5E;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          letter-spacing: 0.05em;
        }

        /* Final motivational box */
        .motive-box {
          background: linear-gradient(135deg, rgba(201,150,58,0.06) 0%, rgba(139,29,58,0.06) 100%);
          border: 1px solid rgba(201,150,58,0.16);
          border-radius: 0.875rem;
          padding: 1rem 1.25rem;
        }

        /* Error box */
        .error-box {
          background: rgba(139,29,58,0.12);
          border: 1px solid rgba(139,29,58,0.35);
          border-radius: 0.875rem;
          padding: 1rem 1.25rem;
        }
      `}</style>

      {/* ══════════════════════════════════════
          PREMIUM BACKGROUND WRAPPER
      ══════════════════════════════════════ */}
      <div
        className="audit-noise min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0F0B09 0%, #160E0B 35%, #120A0D 65%, #0D0A08 100%)",
          fontFamily: "'Georgia', serif",
        }}
      >
        {/* Ambient glow orbs */}
        <div
          className="orb-a absolute pointer-events-none"
          style={{
            top: "-5%", right: "5%",
            width: 560, height: 560,
            background: "radial-gradient(circle, rgba(139,29,58,0.2) 0%, transparent 70%)",
            filter: "blur(100px)", borderRadius: "50%",
          }}
        />
        <div
          className="orb-b absolute pointer-events-none"
          style={{
            bottom: "0%", left: "-5%",
            width: 420, height: 420,
            background: "radial-gradient(circle, rgba(201,150,58,0.12) 0%, transparent 70%)",
            filter: "blur(110px)", borderRadius: "50%",
          }}
        />
        <div
          className="orb-c absolute pointer-events-none"
          style={{
            top: "40%", left: "30%",
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(107,26,42,0.1) 0%, transparent 70%)",
            filter: "blur(80px)", borderRadius: "50%",
          }}
        />

        <div className="w-full max-w-2xl z-10 relative">

          {/* ── TOP NAV (original logic, premium skin) ── */}
          <div className="mb-7">
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Activity className="w-4 h-4" style={{ color: "#C9963A" }} />
              <span className="font-extrabold tracking-tight" style={{ color: "#F0E6D3", fontSize: "1rem" }}>
                LIFEMAXXER<span className="gold-text">.AI</span>
              </span>
            </Link>
          </div>

          {/* ── STEP HEADER ── */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="icon-badge w-11 h-11 rounded-xl flex items-center justify-center"
              >
                <StepIcon className="w-5 h-5" style={{ color: accentColor }} />
              </div>
              <div>
                <span
                  className="font-bold tracking-tight text-lg"
                  style={{ color: "#F0E6D3", fontFamily: "'Georgia', serif" }}
                >
                  {steps[currentStep].title}
                </span>
                <p className="field-label mt-0.5">Deep Audit</p>
              </div>
            </div>
            <span className="step-counter">{currentStep + 1} / {steps.length}</span>
          </div>

          {/* ── STEP PROGRESS PILLS ── */}
          <div className="flex gap-2 mb-8">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < currentStep
                    ? "step-pill-done"
                    : i === currentStep
                    ? "step-pill-active"
                    : "step-pill-pending"
                }`}
                initial={false}
                animate={{ opacity: i <= currentStep ? 1 : 0.4 }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>

          {/* ── MAIN GLASS CARD ── */}
          <Card className="glass-card border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <AnimatePresence mode="wait">

                {/* ── STEP 1: PHYSICAL ── */}
                {currentStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="step-heading text-2xl mb-1">Physical &amp; Biology</h2>
                      <p className="step-subhead">Your body is the foundation. Be honest about where you are.</p>
                    </div>
                    <div className="gold-hr" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="field-label block">Age</label>
                        <select className={selectClasses} value={formData.age} onChange={e => updateForm("age", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="16-18">16-18</option>
                          <option value="18-21">18-21</option>
                          <option value="21-25">21-25</option>
                          <option value="25-30">25-30</option>
                          <option value="30+">30+</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="field-label block">Gender</label>
                        <select className={selectClasses} value={formData.gender} onChange={e => updateForm("gender", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-Binary">Non-Binary</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="field-label block">Height (cm)</label>
                        <select className={selectClasses} value={formData.height} onChange={e => updateForm("height", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="<160cm">&lt;160 cm</option>
                          <option value="160-170cm">160-170 cm</option>
                          <option value="170-180cm">170-180 cm</option>
                          <option value="180cm+">180+ cm</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="field-label block">Body Fat %</label>
                        <select className={selectClasses} value={formData.bodyFat} onChange={e => updateForm("bodyFat", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="Lean (<15%)">Lean (&lt;15%)</option>
                          <option value="Athletic (15-20%)">Athletic (15-20%)</option>
                          <option value="Average (20-25%)">Average (20-25%)</option>
                          <option value="Overweight (25%+)">Overweight (25%+)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="field-label block">Diet Type</label>
                      <select className={selectClasses} value={formData.dietType} onChange={e => updateForm("dietType", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Clean (Meal Prep/Home Cooked)">Clean (Meal Prep / Home Cooked)</option>
                        <option value="Mixed (Some junk, some healthy)">Mixed (Some junk, some healthy)</option>
                        <option value="Trash (Fast food, Swiggy/Zomato daily)">Trash (Fast food, Swiggy/Zomato daily)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: DISCIPLINE ── */}
                {currentStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="step-heading text-2xl mb-1">Habits &amp; Discipline</h2>
                      <p className="step-subhead">Your daily routine defines your trajectory.</p>
                    </div>
                    <div className="gold-hr" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="field-label block">Wake Up Time</label>
                        <select className={selectClasses} value={formData.wakeUpTime} onChange={e => updateForm("wakeUpTime", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="Before 6 AM">Before 6 AM</option>
                          <option value="6-8 AM">6-8 AM</option>
                          <option value="8-10 AM">8-10 AM</option>
                          <option value="After 10 AM">After 10 AM</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="field-label block">Daily Screen Time</label>
                        <select className={selectClasses} value={formData.screenTime} onChange={e => updateForm("screenTime", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="<2 hours">&lt;2 hours</option>
                          <option value="2-4 hours">2-4 hours</option>
                          <option value="4-6 hours">4-6 hours</option>
                          <option value="6+ hours">6+ hours (addicted)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="field-label block">Consistency Level</label>
                      <select className={selectClasses} value={formData.consistencyLevel} onChange={e => updateForm("consistencyLevel", e.target.value)}>
                        <option value="">Select...</option>
                        <option value="Robot Mode">Robot Mode (Never miss a day)</option>
                        <option value="Decent">Decent (Mostly consistent)</option>
                        <option value="Inconsistent">Inconsistent (Motivated for 3 days then quit)</option>
                        <option value="Non-Existent">Non-Existent (No routine at all)</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="field-label block">Bad Habits (select all that apply)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {badHabitOptions.map(habit => (
                          <button
                            key={habit}
                            type="button"
                            onClick={() => toggleHabit(habit)}
                            className={`habit-btn ${formData.badHabits.includes(habit) ? "active" : ""}`}
                          >
                            {formData.badHabits.includes(habit) ? "✕ " : ""}{habit}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: WEALTH ── */}
                {currentStep === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="step-heading text-2xl mb-1">Wealth &amp; Ambition</h2>
                      <p className="step-subhead">Money is a tool. How are you wielding it?</p>
                    </div>
                    <div className="gold-hr" />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="field-label block">Monthly Income / Allowance</label>
                        <select className={selectClasses} value={formData.income} onChange={e => updateForm("income", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="Student (0)">Student / 0 Income</option>
                          <option value="Pocket Money (<5k)">Pocket Money (&lt;₹5k)</option>
                          <option value="₹10k - ₹30k">₹10k - ₹30k</option>
                          <option value="₹30k - ₹80k">₹30k - ₹80k</option>
                          <option value="₹80k+">₹80k+</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="field-label block">UPI Spending Habits</label>
                        <select className={selectClasses} value={formData.spendingHabits} onChange={e => updateForm("spendingHabits", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="Frugal">Frugal (Track everything)</option>
                          <option value="Micro-leaks">Micro-leaks (Swiggy, Chai, Cabs)</option>
                          <option value="Reckless">Reckless (No idea where money goes)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="field-label block">Side Hustle / Skill Building</label>
                        <select className={selectClasses} value={formData.sideHustle} onChange={e => updateForm("sideHustle", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="Active Side Hustle">Active Side Hustle (Freelancing, Content, etc.)</option>
                          <option value="Learning Skills">Learning Skills (No income yet)</option>
                          <option value="Nothing">Nothing (Just consuming)</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 4: SOCIAL ── */}
                {currentStep === 3 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="step-heading text-2xl mb-1">Social &amp; Relationships</h2>
                      <p className="step-subhead">Your network is your net worth.</p>
                    </div>
                    <div className="gold-hr" />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="field-label block">Dating / Relationship Status</label>
                        <select className={selectClasses} value={formData.datingLife} onChange={e => updateForm("datingLife", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="Single & Struggling">Single (Struggling / Zero Matches)</option>
                          <option value="Single & Abundant">Single (Options)</option>
                          <option value="In a Relationship">In a Relationship</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="field-label block">Social Anxiety Level</label>
                        <select className={selectClasses} value={formData.socialAnxiety} onChange={e => updateForm("socialAnxiety", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="High">High (Can&apos;t talk to strangers)</option>
                          <option value="Medium">Medium (Awkward but trying)</option>
                          <option value="Low">Low (Confident, good speaker)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="field-label block">Close Friends (Real ones)</label>
                        <select className={selectClasses} value={formData.friendsCount} onChange={e => updateForm("friendsCount", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="0-1">0-1 (Loner)</option>
                          <option value="2-4">2-4 (Solid circle)</option>
                          <option value="5+">5+ (Large network)</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 5: GOALS ── */}
                {currentStep === 4 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="step-heading text-2xl mb-1">Your True Objective</h2>
                      <p className="step-subhead">What do you actually want? Be real with yourself.</p>
                    </div>
                    <div className="gold-hr" />

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="field-label block">Primary Goal Right Now</label>
                        <select className={selectClasses} value={formData.primaryGoal} onChange={e => updateForm("primaryGoal", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="Physical Glow Up">Physical Glow Up (Aesthetics)</option>
                          <option value="Make Money">Make Money / Career</option>
                          <option value="Fix Mental Health">Fix Mental Health &amp; Discipline</option>
                          <option value="Get a Partner">Attraction / Dating</option>
                          <option value="All of the Above">All of the Above</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="field-label block">Confidence Level</label>
                        <select className={selectClasses} value={formData.confidenceLevel} onChange={e => updateForm("confidenceLevel", e.target.value)}>
                          <option value="">Select...</option>
                          <option value="Very Low">Very Low (Can&apos;t look people in the eye)</option>
                          <option value="Low">Low (Quiet, reserved)</option>
                          <option value="Average">Average (Normal)</option>
                          <option value="High">High (Own the room)</option>
                        </select>
                      </div>
                    </div>

                    {/* Motivational box — original text, premium skin */}
                    <div className="motive-box">
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "#C9963A", fontFamily: "'Georgia', serif", opacity: 0.9 }}
                      >
                        ⚡ You&#39;re about to receive the most honest assessment of your life.
                        Our AI will analyze every dimension and give you a custom 30-day protocol.
                        No sugarcoating. No participation trophies. Just the truth.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── ERROR STATE (original logic, premium skin) ── */}
              {error && (
                <div className="error-box mt-6 flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2" style={{ color: "#E08090" }}>
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="font-bold" style={{ fontFamily: "'Georgia', serif" }}>Analysis Failed</span>
                  </div>
                  <p className="font-mono text-xs" style={{ color: "#A09080" }}>{error}</p>
                  <button
                    onClick={handleSubmit}
                    className="w-fit mt-2 text-xs px-4 py-1.5 rounded-lg transition-all"
                    style={{
                      border: "1px solid rgba(139,29,58,0.5)",
                      color: "#E08090",
                      background: "rgba(139,29,58,0.1)",
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    Retry Analysis
                  </button>
                </div>
              )}

              {/* ── NAV BUTTONS ── */}
              <div className="mt-10 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0 || isSubmitting}
                  className={`btn-ghost-audit flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm ${
                    currentStep === 0 ? "opacity-0 pointer-events-none" : ""
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="btn-premium-audit flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-premium-audit flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                      </>
                    ) : error ? (
                      <>
                        Retry <Target className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Generate Deep Report <Target className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ── SUBMITTING LOADER (original logic, premium skin) ── */}
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 text-center flex flex-col items-center gap-4"
            >
              <div className="relative loader-ring">
                <Loader2 className="w-9 h-9 animate-spin" style={{ color: "#C9963A" }} />
                <div
                  className="absolute inset-0 blur-xl rounded-full"
                  style={{ background: "rgba(201,150,58,0.2)" }}
                />
              </div>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm"
                style={{ color: "#C9963A", fontFamily: "'Georgia', serif", letterSpacing: "0.04em" }}
              >
                AI is parsing your data...
              </motion.span>
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="text-xs"
                style={{ color: "#5A4D3D", fontFamily: "'Georgia', serif" }}
              >
                Comparing metrics against behavioral baselines...
              </motion.span>
              <motion.span
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="text-xs"
                style={{ color: "#3A2D20", fontFamily: "'Georgia', serif" }}
              >
                This may take 15–30 seconds
              </motion.span>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}