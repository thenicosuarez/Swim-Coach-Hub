import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
