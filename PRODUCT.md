# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (React) + TypeScript + Tailwind CSS (Full-stack App Router with PWA & WebSockets)

## Users

* **Restaurant Cashiers & Captains**: Need rapid, error-proof order logging, live table map oversight, quick bill generation, and split-second KOT dispatch during high-volume rush hours.
* **Kitchen Staff & Head Chefs**: Require high-contrast, glanceable ticket pacing (KDS) with station-specific routing (e.g., Tandoor vs Hot Curry) and visual time warnings.
* **Dine-in Guests & Delivery Customers**: Demand instant QR-code mobile ordering with zero app download, clear Indian dietary indicators (FSSAI Veg/Non-Veg), dish customization, and direct UPI settlement.
* **Restaurant Owners & Cloud Kitchen Operators**: Need real-time business visibility, recipe-level inventory monitoring, automated stock-out protection, dynamic pricing suggestions, and WhatsApp customer re-engagement.

## Product Purpose

Chotu Restro AI unifies fragmented restaurant operations (POS, KDS, inventory, QR ordering, and customer communication) into a single, cohesive, data-driven operating system. It reduces manual errors, prevents food wastage through ingredient-level consumption tracking, and accelerates service speed with an integrated, hands-free AI voice assistant (*Chotu*) tuned for Indian restaurant environments.

## Positioning

Unlike legacy POS software (Petpooja, Posist, Toast) that rely on cluttered multi-nested menus and manual entry, Chotu Restro AI combines an architectural Swiss-minimalist interface with an autonomous AI copilot and voice assistant (*Chotu*). Staff can issue commands naturally in Hinglish (*"Table 4 pe do Garlic Naan add karo"* or *"Paneer Tikka out of stock mark karo"*), automatically updating the POS, KDS, QR menus, and supplier inventory in under 500 milliseconds.

## Operating Context

* **Physical Environment**: High-noise, fast-paced Indian restaurant floors, hot tandoor/curry kitchen stations, cashier counters with thermal receipt printers, and outdoor/indoor dining tables.
* **Network & Hardware Constraints**: Variable or intermittent WiFi connectivity requiring robust offline-first PWA caching; device targets range from 6" guest smartphones to 10"–15" Android/iPad counter tablets and 24"–32" kitchen wall monitors.
* **Rituals & Workflows**: Table seating → order taking (manual or QR scan) → KOT firing to kitchen → prep aging & ticket bumping → bill presentation with CGST/SGST → WhatsApp digital invoice + UPI settlement.

## Capabilities and Constraints

* **Point of Sale (POS)**: Visual floor plan table states (Vacant, Occupied, Billed), split billing, item modifiers, CGST/SGST (2.5% each) + optional service charge calculations.
* **Kitchen Display System (KDS)**: Real-time ticket queue with color-coded aging (🟢 Pacing Norm → 🟡 Nearing Threshold → 🔴 Overdue), station filtering, and one-tap bumping.
* **Customer QR Digital Menu**: Mobile-first responsive web app, FSSAI green-dot (Veg) and brown/red-dot (Non-Veg) badges, spice level indicators, and direct UPI deep-linking (GPay, PhonePe, Paytm).
* **Chotu Voice Operational Assistant**: Multilingual Hinglish speech recognition engine for hands-free order modifications, stock status toggles, and instant sales queries.
* **Inventory & Menu Synchronization**: Automatic dish deactivation when core raw ingredients deplete below safety thresholds.

## Brand Commitments

* **Product Name**: Chotu Restro AI
* **Persona**: *Chotu* — ever-vigilant, ultra-fast, respectful, and sharp restaurant companion who remembers regulars and keeps operations flowing smoothly.
* **Binding Visual Style Reference**: [kopetzki.law](https://kopetzki.law/) (Obys Agency) — Swiss architectural minimalism, hairline grid cells (`1px` structural borders), monospaced technical indexing (`[01 // POS]`), restrained Saffron Ochre (`#E58A13`) accent on deep Obsidian (`#090A0D`).

## Evidence on Hand

* **Interactive Prototype**: `chotu_minimalist_preview.html` demonstrating interactive POS, KDS, Guest QR Menu, and Chotu Voice Console.
* **Design Blueprint**: `design_specification.md` and `kopetzki_design_translation.md` detailing technical architecture, Indian tax compliance, and component tokens.

## Product Principles

1. **Glanceable Over Decorative**: Every pixel must serve split-second operational clarity during dinner peaks; zero visual clutter or distracting ornamentation.
2. **Sub-Second Synchronization**: Any state change (order placed, dish marked out-of-stock, ticket bumped) must reflect across all connected surfaces in <500ms.
3. **Culturally Native by Default**: Indian dietary markers (Veg/Non-Veg), Indian tax structures (CGST/SGST), UPI payments, and natural Hinglish voice grammar are core foundation layers, not localized afterthoughts.
4. **Resilient to Reality**: Network drops and kitchen spills are normal; the software must operate offline-first and recover seamlessly.
