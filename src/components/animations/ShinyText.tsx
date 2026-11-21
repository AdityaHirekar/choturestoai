"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
  disabled?: boolean;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = "",
  speed = 4,
  disabled = false,
}) => {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${
        disabled
          ? "text-inherit"
          : "animate-shine bg-[linear-gradient(120deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.6)_100%)] bg-[length:200%_100%]"
      } ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
