import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Coach Nikki | Elite Swim Coaching in Chicago",
  description:
    "Private swim coaching in Chicago's West Loop by a University of Michigan D1 athlete and Big Ten competitor. Lessons for all ages and levels.",
  openGraph: {
    title: "Coach Nikki | Elite Swim Coaching in Chicago",
    description:
      "Private swim coaching in Chicago's West Loop by a University of Michigan D1 athlete.",
    images: ["/opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
