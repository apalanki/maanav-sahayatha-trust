import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import EducationProgram from "./pages/EducationProgram";
import MedicalServices from "./pages/MedicalServices";
import TribalDistribution from "./pages/TribalDistribution";
import BalaVikas from "./pages/BalaVikas";
import ReligiousCultural from "./pages/ReligiousCultural";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/programs/education"} component={EducationProgram} />
      <Route path={"/programs/medical"} component={MedicalServices} />
      <Route path={"/programs/tribal"} component={TribalDistribution} />
      <Route path={"/programs/bala-vikas"} component={BalaVikas} />
      <Route path={"/programs/religious-cultural"} component={ReligiousCultural} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route - show home page */}
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
