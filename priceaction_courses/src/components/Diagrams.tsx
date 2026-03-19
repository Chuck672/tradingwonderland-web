

export const Diagram = ({ type, lang = 'zh' }: { type: string; lang?: 'zh' | 'en' }) => {
  const containerClass = "w-full h-full flex items-center justify-center p-4 opacity-90";
  const svgClass = "w-full max-w-2xl h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]";

  const t = (en: string, zh: string) => lang === 'zh' ? zh : en;

  switch (type) {
    // --- MODULE 1 & 2 EXISTING FIXES ---
    case 'fatal-flaws':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <circle cx="300" cy="150" r="100" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <text x="300" y="155" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Hindsight Bias', '事后偏见')}</text>
            <path d="M 200,150 L 150,150" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="140" y="155" fill="#9ca3af" fontSize="12" textAnchor="end" fontFamily="monospace">{t('Context Ignored', '忽略背景')}</text>
            <path d="M 400,150 L 450,150" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="460" y="155" fill="#9ca3af" fontSize="12" textAnchor="start" fontFamily="monospace">{t('Momentum Ignored', '忽略动量')}</text>
            <path d="M 300,50 L 300,100" fill="none" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="300" y="40" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Failures Ignored', '忽略失败')}</text>
          </svg>
        </div>
      );
    case 'mitigation-vs-retest':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            {/* Fake Retest */}
            <text x="150" y="40" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Fake Retest (Chop)', '虚假回测 (震荡)')}</text>
            <rect x="100" y="100" width="60" height="40" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeDasharray="4 4" />
            <path d="M 50,180 L 120,120 L 140,160 L 160,90 L 180,150" fill="none" stroke="#6b7280" strokeWidth="3" />
            <text x="150" y="210" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('No absorption, cuts like butter', '无吸收，直接穿透')}</text>
            
            <line x1="300" y1="20" x2="300" y2="280" stroke="#333" strokeWidth="2" />
            
            {/* Real Mitigation */}
            <text x="450" y="40" fill="#10b981" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('True Mitigation', '真实缓解')}</text>
            <rect x="400" y="100" width="60" height="40" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2" />
            <path d="M 350,220 L 400,140" fill="none" stroke="#6b7280" strokeWidth="3" />
            <circle cx="400" cy="140" r="4" fill="#10b981" />
            <path d="M 400,140 L 450,260" fill="none" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
            <text x="450" y="280" fill="#10b981" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Instant Rejection & Continuation', '立即拒绝并延续')}</text>
          </svg>
        </div>
      );
    case 'control-shift':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path d="M 50,200 C 150,200 200,50 300,50 C 400,50 450,250 550,250" fill="none" stroke="url(#grad1)" strokeWidth="6" strokeLinecap="round" />
            <circle cx="300" cy="50" r="8" fill="#22c55e" />
            <text x="300" y="30" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Control Transfer', '控制权转移')}</text>
            <rect x="250" y="40" width="100" height="20" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>
      );
    case 'retail-trap':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,250 L 550,100" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="6 6" />
            <text x="500" y="90" fill="#eab308" fontSize="14" fontFamily="monospace">{t('Retail Trendline', '散户趋势线')}</text>
            <path d="M 50,250 L 150,180 L 200,205 L 300,135 L 350,160 L 450,90" fill="none" stroke="#6b7280" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 450,90 L 500,40 L 520,150 L 560,280" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinejoin="round" />
            <circle cx="500" cy="40" r="8" fill="#ef4444" />
            <text x="500" y="25" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Liquidity Sweep (Trap)', '流动性扫荡 (陷阱)')}</text>
          </svg>
        </div>
      );
    case 'structure-formula':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 200" className={svgClass}>
            <rect x="40" y="60" width="120" height="80" rx="8" fill="#111" stroke="#22c55e" strokeWidth="3" />
            <text x="100" y="105" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Impulse', '冲动/脉冲')}</text>
            <path d="M 170,100 L 210,100" fill="none" stroke="#666" strokeWidth="3" markerEnd="url(#arrow)" />
            <rect x="230" y="60" width="120" height="80" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="3" />
            <text x="290" y="105" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Pullback', '回调')}</text>
            <path d="M 360,100 L 400,100" fill="none" stroke="#666" strokeWidth="3" markerEnd="url(#arrow)" />
            <rect x="420" y="60" width="140" height="80" rx="8" fill="#111" stroke="#a855f7" strokeWidth="3" />
            <text x="490" y="95" fill="#a855f7" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Acceptance/', '认可/')}</text>
            <text x="490" y="120" fill="#a855f7" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Rejection', '拒绝')}</text>
          </svg>
        </div>
      );
    // --- MODULE 4 SVG DIAGRAMS ---
    case 'fvg-anatomy':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="250" y="80" width="100" height="140" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeDasharray="4 4" />
            <text x="300" y="155" fill="#22c55e" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Fair Value Gap', '公允价值缺口')}</text>
            <text x="300" y="175" fill="#22c55e" fontSize="12" textAnchor="middle" fontFamily="monospace">({t('Inefficiency', '失衡/低效')})</text>
            
            {/* Candle 1 */}
            <line x1="150" y1="200" x2="150" y2="280" stroke="#fff" strokeWidth="2" />
            <rect x="135" y="220" width="30" height="40" fill="#fff" />
            <line x1="150" y1="200" x2="250" y2="200" stroke="#666" strokeWidth="1" strokeDasharray="2 2" />
            <text x="150" y="190" fill="#aaa" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Candle 1 High', '蜡烛1高点')}</text>

            {/* Candle 2 (Displacement) */}
            <line x1="300" y1="50" x2="300" y2="250" stroke="#22c55e" strokeWidth="2" />
            <rect x="285" y="60" width="30" height="170" fill="#22c55e" />
            <text x="400" y="60" fill="#22c55e" fontSize="14" textAnchor="start" fontFamily="monospace">{t('Aggressive Displacement', '激进位移')}</text>

            {/* Candle 3 */}
            <line x1="450" y1="20" x2="450" y2="100" stroke="#fff" strokeWidth="2" />
            <rect x="435" y="40" width="30" height="40" fill="#fff" />
            <line x1="350" y1="80" x2="450" y2="80" stroke="#666" strokeWidth="1" strokeDasharray="2 2" />
            <text x="450" y="115" fill="#aaa" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Candle 3 Low', '蜡烛3低点')}</text>
          </svg>
        </div>
      );
    case 'fvg-four-purposes':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="40" width="230" height="100" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="165" y="85" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('1. Continuation Entry', '1. 顺势入场')}</text>
            <text x="165" y="105" fill="#888" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Trend-following fill', '顺势回补入场')}</text>

            <rect x="320" y="40" width="230" height="100" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="435" y="85" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('2. Efficiency Read', '2. 效率读取')}</text>
            <text x="435" y="105" fill="#888" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Market strength/imbalance', '读取市场强弱/失衡')}</text>

            <rect x="50" y="160" width="230" height="100" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="165" y="205" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('3. Inducement Trap', '3. 诱导陷阱')}</text>
            <text x="165" y="225" fill="#888" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Liquidity bait', '诱导陷阱 (引流)')}</text>

            <rect x="320" y="160" width="230" height="100" rx="8" fill="#111" stroke="#a855f7" strokeWidth="2" />
            <text x="435" y="205" fill="#a855f7" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('4. FVG Inversion', '4. FVG 翻转')}</text>
            <text x="435" y="225" fill="#888" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Role reversal after fail', '失效后的角色翻转')}</text>
          </svg>
        </div>
      );
    case 'fvg-trap-logic':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="150" y="100" width="300" height="60" fill="rgba(234,179,8,0.15)" stroke="#eab308" strokeDasharray="4 4" />
            <text x="300" y="135" fill="#eab308" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Obvious FVG (Bait)', '明显的FVG (诱饵)')}</text>
            
            <path d="M 100,50 L 150,150 L 200,110" fill="none" stroke="#6b7280" strokeWidth="3" />
            <circle cx="200" cy="110" r="6" fill="#22c55e" />
            <text x="200" y="90" fill="#22c55e" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Retail Buy', '散户买入')}</text>

            <path d="M 200,110 L 250,250" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" markerEnd="url(#arrow)" />
            <line x1="100" y1="220" x2="400" y2="220" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <text x="350" y="210" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Real Liquidity Pool', '真实流动性池')}</text>
            <text x="250" y="270" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Stop Hunt!', '止损猎杀！')}</text>
          </svg>
        </div>
      );
    case 'fvg-inversion-logic':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="100" y="120" width="400" height="40" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeDasharray="4 4" />
            <text x="180" y="145" fill="#22c55e" fontSize="14" fontFamily="monospace">{t('Expected Support FVG', '预期支撑FVG')}</text>
            
            <path d="M 50,50 L 200,100 L 250,220 L 350,200 L 400,140" fill="none" stroke="#6b7280" strokeWidth="3" />
            
            <rect x="230" y="120" width="270" height="40" fill="rgba(239,68,68,0.3)" stroke="#ef4444" />
            <text x="400" y="145" fill="#ef4444" fontSize="14" fontFamily="monospace" fontWeight="bold">{t('Turns into Resistance', '转化为阻力')}</text>

            <circle cx="400" cy="140" r="6" fill="#ef4444" />
            <path d="M 400,140 L 450,260" fill="none" stroke="#ef4444" strokeWidth="5" markerEnd="url(#arrow)" />
            <text x="450" y="280" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Inversion Dump', '翻转下跌')}</text>
          </svg>
        </div>
      );
    case 'inversion-vs-breaker':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <line x1="300" y1="20" x2="300" y2="280" stroke="#444" strokeWidth="2" />
            
            {/* Breaker */}
            <text x="150" y="40" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Breaker Block', '断路器块')}</text>
            <rect x="50" y="120" width="200" height="30" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="150" y="140" fill="#888" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Failed Order Block (Entity)', '失败的订单块 (实体)')}</text>
            <text x="150" y="200" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Defense Logic Fails', '防御逻辑失效')}</text>
            <text x="150" y="220" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Trapped Traders Reposition', '被套交易者重新定位')}</text>

            {/* Inversion */}
            <text x="450" y="40" fill="#a855f7" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('FVG Inversion', 'FVG 翻转')}</text>
            <rect x="350" y="110" width="200" height="50" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeDasharray="4 4" />
            <text x="450" y="140" fill="#888" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Failed Gap (Inefficiency)', '失败的缺口 (失衡)')}</text>
            <text x="450" y="200" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Acceptance Logic Shifts', '认可逻辑转移')}</text>
            <text x="450" y="220" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Vacuum Zone Flips Role', '真空区角色翻转')}</text>
          </svg>
        </div>
      );
    case 'amd_cycle':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
            <path d="M 50 100 L 150 100" stroke="#888" strokeWidth="4" strokeDasharray="5,5" fill="none" />
            <path d="M 150 100 L 180 150 L 210 100" stroke="#ef4444" strokeWidth="4" fill="none" />
            <path d="M 210 100 L 350 40" stroke="#22c55e" strokeWidth="4" fill="none" />
            <text x="100" y="90" fill="#888" fontSize="14" textAnchor="middle">{t('1. Accumulation', '1. 累积')}</text>
            <text x="180" y="170" fill="#ef4444" fontSize="14" textAnchor="middle">{t('2. Manipulation', '2. 操纵')}</text>
            <text x="280" y="50" fill="#22c55e" fontSize="14" textAnchor="middle">{t('3. Distribution', '3. 派发')}</text>
          </svg>
        </div>
      );
    case 'range-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,255,0,0.3)]">
            <rect x="50" y="60" width="300" height="80" fill="rgba(136,136,136,0.1)" stroke="#888" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M 50 100 L 80 70 L 120 130 L 160 80 L 200 120 L 250 65 L 300 135 L 350 100" stroke="#00ff00" strokeWidth="3" fill="none" />
            <text x="200" y="50" fill="#fff" fontSize="16" textAnchor="middle">{t('Equal Highs (Liquidity Pool)', '等高点 (流动性池)')}</text>
            <text x="200" y="160" fill="#fff" fontSize="16" textAnchor="middle">{t('Equal Lows (Liquidity Pool)', '等低点 (流动性池)')}</text>
          </svg>
        </div>
      );
    case 'manipulation-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <rect x="50" y="60" width="150" height="80" fill="rgba(136,136,136,0.1)" stroke="#888" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M 50 100 L 150 120 L 180 180" stroke="#ef4444" strokeWidth="4" fill="none" />
            <text x="180" y="195" fill="#ef4444" fontSize="14" textAnchor="middle">{t('Manipulation', '操纵')}</text>
          </svg>
        </div>
      );
     case 'session_amd':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <rect x="20" y="80" width="100" height="40" fill="rgba(156,163,175,0.2)" stroke="#888" strokeWidth="2" />
            <text x="70" y="70" fill="#888" fontSize="12" textAnchor="middle">{t('Asia (Accumulation)', '亚洲盘 (累积)')}</text>
            <path d="M 120 100 L 160 160" stroke="#ef4444" strokeWidth="3" fill="none" />
            <text x="160" y="180" fill="#ef4444" fontSize="12" textAnchor="middle">{t('London (Manipulation)', '伦敦盘 (操纵)')}</text>
            <path d="M 160 160 L 350 40" stroke="#22c55e" strokeWidth="4" fill="none" />
            <text x="280" y="50" fill="#22c55e" fontSize="12" textAnchor="middle">{t('NY (Expansion)', '纽约盘 (扩张)')}</text>
          </svg>
        </div>
      );
    case 'idm_trap':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            <path d="M 50 180 L 100 80 L 140 120 L 200 60 L 240 140 L 350 30" stroke="#22c55e" strokeWidth="3" fill="none" />
            <circle cx="140" cy="120" r="5" fill="#f59e0b" />
            <text x="140" y="140" fill="#f59e0b" fontSize="12" textAnchor="middle">{t('IDM (Inducement)', 'IDM (诱导)')}</text>
            <path d="M 200 60 L 240 140" stroke="#ef4444" strokeWidth="4" fill="none" />
            <rect x="220" y="140" width="40" height="20" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" />
            <text x="280" y="155" fill="#3b82f6" fontSize="12">{t('Extreme OB', '极端订单块')}</text>
          </svg>
        </div>
      );
    case 'survival-checklist':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
            <rect x="40" y="20" width="320" height="160" rx="10" fill="rgba(0,0,0,0.5)" stroke="#eab308" strokeWidth="2" />
            <text x="200" y="50" fill="#fff" fontSize="18" fontWeight="bold" textAnchor="middle">{t('Survival Checklist', '生存清单')}</text>
            <text x="60" y="80" fill="#ef4444" fontSize="14">{t('❌ Trade in initial range', '❌ 在初始区间内交易')}</text>
            <text x="60" y="110" fill="#ef4444" fontSize="14">{t('❌ Chase first breakout', '❌ 追逐第一次突破')}</text>
            <text x="60" y="140" fill="#22c55e" fontSize="14">{t('✅ Wait for sweep & reclaim', '✅ 等待扫损与重新收复')}</text>
          </svg>
        </div>
      );
    case 'fvg-checklist':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="100" y="30" width="400" height="240" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="300" y="60" fill="#22c55e" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('FVG Screening Checklist', 'FVG 筛选清单')}</text>
            
            <circle cx="140" cy="100" r="6" fill="#22c55e" />
            <text x="160" y="105" fill="#fff" fontSize="14" fontFamily="monospace">{t('Did it come from a real Displacement?', '是否源自真实的位移？')}</text>
            <circle cx="140" cy="140" r="6" fill="#22c55e" />
            <text x="160" y="145" fill="#fff" fontSize="14" fontFamily="monospace">{t('Is it aligned with an Order Block / CHOCH?', '是否与订单块 / CHOCH 对齐？')}</text>
            <circle cx="140" cy="180" r="6" fill="#ef4444" />
            <text x="160" y="185" fill="#fff" fontSize="14" fontFamily="monospace">{t('Are there juicy Liquidity Pools below/above it?', '上下是否有丰富的流动性池？')}</text>
            <text x="160" y="200" fill="#888" fontSize="12" fontFamily="monospace">{t('(If yes -> High probability it\'s an Inducement Trap)', '(如果是 -> 极有可能是诱导陷阱)')}</text>
            <circle cx="140" cy="230" r="6" fill="#a855f7" />
            <text x="160" y="235" fill="#fff" fontSize="14" fontFamily="monospace">{t('Was it completely disrespected? (Inversion candidate)', '是否完全被无视？(倒置候选)')}</text>
          </svg>
        </div>
      );

    // --- MODULE 5 NEW DIAGRAMS ---
    case 'disp-vs-exh':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            {/* Displacement */}
            <rect x="50" y="50" width="220" height="200" fill="#111" stroke="#22c55e" strokeWidth="2" rx="8" />
            <text x="160" y="90" fill="#22c55e" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Displacement', '位移')}</text>
            <path d="M 80,220 L 120,120 L 150,140 L 220,60" fill="none" stroke="#22c55e" strokeWidth="4" />
            <text x="160" y="240" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Real Repricing', '真实重新定价')}</text>

            {/* Exhaustion */}
            <rect x="330" y="50" width="220" height="200" fill="#111" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="440" y="90" fill="#ef4444" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Exhaustion', '衰竭')}</text>
            <path d="M 360,220 L 400,200 L 420,60 L 450,230" fill="none" stroke="#ef4444" strokeWidth="4" />
            <text x="440" y="240" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Terminal Trap', '末端陷阱')}</text>
          </svg>
        </div>
      );
    case 'breakout-trap':
    case 'breakout_trap':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <line x1="50" y1="120" x2="550" y2="120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" />
            <text x="300" y="110" fill="#3b82f6" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Retail Resistance', '散户阻力位')}</text>
            <path d="M 50,250 L 150,200 L 250,220 L 300,50 L 350,260" fill="none" stroke="#d1d5db" strokeWidth="4" strokeLinejoin="round" />
            <rect x="280" y="40" width="40" height="60" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="2" />
            <text x="300" y="30" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('"Strong" breakout?', '"强力" 突破？')}</text>
            <text x="350" y="280" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('NO! Instant Rejection.', '不！立即被拒绝。')}</text>
          </svg>
        </div>
      );
    case 'four-terms':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="40" width="220" height="100" fill="#111" stroke="#22c55e" rx="6" />
            <text x="160" y="80" fill="#22c55e" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Imbalance', '不平衡')}</text>
            <text x="160" y="110" fill="#aaa" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Localized trace', '局部痕迹')}</text>

            <rect x="330" y="40" width="220" height="100" fill="#111" stroke="#a855f7" rx="6" />
            <text x="440" y="80" fill="#a855f7" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Void', '真空')}</text>
            <text x="440" y="110" fill="#aaa" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Massive traversal gap', '巨大的穿越缺口')}</text>

            <rect x="50" y="160" width="220" height="100" fill="#111" stroke="#3b82f6" rx="6" />
            <text x="160" y="200" fill="#3b82f6" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Displacement', '位移')}</text>
            <text x="160" y="230" fill="#aaa" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Verdict: True Ignition', '结论：真实点火')}</text>

            <rect x="330" y="160" width="220" height="100" fill="#111" stroke="#ef4444" rx="6" />
            <text x="440" y="200" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Exhaustion', '衰竭')}</text>
            <text x="440" y="230" fill="#aaa" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Verdict: Terminal Trap', '结论：末端陷阱')}</text>
          </svg>
        </div>
      );
    case 'disp-anatomy':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,250 L 150,280 L 250,100" fill="none" stroke="#22c55e" strokeWidth="5" />
            <line x1="150" y1="180" x2="400" y2="180" stroke="#4b5563" strokeWidth="2" strokeDasharray="4 4" />
            <rect x="230" y="140" width="40" height="60" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeDasharray="2 2" />
            <path d="M 250,100 L 280,130 L 350,50" fill="none" stroke="#22c55e" strokeWidth="5" />
            <circle cx="280" cy="130" r="6" fill="#fff" />
            <text x="280" y="150" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Shallow Absorption', '浅层吸收')}</text>
            <text x="350" y="30" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Continuation', '延续')}</text>
          </svg>
        </div>
      );
    case 'exh-anatomy':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,250 L 100,200 L 150,220 L 200,160 L 250,180" fill="none" stroke="#6b7280" strokeWidth="3" />
            <line x1="50" y1="160" x2="500" y2="160" stroke="#eab308" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 250,180 L 300,40" fill="none" stroke="#22c55e" strokeWidth="6" />
            <text x="300" y="25" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Giant Fake Candle', '巨大的虚假K线')}</text>
            <path d="M 300,40 L 350,260" fill="none" stroke="#ef4444" strokeWidth="6" />
            <text x="350" y="280" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Instant Wipeout', '立即被清除')}</text>
          </svg>
        </div>
      );
    case 'location-check':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <circle cx="150" cy="150" r="100" fill="#111" stroke="#22c55e" strokeWidth="4" />
            <text x="150" y="140" fill="#22c55e" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('START', '起点')}</text>
            <text x="150" y="170" fill="#aaa" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Post-Sweep', '扫损后')}</text>

            <circle cx="450" cy="150" r="100" fill="#111" stroke="#ef4444" strokeWidth="4" />
            <text x="450" y="140" fill="#ef4444" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('END', '终点')}</text>
            <text x="450" y="170" fill="#aaa" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Near Old Highs', '接近旧高点')}</text>
            
            <path d="M 270,150 L 330,150" fill="none" stroke="#fff" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="300" y="140" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('3-Sec Check', '3秒检查')}</text>
          </svg>
        </div>
      );
    case 'acceptance-check':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <line x1="100" y1="150" x2="500" y2="150" stroke="#fff" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 100,250 L 200,100 L 250,130" fill="none" stroke="#22c55e" strokeWidth="4" />
            <circle cx="250" cy="130" r="6" fill="#22c55e" />
            <text x="250" y="100" fill="#22c55e" fontSize="14" fontFamily="monospace">{t('Holds Above', '站稳上方')}</text>

            <path d="M 350,250 L 450,50 L 480,260" fill="none" stroke="#ef4444" strokeWidth="4" />
            <circle cx="480" cy="260" r="6" fill="#ef4444" />
            <text x="480" y="280" fill="#ef4444" fontSize="14" fontFamily="monospace">{t('Instant Reject', '立即拒绝')}</text>
          </svg>
        </div>
      );
    case 'follow-through-check':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 100,250 L 150,150 L 200,180 L 280,50" fill="none" stroke="#22c55e" strokeWidth="5" />
            <text x="250" y="40" fill="#22c55e" fontSize="16" fontFamily="monospace" fontWeight="bold">{t('Leg 2 (Validation)', '第二段 (验证)')}</text>

            <path d="M 350,250 L 400,100 L 450,250 L 500,250" fill="none" stroke="#ef4444" strokeWidth="5" />
            <text x="450" y="280" fill="#ef4444" fontSize="16" fontFamily="monospace" fontWeight="bold">{t('No Leg 2 (Death)', '无第二段 (失败)')}</text>
          </svg>
        </div>
      );

    case 'void-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="200" y="50" width="200" height="200" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeDasharray="8 8" />
            <text x="300" y="150" fill="#a855f7" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Liquidity Void', '流动性真空')}</text>
            <text x="300" y="175" fill="#888" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Fast price delivery zone', '快速价格交付区')}</text>
            
            <path d="M 50,250 L 200,250 L 400,50 L 550,50" fill="none" stroke="#a855f7" strokeWidth="4" />
            <text x="125" y="240" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Slow Build', '缓慢构建')}</text>
            <text x="475" y="40" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Slow Build', '缓慢构建')}</text>
          </svg>
        </div>
      );
    case 'disp-vs-exh-summary':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="30" width="500" height="240" fill="#111" stroke="#3b82f6" strokeWidth="2" rx="8" />
            <text x="300" y="70" fill="#3b82f6" fontSize="22" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('3-Second Rule Filter', '3秒规则过滤器')}</text>
            <text x="300" y="120" fill="#fff" fontSize="18" textAnchor="middle" fontFamily="monospace">{t('1. Location: Initiation or Termination?', '1. 位置：启动还是终结？')}</text>
            <text x="300" y="170" fill="#fff" fontSize="18" textAnchor="middle" fontFamily="monospace">{t('2. Acceptance: Holds or Rejects?', '2. 接受：站稳还是拒绝？')}</text>
            <text x="300" y="220" fill="#fff" fontSize="18" textAnchor="middle" fontFamily="monospace">{t('3. Follow-Through: Leg 2 or Bleed?', '3. 后续：第二段还是衰竭？')}</text>
          </svg>
        </div>
      );
    case 'four-states':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 400" className={svgClass}>
            <line x1="300" y1="50" x2="300" y2="350" stroke="#333" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="50" y1="200" x2="550" y2="200" stroke="#333" strokeWidth="2" strokeDasharray="4 4" />
            <text x="175" y="100" fill="#22c55e" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('1. Expansion', '1. 扩张')}</text>
            <text x="425" y="100" fill="#3b82f6" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('2. Pullback', '2. 回调')}</text>
            <text x="175" y="300" fill="#ef4444" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('3. Transition', '3. 转换')}</text>
            <text x="425" y="300" fill="#a855f7" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('4. Range', '4. 区间')}</text>
          </svg>
        </div>
      );
    case 'expansion-trend':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,250 L 150,150 L 180,170 L 300,50 L 330,70 L 450,10" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
            <rect x="140" y="140" width="30" height="40" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeDasharray="2 2" />
            <rect x="290" y="40" width="30" height="40" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeDasharray="2 2" />
            <text x="100" y="140" fill="#22c55e" fontSize="16" fontFamily="monospace">{t('Displacement', '位移')}</text>
            <text x="250" y="40" fill="#22c55e" fontSize="16" fontFamily="monospace">{t('Displacement', '位移')}</text>
            <text x="400" y="150" fill="#fff" fontSize="18" fontFamily="monospace" fontWeight="bold">{t('Institutional Expansion', '机构扩张')}</text>
            <text x="400" y="170" fill="#888" fontSize="14" fontFamily="monospace">{t('Aggressive Repricing', '激进重新定价')}</text>
          </svg>
        </div>
      );
    case 'controlled-pullback':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,250 L 200,50" fill="none" stroke="#22c55e" strokeWidth="5" />
            <path d="M 200,50 L 230,80 L 210,100 L 240,130 L 220,150 L 250,180" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <circle cx="250" cy="180" r="6" fill="#3b82f6" />
            <text x="300" y="185" fill="#3b82f6" fontSize="16" fontFamily="monospace">{t('Orderly Retracement', '有序回撤')}</text>
            <text x="300" y="205" fill="#888" fontSize="14" fontFamily="monospace">{t('Liquidity Re-stocking', '流动性补给')}</text>
            <rect x="180" y="180" width="100" height="40" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeDasharray="4 4" />
            <text x="230" y="240" fill="#3b82f6" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('POI (OB/FVG)', '兴趣点 (OB/FVG)')}</text>
          </svg>
        </div>
      );
    case 'transition-phase':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,250 L 150,150 L 200,180 L 300,100 L 350,120 L 450,115 L 500,250" fill="none" stroke="#ef4444" strokeWidth="4" />
            <circle cx="450" cy="115" r="8" fill="#ef4444" />
            <text x="450" y="90" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Control Shift (CHOCH)', '控制权转移 (CHOCH)')}</text>
            <text x="450" y="280" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Bearish Displacement', '看跌位移')}</text>
            <line x1="300" y1="100" x2="550" y2="100" stroke="#eab308" strokeWidth="2" strokeDasharray="4 4" />
            <text x="500" y="90" fill="#eab308" fontSize="14" fontFamily="monospace">{t('Old High Sweep', '旧高点扫损')}</text>
          </svg>
        </div>
      );
    case 'range-auction':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="80" width="500" height="140" fill="rgba(156,163,175,0.05)" stroke="#4b5563" strokeWidth="2" strokeDasharray="8 8" />
            <path d="M 50,150 L 100,90 L 150,210 L 200,100 L 250,200 L 300,110 L 350,190 L 400,150" fill="none" stroke="#9ca3af" strokeWidth="3" />
            <text x="300" y="70" fill="#9ca3af" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Range High (Liquidity)', '区间高点 (流动性)')}</text>
            <text x="300" y="240" fill="#9ca3af" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Range Low (Liquidity)', '区间低点 (流动性)')}</text>
            <text x="300" y="155" fill="#4b5563" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Equilibrium (Fair Value)', '均衡 (公允价值)')}</text>
          </svg>
        </div>
      );

    case 'retail-mistakes':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,200 L 150,50 L 250,220 L 350,100 L 450,250" fill="none" stroke="#6b7280" strokeWidth="3" />
            <circle cx="150" cy="50" r="8" fill="#ef4444" />
            <text x="150" y="30" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Chasing Breakout', '追逐突破')}</text>
            <circle cx="350" cy="100" r="8" fill="#ef4444" />
            <text x="350" y="80" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Buying Resistance', '在阻力位买入')}</text>
            <text x="300" y="280" fill="#ef4444" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('RETAIL LIQUIDITY GENERATORS', '散户流动性制造者')}</text>
          </svg>
        </div>
      );

    case 'core-conclusion-m1':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="50" width="500" height="200" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="300" y="90" fill="#3b82f6" fontSize="26" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Module 1: The Foundation', '模块 1: 基础')}</text>
            <text x="100" y="140" fill="#fff" fontSize="18" fontFamily="monospace">{t('1. Expansion = Institutional Intent', '1. 扩张 = 机构意图')}</text>
            <text x="100" y="170" fill="#fff" fontSize="18" fontFamily="monospace">{t('2. Pullback = Controlled Re-pricing', '2. 回调 = 受控重新定价')}</text>
            <text x="100" y="200" fill="#fff" fontSize="18" fontFamily="monospace">{t('3. Transition = Shift in Control', '3. 转换 = 控制权转移')}</text>
            <text x="100" y="230" fill="#fff" fontSize="18" fontFamily="monospace">{t('4. Range = Liquidity Building', '4. 区间 = 流动性构建')}</text>
          </svg>
        </div>
      );
    case 'ob-title':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 200" className={svgClass}>
            <rect x="100" y="50" width="400" height="100" rx="12" fill="#111" stroke="#3b82f6" strokeWidth="4" />
            <text x="300" y="100" fill="#3b82f6" fontSize="36" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('ORDER BLOCK 2.0', '订单块 2.0')}</text>
            <text x="300" y="130" fill="#888" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Institutional Footprint Identification', '机构足迹识别')}</text>
          </svg>
        </div>
      );
    case 'fake-vs-real-ob':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <line x1="300" y1="20" x2="300" y2="280" stroke="#333" strokeWidth="2" />
            <text x="150" y="40" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Retail "OB" (Trap)', '散户 "OB" (陷阱)')}</text>
            <path d="M 50,150 L 100,140 L 150,160 L 200,150" fill="none" stroke="#6b7280" strokeWidth="3" />
            <text x="150" y="200" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('No Displacement, No Sweep', '无位移，无扫损')}</text>
            
            <text x="450" y="40" fill="#22c55e" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Institutional OB', '机构 OB')}</text>
            <path d="M 350,250 L 400,260 L 450,50" fill="none" stroke="#22c55e" strokeWidth="5" />
            <circle cx="400" cy="260" r="8" fill="#ef4444" />
            <text x="450" y="200" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Sweep + Violent Displacement', '扫损 + 剧烈位移')}</text>
          </svg>
        </div>
      );
    case 'ob-criteria':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="50" width="500" height="200" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="300" y="80" fill="#3b82f6" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('High Probability OB Checklist', '高概率 OB 清单')}</text>
            <text x="100" y="120" fill="#fff" fontSize="16" fontFamily="monospace">{t('1. Did it sweep liquidity before forming?', '1. 形成前是否扫过流动性？')}</text>
            <text x="100" y="150" fill="#fff" fontSize="16" fontFamily="monospace">{t('2. Did it create a CHOCH or BOS?', '2. 是否产生了 CHOCH 或 BOS？')}</text>
            <text x="100" y="180" fill="#fff" fontSize="16" fontFamily="monospace">{t('3. Did it leave an FVG (Imbalance)?', '3. 是否留下了 FVG (失衡)？')}</text>
            <text x="100" y="210" fill="#fff" fontSize="16" fontFamily="monospace">{t('4. Is it at a HTF POI?', '4. 是否处于高时间框架的 POI？')}</text>
          </svg>
        </div>
      );

    case 'ob-essence':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="100" y="100" width="100" height="100" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2" />
            <text x="150" y="90" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Sell OB', '卖出 OB')}</text>
            <path d="M 200,150 L 500,150" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <text x="350" y="140" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Institutional Sell Limit Orders', '机构卖出限价单')}</text>
            
            <path d="M 50,250 L 150,150 L 170,180 L 500,50" fill="none" stroke="#22c55e" strokeWidth="4" />
            <text x="400" y="40" fill="#22c55e" fontSize="16" fontFamily="monospace">{t('Price Delivery', '价格交付')}</text>
          </svg>
        </div>
      );

    case 'high-quality-ob':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <circle cx="300" cy="150" r="120" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="8 8" />
            <text x="300" y="140" fill="#22c55e" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('High Quality OB', '高质量 OB')}</text>
            <text x="300" y="165" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Sweep + Displacement + Fresh', '扫损 + 位移 + 新鲜')}</text>
            
            <path d="M 300,30 L 300,10" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="300" y="25" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('HTF Alignment', '高时间框架对齐')}</text>
          </svg>
        </div>
      );
    case 'block-matrix':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="50" width="240" height="100" fill="#111" stroke="#3b82f6" rx="6" />
            <text x="170" y="90" fill="#3b82f6" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Mitigation Block', '缓解块')}</text>
            <text x="170" y="120" fill="#888" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('No Sweep, Failed High/Low', '无扫损，失败的高/低点')}</text>
            
            <rect x="310" y="50" width="240" height="100" fill="#111" stroke="#ef4444" rx="6" />
            <text x="430" y="90" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Breaker Block', '破坏块')}</text>
            <text x="430" y="120" fill="#888" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Sweep + Failed Defense', '扫损 + 防御失败')}</text>
            
            <rect x="180" y="170" width="240" height="100" fill="#111" stroke="#a855f7" rx="6" />
            <text x="300" y="210" fill="#a855f7" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Vacuum Block', '真空块')}</text>
            <text x="300" y="240" fill="#888" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Thin Liquidity / Gap Fill', '薄弱流动性 / 缺口填充')}</text>
          </svg>
        </div>
      );
    case 'mitigation-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,250 L 150,100 L 200,130 L 250,280" fill="none" stroke="#6b7280" strokeWidth="3" />
            <rect x="130" y="100" width="40" height="30" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" />
            <text x="150" y="90" fill="#3b82f6" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Failed High (Weakness)', '失败的高点 (弱势)')}</text>
            <path d="M 250,280 L 300,115 L 350,130 L 450,280" fill="none" stroke="#ef4444" strokeWidth="4" />
            <circle cx="300" cy="115" r="6" fill="#3b82f6" />
            <text x="350" y="110" fill="#3b82f6" fontSize="16" fontFamily="monospace">{t('Mitigation Tap', '缓解触碰')}</text>
            <text x="350" y="130" fill="#888" fontSize="14" fontFamily="monospace">{t('(Exiting underwater longs)', '(退出套牢的多单)')}</text>
          </svg>
        </div>
      );
    case 'breaker-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,200 L 100,250 L 200,50 L 250,80 L 300,280" fill="none" stroke="#6b7280" strokeWidth="3" />
            <circle cx="100" cy="250" r="8" fill="#ef4444" />
            <text x="100" y="270" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Liquidity Sweep', '流动性扫损')}</text>
            <rect x="180" y="50" width="40" height="30" fill="rgba(239,68,68,0.2)" stroke="#ef4444" />
            <text x="200" y="40" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Breaker (Failed OB)', '破坏块 (失败的 OB)')}</text>
            <path d="M 300,280 L 350,65 L 400,80 L 500,250" fill="none" stroke="#ef4444" strokeWidth="4" />
            <circle cx="350" cy="65" r="6" fill="#ef4444" />
            <text x="400" y="60" fill="#ef4444" fontSize="16" fontFamily="monospace">{t('Breaker Retest', '破坏块回测')}</text>
          </svg>
        </div>
      );
    case 'vacuum-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="150" y="50" width="300" height="200" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeDasharray="10 10" />
            <path d="M 50,250 L 150,250 L 450,50 L 550,50" fill="none" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
            <text x="300" y="150" fill="#a855f7" fontSize="24" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('PRICE VACUUM', '价格真空')}</text>
            <text x="300" y="180" fill="#888" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Zero Resistance Zone', '零阻力区')}</text>
            <text x="300" y="270" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Price "teleports" through inefficiencies', '价格通过不平衡区“瞬间移动”')}</text>
          </svg>
        </div>
      );
    case 'state-flow':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="120" width="100" height="60" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="100" y="155" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Expansion', '扩张')}</text>
            <path d="M 150,150 L 200,150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="200" y="120" width="100" height="60" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="250" y="155" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Pullback', '回调')}</text>
            <path d="M 300,150 L 350,150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="350" y="120" width="100" height="60" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="400" y="155" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Transition', '转换')}</text>
            <path d="M 450,150 L 500,150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="500" y="120" width="80" height="60" rx="8" fill="#111" stroke="#a855f7" strokeWidth="2" />
            <text x="540" y="155" fill="#a855f7" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Range', '区间')}</text>
          </svg>
        </div>
      );
    case 'checklist':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="100" y="50" width="400" height="200" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="300" y="80" fill="#22c55e" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Execution Checklist', '执行清单')}</text>
            <text x="140" y="120" fill="#fff" fontSize="16" fontFamily="monospace">{t('✅ HTF Narrative Alignment', '✅ 高时间框架叙事对齐')}</text>
            <text x="140" y="150" fill="#fff" fontSize="16" fontFamily="monospace">{t('✅ Liquidity Sweep Confirmed', '✅ 流动性扫损已确认')}</text>
            <text x="140" y="180" fill="#fff" fontSize="16" fontFamily="monospace">{t('✅ Displacement Footprint Present', '✅ 存在位移足迹')}</text>
            <text x="140" y="210" fill="#fff" fontSize="16" fontFamily="monospace">{t('✅ Low Risk Entry Zone (POI)', '✅ 低风险入场区 (POI)')}</text>
          </svg>
        </div>
      );

    // --- MODULE 3 NEW DIAGRAMS ---
    case 'liquidity-magnet':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass + " drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]"}>
            <path d="M 100,200 Q 300,200 300,100" fill="none" stroke="#6b7280" strokeWidth="4" strokeDasharray="6 6" />
            <path d="M 50,250 L 150,150 L 220,180 L 300,50" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
            
            <rect x="260" y="30" width="80" height="40" fill="rgba(234,179,8,0.2)" stroke="#eab308" strokeWidth="2" rx="4" />
            <text x="300" y="55" fill="#eab308" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('LIQUIDITY', '流动性')}</text>
            
            {/* Magnet waves */}
            <path d="M 230,100 Q 260,80 250,50" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 370,100 Q 340,80 350,50" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="3 3" />
            <text x="300" y="20" fill="#fff" fontSize="18" textAnchor="middle" fontFamily="monospace">{t('Price moves to liquidity first', '价格首先向流动性移动')}</text>
          </svg>
        </div>
      );

    case 'liquidity-reality':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="100" y="50" width="400" height="200" fill="none" stroke="#333" strokeWidth="2" rx="8" />
            
            <circle cx="200" cy="150" r="60" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2" />
            <text x="200" y="145" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Institutional', '机构')}</text>
            <text x="200" y="165" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Orders', '订单')}</text>
            
            <circle cx="400" cy="150" r="80" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <text x="400" y="140" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Retail Stops', '散户止损')}</text>
            <text x="400" y="160" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('& Breakout', '& 突破')}</text>
            <text x="400" y="180" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Traders', '交易者')}</text>

            <path d="M 270,150 L 310,150" fill="none" stroke="#eab308" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="300" y="130" fill="#eab308" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Needs Counter-party', '需要对手方')}</text>
          </svg>
        </div>
      );

    case 'liquidity-core':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 300,50 L 300,250" fill="none" stroke="#4b5563" strokeWidth="2" strokeDasharray="4 4" />
            
            <text x="150" y="100" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" opacity="0.5">{t('Wrong Question:', '错误的问题：')}</text>
            <text x="150" y="130" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('"Will it reverse here?"', '“会在这里反转吗？”')}</text>
            <path d="M 100,160 L 150,140 L 200,180" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.5" />
            
            <text x="450" y="100" fill="#22c55e" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Right Question:', '正确的问题：')}</text>
            <text x="450" y="130" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('"Where is the nearest liquidity?"', '“最近的流动性在哪里？”')}</text>
            
            <rect x="400" y="160" width="100" height="20" fill="rgba(234,179,8,0.2)" stroke="#eab308" />
            <path d="M 380,220 L 420,150 L 450,180 L 500,100" fill="none" stroke="#22c55e" strokeWidth="4" />
          </svg>
        </div>
      );

    case 'liquidity-pool-types':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="30" width="230" height="60" fill="#111" stroke="#3b82f6" rx="6" />
            <text x="165" y="65" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('1. Equal Highs/Lows', '1. 等高点/等低点')}</text>

            <rect x="320" y="30" width="230" height="60" fill="#111" stroke="#ef4444" rx="6" />
            <text x="435" y="65" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('2. Stop Hunt / Swings', '2. 止损猎杀 / 波动点')}</text>

            <rect x="50" y="120" width="230" height="60" fill="#111" stroke="#a855f7" rx="6" />
            <text x="165" y="155" fill="#a855f7" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('3. FVG Inducement', '3. FVG 诱导')}</text>

            <rect x="320" y="120" width="230" height="60" fill="#111" stroke="#eab308" rx="6" />
            <text x="435" y="155" fill="#eab308" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('4. Old High / Low', '4. 旧高点 / 低点')}</text>

            <rect x="50" y="210" width="230" height="60" fill="#111" stroke="#10b981" rx="6" />
            <text x="165" y="245" fill="#10b981" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('5. Session High/Low', '5. 交易时段高点/低点')}</text>

            <rect x="320" y="210" width="230" height="60" fill="#111" stroke="#f97316" rx="6" />
            <text x="435" y="245" fill="#f97316" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('6. Trendline / Crowded', '6. 趋势线 / 拥挤区')}</text>
          </svg>
        </div>
      );

    case 'equal-highs-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass + " drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]"}>
            <line x1="100" y1="100" x2="500" y2="100" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" />
            <text x="300" y="90" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Retail Resistance / Buy Stops', '散户阻力 / 买入止损')}</text>
            
            <path d="M 50,250 L 150,100 L 200,180 L 300,100 L 350,150 L 400,60 L 450,260" fill="none" stroke="#d1d5db" strokeWidth="4" strokeLinejoin="round" />
            <circle cx="400" cy="60" r="6" fill="#ef4444" />
            <text x="400" y="45" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Sweep & Reject', '扫损 & 拒绝')}</text>
          </svg>
        </div>
      );

    case 'stop-hunt-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass + " drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]"}>
            <path d="M 50,50 L 200,200 L 250,150 L 300,250 L 350,100" fill="none" stroke="#d1d5db" strokeWidth="4" strokeLinejoin="round" />
            <line x1="150" y1="200" x2="400" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <text x="420" y="205" fill="#ef4444" fontSize="16" fontFamily="monospace">{t('Swing Low', '波动低点')}</text>
            
            <circle cx="300" cy="250" r="8" fill="#ef4444" />
            <text x="300" y="275" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Stop Hunt', '止损猎杀')}</text>
            
            <path d="M 300,250 L 350,100 L 400,120 L 500,40" fill="none" stroke="#22c55e" strokeWidth="5" />
          </svg>
        </div>
      );

    case 'fvg-trap-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass + " drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]"}>
            <rect x="250" y="150" width="60" height="40" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeDasharray="2 2" />
            <text x="360" y="175" fill="#a855f7" fontSize="16" fontFamily="monospace">{t('Obvious FVG (Trap)', '明显的 FVG (陷阱)')}</text>
            
            <path d="M 50,250 L 150,200 L 200,280 L 300,50" fill="none" stroke="#4b5563" strokeWidth="3" opacity="0.5" />
            
            <line x1="150" y1="280" x2="450" y2="280" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <text x="460" y="285" fill="#ef4444" fontSize="16" fontFamily="monospace">{t('True Liquidity', '真实的流动性')}</text>

            <path d="M 300,50 L 280,170 L 300,150 L 250,290 L 350,100" fill="none" stroke="#eab308" strokeWidth="4" strokeLinejoin="round" />
            
            <text x="250" y="140" fill="#fff" fontSize="16" fontFamily="monospace">{t('Retail Buys', '散户买入')}</text>
            <text x="250" y="295" fill="#ef4444" fontSize="18" fontFamily="monospace">{t('Deeper Sweep', '更深层的扫损')}</text>
          </svg>
        </div>
      );


    case 'old-high-magnet':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,150 L 100,50 L 150,200" fill="none" stroke="#6b7280" strokeWidth="3" opacity="0.6" />
            <line x1="80" y1="50" x2="550" y2="50" stroke="#eab308" strokeWidth="2" strokeDasharray="6 6" />
            <text x="500" y="40" fill="#eab308" fontSize="16" fontFamily="monospace">{t('Old High', '旧高点')}</text>
            
            <path d="M 150,200 L 250,250 L 350,150 L 400,180 L 450,50 L 500,80" fill="none" stroke="#22c55e" strokeWidth="4" />
            <circle cx="450" cy="50" r="6" fill="#eab308" />
            <text x="450" y="30" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Magnet Hit -> Accept/Reject', '触碰磁吸点 -> 接受/拒绝')}</text>
          </svg>
        </div>
      );

    case 'session-sweep-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass + " drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]"}>
            <rect x="50" y="100" width="200" height="80" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" />
            <text x="150" y="145" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Asian Session', '亚洲盘面')}</text>
            
            <line x1="50" y1="100" x2="350" y2="100" stroke="#3b82f6" strokeDasharray="4 4" />
            <line x1="50" y1="180" x2="350" y2="180" stroke="#3b82f6" strokeDasharray="4 4" />
            
            <rect x="250" y="80" width="150" height="150" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeDasharray="2 2" />
            <text x="325" y="120" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('London', '伦敦盘')}</text>
            
            <path d="M 50,140 L 100,120 L 150,160 L 200,130 L 250,150" fill="none" stroke="#6b7280" strokeWidth="3" />
            <path d="M 250,150 L 280,220 L 320,60" fill="none" stroke="#10b981" strokeWidth="4" strokeLinejoin="round" />
            
            <circle cx="280" cy="220" r="6" fill="#ef4444" />
            <text x="280" y="240" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Sweep Asia Low', '横扫亚盘低点')}</text>
          </svg>
        </div>
      );

    case 'crowded-trendline':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,250 L 400,50" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="6 6" />
            <text x="350" y="40" fill="#f97316" fontSize="16" fontFamily="monospace">{t('Crowded Trendline', '拥挤的趋势线')}</text>
            
            <path d="M 50,220 L 100,221 L 150,160 L 200,164 L 250,100 L 300,107 L 350,200 L 450,30" fill="none" stroke="#d1d5db" strokeWidth="4" strokeLinejoin="round" />
            
            <circle cx="350" cy="200" r="6" fill="#ef4444" />
            <text x="350" y="220" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Breakdown Traps Shorts', '跌破陷阱诱空')}</text>
            <text x="430" y="80" fill="#22c55e" fontSize="16" fontFamily="monospace">{t('Squeeze Higher', '向上挤压')}</text>
          </svg>
        </div>
      );

    case 'sweep-paths':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <line x1="100" y1="150" x2="500" y2="150" stroke="#eab308" strokeWidth="2" strokeDasharray="4 4" />
            <text x="100" y="140" fill="#eab308" fontSize="14" fontFamily="monospace">{t('Liquidity Pool', '流动性池')}</text>
            
            <path d="M 50,250 L 200,100" fill="none" stroke="#6b7280" strokeWidth="3" />
            
            <path d="M 200,100 L 250,250" fill="none" stroke="#ef4444" strokeWidth="4" />
            <text x="250" y="270" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('1. Reverse', '1. 反转')}</text>

            <path d="M 200,100 L 280,130 L 350,50" fill="none" stroke="#22c55e" strokeWidth="4" />
            <text x="350" y="40" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('2. Continue', '2. 延续')}</text>

            <path d="M 200,100 L 350,140 L 400,100 L 450,140 L 500,100" fill="none" stroke="#a855f7" strokeWidth="4" />
            <text x="450" y="90" fill="#a855f7" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('3. Distribute', '3. 派发')}</text>
          </svg>
        </div>
      );

    case 'true-vs-fake-sweep':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="50" width="220" height="200" fill="#111" stroke="#22c55e" strokeWidth="2" rx="8" />
            <text x="160" y="80" fill="#22c55e" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('True Sweep', '真实的扫损')}</text>
            <text x="160" y="110" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Target: Visible Pool', '目标：可见的流动性池')}</text>
            <text x="160" y="140" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Speed: Fast & Violent', '速度：快速且剧烈')}</text>
            <text x="160" y="170" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Follow: Displacement', '后续：位移')}</text>
            <text x="160" y="200" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Control: Immediate Shift', '控制：立即转换')}</text>

            <rect x="330" y="50" width="220" height="200" fill="#111" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="440" y="80" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Fake Sweep (Chop)', '虚假的扫损 (震荡)')}</text>
            <text x="440" y="110" fill="#9ca3af" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Target: Random levels', '目标：随机水平')}</text>
            <text x="440" y="140" fill="#9ca3af" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Speed: Grinding', '速度：缓慢磨蹭')}</text>
            <text x="440" y="170" fill="#9ca3af" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Follow: None', '后续：无')}</text>
            <text x="440" y="200" fill="#9ca3af" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Control: Stays same', '控制：保持不变')}</text>
          </svg>
        </div>
      );

    case 'liquidity-summary':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <text x="300" y="50" fill="#fff" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('LIQUIDITY ENGINE', '流动性引擎')}</text>
            
            <circle cx="300" cy="160" r="80" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="4 4" />
            <text x="300" y="155" fill="#eab308" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('SEEK LIQUIDITY', '寻求流动性')}</text>
            <text x="300" y="175" fill="#eab308" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('(Fueling)', '(提供燃料)')}</text>
            
            <path d="M 150,160 L 220,160" fill="none" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="130" y="165" fill="#22c55e" fontSize="16" textAnchor="end" fontFamily="monospace">{t('Impulse', '冲动')}</text>

            <path d="M 380,160 L 450,160" fill="none" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="470" y="165" fill="#ef4444" fontSize="16" textAnchor="start" fontFamily="monospace">{t('Intent Exposed', '意图暴露')}</text>
          </svg>
        </div>
      );


    // --- MODULE 6 DIAGRAMS ---
    case 'induction-title':
    case 'induction-definition':
    case 'induction-3-stages':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="100" width="120" height="60" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="110" y="135" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('1. Setup', '1. 初始设置')}</text>
            
            <path d="M 170,130 L 250,130" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />

            <rect x="250" y="100" width="120" height="60" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="310" y="125" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('2. Inducement', '2. 诱导')}</text>
            <text x="310" y="145" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('& Sweep', '& 扫损')}</text>

            <path d="M 370,130 L 450,130" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />

            <rect x="450" y="100" width="120" height="60" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="510" y="125" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('3. Commitment', '3. 确认/介入')}</text>
            <text x="510" y="145" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Move', '波动')}</text>
          </svg>
        </div>
      );

    case 'retail-death':
    case 'retail-deaths':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 100,200 L 200,100 L 250,150 L 300,50 L 400,250" fill="none" stroke="#ef4444" strokeWidth="4" />
            <circle cx="300" cy="50" r="8" fill="#ef4444" />
            <text x="300" y="30" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Retail "Breakout" Entry', '散户“突破”入场')}</text>
            <text x="400" y="280" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('GRAVEYARD', '坟场')}</text>
          </svg>
        </div>
      );

    case 'stage1-setup':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,250 L 450,50" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 50,220 L 150,180 L 200,195 L 300,135 L 350,150 L 450,90" fill="none" stroke="#d1d5db" strokeWidth="3" />
            <text x="400" y="60" fill="#3b82f6" fontSize="16" fontFamily="monospace">{t('Perfect Textbook Trendline', '完美的教科书式趋势线')}</text>
            <text x="250" y="250" fill="#eab308" fontSize="16" fontFamily="monospace">{t('Expectation Building...', '预期建立中...')}</text>
          </svg>
        </div>
      );

    case 'stage2-inducement':
    case 'stage2-forms':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="200" y="100" width="200" height="40" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeDasharray="2 2" />
            <text x="300" y="125" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Inducement FVG / OB', '诱导性 FVG / OB')}</text>
            
            <path d="M 50,50 L 150,150 L 200,80 L 250,120 L 300,60" fill="none" stroke="#6b7280" strokeWidth="3" />
            <path d="M 300,60 L 350,250 L 400,220" fill="none" stroke="#ef4444" strokeWidth="5" />
            
            <line x1="100" y1="200" x2="450" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <text x="480" y="205" fill="#ef4444" fontSize="16" fontFamily="monospace">{t('Real Liquidity', '真实的流动性')}</text>
            
            <text x="350" y="275" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('THE SWEEP', '扫损')}</text>
          </svg>
        </div>
      );

    case 'stage3-commitment':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,150 L 100,50 L 150,180" fill="none" stroke="#6b7280" strokeWidth="3" />
            <line x1="80" y1="50" x2="500" y2="50" stroke="#eab308" strokeWidth="2" strokeDasharray="4 4" />
            
            <path d="M 150,180 L 200,280 L 250,150" fill="none" stroke="#ef4444" strokeWidth="4" />
            <text x="200" y="295" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Liquidity Swept', '流动性已扫清')}</text>

            <path d="M 250,150 L 300,40 L 350,55 L 450,20" fill="none" stroke="#22c55e" strokeWidth="5" />
            <text x="350" y="30" fill="#22c55e" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('REAL DISPLACEMENT', '真实的位移')}</text>
          </svg>
        </div>
      );

    case 'stage2-vs-3':
    case 'stage-check':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <line x1="300" y1="20" x2="300" y2="280" stroke="#444" strokeWidth="2" />
            
            <text x="150" y="40" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('STAGE 2 (Chop)', '阶段 2 (震荡)')}</text>
            <path d="M 50,150 L 100,50 L 150,250 L 200,80 L 250,220" fill="none" stroke="#ef4444" strokeWidth="3" />
            <text x="150" y="280" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('2-Way Sweeps / Fakeouts', '双向扫损 / 假突破')}</text>

            <text x="450" y="40" fill="#22c55e" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('STAGE 3 (Commitment)', '阶段 3 (确认)')}</text>
            <path d="M 350,250 L 400,100 L 450,120 L 550,50" fill="none" stroke="#22c55e" strokeWidth="4" />
            <text x="450" y="280" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('1-Way Smooth Displacement', '单向平滑位移')}</text>
          </svg>
        </div>
      );

    case 'induction-puzzle':
    case 'core-conclusion-m6':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="50" width="100" height="200" rx="4" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="100" y="150" fill="#3b82f6" fontSize="14" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 100 150)">{t('1. Structure', '1. 结构')}</text>
            
            <rect x="170" y="50" width="100" height="200" rx="4" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="220" y="150" fill="#eab308" fontSize="14" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 220 150)">{t('2. Liquidity Pool', '2. 流动性池')}</text>
            
            <rect x="290" y="50" width="100" height="200" rx="4" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="340" y="150" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 340 150)">{t('3. Trap / FVG', '3. 陷阱 / FVG')}</text>
            
            <rect x="410" y="50" width="140" height="200" rx="4" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="480" y="150" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 480 150)">{t('4. COMMITMENT', '4. 介入/确认')}</text>
          </svg>
        </div>
      );

    // --- MODULE 7 DIAGRAMS ---
    case 'wyckoff-modern-overview':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="100" width="500" height="100" rx="4" fill="rgba(59,130,246,0.05)" stroke="#333" strokeDasharray="8 8" />
            <path d="M 50,150 L 100,120 L 150,180 L 200,110 L 250,190 L 300,150 L 350,250 L 400,60 L 450,90 L 550,30" fill="none" stroke="#6b7280" strokeWidth="3" />
            
            <circle cx="350" cy="250" r="10" fill="#ef4444" />
            <text x="350" y="280" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Manipulation (Phase 3)', '操纵 (阶段 3)')}</text>
            
            <path d="M 350,250 L 400,60 L 550,30" fill="none" stroke="#22c55e" strokeWidth="5" />
            <text x="500" y="60" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Commitment (Phase 4)', '介入/确认 (阶段 4)')}</text>
            
            <text x="150" y="80" fill="#3b82f6" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Containment & Absorption', '遏制与吸收')}</text>
          </svg>
        </div>
      );

    case 'wyckoff-absorption':
    case 'wyckoff-absorption-detail':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <path d="M 50,200 L 100,220 L 150,180 L 200,210 L 250,195 L 300,205 L 350,200" fill="none" stroke="#6b7280" strokeWidth="3" />
            <line x1="50" y1="220" x2="400" y2="220" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            
            <circle cx="100" cy="220" r="5" fill="#ef4444" />
            <circle cx="200" cy="210" r="5" fill="#ef4444" opacity="0.5" />
            <circle cx="300" cy="205" r="5" fill="#ef4444" opacity="0.2" />
            
            <text x="200" y="250" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Diminishing Selling Pressure', '抛压减弱')}</text>
            <text x="200" y="270" fill="#888" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('(Supply being absorbed by buyers)', '(供应正被买家吸收)')}</text>
            
            <path d="M 400,200 L 450,50" fill="none" stroke="#22c55e" strokeWidth="5" markerEnd="url(#arrow)" />
            <text x="480" y="100" fill="#22c55e" fontSize="16" fontFamily="monospace" fontWeight="bold">{t('Path of Least Resistance', '阻力最小的路径')}</text>
          </svg>
        </div>
      );

    case 'wyckoff-4-phases':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <g transform="translate(50, 50)">
              <rect x="0" y="0" width="110" height="200" rx="4" fill="#111" stroke="#3b82f6" strokeWidth="2" />
              <text x="55" y="100" fill="#3b82f6" fontSize="14" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 55 100)">{t('1. Containment', '1. 遏制')}</text>
            </g>
            <g transform="translate(170, 50)">
              <rect x="0" y="0" width="110" height="200" rx="4" fill="#111" stroke="#eab308" strokeWidth="2" />
              <text x="55" y="100" fill="#eab308" fontSize="14" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 55 100)">{t('2. Absorption', '2. 吸收')}</text>
            </g>
            <g transform="translate(290, 50)">
              <rect x="0" y="0" width="110" height="200" rx="4" fill="#111" stroke="#ef4444" strokeWidth="2" />
              <text x="55" y="100" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 55 100)">{t('3. Manipulation', '3. 操纵')}</text>
            </g>
            <g transform="translate(410, 50)">
              <rect x="0" y="0" width="140" height="200" rx="4" fill="#111" stroke="#22c55e" strokeWidth="2" />
              <text x="70" y="100" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 70 100)">{t('4. COMMITMENT', '4. 介入/确认')}</text>
            </g>
            <path d="M 160,150 L 170,150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 280,150 L 290,150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 400,150 L 410,150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
          </svg>
        </div>
      );

    case 'wyckoff-complex-trap-logic':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <line x1="50" y1="200" x2="550" y2="200" stroke="#444" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 50,150 L 100,200 L 150,180 L 200,220 L 250,190 L 300,250 L 350,50" fill="none" stroke="#6b7280" strokeWidth="3" />
            
            <circle cx="200" cy="220" r="6" fill="#ef4444" />
            <text x="200" y="240" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Trap 1', '陷阱 1')}</text>
            
            <circle cx="300" cy="250" r="8" fill="#ef4444" />
            <text x="300" y="275" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Trap 2 (Final Purge)', '陷阱 2 (最终清洗)')}</text>
            
            <path d="M 300,250 L 350,50 L 450,20" fill="none" stroke="#22c55e" strokeWidth="5" />
            <text x="400" y="80" fill="#22c55e" fontSize="16" fontFamily="monospace" fontWeight="bold">{t('Institutional Launch', '机构启动')}</text>
          </svg>
        </div>
      );

    case 'wyckoff-validation':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <line x1="300" y1="20" x2="300" y2="280" stroke="#333" strokeWidth="2" />
            
            <text x="150" y="40" fill="#22c55e" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Valid Spring', '有效的弹簧')}</text>
            <path d="M 50,150 L 100,250 L 150,100" fill="none" stroke="#22c55e" strokeWidth="4" />
            <text x="150" y="280" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Violent Reclaim + Displacement', '剧烈收复 + 位移')}</text>

            <text x="450" y="40" fill="#ef4444" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Invalid Spring', '无效的弹簧')}</text>
            <path d="M 350,150 L 400,250 L 450,240 L 550,280" fill="none" stroke="#ef4444" strokeWidth="4" />
            <text x="450" y="280" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Weak Bounce + Acceptance Below', '微弱反弹 + 下方接受')}</text>
          </svg>
        </div>
      );

    case 'wyckoff-decision-tree':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="225" y="20" width="150" height="50" rx="4" fill="#111" stroke="#3b82f6" />
            <text x="300" y="50" fill="#3b82f6" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('1. Balance Zone?', '1. 平衡区?')}</text>
            
            <path d="M 300,70 L 300,100" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            
            <rect x="225" y="100" width="150" height="50" rx="4" fill="#111" stroke="#eab308" />
            <text x="300" y="130" fill="#eab308" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('2. Liquidity Purged?', '2. 流动性已清洗?')}</text>

            <path d="M 300,150 L 300,180" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            
            <rect x="225" y="180" width="150" height="50" rx="4" fill="#111" stroke="#ef4444" />
            <text x="300" y="210" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('3. Reclaim & Accept?', '3. 收复并接受?')}</text>

            <path d="M 300,230 L 300,260" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            
            <rect x="200" y="260" width="200" height="30" rx="4" fill="rgba(34,197,94,0.2)" stroke="#22c55e" />
            <text x="300" y="280" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('COMMITMENT MOVE', '介入波动')}</text>
          </svg>
        </div>
      );

    case 'm8-single-candle-trap':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass + " drop-shadow-[0_0_20px_rgba(239,68,68,0.2)]"}>
            <path d="M 50,150 L 150,140 L 250,160 L 350,150" fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" />
            <text x="200" y="180" fill="#6b7280" fontSize="14" fontFamily="monospace">{t('Mid-range Chop (No Context)', '区间中部震荡 (无背景)')}</text>
            
            <line x1="300" y1="70" x2="300" y2="150" stroke="#fff" strokeWidth="2" />
            <rect x="285" y="120" width="30" height="30" fill="#22c55e" />
            <text x="300" y="50" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('"Perfect" Pin Bar', '“完美”的针形线')}</text>
            
            <path d="M 330,120 C 380,80 400,100 450,250" fill="none" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow)" />
            <text x="450" y="270" fill="#ef4444" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('1-Candle Trap = DEATH', '单根K线陷阱 = 死亡')}</text>
          </svg>
        </div>
      );

    case 'm8-confluence-layers':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass + " drop-shadow-[0_0_25px_rgba(59,130,246,0.2)]"}>
            <polygon points="300,30 500,80 300,130 100,80" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2" />
            <text x="520" y="85" fill="#3b82f6" fontSize="14" fontFamily="monospace">{t('HTF Narrative & Structure', '大周期叙事与结构')}</text>
            
            <polygon points="300,80 500,130 300,180 100,130" fill="rgba(234,179,8,0.1)" stroke="#eab308" strokeWidth="2" />
            <text x="520" y="135" fill="#eab308" fontSize="14" fontFamily="monospace">{t('Liquidity & Phase', '流动性与阶段')}</text>
            
            <polygon points="300,130 500,180 300,230 100,180" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="2" />
            <text x="520" y="185" fill="#a855f7" fontSize="12" fontFamily="monospace">{t('Displacement & Acceptance', '位移与接受')}</text>
            
            <polygon points="300,180 500,230 300,280 100,230" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="3" />
            <text x="520" y="235" fill="#22c55e" fontSize="12" fontFamily="monospace" fontWeight="bold">{t('Trigger (Zone/Time/Candle)', '触发器 (区域/时间/K线)')}</text>
            
            <line x1="300" y1="30" x2="300" y2="280" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>
      );

    case 'm8-checklist':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="50" y="20" width="500" height="260" rx="8" fill="#111" stroke="#444" strokeWidth="2" />
            <text x="300" y="50" fill="#fff" fontSize="18" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('The 5/8 Rule Scorecard', '5/8 规则评分卡')}</text>
            
            <g transform="translate(80, 80)">
              <rect x="0" y="0" width="16" height="16" fill="#22c55e" />
              <text x="25" y="12" fill="#fff" fontSize="14" fontFamily="monospace">{t('HTF Alignment', '大周期一致性')}</text>
              
              <rect x="0" y="30" width="16" height="16" fill="#22c55e" />
              <text x="25" y="42" fill="#fff" fontSize="14" fontFamily="monospace">{t('Structure clear', '结构清晰')}</text>
              
              <rect x="0" y="60" width="16" height="16" fill="#22c55e" />
              <text x="25" y="72" fill="#fff" fontSize="14" fontFamily="monospace">{t('Liquidity Taken', '流动性已获取')}</text>
              
              <rect x="0" y="90" width="16" height="16" fill="#22c55e" />
              <text x="25" y="102" fill="#fff" fontSize="14" fontFamily="monospace">{t('Phase 4 (Commitment)', '阶段 4 (介入)')}</text>
            </g>
            
            <g transform="translate(300, 80)">
              <rect x="0" y="0" width="16" height="16" fill="#22c55e" />
              <text x="25" y="12" fill="#fff" fontSize="14" fontFamily="monospace">{t('Displacement OK', '位移良好')}</text>
              
              <rect x="0" y="30" width="16" height="16" fill="#22c55e" />
              <text x="25" y="42" fill="#fff" fontSize="14" fontFamily="monospace">{t('Acceptance Present', '存在接受')}</text>
              
              <rect x="0" y="60" width="16" height="16" fill="#444" />
              <text x="25" y="72" fill="#888" fontSize="14" fontFamily="monospace">{t('Zone is clean', '区域干净')}</text>
              
              <rect x="0" y="90" width="16" height="16" fill="#444" />
              <text x="25" y="102" fill="#888" fontSize="14" fontFamily="monospace">{t('Session Edge', '交易时段优势')}</text>
            </g>
            
            <rect x="200" y="220" width="200" height="40" rx="4" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="2" />
            <text x="300" y="245" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('Score: 6/8 = EXECUTE', '评分: 6/8 = 执行')}</text>
          </svg>
        </div>
      );

    case 'm8-decision-flow':
      return (
        <div className={containerClass}>
          <svg viewBox="0 0 600 300" className={svgClass}>
            <rect x="20" y="120" width="120" height="60" rx="4" fill="#111" stroke="#3b82f6" />
            <text x="80" y="155" fill="#3b82f6" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('1. Map HTF / Liquidity', '1. 绘制大周期 / 流动性')}</text>
            
            <path d="M 140,150 L 180,150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            
            <rect x="180" y="120" width="120" height="60" rx="4" fill="#111" stroke="#eab308" />
            <text x="240" y="155" fill="#eab308" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('2. Wait for Control Shift', '2. 等待控制权转移')}</text>

            <path d="M 300,150 L 340,150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            
            <rect x="340" y="120" width="120" height="60" rx="4" fill="#111" stroke="#a855f7" />
            <text x="400" y="155" fill="#a855f7" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('3. Grade 8 Dimensions', '3. 评估 8 个维度')}</text>

            <path d="M 460,150 L 500,150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            
            <rect x="500" y="100" width="80" height="100" rx="4" fill="rgba(34,197,94,0.2)" stroke="#22c55e" />
            <text x="540" y="155" fill="#22c55e" fontSize="16" textAnchor="middle" fontFamily="monospace" fontWeight="bold">{t('TRIGGER', '触发')}</text>
          </svg>
        </div>
      );

    case 'm10-mistakes':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="160" y="125" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('1. Fixed Lots', '1. 固定手数')}</text>

            <rect x="330" y="80" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="440" y="125" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('2. Moving Stops', '2. 死扛不止损')}</text>

            <rect x="190" y="180" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="300" y="225" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('3. Bad R:R', '3. 盈亏比倒置')}</text>
          </svg>
        </div>
      );
    case 'm11-mistakes':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="160" y="110" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">1. Certainty</text>
            <text x="160" y="135" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Need to be right', '追求确定性')}</text>

            <rect x="330" y="80" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="440" y="110" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">2. Recency Bias</text>
            <text x="440" y="135" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Fear from last loss', '受近期盈亏影响')}</text>

            <rect x="50" y="180" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="160" y="210" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">3. Result Oriented</text>
            <text x="160" y="235" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Judging by outcome', '结果导向')}</text>

            <rect x="330" y="180" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="440" y="210" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">4. System Hopping</text>
            <text x="440" y="235" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('No consistency', '频繁换系统')}</text>
          </svg>
        </div>
      );
    case 'm10-overview':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="150" height="150" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="125" y="140" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Dynamic Stops', '动态止损')}</text>
            <text x="125" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Info-based trailing', '基于信息追踪')}</text>
            
            <rect x="225" y="80" width="150" height="150" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="300" y="140" fill="#22c55e" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Scaling In', '仓位分批')}</text>
            <text x="300" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Express conviction', '表达确定性')}</text>

            <rect x="400" y="80" width="150" height="150" rx="8" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="475" y="140" fill="#eab308" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Profit Extraction', '利润搬砖')}</text>
            <text x="475" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Paper to Cash', '浮盈变现')}</text>
          </svg>
        </div>
      );
    case 'm10-four-pillars':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="70" width="180" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="190" y="100" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">1. Invalidation</text>
            <text x="190" y="125" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Where am I wrong?', '哪里证明我错了？')}</text>

            <rect x="320" y="70" width="180" height="80" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="410" y="100" fill="#3b82f6" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">2. Position</text>
            <text x="410" y="125" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('What size expresses it?', '多大仓位表达？')}</text>

            <rect x="100" y="170" width="180" height="80" rx="8" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="190" y="200" fill="#eab308" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">3. Management</text>
            <text x="190" y="225" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('How to adjust?', '持仓中如何调整？')}</text>

            <rect x="320" y="170" width="180" height="80" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="410" y="200" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">4. Extraction</text>
            <text x="410" y="225" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('How to realize gains?', '如何把浮盈变现？')}</text>
          </svg>
        </div>
      );
    case 'm10-stop-loss':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <line x1="100" y1="150" x2="500" y2="150" stroke="#666" strokeWidth="2" />
            <text x="80" y="155" fill="#9ca3af" fontSize="12" fontFamily="monospace">{t('Entry', '入场')}</text>

            <path d="M 100,150 L 150,180 L 200,120 L 250,190 L 300,140 L 350,220" fill="none" stroke="#3b82f6" strokeWidth="2" />
            
            <line x1="100" y1="200" x2="500" y2="200" stroke="#ef4444" strokeDasharray="4 4" />
            <text x="80" y="205" fill="#ef4444" fontSize="12" fontFamily="monospace">{t('Bad SL', '错误止损')}</text>
            <text x="400" y="195" fill="#ef4444" fontSize="12" fontFamily="monospace">{t('Stopped by Noise', '被噪音扫损')}</text>

            <line x1="100" y1="240" x2="500" y2="240" stroke="#22c55e" strokeDasharray="4 4" />
            <text x="80" y="245" fill="#22c55e" fontSize="12" fontFamily="monospace">{t('Good SL', '正确止损')}</text>
            <text x="400" y="235" fill="#22c55e" fontSize="12" fontFamily="monospace">{t('Structural Invalidation', '结构破坏')}</text>
            
            <text x="300" y="280" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Stops belong where your thesis is proven wrong.', '止损应该放在你的交易逻辑被证明错误的位置。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-stop-types':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="150" height="150" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="125" y="140" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Technical', '技术止损')}</text>
            <text x="125" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Outside FVG/OB', 'FVG/OB 之外')}</text>
            
            <rect x="225" y="80" width="150" height="150" rx="8" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="300" y="140" fill="#eab308" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Structural', '结构止损')}</text>
            <text x="300" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Reclaim lost', '关键结构收回')}</text>

            <rect x="400" y="80" width="150" height="150" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="475" y="140" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Thesis', '逻辑止损')}</text>
            <text x="475" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Narrative fails', '交易逻辑失效')}</text>
          </svg>
        </div>
      );
    case 'm10-dynamic-stop':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 100,250 L 150,150 L 200,200 L 300,100 L 350,160 L 450,60" fill="none" stroke="#22c55e" strokeWidth="3" />
            
            <line x1="150" y1="150" x2="250" y2="150" stroke="#666" strokeDasharray="4 4" />
            <line x1="300" y1="100" x2="400" y2="100" stroke="#666" strokeDasharray="4 4" />

            <circle cx="100" cy="250" r="5" fill="#ef4444" />
            <text x="100" y="270" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Initial SL', '初始止损')}</text>

            <circle cx="200" cy="200" r="5" fill="#eab308" />
            <text x="200" y="220" fill="#eab308" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Trail SL 1 (HL)', '移动止损 1 (HL)')}</text>

            <circle cx="350" cy="160" r="5" fill="#eab308" />
            <text x="350" y="180" fill="#eab308" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Trail SL 2 (HL)', '移动止损 2 (HL)')}</text>

            <text x="300" y="280" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Move SL based on new structural information, not emotions.', '基于新的结构信息移动止损，而不是情绪。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-trailing-methods':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="70" width="180" height="80" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="190" y="115" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('1. Structural', '1. 结构跟踪')}</text>

            <rect x="320" y="70" width="180" height="80" rx="8" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="410" y="115" fill="#eab308" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('2. Execution Zone', '2. 执行区更新')}</text>

            <rect x="100" y="170" width="180" height="80" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="190" y="215" fill="#22c55e" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('3. Target Hit', '3. 目标完成后减仓')}</text>

            <rect x="320" y="170" width="180" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="410" y="215" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('4. Time-Based', '4. 时间型收缩')}</text>
          </svg>
        </div>
      );
    case 'm10-breakeven':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="80" width="180" height="150" rx="8" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" />
            <text x="190" y="110" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Good for BE', '适合推保本')}</text>
            <text x="190" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('First target hit', '到达第一目标')}</text>
            <text x="190" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Clear displacement', '出现明显动能')}</text>
            <text x="190" y="190" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Key risk events', '重大风险事件前')}</text>

            <rect x="320" y="80" width="180" height="150" rx="8" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" />
            <text x="410" y="110" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Bad for BE', '不适合推保本')}</text>
            <text x="410" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Just entered', '刚入场不久')}</text>
            <text x="410" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Normal volatility', '正常波动范围内')}</text>
            <text x="410" y="190" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('No new structure', '未形成新结构')}</text>
            
            <text x="300" y="260" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Premature Breakeven is a source of systematic losses.', '“保本太早”其实是系统性亏损来源。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-scaling':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <line x1="100" y1="200" x2="500" y2="200" stroke="#666" strokeWidth="2" />
            
            <circle cx="150" cy="200" r="15" fill="#3b82f6" />
            <text x="150" y="170" fill="#3b82f6" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Probe', '试探仓')}</text>
            <text x="150" y="205" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">20%</text>

            <circle cx="300" cy="200" r="25" fill="#eab308" />
            <text x="300" y="160" fill="#eab308" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Confirm', '确认仓')}</text>
            <text x="300" y="205" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">50%</text>

            <circle cx="450" cy="200" r="20" fill="#22c55e" />
            <text x="450" y="165" fill="#22c55e" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Press', '加码仓')}</text>
            <text x="450" y="205" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">30%</text>
            
            <text x="300" y="260" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Positions should express your level of certainty.', '仓位应该表达你的确定性层级。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-scaling-models':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="150" height="150" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="125" y="140" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Probe-Confirm', '试探-确认-加仓')}</text>
            <text x="125" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Manipulation', '假突破')}</text>
            
            <rect x="225" y="80" width="150" height="150" rx="8" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="300" y="140" fill="#eab308" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Core + Add-on', '核心+加仓')}</text>
            <text x="300" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Trend Continuation', '趋势延续')}</text>

            <rect x="400" y="80" width="150" height="150" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="475" y="140" fill="#22c55e" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Two-Layer', '双层入场')}</text>
            <text x="475" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('OB/FVG Refinement', 'OB/FVG 细化')}</text>
          </svg>
        </div>
      );
    case 'm10-scaling-vs-averaging':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="80" width="180" height="150" rx="8" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" />
            <text x="190" y="110" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Scaling In', '分批加仓')}</text>
            <text x="190" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Thesis is stronger', '逻辑增强')}</text>
            <text x="190" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('New evidence', '出现新证据')}</text>
            <text x="190" y="190" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Risk partially locked', '风险已部分锁定')}</text>

            <rect x="320" y="80" width="180" height="150" rx="8" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" />
            <text x="410" y="110" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Averaging Down', '亏损加仓')}</text>
            <text x="410" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Trapped in loser', '被套牢')}</text>
            <text x="410" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Stubbornness', '不愿认错')}</text>
            <text x="410" y="190" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Thesis weakening', '逻辑正在变弱')}</text>
            
            <text x="300" y="260" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Add ONLY when the thesis gets stronger.', '加仓的前提，是 thesis 更强了。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-profit-extraction':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 100,200 L 250,100 L 300,130 L 450,50" fill="none" stroke="#22c55e" strokeWidth="3" />
            
            <circle cx="250" cy="100" r="6" fill="#3b82f6" />
            <text x="250" y="80" fill="#3b82f6" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Extract 1', '减仓 1')}</text>
            
            <circle cx="300" cy="130" r="6" fill="#eab308" />
            <text x="300" y="150" fill="#eab308" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Trail SL', '推保护')}</text>

            <circle cx="450" cy="50" r="6" fill="#22c55e" />
            <text x="450" y="30" fill="#22c55e" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Extract 2 / Runner', '减仓 2 / 尾仓')}</text>
            
            <text x="300" y="260" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Moving profits from the market to your account piece by piece.', '把市场给的利润一块一块搬回账户。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-extraction-stages':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="150" height="150" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="125" y="110" fill="#3b82f6" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('1. First Paycheck', '1. 首个薪水')}</text>
            <text x="125" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">30%-50%</text>
            <text x="125" y="160" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('First Target', '第一目标')}</text>
            
            <rect x="225" y="80" width="150" height="150" rx="8" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="300" y="110" fill="#eab308" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('2. Structure Lock', '2. 结构锁定')}</text>
            <text x="300" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">20%-40%</text>
            <text x="300" y="160" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('After Progression', '行情推进后')}</text>

            <rect x="400" y="80" width="150" height="150" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="475" y="110" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('3. Runner', '3. 尾仓')}</text>
            <text x="475" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">10%-30%</text>
            <text x="475" y="160" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Extended Targets', '延伸目标')}</text>
          </svg>
        </div>
      );
    case 'm10-extraction-targets':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="70" width="400" height="40" rx="4" fill="#111" stroke="#3b82f6" />
            <text x="300" y="95" fill="#3b82f6" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('1. Recent Obvious Liquidity Pool', '1. 近期明显的流动性池')}</text>

            <rect x="100" y="120" width="400" height="40" rx="4" fill="#111" stroke="#eab308" />
            <text x="300" y="145" fill="#eab308" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('2. Opposite Range Boundary', '2. 对立区间边界')}</text>

            <rect x="100" y="170" width="400" height="40" rx="4" fill="#111" stroke="#f97316" />
            <text x="300" y="195" fill="#f97316" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('3. HTF Old High/Low', '3. 大级别前高/前低')}</text>

            <rect x="100" y="220" width="400" height="40" rx="4" fill="#111" stroke="#22c55e" />
            <text x="300" y="245" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('4. Measured Move / Session Target', '4. 等距测算 / 交易时段目标')}</text>
          </svg>
        </div>
      );
    case 'm10-management-decisions':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="70" width="180" height="80" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="190" y="105" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('1. Working?', '1. 符合预期？')}</text>
            <text x="190" y="130" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Progressing as expected?', '按预期推进？')}</text>

            <rect x="320" y="70" width="180" height="80" rx="8" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="410" y="105" fill="#eab308" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('2. Reduce Risk?', '2. 降低风险？')}</text>
            <text x="410" y="130" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('New info to tighten?', '有新信息收紧？')}</text>

            <rect x="100" y="170" width="180" height="80" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="190" y="205" fill="#22c55e" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('3. Extract?', '3. 提取利润？')}</text>
            <text x="190" y="230" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('High-prob reaction zone?', '到达反应区？')}</text>

            <rect x="320" y="170" width="180" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="410" y="205" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('4. Valid?', '4. 逻辑有效？')}</text>
            <text x="410" y="230" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Thesis still holds?', '逻辑还成立？')}</text>
          </svg>
        </div>
      );
    case 'm10-active-exit':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="80" width="180" height="150" rx="8" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" />
            <text x="190" y="110" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('When to Exit', '何时离场')}</text>
            <text x="190" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Time invalidation', '时间失效')}</text>
            <text x="190" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Opposite setup forms', '反向形态形成')}</text>
            <text x="190" y="190" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Key news event', '重大新闻事件')}</text>

            <rect x="320" y="80" width="180" height="150" rx="8" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" />
            <text x="410" y="110" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('When NOT to Exit', '何时不应离场')}</text>
            <text x="410" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Boredom', '感到无聊')}</text>
            <text x="410" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Fear of small loss', '害怕小额亏损')}</text>
            <text x="410" y="190" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Normal pullback', '正常回调')}</text>
            
            <text x="300" y="260" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Exit based on logic, not emotions.', '基于逻辑离场，而不是情绪。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-risk-grading':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="150" height="150" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="125" y="110" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('A+ Setup', 'A+ 交易机会')}</text>
            <text x="125" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Full Risk (1R)', '满额风险 (1R)')}</text>
            <text x="125" y="160" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('All confluences', '所有共振条件满足')}</text>
            
            <rect x="225" y="80" width="150" height="150" rx="8" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="300" y="110" fill="#eab308" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('B Setup', 'B级 交易机会')}</text>
            <text x="300" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Half Risk (0.5R)', '半额风险 (0.5R)')}</text>
            <text x="300" y="160" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Missing 1-2 factors', '缺少1-2个条件')}</text>

            <rect x="400" y="80" width="150" height="150" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="475" y="110" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('C Setup', 'C级 交易机会')}</text>
            <text x="475" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('No Trade / Probe', '不交易 / 仅试探')}</text>
            <text x="475" y="160" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Low probability', '低胜率')}</text>
          </svg>
        </div>
      );

    case 'm10-trade-working':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="80" width="180" height="150" rx="8" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" />
            <text x="190" y="110" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Working', '符合预期')}</text>
            <text x="190" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Quick displacement', '快速脱离成本')}</text>
            <text x="190" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Healthy pullbacks', '健康回调')}</text>
            <text x="190" y="190" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Key structure holds', '关键结构守住')}</text>

            <rect x="320" y="80" width="180" height="150" rx="8" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" />
            <text x="410" y="110" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Not Working', '不符预期')}</text>
            <text x="410" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Stuck for long', '长时间停滞')}</text>
            <text x="410" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Chops through zone', '在区间内反复震荡')}</text>
            <text x="410" y="190" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Disp engulfed', '动能被吞没')}</text>
            
            <text x="300" y="260" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Some trades lose the right to be held before hitting the stop.', '有些交易在打止损前，就已经失去持有的资格。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-r-multiple':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <line x1="100" y1="150" x2="500" y2="150" stroke="#666" strokeWidth="2" />
            <text x="80" y="155" fill="#9ca3af" fontSize="12" fontFamily="monospace">{t('Entry', '入场')}</text>

            <rect x="250" y="150" width="100" height="50" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2" />
            <text x="300" y="180" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('-1R (Risk)', '-1R (风险)')}</text>
            <line x1="100" y1="200" x2="500" y2="200" stroke="#ef4444" strokeDasharray="4 4" />
            <text x="80" y="205" fill="#ef4444" fontSize="12" fontFamily="monospace">{t('Stop', '止损')}</text>

            <rect x="250" y="50" width="100" height="100" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="2" />
            <text x="300" y="105" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('+2R (Reward)', '+2R (回报)')}</text>
            <line x1="100" y1="50" x2="500" y2="50" stroke="#22c55e" strokeDasharray="4 4" />
            <text x="80" y="55" fill="#22c55e" fontSize="12" fontFamily="monospace">{t('Target', '目标')}</text>
            
            <text x="300" y="260" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Regardless of account size, risk is always 1R.', '无论账户大小，风险永远是 1R。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-position-sizing':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="80" width="400" height="60" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="300" y="115" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">
              {t('Lot Size = (Balance × Risk%) / (Stop Pips × Pip Value)', '手数 = (账户余额 × 风险%) / (止损点数 × 点值)')}
            </text>

            <rect x="100" y="160" width="180" height="80" rx="8" fill="#111" stroke="#666" />
            <text x="190" y="185" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Example 1: Tight Stop', '示例 1：窄止损')}</text>
            <text x="190" y="205" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('20 Pips SL', '20点 止损')}</text>
            <text x="190" y="225" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('0.5 Lots', '0.5 手')}</text>

            <rect x="320" y="160" width="180" height="80" rx="8" fill="#111" stroke="#666" />
            <text x="410" y="185" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Example 2: Wide Stop', '示例 2：宽止损')}</text>
            <text x="410" y="205" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('40 Pips SL', '40点 止损')}</text>
            <text x="410" y="225" fill="#eab308" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('0.25 Lots', '0.25 手')}</text>
          </svg>
        </div>
      );
    case 'm10-asymmetry':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <line x1="100" y1="250" x2="500" y2="250" stroke="#666" strokeWidth="2" />
            <line x1="100" y1="250" x2="100" y2="80" stroke="#666" strokeWidth="2" />
            
            <text x="300" y="280" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Reward to Risk Ratio (R:R)', '盈亏比 (R:R)')}</text>
            <text x="60" y="165" fill="#9ca3af" fontSize="12" textAnchor="middle" transform="rotate(-90 60,165)" fontFamily="monospace">{t('Required Win Rate', '所需胜率')}</text>

            <rect x="150" y="100" width="40" height="150" fill="#ef4444" />
            <text x="170" y="90" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">50%</text>
            <text x="170" y="265" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">1:1</text>

            <rect x="250" y="150" width="40" height="100" fill="#eab308" />
            <text x="270" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">33%</text>
            <text x="270" y="265" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">1:2</text>

            <rect x="350" y="180" width="40" height="70" fill="#22c55e" />
            <text x="370" y="170" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">25%</text>
            <text x="370" y="265" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">1:3</text>

            <rect x="450" y="210" width="40" height="40" fill="#3b82f6" />
            <text x="470" y="200" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">17%</text>
            <text x="470" y="265" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">1:5</text>
          </svg>
        </div>
      );
    case 'm10-drawdown':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 100,100 L 200,150 L 300,200 L 400,230 L 500,240" fill="none" stroke="#ef4444" strokeWidth="3" />
            
            <circle cx="100" cy="100" r="6" fill="#fff" />
            <text x="100" y="80" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('0% DD', '0% 回撤')}</text>
            <text x="100" y="125" fill="#22c55e" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Risk: 1%', '风险: 1%')}</text>

            <circle cx="200" cy="150" r="6" fill="#fff" />
            <text x="200" y="130" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('-5% DD', '-5% 回撤')}</text>
            <text x="200" y="175" fill="#eab308" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Risk: 0.5%', '风险: 0.5%')}</text>

            <circle cx="300" cy="200" r="6" fill="#fff" />
            <text x="300" y="180" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('-10% DD', '-10% 回撤')}</text>
            <text x="300" y="225" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Risk: 0.25%', '风险: 0.25%')}</text>

            <text x="300" y="280" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('As drawdown increases, risk decreases. Impossible to blow account.', '回撤越大，风险越小。数学上不可能爆仓。')}
            </text>
          </svg>
        </div>
      );
    case 'm10-conclusion':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="80" width="400" height="150" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="300" y="115" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Risk is a System', '风控是一个系统')}</text>
            <text x="300" y="145" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('1. Stop Loss = Structural Invalidation', '1. 止损 = 结构破坏')}</text>
            <text x="300" y="170" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('2. Scaling = Express Conviction', '2. 分批 = 表达确定性')}</text>
            <text x="300" y="195" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('3. Extraction = Paper to Cash Flow', '3. 搬砖 = 浮盈变现')}</text>
            
            <text x="300" y="260" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('Risk management is how you survive to see your edge play out.', '风控是你活到优势兑现的唯一方式。')}
            </text>
          </svg>
        </div>
      );
    case 'm11-intro':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="150" height="120" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="125" y="120" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Price Action', '价格行为')}</text>
            <text x="125" y="150" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Structure & Levels', '结构与位置')}</text>
            
            <path d="M 210,140 L 290,140" fill="none" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="250" y="130" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Creates', '制造')}</text>

            <rect x="300" y="80" width="250" height="120" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="425" y="120" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Emotional Path', '情绪路径')}</text>
            <text x="425" y="150" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Hope -> Fear -> Panic', '希望 -> 恐惧 -> 恐慌')}</text>
            <text x="425" y="170" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('= Liquidity', '= 流动性')}</text>
          </svg>
        </div>
      );
    case 'm11-concept':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 100,200 Q 200,200 250,100 T 400,100 T 500,200" fill="none" stroke="#3b82f6" strokeWidth="3" />
            
            <circle cx="250" cy="100" r="6" fill="#ef4444" />
            <text x="250" y="80" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('FOMO / Buy', '追高买入')}</text>
            
            <circle cx="400" cy="100" r="6" fill="#ef4444" />
            <text x="400" y="80" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Hope / Hold', '希望/扛单')}</text>
            
            <circle cx="500" cy="200" r="6" fill="#ef4444" />
            <text x="500" y="225" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Panic / Sell', '恐慌止损')}</text>
            
            <text x="300" y="250" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Emotions cluster at specific structural points.', '情绪在特定的结构点集中爆发。')}</text>
          </svg>
        </div>
      );
    case 'm11-chain':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="100" width="100" height="60" rx="4" fill="#111" stroke="#3b82f6" />
            <text x="100" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Price Move', '价格推动')}</text>
            <path d="M 160,130 L 190,130" fill="none" stroke="#666" markerEnd="url(#arrow)" />

            <rect x="200" y="100" width="100" height="60" rx="4" fill="#111" stroke="#eab308" />
            <text x="250" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Expectation', '形成预期')}</text>
            <path d="M 310,130 L 340,130" fill="none" stroke="#666" markerEnd="url(#arrow)" />

            <rect x="350" y="100" width="100" height="60" rx="4" fill="#111" stroke="#ef4444" />
            <text x="400" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Liquidity', '流动性堆积')}</text>
            <path d="M 460,130 L 490,130" fill="none" stroke="#666" markerEnd="url(#arrow)" />

            <rect x="500" y="100" width="80" height="60" rx="4" fill="#111" stroke="#22c55e" />
            <text x="540" y="135" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Exploit', '收割')}</text>
          </svg>
        </div>
      );
    case 'm11-emotion-cycle':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 50,200 L 150,150 L 250,100 L 350,120 L 450,220 L 550,80" fill="none" stroke="#3b82f6" strokeWidth="3" />
            
            <circle cx="150" cy="150" r="6" fill="#eab308" />
            <text x="150" y="135" fill="#eab308" fontSize="12" textAnchor="middle" fontFamily="monospace">1. Curiosity</text>
            
            <circle cx="250" cy="100" r="6" fill="#22c55e" />
            <text x="250" y="85" fill="#22c55e" fontSize="12" textAnchor="middle" fontFamily="monospace">2. Belief</text>
            
            <circle cx="350" cy="120" r="6" fill="#f97316" />
            <text x="350" y="105" fill="#f97316" fontSize="12" textAnchor="middle" fontFamily="monospace">3. Stress</text>
            
            <circle cx="450" cy="220" r="6" fill="#ef4444" />
            <text x="450" y="240" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">4. Panic</text>
            
            <circle cx="550" cy="80" r="6" fill="#a855f7" />
            <text x="550" y="65" fill="#a855f7" fontSize="12" textAnchor="middle" fontFamily="monospace">5. Revenge</text>
          </svg>
        </div>
      );
    case 'm11-stage1':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 100,200 L 200,150 L 250,180 L 350,120 L 400,150 L 500,80" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <line x1="100" y1="200" x2="500" y2="80" stroke="#666" strokeDasharray="4 4" />
            <text x="300" y="100" fill="#eab308" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Clear Trendline / Support', '清晰的趋势线/支撑')}</text>
            <text x="300" y="240" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Market creates a "textbook" setup to attract attention.', '市场制造“教科书”形态吸引注意。')}</text>
          </svg>
        </div>
      );
    case 'm11-stage2':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 100,200 L 200,150 L 250,180 L 350,120 L 400,150 L 450,100" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <circle cx="400" cy="150" r="6" fill="#22c55e" />
            <text x="400" y="170" fill="#22c55e" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Retail Buys', '散户买入')}</text>
            
            <rect x="350" y="180" width="100" height="20" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeDasharray="2 2" />
            <text x="400" y="195" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Stop Loss Pool', '止损池')}</text>
          </svg>
        </div>
      );
    case 'm11-stage3':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 100,200 L 200,150 L 250,180 L 350,120 L 400,150 L 450,100 L 480,160" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <rect x="350" y="180" width="100" height="20" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeDasharray="2 2" />
            <text x="400" y="195" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Stop Loss Pool', '止损池')}</text>
            
            <text x="480" y="140" fill="#f97316" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Price Stalls/Drops', '价格停滞/下跌')}</text>
            <text x="480" y="120" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('"Just a pullback"', '“只是回调”')}</text>
          </svg>
        </div>
      );
    case 'm11-stage4':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 100,200 L 200,150 L 250,180 L 350,120 L 400,150 L 450,100 L 480,160 L 500,240" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <rect x="350" y="180" width="100" height="20" fill="rgba(239,68,68,0.5)" stroke="#ef4444" />
            <text x="400" y="195" fill="#fff" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Stops Triggered', '止损触发')}</text>
            
            <circle cx="500" cy="240" r="8" fill="#ef4444" />
            <text x="500" y="260" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('PANIC / SWEEP', '恐慌 / 扫荡')}</text>
          </svg>
        </div>
      );
    case 'm11-stage5':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 350,120 L 400,150 L 450,100 L 480,160 L 500,240 L 550,60" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <circle cx="500" cy="240" r="6" fill="#ef4444" />
            <text x="500" y="260" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">{t('Retail Shorts', '散户追空')}</text>
            
            <path d="M 500,240 L 550,60" fill="none" stroke="#22c55e" strokeWidth="4" />
            <text x="550" y="45" fill="#22c55e" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Displacement', '机构反转')}</text>
          </svg>
        </div>
      );
    case 'm11-case1':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="50" width="200" height="180" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeDasharray="2 2" />
            <text x="150" y="70" fill="#3b82f6" fontSize="12" textAnchor="middle" fontFamily="monospace">Asia (Inducement)</text>
            
            <rect x="250" y="50" width="150" height="180" fill="rgba(234,179,8,0.1)" stroke="#eab308" strokeDasharray="2 2" />
            <text x="325" y="70" fill="#eab308" fontSize="12" textAnchor="middle" fontFamily="monospace">London (Sweep)</text>

            <rect x="400" y="50" width="150" height="180" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeDasharray="2 2" />
            <text x="475" y="70" fill="#22c55e" fontSize="12" textAnchor="middle" fontFamily="monospace">NY (Reversal)</text>

            <path d="M 50,180 L 100,160 L 150,170 L 200,140 L 250,150 L 300,120 L 350,220 L 400,200 L 450,80 L 500,100 L 550,60" fill="none" stroke="#fff" strokeWidth="2" />
            
            <line x1="50" y1="180" x2="350" y2="180" stroke="#ef4444" strokeDasharray="4 4" />
            <text x="200" y="195" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">Asia Low (Liquidity)</text>
            
            <circle cx="350" cy="220" r="6" fill="#ef4444" />
            <text x="350" y="240" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Sweep</text>
          </svg>
        </div>
      );
    case 'm11-case2':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <line x1="100" y1="120" x2="500" y2="120" stroke="#666" strokeDasharray="4 4" />
            <line x1="100" y1="180" x2="500" y2="180" stroke="#666" strokeDasharray="4 4" />
            
            <path d="M 100,150 L 150,130 L 200,170 L 250,140 L 300,80 L 350,100 L 380,200 L 420,160 L 450,200 L 500,60" fill="none" stroke="#3b82f6" strokeWidth="2" />
            
            <circle cx="300" cy="80" r="6" fill="#22c55e" />
            <text x="300" y="65" fill="#22c55e" fontSize="10" textAnchor="middle" fontFamily="monospace">Fake Breakout (Longs trapped)</text>
            
            <circle cx="380" cy="200" r="6" fill="#ef4444" />
            <text x="380" y="220" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">Sweep (Shorts enter)</text>
            
            <rect x="360" y="100" width="20" height="100" fill="rgba(239,68,68,0.2)" />
            <text x="340" y="150" fill="#ef4444" fontSize="10" textAnchor="end" fontFamily="monospace">BPR</text>
            
            <circle cx="420" cy="160" r="6" fill="#eab308" />
            <text x="420" y="145" fill="#eab308" fontSize="10" textAnchor="middle" fontFamily="monospace">Retest BPR</text>
          </svg>
        </div>
      );
    case 'm11-predator':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="80" width="400" height="120" rx="8" fill="#111" stroke="#22c55e" strokeWidth="2" />
            <text x="300" y="110" fill="#22c55e" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('The Predator Mindset', '捕猎者心态')}</text>
            
            <text x="300" y="140" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('1. Identify the Retail Trap (Stages 1-3)', '1. 识别散户陷阱 (阶段 1-3)')}</text>
            <text x="300" y="160" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('2. Wait for the Sweep (Stage 4)', '2. 等待扫荡完成 (阶段 4)')}</text>
            <text x="300" y="180" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('3. Enter on Institutional Reversal (Stage 5)', '3. 在机构反转时进场 (阶段 5)')}</text>
          </svg>
        </div>
      );
    case 'm11-wyckoff':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 50,150 L 100,100 L 150,180 L 200,120 L 250,160 L 300,130 L 350,220 L 400,140 L 450,160 L 500,80 L 550,100" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <line x1="50" y1="100" x2="550" y2="100" stroke="#666" strokeDasharray="4 4" />
            <line x1="50" y1="180" x2="550" y2="180" stroke="#666" strokeDasharray="4 4" />
            
            <text x="125" y="240" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">Phase A & B</text>
            <text x="125" y="260" fill="#eab308" fontSize="10" textAnchor="middle" fontFamily="monospace">Curiosity & Belief</text>
            
            <text x="350" y="240" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">Phase C (Spring)</text>
            <text x="350" y="260" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">Panic / Sweep</text>
            
            <text x="475" y="240" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">Phase D & E</text>
            <text x="475" y="260" fill="#22c55e" fontSize="10" textAnchor="middle" fontFamily="monospace">Revenge / Markup</text>
          </svg>
        </div>
      );
    case 'm11-smc':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <path d="M 100,200 L 150,150 L 200,180 L 250,120 L 300,160 L 350,240 L 400,80 L 450,120 L 500,60" fill="none" stroke="#3b82f6" strokeWidth="2" />
            
            <line x1="100" y1="200" x2="300" y2="200" stroke="#eab308" strokeDasharray="4 4" />
            <text x="200" y="215" fill="#eab308" fontSize="10" textAnchor="middle" fontFamily="monospace">Inducement (Stage 1 & 2)</text>
            
            <circle cx="350" cy="240" r="6" fill="#ef4444" />
            <text x="350" y="260" fill="#ef4444" fontSize="10" textAnchor="middle" fontFamily="monospace">Liquidity Sweep (Stage 4)</text>
            
            <line x1="250" y1="120" x2="450" y2="120" stroke="#22c55e" strokeDasharray="4 4" />
            <text x="400" y="110" fill="#22c55e" fontSize="10" textAnchor="middle" fontFamily="monospace">MSS (Stage 5)</text>
            
            <rect x="380" y="120" width="20" height="40" fill="rgba(34,197,94,0.2)" />
            <text x="430" y="145" fill="#22c55e" fontSize="10" textAnchor="middle" fontFamily="monospace">FVG</text>
          </svg>
        </div>
      );
    case 'm11-checklist':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="60" width="400" height="180" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="300" y="90" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Execution Checklist', '执行检查清单')}</text>
            
            <text x="120" y="120" fill="#fff" fontSize="12" fontFamily="monospace">□ {t('Which emotional stage are we in?', '目前处于哪个情绪阶段？')}</text>
            <text x="120" y="145" fill="#fff" fontSize="12" fontFamily="monospace">□ {t('Where is the retail Liquidity Pool?', '散户的止损池在哪里？')}</text>
            <text x="120" y="170" fill="#fff" fontSize="12" fontFamily="monospace">□ {t('Has Stage 4 (Sweep) completed?', '是否已经完成了扫荡？')}</text>
            <text x="120" y="195" fill="#fff" fontSize="12" fontFamily="monospace">□ {t('Am I providing or exploiting liquidity?', '我是在提供还是利用流动性？')}</text>
            <text x="120" y="220" fill="#fff" fontSize="12" fontFamily="monospace">□ {t('Who is on the other side of my trade?', '谁在我的交易对手盘？')}</text>
          </svg>
        </div>
      );
    case 'm11-summary':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="150" y="80" width="300" height="120" rx="8" fill="#111" stroke="#a855f7" strokeWidth="2" />
            <text x="300" y="120" fill="#a855f7" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Be the Minority', '做少数派')}</text>
            <text x="300" y="150" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Wait during Greed.', '在贪婪时等待。')}</text>
            <text x="300" y="170" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Enter during Panic.', '在恐慌时进场。')}</text>
            <text x="300" y="190" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Profit during Revenge.', '在报复时获利。')}</text>
          </svg>
        </div>
      );
    case 'm12-overview':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="100" y="80" width="400" height="160" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="300" y="120" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Forex | Crypto | Indices', '外汇 | 加密货币 | 指数')}</text>
            
            <line x1="150" y1="140" x2="450" y2="140" stroke="#666" strokeDasharray="4 4" />
            
            <text x="300" y="170" fill="#22c55e" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('HTF Narrative -> Liquidity Sweep', '大级别逻辑 -> 流动性扫荡')}</text>
            <text x="300" y="200" fill="#eab308" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('-> LTF Confirmation -> Risk Management', '-> 小级别确认 -> 风险管理')}</text>
          </svg>
        </div>
      );
    case 'm12-setup1':
    case 'm12-setup2':
    case 'm12-setup3':
    case 'm12-setup4':
    case 'm12-setup5':
    case 'm12-setup6':
    case 'm12-setup7':
    case 'm12-setup8':
    case 'm12-setup9':
    case 'm12-setup10':
    case 'm12-setup11':
    case 'm12-setup12':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <text x="300" y="150" fill="#9ca3af" fontSize="16" textAnchor="middle" fontFamily="monospace">
              {t('Live Chart Example Breakdown', '实盘图表案例拆解')}
            </text>
            <text x="300" y="180" fill="#666" fontSize="12" textAnchor="middle" fontFamily="monospace">
              {t('(Refer to specific chart annotations in the course material)', '(请参考课程资料中的具体图表注释)')}
            </text>
          </svg>
        </div>
      );

    case 'm9-overview':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="150" height="150" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="125" y="140" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Model 1', '模型 1')}</text>
            <text x="125" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Manipulation', '假突破入场')}</text>
            
            <rect x="225" y="80" width="150" height="150" rx="8" fill="#111" stroke="#3b82f6" strokeWidth="2" />
            <text x="300" y="140" fill="#3b82f6" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Model 2', '模型 2')}</text>
            <text x="300" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Confirmation', '确认入场')}</text>

            <rect x="400" y="80" width="150" height="150" rx="8" fill="#111" stroke="#eab308" strokeWidth="2" />
            <text x="475" y="140" fill="#eab308" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Model 3', '模型 3')}</text>
            <text x="475" y="165" fill="#fff" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Turtle Soup +2', '海龟汤改良版')}</text>
          </svg>
        </div>
      );
    case 'm9-mistakes':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            <rect x="50" y="80" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="160" y="115" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('1. FOMO', '1. 害怕错过')}</text>
            <text x="160" y="140" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Early Entry', '提前抢跑')}</text>

            <rect x="330" y="80" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="440" y="115" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('2. Chasing', '2. 盲目追单')}</text>
            <text x="440" y="140" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Buying Exhaustion', '追涨杀跌')}</text>

            <rect x="50" y="180" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="160" y="215" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('3. Pattern Blindness', '3. 迷信图形')}</text>
            <text x="160" y="240" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Wrong Context', '忽略市场背景')}</text>

            <rect x="330" y="180" width="220" height="80" rx="8" fill="#111" stroke="#ef4444" strokeWidth="2" />
            <text x="440" y="215" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('4. Random Stops', '4. 止损乱放')}</text>
            <text x="440" y="240" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Fixed Pips', '固定点数止损')}</text>
          </svg>
        </div>
      );
    case 'm9-manipulation-entry':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            {/* Range */}
            <line x1="100" y1="100" x2="500" y2="100" stroke="#666" strokeDasharray="4 4" />
            <text x="100" y="90" fill="#9ca3af" fontSize="14" fontFamily="monospace">{t('Range High', '区间高点')}</text>
            
            <line x1="100" y1="180" x2="500" y2="180" stroke="#666" strokeDasharray="4 4" />
            <text x="100" y="170" fill="#9ca3af" fontSize="14" fontFamily="monospace">{t('Range Low / Stop Pool', '区间低点 / 止损池')}</text>

            {/* Price action */}
            <path d="M 100,140 L 150,120 L 200,170 L 250,130 L 300,180" fill="none" stroke="#9ca3af" strokeWidth="2" />
            {/* Sweep */}
            <path d="M 300,180 L 320,240" fill="none" stroke="#ef4444" strokeWidth="3" />
            {/* V-Shape Reclaim */}
            <path d="M 320,240 L 350,140 L 400,160 L 450,110" fill="none" stroke="#22c55e" strokeWidth="3" />

            {/* Annotations */}
            <circle cx="320" cy="240" r="4" fill="#ef4444" />
            <text x="320" y="260" fill="#ef4444" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Sweep & Trap', '扫荡与陷阱')}</text>
            
            <line x1="280" y1="245" x2="360" y2="245" stroke="#ef4444" strokeWidth="2" />
            <text x="320" y="280" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Stop Loss (Below Wick)', '止损 (针尖下方)')}</text>

            <circle cx="350" cy="140" r="4" fill="#22c55e" />
            <text x="350" y="125" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('V-Shape Reclaim (Entry)', 'V型收回 (入场)')}</text>
          </svg>
        </div>
      );

    case 'm9-confirmation-entry':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            {/* Old Low */}
            <line x1="100" y1="200" x2="250" y2="200" stroke="#666" strokeDasharray="4 4" />
            <text x="100" y="190" fill="#9ca3af" fontSize="14" fontFamily="monospace">{t('Old Low', '旧低点')}</text>

            {/* Price Action */}
            <path d="M 100,150 L 150,180 L 200,140 L 250,200" fill="none" stroke="#9ca3af" strokeWidth="2" />
            {/* Sweep */}
            <path d="M 250,200 L 280,240" fill="none" stroke="#ef4444" strokeWidth="3" />
            {/* Displacement & CHOCH */}
            <path d="M 280,240 L 320,120" fill="none" stroke="#22c55e" strokeWidth="3" />
            
            <line x1="180" y1="140" x2="350" y2="140" stroke="#eab308" strokeDasharray="4 4" />
            <text x="360" y="145" fill="#eab308" fontSize="14" fontFamily="monospace">CHOCH</text>

            {/* FVG */}
            <rect x="300" y="160" width="100" height="40" fill="rgba(34,197,94,0.2)" />
            <text x="350" y="185" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">FVG</text>

            {/* Retest */}
            <path d="M 320,120 L 350,170" fill="none" stroke="#9ca3af" strokeWidth="2" />
            <circle cx="350" cy="170" r="4" fill="#22c55e" />
            <text x="350" y="215" fill="#22c55e" fontSize="14" textAnchor="middle" fontFamily="monospace">{t('Retest (Entry)', '回踩 (入场)')}</text>
            
            {/* Continuation */}
            <path d="M 350,170 L 400,90" fill="none" stroke="#22c55e" strokeWidth="3" />

            {/* Stop Loss */}
            <line x1="250" y1="250" x2="310" y2="250" stroke="#ef4444" strokeWidth="2" />
            <text x="280" y="265" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Stop Loss', '止损')}</text>
          </svg>
        </div>
      );

    case 'm9-turtle-soup':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            {/* Old Low */}
            <line x1="100" y1="180" x2="500" y2="180" stroke="#666" strokeDasharray="4 4" />
            <text x="100" y="170" fill="#9ca3af" fontSize="14" fontFamily="monospace">{t('HTF Old Low', '大级别旧低')}</text>

            {/* Price Action */}
            <path d="M 100,100 L 150,150 L 200,120 L 250,180" fill="none" stroke="#9ca3af" strokeWidth="2" />
            
            {/* Sweep & First Rejection */}
            <path d="M 250,180 L 280,230 L 320,160" fill="none" stroke="#ef4444" strokeWidth="2" />
            <text x="280" y="245" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('1st Rejection', '第一次拒绝')}</text>

            {/* Neckline */}
            <line x1="300" y1="160" x2="450" y2="160" stroke="#eab308" strokeDasharray="4 4" />
            <text x="460" y="165" fill="#eab308" fontSize="12" fontFamily="monospace">{t('Neckline', '颈线')}</text>

            {/* Secondary Sweep / Second Rejection */}
            <path d="M 320,160 L 360,210 L 400,130" fill="none" stroke="#22c55e" strokeWidth="3" />
            <circle cx="360" cy="210" r="4" fill="#22c55e" />
            <text x="360" y="225" fill="#22c55e" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('2nd Rejection (Entry)', '第二次拒绝 (入场)')}</text>

            {/* Stop Loss */}
            <line x1="330" y1="220" x2="390" y2="220" stroke="#ef4444" strokeWidth="2" />
            <text x="360" y="240" fill="#ef4444" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Stop Loss', '止损')}</text>
          </svg>
        </div>
      );

    case 'm9-model-selection':
      return (
        <div className={containerClass}>
          <svg viewBox="0 40 600 260" className={svgClass}>
            {/* Ranging / Asian */}
            <rect x="50" y="80" width="150" height="100" rx="4" fill="#111" stroke="#ef4444" />
            <text x="125" y="110" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Ranging / Asian', '震荡 / 亚盘')}</text>
            <text x="125" y="140" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Model 1', '模型 1')}</text>
            <text x="125" y="160" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Manipulation', '假突破')}</text>

            {/* Trending / London */}
            <rect x="225" y="80" width="150" height="100" rx="4" fill="#111" stroke="#3b82f6" />
            <text x="300" y="110" fill="#3b82f6" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('Trending / London', '趋势 / 伦敦盘')}</text>
            <text x="300" y="140" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Model 2', '模型 2')}</text>
            <text x="300" y="160" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Confirmation', '确认入场')}</text>

            {/* News / NY Open */}
            <rect x="400" y="80" width="150" height="100" rx="4" fill="#111" stroke="#eab308" />
            <text x="475" y="110" fill="#eab308" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{t('News / NY Open', '新闻 / 纽约初')}</text>
            <text x="475" y="140" fill="#fff" fontSize="16" textAnchor="middle" fontFamily="monospace">{t('Model 3', '模型 3')}</text>
            <text x="475" y="160" fill="#9ca3af" fontSize="12" textAnchor="middle" fontFamily="monospace">{t('Turtle Soup +2', '海龟汤改良')}</text>

            <rect x="150" y="220" width="300" height="40" rx="4" fill="rgba(255,255,255,0.05)" stroke="#666" />
            <text x="300" y="245" fill="#fff" fontSize="14" textAnchor="middle" fontFamily="monospace">
              {t('Core: Switch weapons based on Market State', '核心：根据市场状态切换武器')}
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={containerClass}>
          <div className="w-64 h-64 border-2 border-dashed border-red-500 rounded flex items-center justify-center text-red-500 font-mono text-sm p-4 text-center">
            [Fallback - Missing Diagram: {type}]
          </div>
        </div>
      );
  }
};
