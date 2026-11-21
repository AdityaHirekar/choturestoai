"use client";

import React, { useState } from "react";
import { Mic, Check, Volume2, Sparkles } from "lucide-react";

interface ChotuVoiceStripProps {
  onExecuteCommand: (command: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ChotuVoiceStrip: React.FC<ChotuVoiceStripProps> = ({
  onExecuteCommand,
  isOpen,
  onToggle,
}) => {
  const [transcription, setTranscription] = useState<string>(
    "Chotu, Table 4 pe 2 Garlic Naan aur 1 Dal Makhani add karo"
  );
  const [lastParsedIntent, setLastParsedIntent] = useState<string>(
    "INTENT PARSED: [ORDER_MODIFIER / DISPATCHED TO KOT #1042]"
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSimulate = (cmd: string, intent: string) => {
    setIsProcessing(true);
    setTranscription(cmd);
    setLastParsedIntent("ANALYZING PHONETICS & RESTRO LEXICON...");

    setTimeout(() => {
      setLastParsedIntent(intent);
      setIsProcessing(false);
      onExecuteCommand(cmd);
    }, 400);
  };

  return (
    <div className="border-b border-hairline bg-[#0E1015] px-4 lg:px-8 py-2.5 text-xs font-mono transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Waveform & Hearing Buffer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 h-5 px-1 bg-surface-subtle border border-hairline rounded-none">
            <span className="w-0.5 bg-ochre animate-audio-tick" style={{ animationDelay: "0.1s" }}></span>
            <span className="w-0.5 bg-ochre animate-audio-tick" style={{ animationDelay: "0.3s" }}></span>
            <span className="w-0.5 bg-ochre animate-audio-tick" style={{ animationDelay: "0.15s" }}></span>
            <span className="w-0.5 bg-ochre animate-audio-tick" style={{ animationDelay: "0.45s" }}></span>
            <span className="w-0.5 bg-ochre animate-audio-tick" style={{ animationDelay: "0.25s" }}></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-ink-muted flex items-center gap-1">
              <Mic className="w-3.5 h-3.5 text-ochre" />
              <span>LISTENING:</span>
            </span>
            <span className="text-ink font-sans italic font-medium">"{transcription}"</span>
          </div>
        </div>

        {/* Center: Quick Simulation Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[10px]">
          <span className="text-ink-faint uppercase tracking-wider mr-1">Voice Prompts:</span>
          
          <button
            onClick={() =>
              handleSimulate(
                "Table 4 pe 2 Garlic Naan add karo",
                "INTENT PARSED: [ORDER_MODIFIER / +2 NAAN FIRED TO KOT #1042]"
              )
            }
            className="px-2.5 py-1 border border-hairline hover:border-ochre text-ink-muted hover:text-ink active:scale-95 transition-all"
          >
            +2 Garlic Naan (T4)
          </button>

          <button
            onClick={() =>
              handleSimulate(
                "Table 4 pe 1 Dal Makhani add karo",
                "INTENT PARSED: [ORDER_MODIFIER / +1 DAL MAKHANI TO KOT #1042]"
              )
            }
            className="px-2.5 py-1 border border-hairline hover:border-ochre text-ink-muted hover:text-ink active:scale-95 transition-all"
          >
            +1 Dal Makhani (T4)
          </button>

          <button
            onClick={() =>
              handleSimulate(
                "Gulab Jamun out of stock mark karo",
                "INTENT PARSED: [INVENTORY_LOCK / GULAB JAMUN SET TO ZERO]"
              )
            }
            className="px-2.5 py-1 border border-hairline hover:border-ochre text-ink-muted hover:text-ink active:scale-95 transition-all"
          >
            Out of Stock
          </button>

          <button
            onClick={() =>
              handleSimulate(
                "Table 4 ka final bill WhatsApp pe bhejo",
                "INTENT PARSED: [BILLING / DISPATCHED WHATSAPP INVOICE TO T-04]"
              )
            }
            className="px-2.5 py-1 border border-hairline hover:border-ochre text-ink-muted hover:text-ink active:scale-95 transition-all"
          >
            WhatsApp Bill
          </button>
        </div>

        {/* Right: Parsed Intent Status */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold">
          {isProcessing ? (
            <span className="text-ochre flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ochre animate-ping"></span>
              PROCESSING HINGLISH NLP...
            </span>
          ) : (
            <span className="text-dietary-veg flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{lastParsedIntent}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
