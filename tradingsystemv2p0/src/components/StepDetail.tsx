import { useParams, useNavigate } from "react-router-dom";
import { stepsData } from "../data/steps";
import { useEffect, useState } from "react";

export default function StepDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const step = stepsData.find((s) => s.slug === slug);
  const currentIndex = step ? stepsData.findIndex((s) => s.id === step.id) : -1;
  const prevStep = currentIndex > 0 ? stepsData[currentIndex - 1] : null;
  const nextStep =
    currentIndex < stepsData.length - 1 ? stepsData[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, [slug]);

  if (!step) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-matrix-green font-mono text-lg mb-4">
            ERROR 404 — 阶段未找到
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-matrix-green/70 hover:text-matrix-green font-mono text-sm underline underline-offset-4 cursor-pointer"
          >
            返回目录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg hex-pattern relative">
      {/* Scanline */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)",
          }}
        />
      </div>

      {/* Header */}
      <header
        className={`relative z-10 border-b border-dark-border bg-dark-bg/90 backdrop-blur-md sticky top-0 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-matrix-green transition-colors font-mono text-sm cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            目录
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
            <span className="text-matrix-green/60">PHASE</span>
            <span className="text-matrix-green font-bold text-base">
              {String(step.id).padStart(2, "0")}
            </span>
            <span className="text-gray-700">/</span>
            <span className="text-gray-600">07</span>
          </div>

          {/* Step navigation */}
          <div className="flex items-center gap-2">
            {stepsData.map((s, i) => (
              <button
                key={s.id}
                onClick={() => navigate(`/step/${s.slug}`)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  s.id === step.id
                    ? "bg-matrix-green w-6"
                    : i < currentIndex
                      ? "bg-matrix-green/40 hover:bg-matrix-green/60"
                      : "bg-gray-700 hover:bg-gray-600"
                }`}
                title={s.title}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-12 pb-32">
        {/* Hero Section */}
        <div
          className={`mb-10 transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl sm:text-5xl text-matrix-green drop-shadow-[0_0_15px_rgba(0,255,65,0.3)]">
              {step.icon}
            </span>
            <div>
              <div className="text-matrix-green/50 text-xs font-mono tracking-wider mb-1">
                {step.duration}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white">
                {step.title}
              </h1>
            </div>
          </div>
          <p className="text-matrix-dim/80 font-mono text-sm sm:text-base">
            {step.subtitle}
          </p>
          <div className="mt-4 w-full h-px bg-gradient-to-r from-matrix-green/50 via-matrix-green/10 to-transparent" />
        </div>

        {/* Description */}
        <section
          className={`mb-10 transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="border border-dark-border rounded-lg p-5 sm:p-6 bg-dark-card/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-matrix-green rounded-full" />
              <h2 className="text-sm font-mono text-matrix-green tracking-wider uppercase">
                概述 · Overview
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-[15px]">
              {step.description}
            </p>
          </div>
        </section>

        {/* Key Actions */}
        <section
          className={`mb-10 transition-all duration-700 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-neon-cyan rounded-full" />
            <h2 className="text-sm font-mono text-neon-cyan tracking-wider uppercase">
              核心行动 · Key Actions
            </h2>
          </div>
          <div className="space-y-3">
            {step.keyActions.map((action, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border border-dark-border rounded-lg p-4 bg-dark-card/40 hover:border-matrix-green/30 transition-colors group"
              >
                <span className="text-matrix-green font-mono text-sm font-bold mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                  {action}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Sections */}
        <section
          className={`mb-10 transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-matrix-green rounded-full" />
            <h2 className="text-sm font-mono text-matrix-green tracking-wider uppercase">
              深度解析 · Deep Dive
            </h2>
          </div>
          <div className="space-y-4">
            {step.details.map((detail, i) => (
              <DetailCard key={i} heading={detail.heading} content={detail.content} index={i} />
            ))}
          </div>
        </section>

        {/* Tips */}
        <section
          className={`mb-10 transition-all duration-700 delay-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-yellow-500 rounded-full" />
            <h2 className="text-sm font-mono text-yellow-500 tracking-wider uppercase">
              实战建议 · Tips
            </h2>
          </div>
          <div className="border border-yellow-500/20 rounded-lg p-5 bg-yellow-500/[0.03]">
            <ul className="space-y-3">
              {step.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-yellow-500/70 mt-0.5 flex-shrink-0">⚡</span>
                  <span className="text-gray-300 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Milestone */}
        <section
          className={`mb-10 transition-all duration-700 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-neon-cyan rounded-full" />
            <h2 className="text-sm font-mono text-neon-cyan tracking-wider uppercase">
              阶段里程碑 · Milestone
            </h2>
          </div>
          <div className="border border-neon-cyan/20 rounded-lg p-5 sm:p-6 bg-neon-cyan/[0.03] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🎯</span>
              <p className="text-gray-200 leading-relaxed text-[15px]">
                {step.milestone}
              </p>
            </div>
          </div>
        </section>

        {/* Next Step Hint */}
        <section
          className={`mb-6 transition-all duration-700 delay-800 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="border border-matrix-green/10 rounded-lg p-5 bg-matrix-green/[0.02] text-center">
            <p className="text-matrix-green/60 text-sm font-mono mb-4">
              ▸ {step.nextStepHint}
            </p>
            {/* Prev/Next Nav */}
            <div className="flex items-center justify-center gap-4">
              {prevStep && (
                <button
                  onClick={() => navigate(`/step/${prevStep.slug}`)}
                  className="flex items-center gap-2 text-gray-500 hover:text-matrix-green transition-colors font-mono text-sm border border-dark-border rounded-lg px-4 py-2 hover:border-matrix-green/30 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Phase {String(prevStep.id).padStart(2, "0")}
                </button>
              )}
              {nextStep && (
                <button
                  onClick={() => navigate(`/step/${nextStep.slug}`)}
                  className="flex items-center gap-2 text-gray-500 hover:text-matrix-green transition-colors font-mono text-sm border border-dark-border rounded-lg px-4 py-2 hover:border-matrix-green/30 cursor-pointer"
                >
                  Phase {String(nextStep.id).padStart(2, "0")}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Progress bar */}
        <div
          className={`transition-all duration-700 delay-900 ${loaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-2">
            <span>PROGRESS</span>
            <span className="text-matrix-green">
              {Math.round((step.id / stepsData.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-1 bg-dark-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-matrix-green/60 to-matrix-green rounded-full transition-all duration-1000"
              style={{ width: `${(step.id / stepsData.length) * 100}%` }}
            />
          </div>
        </div>
      </main>

      {/* Back to Home FAB */}
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-6 right-6 z-40 group cursor-pointer"
        title="返回目录"
      >
        <div className="relative flex items-center gap-2 bg-dark-card border border-matrix-green/30 hover:border-matrix-green/60 rounded-full pl-4 pr-5 py-3 shadow-[0_0_20px_rgba(0,255,65,0.1)] hover:shadow-[0_0_30px_rgba(0,255,65,0.2)] transition-all duration-300">
          <svg
            className="w-5 h-5 text-matrix-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-matrix-green text-sm font-mono">
            目录
          </span>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full border border-matrix-green/0 group-hover:border-matrix-green/20 scale-110 transition-all duration-500" />
        </div>
      </button>
    </div>
  );
}

function DetailCard({
  heading,
  content,
  index,
}: {
  heading: string;
  content: string;
  index: number;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border border-dark-border rounded-lg overflow-hidden bg-dark-card/40 hover:border-matrix-green/20 transition-colors">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-matrix-green/50 font-mono text-xs">
            {String.fromCharCode(65 + index)}
          </span>
          <h3 className="text-white font-bold text-sm sm:text-base text-left">
            {heading}
          </h3>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 flex-shrink-0 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
          <div className="border-t border-dark-border pt-4">
            <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
