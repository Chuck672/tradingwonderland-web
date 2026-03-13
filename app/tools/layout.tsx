import { Metadata } from "next";

export const metadata: Metadata = {
  title: "交易工具库 - 独家MT5高级指标与AI量化EA | 绿洲交易社区",
  description: "探索绿洲交易社区的专业工具库。包含Session Volume Profile、流动性猎杀指标、订单块识别EA以及AI自动交易机器人。赋能您的MT5交易终端。",
  keywords: ["交易工具", "MT5指标", "AI量化工具", "自动交易EA", "订单流工具", "Trading Tools", "MT5 Indicators", "Quantitative Trading"],
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
