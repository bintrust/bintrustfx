import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Script from "next/script";
import MainHeader from "@/components/dash/MainHeader";
import Sidebar from "@/components/dash/Sidebar";
import VerifyModal from "@/components/dash/VerifyModal";
import { getCurrentUser } from "@/lib/current-user";

/**
 * Dashboard chrome + auth guard. Ports partials/dash/head.ejs (assets),
 * mainheader/sidebar/verifymodal, footer, and corejsfiles.ejs (scripts).
 * The old Express `loginRequired` middleware becomes a server-side redirect.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/user/login");

  const year = new Date().getFullYear();

  return (
    <>
      {/* Stylesheets */}
      <link rel="stylesheet" href="/assets/dash/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/assets/dash/css/fonts.min.css" />
      <link rel="stylesheet" href="/assets/dash/css/atlantis.min.css" />
      <link rel="stylesheet" href="/assets/dash/css/customs.css" />
      <link rel="stylesheet" href="/assets/dash/css/style.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="/cdn.datatables.net/v/bs4/dt-1.10.21/af-2.3.5/b-1.6.3/b-flash-1.6.3/b-html5-1.6.3/b-print-1.6.3/r-2.2.5/datatables.min.css"
      />

      <div id="app" data-background-color="dark">
        <div className="wrapper">
          <MainHeader />
          <Sidebar />
          <VerifyModal />
          <div className="main-panel bg-dark">
            <div className="content bg-dark">
              <div className="page-inner">{children}</div>
            </div>
            <footer className="footer bg-dark text-light">
              <div className="container-fluid">
                <div className="row copyright text-center text-align-center">
                  <p>All Rights Reserved &copy; binatrust {year} </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Core JS (order preserved). LegacyContent waits for window.jQuery. */}
      <Script
        src="/ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/dash/js/plugin/webfont/webfont.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/dash/js/core/popper.min.js" strategy="afterInteractive" />
      <Script src="/assets/dash/js/core/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/assets/dash/js/customs.js" strategy="afterInteractive" />
      <Script
        src="/assets/dash/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/dash/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/dash/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/dash/js/plugin/jquery.sparkline/jquery.sparkline.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/dash/js/plugin/sweetalert/sweetalert.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/dash/js/plugin/bootstrap-notify/bootstrap-notify.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/cdn.datatables.net/v/bs4/dt-1.10.21/af-2.3.5/b-1.6.3/b-flash-1.6.3/b-html5-1.6.3/b-print-1.6.3/r-2.2.5/datatables.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/dash/js/atlantis.min.js" strategy="afterInteractive" />
    </>
  );
}
