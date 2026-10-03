import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#f4efe9] text-[#171411]">
      <header className="sticky top-0 z-50 border-b border-[#171411]/10 bg-[#f4efe9]/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-sm font-semibold tracking-[0.28em] text-[#171411]">
            MMT
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/blogs"
              className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#171411]/65 transition-colors hover:text-[#171411]"
            >
              Blogs
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#171411]/65 transition-colors hover:text-[#171411]"
            >
              <ArrowLeft size={14} />
              Portfolio
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-[#171411]/10 py-6">
        <div className="mx-auto flex max-w-5xl justify-between px-5 text-[10px] uppercase tracking-[0.14em] text-[#171411]/50">
          <span>MMT © {new Date().getFullYear()}</span>
          <Link href="/" className="hover:text-[#171411]">
            Back to portfolio
          </Link>
        </div>
      </footer>
    </main>
  );
}
