import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import CookieConsent from "./components/CookieConsent";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LeadCaptureProvider } from "./contexts/LeadCaptureContext";
import Home from "./pages/Home";
import Owners from "./pages/Owners";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import BlogPillar from "./pages/BlogPillar";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VenuePickleball from "./pages/VenuePickleball";
import VenueCrossfit from "./pages/VenueCrossfit";
import VenueBadminton from "./pages/VenueBadminton";
import VenueTennis from "./pages/VenueTennis";
import VenueBouldering from "./pages/VenueBouldering";
import ShoeSanitizationMachine from "./pages/ShoeSanitizationMachine";

function Router() {
  return (
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
