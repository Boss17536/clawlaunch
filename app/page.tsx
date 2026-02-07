import Hero from "@/components/Hero";
import ConfigDashboard from "@/components/ConfigDashboard";
import TerminalPreview from "@/components/TerminalPreview";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="relative z-10">
        <Hero />
        <ConfigDashboard />
        <TerminalPreview />
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-white/40 text-sm">
        <p>Built with Next.js 14 • Tailwind CSS • Framer Motion</p>
      </footer>
    </main>
  );
}
