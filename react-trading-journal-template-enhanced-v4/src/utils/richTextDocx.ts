import {
  AlignmentType,
  HeadingLevel,
  ImageRun,
  Paragraph,
  TextRun,
  UnderlineType,
} from "docx";

export const stripHtml = (html: string) => {
  if (!html) return "";
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const isDataUrl = (value: string) => value.startsWith("data:");

type DocxImageType = "png" | "jpg" | "jpeg" | "gif" | "bmp" | "svg";

const mimeToDocxType = (mime?: string | null): DocxImageType => {
  const m = (mime || "").toLowerCase().trim();
  if (m === "image/png") return "png";
  if (m === "image/jpeg") return "jpg";
  if (m === "image/jpg") return "jpg";
  if (m === "image/gif") return "gif";
  if (m === "image/bmp") return "bmp";
  if (m === "image/svg+xml") return "svg";
  // Our editor insertion path outputs png or jpeg; fallback to png to avoid .undefined extensions in docx.
  return "png";
};

const parseDataUrl = (dataUrl: string): { mime: string; base64: string } => {
  // data:[<mime>][;base64],<data>
  const match = /^data:([^;,]+)?(;base64)?,(.*)$/i.exec(dataUrl);
  if (!match) {
    return { mime: "image/png", base64: "" };
  }
  return { mime: match[1] || "image/png", base64: match[3] || "" };
};

const dataUrlToUint8Array = (dataUrl: string) => {
  const [, base64] = dataUrl.split(",", 2);
  const binary = atob(base64 || "");
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const fetchToImageData = async (url: string) => {
  const res = await fetch(url, { mode: "cors" });
  if (!res.ok) {
    throw new Error(`图片获取失败: ${res.status}`);
  }
  const mime = res.headers.get("content-type") || "image/png";
  const buffer = await res.arrayBuffer();
  return { bytes: new Uint8Array(buffer), type: mimeToDocxType(mime) as DocxImageType };
};

async function getImageData(src: string): Promise<{ bytes: Uint8Array; type: DocxImageType }> {
  if (isDataUrl(src)) {
    const parsed = parseDataUrl(src);
    return { bytes: dataUrlToUint8Array(src), type: mimeToDocxType(parsed.mime) };
  }
  return fetchToImageData(src);
}

async function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth || 1, height: img.naturalHeight || 1 });
    img.onerror = () => reject(new Error("图片尺寸读取失败"));
    img.src = src;
  });
}

type InlineRun = {
  text: string;
  bold?: boolean;
  italics?: boolean;
  underline?: boolean;
  strike?: boolean;
};

const flattenInline = (node: Node, style: Omit<InlineRun, "text"> = {}): InlineRun[] => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = (node.textContent ?? "").replace(/\s+/g, " ");
    return text.trim().length ? [{ text, ...style }] : [];
  }

  if (!(node instanceof HTMLElement)) {
    return [];
  }

  const tag = node.tagName.toLowerCase();
  if (tag === "br") {
    return [{ text: "\n", ...style }];
  }

  const nextStyle = { ...style };
  if (tag === "strong" || tag === "b") nextStyle.bold = true;
  if (tag === "em" || tag === "i") nextStyle.italics = true;
  if (tag === "u") nextStyle.underline = true;
  if (tag === "s" || tag === "del") nextStyle.strike = true;

  const result: InlineRun[] = [];
  node.childNodes.forEach((child) => {
    result.push(...flattenInline(child, nextStyle));
  });
  return result;
};

const inlineRunsToTextRuns = (runs: InlineRun[]) => {
  const merged: InlineRun[] = [];
  for (const run of runs) {
    const last = merged[merged.length - 1];
    if (
      last &&
      last.bold === run.bold &&
      last.italics === run.italics &&
      last.underline === run.underline &&
      last.strike === run.strike
    ) {
      last.text += run.text;
      continue;
    }
    merged.push({ ...run });
  }

  const docRuns: TextRun[] = [];
  for (const run of merged) {
    // Convert explicit newlines to breaks.
    const parts = run.text.split("\n");
    parts.forEach((part, idx) => {
      const common = {
        bold: run.bold,
        italics: run.italics,
        underline: run.underline ? { type: UnderlineType.SINGLE } : undefined,
        strike: run.strike,
      };

      if (idx > 0 && part.length === 0) {
        // Pure line break. Avoid generating an underline tag without value or empty text nodes.
        docRuns.push(new TextRun({ ...common, break: 1 }));
        return;
      }

      docRuns.push(
        new TextRun({
          text: part,
          ...common,
          break: idx === 0 ? undefined : 1,
        }),
      );
    });
  }
  return docRuns.length ? docRuns : [new TextRun("")];
};

export async function htmlToDocxBlocks(html: string, opts?: { maxImageWidth?: number }) {
  const maxImageWidth = opts?.maxImageWidth ?? 520;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html || "<p></p>", "text/html");

  const blocks: Paragraph[] = [];

  const addParagraphFromElement = (el: HTMLElement, paragraphOpts?: Partial<Paragraph>) => {
    const runs = flattenInline(el);
    blocks.push(
      new Paragraph({
        ...paragraphOpts,
        children: inlineRunsToTextRuns(runs),
      }),
    );
  };

  const addList = (el: HTMLElement, ordered: boolean) => {
    const items = Array.from(el.querySelectorAll(":scope > li"));
    items.forEach((li) => {
      addParagraphFromElement(li, ordered ? { numbering: { reference: "rt-numbering", level: 0 } } : { bullet: { level: 0 } });
    });
  };

  const bodyChildren = Array.from(doc.body.childNodes).filter((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return (node.textContent ?? "").trim().length > 0;
    }
    return true;
  });

  for (const node of bodyChildren) {
    if (node.nodeType === Node.TEXT_NODE) {
      blocks.push(new Paragraph({ children: [new TextRun((node.textContent ?? "").trim())] }));
      continue;
    }
    if (!(node instanceof HTMLElement)) {
      continue;
    }

    const tag = node.tagName.toLowerCase();
    if (tag === "p") {
      addParagraphFromElement(node);
      continue;
    }

    if (tag === "h1" || tag === "h2" || tag === "h3") {
      const heading =
        tag === "h1" ? HeadingLevel.HEADING_1 : tag === "h2" ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3;
      addParagraphFromElement(node, { heading, spacing: { before: 140, after: 80 } });
      continue;
    }

    if (tag === "blockquote") {
      addParagraphFromElement(node, { indent: { left: 420 }, spacing: { before: 80, after: 120 } });
      continue;
    }

    if (tag === "ul") {
      addList(node, false);
      continue;
    }

    if (tag === "ol") {
      addList(node, true);
      continue;
    }

    if (tag === "img") {
      const src = node.getAttribute("src");
      if (!src) {
        continue;
      }
      try {
        const dims = await getImageDimensions(src);
        const { bytes, type } = await getImageData(src);
        const width = Math.min(maxImageWidth, Math.max(1, dims.width));
        const height = Math.max(1, Math.round((dims.height / Math.max(1, dims.width)) * width));
        blocks.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                type,
                data: bytes,
                transformation: {
                  width,
                  height,
                },
                altText: {
                  title: "trade-image",
                  description: "trade-image",
                  name: "trade-image",
                },
              }),
            ],
            spacing: { before: 100, after: 120 },
          }),
        );
      } catch (err) {
        console.error(err);
        blocks.push(new Paragraph({ children: [new TextRun("[图片加载失败]")] }));
      }
      continue;
    }

    // Fallback: treat as a paragraph.
    addParagraphFromElement(node);
  }

  // Remove empty leading/trailing paragraphs.
  return blocks.filter((p, idx) => {
    if (idx === 0 || idx === blocks.length - 1) {
      // @ts-expect-error docx types don't expose children directly well
      const children = (p as any).options?.children ?? (p as any).children ?? [];
      return children?.length ? true : true;
    }
    return true;
  });
}
