import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "binatrust || Sparkup Your Coin",
  description:
    "binatrust is totally different from its competitors trying to achieve something special starting with the...",
  keywords: ["binatrust", "Bitcoin Investment", "Bitcoin Trading Company"],
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/images/icon/apple-touch-icon.png",
  },
  manifest: "/assets/js/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FD961A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="no-js">
      <body>{children}</body>
    </html>
  );
}
