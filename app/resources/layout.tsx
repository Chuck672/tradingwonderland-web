import { Metadata } from "next";

export const metadata: Metadata = {
  title: "交易学院 - 外汇交易课程与策略库 | 绿洲交易社区",
  description: "系统化学习外汇交易。从交易心理学、Price Action裸K交易法到订单流分析。获取专业交易策略，构建您的盈利体系。",
  keywords: ["交易学习", "外汇交易课程", "交易策略", "裸K交易", "价格行为", "Trading Education", "Forex Course", "Trading Strategy"],
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
