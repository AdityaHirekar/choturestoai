'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface Spark {
  x: number;
  y: number;
  angle: number;
  speed: number;
  startTime: number;
}

export interface ClickSparkProps extends React.HTMLAttributes<HTMLDivElement> {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  extraScale?: number;
  children?: React.ReactNode;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#D95D39',
  sparkSize = 8,
  sparkRadius = 24,
  sparkCount = 8,
  duration = 380,
  extraScale = 1.0,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationIdRef = useRef<number | null>(null);

  // Resize canvas bounds dynamically
  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Main spark animation loop
  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;

      const progress = elapsed / duration;
      // Cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const alpha = 1 - progress;

      const currentRadius = easeProgress * sparkRadius * extraScale;
      const currentSize = sparkSize * (1 - progress * 0.7);

      const x1 = spark.x + currentRadius * Math.cos(spark.angle);
      const y1 = spark.y + currentRadius * Math.sin(spark.angle);
      const x2 = spark.x + (currentRadius + currentSize) * Math.cos(spark.angle);
      const y2 = spark.y + (currentRadius + currentSize) * Math.sin(spark.angle);

      ctx.save();
      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();

      return true;
    });

    if (sparksRef.current.length > 0) {
      animationIdRef.current = requestAnimationFrame(animate);
    } else {
      animationIdRef.current = null;
    }
  }, [duration, extraScale, sparkColor, sparkRadius, sparkSize]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = performance.now();
      const newSparks: Spark[] = Array.from({ length: sparkCount }).map((_, i) => ({
        x,
        y,
        angle: (i * 2 * Math.PI) / sparkCount + (Math.random() - 0.5) * 0.3,
        speed: 1,
        startTime: now,
      }));

      sparksRef.current.push(...newSparks);

      if (!animationIdRef.current) {
        animationIdRef.current = requestAnimationFrame(animate);
      }
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onClick={handleClick}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-30 overflow-visible"
        aria-hidden="true"
      />
      {children}
    </div>
  );
};

export default ClickSpark;
