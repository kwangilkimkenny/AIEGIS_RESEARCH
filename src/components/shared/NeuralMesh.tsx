"use client";

import { useEffect, useRef } from "react";

interface NeuralMeshProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  type: "hub" | "relay" | "endpoint";
  pulsePhase: number;
  pulseSpeed: number;
  color: [number, number, number]; // RGB
}

interface Particle {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  size: number;
  color: [number, number, number];
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export default function NeuralMesh({ variant = "hero", className = "" }: NeuralMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<PulseWave[]>([]);
  const timeRef = useRef(0);

  const config = {
    hero: {
      nodeCount: 55,
      connectionDistance: 180,
      speed: 0.35,
      hubCount: 6,
      relayCount: 15,
      particleRate: 0.04,
      maxParticles: 20,
      waveInterval: 180,
    },
    section: {
      nodeCount: 35,
      connectionDistance: 160,
      speed: 0.25,
      hubCount: 4,
      relayCount: 10,
      particleRate: 0.025,
      maxParticles: 12,
      waveInterval: 240,
    },
    subtle: {
      nodeCount: 20,
      connectionDistance: 140,
      speed: 0.18,
      hubCount: 2,
      relayCount: 6,
      particleRate: 0.015,
      maxParticles: 6,
      waveInterval: 300,
    },
  }[variant];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = {
      blue: [37, 99, 235] as [number, number, number],
      cyan: [6, 182, 212] as [number, number, number],
      indigo: [99, 102, 241] as [number, number, number],
      teal: [20, 184, 166] as [number, number, number],
    };
    const colorArr = [colors.blue, colors.cyan, colors.indigo, colors.teal];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const initNodes = () => {
      const rect = canvas.getBoundingClientRect();
      const nodes: Node[] = [];

      for (let i = 0; i < config.nodeCount; i++) {
        let type: Node["type"] = "endpoint";
        if (i < config.hubCount) type = "hub";
        else if (i < config.hubCount + config.relayCount) type = "relay";

        const baseRadius = type === "hub" ? 3.5 : type === "relay" ? 2 : 1;
        const speed = type === "hub" ? config.speed * 0.4 : type === "relay" ? config.speed * 0.7 : config.speed;

        nodes.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: baseRadius,
          baseRadius,
          type,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
          color: type === "hub" ? colors.cyan : colorArr[Math.floor(Math.random() * colorArr.length)],
        });
      }

      nodesRef.current = nodes;
      particlesRef.current = [];
      wavesRef.current = [];
      timeRef.current = 0;
    };

    const spawnParticle = (nodes: Node[]) => {
      if (particlesRef.current.length >= config.maxParticles) return;

      // Find two connected nodes
      const rect = canvas.getBoundingClientRect();
      for (let attempt = 0; attempt < 10; attempt++) {
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i === j) continue;

        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < config.connectionDistance) {
          particlesRef.current.push({
            fromIdx: i,
            toIdx: j,
            progress: 0,
            speed: 0.008 + Math.random() * 0.012,
            size: 1.5 + Math.random() * 1.5,
            color: colorArr[Math.floor(Math.random() * colorArr.length)],
          });
          return;
        }
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const nodes = nodesRef.current;
      const particles = particlesRef.current;
      const waves = wavesRef.current;
      timeRef.current++;

      // Update node positions & pulse
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20 || node.x > rect.width + 20) node.vx *= -1;
        if (node.y < -20 || node.y > rect.height + 20) node.vy *= -1;
        node.x = Math.max(-20, Math.min(rect.width + 20, node.x));
        node.y = Math.max(-20, Math.min(rect.height + 20, node.y));

        node.pulsePhase += node.pulseSpeed;
        const pulse = Math.sin(node.pulsePhase) * 0.4 + 1;
        node.radius = node.baseRadius * pulse;
      }

      // Spawn pulse waves from hubs
      if (timeRef.current % config.waveInterval === 0) {
        const hubIdx = Math.floor(Math.random() * config.hubCount);
        if (hubIdx < nodes.length) {
          waves.push({
            x: nodes[hubIdx].x,
            y: nodes[hubIdx].y,
            radius: 0,
            maxRadius: config.connectionDistance * 1.5,
            opacity: 0.2,
          });
        }
      }

      // Update and draw pulse waves
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += 1.5;
        wave.opacity *= 0.985;

        if (wave.opacity < 0.005 || wave.radius > wave.maxRadius) {
          waves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${wave.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw connections with gradient
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.connectionDistance) {
            const proximity = 1 - dist / config.connectionDistance;
            const baseOpacity = 0.08 + proximity * 0.12;

            // Brighter lines for hub connections
            const isHubConnection = nodes[i].type === "hub" || nodes[j].type === "hub";
            const opacity = isHubConnection ? baseOpacity * 1.8 : baseOpacity;

            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            const [r1, g1, b1] = nodes[i].color;
            const [r2, g2, b2] = nodes[j].color;
            grad.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, ${opacity})`);
            grad.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, ${opacity})`);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = isHubConnection ? 1 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Spawn particles
      if (Math.random() < config.particleRate) {
        spawnParticle(nodes);
      }

      // Update and draw particles (data flowing along connections)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const from = nodes[p.fromIdx];
        const to = nodes[p.toIdx];
        if (!from || !to) {
          particles.splice(i, 1);
          continue;
        }

        const x = from.x + (to.x - from.x) * p.progress;
        const y = from.y + (to.y - from.y) * p.progress;

        // Particle with trail
        const fadeIn = Math.min(p.progress * 5, 1);
        const fadeOut = Math.min((1 - p.progress) * 5, 1);
        const alpha = fadeIn * fadeOut * 0.8;

        // Glow
        const [pr, pg, pb] = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${alpha * 0.15})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${alpha})`;
        ctx.fill();
      }

      // Draw nodes
      for (const node of nodes) {
        const [r, g, b] = node.color;

        if (node.type === "hub") {
          // Outer glow ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.04)`;
          ctx.fill();

          // Middle glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.08)`;
          ctx.fill();

          // Inner glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
          ctx.fill();

          // Core with bright center
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.7)`;
          ctx.fill();

          // Spinning ring (decorative)
          const ringAngle = timeRef.current * 0.01 + node.pulsePhase;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2, ringAngle, ringAngle + Math.PI * 1.2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

        } else if (node.type === "relay") {
          // Glow
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.06)`;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
          ctx.fill();

        } else {
          // Small endpoint
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    initNodes();
    animate();

    const handleResize = () => {
      resize();
      initNodes();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [variant, config.nodeCount, config.connectionDistance, config.speed, config.hubCount, config.relayCount, config.particleRate, config.maxParticles, config.waveInterval]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
