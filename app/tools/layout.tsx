import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools — MT5 chart tools for study and backtesting",
  description: "MT5 indicators and chart tools from QuantLogicLab for learning, historical review, and backtesting. They are not investment advice and do not promise profits.",
  keywords: ["QuantLogicLab", "MT5", "Quantitative Tools", "Data Modeling", "Backtesting", "Tick Data Visualization"],
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
