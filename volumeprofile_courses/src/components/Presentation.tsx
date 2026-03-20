import { SlideData } from '../data/slides';
import { ChartComparison } from './charts/ChartComparison';
import { PriceValueChart } from './charts/PriceValueChart';
import { HistoryTimeline } from './charts/HistoryTimeline';
import { InstitutionsChart } from './charts/InstitutionsChart';
import { TermPOCVAChart } from './charts/TermPOCVAChart';
import { TermNodesChart } from './charts/TermNodesChart';
import { TermTPOChart } from './charts/TermTPOChart';
import { TermExtremesChart } from './charts/TermExtremesChart';
import { TermShapesChart } from './charts/TermShapesChart';
import { CandleProfileChart } from './charts/CandleProfileChart';
import { TermSummaryTable } from './charts/TermSummaryTable';

interface PresentationProps {
  slide: SlideData;
  language: 'zh' | 'en';
}

export function Presentation({ slide, language }: PresentationProps) {
  const isTitle = slide.chartType === 'title';
  const isVisualOnly = Boolean(slide.visualOnly);

  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col z-10 p-10">
        {!isVisualOnly && (
          <h2 className={`font-bold tracking-tight text-[#00ff88] ${isTitle ? 'text-5xl mt-20 mb-6' : 'text-3xl mb-8'}`}>
            {slide.title[language]}
          </h2>
        )}

        <div className={`flex-1 flex gap-8 ${isTitle ? 'flex-col items-start' : 'flex-row'} ${isVisualOnly ? 'items-stretch' : ''}`}>
          {/* Content Points */}
          {slide.content && !isVisualOnly && (
            <div className={`flex flex-col gap-5 ${isTitle ? 'w-full' : 'w-1/3'}`}>
              {slide.content[language].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#00ff88] shrink-0" />
                  <p className={`${isTitle ? 'text-2xl text-neutral-300' : 'text-lg text-neutral-300'}`}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Chart Area */}
          {!isTitle && (
            <div className={`flex-1 bg-neutral-900/50 rounded-xl border border-neutral-800/50 relative flex items-center justify-center ${isVisualOnly ? 'p-2' : 'p-4'}`}>
              {slide.chartType === 'comparison' && <ChartComparison language={language} />}
              {slide.chartType === 'price-value' && <PriceValueChart language={language} />}
              {slide.chartType === 'history' && <HistoryTimeline language={language} />}
              {slide.chartType === 'institutions' && <InstitutionsChart language={language} />}
              {slide.chartType === 'term-poc-va' && <TermPOCVAChart language={language} />}
              {slide.chartType === 'term-summary' && <TermSummaryTable language={language} />}
              {slide.chartType === 'term-nodes' && <TermNodesChart language={language} />}
              {slide.chartType === 'term-tpo' && <TermTPOChart language={language} />}
              {slide.chartType === 'term-extremes' && <TermExtremesChart language={language} />}
              {slide.chartType === 'term-shapes' && <TermShapesChart language={language} />}
              {slide.chartType === 'candle-profile' && slide.chartData && <CandleProfileChart {...slide.chartData} language={language} />}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="h-12 border-t border-neutral-800/50 flex justify-between items-center px-6 z-10 text-sm font-medium">
        <div className="text-[#00ff88] tracking-wider">绿洲交易社区</div>
        <div className="text-[#00ff88] tracking-wider">www.tradingwonderland.com</div>
      </div>
    </div>
  );
}

interface PresentationControlsProps {
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  total: number;
}

export function PresentationControls({ onNext, onPrev, currentIndex, total }: PresentationControlsProps) {
  return (
    <div className="absolute bottom-[-60px] left-0 right-0 flex justify-between items-center text-neutral-400">
      <div className="text-sm font-mono">
        SLIDE {currentIndex + 1} / {total}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-800 transition-colors"
        >
          PREV
        </button>
        <button 
          onClick={onNext}
          disabled={currentIndex === total - 1}
          className="px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-800 transition-colors text-[#00ff88]"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
