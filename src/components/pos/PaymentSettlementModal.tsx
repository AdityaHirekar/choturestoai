'use client';

import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Banknote, 
  CreditCard, 
  Users, 
  CheckCircle2, 
  Printer, 
  Send, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ReactiveButton } from '@/components/animations/ReactiveButton';
import { Table, OrderItem } from '@/types/restaurant';

interface PaymentSettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: Table;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  serviceCharge: number;
  grandTotal: number;
  onConfirmSettlement: (paymentMethod: string) => void;
}

export const PaymentSettlementModal: React.FC<PaymentSettlementModalProps> = ({
  isOpen,
  onClose,
  table,
  items,
  subtotal,
  gst,
  serviceCharge,
  grandTotal,
  onConfirmSettlement,
}) => {
  const [method, setMethod] = useState<'upi' | 'cash' | 'card' | 'split'>('upi');
  const [tenderedAmount, setTenderedAmount] = useState<number>(Math.ceil(grandTotal / 100) * 100);
  const [splitCount, setSplitCount] = useState<number>(table.guestCount || 4);
  const [whatsappPhone, setWhatsappPhone] = useState<string>('98200 12345');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const changeToReturn = Math.max(0, tenderedAmount - grandTotal);
  const splitPerPerson = (grandTotal / splitCount).toFixed(2);

  const handleComplete = (payMethod: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onConfirmSettlement(payMethod);
        onClose();
      }, 1200);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-quick">
      <div className="bg-canvas-card border border-border w-full max-w-xl rounded-xl shadow-2xl overflow-hidden animate-modal-in">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-canvas flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold font-mono text-sm">
              {table.label}
            </div>
            <div>
              <h3 className="font-bold text-sm text-ink font-sans">Settle &amp; Close Bill</h3>
              <p className="text-xs text-ink-secondary font-mono">Captain: {table.captainName || 'Staff'} · {items.length} dishes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-secondary hover:text-ink hover:bg-canvas-subtle rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bill Summary Banner */}
        <div className="px-6 py-4 bg-brand/5 border-b border-border flex items-baseline justify-between font-mono">
          <div>
            <span className="text-xs uppercase text-ink-secondary tracking-wider">Total Payable Amount</span>
            <div className="text-xs text-ink-secondary mt-0.5">
              Subtotal: ₹ {subtotal.toFixed(2)} + GST: ₹ {gst.toFixed(2)}
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-brand tracking-tight">
            ₹ {grandTotal.toFixed(2)}
          </div>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 bg-dietary-veg/10 text-dietary-veg border-2 border-dietary-veg rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-ink">Bill Settled Successfully!</h4>
            <p className="text-xs font-mono text-ink-secondary">
              Table {table.label} marked vacant. Thermal receipt &amp; WhatsApp invoice generated.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            
            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-4 gap-2 bg-canvas border border-border p-1 rounded-lg text-xs font-mono">
              <button
                onClick={() => setMethod('upi')}
                className={`py-2 px-2 rounded-md font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === 'upi' ? 'bg-brand text-white shadow-xs' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>UPI QR</span>
              </button>
              <button
                onClick={() => setMethod('cash')}
                className={`py-2 px-2 rounded-md font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === 'cash' ? 'bg-brand text-white shadow-xs' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                <Banknote className="w-3.5 h-3.5" />
                <span>Cash</span>
              </button>
              <button
                onClick={() => setMethod('card')}
                className={`py-2 px-2 rounded-md font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === 'card' ? 'bg-brand text-white shadow-xs' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card / POS</span>
              </button>
              <button
                onClick={() => setMethod('split')}
                className={`py-2 px-2 rounded-md font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === 'split' ? 'bg-brand text-white shadow-xs' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Split Bill</span>
              </button>
            </div>

            {/* TAB 1: UPI SCAN & PAY */}
            {method === 'upi' && (
              <div className="border border-border bg-canvas p-5 rounded-lg flex flex-col sm:flex-row items-center gap-6">
                {/* Visual Crisp Vector QR */}
                <div className="w-36 h-36 bg-white p-2.5 rounded-lg border-2 border-border flex flex-col items-center justify-between shrink-0 shadow-xs">
                  <div className="w-full h-full border border-black/10 rounded flex items-center justify-center relative overflow-hidden bg-white">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                      {/* Corner markers */}
                      <rect x="5" y="5" width="28" height="28" fill="#1E1B18" />
                      <rect x="9" y="9" width="20" height="20" fill="#FFFFFF" />
                      <rect x="13" y="13" width="12" height="12" fill="#1E1B18" />
                      <rect x="67" y="5" width="28" height="28" fill="#1E1B18" />
                      <rect x="71" y="9" width="20" height="20" fill="#FFFFFF" />
                      <rect x="75" y="13" width="12" height="12" fill="#1E1B18" />
                      <rect x="5" y="67" width="28" height="28" fill="#1E1B18" />
                      <rect x="9" y="71" width="20" height="20" fill="#FFFFFF" />
                      <rect x="13" y="75" width="12" height="12" fill="#1E1B18" />
                      {/* Internal pattern pixels */}
                      <rect x="38" y="8" width="6" height="6" fill="#1E1B18" />
                      <rect x="48" y="16" width="6" height="6" fill="#1E1B18" />
                      <rect x="38" y="24" width="8" height="6" fill="#1E1B18" />
                      <rect x="54" y="28" width="6" height="8" fill="#1E1B18" />
                      <rect x="8" y="38" width="6" height="8" fill="#1E1B18" />
                      <rect x="20" y="44" width="6" height="6" fill="#1E1B18" />
                      <rect x="38" y="38" width="24" height="24" fill="#D95D39" rx="3" />
                      <rect x="70" y="38" width="8" height="6" fill="#1E1B18" />
                      <rect x="84" y="48" width="6" height="12" fill="#1E1B18" />
                      <rect x="38" y="68" width="8" height="8" fill="#1E1B18" />
                      <rect x="50" y="76" width="12" height="6" fill="#1E1B18" />
                      <rect x="68" y="68" width="8" height="6" fill="#1E1B18" />
                      <rect x="80" y="78" width="12" height="8" fill="#1E1B18" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-black uppercase mt-1">BHIM UPI Dynamic</span>
                </div>

                <div className="space-y-2.5 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-dietary-veg font-semibold font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Real-time Soundbox &amp; Webhook Ready</span>
                  </div>
                  <h4 className="text-sm font-bold text-ink">Scan with any Indian UPI App</h4>
                  <p className="text-xs text-ink-secondary font-mono">
                    Paytm · Google Pay · PhonePe · Cred · WhatsApp
                  </p>
                  <div className="text-[11px] font-mono text-ink-secondary bg-canvas-card px-2.5 py-1 border border-border inline-block rounded">
                    VPA: <strong>thespicejunction@okhdfcbank</strong>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CASH TENDER CALCULATOR */}
            {method === 'cash' && (
              <div className="border border-border bg-canvas p-5 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-ink-secondary">Quick Cash Buttons</span>
                  <span className="text-xs font-mono font-bold text-ink">Exact: ₹ {grandTotal.toFixed(0)}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                  <button
                    onClick={() => setTenderedAmount(Math.ceil(grandTotal))}
                    className={`py-2 px-3 border rounded transition-all active:scale-95 cursor-pointer font-bold ${
                      tenderedAmount === Math.ceil(grandTotal)
                        ? 'bg-brand text-white border-brand'
                        : 'bg-canvas-card border-border hover:border-brand text-ink'
                    }`}
                  >
                    Exact (₹ {Math.ceil(grandTotal)})
                  </button>
                  <button
                    onClick={() => setTenderedAmount(Math.ceil(grandTotal / 50) * 50)}
                    className={`py-2 px-3 border rounded transition-all active:scale-95 cursor-pointer font-bold ${
                      tenderedAmount === Math.ceil(grandTotal / 50) * 50 && tenderedAmount !== Math.ceil(grandTotal)
                        ? 'bg-brand text-white border-brand'
                        : 'bg-canvas-card border-border hover:border-brand text-ink'
                    }`}
                  >
                    ₹ {Math.ceil(grandTotal / 50) * 50}
                  </button>
                  <button
                    onClick={() => setTenderedAmount(1000)}
                    className={`py-2 px-3 border rounded transition-all active:scale-95 cursor-pointer font-bold ${
                      tenderedAmount === 1000
                        ? 'bg-brand text-white border-brand'
                        : 'bg-canvas-card border-border hover:border-brand text-ink'
                    }`}
                  >
                    ₹ 1,000
                  </button>
                  <button
                    onClick={() => setTenderedAmount(2000)}
                    className={`py-2 px-3 border rounded transition-all active:scale-95 cursor-pointer font-bold ${
                      tenderedAmount === 2000
                        ? 'bg-brand text-white border-brand'
                        : 'bg-canvas-card border-border hover:border-brand text-ink'
                    }`}
                  >
                    ₹ 2,000
                  </button>
                </div>

                {/* Return Change Indicator */}
                <div className="p-3 bg-canvas-card border border-border rounded flex items-center justify-between font-mono text-xs">
                  <span className="text-ink-secondary">Tendered: <strong>₹ {tenderedAmount}</strong></span>
                  <div className="flex items-center gap-2">
                    <span className="text-ink-secondary">Change to Return:</span>
                    <span className={`text-base font-bold ${changeToReturn > 0 ? 'text-dietary-veg' : 'text-ink'}`}>
                      ₹ {changeToReturn.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CARD / POS TERMINAL */}
            {method === 'card' && (
              <div className="border border-border bg-canvas p-5 rounded-lg space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink">External Card Swiper / EDC Machine</span>
                  <span className="text-dietary-veg font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                  </span>
                </div>
                <p className="text-ink-secondary">
                  Tap Visa / Mastercard / RuPay card on POS terminal. Amount <strong>₹ {grandTotal.toFixed(2)}</strong> pre-pushed to EDC Pinelabs.
                </p>
              </div>
            )}

            {/* TAB 4: SPLIT BILL */}
            {method === 'split' && (
              <div className="border border-border bg-canvas p-5 rounded-lg space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-ink-secondary uppercase">Guests Splitting</span>
                  <div className="flex items-center gap-2">
                    {[2, 3, 4, 5, 6].map((cnt) => (
                      <button
                        key={cnt}
                        onClick={() => setSplitCount(cnt)}
                        className={`w-7 h-7 rounded border font-bold transition-all active:scale-95 cursor-pointer ${
                          splitCount === cnt ? 'bg-brand text-white border-brand' : 'bg-canvas-card border-border text-ink'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-canvas-card border border-border rounded flex items-center justify-between">
                  <span>Each Person Pays:</span>
                  <span className="text-xl font-bold text-brand">₹ {splitPerPerson}</span>
                </div>
              </div>
            )}

            {/* WhatsApp Invoice Strip */}
            <div className="flex items-center gap-3 pt-1 text-xs font-mono">
              <span className="text-ink-secondary shrink-0 flex items-center gap-1">
                <Send className="w-3.5 h-3.5 text-dietary-veg" />
                <span>WhatsApp Bill:</span>
              </span>
              <input
                type="text"
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                placeholder="+91 Mobile number"
                className="flex-1 bg-canvas border border-border px-3 py-1.5 rounded text-ink font-mono text-xs focus:outline-none focus:border-brand"
              />
            </div>

            {/* Bottom Complete Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 border border-border bg-canvas hover:bg-canvas-subtle text-ink font-mono text-xs font-semibold rounded active:scale-95 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <ReactiveButton
                variant="primary"
                size="md"
                onClick={() => handleComplete(method.toUpperCase())}
                disabled={isProcessing}
                leftIcon={<Printer className="w-4 h-4 text-white" />}
                className="flex-1 text-xs uppercase tracking-wider py-2.5 shadow-md font-bold"
              >
                {isProcessing ? 'Verifying & Closing...' : `Confirm Payment (₹ ${grandTotal.toFixed(2)})`}
              </ReactiveButton>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
