import {
  AlignmentType,
  CheckBox,
  Document,
  Footer,
  HeadingLevel,
  Packer,
  SimpleField,
  Paragraph,
  TextRun,
} from "docx";
import type { ChecklistMode, ChecklistTemplate } from "../data/checklists";
import type { ChecklistState } from "./storage";
import { downloadBlob } from "./download";

type ExportDocxOptions = {
  mode: ChecklistMode;
  template: ChecklistTemplate;
  checked: ChecklistState;
  fileName: string;
};

export async function exportChecklistDocx({ mode, template, checked, fileName }: ExportDocxOptions) {
  const title = `交易前 Checklist（${template.title}）`;

  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: title, bold: true, color: "047857" })],
      spacing: { after: 220 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "（在 Word 中可直接勾选复选框）", color: "64748B" })],
      spacing: { after: 260 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "日期：__________", color: "64748B" }),
        new TextRun({ text: "    品种：__________", color: "64748B" }),
        new TextRun({ text: "    策略：__________", color: "64748B" }),
      ],
      spacing: { after: 240 },
    }),
  ];

  template.sections.forEach((section) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: section.title, bold: true, color: "0F172A" })],
        spacing: { before: 200, after: 120 },
      }),
    );
    if (section.hint) {
      children.push(new Paragraph({ children: [new TextRun({ text: section.hint, color: "64748B" })], spacing: { after: 100 } }));
    }

    section.items.forEach((item) => {
      const suffix = `${item.label}${item.kill ? "  [否决项]" : ""}${item.desc ? `（${item.desc}）` : ""}`;
      const isChecked = Boolean(checked[item.id]);
      children.push(
        new Paragraph({
          children: [
            new CheckBox({
              alias: `cb_${mode}_${item.id}`,
              checked: isChecked,
              // 复选框符号：使用 Word 规范默认码位（unchecked=0x2610, checked=0x2612）。
              // 字体用 Segoe UI Symbol（Windows 常见，符号更“方正”），缺失时 Word 会自动回退到可用字体。
              // 如果你更喜欢“对勾”而不是“叉”，把 checked 改为 0x2611（☑）。
              checkedState: { font: "Segoe UI Symbol", value: "2611" }, // ☑
              uncheckedState: { font: "Segoe UI Symbol", value: "2610" }, // ☐
            }),
            new TextRun({ text: "  " }),
            new TextRun({ text: suffix, color: "0F172A" }),
          ],
          spacing: { after: 90 },
        }),
      );
    });
  });

  children.push(
    new Paragraph({
      spacing: { before: 240 },
      children: [new TextRun({ text: "备注：____________________________________________________________", color: "64748B" })],
    }),
  );

  const doc = new Document({
    creator: "Trader Checklist",
    title,
    styles: {
      default: {
        document: {
          run: {
            font: {
              ascii: "Arial",
              hAnsi: "Arial",
              eastAsia: "Microsoft YaHei",
            },
            size: 22,
            color: "0F172A",
          },
          paragraph: {
            spacing: { after: 120 },
          },
        },
      },
    },
    sections: [
      {
        properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } },
        children,
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: "Trader Checklist · ", color: "64748B" }),
                  new SimpleField("PAGE"),
                  new TextRun({ text: "/", color: "64748B" }),
                  new SimpleField("NUMPAGES"),
                ],
              }),
            ],
          }),
        },
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, fileName);
}
