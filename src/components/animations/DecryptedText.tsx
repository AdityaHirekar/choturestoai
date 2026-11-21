"use client";

import React, { useState, useEffect, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  className?: string;
  animateOn?: "view" | "hover";
}

const GLYPHS = "ABCDEF0123456789!#%&*+=~";

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  className = "",
  animateOn = "hover",
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startDecryption = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration += 1;
      if (iteration > text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "view") {
      startDecryption();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, animateOn]);

  return (
    <span
      onMouseEnter={startDecryption}
      className={`cursor-pointer transition-colors duration-200 ${className}`}
      title="Hover to re-scramble speech recognition"
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;
