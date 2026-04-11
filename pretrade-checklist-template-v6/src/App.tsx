import { useEffect, useMemo, useState } from "react";
import { CHECKLISTS, type ChecklistMode } from "./data/checklists";
import { exportChecklistDocx } from "./utils/exportDocx";
import { exportChecklistPdf } from "./utils/exportPdf";
import { loadState, saveState, type ChecklistState } from "./utils/storage";

const STORAGE_KEY = "pretrade-checklist-v1";

const modeLabel: Record<ChecklistMode, string> = {
  quick: "1 分钟快检",
  standard: "标准版",
  strict: "严格版",
};

export default function App() {
  const [mode, setMode] = useState<ChecklistMode>("quick");
  const [state, setState] = useState<ChecklistState>({});
  const [exportBlank, setExportBlank] = useState(true);
  const [exporting, setExporting] = useState<"" | "pdf" | "docx">("");
  const template = CHECKLISTS[mode];

  useEffect(() => {
    setState(loadState(STORAGE_KEY));
  }, []);

  useEffect(() => {
    saveState(STORAGE_KEY, state);
  }, [state]);

  const flatItemIds = useMemo(() => template.sections.flatMap((s) => s.items.map((i) => i.id)), [template]);
  const checkedCount = useMemo(() => flatItemIds.filter((id) => state[id]).length, [flatItemIds, state]);

  const toggleItem = (id: string) => {
    setState((current) => ({ ...current, [id]: !current[id] }));
  };

  const clearCurrentTab = () => {
    setState((current) => {
      const next = { ...current };
      flatItemIds.forEach((id) => delete next[id]);
      return next;
    });
  };

  const clearAll = () => {
    setState({});
  };

  const handleExportDocx = async () => {
    if (exporting) return;
    setExporting("docx");
    try {
      await exportChecklistDocx({
        mode,
        template,
        checked: exportBlank ? {} : state,
        fileName: `pretrade-checklist-${mode}-${new Date().toISOString().slice(0, 10)}.docx`,
      });
    } finally {
      setExporting("");
    }
  };

  const handleExportPdf = async () => {
    if (exporting) return;
    setExporting("pdf");
    try {
      await exportChecklistPdf({
        mode,
        template,
        checked: exportBlank ? {} : state,
        fileName: `pretrade-checklist-${mode}-${new Date().toISOString().slice(0, 10)}.pdf`,
      });
    } finally {
      setExporting("");
    }
  };

  return (
    <main className="min-h-screen bg-[#050a08] text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8 md:py-10">
        <header className="animate-fade-in border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-[#0b1511] to-[#060b09] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300/80">Trader Checklist</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">交易前 Checklist 模板</h1>
          <p className="mt-3 text-sm text-slate-300 md:text-base">
            三档检查清单（快检 / 标准 / 严格），用于交易前自我审核，支持导出 PDF / DOCX（导出文件内可继续勾选）。
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportPdf}
              disabled={exporting !== ""}
              className="border border-emerald-400 bg-emerald-400 px-4 py-2 text-sm font-medium text-[#04210f] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {exporting === "pdf" ? "导出中..." : "导出 PDF"}
            </button>
            <button
              type="button"
              onClick={handleExportDocx}
              disabled={exporting !== ""}
              className="border border-emerald-400/60 px-4 py-2 text-sm text-emerald-200 transition hover:border-emerald-300 hover:text-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {exporting === "docx" ? "导出中..." : "导出 DOCX"}
            </button>

            <label className="ml-1 flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={exportBlank}
                onChange={(e) => setExportBlank(e.target.checked)}
                className="h-4 w-4 accent-emerald-400"
              />
              导出为未勾选模板
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
            <p>
              当前进度：<span className="font-semibold text-emerald-300">{checkedCount}</span> / {flatItemIds.length}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={clearCurrentTab}
                className="border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/10"
              >
                清空本页
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-200 transition hover:bg-rose-500/15"
              >
                全部清空
              </button>
            </div>
          </div>
        </header>

        <section className="flex flex-wrap gap-2">
          {(Object.keys(CHECKLISTS) as ChecklistMode[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              className={`border px-4 py-2 text-sm transition ${
                key === mode
                  ? "border-emerald-400 bg-emerald-400 text-[#04210f]"
                  : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
            >
              {modeLabel[key]}
            </button>
          ))}
        </section>

        <section className="border border-white/10 bg-[#080f0c] p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">{template.title}</h2>
              <p className="mt-1 text-sm text-slate-300">{template.subtitle}</p>
            </div>
            <div className="text-right text-xs text-slate-400">
              <p>提示：任一“否决项（Kill Switch）”为否 → 本次不交易。</p>
              <p>建议：把“标准版”作为默认流程，严格版用于状态差或重大事件日。</p>
            </div>
          </div>

          <div className="space-y-6">
            {template.sections.map((section) => (
              <div key={section.id} className="border border-white/10 bg-[#050a08] p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold text-emerald-200">{section.title}</h3>
                  {section.hint && <p className="text-xs text-slate-400">{section.hint}</p>}
                </div>

                <div className="mt-3 space-y-2">
                  {section.items.map((item) => {
                    const checked = Boolean(state[item.id]);
                    return (
                      <label
                        key={item.id}
                        className={`flex cursor-pointer items-start gap-3 border border-white/10 px-3 py-2 text-sm transition hover:bg-white/5 ${
                          checked ? "bg-emerald-500/10" : "bg-transparent"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleItem(item.id)}
                          className="mt-0.5 h-4 w-4 flex-none accent-emerald-400"
                        />
                        <span className="flex-1">
                          <span className="text-slate-100">{item.label}</span>
                          {item.desc && <span className="ml-2 text-xs text-slate-400">{item.desc}</span>}
                          {item.kill && <span className="ml-2 text-xs font-semibold text-rose-300">否决项</span>}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="pb-4 text-center text-xs text-slate-500">
          建议在执行前后各拍一张截图（计划前 / 下单后），并在复盘时对照执行偏差。
        </footer>
      </div>
    </main>
  );
}

