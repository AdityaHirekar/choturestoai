import { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Book a 15-Minute Demo — Chotu Restro AI",
  description: "Experience Chotu Restro AI: The intelligent restaurant operating system with POS, QR menu, real-time KDS, voice intelligence, and 0% commission direct ordering. Book your personalized 15-minute walkthrough.",
};

export default function DemoPage() {
  return <LandingPage />;
}
