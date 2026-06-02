import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import CookieConsent from "./components/CookieConsent";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LeadCaptureProvider } from "./contexts/LeadCaptureContext";

// Route-level code splitting — each page is a separate JS chunk.
// The browser only downloads the code for the page being visited.
const Home               = lazy(() => import("./pages/Home"));
const Owners             = lazy(() => import("./pages/Owners"));
const About              = lazy(() => import("./pages/About"));
const FAQ                = lazy(() => import("./pages/FAQ"));
const Contact            = lazy(() => import("./pages/Contact"));
const HowItWorks         = lazy(() => import("./pages/HowItWorks"));
const Blog               = lazy(() => import("./pages/Blog"));
const BlogArticle        = lazy(() => import("./pages/BlogArticle"));
const BlogPillar         = lazy(() => import("./pages/BlogPillar"));
const Privacy            = lazy(() => import("./pages/Privacy"));
const Terms              = lazy(() => import("./pages/Terms"));
const VenuePickleball    = lazy(() => import("./pages/VenuePickleball"));
const VenueCrossfit      = lazy(() => import("./pages/VenueCrossfit"));
const VenueBadminton     = lazy(() => import("./pages/VenueBadminton"));
const VenueTennis        = lazy(() => import("./pages/VenueTennis"));
const VenueBouldering    = lazy(() => import("./pages/VenueBouldering"));
const ShoeSanitizationMachine = lazy(() => import("./pages/ShoeSanitizationMachine"));

// Minimal fallback — invisible, no layout shift
const PageShell = () => (
  <div style={{ minHeight: "100vh", background: "#0a0a0a" }} />
);

function Router() {
  return (
    <Suspense fallback={<PageShell />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/how-it-works"} component={HowItWorks} />
        <Route path={"/owners"} component={Owners} />
        <Route path={"/about"} component={About} />
        <Route path={"/faq"} component={FAQ} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/pillar/:slug"} component={BlogPillar} />
        <Route path={"/blog/:slug"} component={BlogArticle} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        {/* Venue landing pages */}
        <Route path={"/pickleball-clubs"} component={VenuePickleball} />
        <Route path={"/crossfit-gyms"} component={VenueCrossfit} />
        <Route path={"/badminton-centers"} component={VenueBadminton} />
        <Route path={"/tennis-clubs"} component={VenueTennis} />
        <Route path={"/bouldering-gyms"} component={VenueBouldering} />
        <Route path={"/shoe-sanitization-machine"} component={ShoeSanitizationMachine} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <LeadCaptureProvider>
            <Toaster />
            <Router />
            <CookieConsent />
          </LeadCaptureProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
