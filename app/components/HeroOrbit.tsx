"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const securityNodes = [
  { name: "CYBER SECURITY", x: "50%", y: "9%" },
  { name: "DEVELOPMENT", x: "25%", y: "22%" },
  { name: "VAPT", x: "13%", y: "43%" },
  { name: "WAZUH", x: "20%", y: "67%" },
  { name: "NETWORK", x: "38%", y: "87%" },
  { name: "SIEM", x: "73%", y: "22%" },
  { name: "NESSUS", x: "87%", y: "43%" },
  { name: "IAM", x: "75%", y: "67%" },
  { name: "ACTIVE\nDIRECTORY", x: "70%", y: "87%" },
];

// Kept separate from the page so pointer updates only re-render this graphic.
export default function HeroOrbit() {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPointer({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
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
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={
          isHovered
            ? { rotate: 0, scale: 1 }
            : {
                rotate: [0, 1.2, -1.2, 0],
                scale: [1, 1.01, 1],
              }
        }
        transition={
          isHovered
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
            isHovered
              ? { rotate: 0, scale: 1 }
              : {
                  rotate: [0, 2.2, -2.2, 0],
                  scale: [1, 1.04, 1],
                }
          }
          transition={
            isHovered
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
              isHovered
                ? { rotate: 0, scale: 1 }
                : {
                    y: [0, -3, 0],
                    opacity: [0.9, 1, 0.95],
                    scale: [1, 1.02, 1],
                  }
            }
            transition={
              isHovered
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
                whiteSpace: "pre",
                lineHeight: "1.2",
                textAlign: "center",
              }}
            >
              {node.name}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
