import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "ClawLaunch - Automate Your Growth",
  description: "The open-source command center for LinkedIn & X",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AnimatedBackground />
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
