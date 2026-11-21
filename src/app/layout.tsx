import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chotu Restro AI — Modern Restaurant Operating System",
  description: "Minimalist, AI-powered restaurant management platform: POS, KDS, Mobile QR menu, and Chotu voice assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-canvas text-ink antialiased min-h-screen flex flex-col selection:bg-accent selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
