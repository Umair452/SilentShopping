// ===== ROOT LAYOUT: START =====
import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {default: "Silent Shopping | Wholesale Sourcing", template: "%s | Silent Shopping"},
  description: "Silent Shopping is an independent home and kitchen wholesale business based in Vitoria-Gasteiz, Spain, operating on Amazon Spain.",
  robots: {index: true, follow: true},
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
// ===== ROOT LAYOUT: END =====
