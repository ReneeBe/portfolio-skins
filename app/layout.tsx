import type { Metadata } from "next";
import { Space_Grotesk, Inter, Orbitron, Lora, Pacifico } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "portfolio-skins — Theme switcher for reneebe.github.io",
  description:
    "Pick a pre-made skin or describe a vibe and let AI generate a custom theme for the portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${orbitron.variable} ${lora.variable} ${pacifico.variable} antialiased`}
        style={{ height: "100dvh", overflow: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
