import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TestRung — Turn one idea into the cheapest test that could prove it wrong.",
  description:
    "TestRung turns one prediction into a test ladder, a cost, and a next step, in under a minute. A RareGap project.",
  metadataBase: new URL("https://testrung.nshipyard.com"),
  openGraph: {
    title: "TestRung",
    description: "Turn one idea into the cheapest test that could prove it wrong.",
    url: "https://testrung.nshipyard.com",
    siteName: "TestRung",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
