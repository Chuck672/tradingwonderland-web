import { useState, useEffect } from 'react';
import { courseData } from './data';
import { Chart } from './components/Chart';
import { Diagram } from './components/Diagrams';
import { 
  ChevronLeft, 
  ChevronRight, 
  MonitorPlay, 
  Languages, 
  BookOpen, 
  Mic 
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [moduleIdx, setModuleIdx] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);

  const currentModule = courseData[moduleIdx];
  const currentSlide = currentModule.slides[slideIdx];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moduleIdx, slideIdx]);

  const nextSlide = () => {
    if (slideIdx < currentModule.slides.length - 1) {
      setSlideIdx(slideIdx + 1);
    } else if (moduleIdx < courseData.length - 1) {
      setModuleIdx(moduleIdx + 1);
      setSlideIdx(0);
    }
  };

  const prevSlide = () => {
    if (slideIdx > 0) {
      setSlideIdx(slideIdx - 1);
    } else if (moduleIdx > 0) {
      setModuleIdx(moduleIdx - 1);
      setSlideIdx(courseData[moduleIdx - 1].slides.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-[#00ff00] selection:text-black flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <MonitorPlay className="w-5 h-5 text-[#00ff00]" />
          <h1 className="font-bold tracking-tight text-white">
            Advanced Institutional Price Action
            <span className="ml-3 px-2 py-0.5 rounded text-xs font-mono bg-green-500/10 text-[#00ff00] border border-green-500/20">
              V2025
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <select 
            className="bg-[#111] border border-gray-700 text-sm rounded px-2 py-1 outline-none focus:border-[#00ff00]"
            value={moduleIdx}
            onChange={(e) => {
              setModuleIdx(Number(e.target.value));
              setSlideIdx(0);
            }}
          >
            {courseData.map((m, i) => (
              <option key={m.id} value={i}>{m.title[lang].replace(/\\n/g, ' ')}</option>
            ))}
          </select>

          <button 
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-2 hover:bg-[#1a1a1a] px-3 py-1.5 rounded transition-colors text-sm border border-gray-700"
          >
            <Languages className="w-4 h-4 text-[#00ff00]" />
            {lang === 'zh' ? 'EN' : '中'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left: Slide View (16:9 constrained) */}
        <div className="flex-[3] bg-[#0a0a0a] border-r border-gray-800 p-8 flex items-center justify-center relative shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
          {!currentSlide ? (
             <div className="text-2xl text-gray-400">Module under construction... Please select another module from the top dropdown.</div>
          ) : (
            <div className="w-full max-w-[1200px] aspect-video bg-[#0f1115] border border-gray-700 rounded-xl relative overflow-hidden flex flex-col shadow-2xl mx-auto">
            {/* Slide Header */}
            <div className="p-8 pb-4 z-10">
              <div className="text-[#00ff00] font-mono text-xs tracking-widest uppercase mb-3 opacity-80 whitespace-pre-line">
                {currentModule.title[lang].replace(/\\n/g, '\n')} — Slide {slideIdx + 1}
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white leading-tight whitespace-pre-line">
                {currentSlide.title[lang].replace(/\\n/g, '\n')}
              </h2>
            </div>

            {/* Slide Body */}
            <div className="flex-1 px-8 pb-12 flex flex-col gap-4 relative z-10 overflow-hidden">
              {currentSlide.bullets && currentSlide.bullets[lang] && currentSlide.bullets[lang].length > 0 && (
                <ul className="space-y-2 text-base text-gray-300 z-20">
                  {currentSlide.bullets[lang].map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#00ff00] mt-1 text-sm">▹</span>
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Chart Injection */}
              {currentSlide.chartData && (
                <div className="flex-1 mt-2 -mx-4 relative min-h-0">
                  <div className="absolute inset-0">
                    <Chart 
                      data={currentSlide.chartData} 
                      annotations={currentSlide.annotations} 
                    />
                  </div>
                </div>
              )}

              {currentSlide.diagram && !currentSlide.chartData && (
                <div className="flex-1 mt-6 relative opacity-80 min-h-0">
                  <Diagram type={currentSlide.diagram} lang={lang} />
                </div>
              )}
            </div>

            {/* Slide Footer (Watermarks) */}
            <div className="absolute bottom-0 left-0 w-full h-12 flex justify-between items-center px-8 text-sm font-bold tracking-widest z-10 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[#00ff00] drop-shadow-[0_0_8px_rgba(0,255,0,0.4)]">绿洲交易社区</span>
              <span className="text-[#00ff00] drop-shadow-[0_0_8px_rgba(0,255,0,0.4)]">www.tradingwonderland.com</span>
            </div>
            
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />
          </div>
          )}
        </div>

        {/* Right: Teleprompter / Speaker Notes */}
        <div className="flex-[2] bg-[#050505] flex flex-col relative overflow-hidden">
          <div className="h-12 border-b border-gray-800 flex items-center px-6 gap-2 bg-[#0a0a0a] shrink-0">
            <Mic className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
              Teleprompter Panel
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-prose mx-auto">
              {currentSlide?.script ? (
                <div className="font-medium text-gray-300">
                  {currentSlide.script[lang].split('\n\n').map((paragraph, i) => (
                    <p key={i} className="leading-relaxed mb-6 text-xl">{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600 flex flex-col items-center justify-center h-64 text-sm font-mono">
                  <BookOpen className="w-8 h-8 mb-4 opacity-50" />
                  No script available for this slide.
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="h-20 bg-[#0a0a0a] border-t border-gray-800 flex items-center justify-between px-8 shrink-0">
            <div className="text-xs font-mono text-gray-500">
              {slideIdx + 1} / {Math.max(1, currentModule.slides.length)}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={prevSlide}
                disabled={moduleIdx === 0 && slideIdx === 0}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#111] hover:bg-[#1a1a1a] border border-gray-700 disabled:opacity-30 disabled:hover:bg-[#111] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </button>
              <button 
                onClick={nextSlide}
                disabled={(moduleIdx === courseData.length - 1 && slideIdx === currentModule.slides.length - 1) || currentModule.slides.length === 0}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#00ff00] hover:bg-[#00cc00] shadow-[0_0_15px_rgba(0,255,0,0.3)] disabled:opacity-30 disabled:shadow-none transition-all"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Global Styles for Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
