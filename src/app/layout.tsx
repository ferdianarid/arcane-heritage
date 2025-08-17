import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Italianno, Odor_Mean_Chey } from "next/font/google";
import { ThemesProvider } from "./providers/themes-provider";
import "./globals.css";
import LenisProvider from "./providers/lenis-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const italianno = Italianno({
  variable: "--font-italianno",
  subsets: ["latin"],
  weight: "400",
});

const odorMeanChey = Odor_Mean_Chey({
  variable: "--font-odor",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ArcaneHeritage | Historical Place and Indonesian Culture",
  description: "Historical Place and Indonesian Culture",
  icons: {
    icon: "/arcane.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${italianno.variable} ${odorMeanChey} antialiased`}
      >
        <LenisProvider>
          <ThemesProvider>{children}</ThemesProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
