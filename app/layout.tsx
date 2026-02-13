import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import AnalyticsScript from "./analytics-script";

export const metadata: Metadata = {
  title: "ClawLaunch - Automate Your Growth",
  description: "The open-source command center for LinkedIn & X",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AnalyticsScript />
      </head>
      <body className="font-sans">
        <FirebaseAnalytics />
        <AnimatedBackground />
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
