"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;

  constructor(x: number, y: number, vx: number, vy: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.life = 1;
    this.maxLife = 40; // ~400ms at 60fps
    
    // Size based on velocity
    const speed = Math.sqrt(vx * vx + vy * vy);
    this.size = speed > 15 ? Math.random() * 3 + 3 : Math.random() * 2 + 1;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function CustomCursor() {
  const { x, y, isHovering } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const themeAccentRef = useRef('#6C63FF'); // default

  // Motion values for smooth ring follow
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (!isMobile) setIsVisible(true);
  }, []);

  useEffect(() => {
    if (x !== 0 || y !== 0) {
      cursorX.set(x);
      cursorY.set(y);
      
      // Update accent color from CSS variable for particles
      const computedStyle = getComputedStyle(document.documentElement);
      themeAccentRef.current = computedStyle.getPropertyValue('--accent-1').trim() || '#6C63FF';

      // Velocity trail logic
      const vx = x - lastPosRef.current.x;
      const vy = y - lastPosRef.current.y;
      
      if (Math.abs(vx) > 0 || Math.abs(vy) > 0) {
        particlesRef.current.push(new Particle(x, y, vx * 0.1, vy * 0.1, themeAccentRef.current));
        if (particlesRef.current.length > 30) {
          particlesRef.current.shift(); // FIFO
        }
      }
      
      lastPosRef.current = { x, y };
    }
  }, [x, y, cursorX, cursorY]);

  // Click ripple
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 400);
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }
      
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isVisible) return null;

  // Layer 3 Context Morph styles
  let ringSize = 36;
  let ringStyle = {};
  let dotStyle = { opacity: 1 };
  let ringLabel = null;

  if (isHovering === 'link') {
    ringSize = 24;
    ringStyle = { backgroundColor: 'var(--accent-1)', opacity: 0.15 };
  } else if (isHovering === 'button') {
    ringSize = 56;
    ringStyle = { borderWidth: '3px' };
    dotStyle = { opacity: 0 };
  } else if (isHovering === 'image') {
    ringSize = 64;
    ringStyle = { borderRadius: '8px', backgroundColor: 'var(--bg-elevated)' };
    dotStyle = { opacity: 0 };
    ringLabel = "VIEW";
  } else if (isHovering === 'text') {
    ringSize = 24;
    ringStyle = { width: '2px', height: '24px', borderRadius: '0px', backgroundColor: 'var(--accent-2)', border: 'none' };
    dotStyle = { opacity: 0 };
  } else if (isHovering === 'github') {
    ringSize = 48;
    ringStyle = { backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--accent-1)' };
    dotStyle = { opacity: 0 };
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Layer 4: Velocity Trail Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Layer 5: Click Ripple */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute rounded-full border border-[var(--accent-glow)]"
          style={{
            left: ripple.x - 40,
            top: ripple.y - 40,
            width: 80,
            height: 80,
          }}
        />
      ))}

      {/* Layer 2: Outer Ring */}
      <motion.div
        className="absolute rounded-full border-2 border-[var(--accent-2)] flex items-center justify-center overflow-hidden"
        style={{
          x: smoothX,
          y: smoothY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          ...ringStyle
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {ringLabel && <span className="text-[8px] font-mono font-bold tracking-widest text-[var(--accent-1)]">{ringLabel}</span>}
      </motion.div>

      {/* Layer 1: Inner Dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent-1)] mix-blend-difference"
        style={{
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
          ...dotStyle
        }}
      />
    </div>
  );
}
