/*
 * Build-time server renderer.
 *
 * scripts/prerender.ts calls render(path) for every route and writes the
 * resulting HTML into that route's index.html, so crawlers that don't run
 * JavaScript see the real page content. In the browser, main.tsx hydrates
 * that HTML instead of rendering from scratch.
 *
 * Built with: vite build --ssr src/entry-server.tsx
 */
import { prerenderToNodeStream } from "react-dom/static";
import { Router } from "wouter";
import App from "./App";

export async function render(path: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <Router ssrPath={path}>
      <App />
    </Router>,
  );

  const chunks: Buffer[] = [];
  for await (const chunk of prelude) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}
