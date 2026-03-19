import fs from 'fs';

const diagramsContent = `
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
`;

const diagramsPath = 'src/components/Diagrams.tsx';
let diagramsContentStr = fs.readFileSync(diagramsPath, 'utf-8');

const m11StartIndex = diagramsContentStr.indexOf("case 'm11-overview':");
const m12StartIndex = diagramsContentStr.indexOf("case 'm12-overview':");

if (m11StartIndex !== -1 && m12StartIndex !== -1) {
  const newDiagramsContent = diagramsContentStr.substring(0, m11StartIndex) + diagramsContent.trim() + '\\n    ' + diagramsContentStr.substring(m12StartIndex);
  fs.writeFileSync(diagramsPath, newDiagramsContent);
  console.log('Successfully replaced m11 diagrams in src/components/Diagrams.tsx');
} else {
  console.log('Could not find m11 or m12 start in Diagrams.tsx', m11StartIndex, m12StartIndex);
}
