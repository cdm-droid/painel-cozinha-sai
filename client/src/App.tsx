import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import EstoqueCritico from "./pages/EstoqueCritico";
import EstoqueGeral from "./pages/EstoqueGeral";
import FichasTecnicas from "./pages/FichasTecnicas";
import DiarioProducao from "./pages/DiarioProducao";

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/estoque-critico" component={EstoqueCritico} />
        <Route path="/estoque-geral" component={EstoqueGeral} />
        <Route path="/fichas-tecnicas" component={FichasTecnicas} />
        <Route path="/diario-producao" component={DiarioProducao} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
