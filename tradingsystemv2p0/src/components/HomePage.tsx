import { useNavigate } from "react-router-dom";
import { stepsData } from "../data/steps";
import { useEffect, useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [titleReady, setTitleReady] = useState(false);

  useEffect(() => {
    setTitleReady(true);
    const timers: ReturnType<typeof setTimeout>[] = [];
    stepsData.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleSteps((prev) => [...prev, i]);
        }, 400 + i * 180)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg grid-bg relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-matrix-green"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-6 text-center px-4">
        <div
          className={`transition-all duration-1000 ${titleReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-block mb-4">
            <span className="text-matrix-green text-xs tracking-[0.4em] uppercase font-mono opacity-70">
              ▸ SYSTEM INITIALIZATION COMPLETE ◂
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            可持续盈利交易者
            <br />
            <span className="text-matrix-green drop-shadow-[0_0_20px_rgba(0,255,65,0.4)]">
              成长路径系统
            </span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto font-mono">
            SUSTAINABLE PROFITABLE TRADER — GROWTH PATH v2.0
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-matrix-green/50 text-xs font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-matrix-green animate-pulse" />
            7 PHASES · SYSTEMATIC EVOLUTION · CONTINUOUS IMPROVEMENT
          </div>
        </div>
      </header>

      {/* Flow Path */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        {/* Central line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-matrix-green/20 to-transparent -translate-x-1/2 hidden lg:block" />

        <div className="space-y-6 sm:space-y-8">
          {stepsData.map((step, index) => {
            const isVisible = visibleSteps.includes(index);
            const isLeft = index % 2 === 0;

            return (
              <div
                key={step.id}
                className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                {/* Connector dot on center line - desktop */}
                <div className="hidden lg:flex justify-center mb-2">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full border-2 border-matrix-green bg-dark-bg z-10 relative" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-matrix-green/20 animate-ping" />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`lg:w-[48%] ${isLeft ? "lg:mr-auto" : "lg:ml-auto"}`}
                >
                  <button
                    onClick={() => navigate(`/step/${step.slug}`)}
                    className="w-full text-left group cursor-pointer"
                  >
                    <div className="relative border border-dark-border bg-dark-card/80 backdrop-blur-sm rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-matrix-green/50 hover:shadow-[0_0_30px_rgba(0,255,65,0.1)] animate-pulse-glow">
                      {/* Step number badge */}
                      <div className="absolute -top-3 left-5 bg-dark-bg border border-matrix-green/40 rounded px-3 py-0.5">
                        <span className="text-matrix-green text-xs font-mono font-bold tracking-wider">
                          PHASE {String(step.id).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="mt-2">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-2xl sm:text-3xl text-matrix-green opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5">
                            {step.icon}
                          </span>
                          <div className="min-w-0">
                            <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-matrix-green transition-colors">
                              {step.title}
                            </h2>
                            <p className="text-gray-500 text-xs sm:text-sm mt-0.5 font-mono">
                              {step.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                          {step.description}
                        </p>

                        {/* Duration & Milestone preview */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span className="text-xs font-mono text-matrix-dim/70 bg-matrix-dark/30 rounded px-2 py-1">
                            ⏱ {step.duration}
                          </span>
                          <span className="text-xs text-gray-600 font-mono hidden sm:inline">
                            ▸ {step.milestone.slice(0, 40)}…
                          </span>
                        </div>

                        {/* Arrow indicator */}
                        <div className="mt-3 flex items-center gap-1 text-matrix-green/0 group-hover:text-matrix-green/70 transition-all duration-300">
                          <span className="text-xs font-mono">
                            进入详情
                          </span>
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Corner decorations */}
                      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-matrix-green/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-matrix-green/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                </div>

                {/* Connecting line between cards - desktop */}
                {index < stepsData.length - 1 && (
                  <div className="hidden lg:flex justify-center mt-2">
                    <div className="w-px h-6 bg-gradient-to-b from-matrix-green/30 to-matrix-green/5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final node — Summary Entry */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="w-px h-12 bg-gradient-to-b from-matrix-green/20 to-matrix-green/50 hidden lg:block" />
            <button
              onClick={() => navigate("/summary")}
              className="relative group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full border-2 border-matrix-green/60 bg-dark-card flex items-center justify-center animate-pulse-glow group-hover:border-matrix-green group-hover:shadow-[0_0_40px_rgba(0,255,65,0.2)] transition-all duration-500">
                <span className="text-3xl">🏆</span>
              </div>
              <div className="absolute -inset-3 rounded-full border border-matrix-green/10 animate-ping" />
              <div className="absolute -inset-5 rounded-full border border-matrix-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            <p className="text-matrix-green/80 text-sm font-mono mt-2 font-bold">
              ▸ 可持续盈利交易者 ◂
            </p>
            <p className="text-gray-500 text-xs font-mono max-w-xs">
              终身修炼 · 保持谦逊 · 持续进化
            </p>

            {/* Summary Button */}
            <button
              onClick={() => navigate("/summary")}
              className="mt-4 group cursor-pointer"
            >
              <div className="flex items-center gap-2 border border-matrix-green/20 hover:border-matrix-green/50 rounded-lg px-5 py-2.5 bg-dark-card/80 hover:bg-matrix-green/[0.05] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,65,0.1)]">
                <svg className="w-4 h-4 text-matrix-green/60 group-hover:text-matrix-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-matrix-green/70 group-hover:text-matrix-green text-sm font-mono transition-colors">
                  查看系统总结
                </span>
                <svg className="w-3 h-3 text-matrix-green/40 group-hover:text-matrix-green/80 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-dark-border py-6 text-center">
        <p className="text-gray-700 text-xs font-mono">
          TRADER GROWTH SYSTEM v2.0 · SYSTEMATIC · DISCIPLINED · SUSTAINABLE
        </p>
      </footer>
    </div>
  );
}
