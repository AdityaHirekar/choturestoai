'use client';

import React, { useState, useRef, useEffect, ReactNode, HTMLAttributes } from 'react';

export interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 60,
  disabled = false,
  magnetStrength = 3.5,
  activeTransition = 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)',
  inactiveTransition = 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.3)',
  className = '',
  style,
  ...props
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!activeElRef.current) return;

      const rect = activeElRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      if (
        Math.abs(distanceX) < rect.width / 2 + padding &&
        Math.abs(distanceY) < rect.height / 2 + padding
      ) {
        setIsHovered(true);
        setPosition({
          x: distanceX / magnetStrength,
          y: distanceY / magnetStrength,
        });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, disabled, magnetStrength]);

  return (
    <div
      ref={activeElRef}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? activeTransition : inactiveTransition,
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Magnet;
