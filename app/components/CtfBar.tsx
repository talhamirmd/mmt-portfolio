"use client";

import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { ctfUrl } from "../lib/contact";

export default function CtfBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-full mt-3 flex justify-center px-4">
      <div className="pointer-events-auto flex max-w-full items-center gap-3 rounded-full border border-[#171411]/10 bg-white/90 py-1.5 pl-4 pr-1.5 shadow-[0_10px_25px_rgba(23,20,17,0.08)] backdrop-blur-md">
        <p className="text-xs text-[#403a35]">
          Try my CTF site to understand what a CTF is.{" "}
          <Link
            href="/blogs/ctf-explained"
            className="hidden text-[#171411] underline decoration-[#8b6d5a]/50 underline-offset-4 hover:decoration-[#171411] sm:inline"
          >
            What&apos;s a CTF?
          </Link>
        </p>
        <a
          href={ctfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#171411] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] !text-white transition-transform duration-200 hover:-translate-y-0.5"
        >
          Play
          <ArrowUpRight size={12} />
        </a>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Hide CTF banner"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#171411]/50 transition-colors hover:bg-[#efe8df] hover:text-[#171411]"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
