import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const steps = ["Kali", "Windows + Sysmon", "Wazuh", "Me"];

export default function SocLabSummary() {
  return (
    <section id="soc-lab" className="mx-auto max-w-7xl px-5 py-20">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
        Case Study
      </p>

      <div className="grid gap-8 rounded-[30px] border border-[#171411]/10 bg-[#efe8df] p-6 md:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#171411] md:text-5xl">
            Building my own SOC lab.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#403a35]">
            I set up Kali on one side, a Windows machine on the other, and Wazuh
            watching in between. Then I attacked myself with brute-force logins,
            sketchy PowerShell and a malware test, and worked each alert the way an
            analyst would.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blogs/soc-lab"
              className="inline-flex items-center gap-2 rounded-full bg-[#171411] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] !text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Read the full story
              <ArrowRight size={14} />
            </Link>
            <a
              href="https://github.com/talhamirmd/SOC-Lab-Test"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#171411]/15 bg-white px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#171411] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          {steps.map((step, index) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-[#171411]/10 bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#171411]/75">
                {step}
              </span>
              {index < steps.length - 1 && <ArrowRight size={12} className="text-[#171411]/35" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
