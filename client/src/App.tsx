import NotFound from "@/pages/NotFound";
import { useEffect } from "react";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import seo from "./lib/seo-pages.json";
import Home from "./pages/Home";
import EducationProgram from "./pages/EducationProgram";
import MedicalServices from "./pages/MedicalServices";
import TribalDistribution from "./pages/TribalDistribution";
import BalaVikas from "./pages/BalaVikas";
import ReligiousCultural from "./pages/ReligiousCultural";
import Contact from "./pages/Contact";

// Deploy base path without the trailing slash ("" at a domain root)
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Keep the document title and description in sync on client-side navigation */
function RouteMeta() {
  const [location] = useLocation();

  useEffect(() => {
    const pages: Record<string, { title: string; description: string }> =
      seo.pages;
    const page = pages[location.replace(/(.)\/$/, "$1")];
    document.title = page?.title ?? `Page Not Found | ${seo.siteName}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        page?.description ?? seo.pages["/"].description
      );
  }, [location]);

  return null;
}

/**
 * Links to a section on the current page (e.g. "About Us" or "Read Their Story" on the home page)
 * scroll smoothly without adding "#section" to the URL. Other links behave normally.
 */
function SmoothSectionLinks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const target = new URL(link.href);
      if (
        target.origin !== location.origin ||
        target.pathname !== location.pathname
      )
        return;
      const section = document.getElementById(
        decodeURIComponent(target.hash.slice(1))
      );
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/programs/education"} component={EducationProgram} />
      <Route path={"/programs/medical"} component={MedicalServices} />
      <Route path={"/programs/tribal"} component={TribalDistribution} />
      <Route path={"/programs/bala-vikas"} component={BalaVikas} />
      <Route
        path={"/programs/religious-cultural"}
        component={ReligiousCultural}
      />
      <Route path={"/contact"} component={Contact} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <WouterRouter base={basePath}>
        <RouteMeta />
        <SmoothSectionLinks />
        <Router />
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
