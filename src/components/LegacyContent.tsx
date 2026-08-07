"use client";

import { useEffect, useRef } from "react";

/**
 * Renders vendored HTTrack/jQuery markup faithfully.
 *
 * The legacy templates are static HTML driven by jQuery plugins with inline
 * init scripts. React does NOT execute <script> tags inserted via
 * dangerouslySetInnerHTML, so after mount we walk the injected markup and
 * re-create every <script> element in document order (awaiting external
 * sources) so the original behavior is preserved 1:1.
 *
 * jQuery + shared libs are loaded once in the layout; we wait for `window.jQuery`
 * before executing page scripts so plugin init code never runs before `$`.
 */

declare global {
  interface Window {
    jQuery?: unknown;
    $?: unknown;
  }
}

function waitForJQuery(timeoutMs = 8000): Promise<void> {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      if (typeof window !== "undefined" && window.jQuery) return resolve();
      if (Date.now() - start > timeoutMs) return resolve(); // fail open
      setTimeout(tick, 50);
    };
    tick();
  });
}

function loadScript(original: HTMLScriptElement): Promise<void> {
  return new Promise((resolve) => {
    const s = document.createElement("script");
    for (const attr of Array.from(original.attributes)) {
      s.setAttribute(attr.name, attr.value);
    }
    if (original.src) {
      s.onload = () => resolve();
      s.onerror = () => resolve(); // don't block the chain on a dead CDN
      original.replaceWith(s);
    } else {
      s.textContent = original.textContent;
      original.replaceWith(s);
      resolve();
    }
  });
}

export default function LegacyContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    let cancelled = false;

    (async () => {
      await waitForJQuery();
      const scripts = Array.from(container.querySelectorAll("script"));
      for (const script of scripts) {
        if (cancelled) return;
        await loadScript(script as HTMLScriptElement);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
