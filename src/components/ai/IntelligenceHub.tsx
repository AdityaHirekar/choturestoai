"use client";

import React, { useState, useRef } from "react";
import {
  AlertCircle,
  TrendingUp,
  Clock,
  ShieldAlert,
  Cpu,
  Check,
  ShoppingBag,
  Store,
  Globe,
  Tag,
  ArrowUpRight,
  Calendar,
  Sparkles,
  PieChart,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  CHANNEL_SALES_SPLIT,
  WEEKLY_TRAFFIC_SOURCES,
  PROMOTION_IMPACTS,
} from "@/data/mockData";
import {
  ChannelMixDoughnut,
  WeeklyTrafficChart,
  PromotionRoiChart,
  HourlyKitchenVelocityChart,
} from "@/components/analytics/RestaurantCharts";
import { useStaggerEntrance } from "@/lib/anime";

export const IntelligenceHub: React.FC = () => {
  const [poSent, setPoSent] = useState<boolean>(false);
  const [promoSent, setPromoSent] = useState<boolean>(false);
  const [deliveryThrottled, setDeliveryThrottled] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useStaggerEntrance(containerRef, ".analytics-card");

  // Calculate totals for promotions
  const totalDiscountSpent = PROMOTION_IMPACTS.reduce((acc, p) => acc + p.discountSpent, 0);
  const totalPromoRevenue = PROMOTION_IMPACTS.reduce((acc, p) => acc + p.revenueGenerated, 0);
  const blendedRoi = (totalPromoRevenue / totalDiscountSpent).toFixed(1);

  return (
    <div ref={containerRef} className="flex-1 p-6 lg:p-10 bg-canvas space-y-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-border pb-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-ink tracking-tight">
              Operational Intelligence &amp; Economics
            </h2>
            <span className="w-2 h-2 rounded-full bg-dietary-veg"></span>
          </div>
          <p className="text-xs text-ink-secondary mt-1">
            Real-time interactive Chart.js analytics, channel revenue attribution, and kitchen rush dynamics
          </p>
        </div>

        <div className="text-xs text-ink-secondary flex items-center gap-1.5 border border-border bg-canvas-card px-3 py-1.5 font-mono rounded">
          <Cpu className="w-3.5 h-3.5 text-brand" />
          <span>Chotu Copilot Active • Real-time Sync</span>
        </div>
      </div>

      {/* Top 4 Key Business Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="analytics-card bg-canvas-card border border-border p-5 space-y-1 rounded shadow-2xs hover:border-brand/40 transition-colors">
          <div className="text-xs font-mono text-ink-secondary uppercase">Today&apos;s Revenue</div>
          <div className="text-2xl font-bold font-mono text-ink">₹ 42,850.00</div>
          <div className="text-xs text-dietary-veg font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% vs 7-day average</span>
          </div>
        </div>

        <div className="analytics-card bg-canvas-card border border-border p-5 space-y-1 rounded shadow-2xs hover:border-brand/40 transition-colors">
          <div className="text-xs font-mono text-ink-secondary uppercase">Table Occupancy</div>
          <div className="text-2xl font-bold font-mono text-ink">
            8 <span className="text-sm font-normal text-ink-secondary">/ 14 Tables</span>
          </div>
          <div className="text-xs text-ink-secondary">57.1% dine-in capacity</div>
        </div>

        <div className="analytics-card bg-canvas-card border border-border p-5 space-y-1 rounded shadow-2xs hover:border-brand/40 transition-colors">
          <div className="text-xs font-mono text-ink-secondary uppercase">Kitchen Prep Pace</div>
          <div className="text-2xl font-bold font-mono text-ink">8m 14s</div>
          <div className="text-xs text-ink-secondary flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Target: &lt;10 mins</span>
          </div>
        </div>

        <div className="analytics-card bg-canvas-card border border-border p-5 space-y-1 rounded shadow-2xs hover:border-brand/40 transition-colors">
          <div className="text-xs font-mono text-ink-secondary uppercase">Active KOT Tickets</div>
          <div className="text-2xl font-bold font-mono text-ink">6 Queued</div>
          <div className="text-xs text-brand font-medium">1 ticket approaching 10m</div>
        </div>
      </div>

      {/* SECTION 1: Channel Sales Mix Breakdown with Chart.js Doughnut */}
      <div className="analytics-card bg-canvas-card border border-border p-6 space-y-6 rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <h3 className="font-bold text-sm text-ink uppercase tracking-wider font-mono flex items-center gap-2">
              <PieChart className="w-4 h-4 text-brand" />
              <span>Channel Sales Mix (% Split)</span>
            </h3>
            <p className="text-xs text-ink-secondary mt-0.5">
              Interactive Chart.js revenue attribution across in-store dining, delivery aggregators, and direct QR
            </p>
          </div>
          <div className="text-xs font-mono text-ink-secondary">
            Gross Tracked: <strong className="text-ink">₹ 42,850.00</strong> (76 Orders)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Doughnut Chart */}
          <div className="lg:col-span-5 bg-canvas border border-border p-4 rounded flex flex-col items-center justify-center">
            <div className="text-xs font-mono text-ink-secondary font-bold uppercase tracking-wider mb-2">
              Attribution Mix
            </div>
            <ChannelMixDoughnut />
          </div>

          {/* 3 Detailed Breakdown Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CHANNEL_SALES_SPLIT.map((item) => {
              const isStore = item.channel === "store";
              const isAggregator = item.channel === "aggregators";
              return (
                <div
                  key={item.channel}
                  className="border border-border p-4 bg-canvas flex flex-col justify-between space-y-4 rounded"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-ink-secondary flex items-center gap-1.5">
                        {isStore ? (
                          <Store className="w-3.5 h-3.5 text-ink" />
                        ) : isAggregator ? (
                          <ShoppingBag className="w-3.5 h-3.5 text-brand" />
                        ) : (
                          <Globe className="w-3.5 h-3.5 text-dietary-veg" />
                        )}
                        <span>{item.channel === "store" ? "In-Store" : item.channel === "aggregators" ? "Aggregators" : "Direct Site"}</span>
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 border border-border bg-canvas-card rounded">
                        {item.percentage}%
                      </span>
                    </div>

                    <div>
                      <div className="text-xl font-bold font-mono text-ink">
                        ₹ {item.revenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs font-mono text-ink-secondary mt-1 flex items-center justify-between">
                        <span>{item.orderCount} Orders</span>
                        <span>AOV: ₹ {item.averageOrderValue.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border text-[11px] leading-relaxed text-ink-secondary">
                    {isStore && (
                      <span className="text-ink font-medium">
                        100% margin retention. Zero marketplace commissions deducted.
                      </span>
                    )}
                    {isAggregator && (
                      <span className="text-brand font-medium">
                        ~22% blended commission fee (est. ₹ 3,157 cut paid to platforms).
                      </span>
                    )}
                    {!isStore && !isAggregator && (
                      <span className="text-dietary-veg font-medium">
                        Saved ₹ 1,320 in aggregator fees by routing via direct website QR.
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: Weekly Traffic & Source Attribution with Dual-Axis Chart */}
      <div className="analytics-card bg-canvas-card border border-border p-6 space-y-6 rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <h3 className="font-bold text-sm text-ink uppercase tracking-wider font-mono flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brand" />
              <span>Weekly Orders &amp; Revenue Trends</span>
            </h3>
            <p className="text-xs text-ink-secondary mt-0.5">
              Dual-axis interactive Chart.js volume and gross receipts progression across the week
            </p>
          </div>
          <div className="text-xs font-mono text-ink-secondary">
            Peak Day: <strong className="text-brand">Saturday (114 Orders · ₹ 68,400)</strong>
          </div>
        </div>

        {/* Dual Axis Chart */}
        <div className="bg-canvas border border-border p-4 rounded">
          <WeeklyTrafficChart />
        </div>

        {/* Day-by-Day Matrix / Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-ink-secondary font-mono uppercase text-[11px]">
                <th className="py-2.5 pr-4 font-medium">Day</th>
                <th className="py-2.5 px-3 font-medium text-right">Total Orders</th>
                <th className="py-2.5 px-3 font-medium">Source Mix (Store / Aggregators / Site)</th>
                <th className="py-2.5 px-3 font-medium">Top Traffic Driver</th>
                <th className="py-2.5 pl-3 font-medium text-right">Day Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              {WEEKLY_TRAFFIC_SOURCES.map((d) => (
                <tr
                  key={d.day}
                  className={`hover:bg-canvas-subtle transition-colors ${
                    d.isPeakDay ? "bg-canvas-subtle/70 font-semibold" : ""
                  }`}
                >
                  <td className="py-3 pr-4 font-sans text-ink flex items-center gap-2">
                    <span>{d.day}</span>
                    {d.isPeakDay && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-brand text-white font-bold rounded-xs">
                        Weekly Peak
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right text-ink font-bold">
                    {d.totalOrders}
                  </td>
                  <td className="py-3 px-3 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-border flex overflow-hidden rounded-xs">
                        <div
                          style={{ width: `${(d.storeOrders / d.totalOrders) * 100}%` }}
                          className="bg-ink h-full"
                          title={`Store: ${d.storeOrders}`}
                        />
                        <div
                          style={{ width: `${(d.aggregatorOrders / d.totalOrders) * 100}%` }}
                          className="bg-brand h-full"
                          title={`Aggregators: ${d.aggregatorOrders}`}
                        />
                        <div
                          style={{ width: `${(d.siteOrders / d.totalOrders) * 100}%` }}
                          className="bg-dietary-veg h-full"
                          title={`Site: ${d.siteOrders}`}
                        />
                      </div>
                      <span className="text-[10px] text-ink-secondary whitespace-nowrap">
                        {d.storeOrders}/{d.aggregatorOrders}/{d.siteOrders}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-sans text-ink">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <ArrowUpRight className="w-3 h-3 text-brand flex-shrink-0" />
                      <span>{d.topSource}</span>
                    </span>
                  </td>
                  <td className="py-3 pl-3 text-right font-bold text-ink">
                    ₹ {d.revenue.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Traffic Key Insights Banner */}
        <div className="border border-border p-4 bg-canvas flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono rounded">
          <div className="space-y-1">
            <span className="text-ink font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span>Chotu Traffic Synthesis</span>
            </span>
            <p className="text-ink-secondary font-sans text-xs">
              <strong>Saturday &amp; Friday</strong> dominate in-store dining (60% dine-in share). 
              <strong> Mid-week dinner surges (Tuesday–Wednesday)</strong> are heavily driven by Swiggy, Zomato, and Toing delivery.
            </p>
          </div>
          <div className="text-right whitespace-nowrap">
            <div className="text-ink-secondary">Weekly Cumulative</div>
            <div className="text-base font-bold text-ink font-mono">₹ 2,94,000 (488 Orders)</div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Promotions & Discount ROI Impact with Grouped Bar Chart */}
      <div className="analytics-card bg-canvas-card border border-border p-6 space-y-6 rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <h3 className="font-bold text-sm text-ink uppercase tracking-wider font-mono flex items-center gap-2">
              <Tag className="w-4 h-4 text-brand" />
              <span>Promotions &amp; Discount ROI Impact</span>
            </h3>
            <p className="text-xs text-ink-secondary mt-0.5">
              Cost of discounting vs attributed revenue, guest retention rates, and net margin impact
            </p>
          </div>
          <div className="text-xs font-mono text-ink-secondary flex items-center gap-4 flex-wrap">
            <span>Spent: <strong className="text-dietary-nonveg">₹ {totalDiscountSpent.toLocaleString("en-IN")}</strong></span>
            <span>Attributed Rev: <strong className="text-dietary-veg">₹ {totalPromoRevenue.toLocaleString("en-IN")}</strong></span>
            <span>Blended ROI: <strong className="text-ink">{blendedRoi}x</strong></span>
          </div>
        </div>

        {/* Chart.js Grouped Bar Chart */}
        <div className="bg-canvas border border-border p-4 rounded">
          <PromotionRoiChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROMOTION_IMPACTS.map((promo) => (
            <div
              key={promo.id}
              className="border border-border p-5 bg-canvas flex flex-col justify-between space-y-4 rounded"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 bg-canvas-card border border-border text-ink rounded">
                      {promo.code}
                    </span>
                    <span className="text-[11px] font-mono text-ink-secondary">
                      {promo.channel}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 border rounded ${
                      promo.marginHealth === "healthy"
                        ? "border-dietary-veg text-dietary-veg bg-dietary-veg/5 font-semibold"
                        : "border-brand text-brand bg-brand/5 font-semibold"
                    }`}
                  >
                    {promo.marginHealth === "healthy" ? "Healthy Margin" : "Moderate Margin"}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-ink">{promo.name}</h4>
                  <p className="text-xs text-ink-secondary mt-1 leading-relaxed">
                    {promo.insightNote}
                  </p>
                </div>
              </div>

              {/* Promo Metrics Grid */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border text-center font-mono text-xs">
                <div className="p-2 bg-canvas-card border border-border rounded">
                  <div className="text-[10px] text-ink-secondary uppercase">Discount</div>
                  <div className="font-bold text-ink mt-0.5">₹ {promo.discountSpent}</div>
                </div>
                <div className="p-2 bg-canvas-card border border-border rounded">
                  <div className="text-[10px] text-ink-secondary uppercase">Revenue</div>
                  <div className="font-bold text-ink mt-0.5">₹ {promo.revenueGenerated.toLocaleString("en-IN")}</div>
                </div>
                <div className="p-2 bg-canvas-card border border-border rounded">
                  <div className="text-[10px] text-ink-secondary uppercase">ROI</div>
                  <div className="font-bold text-dietary-veg mt-0.5">{promo.roiMultiplier}</div>
                </div>
                <div className="p-2 bg-canvas-card border border-border rounded">
                  <div className="text-[10px] text-ink-secondary uppercase">Repeat Rate</div>
                  <div className="font-bold text-ink mt-0.5">{promo.repeatGuestRate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Rush Velocity & Kitchen Pace Chart */}
      <div className="analytics-card bg-canvas-card border border-border p-6 space-y-4 rounded shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <h3 className="font-bold text-sm text-ink uppercase tracking-wider font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand" />
              <span>Hourly Rush Velocity &amp; Kitchen Prep Pace</span>
            </h3>
            <p className="text-xs text-ink-secondary mt-0.5">
              Live ticket arrival load (Tickets/hr) vs station preparation speed across lunch and dinner service
            </p>
          </div>
          <div className="text-xs font-mono text-ink-secondary">
            Avg Service Speed: <strong className="text-dietary-veg">8m 14s (Target &lt; 10m)</strong>
          </div>
        </div>
        <div className="bg-canvas border border-border p-4 rounded">
          <HourlyKitchenVelocityChart />
        </div>
      </div>

      {/* Actionable Operational Suggestions (Chotu Autopilot) */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-ink font-mono uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand" />
          <span>Suggested Operational Actions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Critical Depletion */}
          <div className="analytics-card bg-canvas-card border border-border p-5 flex flex-col justify-between space-y-4 rounded shadow-2xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-dietary-nonveg font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Low Stock Warning</span>
                </span>
                <span className="text-ink-secondary">Depletion in 45m</span>
              </div>

              <h4 className="font-bold text-base text-ink">Heavy Dairy Cream &amp; Butter</h4>

              <p className="text-xs text-ink-secondary leading-relaxed">
                At current dinner velocity (14 gravies/hr), dairy cream stock will run dry before the 9:30 PM peak.
              </p>
            </div>

            <button
              onClick={() => setPoSent(true)}
              className="w-full py-2 bg-canvas hover:bg-canvas-subtle border border-border text-xs text-ink font-medium transition-all active:scale-95 rounded flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {poSent ? (
                <>
                  <Check className="w-3.5 h-3.5 text-dietary-veg" />
                  <span>Order Dispatched (Blinkit B2B)</span>
                </>
              ) : (
                <span>Auto Purchase Order</span>
              )}
            </button>
          </div>

          {/* Card 2: Dynamic Yield */}
          <div className="analytics-card bg-canvas-card border border-border p-5 flex flex-col justify-between space-y-4 rounded shadow-2xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-brand font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Revenue Opportunity</span>
                </span>
                <span className="text-dietary-veg font-bold">+₹ 4,200</span>
              </div>

              <h4 className="font-bold text-base text-ink">Surplus Dum Biryani Handis</h4>

              <p className="text-xs text-ink-secondary leading-relaxed">
                12 portions of slow-cooked mutton biryani remain unsold. Suggest sending a 15% discount WhatsApp deal to 120 regular guests nearby.
              </p>
            </div>

            <button
              onClick={() => setPromoSent(true)}
              className="w-full py-2 bg-brand/10 hover:bg-brand text-brand hover:text-white border border-brand/30 hover:border-brand text-xs font-bold transition-all active:scale-95 rounded flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {promoSent ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Broadcast Sent (120 Guests)</span>
                </>
              ) : (
                <span>Send WhatsApp Flash Promo</span>
              )}
            </button>
          </div>

          {/* Card 3: Kitchen Throttling */}
          <div className="analytics-card bg-canvas-card border border-border p-5 flex flex-col justify-between space-y-4 rounded shadow-2xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accent font-bold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>KDS Load Guard</span>
                </span>
                <span className="text-ink-secondary">Curry station at 88%</span>
              </div>

              <h4 className="font-bold text-base text-ink">Throttle Delivery Aggregators</h4>

              <p className="text-xs text-ink-secondary leading-relaxed">
                Curry station has 6 pending handis. Throttle Swiggy, Zomato &amp; Toing incoming orders for 20 mins to protect in-house guest table SLA.
              </p>
            </div>

            <button
              onClick={() => setDeliveryThrottled(!deliveryThrottled)}
              className={`w-full py-2 border text-xs font-medium transition-all active:scale-95 rounded flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
                deliveryThrottled
                  ? "bg-dietary-veg text-white border-dietary-veg font-bold"
                  : "bg-canvas hover:bg-canvas-subtle border-border text-ink"
              }`}
            >
              {deliveryThrottled ? (
                <span>Aggregators Throttled (20m Timer)</span>
              ) : (
                <span>Activate 20m Kitchen Throttle</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


