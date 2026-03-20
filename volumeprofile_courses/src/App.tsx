import { useState, useMemo } from 'react';
import { Presentation, PresentationControls } from './components/Presentation';
import { ScriptPanel } from './components/ScriptPanel';
import { chapter1Slides, chapter2Slides, chapter3Slides, chapter4Slides, chapter5Slides, chapter6Slides } from './data/slides';
import { Volume2, VolumeX, MonitorPlay, Languages, ChevronDown } from 'lucide-react';

function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [isMuted, setIsMuted] = useState(false); // Just for UI completeness

  // Organize slides into chapters
  const chapters = useMemo(
    () => [
      {
        id: 'ch1',
        title: { zh: '第一章：基础概念', en: 'Chapter 1: Basic Concepts' },
        slides: chapter1Slides,
      },
      {
        id: 'ch2',
        title: { zh: '第二章：核心术语详解', en: 'Chapter 2: Core Terminology' },
        slides: chapter2Slides,
      },
      {
        id: 'ch3',
        title: { zh: '第三章：如何阅读和分析 Volume Profile', en: 'Chapter 3: Reading and Analysis' },
        slides: chapter3Slides,
      },
      {
        id: 'ch4',
        title: { zh: '第四章：交易策略与实战应用', en: 'Chapter 4: Strategy and Execution' },
        slides: chapter4Slides,
      },
      {
        id: 'ch5',
        title: { zh: '第五章：Volume Profile 与价格行为结合', en: 'Chapter 5: Volume Profile with Price Action' },
        slides: chapter5Slides,
      },
      {
        id: 'ch6',
        title: { zh: '第六章：六种高概率融合模式', en: 'Chapter 6: Six High-Probability Patterns' },
        slides: chapter6Slides,
      },
    ],
    [],
  );

  const currentChapterData = chapters[currentChapter];
  const currentSlide = currentChapterData.slides[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < currentChapterData.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentChapter(Number(e.target.value));
    setCurrentSlideIndex(0);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 p-4 flex flex-col md:flex-row gap-4 justify-between items-center backdrop-blur-sm relative z-50">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded bg-[#00ff88]/20 flex items-center justify-center border border-[#00ff88]/50">
              <MonitorPlay className="w-5 h-5 text-[#00ff88]" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Volume Profile Pro
            </h1>
          </div>
          
          {/* Chapter Selector Dropdown */}
          <div className="relative flex-1 md:flex-none max-w-[300px]">
            <select 
              value={currentChapter}
              onChange={handleChapterChange}
              className="w-full appearance-none bg-neutral-800 border border-neutral-700 text-neutral-200 text-sm rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:border-[#00ff88]/50 transition-colors cursor-pointer"
            >
              {chapters.map((ch, index) => (
                <option key={ch.id} value={index}>
                  {ch.title[language]}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700 text-sm font-medium shrink-0"
          >
            <Languages className="w-4 h-4" />
            {language === 'zh' ? 'EN / 中文' : 'ZH / English'}
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-md hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white shrink-0"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
        {/* Left Side: 16:9 Presentation */}
        <div className="flex-1 p-4 lg:p-8 flex flex-col justify-center items-center bg-neutral-950/80 relative">
          
          <div className="w-full max-w-5xl relative shadow-2xl shadow-black">
            {/* 16:9 Aspect Ratio Container */}
            <div className="relative w-full pt-[56.25%] bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
              <div className="absolute inset-0">
                <Presentation slide={currentSlide} language={language} />
              </div>
            </div>
            
            <PresentationControls 
              onNext={handleNext} 
              onPrev={handlePrev} 
              currentIndex={currentSlideIndex} 
              total={currentChapterData.slides.length} 
            />
          </div>

        </div>

        {/* Right Side: Script Panel */}
        <div className="w-full lg:w-[400px] xl:w-[480px] border-l border-neutral-800 bg-neutral-900/30 flex flex-col">
          <ScriptPanel 
            script={currentSlide.script[language]} 
            language={language} 
            slideIndex={currentSlideIndex}
            totalSlides={currentChapterData.slides.length}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
