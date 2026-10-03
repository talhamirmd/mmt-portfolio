"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
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
import SocLabSummary from "./components/SocLabSummary";
import TechStack from "./components/TechStack";
import Terminal from "./components/Terminal";
import { publicAssetBasePath, whatsappUrl } from "./lib/contact";

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

const securityNodes = [
  { name: "CYBER SECURITY", x: "50%", y: "9%" },
  { name: "SOC", x: "27%", y: "22%" },
  { name: "VAPT", x: "13%", y: "43%" },
  { name: "WAZUH", x: "20%", y: "67%" },
  { name: "NETWORK", x: "38%", y: "87%" },
  { name: "SIEM", x: "73%", y: "22%" },
  { name: "NESSUS", x: "87%", y: "43%" },
  { name: "IAM", x: "75%", y: "67%" },
  { name: "ACTIVE\nDIRECTORY", x: "70%", y: "87%" },
];

const expertise = [
  {
    title: "Security Operations",
    description:
      "Threat detection, incident response, log review, endpoint monitoring, and escalation workflows.",
  },
  {
    title: "Vulnerability Assessment",
    description:
      "Nmap, Nessus, OWASP ZAP, Burp Suite, SQLMap, and remediation tracking for risk reduction.",
  },
  {
    title: "IT Infrastructure",
    description:
      "Network troubleshooting, Windows/Linux administration, access controls, and endpoint support.",
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
    items: ["Active Directory", "VPN", "DNS / DHCP", "IAM Hygiene"],
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
      "Built a Wazuh-based SOC lab for log collection, alert review, incident simulation, and endpoint event investigation.",
    href: "https://github.com/talhamirmd/SOC-Lab-Test",
  },
  {
    title: "Medical Recommendation System",
    type: "AI + healthcare",
    description:
      "Designed a symptom-based recommendation system using Python, Django, and machine learning for medical guidance.",
    href: "https://github.com/talhamirmd/Drug-Recomendation",
  },
  {
    title: "Fashion Recommendation System",
    type: "Computer vision",
    description:
      "Developed a model-based outfit recommendation system using Python, OpenCV, and ResNet50-based image processing.",
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
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [showBot, setShowBot] = useState(true);
  const [botStage, setBotStage] = useState<"cv" | "screening">("cv");

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const nextX = event.clientX;
      const nextY = event.clientY;

      setPointer({
        x: nextX / window.innerWidth,
        y: nextY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    if (botStage === "cv") {
      setShowBot(false);
      setTimeout(() => {
        setBotStage("screening");
        setShowBot(true);
      }, 10000);
      return;
    }

    setShowBot(false);
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
                    Download My CV,
                    <br />
                    It&apos;s only 4 MB.
                  </>
                ) : (
                  <>
                    Do a screening call now.
                    <br />
                    I&apos;m one message away.
                  </>
                )}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {botStage === "cv" ? (
                  <a
                    href={`${publicAssetBasePath}/cv.pdf`}
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
              href={`${publicAssetBasePath}/cv.pdf`}
              download="Mohd_Talha_CV.pdf"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#171411]/15 bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#171411] transition-colors hover:bg-[#efe8df]"
            >
              <Download size={14} />
              CV
            </a>
          </motion.div>
        )}
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
              Cybersecurity • IT support • infrastructure
            </p>

            <h1 className="max-w-[18ch] text-[2.5rem] font-semibold leading-[0.92] tracking-[-0.07em] text-[#171411] sm:text-5xl md:text-6xl lg:text-7xl">
              Mir Mohammed Talha
            </h1>

            <h2 className="mt-4 max-w-2xl text-lg font-medium tracking-[-0.04em] text-[#3d352f] sm:text-xl md:text-2xl">
              Cybersecurity & IT Infrastructure Professional
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-[#403a35] sm:text-base sm:leading-7 md:text-lg">
              Cybersecurity enthusiast with practical experience in security
              operations, incident response, vulnerability assessment, IT
              infrastructure support, network administration, access management,
              endpoint security, and application security.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`${publicAssetBasePath}/cv.pdf`}
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

          <div
            className="relative z-10 flex h-[320px] w-full items-center justify-center sm:h-[360px] lg:h-[430px]"
            onMouseMove={(e) => {
              const bounds = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - bounds.left) / bounds.width;
              const y = (e.clientY - bounds.top) / bounds.height;
              setPointer({ x, y });
            }}
          >
            <div
              className="absolute inset-0 rounded-[2rem] border border-[#171411]/10"
              style={{
                background:
                  "radial-gradient(circle at 50% 9%, rgba(139,109,90,0.18), rgba(139,109,90,0.08) 14%, transparent 42%)",
              }}
            />

            <motion.div
              className="relative h-[260px] w-[260px] cursor-pointer sm:h-[300px] sm:w-[300px] lg:h-[360px] lg:w-[360px]"
              onHoverStart={() => setIsHeroHovered(true)}
              onHoverEnd={() => setIsHeroHovered(false)}
              animate={
                isHeroHovered
                  ? { rotate: 0, scale: 1 }
                  : {
                      rotate: [0, 1.2, -1.2, 0],
                      scale: [1, 1.01, 1],
                    }
              }
              transition={
                isHeroHovered
                  ? { duration: 0.3, ease: "easeOut" }
                  : {
                      duration: 12,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }
              }
              whileHover={{
                scale: 1.05,
                rotate: 2.5,
                filter: "drop-shadow(0 18px 30px rgba(107, 86, 69, 0.12))",
              }}
              style={{ willChange: "transform" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  x: (pointer.x - 0.5) * 18,
                  y: (pointer.y - 0.5) * 12,
                }}
                transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.7 }}
              >
                <div className="absolute left-1/2 top-1/2 h-[1px] w-[80%] -translate-x-1/2 -translate-y-1/2 bg-[#171411]/10" />
                <div className="absolute left-1/2 top-1/2 h-[80%] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[#171411]/10" />
              </motion.div>

              <motion.div
                animate={
                  isHeroHovered
                    ? { rotate: 0, scale: 1 }
                    : {
                        rotate: [0, 2.2, -2.2, 0],
                        scale: [1, 1.04, 1],
                      }
                }
                transition={
                  isHeroHovered
                    ? { duration: 0.3, ease: "easeOut" }
                    : {
                        duration: 12,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                      }
                }
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                }}
                className="absolute left-1/2 top-1/2 flex h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#8b6d5a]/50 bg-[#f7f1ea] shadow-[0_0_25px_rgba(139,109,90,0.18)] sm:h-[130px] sm:w-[130px] lg:h-[150px] lg:w-[150px]"
                style={{
                  x: (pointer.x - 0.5) * 18,
                  y: (pointer.y - 0.5) * 12,
                  willChange: "transform",
                }}
              >
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#171411] sm:text-base">
                  MMT
                </span>
              </motion.div>

              {securityNodes.map((node, index) => (
                <motion.div
                  key={node.name}
                  animate={
                    isHeroHovered
                      ? { rotate: 0, scale: 1 }
                      : {
                          y: [0, -3, 0],
                          opacity: [0.9, 1, 0.95],
                          scale: [1, 1.02, 1],
                        }
                  }
                  transition={
                    isHeroHovered
                      ? { duration: 0.3, ease: "easeOut" }
                      : {
                          duration: 10 + index * 0.8,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: index * 0.12,
                        }
                  }
                  whileHover={{
                    scale: 1.08,
                    y: -6,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: node.x,
                    top: node.y,
                    x: (pointer.x - 0.5) * 10,
                    y: (pointer.y - 0.5) * 8,
                    willChange: "transform",
                  }}
                >
                  <div
                    className="rounded-full border border-[#171411]/15 bg-white/90 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-[#171411] shadow-[0_0_18px_rgba(139,109,90,0.08)] transition-all duration-200 hover:border-[#8b6d5a] hover:text-[#8b6d5a] sm:text-[10px]"
                    style={{
                      whiteSpace: "pre-line",
                      lineHeight: "1.2",
                      textAlign: "center",
                      maxWidth: "90px",
                    }}
                  >
                    {node.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
              Security-minded, systems-focused, and practical.
            </h2>
          </div>

          <div className="space-y-4 text-base leading-7 text-[#403a35]">
            <p>
              I work at the intersection of cybersecurity, IT infrastructure, and
              operational reliability—helping organizations protect systems,
              investigate incidents, and keep digital environments secure and
              dependable.
            </p>
            <p>
              My experience includes security operations, access management, network
              troubleshooting, endpoint protection, application security support, and
              vulnerability remediation across real-world environments.
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#171411] md:text-5xl">
            Experience.
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
                Investigated malware infections, suspicious activity, and security
                events; monitored endpoint protection, patching, and vulnerability
                remediation; managed Microsoft 365 and Active Directory access;
                configured and troubleshot network services including TCP/IP, DNS,
                DHCP, VPN, routers, switches, and wireless connectivity.
              </p>
            </article>

            <article
              className="rounded-[24px] border border-[#171411]/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={indiaMapCardStyle}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
                    July 2025 — May 2026
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
                Developed and maintained secure web applications, applied secure coding
                practices, performed code reviews, fixed application vulnerabilities,
                and supported application security and reliability improvements.
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
                Conducted penetration tests and vulnerability assessments using OWASP
                ZAP, Burp Suite, Nessus, Nmap, and SQLMap; documented findings,
                supported incident handling activities, and maintained security
                reporting work.
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
                Through organized analysis and reporting, I helped track problems with data quality and look into discrepancies.
                Maintained records, reports, and validation outcomes to support documentation and governance procedures.
                Worked with cross-functional teams to find and fix data-related problems that had an impact on company operations.
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
                Designed and developed a user-friendly online grocery management interface.
                Developed secure web applications, applying secure coding practices to prevent common vulnerabilities such as SQL Injection and Cross-Site Scripting (XSS).
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
            Core technical capability.
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
            Tools and security practices.
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
                Let&apos;s secure and improve your systems.
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
          <span>Next.js • TypeScript • Tailwind</span>
          <a href="#home" className="hover:text-[#171411]">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}