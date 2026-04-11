import { Metadata } from "next";

export const metadata: Metadata = {
  title: "研究文档 - MQL5 编程与算法逻辑研究库 | 量化逻辑实验室",
  description: "系统化学习量化数据分析与 MQL5 编程逻辑。从数据清洗、时间序列分析到算法模型设计，获取专业研究文档与技术解析。",
  keywords: ["量化学习", "MQL5编程", "算法逻辑", "数据建模", "时间序列分析", "Quantitative Research", "Algorithmic Logic", "Data Science"],
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
