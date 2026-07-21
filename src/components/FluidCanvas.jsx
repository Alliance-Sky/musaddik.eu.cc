import React, { useEffect, useRef } from 'react';

/**
 * Bulletproof Pink Ribbon Teardrop Animation Engine
 * Guarded against non-finite values and device context failures
 */
export default function FluidCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 80;

    class FluidParticle {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx || (Math.random() - 0.5) * 1.5;
        this.vy = vy || (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 18 + 14;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.022 + 0.02;
        this.rotation = Math.atan2(this.vy, this.vx) + Math.PI / 2;

        const isDark = document.documentElement.classList.contains('dark');
        this.colorHex = isDark ? '#ec4899' : '#db2777';
        this.colorRgb = isDark ? '236, 72, 153' : '219, 39, 119';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.93;
        this.vy *= 0.93;
        this.size += 0.28;
        this.alpha -= this.decay;
      }

      draw(context) {
        if (this.alpha <= 0 || !isFinite(this.size) || this.size <= 0) return;
        context.save();
        context.globalAlpha = Math.max(0, this.alpha * 0.55);
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.scale(0.7, 1.25);

        const r = Math.max(1, this.size * 1.8);
        const grad = context.createRadialGradient(0, 0, 0, 0, 0, r);
        grad.addColorStop(0, this.colorHex);
        grad.addColorStop(0.5, `rgba(${this.colorRgb}, 0.45)`);
        grad.addColorStop(1, `rgba(${this.colorRgb}, 0)`);

        context.fillStyle = grad;
        context.beginPath();

        const rx = this.size * 0.85;
        const ry = this.size * 2.2;
        context.moveTo(0, -ry);
        context.quadraticCurveTo(rx, 0, 0, ry);
        context.quadraticCurveTo(-rx, 0, 0, -ry);

        context.closePath();
        context.fill();
        context.restore();
      }
    }

    let lastX = 0;
    let lastY = 0;

    const addFluidSplat = (x, y) => {
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        const count = Math.min(Math.floor(dist / 3), 4);
        for (let i = 0; i < count; i++) {
          if (particles.length >= maxParticles) particles.shift();
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
          const speed = Math.random() * 1.8 + 0.6;
          particles.push(
            new FluidParticle(
              x + (Math.random() - 0.5) * 4,
              y + (Math.random() - 0.5) * 4,
              Math.cos(angle) * speed,
              Math.sin(angle) * speed
            )
          );
        }
        lastX = x;
        lastY = y;
      }
    };

    const handleMouseMove = (e) => addFluidSplat(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        addFluidSplat(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fluid-canvas" />;
}
