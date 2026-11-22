"use client";

import React, { useState, useRef } from "react";
import { Table, MenuItem, OrderItem } from "@/types/restaurant";
import { MENU_ITEMS } from "@/data/mockData";
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  Send, 
  CreditCard,
  ChevronDown,
  Sparkles,
  Mic,
  Bell,
  LayoutGrid,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Flame,
  UtensilsCrossed
} from "lucide-react";
import { ReactiveButton } from "@/components/animations/ReactiveButton";
import { ClickSpark } from "@/components/animations/ClickSpark";
import { PaymentSettlementModal } from "@/components/pos/PaymentSettlementModal";
import { useStaggerEntrance, animatePulse } from "@/lib/anime";

interface PosTerminalProps {
  tables: Table[];
  selectedTableId: string;
  onSelectTable: (id: string) => void;
  ledgerItems: OrderItem[];
  onAddDish: (dish: MenuItem) => void;
  onChangeQty: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onTransmitKot: () => void;
  onSendWhatsApp: () => void;
  onSettleBill: () => void;
  onExecuteVoiceCommand?: (cmd: string) => void;
  onOpenVoiceModal?: () => void;
}

export const PosTerminal: React.FC<PosTerminalProps> = ({
  tables,
  selectedTableId,
  onSelectTable,
  ledgerItems,
  onAddDish,
  onChangeQty,
  onRemoveItem,
  onTransmitKot,
  onSendWhatsApp,
  onSettleBill,
  onExecuteVoiceCommand,
  onOpenVoiceModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "nonveg">("all");
  const [showTablePicker, setShowTablePicker] = useState<boolean>(false);
  const [posViewMode, setPosViewMode] = useState<"menu" | "floor">("menu");
  const [settlementModalOpen, setSettlementModalOpen] = useState<boolean>(false);
  const [simulatedAlert, setSimulatedAlert] = useState<string | null>(null);

  const menuGridRef = useRef<HTMLDivElement>(null);
  useStaggerEntrance(menuGridRef, ".dish-card", [selectedCategory, dietaryFilter]);

  const selectedTable = tables.find((t) => t.id === selectedTableId) || tables[0];

  // Bill calculations
  const subtotal = ledgerItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = subtotal * 0.05; // 2.5% CGST + 2.5% SGST
  const serviceCharge = subtotal * 0.05;
  const grandTotal = subtotal + gst + serviceCharge;

  // Filtered menu items
  const filteredDishes = MENU_ITEMS.filter((dish) => {
    const matchesCat = selectedCategory === "all" || dish.category === selectedCategory;
    const matchesDietary = dietaryFilter === "all" || dish.dietary === dietaryFilter;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDietary && matchesSearch;
  });

  const triggerSimulatedSwiggy = () => {
    setSimulatedAlert("🔔 Swiggy Order #SW-4890 Arrived (1x Butter Chicken, 2x Naan) · Auto-Dispatched to Kitchen");
    setTimeout(() => setSimulatedAlert(null), 4500);
  };

  const triggerQuickVoice = () => {
    if (onExecuteVoiceCommand) {
      onExecuteVoiceCommand("Table 4 pe 2 Garlic Naan aur 1 Dal Makhani add karo");
    } else {
      const naan = MENU_ITEMS.find((d) => d.id === "dish-04");
      const dal = MENU_ITEMS.find((d) => d.id === "dish-03");
      if (naan) { onAddDish(naan); onAddDish(naan); }
      if (dal) onAddDish(dal);
    }
  };

  // Helper for station badges
  const getStationBadge = (station: string) => {
    switch (station) {
      case "tandoor":
        return <span className="text-[10px] font-mono text-brand font-semibold">🫓 Tandoor</span>;
      case "curry":
        return <span className="text-[10px] font-mono text-[#D97706] font-semibold">🍛 Curry</span>;
      case "bar":
        return <span className="text-[10px] font-mono text-[#0284C7] font-semibold">☕ Bar</span>;
      default:
        return <span className="text-[10px] font-mono text-ink-secondary font-semibold">🍮 Pantry</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-canvas">
      
      {/* 1. INTERACTIVE SANDBOX TEST STRIP */}
      <div className="bg-canvas border-b border-border px-4 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
          <span className="font-bold text-ink uppercase tracking-wider text-[11px]">
            Interactive POS Sandbox
          </span>
          <span className="text-ink-secondary hidden sm:inline">· Live Table {selectedTable.label}</span>
        </div>

        {/* Sandbox Quick Triggers */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={triggerQuickVoice}
            className="px-2.5 py-1 bg-canvas-card border border-border hover:border-brand text-ink text-[11px] font-semibold rounded flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs cursor-pointer"
            title="Inject Hinglish voice order into Table T-04"
          >
            <Mic className="w-3.5 h-3.5 text-brand" />
            <span>Voice Order: 2 Naan + 1 Dal</span>
          </button>

          <button
            onClick={triggerSimulatedSwiggy}
            className="px-2.5 py-1 bg-canvas-card border border-border hover:border-[#EA580C] text-ink text-[11px] font-semibold rounded flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs cursor-pointer"
            title="Simulate incoming Swiggy delivery webhook"
          >
            <Bell className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Simulate Swiggy Ping</span>
          </button>

          <div className="h-3 w-[1px] bg-border mx-0.5 hidden sm:block"></div>

          {/* Toggle between Menu Grid and Visual Floor Plan */}
          <div className="flex items-center bg-canvas-card border border-border p-0.5 rounded text-[11px]">
            <button
              onClick={() => setPosViewMode("menu")}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 ${
                posViewMode === "menu" ? "bg-brand text-white font-bold" : "text-ink-secondary hover:text-ink"
              }`}
            >
              <UtensilsCrossed className="w-3 h-3" />
              <span>Menu</span>
            </button>
            <button
              onClick={() => setPosViewMode("floor")}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 ${
                posViewMode === "floor" ? "bg-brand text-white font-bold" : "text-ink-secondary hover:text-ink"
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span>Floor Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Live Alert Banner */}
      {simulatedAlert && (
        <div className="bg-[#FEF7E0] text-[#92400E] border-b border-[#FDE68A] px-4 py-2 text-xs font-mono flex items-center justify-between animate-slide-down">
          <span className="font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span>{simulatedAlert}</span>
          </span>
          <button 
            onClick={() => setSimulatedAlert(null)}
            className="text-[10px] uppercase font-bold underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. OPERATIONAL BAR: Table Picker & Category Controls */}
      <div className="border-b border-border bg-canvas-card px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Table Selector Dropdown / Pill */}
        <div className="relative">
          <button
            onClick={() => setShowTablePicker(!showTablePicker)}
            className="flex items-center gap-2.5 px-3 py-1.5 border border-border hover:border-brand bg-canvas text-xs font-mono transition-all rounded active:scale-95 shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <span className="px-1.5 py-0.5 bg-badge text-ink text-[10px] font-bold uppercase tracking-tight rounded-xs">
              {selectedTable.label}
            </span>
            <span className="font-bold text-ink">Active Table</span>
            <span className="text-ink-secondary text-[11px]">({selectedTable.capacity} Seats • {selectedTable.status.toUpperCase()})</span>
            <ChevronDown className="w-3.5 h-3.5 text-ink-secondary" />
          </button>

          {/* Table Picker Popup */}
          {showTablePicker && (
            <div className="absolute left-0 top-full mt-1.5 z-40 bg-canvas-card border border-border shadow-xl p-3 w-80 grid grid-cols-2 gap-2 text-xs font-mono rounded-lg">
              {tables.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelectTable(t.id);
                    setShowTablePicker(false);
                  }}
                  className={`p-2.5 border text-left transition-all rounded active:scale-95 cursor-pointer ${
                    t.id === selectedTableId
                      ? "border-brand bg-brand/10 text-brand font-bold shadow-xs"
                      : "border-border hover:bg-canvas-subtle text-ink"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{t.label}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      t.status === "occupied" ? "bg-brand" : t.status === "billed" ? "bg-dietary-nonveg" : "bg-dietary-veg"
                    }`}></span>
                  </div>
                  <div className="text-[10px] text-ink-secondary mt-1">
                    {t.capacity} Seats · {t.status}
                  </div>
                  {t.currentBill ? (
                    <div className="text-[10px] font-bold text-ink mt-0.5">
                      ₹ {t.currentBill}
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dishes or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-canvas border border-border pl-8 pr-3 py-1.5 text-xs text-ink placeholder-ink-faint focus:outline-none focus:border-brand transition-colors rounded"
          />
        </div>

        {/* Category & Dietary Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs">
          {["all", "mains", "breads", "starters", "desserts", "beverages"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 capitalize rounded transition-all active:scale-95 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-ink text-canvas font-medium shadow-2xs"
                  : "text-ink-secondary hover:text-ink hover:bg-canvas-subtle"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="h-4 w-[1px] bg-border mx-1"></div>
          <button
            onClick={() => setDietaryFilter(dietaryFilter === "veg" ? "all" : "veg")}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-all active:scale-95 cursor-pointer ${
              dietaryFilter === "veg"
                ? "bg-dietary-veg text-white font-bold shadow-2xs"
                : "text-ink-secondary hover:text-dietary-veg hover:bg-dietary-veg/10"
            }`}
          >
            Veg
          </button>
          <button
            onClick={() => setDietaryFilter(dietaryFilter === "nonveg" ? "all" : "nonveg")}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-all active:scale-95 cursor-pointer ${
              dietaryFilter === "nonveg"
                ? "bg-dietary-nonveg text-white font-bold shadow-2xs"
                : "text-ink-secondary hover:text-dietary-nonveg hover:bg-dietary-nonveg/10"
            }`}
          >
            Non-Veg
          </button>
        </div>

      </div>

      {/* 3. MAIN WORKSPACE: Visual Menu on Left, Physical Receipt on Right */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
        
        {/* Left Column (8 cols): Either Visual Food Menu or Visual Table Floor Map */}
        <div className="lg:col-span-8 p-4 lg:p-6 overflow-y-auto border-r border-border">
          
          {posViewMode === "floor" ? (
            /* Visual Floor Map View */
            <div key="floor" className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="font-bold text-sm text-ink font-mono uppercase tracking-tight flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-brand" />
                    <span>Restaurant Floor Plan (8 Tables)</span>
                  </h3>
                  <p className="text-xs text-ink-secondary">Click any table to switch terminal ledger view</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-ink-secondary">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand"></span>
                    <span>Occupied (5)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-dietary-veg"></span>
                    <span>Vacant (2)</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {tables.map((t) => {
                  const isSelected = t.id === selectedTableId;
                  const isOccupied = t.status === "occupied";
                  const isBilled = t.status === "billed";

                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        onSelectTable(t.id);
                        setPosViewMode("menu");
                      }}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "border-brand bg-brand/5 shadow-md scale-[1.02]"
                          : isOccupied
                          ? "border-brand/40 bg-canvas-card hover:border-brand shadow-2xs"
                          : isBilled
                          ? "border-[#3B82F6] bg-canvas-card"
                          : "border-border bg-canvas-card hover:border-ink-secondary"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-bold text-base text-ink">{t.label}</span>
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${
                          isOccupied ? "bg-brand text-white" : isBilled ? "bg-[#3B82F6] text-white" : "bg-dietary-veg/15 text-dietary-veg"
                        }`}>
                          {t.status}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-ink-secondary space-y-1">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{t.capacity} Seats ({t.guestCount || 0} Guests)</span>
                        </div>
                        {t.openedAt && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Seated {t.openedAt}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-border flex items-baseline justify-between font-mono">
                        <span className="text-[10px] text-ink-secondary uppercase">Bill</span>
                        <span className="text-sm font-bold text-ink">
                          ₹ {t.currentBill ? t.currentBill.toFixed(2) : "0.00"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Visual Dish Cards Grid with High-Res Culinary Photography */
            <div key="menu" ref={menuGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-3.5 animate-fade-in">
              {filteredDishes.length === 0 ? (
                <div className="col-span-2 py-16 text-center text-xs text-ink-secondary font-mono border border-border bg-canvas-card rounded">
                  No items match your search.
                </div>
              ) : (
                filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="dish-card bg-canvas-card border border-border p-3.5 rounded-lg hover:border-brand/50 hover:shadow-md transition-all flex gap-3.5 group"
                  >
                    {/* Dish Photography Thumbnail with Veg/Nonveg indicator */}
                    <div className="relative w-24 h-24 rounded-md overflow-hidden bg-canvas-subtle shrink-0 border border-border">
                      {dish.imageUrl ? (
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink-faint">
                          <UtensilsCrossed className="w-6 h-6" />
                        </div>
                      )}
                      <span
                        className={`absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full border border-white shadow-xs ${
                          dish.dietary === "veg" ? "bg-dietary-veg" : "bg-dietary-nonveg"
                        }`}
                        title={dish.dietary === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                      />
                    </div>

                    {/* Dish Details & Add Action */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-sm text-ink truncate font-sans">
                            {dish.name}
                          </h4>
                          <span className="font-mono text-xs font-bold text-ink whitespace-nowrap">
                            ₹ {dish.price.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-[11px] text-ink-secondary leading-snug line-clamp-2">
                          {dish.description}
                        </p>
                      </div>

                      <div className="pt-2 mt-1 border-t border-border/60 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {getStationBadge(dish.station)}
                          {dish.bestseller && (
                            <span className="px-1.5 py-0.2 bg-badge text-ink text-[9px] font-bold uppercase tracking-tight rounded-xs">
                              POPULAR
                            </span>
                          )}
                          {dish.spiceLevel && dish.spiceLevel > 1 && (
                            <span className="text-[10px]" title={`Spice: ${dish.spiceLevel}/3`}>
                              {"🌶️".repeat(dish.spiceLevel)}
                            </span>
                          )}
                        </div>

                        <ClickSpark sparkColor="#D95D39" sparkRadius={18} sparkCount={6}>
                          <button
                            onClick={() => onAddDish(dish)}
                            className="h-[30px] px-3 bg-brand hover:bg-brand-hover text-white text-xs font-mono font-bold uppercase tracking-tight rounded shadow-2xs hover:shadow hover:-translate-y-0.5 active:scale-90 active:translate-y-0 transition-all duration-150 flex items-center gap-1 cursor-pointer select-none"
                          >
                            <Plus className="w-3 h-3 text-white" />
                            <span>Add</span>
                          </button>
                        </ClickSpark>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Physical Thermal Receipt Slip */}
        <div className="lg:col-span-4 bg-canvas flex flex-col justify-between border-t lg:border-t-0">
          
          <div className="p-4 sm:p-5 flex-1 flex flex-col min-h-0">
            
            {/* Thermal Receipt Paper Card */}
            <div className="bg-canvas-card border-2 border-border rounded-xl shadow-md flex-1 flex flex-col overflow-hidden relative">
              
              {/* Receipt Top Jagged Perforated Edge Header */}
              <div className="bg-canvas border-b-2 border-dashed border-border p-4 text-center space-y-1">
                <div className="text-[10px] font-mono tracking-widest text-ink-secondary uppercase">
                  *** THE SPICE JUNCTION ***
                </div>
                <div className="font-bold text-sm font-mono text-ink">
                  DINE-IN ORDER · TABLE {selectedTable.label}
                </div>
                <div className="text-[10px] font-mono text-ink-secondary flex items-center justify-center gap-2">
                  <span>Captain: {selectedTable.captainName || "Ramesh K."}</span>
                  <span>·</span>
                  <span>Guests: {selectedTable.guestCount || 4}</span>
                </div>
              </div>

              {/* Receipt Item Rows */}
              <div className="p-4 flex-1 overflow-y-auto divide-y divide-border/60 font-mono text-xs">
                {ledgerItems.length === 0 ? (
                  <div className="py-16 text-center space-y-2 text-ink-faint">
                    <UtensilsCrossed className="w-8 h-8 mx-auto opacity-40" />
                    <p className="text-xs">Bill is empty. Add dishes to begin order ticket.</p>
                  </div>
                ) : (
                  ledgerItems.map((item) => (
                    <div key={item.dishId} className="py-2.5 flex items-center justify-between gap-2 group">
                      <div className="space-y-0.5 flex-1 min-w-0 pr-1">
                        <div className="font-bold text-ink flex items-center gap-1.5 truncate">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              item.dietary === "veg" ? "bg-dietary-veg" : "bg-dietary-nonveg"
                            }`}
                          />
                          <span className="truncate">{item.name}</span>
                        </div>
                        <div className="text-[10px] text-ink-secondary flex items-center gap-1.5">
                          <span>₹ {item.price.toFixed(2)}</span>
                          <span>·</span>
                          <span className="text-[9px] uppercase px-1 bg-canvas border border-border rounded-xs">
                            {item.station}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls & Total */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center border border-border bg-canvas rounded">
                          <button
                            onClick={() => onChangeQty(item.dishId, -1)}
                            className="px-1.5 py-0.5 text-ink-secondary hover:text-ink transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1.5 font-mono text-xs font-bold text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onChangeQty(item.dishId, 1)}
                            className="px-1.5 py-0.5 text-ink-secondary hover:text-ink transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-bold text-ink min-w-[56px] text-right">
                          ₹ {(item.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          onClick={() => onRemoveItem(item.dishId)}
                          className="text-ink-faint hover:text-dietary-nonveg transition-colors cursor-pointer p-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Receipt Footer Calculation */}
              <div className="p-4 bg-canvas border-t-2 border-dashed border-border space-y-2 font-mono text-xs">
                <div className="space-y-1 text-ink-secondary text-[11px]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-ink">₹ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGST (2.5%) + SGST (2.5%)</span>
                    <span className="text-ink">₹ {gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charge (5%)</span>
                    <span className="text-ink">₹ {serviceCharge.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-baseline justify-between font-mono">
                  <span className="text-xs uppercase tracking-wider font-bold text-ink">Grand Total</span>
                  <span className="text-xl font-bold text-brand">₹ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* Action Buttons Below Receipt */}
            <div className="space-y-2 pt-3">
              <div className="grid grid-cols-2 gap-2">
                <ReactiveButton
                  variant="outline"
                  size="md"
                  onClick={onTransmitKot}
                  leftIcon={<Printer className="w-3.5 h-3.5 text-brand" />}
                  className="w-full font-bold"
                >
                  Fire KOT
                </ReactiveButton>

                <ReactiveButton
                  variant="success"
                  size="md"
                  onClick={onSendWhatsApp}
                  leftIcon={<Send className="w-3.5 h-3.5 text-[#126E3A]" />}
                  className="w-full font-bold"
                >
                  WhatsApp Bill
                </ReactiveButton>
              </div>

              <ReactiveButton
                variant="primary"
                size="md"
                onClick={() => setSettlementModalOpen(true)}
                leftIcon={<CreditCard className="w-4 h-4 text-white" />}
                className="w-full text-xs uppercase tracking-wider py-3 shadow-md font-bold"
              >
                Settle Payment
              </ReactiveButton>
            </div>

          </div>

        </div>

      </div>

      {/* 4. INTERACTIVE PAYMENT SETTLEMENT MODAL (UPI QR, Cash, Split Bill) */}
      <PaymentSettlementModal
        isOpen={settlementModalOpen}
        onClose={() => setSettlementModalOpen(false)}
        table={selectedTable}
        items={ledgerItems}
        subtotal={subtotal}
        gst={gst}
        serviceCharge={serviceCharge}
        grandTotal={grandTotal}
        onConfirmSettlement={(method) => {
          onSettleBill();
        }}
      />

    </div>
  );
};
