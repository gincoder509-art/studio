'use client';

import React, { useRef, useEffect } from 'react';

export function BackgroundBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let bubbles: Bubble[];
    const mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    };

    const setCanvasDimensions = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    const getThemeColors = () => {
        if (typeof window === 'undefined') {
            return ['rgba(125, 43, 227, 0.3)', 'rgba(219, 43, 227, 0.3)'];
        }
        const primaryHsl = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        const accentHsl = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

        const parseHsl = (hsl: string) => {
            if (!hsl) return { h: 262, s: 82, l: 57 };
            const [h, s, l] = hsl.replace(/%/g, '').split(' ').map(parseFloat);
            return { h, s, l };
        };

        const primary = parseHsl(primaryHsl);
        const accent = parseHsl(accentHsl);

        return [
            `hsla(${primary.h}, ${primary.s}%, ${primary.l}%, 0.3)`,
            `hsla(${accent.h}, ${accent.s}%, ${accent.l}%, 0.3)`,
            `hsla(${primary.h}, ${primary.s}%, 70%, 0.3)`,
            `hsla(${accent.h}, ${accent.s}%, 70%, 0.3)`,
        ];
    }
    
    let colorArray = getThemeColors();

    class Bubble {
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      minRadius: number;
      color: string;

      constructor(x: number, y: number, dx: number, dy: number, radius: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
      }

      draw() {
        if(!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if (
          mouse.x - this.x < 50 &&
          mouse.x - this.x > -50 &&
          mouse.y - this.y < 50 &&
          mouse.y - this.y > -50
        ) {
          if (this.radius < 40) {
            this.radius += 1;
          }
        } else if (this.radius > this.minRadius) {
          this.radius -= 1;
        }

        this.draw();
      }
    }

    const init = () => {
        setCanvasDimensions();
        bubbles = [];
        const numberOfBubbles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfBubbles; i++) {
            const radius = Math.random() * 4 + 2;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 0.5;
            const dy = (Math.random() - 0.5) * 0.5;
            bubbles.push(new Bubble(x, y, dx, dy, radius));
        }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if(!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
      }
    };
    
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    };

    const handleResize = () => {
        cancelAnimationFrame(animationFrameId);
        colorArray = getThemeColors();
        init();
        animate();
    };

    init();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}