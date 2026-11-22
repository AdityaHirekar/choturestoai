"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  ShieldCheck,
  Check,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  ShoppingBag,
  Store,
  Globe,
  Mic,
  Calculator,
  Play,
  X,
  MessageSquare,
} from "lucide-react";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { CountUp } from "@/components/animations/CountUp";
import { ShinyText } from "@/components/animations/ShinyText";
import { DecryptedText } from "@/components/animations/DecryptedText";
import { TrueFocus } from "@/components/animations/TrueFocus";
import { Topography } from "@/components/animations/Topography";
import { ReactiveButton } from "@/components/animations/ReactiveButton";
import { Magnet } from "@/components/animations/Magnet";
import { ClickSpark } from "@/components/animations/ClickSpark";

export type ThemeMode = "warm-terracotta" | "chalk-forest" | "warm-dining" | "fresh-cafe" | "obsidian-amber" | "high-volume-slate";

interface LandingPageProps {
  onLaunchLiveDemo?: () => void;
  currentTheme?: ThemeMode;
  onSelectTheme?: (theme: ThemeMode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchLiveDemo,
  currentTheme = "warm-terracotta",
  onSelectTheme,
}) => {
  // Demo Booking Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    restaurantName: "",
    city: "Mumbai",
    outletType: "qsr",
    outletCount: "1",
    currentPos: "none",
    preferredDate: "tomorrow",
    preferredTime: "11:30 AM",
    focusArea: "voice-pos",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<typeof formData | null>(null);

  // Interactive ROI Calculator State
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(450000);
  const [aggregatorShare, setAggregatorShare] = useState<number>(40);
  const [shiftPercentage, setShiftPercentage] = useState<number>(25);

  const currentAggregatorSales = monthlyRevenue * (aggregatorShare / 100);
  const currentCommissionLost = currentAggregatorSales * 0.22;
  const shiftedToDirect = currentAggregatorSales * (shiftPercentage / 100);
  const monthlySavings = shiftedToDirect * 0.22;
  const annualSavings = monthlySavings * 12;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedBooking({ ...formData });
    }, 600);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-mono selection:bg-brand selection:text-white antialiased" suppressHydrationWarning>
      
      {/* Top Announcement Strip */}
      <div className="bg-brand text-white py-2 px-4 text-center text-xs flex items-center justify-center gap-2 border-b border-brand-hover">
        <span className="w-2 h-2 rounded-full bg-badge animate-pulse"></span>
        <span className="font-bold tracking-tight text-white text-xs sm:text-sm">
          Save up to ₹ 38,000/month in aggregator commissions by switching to Direct QR &amp; Chotu Restro AI.
        </span>
        <button
          onClick={() => scrollToSection("roi-calculator")}
          className="text-ink bg-white px-2.5 py-0.5 rounded font-bold uppercase text-[10px] ml-1.5 hover:bg-badge transition-colors hidden sm:inline shadow-xs cursor-pointer active:scale-95"
        >
          CALCULATE SAVINGS →
        </button>
      </div>

      {/* ============================================================
          1. REFINED MODERN NAVIGATION BAR
          Clean, balanced hierarchy with readable text links,
          compact theme pills, and a focused primary Book Demo CTA.
      ============================================================ */}
      <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
          
          {/* Handmade Wordmark & Stamp */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-8 px-2.5 bg-brand text-white flex items-center justify-center font-bold text-xs uppercase tracking-tight rounded">
              CR·AI
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-sm tracking-tight text-ink uppercase">
                  Chotu Restro AI
                </span>
                <span className="text-[11px] text-brand font-hand text-base hidden sm:inline">
                  warm artisanal dining &amp; voice os
                </span>
              </div>
            </div>
          </div>

          {/* Refined Navigation Links (Clean text links with hover state) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => scrollToSection("about-statement")}
              className="px-3 py-1.5 text-ink-secondary hover:text-ink hover:bg-canvas-subtle font-medium uppercase tracking-tight rounded transition-all active:scale-95 cursor-pointer"
            >
              System
            </button>
            <button
              onClick={() => scrollToSection("features-method")}
              className="px-3 py-1.5 text-ink-secondary hover:text-ink hover:bg-canvas-subtle font-medium uppercase tracking-tight rounded transition-all active:scale-95 cursor-pointer"
            >
              Pillars
            </button>
            <button
              onClick={() => scrollToSection("roi-calculator")}
              className="px-3 py-1.5 text-ink-secondary hover:text-ink hover:bg-canvas-subtle font-medium uppercase tracking-tight rounded transition-all active:scale-95 cursor-pointer"
            >
              Economics
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="px-3 py-1.5 text-ink-secondary hover:text-ink hover:bg-canvas-subtle font-medium uppercase tracking-tight rounded transition-all active:scale-95 cursor-pointer"
            >
              ₹ 6,500/Yr
            </button>
            <button
              onClick={() => scrollToSection("book-demo-form")}
              className="h-[34px] px-4 bg-brand text-white hover:bg-brand-hover uppercase text-xs font-mono font-bold tracking-tight rounded transition-all shadow-xs hover:shadow flex items-center gap-1.5 active:scale-95 cursor-pointer ml-1"
            >
              <span>Book Demo</span>
              <span className="text-[10px]">↗</span>
            </button>
          </nav>

          {/* Right Action: Minimalist Palette Switcher & Live Sandbox CTA */}
          <div className="flex items-center gap-2.5">
            {onSelectTheme && (
              <div className="hidden xl:flex items-center bg-canvas-card border border-border p-1 rounded-full text-[10px] font-mono gap-1">
                <button
                  onClick={() => onSelectTheme("warm-terracotta")}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    currentTheme === "warm-terracotta"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-subtle/50"
                  }`}
                  title="Warm Espresso & Terracotta"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D95D39] shrink-0"></span>
                  <span>Terracotta</span>
                </button>
                <button
                  onClick={() => onSelectTheme("chalk-forest")}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    currentTheme === "chalk-forest" || currentTheme === "warm-dining"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-subtle/50"
                  }`}
                  title="Chalk, Stone & Forest (Crisp, Fresh & Tech-Forward)"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1E6B52] shrink-0"></span>
                  <span>Chalk & Forest</span>
                </button>
                <button
                  onClick={() => onSelectTheme("fresh-cafe")}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    currentTheme === "fresh-cafe"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-subtle/50"
                  }`}
                  title="Fresh Café"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2F9E44] shrink-0"></span>
                  <span>Café</span>
                </button>
                <button
                  onClick={() => onSelectTheme("obsidian-amber")}
                  className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                    currentTheme === "obsidian-amber" || currentTheme === "high-volume-slate"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-subtle/50"
                  }`}
                  title="Obsidian & Warm Amber (Dark Mode & High-Impact)"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0"></span>
                  <span>Obsidian</span>
                </button>
              </div>
            )}

            {onLaunchLiveDemo && (
              <button
                onClick={onLaunchLiveDemo}
                className="h-[34px] px-3.5 border-2 border-brand/50 hover:border-brand text-brand hover:text-white hover:bg-brand bg-brand/5 text-xs font-mono uppercase font-bold tracking-tight rounded flex items-center gap-1.5 transition-all duration-150 active:scale-95 shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <Play className="w-3 h-3 text-brand group-hover:text-white" />
                <span>Live Sandbox</span>
              </button>
            )}
            <button
              onClick={() => scrollToSection("book-demo-form")}
              className="h-[34px] px-3.5 bg-brand text-white font-bold text-xs font-mono uppercase rounded md:hidden hover:bg-brand-hover shadow-xs active:scale-95 cursor-pointer"
            >
              Book Demo
            </button>
          </div>

        </div>
      </header>


      {/* ============================================================
          2. BAKING FILM HERO
          Atmospheric culinary hero viewport with White Icing text,
          thin uppercase display capitals, and handwritten Kiddo annotations.
      ============================================================ */}
      <section className="relative min-h-[85vh] bg-[#1E1614] text-white flex flex-col justify-between overflow-hidden border-b border-border">
        
        {/* Film Backdrop with warm kitchen embers & parchment texture */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125 z-0"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 30%, rgba(217, 93, 57, 0.25) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(217, 93, 57, 0.18) 0%, transparent 60%), linear-gradient(180deg, rgba(30, 27, 24, 0.5) 0%, rgba(30, 27, 24, 0.96) 100%)`
          }}
        />

        {/* React Bits Topography 3D Interactive Terrain Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
          <Topography
            color={
              currentTheme === "warm-terracotta"
                ? "#D95D39"
                : currentTheme === "fresh-cafe"
                ? "#2F9E44"
                : currentTheme === "chalk-forest" || currentTheme === "warm-dining"
                ? "#1E6B52"
                : "#E5A93C"
            }
            lineCount={24}
            lineWidth={1.2}
            elevation={1.1}
            foreground={0.2}
            tilt={28}
            speed={0.22}
            direction="backward"
            glow={0.65}
            depthOfField={0.4}
            fog={0.35}
            hoverEffect="lift"
            clickEffect="pulse"
            majorLines={false}
            brightness={0.85}
            mouseInteraction={true}
          />
        </div>

        {/* Hand-drawn chalk watermark */}
        <div className="absolute top-12 right-12 text-white/10 font-hand text-8xl pointer-events-none select-none rotate-6 hidden lg:block z-0">
          fresh orders, no chaos *
        </div>

        {/* Hero Content */}
        <div className="relative max-w-[1400px] mx-auto px-6 pt-20 pb-16 flex-1 flex flex-col justify-center space-y-8 z-10 w-full">
          
          {/* Eyebrow Label with Hand-drawn Ticket Accent */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-brand text-white text-xs font-mono uppercase tracking-tight font-bold">
              TICKET #01 · RESTAURANT OPERATING SYSTEM
            </span>
            <span className="font-hand text-badge text-2xl -rotate-2">
              inspired by RestroBomb &amp; handcrafted for modern dining
            </span>
          </div>

          {/* Thin Uppercase Statement with React Bits TrueFocus */}
          <div className="space-y-3 max-w-5xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-[-0.04em] leading-[0.95] uppercase text-white font-sans">
              <TrueFocus
                sentence="THE ARTISANAL RESTAURANT OPERATING SYSTEM."
                focusWords={["ARTISANAL", "RESTAURANT", "OPERATING"]}
                borderColor={
                  currentTheme === "warm-terracotta"
                    ? "#D95D39"
                    : currentTheme === "fresh-cafe"
                    ? "#2F9E44"
                    : currentTheme === "chalk-forest" || currentTheme === "warm-dining"
                    ? "#1E6B52"
                    : "#E5A93C"
                }
              />
            </h1>
            <p className="text-lg sm:text-xl text-[#FFFBF5]/85 font-mono max-w-2xl pt-2 leading-relaxed font-light">
              Eliminate order clutter, reclaim predatory 22% aggregator commissions, and coordinate kitchen stations with calm handwriting and voice intelligence.
            </p>
          </div>

          {/* High-Contrast Interactive CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-5">
            <ReactiveButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("book-demo-form")}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shadow-xl"
            >
              Book a 15-Minute Live Walkthrough
            </ReactiveButton>

            {onLaunchLiveDemo && (
              <ReactiveButton
                variant="inverted"
                size="lg"
                onClick={onLaunchLiveDemo}
                leftIcon={<Play className="w-3.5 h-3.5 text-brand fill-brand" />}
                className="shadow-xl"
              >
                Explore Interactive POS Sandbox
              </ReactiveButton>
            )}

            <div className="font-hand text-[#FFFBF5]/90 text-2xl rotate-1 sm:ml-2">
              * tested live on your actual menu in 15 minutes
            </div>
          </div>

        </div>

        {/* Hero Lower Monospace Strip */}
        <div className="relative z-10 border-t border-white/15 bg-black/40 backdrop-blur-md px-6 py-3.5">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#FFFBF5]/80">
            <div className="flex items-center gap-6">
              <span>PRICING: <strong className="text-white">₹ <CountUp to={6500} duration={0.8} /> / YEAR FLAT</strong></span>
              <span className="hidden sm:inline">·</span>
              <span>COMMISSION ON DIRECT: <strong className="text-badge">0.0%</strong></span>
              <span className="hidden sm:inline">·</span>
              <span>HARDWARE: <strong className="text-white">BYOD (ANY PHONE / IPAD)</strong></span>
            </div>
            <div className="text-[11px] font-hand text-xl text-white/90">
              if your staff can use WhatsApp, they can run Chotu in 60 mins ~
            </div>
          </div>
        </div>

      </section>


      {/* ============================================================
          3. PRIMARY BRAND ABOUT BLOCK
          Broad Primary Brand field with centered White display text,
          Serial Blur thin capitals at 72px/80 with -2.88px tracking,
          paired with narrow Shinka 16px body copy.
      ============================================================ */}
      <section id="about-statement" className="relative bg-brand text-white py-24 sm:py-32 px-6 border-b border-border overflow-hidden">
        {/* React Bits Topography Canvas - White Contours over Brand Field */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <Topography
            color="#ffffff"
            lineCount={26}
            lineWidth={1.1}
            elevation={0.9}
            foreground={0.15}
            tilt={36}
            speed={0.18}
            direction="forward"
            glow={0.7}
            depthOfField={0.35}
            fog={0.4}
            hoverEffect="lift"
            clickEffect="pulse"
            majorLines={true}
            brightness={0.9}
            mouseInteraction={true}
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto text-center space-y-8">
          
          <div className="inline-block px-3 py-1 bg-white text-brand text-xs font-mono uppercase font-bold tracking-tight">
            MANIFESTO · THE CHOTU PHILOSOPHY
          </div>

          {/* 72px Thin Capitals */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-[-0.04em] leading-[1.0] uppercase text-white font-sans max-w-5xl mx-auto">
            FROM DISCONNECTED COUNTER CHAOS TO CALM KITCHEN AUTOMATION.
          </h2>

          <div className="w-16 h-[2px] bg-badge mx-auto my-6"></div>

          {/* Shinka 16px Body Copy */}
          <p className="text-sm sm:text-base text-white/90 font-mono max-w-[900px] mx-auto leading-relaxed font-normal">
            Modern Indian dining outlets are strangled by multiple fragmented subscriptions, noisy aggregator commissions (22% to 28% per order), and complex legacy software designed decades ago. Chotu Restro AI harmonizes billing, kitchen displays, multilingual speech, and direct customer QR ordering into one calm, single-layer operating system.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono text-white/80">
            <span className="font-hand text-2xl text-badge -rotate-3">
              * zero lock-in contracts
            </span>
            <span>·</span>
            <span>NO PER-ORDER COMMISSIONS</span>
            <span>·</span>
            <span className="font-hand text-2xl text-badge rotate-2">
              * runs on existing hardware
            </span>
          </div>

        </div>
      </section>


      {/* ============================================================
          4. THIN EDITORIAL HEADING & 6 SYSTEM PILLARS
          Clean canvas with dynamic typography, thin variable uppercase at 56px,
          paired with handwritten accents and React Bits SpotlightCards.
      ============================================================ */}
      <section id="features-method" className="py-24 px-6 max-w-[1400px] mx-auto space-y-16">
        
        {/* Thin Editorial Section Header */}
        <div className="space-y-3 border-b border-border pb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brand font-bold">
            <span>*</span>
            <span>SIX SYNCHRONIZED PILLARS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extralight tracking-[-0.04em] leading-[1.0] uppercase text-ink font-sans">
            THE METHOD &amp; ARCHITECTURAL MODULES.
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <p className="text-xs sm:text-sm text-ink-secondary font-mono max-w-xl">
              Each component talks directly to the same unified ledger. What is punched on POS appears on KDS in under 2 seconds.
            </p>
            <span className="font-hand text-2xl text-brand -rotate-1">
              everything runs in real-time sync ~
            </span>
          </div>
        </div>

        {/* 6 Structural Blocks (0px Radius, Fine Structural Linework & React Bits SpotlightCard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Pillar 1: POS */}
          <SpotlightCard
            className="border border-border bg-canvas-card p-6 space-y-4 flex flex-col justify-between"
            spotlightColor="rgba(226, 62, 45, 0.12)"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-brand text-white uppercase text-[10px] font-bold">PILLAR 01</span>
                <span className="text-ink-secondary">300 bills/hr pace</span>
              </div>
              <h3 className="text-xl font-extralight tracking-tight uppercase text-ink font-sans">
                Point of Sale &amp; Table Ledger
              </h3>
              <p className="text-xs text-ink-secondary font-mono leading-relaxed">
                Fire KOTs in under 2 taps. Supports table status color coding, bill splitting, item modifiers, GST automatic bifurcation (CGST/SGST 2.5%), and instant WhatsApp digital receipts.
              </p>
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="font-hand text-xl text-badge">no thermal paper slips lost</span>
              <span className="text-brand uppercase font-bold text-[11px]">→ FAST CHECKOUT</span>
            </div>
          </SpotlightCard>

          {/* Pillar 2: QR Menu */}
          <SpotlightCard
            className="border border-border bg-canvas-card p-6 space-y-4 flex flex-col justify-between"
            spotlightColor="rgba(226, 62, 45, 0.12)"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-brand text-white uppercase text-[10px] font-bold">PILLAR 02</span>
                <span className="text-badge font-bold">0% Direct Commission</span>
              </div>
              <h3 className="text-xl font-extralight tracking-tight uppercase text-ink font-sans">
                Zero-App Guest QR Menu
              </h3>
              <p className="text-xs text-ink-secondary font-mono leading-relaxed">
                Guests scan the table QR code on their smartphone to browse high-res culinary photos, filter dietary options, customize spice levels, and pay instantly via UPI with zero app install.
              </p>
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="font-hand text-xl text-brand">+22% table turnover speed</span>
              <span className="text-brand uppercase font-bold text-[11px]">→ INSTANT UPI</span>
            </div>
          </SpotlightCard>

          {/* Pillar 3: KDS */}
          <SpotlightCard
            className="border border-border bg-canvas-card p-6 space-y-4 flex flex-col justify-between"
            spotlightColor="rgba(226, 62, 45, 0.12)"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-brand text-white uppercase text-[10px] font-bold">PILLAR 03</span>
                <span className="text-ink-secondary">Station-Sequenced</span>
              </div>
              <h3 className="text-xl font-extralight tracking-tight uppercase text-ink font-sans">
                Kitchen Display System (KDS)
              </h3>
              <p className="text-xs text-ink-secondary font-mono leading-relaxed">
                Orders route dynamically to station screens: Tandoor, Curry, Bar, and Pantry. Color-coded elapsed timers alert kitchen staff when tickets approach 10 minutes, with a dedicated Recall Queue.
              </p>
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="font-hand text-xl text-badge">recall bumped tickets anytime</span>
              <span className="text-brand uppercase font-bold text-[11px]">→ ZERO ERROR</span>
            </div>
          </SpotlightCard>

          {/* Pillar 4: Chotu Voice */}
          <SpotlightCard
            className="border border-border bg-canvas-card p-6 space-y-4 flex flex-col justify-between"
            spotlightColor="rgba(255, 184, 0, 0.18)"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-badge text-ink uppercase text-[10px] font-bold">PILLAR 04</span>
                <span className="text-ink-secondary">Hinglish Speech</span>
              </div>
              <h3 className="text-xl font-extralight tracking-tight uppercase text-ink font-sans">
                Chotu Multilingual Voice AI
              </h3>
              <p className="text-xs text-ink-secondary font-mono leading-relaxed">
                Engineered for loud Indian kitchen counters. Cashiers speak naturally in Hindi, English, or mixed Hinglish: &quot;Table 4 pe 2 Garlic Naan aur 1 Butter Chicken add karo&quot; hands-free.
              </p>
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
              <DecryptedText
                text="&quot;Table 4 pe 2 Garlic Naan add karo&quot;"
                speed={35}
                className="font-hand text-xl text-brand"
              />
              <span className="text-brand uppercase font-bold text-[11px]">→ HANDS-FREE</span>
            </div>
          </SpotlightCard>

          {/* Pillar 5: Delivery Hub */}
          <SpotlightCard
            className="border border-border bg-canvas-card p-6 space-y-4 flex flex-col justify-between"
            spotlightColor="rgba(226, 62, 45, 0.12)"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-brand text-white uppercase text-[10px] font-bold">PILLAR 05</span>
                <span className="text-ink-secondary">Swiggy + Zomato + Toing</span>
              </div>
              <h3 className="text-xl font-extralight tracking-tight uppercase text-ink font-sans">
                Multi-Channel Delivery Hub
              </h3>
              <p className="text-xs text-ink-secondary font-mono leading-relaxed">
                Consolidate Swiggy, Zomato, Toing, Direct Web, and takeaway orders into one quiet table. Manage rider arrival OTPs, dispatch in-house riders, or toggle store open/pause status with one click.
              </p>
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="font-hand text-xl text-badge">eliminate 4 tablet counter clutter</span>
              <span className="text-brand uppercase font-bold text-[11px]">→ UNIFIED</span>
            </div>
          </SpotlightCard>

          {/* Pillar 6: Margin Economics */}
          <SpotlightCard
            className="border border-border bg-canvas-card p-6 space-y-4 flex flex-col justify-between"
            spotlightColor="rgba(226, 62, 45, 0.12)"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-brand text-white uppercase text-[10px] font-bold">PILLAR 06</span>
                <span className="text-brand font-bold">Margin Health Audit</span>
              </div>
              <h3 className="text-xl font-extralight tracking-tight uppercase text-ink font-sans">
                Channel Economics &amp; Margin AI
              </h3>
              <p className="text-xs text-ink-secondary font-mono leading-relaxed">
                Know exact percentage splits across In-Store (100% margin), Aggregators (squeezed by ~22% cuts), and Direct Site sales. Day-of-week traffic attribution isolates peak dinner rushes.
              </p>
            </div>
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="font-hand text-xl text-badge">saves ₹38,000 in monthly cuts</span>
              <span className="text-brand uppercase font-bold text-[11px]">→ REAL MARGINS</span>
            </div>
          </SpotlightCard>

        </div>

      </section>


      {/* ============================================================
          5. DIRECT RESTRO ECONOMICS & SAVINGS CALCULATOR
          Stamped Parchment & Brand split layout with real-time sliders.
      ============================================================ */}
      <section id="roi-calculator" className="relative bg-[#1A1817] text-white py-20 px-6 border-b border-border overflow-hidden">
        {/* React Bits Topography Canvas - Ambient Contours */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <Topography
            color={
              currentTheme === "warm-terracotta"
                ? "#D95D39"
                : currentTheme === "fresh-cafe"
                ? "#2F9E44"
                : currentTheme === "chalk-forest" || currentTheme === "warm-dining"
                ? "#1E6B52"
                : "#E5A93C"
            }
            lineCount={22}
            lineWidth={1.2}
            elevation={1.1}
            foreground={0.2}
            tilt={30}
            speed={0.22}
            direction="backward"
            glow={0.55}
            depthOfField={0.4}
            fog={0.35}
            hoverEffect="lift"
            clickEffect="pulse"
            majorLines={false}
            brightness={0.8}
            mouseInteraction={true}
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/20 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-badge font-bold">
                <Calculator className="w-4 h-4" />
                <span>DIRECT RESTRO SAVINGS CALCULATOR</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extralight tracking-[-0.04em] uppercase text-white font-sans mt-2">
                HOW MUCH COMMISSION ARE YOU SURRENDERING?
              </h2>
            </div>
            <div className="font-hand text-2xl text-white/90 rotate-1">
              * based on standard 22% platform cut vs 0% direct QR
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Sliders Container on Warm Surface */}
            <div className="lg:col-span-7 bg-canvas text-ink p-8 space-y-6 border border-border">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="uppercase text-ink-secondary">Monthly Gross Restaurant Sales:</span>
                  <span className="font-bold text-base text-ink">
                    ₹ {monthlyRevenue.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="2500000"
                  step="50000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ink-secondary">
                  <span>₹ 1,00,000 / mo</span>
                  <span>₹ 25,00,000 / mo</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="uppercase text-ink-secondary">Aggregator Share (Swiggy / Zomato / Toing):</span>
                  <span className="font-bold text-base text-brand">{aggregatorShare}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={aggregatorShare}
                  onChange={(e) => setAggregatorShare(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ink-secondary">
                  <span>10% of orders</span>
                  <span>90% of orders</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="uppercase text-ink-secondary">% Shifted to Direct Ordering / QR:</span>
                  <span className="font-bold text-base text-brand">{shiftPercentage}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={shiftPercentage}
                  onChange={(e) => setShiftPercentage(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ink-secondary">
                  <span>5% (Conservative)</span>
                  <span>60% (High Loyalty)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border text-[11px] text-ink-secondary font-mono leading-relaxed">
                By incentivizing regulars to scan your in-store QR or direct order link with 10% off, you save the remaining 12% difference in cold cash profit.
              </div>
            </div>

            {/* Brand Calculation Output Card */}
            <div className="lg:col-span-5 bg-brand p-8 flex flex-col justify-between space-y-6 border border-white/10 text-white">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-tight text-white/80 font-mono">
                  PROFIT RETAINED PER MONTH
                </div>
                <div className="text-4xl sm:text-5xl font-extralight tracking-tight font-sans text-white">
                  <CountUp to={Math.round(monthlySavings)} prefix="₹ " />
                </div>
                <div className="text-xs text-white/90 font-mono">
                  Annual profit retained: <strong className="text-badge font-bold text-base"><CountUp to={Math.round(annualSavings)} prefix="₹ " /></strong>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/20 text-xs font-mono text-white/85">
                <div className="flex justify-between">
                  <span>Platform fee lost currently:</span>
                  <span className="text-badge font-bold">₹ {Math.round(currentCommissionLost).toLocaleString("en-IN")}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Shifted to Direct 0%:</span>
                  <span>₹ {Math.round(shiftedToDirect).toLocaleString("en-IN")}/mo</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10">
                  <span>Chotu Software License:</span>
                  <span className="text-white font-bold">₹ 6,500/yr flat</span>
                </div>
              </div>

              <button
                onClick={() => scrollToSection("book-demo-form")}
                className="w-full h-[48px] bg-[#121212] hover:bg-black text-[#F5F2EB] hover:text-white border border-black/30 rounded font-mono font-bold text-xs uppercase tracking-tight flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Protect Your Margins • Book Demo</span>
                <ArrowRight className="w-4 h-4 text-[#F5F2EB]" />
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* ============================================================
          6. INTERACTIVE 15-MINUTE LIVE DEMO BOOKING FORM
          Measured 45px transparent square fields with dynamic tokens,
          12.5px 16px padding, 0px radius, and Sketch Submit button in Brand style.
      ============================================================ */}
      <section id="book-demo-form" className="py-24 px-6 max-w-[1200px] mx-auto space-y-12 scroll-mt-16">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 bg-badge text-ink text-xs font-mono uppercase font-bold tracking-tight">
            DIRECT APPOINTMENT · 1-ON-1 DEMO
          </div>
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-[-0.04em] uppercase text-ink font-sans">
            BOOK A 15-MINUTE PERSONALIZED DEMO.
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary font-mono">
            No sales pressure. A real 15-minute screen share walkthrough tailored to your menu, showing Hinglish voice billing, kitchen routing, and commission elimination.
          </p>
        </div>

        {/* Form Container (0px Radius, Fine Structural Borders) */}
        <div className="border border-border bg-canvas-card p-6 sm:p-12">
          
          {submittedBooking ? (
            // Confirmation Screen
            <div className="text-center space-y-6 py-6">
              <div className="w-16 h-16 bg-brand text-white flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <div className="space-y-2">
                <span className="font-hand text-3xl text-badge -rotate-1">
                  your slot is confirmed ~
                </span>
                <h3 className="text-2xl sm:text-3xl font-extralight uppercase text-ink font-sans">
                  DEMO SCHEDULED FOR {submittedBooking.restaurantName.toUpperCase()}
                </h3>
                <p className="text-xs text-ink-secondary font-mono max-w-md mx-auto">
                  Thank you, <strong className="text-ink">{submittedBooking.fullName}</strong>. We have dispatched your calendar invite and Google Meet link via WhatsApp to <strong className="text-brand">+91 {submittedBooking.phone}</strong>.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 bg-canvas border border-border text-xs font-mono text-left space-y-2">
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-ink-secondary">Reserved Slot:</span>
                  <span className="font-bold text-ink">{submittedBooking.preferredDate.toUpperCase()} at {submittedBooking.preferredTime}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span className="text-ink-secondary">Meeting URL:</span>
                  <span className="font-bold text-brand">meet.google.com/cho-restro-demo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Format:</span>
                  <span className="font-bold text-ink">{submittedBooking.outletType.toUpperCase()} ({submittedBooking.city})</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                {onLaunchLiveDemo && (
                  <ReactiveButton
                    variant="primary"
                    size="md"
                    onClick={onLaunchLiveDemo}
                    leftIcon={<Play className="w-3.5 h-3.5 text-badge" />}
                  >
                    Explore Sandbox While You Wait
                  </ReactiveButton>
                )}
                <ReactiveButton
                  variant="outline"
                  size="md"
                  onClick={() => setSubmittedBooking(null)}
                >
                  Edit Details
                </ReactiveButton>
              </div>
            </div>
          ) : (
            // Active Form Fields
            <form onSubmit={handleBookDemoSubmit} className="space-y-8">
              
              {/* Section 1: Contact & Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-ink font-bold pb-2 border-b border-border">
                  <span className="px-2 py-0.5 bg-brand text-white text-[10px]">01</span>
                  <span>Your Restaurant Profile</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-ink">
                      Your Name <span className="text-brand">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full h-[45px] px-4 bg-transparent border border-border text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-ink">
                      WhatsApp Mobile Number <span className="text-brand">*</span>
                    </label>
                    <div className="flex">
                      <span className="h-[45px] px-3 bg-canvas-subtle border border-r-0 border-border flex items-center text-xs text-ink font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="98200 12345"
                        className="flex-1 h-[45px] px-4 bg-transparent border border-border text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-ink">
                      Restaurant / Brand Name <span className="text-brand">*</span>
                    </label>
                    <input
                      type="text"
                      name="restaurantName"
                      required
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                      placeholder="e.g. Bombay Tandoor House"
                      className="w-full h-[45px] px-4 bg-transparent border border-border text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-ink">
                      City / Location <span className="text-brand">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-[45px] px-4 bg-transparent border border-border text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Format & Scale */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-ink font-bold pb-2 border-b border-border">
                  <span className="px-2 py-0.5 bg-brand text-white text-[10px]">02</span>
                  <span>Format &amp; Current Hardware</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: "qsr", label: "QSR Counter" },
                    { id: "cafe", label: "Café & Coffee Bar" },
                    { id: "dinein", label: "Dine-in Bistro" },
                    { id: "cloud", label: "Cloud Kitchen" },
                    { id: "bar", label: "Bar / Brewery" },
                  ].map((fmt) => {
                    const isSelected = formData.outletType === fmt.id;
                    return (
                      <button
                        type="button"
                        key={fmt.id}
                        onClick={() => setFormData((p) => ({ ...p, outletType: fmt.id }))}
                        className={`btn-reactive h-[45px] px-3 border text-xs uppercase font-mono tracking-tight transition-all flex items-center justify-center text-center shadow-xs active:scale-95 rounded-sm ${
                          isSelected
                            ? "border-brand bg-brand text-white font-bold shadow-sm -translate-y-0.5"
                            : "border-border bg-transparent text-ink hover:border-brand hover:bg-canvas-subtle"
                        }`}
                      >
                        {fmt.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-ink">
                      Number of Outlets
                    </label>
                    <select
                      name="outletCount"
                      value={formData.outletCount}
                      onChange={handleInputChange}
                      className="w-full h-[45px] px-4 bg-transparent border border-border text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                    >
                      <option value="1">1 Outlet</option>
                      <option value="2-5">2 to 5 Outlets</option>
                      <option value="6-15">6 to 15 Outlets</option>
                      <option value="15+">15+ Outlets (Chain)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-ink">
                      Current POS System
                    </label>
                    <select
                      name="currentPos"
                      value={formData.currentPos}
                      onChange={handleInputChange}
                      className="w-full h-[45px] px-4 bg-transparent border border-border text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                    >
                      <option value="none">None / New Opening</option>
                      <option value="petpooja">Petpooja</option>
                      <option value="posist">Posist / UrbanPiper</option>
                      <option value="excel">Excel / Pen &amp; Paper</option>
                      <option value="other">Other Legacy POS</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Schedule Slot */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-ink font-bold pb-2 border-b border-border">
                  <span className="px-2 py-0.5 bg-brand text-white text-[10px]">03</span>
                  <span>Select Preferred 15-Minute Slot</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-ink">Preferred Day</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "today", label: "Today" },
                        { id: "tomorrow", label: "Tomorrow" },
                        { id: "dayafter", label: "In 2 Days" },
                      ].map((d) => (
                        <button
                          type="button"
                          key={d.id}
                          onClick={() => setFormData((p) => ({ ...p, preferredDate: d.id }))}
                          className={`btn-reactive h-[45px] border uppercase text-xs font-mono tracking-tight transition-all shadow-xs active:scale-95 rounded-sm ${
                            formData.preferredDate === d.id
                              ? "border-brand bg-brand text-white font-bold -translate-y-0.5 shadow-sm"
                              : "border-border bg-transparent text-ink hover:border-brand hover:bg-canvas-subtle"
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-ink">Time Slot (IST)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["11:30 AM", "02:00 PM", "04:30 PM", "07:00 PM"].map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setFormData((p) => ({ ...p, preferredTime: slot }))}
                          className={`btn-reactive h-[45px] border uppercase text-xs font-mono tracking-tight transition-all shadow-xs active:scale-95 rounded-sm ${
                            formData.preferredTime === slot
                              ? "border-brand bg-brand text-white font-bold -translate-y-0.5 shadow-sm"
                              : "border-border bg-transparent text-ink hover:border-brand hover:bg-canvas-subtle"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sketch Submit Button */}
              <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-ink-secondary font-mono">
                  <span className="font-hand text-2xl text-brand -rotate-2">
                    * WhatsApp invite sent immediately
                  </span>
                </div>

                <ReactiveButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto px-10 shadow-xl"
                >
                  {isSubmitting ? "CONFIRMING SLOT..." : "CONFIRM 15-MINUTE LIVE DEMO"}
                </ReactiveButton>
              </div>

            </form>
          )}

        </div>

      </section>


      {/* ============================================================
          7. THE 60-MINUTE WHATSAPP BENCHMARK & BYOD HARDWARE
          Clean linework, 0px radius, sketch cards.
      ============================================================ */}
      <section className="py-20 px-6 bg-canvas-subtle border-t border-b border-border">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-block px-3 py-1 bg-brand text-white text-xs font-mono uppercase font-bold tracking-tight">
                USABILITY BENCHMARK · 60 MINUTES
              </div>

              <h2 className="text-3xl sm:text-5xl font-extralight tracking-[-0.04em] uppercase text-ink font-sans leading-tight">
                IF YOUR STAFF CAN USE WHATSAPP, THEY CAN MASTER CHOTU IN 60 MINS.
              </h2>

              <p className="text-xs sm:text-sm text-ink-secondary font-mono leading-relaxed">
                No expensive 3-day on-site training sessions or confusing multi-layer menus. We stripped away the bloat so cashiers and captains never freeze up during 9 PM Friday rushes.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-ink">
                <div className="flex items-center gap-2">
                  <span className="text-brand font-bold">✓</span>
                  <span>Bring Your Own Device (BYOD): Works on iOS, Android, Windows, Mac</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand font-bold">✓</span>
                  <span>Supports all standard thermal ESC/POS printers via USB, LAN, or Bluetooth</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand font-bold">✓</span>
                  <span>Offline resilience: punches bills even during transient WiFi drops</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-canvas-card border border-border p-6 space-y-2">
                <Smartphone className="w-6 h-6 text-brand" />
                <h4 className="font-bold text-xs uppercase text-ink">Smartphones</h4>
                <p className="text-[11px] text-ink-secondary font-mono">Captain table order punching &amp; KOT tracking on Android/iOS</p>
              </div>

              <div className="bg-canvas-card border border-border p-6 space-y-2">
                <Tablet className="w-6 h-6 text-badge" />
                <h4 className="font-bold text-xs uppercase text-ink">Tablets &amp; iPads</h4>
                <p className="text-[11px] text-ink-secondary font-mono">Front counter billing &amp; Station Kitchen Displays</p>
              </div>

              <div className="bg-canvas-card border border-border p-6 space-y-2">
                <Laptop className="w-6 h-6 text-brand" />
                <h4 className="font-bold text-xs uppercase text-ink">Laptops</h4>
                <p className="text-[11px] text-ink-secondary font-mono">Owner margins, catalog pricing, and inventory POs</p>
              </div>

              <div className="bg-canvas-card border border-border p-6 space-y-2">
                <PrinterIcon className="w-6 h-6 text-badge" />
                <h4 className="font-bold text-xs uppercase text-ink">Thermal Printers</h4>
                <p className="text-[11px] text-ink-secondary font-mono">Standard 2-inch and 3-inch ESC/POS receipt generation</p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ============================================================
          8. TRANSPARENT PRICING SECTION
          Contrasting Brand card vs Parchment card.
      ============================================================ */}
      <section id="pricing" className="py-24 px-6 max-w-[1200px] mx-auto space-y-12">
        
        <div className="text-center space-y-3">
          <div className="inline-block px-3 py-1 bg-brand text-white text-xs font-mono uppercase font-bold tracking-tight">
            NO HIDDEN CUTS · ONE FLAT FEE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-[-0.04em] uppercase text-ink font-sans">
            TRANSPARENT, ANTI-LOCK-IN PRICING.
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary font-mono max-w-xl mx-auto">
            Traditional POS vendors nickel-and-dime you for each additional KDS screen, rider integration, or tablet login. Chotu includes everything in one license.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Chotu License: Brand Card with Spotlight */}
          <SpotlightCard
            className="bg-brand text-white p-8 sm:p-10 flex flex-col justify-between space-y-8 relative border-2 border-brand"
            spotlightColor="rgba(255, 184, 0, 0.22)"
          >
            <div className="absolute top-4 right-4 bg-badge text-ink px-3 py-0.5 text-[10px] font-mono uppercase font-bold z-20">
              MOST POPULAR
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono uppercase text-white/80">
                ALL-INCLUSIVE ANNUAL RESTAURANT LICENSE
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extralight font-sans text-white tracking-tight">₹ 6,500</span>
                <span className="text-xs font-mono text-white/80">/ year per outlet</span>
              </div>

              <p className="text-xs text-white/85 font-mono leading-relaxed">
                Everything required to operate your café, QSR, or restaurant without per-order commission cuts or proprietary hardware purchases.
              </p>

              <div className="pt-4 border-t border-white/20 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-badge font-bold">✓</span>
                  <span>Point of Sale &amp; Unlimited KOTs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-badge font-bold">✓</span>
                  <span>Unlimited Guest QR Code Ordering &amp; UPI</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-badge font-bold">✓</span>
                  <span>Unlimited Kitchen Display (KDS) Screens</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-badge font-bold">✓</span>
                  <span>Chotu Hinglish Multilingual Voice Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-badge font-bold">✓</span>
                  <span>Multi-Channel Delivery Aggregator Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-badge font-bold">✓</span>
                  <span>Channel Margin AI &amp; Traffic Attribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-badge font-bold">✓</span>
                  <span>Free Cloud Updates &amp; Priority WhatsApp Support</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("book-demo-form")}
              className="w-full h-[48px] bg-[#121212] hover:bg-black text-[#F5F2EB] hover:text-white border border-black/30 rounded font-mono font-bold text-xs sm:text-sm uppercase tracking-tight flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <span>Book 15-Min Demo &amp; Start Free Trial</span>
              <ArrowRight className="w-4 h-4 text-[#F5F2EB]" />
            </button>
          </SpotlightCard>

          {/* Legacy Comparison: Card */}
          <div className="bg-canvas-card border border-border p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase text-ink-secondary">
                TRADITIONAL LEGACY SYSTEMS
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extralight font-sans text-ink tracking-tight">₹ 24,000+</span>
                <span className="text-xs font-mono text-ink-secondary">/ year + add-on fees</span>
              </div>

              <p className="text-xs text-ink-secondary font-mono leading-relaxed">
                Proprietary machine purchase locks, extra charges for additional KDS screens, and ticket delays.
              </p>

              <div className="pt-4 border-t border-border space-y-2 text-xs font-mono text-ink-secondary">
                <div className="flex items-center gap-2">
                  <span className="text-ink-faint">✕</span>
                  <span>Proprietary hardware purchases (₹35k+ each)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ink-faint">✕</span>
                  <span>Extra license cost for every KDS station</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ink-faint">✕</span>
                  <span>No voice AI or Hinglish speech capabilities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ink-faint">✕</span>
                  <span>Per-order integration fees on aggregator orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-ink-faint">✕</span>
                  <span>Annual renewal price inflation</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-canvas-subtle border border-border text-xs font-mono text-center text-ink-secondary">
              <span className="font-hand text-xl text-brand">switch in 15 mins with automatic menu import</span>
            </div>
          </div>

        </div>

      </section>


      {/* ============================================================
          9. FOOTER
          Spacious brand footer with clean contrast,
          stage ingredient doodles, newsletter field, and WhatsApp concierge.
      ============================================================ */}
      <footer className="bg-brand text-white pt-20 pb-12 px-6 border-t border-border relative overflow-hidden">
        
        {/* React Bits Topography Canvas - Ambient Contours */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <Topography
            color="#ffffff"
            lineCount={22}
            lineWidth={1.0}
            elevation={0.85}
            foreground={0.2}
            tilt={34}
            speed={0.15}
            direction="backward"
            glow={0.5}
            depthOfField={0.4}
            fog={0.4}
            hoverEffect="lift"
            clickEffect="pulse"
            majorLines={false}
            brightness={0.8}
            mouseInteraction={true}
          />
        </div>

        {/* Floating Doodles */}
        <div className="absolute top-10 left-8 opacity-20 pointer-events-none hidden sm:block">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>

        <div className="absolute bottom-16 right-12 opacity-20 pointer-events-none hidden sm:block">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36"/>
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto space-y-12 relative z-10">
          
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="font-hand text-3xl text-badge -rotate-2 block">
              modern restaurant intelligence · crafted for high performance
            </span>
            <h3 className="text-3xl sm:text-5xl font-extralight tracking-tight uppercase text-white font-sans">
              READY TO MODERNIZE YOUR RESTAURANT?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-mono">
              Join 240+ forward-thinking Indian cafés, cloud kitchens, and casual dining outlets.
            </p>
          </div>

          {/* Compact Newsletter / Consultation Field (45px) */}
          <div className="max-w-md mx-auto flex shadow-lg rounded overflow-hidden border border-black/30">
            <input
              type="tel"
              placeholder="Enter your WhatsApp number (+91)"
              className="flex-1 h-[45px] px-4 bg-[#121212] text-[#F5F2EB] placeholder-gray-400 text-xs font-mono focus:outline-none focus:bg-black"
            />
            <button
              onClick={() => scrollToSection("book-demo-form")}
              className="h-[45px] px-6 bg-black hover:bg-[#1E1E20] text-[#F5F2EB] hover:text-white font-mono font-bold text-xs uppercase tracking-tight flex items-center gap-2 shrink-0 transition-all active:scale-95 cursor-pointer border-l border-white/10"
            >
              <span>SCHEDULE</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F5F2EB]" />
            </button>
          </div>

          {/* Lower Strip */}
          <div className="pt-12 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-white/80">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-white text-brand font-bold text-xs uppercase">CR·AI</span>
              <span>Chotu Restro AI · Inspired by RestroBomb</span>
            </div>

            <div className="flex items-center gap-6">
              <button onClick={() => scrollToSection("about-statement")} className="hover:text-white transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection("features-method")} className="hover:text-white transition-colors">
                Modules
              </button>
              <button onClick={() => scrollToSection("pricing")} className="hover:text-white transition-colors">
                Pricing
              </button>
              <a
                href="https://wa.me/919820012345?text=Hi,%20I%20would%20like%20to%20book%20a%20demo%20of%20Chotu%20Restro%20AI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-badge font-bold hover:underline flex items-center gap-1.5 bg-white px-3 py-1 text-ink"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

// Simple Printer Icon helper
function PrinterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

export default LandingPage;
