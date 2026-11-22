"use client";

import React, { useState, useRef } from "react";
import { Mic, X, Check, Sparkles, Volume2 } from "lucide-react";
import { useVoiceWave } from "@/lib/anime";

interface ChotuVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteCommand: (command: string) => void;
}

export const ChotuVoiceModal: React.FC<ChotuVoiceModalProps> = ({
  isOpen,
  onClose,
  onExecuteCommand,
}) => {
  const [transcription, setTranscription] = useState<string>(
    "Table 4 pe 2 Garlic Naan aur 1 Dal Makhani add karo"
  );
  const [statusText, setStatusText] = useState<string>("Listening... speak naturally in Hindi, Hinglish or English");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const waveRef = useRef<HTMLDivElement>(null);
  useVoiceWave(waveRef, isOpen && !isProcessing);

  if (!isOpen) return null;

  const handleSimulate = (cmd: string, feedback: string) => {
    setIsProcessing(true);
    setTranscription(cmd);
    setStatusText("Processing voice input...");

    setTimeout(() => {
      setStatusText(feedback);
      setIsProcessing(false);
      onExecuteCommand(cmd);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-quick">
      <div className="bg-canvas-card border border-border w-full max-w-lg rounded-none shadow-2xl p-6 space-y-6 animate-modal-in">
        
        {/* Modal Top */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent-faint border border-accent/20 flex items-center justify-center text-accent">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ink tracking-tight">Chotu Voice Assistant</h3>
              <p className="text-xs text-ink-secondary">Hands-free restaurant assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-ink-secondary hover:text-ink hover:bg-canvas-subtle transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ambient Waveform Card with Anime.js Dynamic Audio Equalizer */}
        <div className="bg-canvas-subtle border border-border p-5 text-center space-y-3 rounded">
          <div ref={waveRef} className="flex items-center justify-center gap-1.5 h-10">
            {[...Array(14)].map((_, i) => (
              <span
                key={i}
                className="voice-bar w-1 bg-brand rounded-full h-8 origin-bottom inline-block"
                style={{ transform: "scaleY(0.2)" }}
              />
            ))}
          </div>

          <div>
            <div className="text-sm font-medium text-ink italic font-sans">
              "{transcription}"
            </div>
            <div className="text-xs text-ink-secondary mt-1 font-mono">
              {statusText}
            </div>
          </div>
        </div>

        {/* Suggested Voice Commands */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-ink-secondary uppercase tracking-wider">
            Quick Simulation Commands:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              onClick={() =>
                handleSimulate(
                  "Table 4 pe 2 Garlic Naan add karo",
                  "Added 2 Garlic Naan to Table T-04 KOT."
                )
              }
              className="p-2.5 border border-border bg-canvas hover:border-accent text-left text-ink transition-colors"
            >
              "Table 4 pe 2 Garlic Naan add karo"
            </button>
            <button
              onClick={() =>
                handleSimulate(
                  "Table 4 pe 1 Dal Makhani add karo",
                  "Added 1 Dal Makhani to Table T-04 KOT."
                )
              }
              className="p-2.5 border border-border bg-canvas hover:border-accent text-left text-ink transition-colors"
            >
              "Table 4 pe 1 Dal Makhani add karo"
            </button>
            <button
              onClick={() =>
                handleSimulate(
                  "Gulab Jamun out of stock mark karo",
                  "Marked Gulab Jamun as out of stock."
                )
              }
              className="p-2.5 border border-border bg-canvas hover:border-accent text-left text-ink transition-colors"
            >
              "Gulab Jamun out of stock mark karo"
            </button>
            <button
              onClick={() =>
                handleSimulate(
                  "Table 4 ka bill WhatsApp pe bhejo",
                  "Invoice dispatched to guest on WhatsApp."
                )
              }
              className="p-2.5 border border-border bg-canvas hover:border-accent text-left text-ink transition-colors"
            >
              "Table 4 ka bill WhatsApp pe bhejo"
            </button>
          </div>
        </div>

        {/* Bottom dismiss */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-ink text-canvas font-medium text-xs hover:bg-black transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
