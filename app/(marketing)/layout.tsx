import AnalyticsTags from "@/_components/analytics/analytics-tags";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnalyticsTags />
      {children}
    </>
  );
}
