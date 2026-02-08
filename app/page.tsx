import Link from "next/link";
import { ArrowRight, Rocket, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-void text-white selection:bg-electric selection:text-void">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-white/10 bg-void/50 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4">
          ClawLaunch &nbsp;
          <code className="font-mono font-bold">v1.0.0</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-void via-void to-transparent lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="flex place-items-center gap-2 p-8 lg:p-0 pointer-events-none"
            href="https://openclaw.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className="font-bold text-electric">OpenClaw</span>
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-electric/20 before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-to-tr after:from-cyber/20 after:to-transparent after:blur-2xl after:content-[''] z-[-1]">
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 mb-6">
            ClawLaunch
          </h1>
          <p className="text-xl text-white/70 max-w-lg mx-auto mb-8">
            The Elite Open-Source Command Center for LinkedIn & X Automation.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs"
              className="group rounded-full border border-white/10 px-6 py-3 transition-colors hover:border-electric/50 hover:bg-electric/10 hover:text-electric flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-32 gap-8">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-electric/20 hover:bg-electric/5 hover:backdrop-blur-sm">
          <h2 className={`mb-3 text-2xl font-semibold flex items-center gap-2`}>
            <Zap className="w-6 h-6 text-electric" />
            Fast{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            120Hz Fluidity with staggered animations powered by Framer Motion.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-cyber/20 hover:bg-cyber/5 hover:backdrop-blur-sm">
          <h2 className={`mb-3 text-2xl font-semibold flex items-center gap-2`}>
            <Shield className="w-6 h-6 text-cyber" />
            Secure{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Enterprise-grade security with local execution and safe storage.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white/20 hover:bg-white/5 hover:backdrop-blur-sm">
          <h2 className={`mb-3 text-2xl font-semibold flex items-center gap-2`}>
            <Rocket className="w-6 h-6 text-white" />
            Automated{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Full command center for managing your automation workflows.
          </p>
        </div>
      </div>
    </main>
  );
}
