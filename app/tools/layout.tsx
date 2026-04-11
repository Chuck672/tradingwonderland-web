import { Metadata } from "next";

export const metadata: Metadata = {
  title: "量化工具库 - 独家时间序列分析与数据建模工具 | 量化逻辑实验室",
  description: "探索量化逻辑实验室的专业工具库。包含高级数据可视化指标、算法逻辑分析插件与自动化回测模型，专注为数据科学家与量化研究员赋能。",
  keywords: ["量化工具", "数据建模", "算法逻辑", "回测模型", "数据可视化", "Quantitative Tools", "Data Modeling", "Algorithmic Logic", "Tick Data Visualization"],
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
