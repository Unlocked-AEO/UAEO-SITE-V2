import { useEffect, useRef } from "react";
import gsap from "gsap";
import logoSvg from "@/assets/logo.svg";
import openaiLogo from "@/assets/openai-logo.svg";
import perplexityLogo from "@/assets/perplexity-logo.svg";
import geminiLogo from "@/assets/gemini-logo.svg";
import grokLogo from "@/assets/grok-logo.svg";
import claudeLogo from "@/assets/claude-logo.svg";
import copilotLogo from "@/assets/copilot-logo.svg";

const engineLogos: Record<string, string> = {
  chatgpt: openaiLogo,
  perplexity: perplexityLogo,
  gemini: geminiLogo,
  grok: grokLogo,
  claude: claudeLogo,
  copilot: copilotLogo,
};

interface Node {
  x: number;
  y: number;
  r: number;
  color: string;
  bg: string;
  label?: string;
  slug?: string;
  floatX: number;
  floatY: number;
  floatDuration: number;
}

// Center at (420, 380). Engines evenly spaced in a hexagon at radius ~210
const CX = 420;
const CY = 380;
const ER = 210; // engine orbit radius

const nodes: Node[] = [
  // 0: Center
  { x: CX, y: CY, r: 38, color: "#4ECDC4", bg: "#4ECDC4", label: "Unlocked AEO", floatX: 6, floatY: -8, floatDuration: 5 },
  // 1-6: AI Engines — hexagonal placement (60° apart, starting top)
  { x: CX, y: CY - ER, r: 22, color: "#10A37F", bg: "#EAF5F0", label: "ChatGPT", slug: "chatgpt", floatX: -8, floatY: 10, floatDuration: 6 },
  { x: CX + ER * 0.87, y: CY - ER * 0.5, r: 20, color: "#20808D", bg: "#E8F4F5", label: "Perplexity", slug: "perplexity", floatX: 10, floatY: -8, floatDuration: 7 },
  { x: CX + ER * 0.87, y: CY + ER * 0.5, r: 20, color: "#4285F4", bg: "#FFFFFF", label: "Gemini", slug: "gemini", floatX: -10, floatY: 8, floatDuration: 5.5 },
  { x: CX, y: CY + ER, r: 20, color: "#0A2540", bg: "#F5F5F5", label: "Grok", slug: "grok", floatX: 8, floatY: -10, floatDuration: 6.5 },
  { x: CX - ER * 0.87, y: CY + ER * 0.5, r: 22, color: "#D97757", bg: "#FDF0EB", label: "Claude", slug: "claude", floatX: -10, floatY: -6, floatDuration: 7.5 },
  { x: CX - ER * 0.87, y: CY - ER * 0.5, r: 20, color: "#2870EA", bg: "#EEF3FF", label: "Copilot", slug: "copilot", floatX: 8, floatY: 10, floatDuration: 6.8 },
  // 7-22: Signal/data nodes — scattered between and around engines
  { x: CX - 60, y: CY - 130, r: 6, color: "#4ECDC4", bg: "", floatX: 6, floatY: -8, floatDuration: 4 },
  { x: CX + 80, y: CY - 100, r: 5, color: "#635BFF", bg: "", floatX: -8, floatY: 6, floatDuration: 4.5 },
  { x: CX + 130, y: CY + 20, r: 6, color: "#4ECDC4", bg: "", floatX: 10, floatY: 5, floatDuration: 5 },
  { x: CX + 70, y: CY + 120, r: 5, color: "#635BFF", bg: "", floatX: -6, floatY: -10, floatDuration: 3.5 },
  { x: CX - 80, y: CY - 50, r: 5, color: "#8792A2", bg: "", floatX: 5, floatY: 8, floatDuration: 4.2 },
  { x: CX + 50, y: CY + 50, r: 4, color: "#8792A2", bg: "", floatX: -7, floatY: -5, floatDuration: 3.8 },
  { x: CX - 130, y: CY + 20, r: 5, color: "#4ECDC4", bg: "", floatX: 8, floatY: -6, floatDuration: 5.2 },
  { x: CX + 140, y: CY - 50, r: 4, color: "#8792A2", bg: "", floatX: -5, floatY: 10, floatDuration: 4.8 },
  { x: CX - 50, y: CY + 130, r: 5, color: "#4ECDC4", bg: "", floatX: -7, floatY: 6, floatDuration: 4.6 },
  { x: CX + 20, y: CY - 50, r: 5, color: "#635BFF", bg: "", floatX: 6, floatY: -9, floatDuration: 3.9 },
  { x: CX + 40, y: CY - 170, r: 4, color: "#8792A2", bg: "", floatX: -5, floatY: 7, floatDuration: 5.1 },
  { x: CX - 100, y: CY + 100, r: 5, color: "#4ECDC4", bg: "", floatX: 9, floatY: -4, floatDuration: 4.3 },
  { x: CX + 160, y: CY + 100, r: 4, color: "#635BFF", bg: "", floatX: -6, floatY: -8, floatDuration: 4.7 },
  { x: CX - 40, y: CY + 170, r: 4, color: "#8792A2", bg: "", floatX: 4, floatY: 7, floatDuration: 3.6 },
  { x: CX - 150, y: CY - 100, r: 4, color: "#635BFF", bg: "", floatX: -5, floatY: -6, floatDuration: 4.1 },
  { x: CX + 100, y: CY - 160, r: 5, color: "#4ECDC4", bg: "", floatX: 7, floatY: -5, floatDuration: 4.4 },
];

const connections: [number, number][] = [
  // Center to all engines
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  // Center to signal nodes
  [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 16],
  // Engine to nearby signals
  [1, 7], [1, 8], [1, 17], [1, 22], [1, 16],
  [2, 8], [2, 9], [2, 14], [2, 22],
  [3, 9], [3, 10], [3, 12], [3, 19],
  [4, 10], [4, 15], [4, 18], [4, 20],
  [5, 13], [5, 15], [5, 18], [5, 20],
  [6, 7], [6, 11], [6, 13], [6, 21],
  // Engine hexagon ring
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
  // Engine cross-diagonals
  [1, 4], [2, 5], [3, 6],
  // Signal to signal mesh
  [7, 11], [7, 16], [7, 21],
  [8, 14], [8, 16], [8, 22],
  [9, 14], [9, 19], [9, 12],
  [10, 19], [10, 15], [10, 12],
  [11, 13], [11, 21],
  [12, 16],
  [13, 21], [13, 18],
  [14, 22],
  [15, 20], [15, 18],
  [17, 7], [17, 22],
  [18, 20],
  [19, 10],
  [21, 6],
];

export function HeroOrbs() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const nodeEls = svg.querySelectorAll<SVGGElement>(".orb-node");
    const lineEls = svg.querySelectorAll<SVGLineElement>(".orb-line");
    const pulseEls = svg.querySelectorAll<SVGCircleElement>(".orb-pulse");
    const labelEls = svg.querySelectorAll<SVGTextElement>(".orb-label");

    const ctx = gsap.context(() => {
      // 1. Nodes pop in
      gsap.from(nodeEls, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2)",
        stagger: { each: 0.06, from: "center" },
        delay: 0.3,
        transformOrigin: "center center",
      });

      // 2. Connections draw in
      lineEls.forEach((line) => {
        const length = line.getTotalLength?.() || 200;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.6 + Math.random() * 0.8,
        });
      });

      // 3. Pulse rings
      pulseEls.forEach((pulse, i) => {
        gsap.to(pulse, {
          scale: 2.5,
          opacity: 0,
          duration: 2.2,
          ease: "power1.out",
          repeat: -1,
          delay: 1.5 + i * 0.35,
          transformOrigin: "center center",
        });
      });

      // 4. Float all nodes
      nodeEls.forEach((el, i) => {
        const node = nodes[i];
        if (!node) return;
        gsap.to(el, {
          x: node.floatX,
          y: node.floatY,
          duration: node.floatDuration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // 5. Lines breathe
      lineEls.forEach((line, i) => {
        gsap.to(line, {
          opacity: 0.06 + Math.random() * 0.12,
          duration: 2 + Math.random() * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.1,
        });
      });

      // 6. Discovery flashes — faster, multiple at once
      const flashConnection = () => {
        const count = 1 + Math.floor(Math.random() * 2);
        for (let c = 0; c < count; c++) {
          const idx = Math.floor(Math.random() * lineEls.length);
          const line = lineEls[idx];
          if (!line) continue;

          gsap.to(line, {
            opacity: 0.7,
            strokeWidth: 2.5,
            duration: 0.2,
            ease: "power2.out",
            delay: c * 0.15,
            onComplete: () => {
              gsap.to(line, {
                opacity: 0.1,
                strokeWidth: 1,
                duration: 1.2,
                ease: "power2.out",
              });
            },
          });
        }
      };

      const discoveryInterval = setInterval(flashConnection, 1500);

      // 7. Labels fade in
      gsap.from(labelEls, {
        opacity: 0,
        y: 8,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        delay: 1.0,
      });

      // --- Mouse interaction ---
      const handleMouseMove = (e: MouseEvent) => {
        const rect = svg.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const svgW = rect.width;
        const svgH = rect.height;

        // Normalize mouse to SVG viewBox coordinates
        const mouseX = (mx / svgW) * 760;
        const mouseY = (my / svgH) * 680;

        // Move nodes toward/away from cursor based on distance
        nodeEls.forEach((el, i) => {
          const node = nodes[i];
          if (!node) return;
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 0.6;
            // Engine nodes attract toward cursor, signal nodes repel
            const direction = i <= 6 ? 1 : -1;
            gsap.to(el, {
              x: node.floatX + dx * force * 0.08 * direction,
              y: node.floatY + dy * force * 0.08 * direction,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });

        // Brighten nearby connections
        lineEls.forEach((line, idx) => {
          const [from, to] = connections[idx];
          const cx = (nodes[from].x + nodes[to].x) / 2;
          const cy = (nodes[from].y + nodes[to].y) / 2;
          const dist = Math.sqrt((mouseX - cx) ** 2 + (mouseY - cy) ** 2);

          if (dist < 150) {
            const brightness = 0.15 + (1 - dist / 150) * 0.5;
            gsap.to(line, {
              opacity: brightness,
              strokeWidth: 1 + (1 - dist / 150) * 1.5,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      };

      const handleMouseLeave = () => {
        // Reset nodes to their float positions
        nodeEls.forEach((el, i) => {
          const node = nodes[i];
          if (!node) return;
          gsap.to(el, {
            x: node.floatX,
            y: node.floatY,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });
        });

        // Reset lines
        lineEls.forEach((line) => {
          gsap.to(line, {
            opacity: 0.1,
            strokeWidth: 1,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      svg.addEventListener("mousemove", handleMouseMove);
      svg.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        clearInterval(discoveryInterval);
        svg.removeEventListener("mousemove", handleMouseMove);
        svg.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 840 760"
      className="absolute right-[-40px] top-[-40px] w-[55%] h-[780px] overflow-visible pointer-events-auto"
      style={{ minWidth: "780px" }}
      fill="none"
    >
      {/* Ambient background glow */}
      <defs>
        <radialGradient id="hero-glow-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-glow-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#635BFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#635BFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="420" cy="380" r="260" fill="url(#hero-glow-1)" />
      <circle cx="540" cy="280" r="200" fill="url(#hero-glow-2)" />

      {/* Connection lines */}
      {connections.map(([from, to], i) => (
        <line
          key={`line-${i}`}
          className="orb-line"
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="#4ECDC4"
          strokeWidth="1"
          opacity="0.1"
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`} className="orb-node">
          {/* Pulse ring for AI engine nodes */}
          {i >= 1 && i <= 6 && (
            <circle
              className="orb-pulse"
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="none"
              stroke={node.color}
              strokeWidth="1"
              opacity="0.4"
            />
          )}

          {/* Main circle */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={i <= 5 ? node.bg : "transparent"}
            stroke={node.color}
            strokeWidth={i === 0 ? 0 : i <= 5 ? 1.5 : 1}
            opacity={i <= 6 ? 1 : 0.5}
          />

          {/* Inner dot for signal nodes */}
          {i > 6 && (
            <circle cx={node.x} cy={node.y} r={node.r * 0.5} fill={node.color} opacity="0.6" />
          )}

          {/* Center node — Unlocked AEO logo */}
          {i === 0 && (
            <>
              <clipPath id="center-clip">
                <circle cx={node.x} cy={node.y} r={node.r} />
              </clipPath>
              <image
                href={logoSvg}
                x={node.x - node.r}
                y={node.y - node.r}
                width={node.r * 2}
                height={node.r * 2}
                clipPath="url(#center-clip)"
              />
            </>
          )}

          {/* AI Engine logos inside their circles */}
          {i >= 1 && i <= 6 && node.slug && (
            <>
              <clipPath id={`engine-clip-${i}`}>
                <circle cx={node.x} cy={node.y} r={node.r - 2} />
              </clipPath>
              <image
                href={engineLogos[node.slug]}
                x={node.x - (node.r - 4)}
                y={node.y - (node.r - 4)}
                width={(node.r - 4) * 2}
                height={(node.r - 4) * 2}
                clipPath={`url(#engine-clip-${i})`}
              />
            </>
          )}

          {/* Labels */}
          {node.label && (
            <text
              className="orb-label"
              x={node.x}
              y={node.y + node.r + 14}
              textAnchor="middle"
              fill={i === 0 ? "#0A2540" : "#8792A2"}
              fontSize={i === 0 ? "11" : "9"}
              fontFamily="Inter"
              fontWeight={i === 0 ? "700" : "500"}
            >
              {node.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
