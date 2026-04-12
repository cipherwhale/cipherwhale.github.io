import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "William Hale | Interstellar Portfolio",
  description:
    "Immersive mission log portfolio for William Hale: electrical engineer, materials scientist, and physics explorer.",
  keywords: [
    "William Hale",
    "Electrical Engineer",
    "Materials Scientist",
    "Interstellar Portfolio",
    "Sandia National Laboratories",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-space-deep text-space-text`}>
        {children}
      </body>
    </html>
  );
}
