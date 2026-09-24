import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

// Pages prerendered by scripts/prerender.ts carry data-ssr on #root and
// already contain the page's HTML, so React attaches to it (hydrates)
// instead of replacing it. Everything else renders from scratch.
if (container.dataset.ssr === "1") {
  hydrateRoot(container, <App />, {
    onRecoverableError(error) {
      // A mismatch makes React re-render that part on the client. The page
      // still works; log it so it can be fixed.
      console.warn("[hydration]", error);
    },
  });
} else {
  createRoot(container).render(<App />);
}
