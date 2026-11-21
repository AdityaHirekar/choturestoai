"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1.0,
  prefix = "",
  suffix = "",
  className = "",
}) => {
  const [count, setCount] = useState<number>(from);
  const startTimeRef = useRef<number | null>(null);
  const startValRef = useRef<number>(from);

  useEffect(() => {
    startTimeRef.current = null;
    startValRef.current = count;

    let animId: number;
    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(startValRef.current + (to - startValRef.current) * easeProgress);
      setCount(currentCount);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [to, duration]);

  return (
    <span className={className} suppressHydrationWarning>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

export default CountUp;
