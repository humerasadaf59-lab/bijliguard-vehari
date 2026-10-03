import "./globals.css";
import Link from "next/link";
import { AuthButton } from "@/components/AuthButton";
import { UrduToggle } from "@/components/UrduToggle";

export const metadata = {
  title: "BijliGuard — Vehari Load Shedding Optimizer",
  description: "Community-powered electricity outage intelligence for Vehari, Punjab."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-electric text-black">⚡</span>
              <span>BijliGuard</span>
            </Link>
            <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
              <Link href="/">Dashboard</Link>
              <Link href="/map">Live Map</Link>
              <Link href="/analytics">Analytics</Link>
              <Link href="/admin">Admin</Link>
            </nav>
            <div className="flex items-center gap-2">
              <UrduToggle />
              <AuthButton />
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
          BijliGuard • Community outage intelligence • Vehari, Punjab
        </footer>
      </body>
    </html>
  );
}
