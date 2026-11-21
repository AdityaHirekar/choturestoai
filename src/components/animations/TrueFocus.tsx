"use client";

import React, { useState } from "react";

interface TrueFocusProps {
  sentence: string;
  focusWords?: string[];
  className?: string;
  borderColor?: string;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence,
  focusWords = [],
  className = "",
  borderColor = "#f25a07",
}) => {
  const words = sentence.split(" ");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <span className={`inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 ${className}`}>
      {words.map((word, idx) => {
        const isSpecial = focusWords.includes(word.replace(/[^a-zA-Z0-9]/g, ""));
        const isFocused = hoveredIndex === idx || (hoveredIndex === null && isSpecial);

        return (
          <span
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative px-1 py-0.5 transition-all duration-300 cursor-default ${
              isFocused ? "text-white scale-[1.02]" : "text-white/80"
            }`}
          >
            {/* Corner focus brackets on focused word */}
            {isFocused && (
              <>
                <span
                  className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 transition-all duration-300"
                  style={{ borderColor }}
                />
                <span
                  className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 transition-all duration-300"
                  style={{ borderColor }}
                />
                <span
                  className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 transition-all duration-300"
                  style={{ borderColor }}
                />
                <span
                  className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 transition-all duration-300"
                  style={{ borderColor }}
                />
              </>
            )}
            <span>{word}</span>
          </span>
        );
      })}
    </span>
  );
};

export default TrueFocus;
