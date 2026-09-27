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

// Deploy base path without the trailing slash ("" at a domain root)
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Keep the document title and description in sync on client-side navigation */
function RouteMeta() {
  const [location] = useLocation();

  useEffect(() => {
    const pages: Record<string, { title: string; description: string }> = seo.pages;
    const page = pages[location.replace(/(.)\/$/, "$1")];
    document.title = page?.title ?? `Page Not Found | ${seo.siteName}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", page?.description ?? seo.pages["/"].description);
  }, [location]);

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
      <Route path={"/programs/religious-cultural"} component={ReligiousCultural} />
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
        <Router />
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
