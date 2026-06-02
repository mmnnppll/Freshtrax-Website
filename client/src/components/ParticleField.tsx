import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationId: number;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let particles: Array<{
        x: number; y: number; size: number;
        speedX: number; speedY: number;
        opacity: number; flickerSpeed: number; flickerOffset: number;
      }> = [];

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      const initParticles = () => {
        particles = [];
        // Cap at 80 particles (was 150) — reduces per-frame work by ~47%
        // Further cap to 40 on mobile for lower-powered devices
        const isMobile = window.innerWidth < 768;
        const maxCount = isMobile ? 40 : 80;
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), maxCount);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.3,
            speedX: (Math.random() - 0.5) * 0.15,
            speedY: (Math.random() - 0.5) * 0.1 - 0.05,
            opacity: Math.random() * 0.6 + 0.1,
            flickerSpeed: Math.random() * 0.02 + 0.005,
            flickerOffset: Math.random() * Math.PI * 2,
          });
        }
      };

      const animate = (time: number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
          const flicker = Math.sin(time * p.flickerSpeed + p.flickerOffset) * 0.3 + 0.7;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.opacity * flicker})`;
          ctx.fill();
        });
        animationId = requestAnimationFrame(animate);
      };

      const onResize = () => { resize(); initParticles(); };
      window.addEventListener("resize", onResize);
      resize();
      initParticles();
      animationId = requestAnimationFrame(animate);

      // Store cleanup on canvas element for the outer cleanup fn
      (canvas as any).__particleCleanup = () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
      };
    };

    // Defer until browser is idle — never blocks LCP or TBT measurement
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(start, { timeout: 2000 });
    } else {
      setTimeout(start, 500);
    }

    return () => {
      const cleanup = (canvas as any).__particleCleanup;
      if (cleanup) cleanup();
      else cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
