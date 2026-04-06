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

const nodes: Node[] = [
  // Main central node
  { x: 380, y: 340, r: 32, color: "#4ECDC4", bg: "#4ECDC4", label: "Unlocked AEO", floatX: 8, floatY: -10, floatDuration: 5 },
  // AI Engine nodes
  { x: 180, y: 180, r: 18, color: "#10A37F", bg: "#EAF5F0", label: "ChatGPT", slug: "chatgpt", floatX: -12, floatY: 8, floatDuration: 6 },
  { x: 560, y: 160, r: 16, color: "#20808D", bg: "#E8F4F5", label: "Perplexity", slug: "perplexity", floatX: 10, floatY: -12, floatDuration: 7 },
  { x: 620, y: 380, r: 17, color: "#4285F4", bg: "#FFFFFF", label: "Gemini", slug: "gemini", floatX: -8, floatY: 10, floatDuration: 5.5 },
  { x: 520, y: 540, r: 15, color: "#0A2540", bg: "#F5F5F5", label: "Grok", slug: "grok", floatX: 12, floatY: -8, floatDuration: 6.5 },
  { x: 200, y: 500, r: 18, color: "#D97757", bg: "#FDF0EB", label: "Claude", slug: "claude", floatX: -10, floatY: -6, floatDuration: 7.5 },
  { x: 400, y: 140, r: 16, color: "#2870EA", bg: "#EEF3FF", label: "Copilot", slug: "copilot", floatX: -6, floatY: 10, floatDuration: 6.8 },
  // Signal/data nodes
  { x: 300, y: 220, r: 6, color: "#4ECDC4", bg: "", floatX: 6, floatY: -8, floatDuration: 4 },
  { x: 480, y: 260, r: 5, color: "#635BFF", bg: "", floatX: -8, floatY: 6, floatDuration: 4.5 },
  { x: 450, y: 450, r: 7, color: "#4ECDC4", bg: "", floatX: 10, floatY: 5, floatDuration: 5 },
  { x: 260, y: 400, r: 5, color: "#635BFF", bg: "", floatX: -6, floatY: -10, floatDuration: 3.5 },
  { x: 350, y: 150, r: 4, color: "#8792A2", bg: "", floatX: 5, floatY: 8, floatDuration: 4.2 },
  { x: 550, y: 470, r: 4, color: "#8792A2", bg: "", floatX: -7, floatY: -5, floatDuration: 3.8 },
  { x: 150, y: 350, r: 5, color: "#4ECDC4", bg: "", floatX: 8, floatY: -6, floatDuration: 5.2 },
  { x: 650, y: 270, r: 4, color: "#8792A2", bg: "", floatX: -5, floatY: 10, floatDuration: 4.8 },
  // Extra signal nodes
  { x: 320, y: 480, r: 4, color: "#4ECDC4", bg: "", floatX: -7, floatY: 6, floatDuration: 4.6 },
  { x: 500, y: 340, r: 5, color: "#635BFF", bg: "", floatX: 6, floatY: -9, floatDuration: 3.9 },
  { x: 420, y: 200, r: 4, color: "#8792A2", bg: "", floatX: -5, floatY: 7, floatDuration: 5.1 },
  { x: 280, y: 300, r: 5, color: "#4ECDC4", bg: "", floatX: 9, floatY: -4, floatDuration: 4.3 },
  { x: 580, y: 300, r: 4, color: "#635BFF", bg: "", floatX: -6, floatY: -8, floatDuration: 4.7 },
  { x: 340, y: 560, r: 3, color: "#8792A2", bg: "", floatX: 4, floatY: 7, floatDuration: 3.6 },
];

const connections: [number, number][] = [
  // Center to engines
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  // Center to signal nodes
  [0, 7], [0, 8], [0, 9], [0, 10], [0, 16], [0, 18],
  // Engine to nearby signals
  [1, 7], [1, 11], [1, 13], [1, 18],
  [2, 8], [2, 14], [2, 17], [2, 19],
  [3, 9], [3, 14], [3, 16], [3, 19],
  [4, 9], [4, 12], [4, 15], [4, 20],
  [5, 10], [5, 13], [5, 15], [5, 20],
  [6, 7], [6, 11], [6, 17], [6, 8],
  // Signal to signal (cross-connections)
  [7, 11], [7, 17], [7, 18],
  [8, 14], [8, 17], [8, 19],
  [9, 12], [9, 16],
  [10, 13], [10, 15], [10, 18],
  [11, 17], [12, 20], [13, 15],
  [14, 19], [16, 9], [18, 7],
  // Engine cross-links
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 1], [6, 1], [6, 2],
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
      viewBox="0 0 760 680"
      className="absolute right-0 top-[-20px] w-[50%] h-[700px] overflow-visible pointer-events-auto"
      style={{ minWidth: "700px" }}
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

      <circle cx="380" cy="340" r="220" fill="url(#hero-glow-1)" />
      <circle cx="500" cy="250" r="180" fill="url(#hero-glow-2)" />

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
