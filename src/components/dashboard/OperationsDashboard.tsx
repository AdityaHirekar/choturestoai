"use client";

import React, { useRef } from "react";
import { Table, KOT, LiveOrder, AggregatorChannel } from "@/types/restaurant";
import { 
  LayoutDashboard,
  UtensilsCrossed, 
  ShoppingBag, 
  ChefHat, 
  Smartphone, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Mic, 
  CheckCircle2, 
  Clock, 
  Store,
  Bike,
  Activity,
  Zap,
  Play
} from "lucide-react";
import { ClickSpark } from "@/components/animations/ClickSpark";
import { useStaggerEntrance } from "@/lib/anime";

interface OperationsDashboardProps {
  tables: Table[];
  orders: LiveOrder[];
  kots: KOT[];
  channels: AggregatorChannel[];
  onNavigate: (tab: "landing" | "pos" | "orders" | "kds" | "qr" | "intelligence") => void;
  onOpenVoice: () => void;
  onToggleChannel: (channelId: string) => void;
}

export const OperationsDashboard: React.FC<OperationsDashboardProps> = ({
  tables,
  orders,
  kots,
  channels,
  onNavigate,
  onOpenVoice,
  onToggleChannel,
}) => {
  const activeOrders = orders.filter((o) => o.status !== "completed");
  const occupiedTables = tables.filter((t) => t.status === "occupied" || t.status === "billed");
  const activeCookingKots = kots.filter((k) => k.status === "cooking");
  const completedOrders = orders.filter((o) => o.status === "completed");
  const totalSettledToday = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0) + 42850; // combined with daily baseline

  const preparingCount = orders.filter((o) => o.status === "preparing").length;
  const readyCount = orders.filter((o) => o.status === "ready").length;
  const deliveryCount = orders.filter((o) => o.status === "out-for-delivery").length;

  const dashRef = useRef<HTMLDivElement>(null);
  useStaggerEntrance(dashRef, ".dash-card");

  return (
    <div ref={dashRef} className="flex-1 p-6 lg:p-10 bg-canvas space-y-10 max-w-7xl mx-auto w-full">
      
      {/* Top Welcome & Operational Status Hero */}
      <div className="bg-canvas-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-dietary-veg animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-brand font-bold">
                Operations Command Center · Live Shift #2
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink font-sans">
              The Spice Junction
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary font-mono leading-relaxed max-w-2xl">
              Unified command for in-house tables, multi-station kitchen tickets, direct QR orders, and online delivery aggregator dispatches.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={onOpenVoice}
              className="px-4 py-2 bg-canvas border border-border hover:border-brand hover:text-brand text-xs font-mono font-bold uppercase rounded flex items-center gap-2 transition-all active:scale-95 shadow-2xs cursor-pointer text-ink"
            >
              <Mic className="w-4 h-4 text-brand animate-pulse" />
              <span>Ask Chotu AI</span>
            </button>
            <button
              onClick={() => onNavigate("pos")}
              className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-xs font-mono font-bold uppercase rounded flex items-center gap-2 transition-all active:scale-95 shadow-sm hover:shadow cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Open POS Terminal</span>
            </button>
          </div>
        </div>

        {/* Ambient Warm Embers Glow */}
        <div 
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #D95D39 0%, transparent 70%)" }}
        />
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* KPI 1: Today's Gross Revenue */}
        <div className="dash-card bg-canvas-card border border-border rounded-xl p-5 space-y-2 shadow-2xs hover:border-brand/40 transition-colors">
          <div className="flex items-center justify-between text-xs font-mono text-ink-secondary">
            <span>Today&apos;s Gross Revenue</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E6F4EA] text-dietary-veg">
              +18.4%
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-ink tracking-tight">
            ₹ {totalSettledToday.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-ink-secondary font-mono">
            76 settled orders · AOV: ₹ 584.00
          </div>
        </div>

        {/* KPI 2: Live Active Dispatch */}
        <div 
          onClick={() => onNavigate("orders")}
          className="dash-card bg-canvas-card border border-border rounded-xl p-5 space-y-2 shadow-2xs hover:border-brand/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-ink-secondary">
            <span>Active Dispatch Queue</span>
            <span className="w-2 h-2 rounded-full bg-brand animate-ping"></span>
          </div>
          <div className="text-2xl font-bold font-mono text-ink tracking-tight flex items-baseline gap-2">
            <span>{activeOrders.length} Orders</span>
            <span className="text-xs font-normal text-ink-secondary">live</span>
          </div>
          <div className="text-[11px] text-ink-secondary font-mono flex items-center gap-2">
            <span className="text-[#00897B] font-bold">{preparingCount} Ongoing</span>
            <span>·</span>
            <span className="text-dietary-veg font-bold">{readyCount} Ready</span>
            <span>·</span>
            <span className="text-[#7C3AED] font-bold">{deliveryCount} Delivery</span>
          </div>
        </div>

        {/* KPI 3: Dine-In Table Utilization */}
        <div 
          onClick={() => onNavigate("pos")}
          className="dash-card bg-canvas-card border border-border rounded-xl p-5 space-y-2 shadow-2xs hover:border-brand/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-ink-secondary">
            <span>Table Occupancy</span>
            <span className="text-[10px] font-mono text-brand font-bold">POS READY</span>
          </div>
          <div className="text-2xl font-bold font-mono text-ink tracking-tight">
            {occupiedTables.length} / {tables.length} Tables
          </div>
          <div className="text-[11px] text-ink-secondary font-mono">
            {Math.round((occupiedTables.length / tables.length) * 100)}% utilization · 17 seated guests
          </div>
        </div>

        {/* KPI 4: Kitchen Prep Speed */}
        <div 
          onClick={() => onNavigate("kds")}
          className="dash-card bg-canvas-card border border-border rounded-xl p-5 space-y-2 shadow-2xs hover:border-brand/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-ink-secondary">
            <span>Kitchen KDS Queue</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FEF7E0] text-[#B06000]">
              AVG 14 MIN
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-ink tracking-tight">
            {activeCookingKots.length} Active Tickets
          </div>
          <div className="text-[11px] text-ink-secondary font-mono">
            0 overdue tickets · Curry &amp; Tandoor live
          </div>
        </div>

      </div>

      {/* Screen Launchers Grid: The Primary Navigation Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-base font-bold text-ink uppercase tracking-tight font-mono flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-brand" />
              <span>Module Launchpad &amp; Screen Navigation</span>
            </h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              Jump directly into any operational workstation or client presentation
            </p>
          </div>
          <span className="text-xs font-mono text-ink-secondary hidden sm:inline">
            6 Workstations Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: POS Terminal */}
          <div 
            onClick={() => onNavigate("pos")}
            className="bg-canvas-card border border-border rounded-xl p-6 shadow-2xs hover:shadow-md hover:border-brand transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-badge/20 text-ink">
                  TABLE T-04 ACTIVE
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base text-ink group-hover:text-brand transition-colors">
                  POS Terminal &amp; Counter Billing
                </h3>
                <p className="text-xs text-ink-secondary font-mono mt-1 leading-relaxed">
                  Fast floor plan management, split checks, instant dish addition, KOT printing, and automated WhatsApp digital invoicing.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs font-mono font-bold text-brand group-hover:translate-x-0.5 transition-transform">
              <span>Open Terminal Station</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Orders & Multi-Channel Dispatch */}
          <div 
            onClick={() => onNavigate("orders")}
            className="bg-canvas-card border border-border rounded-xl p-6 shadow-2xs hover:shadow-md hover:border-brand transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Bike className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E6F4EA] text-dietary-veg">
                  3 PLATFORMS SYNCED
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base text-ink group-hover:text-brand transition-colors">
                  Orders &amp; Delivery Dispatch Hub
                </h3>
                <p className="text-xs text-ink-secondary font-mono mt-1 leading-relaxed">
                  Unified dispatch ledger for Dine-In, Takeaway, Street Delivery, and online aggregators (Swiggy, Zomato, Toing).
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs font-mono font-bold text-brand group-hover:translate-x-0.5 transition-transform">
              <span>View Live Dispatch Queue</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Kitchen Display System (KDS) */}
          <div 
            onClick={() => onNavigate("kds")}
            className="bg-canvas-card border border-border rounded-xl p-6 shadow-2xs hover:shadow-md hover:border-brand transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-500/20 flex items-center justify-center text-[#E23E2D]">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FEF7E0] text-[#B06000]">
                  STATION ROUTING LIVE
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base text-ink group-hover:text-brand transition-colors">
                  Kitchen Display System (KDS)
                </h3>
                <p className="text-xs text-ink-secondary font-mono mt-1 leading-relaxed">
                  Zero thermal paper dependency. Automatic routing to Curry &amp; Tandoor stations with urgency timers and one-tap bump/recall.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs font-mono font-bold text-brand group-hover:translate-x-0.5 transition-transform">
              <span>Open Kitchen Screen</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Guest QR Mobile Menu */}
          <div 
            onClick={() => onNavigate("qr")}
            className="bg-canvas-card border border-border rounded-xl p-6 shadow-2xs hover:shadow-md hover:border-brand transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-500/20 flex items-center justify-center text-amber-600">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-badge/20 text-ink">
                  TABLE 04 QR READY
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base text-ink group-hover:text-brand transition-colors">
                  Guest QR Digital Menu
                </h3>
                <p className="text-xs text-ink-secondary font-mono mt-1 leading-relaxed">
                  Instant mobile table ordering simulator with Veg/Non-Veg filters, dish recommendations, and one-tap direct UPI payment flow.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs font-mono font-bold text-brand group-hover:translate-x-0.5 transition-transform">
              <span>Launch Mobile Guest View</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 5: AI Insights & Revenue Hub */}
          <div 
            onClick={() => onNavigate("intelligence")}
            className="bg-canvas-card border border-border rounded-xl p-6 shadow-2xs hover:shadow-md hover:border-brand transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-500/20 flex items-center justify-center text-indigo-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F1FD] text-[#1967D2]">
                  PROFIT MARGIN AUDIT
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base text-ink group-hover:text-brand transition-colors">
                  AI Intelligence &amp; Analytics
                </h3>
                <p className="text-xs text-ink-secondary font-mono mt-1 leading-relaxed">
                  Store vs. Online sales channel splits, weekly rush traffic peaks, and campaign discount ROI analysis with margin protection.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs font-mono font-bold text-brand group-hover:translate-x-0.5 transition-transform">
              <span>Explore Analytics Ledger</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 6: Client Landing Page & Demo Booking */}
          <div 
            onClick={() => onNavigate("landing")}
            className="bg-canvas-card border border-border rounded-xl p-6 shadow-2xs hover:shadow-md hover:border-brand transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-brand text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand text-white">
                  CLIENT READY
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base text-ink group-hover:text-brand transition-colors">
                  Client Landing Page &amp; Booking
                </h3>
                <p className="text-xs text-ink-secondary font-mono mt-1 leading-relaxed">
                  High-converting public showcase complete with 3D terrain canvas, savings calculator, and 15-min demo booking.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs font-mono font-bold text-brand group-hover:translate-x-0.5 transition-transform">
              <span>View Marketing Showcase</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section: Delivery Aggregator Quick Status & Live Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Aggregator Control Panel */}
        <div className="lg:col-span-5 bg-canvas-card border border-border rounded-xl p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-tight text-ink font-mono">
                Third-Party Aggregator Channels
              </h3>
              <p className="text-[11px] text-ink-secondary mt-0.5">
                Toggle auto-accept and store online availability
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-dietary-veg/10 text-dietary-veg font-bold rounded">
              AUTO-ACCEPT ON
            </span>
          </div>

          <div className="space-y-3">
            {channels.slice(0, 3).map((chan) => (
              <div key={chan.id} className="flex items-center justify-between p-2.5 bg-canvas-subtle rounded-lg border border-border/60">
                <div className="flex items-center gap-2.5">
                  {chan.platform === "swiggy" && (
                    <div className="w-7 h-7 bg-[#FC8019] text-white rounded flex items-center justify-center text-[8px] font-black p-0.5">
                      SW
                    </div>
                  )}
                  {chan.platform === "zomato" && (
                    <div className="w-7 h-7 bg-[#E23744] text-white rounded flex items-center justify-center text-[8px] font-black p-0.5">
                      ZM
                    </div>
                  )}
                  {chan.platform === "toing" && (
                    <div className="w-7 h-7 bg-[#7C3AED] text-white rounded flex items-center justify-center text-[8px] font-black p-0.5">
                      TG
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-xs text-ink">{chan.displayName}</div>
                    <div className="text-[10px] text-ink-secondary font-mono">
                      {chan.isOpen ? "Receiving Webhooks" : "Store Paused"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right font-mono text-xs">
                    <span className="text-ink font-bold">{chan.ongoingCount} ongoing</span>
                  </div>
                  <button
                    onClick={() => onToggleChannel(chan.id)}
                    className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                      chan.isOpen ? "bg-[#10B981]" : "bg-gray-300"
                    }`}
                    title="Toggle Platform Online State"
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-white block shadow-sm transform transition-transform ${
                        chan.isOpen ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Recent Orders Ticker */}
        <div className="lg:col-span-7 bg-canvas-card border border-border rounded-xl p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-tight text-ink font-mono">
                Recent Orders Stream
              </h3>
              <p className="text-[11px] text-ink-secondary mt-0.5">
                Real-time multi-channel feed with status advancement
              </p>
            </div>
            <button
              onClick={() => onNavigate("orders")}
              className="text-xs font-mono font-bold text-brand hover:underline flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-border/60">
            {orders.slice(0, 4).map((ord) => (
              <div key={ord.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs font-mono text-ink">{ord.orderNumber}</span>
                    <span className="text-ink-secondary text-xs">•</span>
                    <span className="font-semibold text-xs text-ink truncate">{ord.customerName}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-semibold uppercase ${
                      ord.mode === "dine-in"
                        ? "bg-[#E8F1FD] text-[#1967D2]"
                        : ord.mode === "takeaway"
                        ? "bg-[#FEF7E0] text-[#B06000]"
                        : ord.mode === "delivery"
                        ? "bg-[#FCE8E6] text-[#C5221F]"
                        : "bg-[#FCE8E6] text-[#D93025]"
                    }`}>
                      {ord.mode}
                    </span>
                  </div>
                  <div className="text-[11px] text-ink-secondary font-mono truncate max-w-sm">
                    {ord.itemsSummary}
                  </div>
                </div>

                <div className="text-right shrink-0 space-y-1">
                  <div className="font-bold text-xs font-mono text-ink">
                    ₹ {ord.totalAmount.toFixed(2)}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold inline-block ${
                    ord.status === "preparing"
                      ? "bg-[#00897B] text-white"
                      : ord.status === "ready"
                      ? "bg-dietary-veg text-white"
                      : ord.status === "out-for-delivery"
                      ? "bg-[#7C3AED] text-white"
                      : "bg-gray-500 text-white"
                  }`}>
                    {ord.status === "preparing" ? "Ongoing" : ord.status === "ready" ? "Ready" : ord.status === "out-for-delivery" ? "Delivery" : "Completed"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default OperationsDashboard;