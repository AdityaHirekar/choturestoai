"use client";

import React, { useState, useEffect } from "react";
import { PosTerminal } from "@/components/pos/PosTerminal";
import { KitchenDisplay } from "@/components/kds/KitchenDisplay";
import { CustomerMenu } from "@/components/qr/CustomerMenu";
import { IntelligenceHub } from "@/components/ai/IntelligenceHub";
import { ChotuVoiceModal } from "@/components/voice/ChotuVoiceModal";
import { LiveOrdersHub } from "@/components/orders/LiveOrdersHub";
import { LandingPage } from "@/components/landing/LandingPage";
import { OperationsDashboard } from "@/components/dashboard/OperationsDashboard";
import { 
  INITIAL_TABLES, 
  INITIAL_KOTS, 
  MENU_ITEMS,
  INITIAL_LIVE_ORDERS,
  INITIAL_AGGREGATORS 
} from "@/data/mockData";
import { Table, KOT, OrderItem, MenuItem, LiveOrder, AggregatorChannel } from "@/types/restaurant";
import { Mic, CheckCircle2, Sparkles, LayoutDashboard, Store, ShoppingBag, ChefHat, QrCode } from "lucide-react";

export type ThemeMode = "warm-terracotta" | "chalk-forest" | "warm-dining" | "fresh-cafe" | "obsidian-amber" | "high-volume-slate";

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>("warm-terracotta");
  const [activeTab, setActiveTab] = useState<"dashboard" | "landing" | "pos" | "orders" | "kds" | "qr" | "intelligence">("dashboard");
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [selectedTableId, setSelectedTableId] = useState<string>("T-04");
  const [kots, setKots] = useState<KOT[]>(INITIAL_KOTS);
  const [liveOrders, setLiveOrders] = useState<LiveOrder[]>(INITIAL_LIVE_ORDERS);
  const [aggregatorChannels, setAggregatorChannels] = useState<AggregatorChannel[]>(INITIAL_AGGREGATORS);
  const [voiceModalOpen, setVoiceModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [liveClock, setLiveClock] = useState<string>("21:12 IST");
  const [mounted, setMounted] = useState<boolean>(false);

  // Ledger items for Table T-04
  const [ledgerItems, setLedgerItems] = useState<OrderItem[]>([
    { dishId: "dish-01", name: "Butter Chicken", price: 340, quantity: 1, dietary: "nonveg", station: "curry" },
    { dishId: "dish-04", name: "Garlic Butter Naan", price: 60, quantity: 3, dietary: "veg", station: "tandoor" },
    { dishId: "dish-02", name: "Paneer Tikka Masala", price: 290, quantity: 1, dietary: "veg", station: "curry" },
  ]);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setLiveClock(now.toLocaleTimeString("en-US", { hour12: false }) + " IST");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add dish to ledger
  const handleAddDish = (dish: MenuItem) => {
    setLedgerItems((prev) => {
      const existing = prev.find((i) => i.dishId === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.dishId === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          quantity: 1,
          dietary: dish.dietary,
          station: dish.station,
        },
      ];
    });
    showToast(`Added ${dish.name} to ${selectedTableId}.`);
  };

  // Change quantity
  const handleChangeQty = (dishId: string, delta: number) => {
    setLedgerItems((prev) =>
      prev
        .map((item) => {
          if (item.dishId === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  // Remove item
  const handleRemoveItem = (dishId: string) => {
    setLedgerItems((prev) => prev.filter((i) => i.dishId !== dishId));
  };

  // Fire KOT
  const handleTransmitKot = () => {
    if (ledgerItems.length === 0) return;
    const newKot: KOT = {
      id: `kot-${Date.now().toString().slice(-4)}`,
      kotNumber: 1045,
      tableId: selectedTableId,
      createdAt: new Date().toLocaleTimeString("en-US", { hour12: false }),
      elapsedSeconds: 0,
      status: "cooking",
      placedBy: "pos",
      items: [...ledgerItems],
    };
    setKots((prev) => [newKot, ...prev]);
    showToast(`Order sent to Kitchen for ${selectedTableId}.`);
  };

  // WhatsApp bill
  const handleSendWhatsApp = () => {
    showToast(`Tax invoice sent via WhatsApp to guest on ${selectedTableId}.`);
  };

  // Settle bill
  const handleSettleBill = () => {
    setTables((prev) =>
      prev.map((t) => (t.id === selectedTableId ? { ...t, status: "vacant", currentBill: 0 } : t))
    );
    setLedgerItems([]);
    showToast(`Table ${selectedTableId} settled successfully.`);
  };

  // Bump KOT in KDS
  const handleBumpKot = (kotId: string) => {
    const now = new Date().toLocaleTimeString("en-US", { hour12: false });
    setKots((prev) =>
      prev.map((k) => (k.id === kotId ? { ...k, status: "bumped", completedAt: now } : k))
    );
    showToast(`Order completed and moved to Completed tab.`);
  };

  // Recall / Undo bumped KOT back to active queue
  const handleRecallKot = (kotId: string) => {
    setKots((prev) =>
      prev.map((k) => (k.id === kotId ? { ...k, status: "cooking", completedAt: undefined } : k))
    );
    showToast(`Ticket recalled back to active kitchen queue.`);
  };

  // Toggle delivery aggregator open / paused status
  const handleToggleChannel = (channelId: string) => {
    setAggregatorChannels((prev) =>
      prev.map((chan) => {
        if (chan.id === channelId) {
          const nextState = !chan.isOpen;
          showToast(`${chan.displayName} store status set to: ${nextState ? "OPEN" : "PAUSED"}`);
          return { ...chan, isOpen: nextState };
        }
        return chan;
      })
    );
  };

  // Update live order progression
  const handleUpdateOrderStatus = (orderId: string, newStatus: LiveOrder["status"]) => {
    setLiveOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Order status updated to: ${newStatus.toUpperCase()}`);
  };

  // Voice Command Dispatch
  const handleExecuteVoiceCommand = (cmd: string) => {
    if (cmd.includes("Garlic Naan")) {
      const naan = MENU_ITEMS.find((d) => d.name.includes("Garlic Butter Naan"));
      if (naan) {
        handleAddDish(naan);
        handleAddDish(naan);
      }
      showToast(`Chotu: Added 2x Garlic Butter Naan to Table T-04.`);
    } else if (cmd.includes("Dal Makhani")) {
      const dal = MENU_ITEMS.find((d) => d.name.includes("Dal Makhani"));
      if (dal) handleAddDish(dal);
      showToast(`Chotu: Added 1x Dal Makhani to Table T-04.`);
    } else if (cmd.includes("out of stock")) {
      showToast(`Chotu: Marked Gulab Jamun as out of stock.`);
    } else if (cmd.includes("WhatsApp")) {
      handleSendWhatsApp();
    }
  };

  return (
    <div data-theme={theme} className="min-h-screen flex flex-col bg-canvas text-ink antialiased" suppressHydrationWarning>
      {/* If landing tab is active, render the full LandingPage with live demo launcher & theme support */}
      {activeTab === "landing" ? (
        <LandingPage
          onLaunchLiveDemo={() => setActiveTab("pos")}
          currentTheme={theme}
          onSelectTheme={setTheme}
        />
      ) : (
        <>
          {/* Calm, Minimalist Header */}
          <header className="border-b border-border bg-canvas-card sticky top-0 z-40">
            <div className="px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
              
              {/* Logo & Brand */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand text-white flex items-center justify-center font-bold text-xs font-mono">
                  CR
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base tracking-tight text-ink">Chotu</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 border border-border bg-badge/15 text-ink font-semibold">
                      Restro AI
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Segmented Navigation Tabs */}
              <nav className="flex items-center gap-1 text-xs font-mono bg-canvas border border-border p-1 rounded-lg shadow-2xs">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-3 py-1.5 font-medium transition-all rounded-md active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "dashboard"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab("pos")}
                  className={`px-3 py-1.5 font-medium transition-all rounded-md active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "pos"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Terminal</span>
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`px-3 py-1.5 font-medium transition-all rounded-md active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "orders"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab("kds")}
                  className={`px-3 py-1.5 font-medium transition-all rounded-md active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "kds"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                  }`}
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Kitchen</span>
                </button>
                <button
                  onClick={() => setActiveTab("qr")}
                  className={`px-3 py-1.5 font-medium transition-all rounded-md active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "qr"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Guest Menu</span>
                </button>
                <button
                  onClick={() => setActiveTab("intelligence")}
                  className={`px-3 py-1.5 font-medium transition-all rounded-md active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "intelligence"
                      ? "bg-brand text-white font-bold shadow-xs"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Insights</span>
                </button>
                <div className="h-4 w-[1px] bg-border mx-1"></div>
                <button
                  onClick={() => setActiveTab("landing")}
                  className="px-3 py-1.5 font-bold transition-all flex items-center gap-1.5 rounded-md active:scale-95 cursor-pointer text-brand hover:text-white hover:bg-brand border border-brand/30"
                >
                  <span>Book Demo</span>
                  <span className="text-[10px]">↗</span>
                </button>
              </nav>

              {/* Right: Theme Switcher, Clock & Voice Assistant Pill */}
              <div className="flex items-center gap-3">
                {/* Color Palette Switcher Presets */}
                <div className="hidden md:flex items-center bg-canvas border border-border p-1 rounded-full text-[10px] font-mono gap-0.5">
                  <button
                    onClick={() => setTheme("warm-terracotta")}
                    className={`px-2.5 py-1 transition-all rounded-full flex items-center gap-1 cursor-pointer ${
                      theme === "warm-terracotta"
                        ? "bg-brand text-white font-bold shadow-xs"
                        : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                    }`}
                    title="Warm Espresso & Terracotta"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D95D39]"></span>
                    <span>Terracotta</span>
                  </button>
                  <button
                    onClick={() => setTheme("chalk-forest")}
                    className={`px-2.5 py-1 transition-all rounded-full flex items-center gap-1 cursor-pointer ${
                      theme === "chalk-forest" || theme === "warm-dining"
                        ? "bg-brand text-white font-bold shadow-xs"
                        : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                    }`}
                    title="Chalk, Stone & Forest (Crisp, Fresh & Tech-Forward)"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B52]"></span>
                    <span>Chalk & Forest</span>
                  </button>
                  <button
                    onClick={() => setTheme("fresh-cafe")}
                    className={`px-2.5 py-1 transition-all rounded-full flex items-center gap-1 cursor-pointer ${
                      theme === "fresh-cafe"
                        ? "bg-brand text-white font-bold shadow-xs"
                        : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                    }`}
                    title="Clean Minimal + Fresh Green"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F9E44]"></span>
                    <span>Café</span>
                  </button>
                  <button
                    onClick={() => setTheme("obsidian-amber")}
                    className={`px-2.5 py-1 transition-all rounded-full flex items-center gap-1 cursor-pointer ${
                      theme === "obsidian-amber" || theme === "high-volume-slate"
                        ? "bg-brand text-white font-bold shadow-xs"
                        : "text-ink-secondary hover:text-ink hover:bg-canvas-card"
                    }`}
                    title="Obsidian & Warm Amber (Dark Mode & High-Impact)"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]"></span>
                    <span>Obsidian</span>
                  </button>
                </div>

                <span
                  suppressHydrationWarning
                  className="text-xs font-mono text-ink-secondary hidden lg:inline"
                >
                  {mounted ? liveClock : "21:12 IST"}
                </span>

                <button
                  onClick={() => setVoiceModalOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-1.5 border-2 border-brand/40 hover:border-brand hover:bg-brand hover:text-white text-brand bg-brand/5 transition-all duration-150 active:scale-95 rounded-md text-xs font-bold shadow-2xs hover:shadow-xs cursor-pointer select-none"
                >
                  <Mic className="w-3.5 h-3.5 text-brand group-hover:text-white" />
                  <span>Ask Chotu</span>
                </button>
              </div>

            </div>
          </header>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-ink text-canvas px-4 py-2.5 text-xs font-medium shadow-lg flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-dietary-veg" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Voice Assistant Modal */}
          <ChotuVoiceModal
            isOpen={voiceModalOpen}
            onClose={() => setVoiceModalOpen(false)}
            onExecuteCommand={handleExecuteVoiceCommand}
          />

          {/* Main Surface Screen with Silky Smooth Hardware Transition */}
          <main className="flex-1 flex flex-col min-h-0">
            <div key={activeTab} className="animate-fade-in flex-1 flex flex-col min-h-0">
              {activeTab === "dashboard" && (
                <OperationsDashboard
                  tables={tables}
                  orders={liveOrders}
                  kots={kots}
                  channels={aggregatorChannels}
                  onNavigate={(tab) => setActiveTab(tab)}
                  onOpenVoice={() => setVoiceModalOpen(true)}
                  onToggleChannel={handleToggleChannel}
                />
              )}

              {activeTab === "pos" && (
                <PosTerminal
                  tables={tables}
                  selectedTableId={selectedTableId}
                  onSelectTable={setSelectedTableId}
                  ledgerItems={ledgerItems}
                  onAddDish={handleAddDish}
                  onChangeQty={handleChangeQty}
                  onRemoveItem={handleRemoveItem}
                  onTransmitKot={handleTransmitKot}
                  onSendWhatsApp={handleSendWhatsApp}
                  onSettleBill={handleSettleBill}
                  onExecuteVoiceCommand={handleExecuteVoiceCommand}
                  onOpenVoiceModal={() => setVoiceModalOpen(true)}
                />
              )}

              {activeTab === "orders" && (
                <LiveOrdersHub
                  orders={liveOrders}
                  channels={aggregatorChannels}
                  onToggleChannel={handleToggleChannel}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                />
              )}

              {activeTab === "kds" && (
                <KitchenDisplay
                  kots={kots}
                  onBumpKot={handleBumpKot}
                  onRecallKot={handleRecallKot}
                />
              )}

              {activeTab === "qr" && <CustomerMenu />}

              {activeTab === "intelligence" && <IntelligenceHub />}
            </div>
          </main>

          {/* Clean Footer */}
          <footer className="border-t border-border bg-canvas px-4 lg:px-8 py-3 flex items-center justify-between text-xs text-ink-secondary font-mono">
            <div>Chotu Restro AI • The Spice Junction</div>
            <div className="text-[11px] text-ink-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-dietary-veg"></span>
              <span>All Systems Operational</span>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
