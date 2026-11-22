# Chotu Restro AI 🍽️✨

> **The Artisanal Restaurant Operating System** — Eliminate order clutter, reclaim predatory 22% aggregator commissions, and coordinate kitchen stations with calm handwriting and voice intelligence.

Inspired by [RestroBomb](https://restrobomb.com), **Chotu Restro AI** is a modern, all-in-one hospitality operating platform built for cafes, bistros, and high-volume dining establishments.

---

## 🌟 Key Features & Modules

### 1. 🚀 Atmospheric Landing Page & Interactive Demo Booking
* **Culinary Hero**: Powered by a lightweight 3D interactive contour map (`Topography`), TrueFocus headline animation, and live menu walk-through booking.
* **Interactive ROI Calculator**: Real-time monthly savings simulator showing how shifting 10–35% of orders from aggregators to Direct QR saves ₹25,000–₹85,000+ monthly in commission fees.
* **15-Minute Live Demo Scheduler**: Format selection (Dine-in, QSR, Cloud Kitchen), date & time slot picking with instant WhatsApp invite confirmation simulation.
* **Transparent Pricing**: ₹6,500/year flat licensing with 0% commission on direct orders and zero proprietary hardware locks (BYOD).

### 2. 🛵 Multi-Channel Orders & Delivery Dispatch Hub
* **Unified Ledger**: Tracks Dine-In, Takeaway, Direct Delivery, and Aggregator channels in one place.
* **Context Badges**:
  * **Dine In**: Soft blue badge + Table designation.
  * **Takeout**: Amber badge + Table designation + Pickup time countdown + takeout bag indicator.
  * **Direct Delivery**: Peach badge + Table designation + full street address display.
  * **Online Delivery**: Pink badge + Aggregator tracking (Uber Eats, DoorDash, Grubhub, Zomato, Swiggy) with rider status and handover OTP.
* **Interactive Aggregator Controls**:
  * Real-time counters for **New**, **Ongoing**, and **Done** across platforms.
  * Instant toggle switches to pause/resume ordering channels.
* **Two-Way Dispatch**: Active Dispatch queue vs. Completed Orders archive with today's settlement totals.

### 3. 🖥️ POS Terminal & Table Management
* **Instant Billing**: Real-time table selection with occupancy, capacity, and captain assignments.
* **Fast Menu Discovery**: Dietary filtering (Veg, Non-Veg), category navigation (Starters, Mains, Breads, Beverages, Desserts), and keyword search.
* **Tax & Settlement**: CGST (2.5%) + SGST (2.5%) + Service Charge calculation.
* **Action Triggers**: One-click **Fire KOT** (sends to kitchen), **WhatsApp Tax Invoice**, and **Settle Payment**.

### 4. 👨‍🍳 Kitchen Display System (KDS)
* **Real-Time Ticket Queue**: Color-coded urgency timers (Normal, Warning, Urgent).
* **Station Breakdown**: Automatic routing by station (`curry`, `tandoor`, `beverages`).
* **Bump & Recall**: One-tap ticket completion, with full undo capability to recall bumped tickets.

### 5. 📱 Guest QR Mobile Menu
* **Table-Side Ordering**: Simulated smartphone viewport for contactless dining.
* **Fast Checkout**: Add to cart, live quantity adjustments, and simulated instant UPI settlement (`Pay Now & Confirm`).

### 6. 📊 Restaurant Intelligence & Channel Analytics
* **Channel Sales Split**: Percentage breakdowns between In-Store Sales, Online Aggregators, and Direct Website orders.
* **Weekly Traffic Patterns**: Day-by-day analysis identifying peak dine-in hours vs. late-night delivery spikes.
* **Promotion & Discount Impact**: ROI multipliers, customer repeat rates, and margin health diagnostics for campaigns.

### 7. 🎙️ "Ask Chotu" AI Voice Assistant
* Natural language voice commands to fire orders ("Add 2 Garlic Naan to Table 4"), check kitchen statuses, or trigger invoices hands-free during dinner rushes.

---

## 🎨 Design System: Warm Espresso & Terracotta

Engineered with modern hospitality aesthetics using the **60-30-10 rule**:
* **60% Canvas / Background**: Warm Alabaster (`#FAF8F5`) — inviting, organic like linen and ceramic.
* **30% Cards / Surfaces**: Soft Oat (`#EFECE6`) — comfortable tactile cards and containers.
* **Primary Text**: Deep Espresso (`#1E1B18`) — sharp legibility in dim bistros and bright cafes.
* **Muted Text**: Warm Taupe (`#6E675F`) — calm metadata and labels.
* **10% Pop Accents**: Burnt Terracotta (`#D95D39`) — energetic appetite cue for primary CTAs and badges.

### Switchable Theme Modes
1. **Warm Espresso & Terracotta** (Default): Cafes, bistros, and full-service dining.
2. **Chalk, Stone & Forest**: Crisp, fresh & tech-forward for inventory, KDS, and analytics.
3. **Clean Minimal & Fresh Green**: Salad bars, healthy bowls, and breakfast cafes.
4. **Obsidian & Warm Amber** (Dark Mode): Bar/lounge POS systems, upscale dining tech, and dark-mode command centers.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Micro-Interactions**: Custom Canvas-based animations (`ClickSpark`, `ReactiveButton`, `Topography`, `TrueFocus`, `CountUp`)
* **Language**: TypeScript

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AdityaHirekar/choturestoai.git
cd choturestoai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📄 License

MIT License. Crafted with precision for modern restaurant operators.
