import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vineeta.007 | Portfolio",
  description: "Tech Developer · Game Builder · Creative",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}