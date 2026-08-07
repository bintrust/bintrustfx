import type { ReactNode } from "react";
import Script from "next/script";
import Header from "@/components/site/Header";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Preloader from "@/components/site/Preloader";
import { getCurrentUser } from "@/lib/current-user";

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      {/* Shared stylesheets (served from /public) */}
      <link
        rel="stylesheet"
        href="/assets/cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.html"
      />
      <link href="/assets/css/main.css" rel="stylesheet" />
      <link href="/assets/css/animate.min.css" rel="stylesheet" />
      <link href="/assets/css/select2.min.css" rel="stylesheet" />

      {/* Core jQuery libs. LegacyContent waits for window.jQuery before running
          page scripts, so afterInteractive ordering is safe. */}
      <Script src="/assets/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery-ui.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.form.js" strategy="afterInteractive" />

      <Header user={user} />
      <Nav />
      <Preloader />
      {children}
      <Footer />
    </>
  );
}
