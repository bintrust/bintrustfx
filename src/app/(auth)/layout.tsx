import type { ReactNode } from "react";

/** Chrome for the auth pages, mirroring partials/formhead.ejs stylesheets. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        href="/assets/temp/lib/bootstrap/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="/assets/temp/lib/font-awesome/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <link href="/assets/temp/css/frontend_style_blue.css" rel="stylesheet" />
      <div className="d-flex flex-column h-100 auth-page">{children}</div>
    </>
  );
}
