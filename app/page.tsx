"use client";

import { motion } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CtfBar from "./components/CtfBar";
import QuickLearning from "./components/QuickLearning";
import SocLabSummary from "./components/SocLabSummary";
import HeroOrbit from "./components/HeroOrbit";
import TechStack from "./components/TechStack";
import Terminal from "./components/Terminal";
import { cvUrl, publicAssetBasePath, whatsappUrl } from "./lib/contact";

const indiaMapCardStyle = {
  backgroundColor: "#fff",
  backgroundImage: `linear-gradient(rgba(255,255,255,0.52), rgba(255,255,255,0.52)), url('${publicAssetBasePath}/india_map.png')`,
  backgroundSize: "100% 100%, contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Security Arsenal", href: "#security-arsenal" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
  { label: "Blogs", href: "/blogs" },
];

const expertise = [
  {
    title: "Security Operations",
    description:
      "Reading logs, spotting what doesn't belong, and working an incident from the first alert to the final write-up.",
  },
  {
    title: "Vulnerability Assessment",
    description:
      "Finding the holes before someone else does, with Nmap, Nessus, Burp Suite, ZAP and SQLMap, then chasing them until they're actually fixed.",
  },
  {
    title: "IT Infrastructure",
    description:
      "Networks, Windows and Linux servers, accounts and access. The everyday stuff that has to work before security even matters.",
  },
];

const skillGroups = [
  "Cybersecurity",
  "Incident Response",
  "Vulnerability Assessment",
  "Network Security",
  "Active Directory",
  "Windows Administration",
  "Linux Administration",
  "OWASP ZAP",
  "Burp Suite",
  "Nessus",
  "Nmap",
  "Wireshark",
  "SQLMap",
  "Python",
  "SQL",
  "Power BI",
  "Django",
  "TCP/IP",
  "DNS",
  "DHCP",
  "VPN",
  "Git",
  "Microsoft 365",
  "SIEM Fundamentals",
];

const securityTools = [
  {
    title: "Security Operations",
    items: ["SOC", "SIEM", "Threat Monitoring", "Incident Documentation"],
  },
  {
    title: "Vulnerability Management",
    items: ["Nessus", "Nmap", "OWASP ZAP", "Remediation Tracking"],
  },
  {
    title: "Network & Access",
    items: ["Active Directory", "VPN", "DNS / DHCP", "Access reviews"],
  },
  {
    title: "Endpoint Support",
    items: ["Windows", "Linux", "Users & Access", "System Hardening"],
  },
];

const projects = [
  {
    title: "SOC-LAB-Setup",
    type: "Security monitoring lab",
    description:
      "A home lab running Wazuh, where I attack my own machine and practise catching myself.",
    href: "https://github.com/talhamirmd/SOC-Lab-Test",
  },
  {
    title: "Medical Recommendation System",
    type: "AI + healthcare",
    description:
      "You type in your symptoms and it suggests a medicine to talk through with a doctor. Django on the front, NLP-based machine learning underneath.",
    href: "https://github.com/talhamirmd/Drug-Recomendation",
  },
  {
    title: "Fashion Recommendation System",
    type: "Computer vision",
    description:
      "An outfit recommender that looks at clothing images and suggests what goes together. OpenCV and a ResNet50 model do the looking.",
    href: "https://github.com/talhamirmd/Fashion-Recomendation-System",
  },
];

const certifications = [
  { title: "Certified Ethical Hacker (CEH)", href: undefined },
  { title: "Cloud Security Engineer (CCSE)", href: undefined },
  {
    title: "Google Cybersecurity Professional Certificate",
    href: "https://www.coursera.org/account/accomplishments/professional-cert/0GLI1JCHCD9Y",
  },
  {
    title: "Fortinet Certified Fundamentals Cybersecurity",
    href: "https://www.credly.com/badges/5f0b84b1-0347-4f4a-a11c-02d83674c465",
  },
  {
    title: "Cyber Security Course / Training - Devtown",
    href: "https://www.cert.devtown.in/verify/sQzAHJXn",
  },
  { title: "Introduction to Cyber Security - Cisco", href: undefined },
  {
    title: "View Credly badges",
    href: "https://www.credly.com/users/mir-mohammed-talha/badges#credly",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [botStage, setBotStage] = useState<"cv" | "waiting" | "screening" | "hidden">("cv");
  const showBot = botStage === "cv" || botStage === "screening";

  // After the CV prompt is ignored, come back 10 seconds later with the WhatsApp prompt.
  useEffect(() => {
    if (botStage !== "waiting") return;
    const timer = setTimeout(() => setBotStage("screening"), 10000);
    return () => clearTimeout(timer);
  }, [botStage]);

  useEffect(() => {
    const sections = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.2, 0.5, 0.8],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleBotIgnore = () => {
    setBotStage(botStage === "cv" ? "waiting" : "hidden");
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-[#f4efe9] text-[#171411]">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#f4efe9]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(120,90,70,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.04),transparent_28%)]" />

      {showBot && (
        <motion.div
          className="pointer-events-auto fixed bottom-4 right-4 z-50 block sm:bottom-6 sm:right-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex items-end gap-2">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-[#171411]/10 bg-[#f7f1ea] shadow-[0_10px_25px_rgba(23,20,17,0.08)]">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#171411]">
                🙏
              </span>
            </div>

            <div className="max-w-[220px] rounded-[18px] border border-[#171411]/10 bg-white/90 px-3 py-2 shadow-[0_12px_30px_rgba(23,20,17,0.08)] backdrop-blur-md">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#171411]/75">
                {botStage === "cv" ? (
                  <>
                    Want the full picture?
                    <br />
                    My CV is two pages, promise.
                  </>
                ) : (
                  <>
                    Still here? Let&apos;s just talk.
                    <br />
                    I&apos;m one message away.
                  </>
                )}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {botStage === "cv" ? (
                  <a
                    href={cvUrl}
                    download="Mohd_Talha_CV.pdf"
                    className="inline-flex min-w-[110px] items-center justify-center gap-1 rounded-full bg-[#171411] px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-[0.14em] !text-white"
                  >
                    <Download size={11} />
                    Download CV
                  </a>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-[110px] items-center justify-center gap-1 rounded-full bg-[#171411] px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-[0.14em] !text-white"
                  >
                    <MessageCircle size={11} />
                    WhatsApp me
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleBotIgnore}
                  className="inline-flex min-w-[70px] items-center justify-center rounded-full border border-[#171411]/15 bg-white px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-[0.14em] text-[#171411]"
                >
                  Ignore 😭
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <header className="sticky top-0 z-50 border-b border-[#171411]/10 bg-[#f4efe9]/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-5">
          <a href="#home" className="text-sm font-semibold tracking-[0.28em] text-[#171411]">
            MMT
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              const NavLink = item.href.startsWith("/") ? Link : "a";
              return (
                <NavLink
                  key={item.label}
                  href={item.href}
                  className={`text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-[#171411]" : "text-[#171411]/65 hover:text-[#171411]"
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#171411]/15 bg-white transition-colors hover:bg-[#efe8df] lg:hidden"
              aria-label="Open menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-[#171411]/10 bg-[#f4efe9] px-5 py-5 lg:hidden"
          >
            {navItems.map((item) => {
              const NavLink = item.href.startsWith("/") ? Link : "a";
              return (
                <NavLink
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-[#171411]/10 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#171411]/75"
                >
                  {item.label}
                </NavLink>
              );
            })}
            <a
              href={cvUrl}
              download="Mohd_Talha_CV.pdf"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#171411]/15 bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#171411] transition-colors hover:bg-[#efe8df]"
            >
              <Download size={14} />
              CV
            </a>
          </motion.div>
        )}
        {!menuOpen && <CtfBar />}
      </header>

      <section
        id="home"
        className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-10 sm:px-5 md:pt-20"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative z-10 max-w-full"
          >
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#5c544d]">
              Riyadh, Kingdom of Saudi Arabia
            </p>

            <h1 className="max-w-[18ch] text-[2.5rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#171411] sm:text-5xl md:text-6xl lg:text-7xl">
              Mir Mohammed Talha
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-[#403a35] sm:text-base sm:leading-7 md:text-lg">
              An IT professional based in Riyadh, Saudi Arabia, with hands-on experience across IT support, system administration, cybersecurity, backend development, databases, APIs, and enterprise applications.
              I enjoy solving technical problems, improving IT operations, and building practical solutions that make systems more secure, reliable, and efficient.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={cvUrl}
                download="Mohd_Talha_CV.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-[#171411] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.14em] !text-white [&_svg]:text-white transition-transform duration-200 hover:-translate-y-0.5 sm:px-5"
              >
                <Download size={14} />
                Download CV
              </a>

              <a
                href="#skills"
                className="inline-flex items-center gap-2 rounded-full border border-[#171411]/15 bg-white px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#171411] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                View Skills
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#171411]/15 bg-[#efe8df] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#171411] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          <HeroOrbit />
        </div>
      </section>

      <div className="border-y border-[#171411]/10 bg-[#efe8df]">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-2 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#171411]/60 sm:justify-between">
          {[
            "Network Security",
            "Endpoint Security",
            "SOC",
            "VAPT",
            "IAM",
            "SIEM",
            "Windows",
            "Linux",
            "Active Directory",
            "Nessus",
          ].map((item) => (
            <span
              key={item}
              className="py-2 text-[#5c4031] transition-all duration-300 hover:scale-[1.04] hover:text-[#171411]"
              style={{
                textShadow: "0 0 7px rgba(139,109,90,0.5), 0 0 16px rgba(139,109,90,0.32)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <section id="about" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
              About
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#171411] md:text-5xl">
              I like knowing how things break.
            </h2>
          </div>

          <div className="space-y-4 text-base leading-7 text-[#403a35]">
            <p>
              I started out building web apps, and the more I built, the more I
              wondered how someone would break them. That question pulled me into
              security: a pentesting internship at CDAC, a SOC lab at home, and now
              IT work where the problems are real and someone is waiting on the fix.
            </p>
            <p>
              The part I enjoy most is the investigating. Something looks wrong, and
              you follow the logs until you know why. Best case, the answer turns into
              a fix that stops it happening again.
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#171411] md:text-5xl">
            Where I&apos;ve worked.
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[30px] border border-[#171411]/10 bg-[#efe8df] p-4 shadow-[0_20px_40px_rgba(23,20,17,0.04)] md:p-5">
          <div className="relative z-10 space-y-4">
            <article
              className="relative overflow-hidden rounded-[24px] border border-[#171411]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-7"
              style={{
                backgroundColor: "#fff",
                backgroundImage:
                  `linear-gradient(rgba(255,255,255,0.48), rgba(255,255,255,0.48)), url('${publicAssetBasePath}/ksa_map.png')`,
                backgroundSize: "100% 100%, contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative z-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
                    June 2026 — Present
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#171411]">
                    IT Support Specialist
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#171411]/60">
                  DesignTech Engineering Consultants
                </span>
              </div>

              <p className="relative z-10 mt-4 max-w-3xl text-sm leading-6 text-[#403a35]">
                I&apos;m who people call when something&apos;s wrong. Some days that&apos;s a VPN
                that won&apos;t connect or a switch acting up. Other days it&apos;s a laptop
                behaving strangely, and I&apos;m working out what happened, cleaning it up,
                and escalating when it needs to go higher. I also look after Microsoft
                365 and Active Directory accounts, patching, and backups for our Windows
                and Linux servers.
              </p>
            </article>

            <article
              className="rounded-[24px] border border-[#171411]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={indiaMapCardStyle}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
                    April 2026 — May 2026
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#171411]">
                    Associate Software Engineer
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#171411]/60">
                  Hodos 360 LLC
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#403a35]">
                Built and maintained web apps with security in mind from the start:
                proper login and permission checks, input validation, and code reviews
                that caught problems before they shipped. When something broke, I
                read the logs and helped track down why.
              </p>
            </article>

            <article
              className="rounded-[24px] border border-[#171411]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={indiaMapCardStyle}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
                    April 2025 — June 2025
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#171411]">
                    Cyber Security Intern
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#171411]/60">
                  CDAC Bangalore
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#403a35]">
                My first proper taste of offensive security. I spent three months
                poking holes in web apps with Burp Suite, OWASP ZAP, Nessus, Nmap and
                SQLMap, then writing up what I found and how to fix it. We also ran
                incident-handling drills and covered IDS/IPS and SIEM basics.
              </p>
              <a
                href="https://c-huk.cdacb.in/certgen/certificatePRCTM.php?hash=MjAyNTA0MDQwMDEwfE1pciBNb2hhbW1lZCBUYWxoYQ%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-xs font-medium text-[#5c544d] underline underline-offset-4"
              >
                View CDAC certificate
              </a>
            </article>

            <article
              className="rounded-[24px] border border-[#171411]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={indiaMapCardStyle}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
                    Sept 2024 - Feb 2025
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#171411]">
                    Data Quality Analyst Intern
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#171411]/60">
                  Rooman Technologies
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#403a35]">
                Finding where the numbers didn&apos;t add up and working out why. I built
                reports and dashboards in Power BI and Python, kept track of what had
                been checked, and worked with other teams to fix problems at the source.
              </p>
            </article>

            <article
              className="rounded-[24px] border border-[#171411]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={indiaMapCardStyle}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
                    Oct 2023 - April 2024
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#171411]">
                    Web Developer
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#171411]/60">
                 Colt Assist-Ultinity Technologies Pvt. Ltd.
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#403a35]">
                My first job. I built an online grocery management interface and learned
                early to guard against things like SQL injection and XSS. I also did
                regular code reviews and basic vulnerability checks on our web apps.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
            Skills
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#171411] md:text-5xl">
            What I&apos;m good at.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[24px] border border-[#171411]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#8b6d5a]/30 bg-[#f7f1ea]">
                <ShieldCheck className="h-4 w-4 text-[#8b6d5a]" />
              </div>
              <h3 className="text-lg font-medium text-[#171411]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#403a35]">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {skillGroups.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#171411]/10 bg-white px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#171411]/75"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <TechStack />

      <section id="security-arsenal" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
            Security Arsenal
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#171411] md:text-5xl">
            What I reach for.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {securityTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-[24px] border border-[#171411]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-medium text-[#171411]">{tool.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#403a35]">
                {tool.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8b6d5a]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>


      <section id="projects" className="mx-auto max-w-7xl px-5 py-20">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
          Projects
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-[24px] border border-[#171411]/10 bg-white p-6 text-[#403a35] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b6d5a]"
            >
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#5c544d]">
                {project.type}
              </p>
              <h3 className="mt-3 text-xl font-medium text-[#171411]">{project.title}</h3>
              <p className="mt-3 text-sm leading-6">{project.description}</p>
            </a>
          ))}
        </div>
      </section>

      <SocLabSummary />

      <QuickLearning />

      <Terminal />

      <section id="certifications" className="mx-auto max-w-7xl px-5 py-20">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
          Certifications
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {certifications.map((certification) => (
            <div
              key={certification.title}
              className="rounded-[24px] border border-[#171411]/10 bg-white p-5 text-[#403a35] shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              {certification.href ? (
                <a
                  href={certification.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#171411] hover:underline"
                >
                  {certification.title}
                </a>
              ) : (
                certification.title
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-[#171411]/10 bg-[#efe8df]">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
                Contact
              </p>
              <h2 className="max-w-lg text-4xl font-semibold tracking-[-0.05em] text-[#171411] md:text-6xl">
                Got a role in mind? Let&apos;s talk.
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-2 inline-flex items-center gap-2 self-start rounded-full bg-[#171411] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.14em] !text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                <MessageCircle size={14} />
                Book a screening call on WhatsApp
              </a>

              <a
                href="mailto:talhamirmohd@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#171411]"
              >
                <Mail size={14} />
                talhamirmohd@gmail.com
              </a>

              <a
                href="https://www.linkedin.com/in/mirmohdtalha"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#171411]"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>

              <a
                href="https://github.com/talhamirmd"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#171411]"
              >
                <Github size={14} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#171411]/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 text-[10px] uppercase tracking-[0.14em] text-[#171411]/50 sm:flex-row">
          <span>MMT © {new Date().getFullYear()}</span>
          <span>Built by me with Next.js</span>
          <a href="#home" className="hover:text-[#171411]">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}