import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  PageNumber,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import html2canvas from "html2canvas";
import RichTextEditor from "./components/RichTextEditor";
import { htmlToDocxBlocks, stripHtml } from "./utils/richTextDocx";

type TradeDirection = "Long" | "Short";
type MarketType = "Crypto" | "Forex" | "Stocks" | "Futures" | "Options";
type SessionType = "Asia" | "London" | "New York" | "Overlap" | "Other";
type SetupQuality = "A" | "B" | "C" | "D";

type JournalMeta = {
  traderName: string;
  accountName: string;
  primaryStrategy: string;
  reviewCycle: string;
  riskModel: string;
};

type TradeEntry = {
  id: string;
  dateTime: string;
  symbol: string;
  market: MarketType;
  session: SessionType;
  timeframe: string;
  direction: TradeDirection;
  setup: string;
  setupQuality: SetupQuality;
  thesisHtml: string;
  entry: number;
  stopLoss: number;
  target: number;
  exit: number;
  size: number;
  riskAmount: number;
  fees: number;
  pnl: number;
  plannedRR: number;
  actualRR: number;
  confidence: number;
  planFollowed: boolean;
  emotionBefore: string;
  emotionAfter: string;
  mistakeTag: string;
  exitReason: string;
  lessonHtml: string;
};

type TradeFormState = {
  dateTime: string;
  symbol: string;
  market: MarketType;
  session: SessionType;
  timeframe: string;
  direction: TradeDirection;
  setup: string;
  setupQuality: SetupQuality;
  thesisHtml: string;
  entry: string;
  stopLoss: string;
  target: string;
  exit: string;
  size: string;
  riskAmount: string;
  fees: string;
  confidence: string;
  planFollowed: boolean;
  emotionBefore: string;
  emotionAfter: string;
  mistakeTag: string;
  exitReason: string;
  lessonHtml: string;
};

type RequiredFieldKey =
  | "dateTime"
  | "symbol"
  | "setup"
  | "entry"
  | "stopLoss"
  | "target"
  | "exit"
  | "size";

type StoredData = {
  meta: JournalMeta;
  entries: TradeEntry[];
};

const STORAGE_KEY = "trade-journal-template-v3";
const LEGACY_STORAGE_KEY = "trade-journal-template-v2";

const defaultMeta: JournalMeta = {
  traderName: "",
  accountName: "",
  primaryStrategy: "",
  reviewCycle: "Weekly",
  riskModel: "每笔固定风险 0.5% - 1%",
};

const defaultForm: TradeFormState = {
  dateTime: "",
  symbol: "",
  market: "Crypto",
  session: "New York",
  timeframe: "15m",
  direction: "Long",
  setup: "",
  setupQuality: "B",
  thesisHtml: "",
  entry: "",
  stopLoss: "",
  target: "",
  exit: "",
  size: "",
  riskAmount: "",
  fees: "0",
  confidence: "3",
  planFollowed: true,
  emotionBefore: "Calm",
  emotionAfter: "Neutral",
  mistakeTag: "None",
  exitReason: "",
  lessonHtml: "",
};

const requiredFieldLabels: Record<RequiredFieldKey, string> = {
  dateTime: "日期时间",
  symbol: "品种",
  setup: "策略形态",
  entry: "进场价",
  stopLoss: "止损价",
  target: "止盈价",
  exit: "出场价",
  size: "仓位",
};

const toNumber = (value: string) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const getCurrentDateTimeLocal = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const local = new Date(now.getTime() - timezoneOffset);
  return local.toISOString().slice(0, 16);
};

const localDateTimeToIso = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatMoney = (value: number) => value.toFixed(2);

const CHINESE_FONT_URLS = [
  "/fonts/SmileySans-Oblique.ttf",
  "https://raw.githubusercontent.com/deepin-community/fonts-smiley-sans/master/SmileySans-Oblique.ttf",
  "https://cdn.jsdelivr.net/gh/deepin-community/fonts-smiley-sans@master/SmileySans-Oblique.ttf",
];
let chineseFontBase64: string | null = null;

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
};

const loadChineseFontBase64 = async () => {
  if (chineseFontBase64) {
    return chineseFontBase64;
  }

  let lastStatus = "";

  for (const fontUrl of CHINESE_FONT_URLS) {
    try {
      const response = await fetch(fontUrl, { cache: "force-cache" });
      if (!response.ok) {
        lastStatus = `${response.status}`;
        continue;
      }

      const fontBuffer = await response.arrayBuffer();
      chineseFontBase64 = arrayBufferToBase64(fontBuffer);
      return chineseFontBase64;
    } catch {
      lastStatus = "network";
    }
  }

  throw new Error(
    `中文字体加载失败(${lastStatus || "unknown"})。请将字体文件放到 public/fonts/SmileySans-Oblique.ttf 后重试。`,
  );
};

const sanitizeMeta = (raw?: Partial<JournalMeta>): JournalMeta => ({
  traderName: typeof raw?.traderName === "string" ? raw.traderName : defaultMeta.traderName,
  accountName: typeof raw?.accountName === "string" ? raw.accountName : defaultMeta.accountName,
  primaryStrategy:
    typeof raw?.primaryStrategy === "string" ? raw.primaryStrategy : defaultMeta.primaryStrategy,
  reviewCycle: typeof raw?.reviewCycle === "string" ? raw.reviewCycle : defaultMeta.reviewCycle,
  riskModel: typeof raw?.riskModel === "string" ? raw.riskModel : defaultMeta.riskModel,
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const plainTextToHtml = (value: string) => {
  const safe = escapeHtml(value ?? "");
  if (!safe.trim()) {
    return "";
  }
  // Preserve line breaks.
  return safe
    .split(/\r?\n/g)
    .map((line) => `<p>${line || "<br />"}</p>`)
    .join("");
};

const normalizeEntry = (raw: any): TradeEntry | null => {
  const iso = typeof raw.dateTime === "string" ? raw.dateTime : "";
  if (!iso || Number.isNaN(new Date(iso).getTime())) {
    return null;
  }

  const direction: TradeDirection = raw.direction === "Short" ? "Short" : "Long";
  const marketList: MarketType[] = ["Crypto", "Forex", "Stocks", "Futures", "Options"];
  const sessionList: SessionType[] = ["Asia", "London", "New York", "Overlap", "Other"];
  const market = marketList.includes(raw.market as MarketType) ? (raw.market as MarketType) : "Crypto";
  const session = sessionList.includes(raw.session as SessionType) ? (raw.session as SessionType) : "Other";
  const qualityList: SetupQuality[] = ["A", "B", "C", "D"];
  const setupQuality = qualityList.includes(raw.setupQuality as SetupQuality)
    ? (raw.setupQuality as SetupQuality)
    : "B";

  const thesisHtml =
    typeof raw.thesisHtml === "string"
      ? raw.thesisHtml
      : typeof raw.thesis === "string"
        ? plainTextToHtml(raw.thesis)
        : "";
  const lessonHtml =
    typeof raw.lessonHtml === "string"
      ? raw.lessonHtml
      : typeof raw.lesson === "string"
        ? plainTextToHtml(raw.lesson)
        : "";

  return {
    id: typeof raw.id === "string" ? raw.id : crypto.randomUUID(),
    dateTime: iso,
    symbol: typeof raw.symbol === "string" ? raw.symbol : "",
    market,
    session,
    timeframe: typeof raw.timeframe === "string" ? raw.timeframe : "-",
    direction,
    setup: typeof raw.setup === "string" ? raw.setup : "",
    setupQuality,
    thesisHtml,
    entry: Number(raw.entry) || 0,
    stopLoss: Number(raw.stopLoss) || 0,
    target: Number(raw.target) || 0,
    exit: Number(raw.exit) || 0,
    size: Number(raw.size) || 0,
    riskAmount: Number(raw.riskAmount) || 0,
    fees: Number(raw.fees) || 0,
    pnl: Number(raw.pnl) || 0,
    plannedRR: Number(raw.plannedRR) || 0,
    actualRR: Number(raw.actualRR) || 0,
    confidence: Math.min(5, Math.max(1, Number(raw.confidence) || 3)),
    planFollowed: Boolean(raw.planFollowed),
    emotionBefore: typeof raw.emotionBefore === "string" ? raw.emotionBefore : "",
    emotionAfter: typeof raw.emotionAfter === "string" ? raw.emotionAfter : "",
    mistakeTag: typeof raw.mistakeTag === "string" ? raw.mistakeTag : "None",
    exitReason: typeof raw.exitReason === "string" ? raw.exitReason : "",
    lessonHtml,
  };
};

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    return false;
  }
};

const isEmbeddedRuntime = () => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};

export default function App() {
  const [meta, setMeta] = useState<JournalMeta>(defaultMeta);
  const [form, setForm] = useState<TradeFormState>({ ...defaultForm, dateTime: getCurrentDateTimeLocal() });
  const [entries, setEntries] = useState<TradeEntry[]>([]);
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState<RequiredFieldKey[]>([]);
  const [exportError, setExportError] = useState("");
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);

  useEffect(() => {
    const savedV3 = localStorage.getItem(STORAGE_KEY);
    const savedLegacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    const saved = savedV3 ?? savedLegacy;
    if (!saved) return;

    const isLegacy = !savedV3 && Boolean(savedLegacy);

    try {
      const parsed = JSON.parse(saved) as any;
      const nextMeta = sanitizeMeta(parsed.meta);

      const nextEntries = Array.isArray(parsed.entries)
        ? parsed.entries.map((entry: any) => normalizeEntry(entry)).filter((entry: any) => entry !== null)
        : [];

      setMeta(nextMeta);
      setEntries(nextEntries);

      if (isLegacy) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ meta: nextMeta, entries: nextEntries }));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ meta, entries }));
  }, [meta, entries]);

  const stats = useMemo(() => {
    const total = entries.length;
    const wins = entries.filter((entry) => entry.pnl > 0).length;
    const losses = entries.filter((entry) => entry.pnl < 0).length;
    const net = entries.reduce((sum, entry) => sum + entry.pnl, 0);
    const grossProfit = entries.filter((entry) => entry.pnl > 0).reduce((sum, entry) => sum + entry.pnl, 0);
    const grossLoss = Math.abs(
      entries.filter((entry) => entry.pnl < 0).reduce((sum, entry) => sum + entry.pnl, 0),
    );
    const avgWin = wins ? grossProfit / wins : 0;
    const avgLoss = losses ? grossLoss / losses : 0;
    const winRate = total === 0 ? 0 : (wins / total) * 100;
    const profitFactor = grossLoss === 0 ? grossProfit : grossProfit / grossLoss;
    const expectancy = total === 0 ? 0 : net / total;
    const avgR = total === 0 ? 0 : entries.reduce((sum, entry) => sum + entry.actualRR, 0) / total;
    const disciplineRate =
      total === 0 ? 0 : (entries.filter((entry) => entry.planFollowed).length / total) * 100;

    return {
      total,
      wins,
      losses,
      net,
      winRate,
      avgWin,
      avgLoss,
      profitFactor,
      expectancy,
      avgR,
      disciplineRate,
    };
  }, [entries]);

  const handleAddTrade = () => {
    setError("");

    const missingRequired = (Object.entries(requiredFieldLabels) as [RequiredFieldKey, string][])
      .filter(([field]) => {
        const value = form[field];
        return typeof value === "string" ? value.trim().length === 0 : !value;
      })
      .map(([field]) => field);

    if (missingRequired.length > 0) {
      setInvalidFields(missingRequired);
      setError(`请补全必填项：${missingRequired.map((field) => requiredFieldLabels[field]).join("、")}。`);
      return;
    }

    setInvalidFields([]);

    const entryPrice = toNumber(form.entry);
    const stopLoss = toNumber(form.stopLoss);
    const target = toNumber(form.target);
    const exitPrice = toNumber(form.exit);
    const size = toNumber(form.size);
    const fees = toNumber(form.fees);

    if (size <= 0) {
      setInvalidFields(["size"]);
      setError("仓位必须大于 0。");
      return;
    }

    const perUnitRisk = Math.abs(entryPrice - stopLoss);
    if (perUnitRisk <= 0) {
      setInvalidFields(["entry", "stopLoss"]);
      setError("止损价不能与进场价相同。");
      return;
    }

    const plannedReward = Math.abs(target - entryPrice);
    const plannedRR = plannedReward / perUnitRisk;
    const signedMove = form.direction === "Long" ? exitPrice - entryPrice : entryPrice - exitPrice;
    const rawPnl = signedMove * size;
    const pnl = Number((rawPnl - fees).toFixed(2));
    const estimatedRiskAmount = Number((perUnitRisk * size).toFixed(2));
    const riskAmountInput = toNumber(form.riskAmount);
    const riskAmount = riskAmountInput > 0 ? riskAmountInput : estimatedRiskAmount;
    const actualRR = riskAmount > 0 ? Number((pnl / riskAmount).toFixed(2)) : 0;
    const confidence = Math.min(5, Math.max(1, Math.round(toNumber(form.confidence) || 3)));
    const isoDateTime = localDateTimeToIso(form.dateTime);
    if (!isoDateTime) {
      setInvalidFields(["dateTime"]);
      setError("请选择日期时间。");
      return;
    }

    const nextEntry: TradeEntry = {
      id: crypto.randomUUID(),
      dateTime: isoDateTime,
      symbol: form.symbol.toUpperCase().trim(),
      market: form.market,
      session: form.session,
      timeframe: form.timeframe.trim() || "-",
      direction: form.direction,
      setup: form.setup.trim(),
      setupQuality: form.setupQuality,
      thesisHtml: form.thesisHtml,
      entry: entryPrice,
      stopLoss,
      target,
      exit: exitPrice,
      size,
      riskAmount,
      fees,
      pnl,
      plannedRR: Number(plannedRR.toFixed(2)),
      actualRR,
      confidence,
      planFollowed: form.planFollowed,
      emotionBefore: form.emotionBefore.trim(),
      emotionAfter: form.emotionAfter.trim(),
      mistakeTag: form.mistakeTag.trim() || "None",
      exitReason: form.exitReason.trim(),
      lessonHtml: form.lessonHtml,
    };

    setEntries((current) => [nextEntry, ...current]);
    setInvalidFields([]);
    setForm({ ...defaultForm, dateTime: getCurrentDateTimeLocal() });
  };

  const handleDeleteTrade = (id: string) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  };

  const exportPdf = async () => {
    if (isExportingPdf) {
      return;
    }

    setExportError("");
    if (entries.length === 0) {
      setExportError("暂无可导出的记录，请先新增至少 1 笔交易。 ");
      return;
    }

    setIsExportingPdf(true);
    try {
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;
      let cursorY = margin;

      const waitForImages = async (container: HTMLElement) => {
        const images = Array.from(container.querySelectorAll("img"));
        await Promise.all(
          images.map(
            (img) =>
              new Promise<void>((resolve) => {
                if ((img as HTMLImageElement).complete) {
                  resolve();
                  return;
                }
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
              }),
          ),
        );
      };

      const renderHtmlToCanvas = async (html: string) => {
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.left = "-99999px";
        container.style.top = "0";
        container.style.width = `${Math.floor(contentWidth)}px`;
        container.style.background = "#ffffff";
        container.style.color = "#111827";
        // 避免依赖 jsPDF 的 TTF 字体解析（某些字体会触发 No unicode cmap 报错），
        // PDF 文本统一走 html2canvas 渲染为图片，浏览器会用系统字体正常渲染中文/emoji。
        container.style.fontFamily =
          '"Microsoft YaHei","PingFang SC","Noto Sans SC",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif';
        container.style.fontSize = "12px";
        container.style.lineHeight = "1.65";
        container.style.padding = "10px 12px";
        container.style.boxSizing = "border-box";
        container.innerHTML = html && html.trim().length ? html : "<p>-</p>";
        container.querySelectorAll("img").forEach((img) => {
          (img as HTMLImageElement).style.maxWidth = "100%";
          (img as HTMLImageElement).style.height = "auto";
          (img as HTMLImageElement).style.display = "block";
          (img as HTMLImageElement).style.margin = "8px 0";
        });
        document.body.appendChild(container);
        await waitForImages(container);
        const canvas = await html2canvas(container, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
        container.remove();
        return canvas;
      };

      const addCanvasWithPagination = (canvas: HTMLCanvasElement) => {
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pxPerPt = canvas.width / imgWidth;

        let remainingPt = imgHeight;
        let sourceY = 0;
        while (remainingPt > 0) {
          const available = pageHeight - margin - cursorY;
          const slicePt = Math.min(available, remainingPt);
          const slicePx = Math.max(1, Math.floor(slicePt * pxPerPt));

          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = slicePx;
          const ctx = sliceCanvas.getContext("2d");
          if (!ctx) break;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
          ctx.drawImage(canvas, 0, sourceY, canvas.width, slicePx, 0, 0, canvas.width, slicePx);

          const dataUrl = sliceCanvas.toDataURL("image/png");
          pdf.addImage(dataUrl, "PNG", margin, cursorY, imgWidth, slicePt);
          cursorY += slicePt + 6;

          remainingPt -= slicePt;
          sourceY += slicePx;

          if (remainingPt > 0) {
            pdf.addPage();
            cursorY = margin;
          }
        }
      };

      const coverHtml = `
        <div style="border:1px solid #e5e7eb;">
          <div style="background:#059669;padding:18px 16px;">
            <div style="color:#fff;font-size:22px;font-weight:700;letter-spacing:0.5px;">交易日志报告</div>
            <div style="color:#dcfce7;font-size:12px;margin-top:6px;">
              ${(meta.traderName || "未命名交易员").replaceAll("<", "&lt;")} · ${(meta.accountName || "未命名账户").replaceAll("<", "&lt;")} · ${meta.reviewCycle}
            </div>
          </div>
          <div style="padding:14px 16px;">
            <table style="width:100%;border-collapse:collapse;font-size:12px;">
              <tbody>
                <tr>
                  <td style="width:18%;border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">交易员</td>
                  <td style="width:32%;border:1px solid #e5e7eb;padding:8px;">${(meta.traderName || "-").replaceAll("<", "&lt;")}</td>
                  <td style="width:18%;border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">账户</td>
                  <td style="width:32%;border:1px solid #e5e7eb;padding:8px;">${(meta.accountName || "-").replaceAll("<", "&lt;")}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">主策略</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${(meta.primaryStrategy || "-").replaceAll("<", "&lt;")}</td>
                  <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">风险模型</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${(meta.riskModel || "-").replaceAll("<", "&lt;")}</td>
                </tr>
                <tr>
                  <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">复盘周期</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${(meta.reviewCycle || "-").replaceAll("<", "&lt;")}</td>
                  <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">导出时间</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${formatDateTime(new Date().toISOString())}</td>
                </tr>
              </tbody>
            </table>
            <div style="height:12px;"></div>
            <table style="width:100%;border-collapse:collapse;font-size:12px;">
              <thead>
                <tr>
                  <th style="border:1px solid #e5e7eb;background:#0f172a;color:#fff;padding:8px;text-align:left;">总笔数</th>
                  <th style="border:1px solid #e5e7eb;background:#0f172a;color:#fff;padding:8px;text-align:left;">胜率</th>
                  <th style="border:1px solid #e5e7eb;background:#0f172a;color:#fff;padding:8px;text-align:left;">净收益</th>
                  <th style="border:1px solid #e5e7eb;background:#0f172a;color:#fff;padding:8px;text-align:left;">PF</th>
                  <th style="border:1px solid #e5e7eb;background:#0f172a;color:#fff;padding:8px;text-align:left;">期望值/笔</th>
                  <th style="border:1px solid #e5e7eb;background:#0f172a;color:#fff;padding:8px;text-align:left;">平均R</th>
                  <th style="border:1px solid #e5e7eb;background:#0f172a;color:#fff;padding:8px;text-align:left;">纪律执行率</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${stats.total}</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${stats.winRate.toFixed(1)}%</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${formatMoney(stats.net)}</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${stats.profitFactor.toFixed(2)}</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${formatMoney(stats.expectancy)}</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${stats.avgR.toFixed(2)}</td>
                  <td style="border:1px solid #e5e7eb;padding:8px;">${stats.disciplineRate.toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
      const coverCanvas = await renderHtmlToCanvas(coverHtml);
      addCanvasWithPagination(coverCanvas);
      pdf.addPage();
      cursorY = margin;

      for (let index = 0; index < entries.length; index += 1) {
        const entry = entries[index];
        const tradeHtml = `
          <div style="border:1px solid #e5e7eb;">
            <div style="background:#0f172a;padding:10px 12px;color:#fff;font-weight:700;">
              交易 #${entries.length - index}  ${entry.symbol} · ${entry.direction} · ${formatDateTime(entry.dateTime)}
            </div>
            <div style="padding:12px;">
              <table style="width:100%;border-collapse:collapse;font-size:12px;">
                <tbody>
                  <tr>
                    <td style="width:18%;border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">市场/时段</td>
                    <td style="width:32%;border:1px solid #e5e7eb;padding:8px;">${entry.market} / ${entry.session}</td>
                    <td style="width:18%;border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">时间框架</td>
                    <td style="width:32%;border:1px solid #e5e7eb;padding:8px;">${(entry.timeframe || "-").replaceAll("<", "&lt;")}</td>
                  </tr>
                  <tr>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">策略形态</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${(entry.setup || "-").replaceAll("<", "&lt;")}</td>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">形态质量</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${entry.setupQuality || "-"}</td>
                  </tr>
                  <tr>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">进场/止损</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${entry.entry} / ${entry.stopLoss}</td>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">止盈/出场</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${entry.target} / ${entry.exit}</td>
                  </tr>
                  <tr>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">仓位/风险</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${entry.size} / ${entry.riskAmount}</td>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">手续费/PnL</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${entry.fees} / ${entry.pnl.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">计划R:R</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${entry.plannedRR.toFixed(2)}</td>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">实际R</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${entry.actualRR.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">执行纪律</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${entry.planFollowed ? "Yes" : "No"}</td>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">信心</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${String(entry.confidence)}</td>
                  </tr>
                  <tr>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">情绪(前→后)</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${(entry.emotionBefore || "-").replaceAll("<", "&lt;")} → ${(entry.emotionAfter || "-").replaceAll("<", "&lt;")}</td>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">偏差标签</td>
                    <td style="border:1px solid #e5e7eb;padding:8px;">${(entry.mistakeTag || "-").replaceAll("<", "&lt;")}</td>
                  </tr>
                  <tr>
                    <td style="border:1px solid #e5e7eb;background:#ecfdf5;padding:8px;font-weight:700;color:#065f46;">出场理由</td>
                    <td colspan="3" style="border:1px solid #e5e7eb;padding:8px;">${(entry.exitReason || "-").replaceAll("<", "&lt;")}</td>
                  </tr>
                </tbody>
              </table>

              <div style="height:14px;"></div>

              <div style="font-weight:800;color:#047857;margin-bottom:6px;">交易逻辑</div>
              <div>${entry.thesisHtml && entry.thesisHtml.trim().length ? entry.thesisHtml : "<p>-</p>"}</div>

              <div style="height:12px;"></div>
              <div style="font-weight:800;color:#047857;margin-bottom:6px;">复盘结论</div>
              <div>${entry.lessonHtml && entry.lessonHtml.trim().length ? entry.lessonHtml : "<p>-</p>"}</div>
            </div>
          </div>
        `;

        const tradeCanvas = await renderHtmlToCanvas(tradeHtml);
        addCanvasWithPagination(tradeCanvas);
        if (index < entries.length - 1) {
          pdf.addPage();
          cursorY = margin;
        }
      }

      // Footer: page numbers
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i += 1) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.setTextColor(100, 116, 139);
        pdf.text(`Trader Journal Pro · ${i}/${pageCount}`, pageWidth - margin, pageHeight - 18, { align: "right" });
      }

      const fileName = `trade-journal-${new Date().toISOString().slice(0, 10)}.pdf`;
      const pdfBlob = pdf.output("blob");
      const didTriggerDownload = downloadBlob(pdfBlob, fileName);
      if (!didTriggerDownload && isEmbeddedRuntime()) {
        setExportError("当前为嵌入页面，浏览器可能拦截自动下载。已尝试打开新标签页，请手动保存文件。");
      }
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "未知错误";
      setExportError(`PDF 导出失败：${message}`);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const exportWord = async () => {
    if (isExportingWord) {
      return;
    }

    setExportError("");
    if (entries.length === 0) {
      setExportError("暂无可导出的记录，请先新增至少 1 笔交易。 ");
      return;
    }

    setIsExportingWord(true);
    try {
      const safeText = (value?: string) => {
        if (!value) {
          return "-";
        }
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : "-";
      };

      const tableBorder = {
        top: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "D1D5DB" },
      };

      const labelCell = (text: string) =>
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: "ECFDF5", color: "auto" },
          borders: tableBorder,
          children: [
            new Paragraph({
              children: [new TextRun({ text, bold: true, color: "065F46" })],
            }),
          ],
        });

      const valueCell = (text: string) =>
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          borders: tableBorder,
          children: [
            new Paragraph({
              children: [new TextRun({ text })],
            }),
          ],
        });

      const summaryTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              labelCell("交易员"),
              valueCell(safeText(meta.traderName)),
              labelCell("账户"),
              valueCell(safeText(meta.accountName)),
            ],
          }),
          new TableRow({
            children: [
              labelCell("主策略"),
              valueCell(safeText(meta.primaryStrategy)),
              labelCell("复盘周期"),
              valueCell(safeText(meta.reviewCycle)),
            ],
          }),
          new TableRow({
            children: [
              labelCell("风险模型"),
              new TableCell({
                columnSpan: 3,
                borders: tableBorder,
                children: [new Paragraph(safeText(meta.riskModel))],
              }),
            ],
          }),
        ],
      });

      const metricTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              labelCell("总笔数"),
              valueCell(String(stats.total)),
              labelCell("胜率"),
              valueCell(`${stats.winRate.toFixed(1)}%`),
            ],
          }),
          new TableRow({
            children: [
              labelCell("净收益"),
              valueCell(stats.net.toFixed(2)),
              labelCell("Profit Factor"),
              valueCell(stats.profitFactor.toFixed(2)),
            ],
          }),
          new TableRow({
            children: [
              labelCell("期望值/笔"),
              valueCell(stats.expectancy.toFixed(2)),
              labelCell("平均R"),
              valueCell(stats.avgR.toFixed(2)),
            ],
          }),
          new TableRow({
            children: [
              labelCell("纪律执行率"),
              valueCell(`${stats.disciplineRate.toFixed(1)}%`),
              labelCell("导出时间"),
              valueCell(formatDateTime(new Date().toISOString())),
            ],
          }),
        ],
      });

      const tradeBlocks: Paragraph[] | any[] = [];
      for (let index = 0; index < entries.length; index += 1) {
        const entry = entries[index];
        const tradeTable = new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  columnSpan: 4,
                  shading: { type: ShadingType.CLEAR, fill: "0F172A", color: "auto" },
                  borders: tableBorder,
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `交易 #${entries.length - index}  ${entry.symbol} · ${entry.direction} · ${formatDateTime(entry.dateTime)}`,
                          bold: true,
                          color: "FFFFFF",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                labelCell("市场"),
                valueCell(entry.market),
                labelCell("交易时段"),
                valueCell(entry.session),
              ],
            }),
            new TableRow({
              children: [
                labelCell("时间框架"),
                valueCell(safeText(entry.timeframe)),
                labelCell("策略形态"),
                valueCell(safeText(entry.setup)),
              ],
            }),
            new TableRow({
              children: [
                labelCell("形态质量"),
                valueCell(safeText(entry.setupQuality)),
                labelCell("偏差标签"),
                valueCell(safeText(entry.mistakeTag)),
              ],
            }),
            new TableRow({
              children: [
                labelCell("进场 / 止损"),
                valueCell(`${entry.entry} / ${entry.stopLoss}`),
                labelCell("止盈 / 出场"),
                valueCell(`${entry.target} / ${entry.exit}`),
              ],
            }),
            new TableRow({
              children: [
                labelCell("仓位 / 风险"),
                valueCell(`${entry.size} / ${entry.riskAmount}`),
                labelCell("手续费 / PnL"),
                valueCell(`${entry.fees} / ${entry.pnl.toFixed(2)}`),
              ],
            }),
            new TableRow({
              children: [
                labelCell("计划R:R"),
                valueCell(entry.plannedRR.toFixed(2)),
                labelCell("实际R"),
                valueCell(entry.actualRR.toFixed(2)),
              ],
            }),
            new TableRow({
              children: [
                labelCell("执行纪律"),
                valueCell(entry.planFollowed ? "Yes" : "No"),
                labelCell("执行信心"),
                valueCell(String(entry.confidence)),
              ],
            }),
            new TableRow({
              children: [
                labelCell("情绪(前/后)"),
                valueCell(`${safeText(entry.emotionBefore)} / ${safeText(entry.emotionAfter)}`),
                labelCell("出场理由"),
                valueCell(safeText(entry.exitReason)),
              ],
            }),
          ],
        });

        tradeBlocks.push(tradeTable);

        tradeBlocks.push(
          new Paragraph({
            spacing: { before: 160, after: 70 },
            children: [new TextRun({ text: "交易逻辑", bold: true, color: "047857" })],
          }),
        );
        tradeBlocks.push(...(await htmlToDocxBlocks(entry.thesisHtml)));

        tradeBlocks.push(
          new Paragraph({
            spacing: { before: 120, after: 70 },
            children: [new TextRun({ text: "复盘结论", bold: true, color: "047857" })],
          }),
        );
        tradeBlocks.push(...(await htmlToDocxBlocks(entry.lessonHtml)));

        tradeBlocks.push(
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "E2E8F0" } },
            spacing: { before: 140, after: 260 },
          }),
        );
      }

      const doc = new Document({
        creator: "Trader Journal Pro",
        title: "交易日志报告",
        description: "交易日志导出 Word 报告",
        numbering: {
          config: [
            {
              reference: "rt-numbering",
              levels: [
                {
                  level: 0,
                  format: LevelFormat.DECIMAL,
                  text: "%1.",
                  alignment: AlignmentType.LEFT,
                },
              ],
            },
          ],
        },
        styles: {
          default: {
            document: {
              run: {
                font: "Microsoft YaHei",
                size: 22,
                color: "111827",
              },
              paragraph: {
                spacing: { after: 120 },
              },
            },
          },
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 900,
                  right: 900,
                  bottom: 900,
                  left: 900,
                },
              },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "交易日志报告",
                    bold: true,
                    size: 40,
                    color: "047857",
                  }),
                ],
                spacing: { after: 120 },
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "Trading Journal Pro", color: "64748B", italics: true })],
                spacing: { after: 240 },
              }),
              new Paragraph({
                text: "账户信息",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 100, after: 100 },
              }),
              summaryTable,
              new Paragraph({
                text: "统计概览",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 100 },
              }),
              metricTable,
              new Paragraph({
                text: "交易明细",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 240, after: 100 },
              }),
              ...tradeBlocks,
            ],
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({ text: "Trader Journal Pro · ", color: "64748B" }),
                      PageNumber.CURRENT,
                      new TextRun({ text: "/", color: "64748B" }),
                      PageNumber.TOTAL_PAGES,
                    ],
                  }),
                ],
              }),
            },
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const didTriggerDownload = downloadBlob(blob, `trade-journal-${new Date().toISOString().slice(0, 10)}.docx`);
      if (!didTriggerDownload && isEmbeddedRuntime()) {
        setExportError("当前为嵌入页面，浏览器可能拦截自动下载。已尝试打开新标签页，请手动保存文件。");
      }
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "未知错误";
      setExportError(`Word 导出失败：${message}`);
    } finally {
      setIsExportingWord(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050a08] text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <section className="animate-fade-in border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-[#0b1511] to-[#060b09] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300/80">Trader Journal Pro</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">交易日志模板</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            面向专业交易复盘，覆盖执行质量、风险收益、纪律偏差、情绪与复盘结论，支持本地导出 PDF / Word。
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <button
              type="button"
              onClick={exportPdf}
              className="border border-emerald-400 bg-emerald-400 px-4 py-2 font-medium text-[#04210f] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isExportingPdf}
            >
              {isExportingPdf ? "Exporting PDF..." : "导出 PDF"}
            </button>
            <button
              type="button"
              onClick={exportWord}
              className="border border-emerald-400/60 px-4 py-2 text-emerald-200 transition hover:border-emerald-300 hover:text-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isExportingWord}
            >
              {isExportingWord ? "Exporting Word..." : "导出 Word"}
            </button>
          </div>
          {isEmbeddedRuntime() && (
            <p className="mt-3 text-xs text-amber-300/90">
              当前页面在 iframe 中运行，部分浏览器会拦截自动下载。若导出未弹出下载，请在新标签页打开后保存。
            </p>
          )}
          {exportError && <p className="mt-3 text-sm text-rose-400">{exportError}</p>}
        </section>

        <section className="animate-slide-up grid gap-6 border border-white/10 bg-[#080f0c] p-6 md:grid-cols-5">
          <label className="space-y-2 text-sm">
            <span className="text-slate-300">交易员</span>
            <input
              value={meta.traderName}
              onChange={(event) => setMeta((current) => ({ ...current, traderName: event.target.value }))}
              className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
              placeholder="Name"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-slate-300">账户名称</span>
            <input
              value={meta.accountName}
              onChange={(event) => setMeta((current) => ({ ...current, accountName: event.target.value }))}
              className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
              placeholder="Account"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-slate-300">主策略</span>
            <input
              value={meta.primaryStrategy}
              onChange={(event) => setMeta((current) => ({ ...current, primaryStrategy: event.target.value }))}
              className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
              placeholder="Breakout / Mean Reversion"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-slate-300">复盘周期</span>
            <select
              value={meta.reviewCycle}
              onChange={(event) => setMeta((current) => ({ ...current, reviewCycle: event.target.value }))}
              className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-slate-300">风险模型</span>
            <input
              value={meta.riskModel}
              onChange={(event) => setMeta((current) => ({ ...current, riskModel: event.target.value }))}
              className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
              placeholder="例如：每笔 0.5% 风险"
            />
          </label>
        </section>

        <section className="animate-fade-in border border-white/10 bg-[#080f0c] p-6">
          <h2 className="text-lg font-semibold text-white">新增交易记录</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-slate-300">日期时间</span>
              <input
                type="datetime-local"
                value={form.dateTime}
                onChange={(event) => {
                  setForm((current) => ({ ...current, dateTime: event.target.value }));
                  setInvalidFields((current) => current.filter((field) => field !== "dateTime"));
                }}
                className={`w-full border bg-[#050a08] px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                  invalidFields.includes("dateTime")
                    ? "border-rose-500/70 ring-rose-500"
                    : "border-white/10 ring-emerald-400"
                }`}
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">品种</span>
              <input
                value={form.symbol}
                onChange={(event) => {
                  setForm((current) => ({ ...current, symbol: event.target.value }));
                  setInvalidFields((current) => current.filter((field) => field !== "symbol"));
                }}
                className={`w-full border bg-[#050a08] px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                  invalidFields.includes("symbol")
                    ? "border-rose-500/70 ring-rose-500"
                    : "border-white/10 ring-emerald-400"
                }`}
                placeholder="BTCUSDT / AAPL"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">市场</span>
              <select
                value={form.market}
                onChange={(event) => setForm((current) => ({ ...current, market: event.target.value as MarketType }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
              >
                <option value="Crypto">Crypto</option>
                <option value="Forex">Forex</option>
                <option value="Stocks">Stocks</option>
                <option value="Futures">Futures</option>
                <option value="Options">Options</option>
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">交易时段</span>
              <select
                value={form.session}
                onChange={(event) => setForm((current) => ({ ...current, session: event.target.value as SessionType }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
              >
                <option value="Asia">Asia</option>
                <option value="London">London</option>
                <option value="New York">New York</option>
                <option value="Overlap">Overlap</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">方向</span>
              <select
                value={form.direction}
                onChange={(event) =>
                  setForm((current) => ({ ...current, direction: event.target.value as TradeDirection }))
                }
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
              >
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">时间框架</span>
              <input
                value={form.timeframe}
                onChange={(event) => setForm((current) => ({ ...current, timeframe: event.target.value }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
                placeholder="5m / 15m / 1h / 1D"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-slate-300">策略形态</span>
              <input
                value={form.setup}
                onChange={(event) => {
                  setForm((current) => ({ ...current, setup: event.target.value }));
                  setInvalidFields((current) => current.filter((field) => field !== "setup"));
                }}
                className={`w-full border bg-[#050a08] px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                  invalidFields.includes("setup")
                    ? "border-rose-500/70 ring-rose-500"
                    : "border-white/10 ring-emerald-400"
                }`}
                placeholder="Breakout Pullback / Liquidity Sweep"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">形态质量</span>
              <select
                value={form.setupQuality}
                onChange={(event) =>
                  setForm((current) => ({ ...current, setupQuality: event.target.value as SetupQuality }))
                }
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
              >
                <option value="A">A（最佳执行/信号清晰）</option>
                <option value="B">B（可交易）</option>
                <option value="C">C（勉强/有瑕疵）</option>
                <option value="D">D（不该交易）</option>
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">进场价</span>
              <input
                type="number"
                value={form.entry}
                onChange={(event) => {
                  setForm((current) => ({ ...current, entry: event.target.value }));
                  setInvalidFields((current) => current.filter((field) => field !== "entry"));
                }}
                className={`w-full border bg-[#050a08] px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                  invalidFields.includes("entry")
                    ? "border-rose-500/70 ring-rose-500"
                    : "border-white/10 ring-emerald-400"
                }`}
                placeholder="0.00"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">止损价</span>
              <input
                type="number"
                value={form.stopLoss}
                onChange={(event) => {
                  setForm((current) => ({ ...current, stopLoss: event.target.value }));
                  setInvalidFields((current) => current.filter((field) => field !== "stopLoss"));
                }}
                className={`w-full border bg-[#050a08] px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                  invalidFields.includes("stopLoss")
                    ? "border-rose-500/70 ring-rose-500"
                    : "border-white/10 ring-emerald-400"
                }`}
                placeholder="0.00"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">止盈价</span>
              <input
                type="number"
                value={form.target}
                onChange={(event) => {
                  setForm((current) => ({ ...current, target: event.target.value }));
                  setInvalidFields((current) => current.filter((field) => field !== "target"));
                }}
                className={`w-full border bg-[#050a08] px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                  invalidFields.includes("target")
                    ? "border-rose-500/70 ring-rose-500"
                    : "border-white/10 ring-emerald-400"
                }`}
                placeholder="0.00"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">出场价</span>
              <input
                type="number"
                value={form.exit}
                onChange={(event) => {
                  setForm((current) => ({ ...current, exit: event.target.value }));
                  setInvalidFields((current) => current.filter((field) => field !== "exit"));
                }}
                className={`w-full border bg-[#050a08] px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                  invalidFields.includes("exit")
                    ? "border-rose-500/70 ring-rose-500"
                    : "border-white/10 ring-emerald-400"
                }`}
                placeholder="0.00"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">仓位</span>
              <input
                type="number"
                value={form.size}
                onChange={(event) => {
                  setForm((current) => ({ ...current, size: event.target.value }));
                  setInvalidFields((current) => current.filter((field) => field !== "size"));
                }}
                className={`w-full border bg-[#050a08] px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                  invalidFields.includes("size")
                    ? "border-rose-500/70 ring-rose-500"
                    : "border-white/10 ring-emerald-400"
                }`}
                placeholder="1"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">风险金额 (可选)</span>
              <input
                type="number"
                value={form.riskAmount}
                onChange={(event) => setForm((current) => ({ ...current, riskAmount: event.target.value }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
                placeholder="不填则自动按 SL 估算"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">手续费 / 滑点</span>
              <input
                type="number"
                value={form.fees}
                onChange={(event) => setForm((current) => ({ ...current, fees: event.target.value }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
                placeholder="0"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">执行信心 (1-5)</span>
              <input
                type="number"
                min={1}
                max={5}
                value={form.confidence}
                onChange={(event) => setForm((current) => ({ ...current, confidence: event.target.value }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">交易前情绪</span>
              <input
                value={form.emotionBefore}
                onChange={(event) => setForm((current) => ({ ...current, emotionBefore: event.target.value }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
                placeholder="Calm / Anxious"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-slate-300">交易后情绪</span>
              <input
                value={form.emotionAfter}
                onChange={(event) => setForm((current) => ({ ...current, emotionAfter: event.target.value }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
                placeholder="Neutral / Frustrated"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-slate-300">执行偏差标签</span>
              <input
                value={form.mistakeTag}
                onChange={(event) => setForm((current) => ({ ...current, mistakeTag: event.target.value }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
                placeholder="None / Early Entry / Moved SL / Overtrading"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-slate-300">出场理由 / 管理要点（可选）</span>
              <input
                value={form.exitReason}
                onChange={(event) => setForm((current) => ({ ...current, exitReason: event.target.value }))}
                className="w-full border border-white/10 bg-[#050a08] px-3 py-2 text-sm outline-none ring-emerald-400 transition focus:ring-1"
                placeholder="例如：触达计划 TP；或结构破坏提前离场；或移动止损被扫。"
              />
            </label>
            <label className="flex items-center gap-2 pt-8 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.planFollowed}
                onChange={(event) => setForm((current) => ({ ...current, planFollowed: event.target.checked }))}
                className="h-4 w-4 accent-emerald-400"
              />
              本笔是否严格按计划执行
            </label>
          </div>

          <label className="mt-4 block space-y-2 text-sm">
            <span className="text-slate-300">交易逻辑（入场依据）</span>
            <RichTextEditor
              value={form.thesisHtml}
              onChange={(html) => setForm((current) => ({ ...current, thesisHtml: html }))}
              placeholder="例如：日线突破后回踩 15m 结构确认，量能放大。支持插入图片与 emoji。"
            />
          </label>

          <label className="mt-4 block space-y-2 text-sm">
            <span className="text-slate-300">复盘结论（可执行改进）</span>
            <RichTextEditor
              value={form.lessonHtml}
              onChange={(html) => setForm((current) => ({ ...current, lessonHtml: html }))}
              placeholder="例如：盈利单可以分批止盈；亏损单严格执行初始止损；不提前加仓。支持插入图片与 emoji。"
            />
          </label>

          {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}

          <button
            type="button"
            onClick={handleAddTrade}
            className="mt-5 border border-emerald-400 bg-emerald-400 px-4 py-2 text-sm font-medium text-[#04210f] transition hover:bg-emerald-300"
          >
            添加记录
          </button>
        </section>

        <section className="animate-slide-up border border-white/10 bg-[#080f0c] p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-lg font-semibold text-white">交易明细与关键指标</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              <p>
                总笔数 <span className="ml-1 text-emerald-300">{stats.total}</span>
              </p>
              <p>
                胜率 <span className="ml-1 text-emerald-300">{stats.winRate.toFixed(1)}%</span>
              </p>
              <p>
                净收益
                <span className={`ml-1 ${stats.net >= 0 ? "text-emerald-300" : "text-rose-400"}`}>
                  {stats.net.toFixed(2)}
                </span>
              </p>
              <p>
                盈亏比 (PF) <span className="ml-1 text-emerald-300">{stats.profitFactor.toFixed(2)}</span>
              </p>
              <p>
                期望值/笔 <span className="ml-1 text-emerald-300">{stats.expectancy.toFixed(2)}</span>
              </p>
              <p>
                平均R <span className="ml-1 text-emerald-300">{stats.avgR.toFixed(2)}</span>
              </p>
              <p>
                纪律执行率 <span className="ml-1 text-emerald-300">{stats.disciplineRate.toFixed(1)}%</span>
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[1950px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-2 py-3">DateTime</th>
                  <th className="px-2 py-3">Symbol</th>
                  <th className="px-2 py-3">Market</th>
                  <th className="px-2 py-3">Session</th>
                  <th className="px-2 py-3">Direction</th>
                  <th className="px-2 py-3">Setup</th>
                  <th className="px-2 py-3">Setup Q</th>
                  <th className="px-2 py-3">TF</th>
                  <th className="px-2 py-3">Entry</th>
                  <th className="px-2 py-3">SL</th>
                  <th className="px-2 py-3">TP</th>
                  <th className="px-2 py-3">Exit</th>
                  <th className="px-2 py-3">Size</th>
                  <th className="px-2 py-3">Risk</th>
                  <th className="px-2 py-3">Fee</th>
                  <th className="px-2 py-3">PnL</th>
                  <th className="px-2 py-3">Plan R:R</th>
                  <th className="px-2 py-3">Actual R</th>
                  <th className="px-2 py-3">Conf</th>
                  <th className="px-2 py-3">Discipline</th>
                  <th className="px-2 py-3">Emotion B/A</th>
                  <th className="px-2 py-3">Mistake</th>
                  <th className="px-2 py-3">Exit Note</th>
                  <th className="px-2 py-3">Logic</th>
                  <th className="px-2 py-3">Lesson</th>
                  <th className="px-2 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="animate-fade-in border-b border-white/5 text-slate-200">
                    <td className="px-2 py-3">{formatDateTime(entry.dateTime)}</td>
                    <td className="px-2 py-3 font-medium text-white">{entry.symbol}</td>
                    <td className="px-2 py-3">{entry.market}</td>
                    <td className="px-2 py-3">{entry.session}</td>
                    <td className="px-2 py-3">{entry.direction}</td>
                    <td className="px-2 py-3">{entry.setup}</td>
                    <td className="px-2 py-3">{entry.setupQuality}</td>
                    <td className="px-2 py-3">{entry.timeframe}</td>
                    <td className="px-2 py-3">{entry.entry}</td>
                    <td className="px-2 py-3">{entry.stopLoss}</td>
                    <td className="px-2 py-3">{entry.target}</td>
                    <td className="px-2 py-3">{entry.exit}</td>
                    <td className="px-2 py-3">{entry.size}</td>
                    <td className="px-2 py-3">{entry.riskAmount}</td>
                    <td className="px-2 py-3">{entry.fees}</td>
                    <td className={`px-2 py-3 font-medium ${entry.pnl >= 0 ? "text-emerald-300" : "text-rose-400"}`}>
                      {entry.pnl.toFixed(2)}
                    </td>
                    <td className="px-2 py-3">{entry.plannedRR.toFixed(2)}</td>
                    <td className={`px-2 py-3 ${entry.actualRR >= 0 ? "text-emerald-300" : "text-rose-400"}`}>
                      {entry.actualRR.toFixed(2)}
                    </td>
                    <td className="px-2 py-3">{entry.confidence}</td>
                    <td className="px-2 py-3">{entry.planFollowed ? "Yes" : "No"}</td>
                    <td className="px-2 py-3">{`${entry.emotionBefore || "-"}/${entry.emotionAfter || "-"}`}</td>
                    <td className="px-2 py-3">{entry.mistakeTag || "-"}</td>
                    <td className="max-w-52 truncate px-2 py-3 text-slate-300">{entry.exitReason || "-"}</td>
                    <td className="max-w-60 truncate px-2 py-3 text-slate-300">{stripHtml(entry.thesisHtml) || "-"}</td>
                    <td className="max-w-60 truncate px-2 py-3 text-slate-300">{stripHtml(entry.lessonHtml) || "-"}</td>
                    <td className="px-2 py-3">
                      <button
                        type="button"
                        onClick={() => handleDeleteTrade(entry.id)}
                        className="text-xs text-slate-400 transition hover:text-rose-300"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={26} className="px-2 py-6 text-center text-sm text-slate-400">
                      暂无交易记录，先添加一笔开始复盘。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}
