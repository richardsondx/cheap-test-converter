import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cheap-Test Converter",
  description: "Turn one idea into the cheapest test that could prove it wrong.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
