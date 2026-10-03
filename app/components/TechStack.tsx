"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  Bug,
  ChartColumn,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers,
  Network,
  Radar,
  ScanSearch,
  Server,
  Settings,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Category = "Security" | "Infrastructure" | "Development" | "Data";

type Technology = {
  name: string;
  category: Category;
  icon: LucideIcon;
  description: string;
};

const technologies: Technology[] = [
  { name: "Wazuh", category: "Security", icon: Activity, description: "SIEM for log collection, alerting and endpoint event investigation" },
  { name: "Nessus", category: "Security", icon: ScanSearch, description: "Vulnerability scanning and remediation tracking" },
  { name: "Nmap", category: "Security", icon: Radar, description: "Network discovery, port and service enumeration" },
  { name: "Burp Suite", category: "Security", icon: Bug, description: "Web application testing and request manipulation" },
  { name: "Wireshark", category: "Security", icon: Network, description: "Packet capture and traffic analysis" },
  { name: "Kali Linux", category: "Security", icon: Terminal, description: "Penetration testing and attack simulation in the lab" },
  { name: "Active Directory", category: "Infrastructure", icon: Users, description: "Users, groups, access permissions and Group Policy" },
  { name: "Windows Server", category: "Infrastructure", icon: Server, description: "Server administration, patching, backup and restore" },
  { name: "Linux", category: "Infrastructure", icon: Terminal, description: "Linux administration and server support" },
  { name: "Microsoft 365", category: "Infrastructure", icon: Settings, description: "User accounts, licences and access management" },
  { name: "TCP/IP, DNS, DHCP", category: "Infrastructure", icon: Globe, description: "Network troubleshooting, VPN, routing and switching" },
  { name: "Python", category: "Development", icon: Code2, description: "Automation, scripting and backend development" },
  { name: "Java", category: "Development", icon: Code2, description: "Application and backend development" },
  { name: "Django", category: "Development", icon: Layers, description: "Python web framework used in project work" },
  { name: "PowerShell", category: "Development", icon: Terminal, description: "Windows administration and scripting" },
  { name: "Git & GitHub", category: "Development", icon: GitBranch, description: "Version control and code review" },
  { name: "SQL / MySQL", category: "Data", icon: Database, description: "Queries, reporting and relational data management" },
  { name: "Power BI", category: "Data", icon: ChartColumn, description: "Dashboards and data quality reporting" },
];

const categories: ("All" | Category)[] = ["All", "Security", "Infrastructure", "Development", "Data"];

const ORBIT_HEIGHT = 600;

// Splits the list across an inner and outer ellipse so cards never overlap.
function getOrbitPositions(count: number, width: number) {
  const outerRx = Math.min(470, width / 2 - 90);
  const innerRx = outerRx * 0.55;
  const innerCount = Math.ceil(count * 0.4);
  const outerCount = count - innerCount;

  return Array.from({ length: count }, (_, index) => {
    const isInner = index < innerCount;
    const ringIndex = isInner ? index : index - innerCount;
    const ringCount = isInner ? innerCount : outerCount;
    const offset = isInner ? 0 : Math.PI / ringCount;
    const angle = -Math.PI / 2 + offset + (ringIndex / ringCount) * Math.PI * 2;

    return {
      x: Math.cos(angle) * (isInner ? innerRx : outerRx),
      y: Math.sin(angle) * (isInner ? 135 : 230),
    };
  });
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);
  const [width, setWidth] = useState(1100);
  const areaRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [4, -4]);
  const rotateY = useTransform(springX, [-300, 300], [-4, 4]);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  const positions = getOrbitPositions(technologies.length, width);
  const outerRx = Math.min(470, width / 2 - 90);
  const isDimmed = (tech: Technology) =>
    activeCategory !== "All" && tech.category !== activeCategory;

  return (
    <section id="tech-stack" className="mx-auto max-w-7xl px-5 py-20">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5c544d]">
            Tech Stack
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[#171411] md:text-5xl">
            Tools I work with.
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors ${
                activeCategory === category
                  ? "border-[#171411] bg-[#171411] text-white"
                  : "border-[#171411]/15 bg-white text-[#171411]/70 hover:bg-[#efe8df] hover:text-[#171411]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Orbit layout, large screens */}
      <div
        ref={areaRef}
        className="relative hidden overflow-hidden rounded-[30px] border border-[#171411]/10 bg-[#efe8df] lg:block"
        style={{ height: ORBIT_HEIGHT, perspective: 1200 }}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          mouseX.set(event.clientX - rect.left - rect.width / 2);
          mouseY.set(event.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        <motion.div className="absolute inset-0" style={{ rotateX, rotateY }}>
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <ellipse cx="50%" cy="50%" rx={outerRx} ry={230} fill="none" stroke="rgba(23,20,17,0.1)" strokeDasharray="3 6" />
            <ellipse cx="50%" cy="50%" rx={outerRx * 0.55} ry={135} fill="none" stroke="rgba(23,20,17,0.1)" strokeDasharray="3 6" />
          </svg>

          <div className="absolute left-1/2 top-1/2 grid h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#8b6d5a]/50 bg-[#f7f1ea] shadow-[0_0_25px_rgba(139,109,90,0.18)]">
            <div className="text-center">
              <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-[#171411]">
                MMT
              </span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.18em] text-[#5c544d]">
                {technologies.length} tools
              </span>
            </div>
          </div>

          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            const dimmed = isDimmed(tech);

            return (
              <motion.div
                key={tech.name}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, x: positions[index].x, y: positions[index].y }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.03, ease: "easeOut" }}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div
                  className={`flex items-center gap-2.5 whitespace-nowrap rounded-full border bg-white py-1.5 pl-1.5 pr-4 shadow-sm transition-all duration-300 ${
                    dimmed
                      ? "border-[#171411]/5 opacity-30"
                      : "border-[#171411]/10 hover:-translate-y-0.5 hover:border-[#8b6d5a] hover:shadow-md"
                  }`}
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f7f1ea] text-[#8b6d5a]">
                    <Icon size={14} />
                  </span>
                  <span className="text-xs font-medium text-[#171411]">{tech.name}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-[#171411]/10 bg-[#f4efe9]/80 px-6 py-3 text-center backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#5c544d]">
            {hoveredTech ? (
              <>
                <span className="text-[#171411]">{hoveredTech.name}</span>
                <span className="mx-2 text-[#171411]/30">/</span>
                {hoveredTech.description}
              </>
            ) : (
              "Hover a tool to see how I use it"
            )}
          </p>
        </div>
      </div>

      {/* Grid layout, small screens */}
      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className={`flex items-start gap-3 rounded-[20px] border border-[#171411]/10 bg-white p-4 transition-opacity ${
                isDimmed(tech) ? "opacity-30" : ""
              }`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f7f1ea] text-[#8b6d5a]">
                <Icon size={15} />
              </span>
              <div>
                <p className="text-sm font-medium text-[#171411]">{tech.name}</p>
                <p className="mt-1 text-xs leading-5 text-[#403a35]">{tech.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
