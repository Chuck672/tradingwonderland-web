import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";
import type { ChecklistMode, ChecklistTemplate } from "../data/checklists";
import type { ChecklistState } from "./storage";
import { downloadBlob } from "./download";

type ExportPdfOptions = {
  mode: ChecklistMode;
  template: ChecklistTemplate;
  checked: ChecklistState;
  fileName: string;
};

type CheckboxRect = {
  id: string;
  pageIndex: number;
  x: number;
  y: number;
  size: number;
  checked: boolean;
};

const A4_WIDTH_PT = 595;
const A4_HEIGHT_PT = 842;
const EXPORT_WIDTH_PX = 595; // keep 1px ~= 1pt mapping
const EXPORT_HEIGHT_PX = 842;

const escapeText = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const tick = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

function createPageDom(template: ChecklistTemplate, pageNo: number, total: number) {
  const pageOuter = document.createElement("div");
  pageOuter.className = "export-a4";

  const page = document.createElement("div");
  page.className = "export-page";
  page.style.height = `${EXPORT_HEIGHT_PX}px`;
  page.style.overflow = "hidden";
  page.style.display = "flex";
  page.style.flexDirection = "column";

  const header = document.createElement("div");
  header.innerHTML = `
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:10px;">
      <div style="max-width:360px;">
        <div style="font-size:18px;font-weight:900;color:#047857;">交易前 Checklist</div>
        <div style="margin-top:4px;color:#64748b;font-size:11px;white-space:normal;word-break:break-word;">
          ${escapeText(template.title)} · ${escapeText(template.subtitle)}
        </div>
      </div>
      <div style="text-align:right;color:#64748b;font-size:11px;">
        <div style="display:grid;grid-template-columns:auto 120px;row-gap:6px;column-gap:8px;align-items:center;justify-content:end;">
          <div>日期：</div>
          <div style="border-bottom:1px solid #94a3b8;height:14px;"></div>
          <div>品种：</div>
          <div style="border-bottom:1px solid #94a3b8;height:14px;"></div>
          <div>策略：</div>
          <div style="border-bottom:1px solid #94a3b8;height:14px;"></div>
        </div>
      </div>
    </div>
  `;

  const body = document.createElement("div");
  body.style.marginTop = "12px";
  body.style.borderTop = "1px solid #e2e8f0";
  body.style.paddingTop = "12px";
  body.style.flex = "1 1 auto";
  body.style.overflow = "hidden";

  const footer = document.createElement("div");
  footer.style.marginTop = "auto";
  footer.style.paddingTop = "10px";
  footer.style.color = "#94a3b8";
  footer.style.fontSize = "10px";
  footer.style.display = "flex";
  footer.style.justifyContent = "space-between";
  footer.innerHTML = `<span>Trader Checklist</span><span>第 ${pageNo}/${total} 页 · （PDF 中复选框可直接勾选）</span>`;

  page.appendChild(header);
  page.appendChild(body);
  page.appendChild(footer);
  pageOuter.appendChild(page);

  return { pageOuter, page, body };
}

function createSectionHeaderDom(title: string, hint?: string) {
  const wrap = document.createElement("div");
  wrap.style.marginTop = "14px";
  wrap.innerHTML = `
    <div style="font-weight:800;color:#047857;font-size:13px;">${escapeText(title)}</div>
    ${hint ? `<div style="margin-top:4px;color:#64748b;font-size:11px;">${escapeText(hint)}</div>` : ""}
  `;
  return wrap;
}

function createItemsContainerDom() {
  const box = document.createElement("div");
  box.style.marginTop = "8px";
  box.style.border = "1px solid #e2e8f0";
  box.style.padding = "10px 12px";
  return box;
}

function createItemDom(args: { id: string; label: string; desc?: string; kill?: boolean; checked: boolean }) {
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.gap = "10px";
  row.style.alignItems = "flex-start";
  row.style.padding = "6px 0";
  row.style.borderBottom = "1px solid #f1f5f9";

  const cb = document.createElement("span");
  cb.className = `export-checkbox ${args.checked ? "checked" : ""}`;
  cb.dataset.exportCheckbox = args.id;
  cb.textContent = args.checked ? "✓" : "";
  row.appendChild(cb);

  const text = document.createElement("div");
  text.style.flex = "1";
  const kill = args.kill ? `<span style="color:#be123c;font-weight:700;margin-left:6px;">否决项</span>` : "";
  const desc = args.desc ? `<div style="font-size:11px;margin-top:2px;color:#64748b;">（${escapeText(args.desc)}）</div>` : "";
  text.innerHTML = `<div style="font-size:12px;color:#0f172a;">${escapeText(args.label)}${kill}</div>${desc}`;
  row.appendChild(text);

  return row;
}

export async function exportChecklistPdf({ template, checked, fileName }: ExportPdfOptions) {
  const mount = document.createElement("div");
  mount.style.position = "fixed";
  mount.style.left = "-99999px";
  mount.style.top = "0";
  mount.style.width = `${EXPORT_WIDTH_PX}px`;
  mount.style.background = "#ffffff";
  document.body.appendChild(mount);

  try {
    // First pass: paginate by measuring DOM overflow.
    const tempPages: ReturnType<typeof createPageDom>[] = [];
    const newTempPage = () => {
      const pageDom = createPageDom(template, 1, 1);
      mount.appendChild(pageDom.pageOuter);
      tempPages.push(pageDom);
      return pageDom;
    };

    let current = newTempPage();

    for (const section of template.sections) {
      const header = createSectionHeaderDom(section.title, section.hint);
      current.body.appendChild(header);
      current.body.appendChild(createItemsContainerDom());
      await tick();

      // If even header overflows (rare), push to next page.
      if (current.body.scrollHeight > current.body.clientHeight) {
        current.body.removeChild(header);
        current.body.removeChild(current.body.lastElementChild!);
        current = newTempPage();
        current.body.appendChild(header);
        current.body.appendChild(createItemsContainerDom());
        await tick();
      }

      let box = current.body.lastElementChild as HTMLElement;

      for (const item of section.items) {
        const itemEl = createItemDom({
          id: item.id,
          label: item.label,
          desc: item.desc,
          kill: item.kill,
          checked: Boolean(checked[item.id]),
        });
        box.appendChild(itemEl);
        await tick();

        if (current.body.scrollHeight > current.body.clientHeight) {
          // move item to next page
          box.removeChild(itemEl);

          current = newTempPage();
          const header2 = createSectionHeaderDom(section.title, section.hint);
          current.body.appendChild(header2);
          const box2 = createItemsContainerDom();
          current.body.appendChild(box2);
          box = box2;
          box.appendChild(itemEl);
          await tick();
        }
      }
    }

    // Second pass: set real page numbers in footers.
    const totalPages = tempPages.length;
    tempPages.forEach((p, idx) => {
      const footer = p.page.lastElementChild as HTMLElement;
      footer.innerHTML = `<span>Trader Checklist</span><span>第 ${idx + 1}/${totalPages} 页 · （PDF 中复选框可直接勾选）</span>`;
    });

    const pdfDoc = await PDFDocument.create();
    const form = pdfDoc.getForm();
    const fieldCache = new Map<string, ReturnType<typeof form.createCheckBox>>();

    const scalePt = A4_WIDTH_PT / EXPORT_WIDTH_PX;

    // Render page by page to avoid huge canvas & slicing artifacts.
    for (let i = 0; i < tempPages.length; i += 1) {
      const { pageOuter, page } = tempPages[i];
      const checkboxes = Array.from(pageOuter.querySelectorAll("[data-export-checkbox]")) as HTMLElement[];
      const pageRect = page.getBoundingClientRect();

      const checkboxRects: CheckboxRect[] = checkboxes.map((el) => {
        const id = el.getAttribute("data-export-checkbox") || "";
        const rect = el.getBoundingClientRect();
        const xPx = rect.left - pageRect.left;
        const yPx = rect.top - pageRect.top;
        const sizePx = rect.width;
        const isChecked = el.classList.contains("checked");
        return {
          id,
          pageIndex: i,
          x: xPx * scalePt,
          y: A4_HEIGHT_PT - (yPx + rect.height) * scalePt,
          size: sizePx * scalePt,
          checked: isChecked,
        };
      });

      const canvas = await html2canvas(page, { backgroundColor: "#ffffff", scale: 2, useCORS: true });
      const pngDataUrl = canvas.toDataURL("image/png");
      const pngBytes = await fetch(pngDataUrl).then((r) => r.arrayBuffer());
      const png = await pdfDoc.embedPng(pngBytes);

      const pdfPage = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);
      pdfPage.drawImage(png, { x: 0, y: 0, width: A4_WIDTH_PT, height: A4_HEIGHT_PT });

      checkboxRects.forEach((c) => {
        const fieldName = `cb_${c.id}`;
        const cb = fieldCache.get(fieldName) ?? form.createCheckBox(fieldName);
        fieldCache.set(fieldName, cb);
        if (c.checked) cb.check();
        cb.addToPage(pdfPage, { x: c.x, y: c.y, width: c.size, height: c.size });
      });
    }

    const pdfBytes = await pdfDoc.save();
    const ab = pdfBytes.buffer as ArrayBuffer;
    const buffer = ab.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength);
    downloadBlob(new Blob([buffer as BlobPart], { type: "application/pdf" }), fileName);
  } finally {
    mount.remove();
  }
}
