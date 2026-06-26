import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { SiteBackground } from "@/components/SiteBackground";
import { SITE } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "X Íntimo | Vestuário Interior, Pijamas e Conforto",
  description: SITE.description,
  keywords: [
    "vestuário interior",
    "pijamas",
    "roupa térmica",
    "meias",
    "Pijamas Isa",
    "Ysabel Mora",
    "Portugal",
  ],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE.url,
    siteName: SITE.name,
    title: "X Íntimo | Vestuário Interior, Pijamas e Conforto",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "X Íntimo | Vestuário Interior, Pijamas e Conforto",
    description: SITE.description,
  },
  icons: {
    icon: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <SiteBackground />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
