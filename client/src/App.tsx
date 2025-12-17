import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import EstoqueCritico from "./pages/EstoqueCritico";
import EstoqueGeral from "./pages/EstoqueGeral";
import FichasTecnicas from "./pages/FichasTecnicas";
import DiarioProducao from "./pages/DiarioProducao";
import Perdas from "./pages/Perdas";
import Login from "./pages/Login";
import { useEffect } from "react";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;
  return <Component {...rest} />;
}
function Router() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    );
  }

  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/estoque-critico" component={EstoqueCritico} />
        <Route path="/estoque-geral" component={EstoqueGeral} />
        <Route path="/fichas-tecnicas" component={FichasTecnicas} />
        <Route path="/diario-producao" component={DiarioProducao} />
        <Route path="/perdas" component={Perdas} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;