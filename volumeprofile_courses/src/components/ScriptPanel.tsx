import { Mic, CirclePlay, Info } from 'lucide-react';

interface ScriptPanelProps {
  script: string;
  language: 'zh' | 'en';
  slideIndex: number;
  totalSlides: number;
}

export function ScriptPanel({ script, language, slideIndex, totalSlides }: ScriptPanelProps) {
  return (
    <div className="flex flex-col h-full bg-[#050505]">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800/80 bg-neutral-900/50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/30">
          <Mic className="w-4 h-4 text-[#00ff88]" />
        </div>
        <div>
          <h3 className="text-white font-medium">
            {language === 'zh' ? '讲演稿控制台' : 'Presenter Script Console'}
          </h3>
          <p className="text-xs text-neutral-500 font-mono">
            Remotion &lt;Audio&gt; Sync Module - {slideIndex + 1}/{totalSlides}
          </p>
        </div>
      </div>

      {/* Script Text Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose prose-invert prose-p:leading-relaxed max-w-none">
          <div className="relative group">
            <p className="text-lg md:text-xl text-neutral-300 font-medium whitespace-pre-wrap">
              {script}
            </p>
            {/* Hover visual cue for "reading" progress */}
            <div className="absolute left-[-16px] top-0 bottom-0 w-1 bg-[#00ff88]/20 rounded-full group-hover:bg-[#00ff88]/80 transition-colors" />
          </div>
        </div>
      </div>

      {/* Footer / Teleprompter controls (mock) */}
      <div className="p-4 border-t border-neutral-800/80 bg-neutral-900/30">
        <div className="flex items-center justify-between mb-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            <span>
              {language === 'zh' 
                ? '提示: 将同步至 Remotion <Sequence>' 
                : 'Hint: Syncs with Remotion <Sequence>'}
            </span>
          </div>
          <span>~ 45s</span>
        </div>

        <button className="w-full py-3 rounded-lg bg-[#00ff88]/10 hover:bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30 flex items-center justify-center gap-2 transition-colors font-medium tracking-wide">
          <CirclePlay className="w-5 h-5" />
          {language === 'zh' ? '预演录音片段' : 'Rehearse Audio Clip'}
        </button>
      </div>
    </div>
  );
}
