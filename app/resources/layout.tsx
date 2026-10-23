import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — MQL5 and quantitative research notes",
  description: "Study notes on quantitative analysis and MQL5. For education and research, not investment advice.",
  keywords: ["QuantLogicLab", "MQL5", "Quantitative Research", "Algorithmic Logic", "Data Science"],
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
