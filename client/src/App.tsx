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
import ContagemDiaria from "./pages/ContagemDiaria";
import Calculadora from "./pages/Calculadora";
import Deveres from "./pages/Deveres";
import Preparo from "./pages/Preparo";
import KanbanProducao from "./pages/KanbanProducao";
import GestaoTarefas from "./pages/GestaoTarefas";
import ProducaoGestor from "./pages/ProducaoGestor";
import EstoqueGestor from "./pages/EstoqueGestor";
import Equipe from "./pages/Equipe";
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
        {/* Rotas do Gestor - Nova estrutura */}
        <Route path="/estoque" component={EstoqueGestor} />
        <Route path="/producao" component={ProducaoGestor} />
        {/* Rotas legadas mantidas para compatibilidade */}
        <Route path="/estoque-critico" component={EstoqueCritico} />
        <Route path="/estoque-geral" component={EstoqueGeral} />
        <Route path="/fichas-tecnicas" component={FichasTecnicas} />
        <Route path="/diario-producao" component={DiarioProducao} />
        <Route path="/perdas" component={Perdas} />
        <Route path="/contagem-diaria" component={ContagemDiaria} />
        <Route path="/calculadora" component={Calculadora} />
        <Route path="/deveres" component={Deveres} />
        <Route path="/preparo" component={Preparo} />
        <Route path="/kanban-producao" component={KanbanProducao} />
        <Route path="/gestao-tarefas" component={GestaoTarefas} />
        <Route path="/equipe" component={Equipe} />
        {/* Rotas placeholder para funcionalidades futuras */}
        <Route path="/cmv" component={() => <PlaceholderPage title="CMV" subtitle="Custo de Mercadoria Vendida" />} />
        <Route path="/auditoria" component={() => <PlaceholderPage title="Auditoria" subtitle="Logs de Operação" />} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

// Componente placeholder para páginas em desenvolvimento
function PlaceholderPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="min-h-[450px] bg-white rounded-[3rem] border border-gray-100 flex flex-col items-center justify-center text-center p-12 shadow-sm">
      <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-300 mb-8 shadow-inner">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-2xl font-black tracking-tight uppercase">{title}</h3>
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">{subtitle}</p>
      <p className="text-sm text-gray-500 mt-4">Em desenvolvimento</p>
    </div>
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
