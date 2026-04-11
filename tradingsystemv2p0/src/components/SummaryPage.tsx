import { useNavigate } from "react-router-dom";
import { stepsData } from "../data/steps";
import { useEffect, useState } from "react";

const coreBeliefs = [
  {
    icon: "⟁",
    title: "概率思维",
    desc: "不追求 100% 胜率，追求正期望值 × 足够样本 × 一致性执行。单笔结果是随机的，但系统优势在大数定律下会显现。",
  },
  {
    icon: "⎈",
    title: "流程驱动",
    desc: "用标准流程替代情绪决策。好的交易不是靠灵感，而是靠开盘前准备、盘中执行和收盘后复盘的闭环。",
  },
  {
    icon: "◈",
    title: "风控至上",
    desc: "活着比盈利更重要。单笔风险、日亏上限、最大回撤——三道防线永远优先于任何入场信号。",
  },
  {
    icon: "⬡",
    title: "持续进化",
    desc: "市场在变，你也必须变。但变化必须基于数据，每次只改一个变量，用 20-30 笔样本验证，拒绝凭感觉调参。",
  },
  {
    icon: "⏣",
    title: "减法哲学",
    desc: "优秀的交易者不是做得多，而是做得少但做得对。删除低质量信号、放弃劣势时段、主动不交易——这些都是收益的来源。",
  },
  {
    icon: "⟐",
    title: "自我认知",
    desc: "技术只是一半，另一半是理解你自己。你的心态、作息、风险偏好决定了你应该用什么风格、什么频率去交易。",
  },
];

const mindsetShifts = [
  { from: "寻找圣杯", to: "打磨边际优势", phase: "Phase 01→05" },
  { from: "追求高胜率", to: "追求正期望值", phase: "Phase 03→04" },
  { from: "凭感觉改策略", to: "用数据驱动优化", phase: "Phase 04→06" },
  { from: "依赖状态好", to: "依赖流程正确", phase: "Phase 06→07" },
  { from: "做更多交易", to: "做更少但更好的交易", phase: "Phase 05→06" },
  { from: "关注单笔结果", to: "关注系统一致性", phase: "Phase 03→07" },
];

const phaseMatrix = stepsData.map((s) => ({
  id: s.id,
  title: s.title,
  focus: s.subtitle,
  slug: s.slug,
  icon: s.icon,
}));

const goldenRules = [
  "活着是第一要务——任何时候都不要让一笔交易威胁你的账户生存。",
  "你的交易日记比任何指标、策略、课程都更有价值。",
  "不要同时改两个变量——你永远无法归因。",
  "最好的交易往往是你没做的那些烂交易。",
  "交易是马拉松，不是短跑——一致性和持久性才是终极优势。",
  "系统不需要完美，需要可执行。先有框架，再有迭代。",
  "允许亏损存在——它是系统正常运行的成本，不是失败的信号。",
  "定期与认真的交易者交流——孤独的交易者容易偏航。",
];

export default function SummaryPage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [activeRule, setActiveRule] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Rotate golden rules
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRule((prev) => (prev + 1) % goldenRules.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-matrix-green/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-neon-cyan/[0.015] rounded-full blur-3xl" />
      </div>

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

      {/* Floating particles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              backgroundColor: i % 5 === 0 ? "#00f0ff" : "#00ff41",
              animation: `float ${Math.random() * 5 + 3}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header
        className={`relative z-10 border-b border-dark-border bg-dark-bg/90 backdrop-blur-md sticky top-0 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-matrix-green transition-colors font-mono text-sm cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回目录
          </button>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-matrix-green/60">SYSTEM</span>
            <span className="text-matrix-green font-bold">SUMMARY</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 sm:py-12 pb-32">

        {/* ========== HERO ========== */}
        <section
          className={`text-center mb-16 transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-block mb-3">
            <span className="text-matrix-green text-xs tracking-[0.5em] uppercase font-mono opacity-60">
              ▸ SYSTEM ARCHITECTURE OVERVIEW ◂
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5">
            系统总结
            <span className="text-matrix-green drop-shadow-[0_0_25px_rgba(0,255,65,0.4)]">
              {" "}· 全局视角
            </span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
            从零到可持续盈利，不是一次顿悟，而是一场系统化的自我工程。
            这条路径将技术分析、交易系统、风险管理和心态修炼编织成一套完整的成长操作系统。
            以下是对整个体系的深度总结与提炼。
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-matrix-green/40 text-xs font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-matrix-green animate-pulse" />
            7 PHASES · 6 CORE BELIEFS · 6 MINDSET SHIFTS · 8 GOLDEN RULES
          </div>
        </section>

        {/* ========== SYSTEM PHILOSOPHY ========== */}
        <section
          className={`mb-16 transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionTitle icon="◆" label="系统哲学 · System Philosophy" color="matrix-green" />

          <div className="border border-dark-border rounded-xl p-6 sm:p-8 bg-dark-card/60 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-matrix-green/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-matrix-green/30 to-transparent" />

            <div className="space-y-6 text-gray-300 leading-relaxed text-[15px]">
              <p>
                这套系统的核心理念可以浓缩为一句话：
                <span className="text-matrix-green font-bold"> 用工程师的思维做交易，用运动员的纪律执行计划，用哲学家的心态面对结果。</span>
              </p>
              <p>
                多数交易者失败不是因为缺少好的策略，而是因为缺少一套将策略、风控和心态整合在一起的<strong className="text-white">操作系统</strong>。
                他们在技术分析上花了 80% 的精力，却只在风控和心态上花了 20%——而后者才是决定长期生存的关键。
              </p>
              <p>
                本路径的设计逻辑是：<span className="text-neon-cyan">先建立认知框架（Phase 1-2）</span>，
                <span className="text-matrix-green"> 再搭建和打磨系统（Phase 3-4）</span>，
                <span className="text-yellow-400"> 然后验证系统有效性（Phase 5）</span>，
                <span className="text-neon-cyan"> 最后持续优化和机械化执行（Phase 6-7）</span>。
                每个阶段都有明确的里程碑，确保你在正确的时间做正确的事。
              </p>
              <p>
                最重要的是：<span className="text-matrix-green font-bold">这不是一条寻找圣杯的路，而是一条建设自己的路。</span>
                你要建设的不是一个完美的策略，而是一个能持续进化、适应市场变化的交易操作系统——以及一个与之匹配的、纪律和自我觉察并存的交易心智。
              </p>
            </div>
          </div>
        </section>

        {/* ========== CORE BELIEFS ========== */}
        <section
          className={`mb-16 transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionTitle icon="⬡" label="核心信念 · Core Beliefs" color="neon-cyan" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreBeliefs.map((belief, i) => (
              <div
                key={i}
                className="border border-dark-border rounded-lg p-5 bg-dark-card/50 hover:border-matrix-green/30 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(0,255,65,0.05)] relative overflow-hidden"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-matrix-green/10 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl text-matrix-green opacity-70 group-hover:opacity-100 transition-opacity">
                    {belief.icon}
                  </span>
                  <h3 className="text-white font-bold text-sm sm:text-base group-hover:text-matrix-green transition-colors">
                    {belief.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{belief.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========== PHASE OVERVIEW MATRIX ========== */}
        <section
          className={`mb-16 transition-all duration-700 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionTitle icon="⎔" label="阶段全景 · Phase Matrix" color="matrix-green" />

          <div className="border border-dark-border rounded-xl overflow-hidden bg-dark-card/40 backdrop-blur-sm">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-0 border-b border-dark-border bg-dark-surface/80 px-4 py-3 text-xs font-mono text-matrix-green/60 uppercase tracking-wider">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-3 sm:col-span-2">阶段</div>
              <div className="col-span-8 sm:col-span-6">核心聚焦</div>
              <div className="col-span-0 sm:col-span-3 hidden sm:block text-right">操作</div>
            </div>

            {/* Rows */}
            {phaseMatrix.map((phase, i) => (
              <div
                key={phase.id}
                className={`grid grid-cols-12 gap-0 px-4 py-4 items-center hover:bg-matrix-green/[0.03] transition-colors cursor-pointer group ${
                  i < phaseMatrix.length - 1 ? "border-b border-dark-border/50" : ""
                }`}
                onClick={() => navigate(`/step/${phase.slug}`)}
              >
                <div className="col-span-1 text-center">
                  <span className="text-matrix-green font-mono text-sm font-bold">
                    {String(phase.id).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-center gap-2">
                  <span className="text-matrix-green/60 text-lg">{phase.icon}</span>
                  <span className="text-white text-sm font-bold hidden sm:inline">{phase.title}</span>
                  <span className="text-white text-xs font-bold sm:hidden">{phase.title}</span>
                </div>
                <div className="col-span-8 sm:col-span-6">
                  <span className="text-gray-400 text-xs sm:text-sm">{phase.focus}</span>
                </div>
                <div className="col-span-0 sm:col-span-3 hidden sm:flex justify-end">
                  <span className="text-matrix-green/0 group-hover:text-matrix-green/60 text-xs font-mono transition-colors flex items-center gap-1">
                    查看详情
                    <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== GROWTH JOURNEY VISUAL ========== */}
        <section
          className={`mb-16 transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionTitle icon="⏣" label="成长轨迹 · Growth Trajectory" color="neon-cyan" />

          <div className="border border-dark-border rounded-xl p-6 sm:p-8 bg-dark-card/40 backdrop-blur-sm">
            {/* ASCII-style growth curve */}
            <div className="font-mono text-xs sm:text-sm leading-6 text-matrix-green/80 overflow-x-auto">
              <pre className="text-center whitespace-pre">
{`
  盈利能力
  ▲
  │                                                    ╭──── ⎈ Phase 7: 机械化执行
  │                                               ╭────╯     [流程正确 → 稳定输出]
  │                                          ╭────╯
  │                                     ╭────╯  ⟐ Phase 6: 持续优化
  │                                ╭────╯        [更少交易, 更高质量]
  │                           ╭────╯
  │                      ╭────╯  ⬢ Phase 5: 系统成型
  │                ╭─────╯       [P/L 持平 → 微盈利]
  │           ╭────╯
  │      ╭────╯  ⏣ Phase 4: 系统打磨     ╌╌╌╌╌╌╌╌╌╌ 盈亏平衡线
  │ ╭────╯       [数据驱动优化]
  │─╯
  │  ⎔ Phase 3: 系统初养成
  │  [建立最小可执行系统]
  │
  │  ◈ Phase 2: 风格筛选        ← 多数人在此反复试错
  │  [匹配心态与作息]
  │
  │  ⬡ Phase 1: 技术基础
  │  [建立市场语言]
  ├──────────────────────────────────────────────────────▶ 时间 / 经验
  │        1-2月   │  2-4周  │ 1-2月 │ 2-3月 │ 3-6月 │  持续  │ 终身
`}
              </pre>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border/50">
              <div className="flex flex-wrap items-center gap-4 justify-center text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-px bg-matrix-green" />
                  <span className="text-gray-500">成长曲线</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-px bg-gray-600 border-dashed" style={{borderTop: "1px dashed"}} />
                  <span className="text-gray-500">盈亏平衡线</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-matrix-green">⬡◈⎔⏣⬢⟐⎈</span>
                  <span className="text-gray-500">阶段节点</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== MINDSET SHIFTS ========== */}
        <section
          className={`mb-16 transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionTitle icon="⟁" label="心态转变 · Mindset Shifts" color="matrix-green" />

          <div className="space-y-3">
            {mindsetShifts.map((shift, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 border border-dark-border rounded-lg p-4 bg-dark-card/40 hover:border-matrix-green/20 transition-colors"
              >
                <span className="text-matrix-green/40 font-mono text-xs flex-shrink-0 bg-matrix-dark/30 rounded px-2 py-1">
                  {shift.phase}
                </span>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-red-400/70 text-sm line-through flex-shrink-0">{shift.from}</span>
                  <svg className="w-5 h-5 text-matrix-green/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-matrix-green font-bold text-sm">{shift.to}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== SYSTEM FORMULA ========== */}
        <section
          className={`mb-16 transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionTitle icon="⬢" label="成功公式 · The Formula" color="neon-cyan" />

          <div className="border border-neon-cyan/20 rounded-xl p-6 sm:p-8 bg-neon-cyan/[0.02] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-neon-cyan/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="text-center space-y-6">
              <div className="font-mono text-lg sm:text-2xl text-white">
                <span className="text-neon-cyan">可持续盈利</span> =
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base font-mono">
                <FormulaBlock label="正期望值系统" color="matrix-green" />
                <span className="text-gray-500 text-lg">×</span>
                <FormulaBlock label="严格风控" color="neon-cyan" />
                <span className="text-gray-500 text-lg">×</span>
                <FormulaBlock label="一致性执行" color="matrix-green" />
                <span className="text-gray-500 text-lg">×</span>
                <FormulaBlock label="足够样本" color="neon-cyan" />
              </div>

              <div className="pt-4 border-t border-dark-border/50 max-w-2xl mx-auto">
                <p className="text-gray-400 text-sm leading-relaxed">
                  四个因子缺一不可。只有系统没有风控会爆仓，只有风控没有系统会慢性失血，
                  有系统有风控但执行不一致等于没有系统，样本不够则无法证明优势是否真实存在。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== GOLDEN RULES ========== */}
        <section
          className={`mb-16 transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionTitle icon="⟐" label="交易者信条 · Golden Rules" color="yellow-500" />

          <div className="border border-yellow-500/20 rounded-xl p-6 sm:p-8 bg-yellow-500/[0.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

            {/* Rotating rule highlight */}
            <div className="text-center mb-8">
              <div className="inline-block border border-yellow-500/20 rounded-lg p-5 sm:p-6 bg-dark-bg/50 min-h-[80px] flex items-center justify-center">
                <p className="text-yellow-400/90 text-base sm:text-lg font-bold transition-opacity duration-500 max-w-lg">
                  "{goldenRules[activeRule]}"
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                {goldenRules.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveRule(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      i === activeRule ? "bg-yellow-500 w-5" : "bg-yellow-500/20 hover:bg-yellow-500/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* All rules list */}
            <div className="space-y-3">
              {goldenRules.map((rule, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                    i === activeRule
                      ? "bg-yellow-500/[0.08] border border-yellow-500/20"
                      : "border border-transparent hover:bg-yellow-500/[0.03]"
                  }`}
                  onClick={() => setActiveRule(i)}
                >
                  <span className="text-yellow-500/50 font-mono text-xs mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-sm leading-relaxed transition-colors ${
                    i === activeRule ? "text-yellow-300" : "text-gray-400"
                  }`}>
                    {rule}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== THREE PILLARS ========== */}
        <section
          className={`mb-16 transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionTitle icon="⎈" label="三大支柱 · Three Pillars" color="matrix-green" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PillarCard
              number="01"
              title="技术系统"
              subtitle="TECHNICAL SYSTEM"
              items={[
                "市场结构分析",
                "Volume Profile 解读",
                "入场 / 失效 / 止盈规则",
                "过滤条件与场景识别",
              ]}
              color="matrix-green"
            />
            <PillarCard
              number="02"
              title="风险管理"
              subtitle="RISK MANAGEMENT"
              items={[
                "单笔风险上限 (1-2%)",
                "日亏损上限 (3%)",
                "最大回撤控制",
                "仓位计算与资金曲线",
              ]}
              color="neon-cyan"
            />
            <PillarCard
              number="03"
              title="交易心智"
              subtitle="TRADING PSYCHOLOGY"
              items={[
                "情绪识别与开关机制",
                "执行一致性评估",
                "错误模式库建设",
                "持续阅读与自我觉察",
              ]}
              color="matrix-green"
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs font-mono">
              三大支柱相互依存 — 缺少任何一个，系统都会崩溃
            </p>
          </div>
        </section>

        {/* ========== FINAL MESSAGE ========== */}
        <section
          className={`mb-10 transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="border border-matrix-green/20 rounded-xl p-6 sm:p-10 bg-gradient-to-br from-dark-card/80 via-dark-bg to-dark-card/80 relative overflow-hidden text-center">
            {/* Decorative borders */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-matrix-green/40 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-matrix-green/40 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-matrix-green/20 to-transparent" />
            <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-matrix-green/20 to-transparent" />

            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-matrix-green/30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-matrix-green/30" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-matrix-green/30" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-matrix-green/30" />

            <div className="relative">
              <span className="text-5xl sm:text-6xl mb-6 inline-block animate-pulse-glow rounded-full">🏆</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                终极目标
                <span className="text-matrix-green drop-shadow-[0_0_15px_rgba(0,255,65,0.3)]">
                  {" "}· 可持续盈利交易者
                </span>
              </h2>

              <div className="max-w-2xl mx-auto space-y-4 text-gray-300 leading-relaxed text-sm sm:text-[15px]">
                <p>
                  可持续盈利交易者不是一个终点，而是一种<span className="text-matrix-green font-bold">状态</span>——
                  一种持续自我进化、以流程为驱动、以数据为依据、以纪律为保障的交易状态。
                </p>
                <p>
                  到达这里，你不再焦虑单笔交易的盈亏，不再被市场的噪音牵着走，
                  不再在连亏后怀疑一切、在连盈后盲目自信。
                  你已经拥有了一套<span className="text-neon-cyan font-bold">可重复、可验证、可进化</span>的交易系统，
                  以及驾驭这个系统所需的心智力量。
                </p>
                <p className="text-matrix-green font-mono text-base sm:text-lg pt-4">
                  "交易的终极修炼，不是战胜市场，而是战胜自己。"
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-matrix-green border border-matrix-green/30 hover:border-matrix-green/60 rounded-lg px-6 py-3 font-mono text-sm hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  返回成长路径目录
                </button>
                <button
                  onClick={() => navigate("/step/technical-foundation")}
                  className="flex items-center gap-2 text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan/60 rounded-lg px-6 py-3 font-mono text-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all cursor-pointer"
                >
                  从 Phase 01 开始
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Signature */}
        <div
          className={`text-center transition-all duration-700 delay-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="inline-flex flex-col items-center gap-2 text-gray-700 text-xs font-mono">
            <div className="w-px h-8 bg-gradient-to-b from-matrix-green/20 to-transparent" />
            <span>TRADER GROWTH SYSTEM v2.0</span>
            <span className="text-matrix-green/30">SYSTEMATIC · DISCIPLINED · SUSTAINABLE</span>
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
          <svg className="w-5 h-5 text-matrix-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-matrix-green text-sm font-mono">目录</span>
          <div className="absolute inset-0 rounded-full border border-matrix-green/0 group-hover:border-matrix-green/20 scale-110 transition-all duration-500" />
        </div>
      </button>
    </div>
  );
}

/* ========== Helper Components ========== */

function SectionTitle({ icon, label, color }: { icon: string; label: string; color: string }) {
  const colorClass = color === "neon-cyan" ? "text-neon-cyan" : color === "yellow-500" ? "text-yellow-500" : "text-matrix-green";
  const barColor = color === "neon-cyan" ? "bg-neon-cyan" : color === "yellow-500" ? "bg-yellow-500" : "bg-matrix-green";

  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-1 h-6 ${barColor} rounded-full`} />
      <span className={`${colorClass} text-lg opacity-70`}>{icon}</span>
      <h2 className={`text-sm font-mono ${colorClass} tracking-wider uppercase`}>{label}</h2>
    </div>
  );
}

function FormulaBlock({ label, color }: { label: string; color: string }) {
  const borderColor = color === "neon-cyan" ? "border-neon-cyan/30" : "border-matrix-green/30";
  const textColor = color === "neon-cyan" ? "text-neon-cyan" : "text-matrix-green";
  const bgColor = color === "neon-cyan" ? "bg-neon-cyan/[0.06]" : "bg-matrix-green/[0.06]";

  return (
    <div className={`border ${borderColor} ${bgColor} rounded-lg px-4 py-2`}>
      <span className={`${textColor} font-bold text-sm sm:text-base`}>{label}</span>
    </div>
  );
}

function PillarCard({
  number,
  title,
  subtitle,
  items,
  color,
}: {
  number: string;
  title: string;
  subtitle: string;
  items: string[];
  color: string;
}) {
  const borderColor = color === "neon-cyan" ? "border-neon-cyan/20 hover:border-neon-cyan/40" : "border-matrix-green/20 hover:border-matrix-green/40";
  const numColor = color === "neon-cyan" ? "text-neon-cyan" : "text-matrix-green";
  const dotColor = color === "neon-cyan" ? "bg-neon-cyan/50" : "bg-matrix-green/50";

  return (
    <div className={`border ${borderColor} rounded-xl p-5 sm:p-6 bg-dark-card/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,65,0.05)]`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`${numColor} font-mono text-2xl font-black opacity-30`}>{number}</span>
        <div>
          <h3 className="text-white font-bold text-base">{title}</h3>
          <span className="text-gray-600 font-mono text-[10px] uppercase tracking-wider">{subtitle}</span>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-1.5 flex-shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
