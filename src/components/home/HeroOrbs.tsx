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

// Network centered at (380, 330) within 760x660 viewBox
const CX = 380;
const CY = 330;
const ER = 180;

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
  // 0: Center
  { x: CX, y: CY, r: 36, color: "#4ECDC4", bg: "#4ECDC4", label: "Unlocked AEO", floatX: 5, floatY: -6, floatDuration: 5 },
  // 1-6: AI Engines in hexagon
  { x: CX, y: CY - ER, r: 20, color: "#10A37F", bg: "#EAF5F0", label: "ChatGPT", slug: "chatgpt", floatX: -6, floatY: 8, floatDuration: 6 },
  { x: CX + ER * 0.87, y: CY - ER * 0.5, r: 18, color: "#20808D", bg: "#E8F4F5", label: "Perplexity", slug: "perplexity", floatX: 8, floatY: -6, floatDuration: 7 },
  { x: CX + ER * 0.87, y: CY + ER * 0.5, r: 18, color: "#4285F4", bg: "#FFFFFF", label: "Gemini", slug: "gemini", floatX: -8, floatY: 6, floatDuration: 5.5 },
  { x: CX, y: CY + ER, r: 18, color: "#0A2540", bg: "#F5F5F5", label: "Grok", slug: "grok", floatX: 6, floatY: -8, floatDuration: 6.5 },
  { x: CX - ER * 0.87, y: CY + ER * 0.5, r: 20, color: "#D97757", bg: "#FDF0EB", label: "Claude", slug: "claude", floatX: -8, floatY: -5, floatDuration: 7.5 },
  { x: CX - ER * 0.87, y: CY - ER * 0.5, r: 18, color: "#2870EA", bg: "#EEF3FF", label: "Copilot", slug: "copilot", floatX: 6, floatY: 8, floatDuration: 6.8 },
];

const connections: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
  [1, 4], [2, 5], [3, 6],
  [1, 3], [2, 4], [3, 5], [4, 6], [5, 1], [6, 2],
];

export function HeroOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const blob3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const nodeEls = svg.querySelectorAll<SVGGElement>(".orb-node");
    const lineEls = svg.querySelectorAll<SVGLineElement>(".orb-line");
    const pulseEls = svg.querySelectorAll<SVGCircleElement>(".orb-pulse");
    const labelEls = svg.querySelectorAll<SVGTextElement>(".orb-label");

    const ctx = gsap.context(() => {
      // Blobs: gentle continuous float
      gsap.to(blob1.current, { y: -20, x: 15, scale: 1.03, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(blob2.current, { y: 25, x: -20, scale: 0.97, rotation: 5, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
      gsap.to(blob3.current, { y: -15, x: -10, scale: 1.04, rotation: -3, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });

      // Nodes pop in
      gsap.from(nodeEls, {
        scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2)",
        stagger: { each: 0.08, from: "center" }, delay: 0.4, transformOrigin: "center center",
      });

      // Lines draw in
      lineEls.forEach((line) => {
        const length = line.getTotalLength?.() || 200;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out", delay: 0.7 + Math.random() * 0.6 });
      });

      // Pulse rings
      pulseEls.forEach((pulse, i) => {
        gsap.to(pulse, {
          scale: 2.5, opacity: 0, duration: 2.2, ease: "power1.out",
          repeat: -1, delay: 1.5 + i * 0.35, transformOrigin: "center center",
        });
      });

      // Float all nodes
      nodeEls.forEach((el, i) => {
        const node = nodes[i];
        if (!node) return;
        gsap.to(el, {
          x: node.floatX, y: node.floatY, duration: node.floatDuration,
          ease: "sine.inOut", yoyo: true, repeat: -1,
        });
      });

      // Lines breathe
      lineEls.forEach((line, i) => {
        gsap.to(line, {
          opacity: 0.06 + Math.random() * 0.1, duration: 2 + Math.random() * 2,
          ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.08,
        });
      });

      // Discovery flashes
      const flashConnection = () => {
        const count = 1 + Math.floor(Math.random() * 2);
        for (let c = 0; c < count; c++) {
          const line = lineEls[Math.floor(Math.random() * lineEls.length)];
          if (!line) continue;
          gsap.to(line, {
            opacity: 0.6, strokeWidth: 2.5, duration: 0.2, ease: "power2.out", delay: c * 0.15,
            onComplete: () => {
              gsap.to(line, { opacity: 0.1, strokeWidth: 1, duration: 1.2, ease: "power2.out" });
            },
          });
        }
      };
      const discoveryInterval = setInterval(flashConnection, 1800);

      // Labels fade in
      gsap.from(labelEls, { opacity: 0, y: 8, duration: 0.5, ease: "power2.out", stagger: 0.08, delay: 1.0 });

      // Mouse interaction
      const handleMouseMove = (e: MouseEvent) => {
        const rect = svg.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 760;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 660;

        nodeEls.forEach((el, i) => {
          const node = nodes[i];
          if (!node) return;
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const force = (1 - dist / 220) * 0.5;
            gsap.to(el, {
              x: node.floatX + dx * force * 0.06,
              y: node.floatY + dy * force * 0.06,
              duration: 0.6, ease: "power2.out", overwrite: "auto",
            });
          }
        });

        lineEls.forEach((line, idx) => {
          const [from, to] = connections[idx];
          const cx = (nodes[from].x + nodes[to].x) / 2;
          const cy = (nodes[from].y + nodes[to].y) / 2;
          const dist = Math.sqrt((mouseX - cx) ** 2 + (mouseY - cy) ** 2);
          if (dist < 130) {
            gsap.to(line, {
              opacity: 0.15 + (1 - dist / 130) * 0.45,
              strokeWidth: 1 + (1 - dist / 130) * 1.5,
              duration: 0.3, ease: "power2.out", overwrite: "auto",
            });
          }
        });
      };

      const handleMouseLeave = () => {
        nodeEls.forEach((el, i) => {
          const node = nodes[i];
          if (!node) return;
          gsap.to(el, { x: node.floatX, y: node.floatY, duration: 1.2, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
        });
        lineEls.forEach((line) => {
          gsap.to(line, { opacity: 0.1, strokeWidth: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" });
        });
      };

      svg.addEventListener("mousemove", handleMouseMove);
      svg.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        clearInterval(discoveryInterval);
        svg.removeEventListener("mousemove", handleMouseMove);
        svg.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-y-0 right-0 w-[55%] overflow-hidden pointer-events-none">
      {/* Large ambient gradient — centered behind the network */}
      <div
        ref={blob1}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full will-change-transform opacity-85"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(78,205,196,0.45) 0%, rgba(78,205,196,0.25) 25%, rgba(78,205,196,0.10) 45%, rgba(240,253,250,0.4) 60%, transparent 75%)",
        }}
      />
      <div
        ref={blob2}
        className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[55%] w-[750px] h-[750px] rounded-full will-change-transform"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(99, 91, 255, 0.2) 0%, rgba(99, 91, 255, 0.06) 40%, transparent 65%)",
        }}
      />
      <div
        ref={blob3}
        className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[40%] w-[650px] h-[650px] rounded-full will-change-transform"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(78, 205, 196, 0.22) 0%, rgba(78, 205, 196, 0.06) 40%, transparent 65%)",
        }}
      />

      {/* Network SVG overlaid on top */}
      <svg
        ref={svgRef}
        viewBox="0 0 760 660"
        className="absolute inset-0 w-full h-full pointer-events-auto"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
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
            {/* Pulse ring for engines */}
            {i >= 1 && i <= 6 && (
              <circle className="orb-pulse" cx={node.x} cy={node.y} r={node.r} fill="none" stroke={node.color} strokeWidth="1" opacity="0.4" />
            )}

            {/* Circle */}
            <circle cx={node.x} cy={node.y} r={node.r} fill={node.bg} stroke={node.color} strokeWidth={i === 0 ? 0 : 1.5} />

            {/* Center logo */}
            {i === 0 && (
              <>
                <clipPath id="center-clip"><circle cx={node.x} cy={node.y} r={node.r} /></clipPath>
                <image href={logoSvg} x={node.x - node.r} y={node.y - node.r} width={node.r * 2} height={node.r * 2} clipPath="url(#center-clip)" />
              </>
            )}

            {/* Engine logos */}
            {i >= 1 && i <= 6 && node.slug && (
              <>
                <clipPath id={`engine-clip-${i}`}><circle cx={node.x} cy={node.y} r={node.r - 2} /></clipPath>
                <image href={engineLogos[node.slug]} x={node.x - (node.r - 4)} y={node.y - (node.r - 4)} width={(node.r - 4) * 2} height={(node.r - 4) * 2} clipPath={`url(#engine-clip-${i})`} />
              </>
            )}

            {/* Labels */}
            {node.label && (
              <text className="orb-label" x={node.x} y={node.y + node.r + 14} textAnchor="middle" fill={i === 0 ? "#0A2540" : "#8792A2"} fontSize={i === 0 ? "11" : "9"} fontFamily="Inter" fontWeight={i === 0 ? "700" : "500"}>
                {node.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
