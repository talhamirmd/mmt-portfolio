"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";

const pipeline = [
  { role: "Attacker", host: "Kali Linux", detail: "Where I attacked from" },
  { role: "Target", host: "Windows machine", detail: "Running Sysmon and the Wazuh agent" },
  { role: "SIEM", host: "Wazuh", detail: "Collecting logs and raising alerts" },
  { role: "Analyst", host: "Me", detail: "Working out what actually happened" },
];

const links = ["attacks", "logs", "alerts"];

const scenarios = [
  {
    title: "Brute-force login",
    did: "Threw a long list of wrong passwords at a local account from Kali.",
    caught:
      "Windows logged every failure as a 4625, and Wazuh rolled them up into one bigger alert. The failures weren't the interesting part, though. What I really wanted to know was whether a 4624 (a successful login) showed up right after them.",
  },
  {
    title: "Sketchy PowerShell",
    did: "Ran a few encoded, hidden-window PowerShell commands on the Windows machine, the kind of thing malware likes to do.",
    caught:
      "Sysmon saved the full command line, so I could decode the base64 and read exactly what ran. Then I checked whether that process tried to talk to anything on the network.",
  },
  {
    title: "Malware test",
    did: "Dropped the EICAR test file. Every antivirus flags it, but it's completely harmless.",
    caught:
      "Defender caught it and Wazuh's file monitoring flagged the new file. I checked the hash, made sure it got quarantined, and wrote it up like a real ticket.",
  },
];

const learnings = [
  "The failed logins aren't the scary part. The one successful login after them is.",
  "Out of the box, Wazuh is loud. I spent more time deciding what deserves an alert than setting anything up.",
  "Writing each one up like a real ticket felt like overkill at first. Looking back, it's the habit I'd recommend most.",
];

export default function SocLabStory() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <div className="max-w-2xl space-y-4 text-base leading-7 text-[#403a35]">
        <p>
          I wanted to see what an analyst actually sees when something goes wrong on
          a machine, instead of just reading about it. So I set up a small lab at
          home: a Kali box to attack from, a Windows machine to attack, and Wazuh in
          the middle watching everything.
        </p>
        <p>Then I broke things on purpose and tried to catch myself.</p>
      </div>

      {/* Setup */}
      <div className="mt-10 rounded-[30px] border border-[#171411]/10 bg-[#efe8df] p-4 md:p-6">
        <p className="mb-4 px-1 text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
          The setup
        </p>

        <div className="flex flex-col items-stretch gap-2 lg:flex-row">
          {pipeline.map((node, index) => (
            <div key={node.role} className="contents">
              <div className="flex-1 rounded-[20px] border border-[#171411]/10 bg-white p-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b6d5a]">{node.role}</p>
                <h3 className="mt-2 text-lg font-medium tracking-[-0.03em] text-[#171411]">
                  {node.host}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#403a35]">{node.detail}</p>
              </div>

              {index < links.length && (
                <div className="flex shrink-0 items-center justify-center gap-2 self-center py-1 text-[#171411]/40 lg:w-16 lg:flex-col lg:gap-1 lg:py-0">
                  <ArrowDown size={14} className="lg:hidden" />
                  <ArrowRight size={14} className="hidden lg:block" />
                  <span className="text-[9px] uppercase tracking-[0.12em]">{links[index]}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-4 px-1 text-sm leading-6 text-[#403a35]">
          I also ran Nmap and Nessus against the same Windows machine to find its weak
          spots, then fixed them one by one.
        </p>
      </div>

      {/* Scenarios */}
      <div className="mt-5 overflow-hidden rounded-[24px] border border-[#171411]/10 bg-white shadow-sm">
        <p className="border-b border-[#171411]/10 px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
          What I tried
        </p>

        {scenarios.map((scenario, index) => {
          const isOpen = open === index;
          return (
            <div key={scenario.title} className="border-b border-[#171411]/10 last:border-b-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-5 px-6 py-5 text-left transition-colors hover:bg-[#f7f1ea]"
              >
                <span className="text-[10px] font-medium tracking-[0.14em] text-[#8b6d5a]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-lg font-medium tracking-[-0.03em] text-[#171411]">
                  {scenario.title}
                </span>
                <Plus
                  size={16}
                  className={`text-[#171411]/60 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <dl className="grid gap-5 px-6 pb-6 md:ml-[38px] md:grid-cols-[0.8fr_1.2fr]">
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">What I did</dt>
                        <dd className="mt-1 text-sm leading-6 text-[#403a35]">{scenario.did}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">How I caught it</dt>
                        <dd className="mt-1 text-sm leading-6 text-[#403a35]">{scenario.caught}</dd>
                      </div>
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Learnings */}
      <div className="mt-10 max-w-2xl">
        <h3 className="text-xl font-medium tracking-[-0.04em] text-[#171411]">What I took away</h3>
        <ul className="mt-4 space-y-3">
          {learnings.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-7 text-[#403a35]">
              <span className="text-[#8b6d5a]">—</span>
              {item}
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/talhamirmd/SOC-Lab-Test"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#171411]/15 bg-white px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#171411] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          See the lab on GitHub
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
