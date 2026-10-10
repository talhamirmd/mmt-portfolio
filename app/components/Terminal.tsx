"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cvUrl, whatsappUrl } from "../lib/contact";

type Line = { kind: "input" | "output"; text: string };

const PROMPT = "guest@mmt:~$";

const outputs: Record<string, string> = {
  help: `available commands
  whoami         who is this
  experience     work history
  skills         what I work with
  projects       things I've built
  certs          certifications
  lab            SOC lab summary
  contact        how to reach me
  nmap talha     scan me
  cv             download my CV
  whatsapp       message me on WhatsApp
  clear          clear the screen`,

  whoami: `mir mohammed talha
IT Support Specialist @ DesignTech Engineering Consultants, Riyadh
focus: security operations, incident response, vulnerability management`,

  experience: `2026 - now    IT Support Specialist          DesignTech Engineering Consultants
2026          Associate Software Engineer    Hodos 360 LLC
2025          Cyber Security Intern          CDAC Bangalore
2024 - 2025   Data Quality Analyst Intern    Rooman Technologies
2023 - 2024   Web Developer                  Colt Assist-Ultinity Technologies`,

  skills: `security   wazuh, sysmon, nessus, nmap, burp suite, owasp zap, sqlmap, wireshark, metasploit
infra      active directory, windows server, linux, group policy, microsoft 365
network    tcp/ip, dns, dhcp, vpn, routing & switching
code       python, java, sql, powershell, bash, django`,

  projects: `soc-lab-setup                  wazuh + sysmon lab for detection and triage
medical-recommendation-system  django + nlp symptom-based recommendations
fashion-recommendation-system  opencv + resnet50 outfit recommendations
-> github.com/talhamirmd`,

  certs: `[x] Certified Ethical Hacker (CEH) - EC-Council
[x] Cloud Security Engineer (CCSE) - EC-Council
[x] Google Cybersecurity Professional Certificate
[x] Fortinet Certified Fundamentals Cybersecurity
[x] Cyber Security Course / Training - Devtown
[x] Introduction to Cyber Security - Cisco`,

  lab: `kali (attacker) -> windows host (sysmon + wazuh agent) -> wazuh manager -> triage
scenarios: brute-force logon, encoded powershell, eicar malware test
full story at /blogs/soc-lab`,

  contact: `email      talhamirmohd@gmail.com
linkedin   linkedin.com/in/mirmohdtalha
github     github.com/talhamirmd
whatsapp   type 'whatsapp'`,

  "nmap talha": `Starting Nmap scan against talha (riyadh.ksa)
Host is up (0.0004s latency).

PORT       STATE  SERVICE
22/tcp     open   linux-administration
53/udp     open   dns-dhcp-troubleshooting
88/tcp     open   active-directory
443/tcp    open   secure-coding
1514/tcp   open   wazuh-siem
3389/tcp   open   windows-support

Nmap done: 1 IP address (1 host up) scanned`,

  "sudo hire talha": `[sudo] password for guest: ********
access granted.
next step: type 'whatsapp' to book a screening call, or 'cv' for the resume.`,
};

const completions = [...Object.keys(outputs), "cv", "whatsapp", "clear"];

const welcome: Line[] = [
  { kind: "output", text: "mmt shell - type 'help' to see what's here." },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(welcome);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase().replace(/\s+/g, " ");
    const echo: Line = { kind: "input", text: raw };

    if (command) setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    if (command === "clear") {
      setLines([]);
      return;
    }

    let response: string;
    if (!command) {
      response = "";
    } else if (command === "cv") {
      window.open(cvUrl, "_blank", "noopener");
      response = "opening cv.pdf ...";
    } else if (command === "whatsapp") {
      window.open(whatsappUrl, "_blank", "noopener");
      response = "opening WhatsApp ...";
    } else if (command.startsWith("nmap") && command !== "nmap talha") {
      response = "Note: Host seems down. Try 'nmap talha'.";
    } else if (command.startsWith("sudo") && command !== "sudo hire talha") {
      response = "guest is not in the sudoers file. This incident will be reported.";
    } else {
      response = outputs[command] ?? `command not found: ${command.split(" ")[0]}. type 'help'.`;
    }

    setLines((prev) => [
      ...prev,
      echo,
      ...(response ? [{ kind: "output" as const, text: response }] : []),
    ]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      run(value);
      setValue("");
    } else if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(history[next]);
    } else if (event.key === "ArrowDown" && historyIndex !== -1) {
      event.preventDefault();
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(next);
        setValue(history[next]);
      }
    } else if (event.key === "Tab" && value) {
      const match = completions.find((c) => c.startsWith(value.toLowerCase()));
      if (match) {
        event.preventDefault();
        setValue(match);
      }
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <section id="terminal" className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
            Terminal
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#171411] md:text-5xl">
            Prefer the command line?
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-[#403a35]">
            Same portfolio, different interface. Start with{" "}
            <code className="rounded bg-[#efe8df] px-1.5 py-0.5 font-mono text-sm text-[#171411]">help</code>, or try{" "}
            <code className="rounded bg-[#efe8df] px-1.5 py-0.5 font-mono text-sm text-[#171411]">nmap talha</code>.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-[24px] border border-[#171411]/10 bg-[#171411] shadow-[0_20px_40px_rgba(23,20,17,0.12)]"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f4efe9]/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f4efe9]/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f4efe9]/20" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#f4efe9]/40">
              guest@mmt
            </span>
          </div>

          <div
            ref={scrollRef}
            className="h-[360px] overflow-y-auto px-5 py-4 font-mono text-[12px] leading-6 text-[#f4efe9]/80 sm:text-[13px]"
          >
            {lines.map((line, index) =>
              line.kind === "input" ? (
                <div key={index} className="whitespace-pre-wrap break-words">
                  <span className="text-[#d2b8a6]">{PROMPT}</span> {line.text}
                </div>
              ) : (
                <div key={index} className="mb-2 whitespace-pre-wrap break-words text-[#f4efe9]/65">
                  {line.text}
                </div>
              )
            )}

            <div className="flex items-center gap-2">
              <label htmlFor="terminal-input" className="shrink-0 text-[#d2b8a6]">
                {PROMPT}
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full bg-transparent text-[#f4efe9] caret-[#d2b8a6] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
