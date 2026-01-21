import { useEffect, lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";

// Importação Lazy (Carregamento sob demanda)
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Módulos Operacionais
const DiarioProducao = lazy(() => import("./pages/DiarioProducao"));
const ContagemDiaria = lazy(() => import("./pages/ContagemDiaria"));
const Calculadora = lazy(() => import("./pages/Calculadora"));
const Deveres = lazy(() => import("./pages/Deveres"));
const Preparo = lazy(() => import("./pages/Preparo"));
const KanbanProducao = lazy(() => import("./pages/KanbanProducao"));
const Perdas = lazy(() => import("./pages/Perdas"));

// Módulos de Gestão
const EstoqueGestor = lazy(() => import("./pages/EstoqueGestor"));
const ProducaoGestor = lazy(() => import("./pages/ProducaoGestor"));
const GestaoTarefas = lazy(() => import("./pages/GestaoTarefas"));
const Equipe = lazy(() => import("./pages/Equipe"));
const FichasTecnicas = lazy(() => import("./pages/FichasTecnicas"));

// Módulos Legados/Compatibilidade
const EstoqueCritico = lazy(() => import("./pages/EstoqueCritico"));
const EstoqueGeral = lazy(() => import("./pages/EstoqueGeral"));

// Componente de Loading Centralizado
function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-300">
      <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Carregando módulo...</p>
    </div>
  );
}

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
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          
          {/* Rotas do Gestor - Nova estrutura */}
          <Route path="/estoque" component={EstoqueGestor} />
          <Route path="/producao" component={ProducaoGestor} />
          <Route path="/gestao-tarefas" component={GestaoTarefas} />
          <Route path="/equipe" component={Equipe} />
          <Route path="/fichas-tecnicas" component={FichasTecnicas} />

          {/* Rotas Operacionais */}
          <Route path="/kanban-producao" component={KanbanProducao} />
          <Route path="/diario-producao" component={DiarioProducao} />
          <Route path="/contagem-diaria" component={ContagemDiaria} />
          <Route path="/calculadora" component={Calculadora} />
          <Route path="/deveres" component={Deveres} />
          <Route path="/preparo" component={Preparo} />
          <Route path="/perdas" component={Perdas} />

          {/* Rotas legadas mantidas para compatibilidade */}
          <Route path="/estoque-critico" component={EstoqueCritico} />
          <Route path="/estoque-geral" component={EstoqueGeral} />
          
          {/* Rotas placeholder para funcionalidades futuras */}
          <Route path="/cmv" component={() => <PlaceholderPage title="CMV" subtitle="Custo de Mercadoria Vendida" />} />
          <Route path="/auditoria" component={() => <PlaceholderPage title="Auditoria" subtitle="Logs de Operação" />} />
          
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </MainLayout>
  );
}

// Componente placeholder para páginas em desenvolvimento
function PlaceholderPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="min-h-[450px] bg-white rounded-[3rem] border border-gray-100 flex flex-col items-center justify-center text-center p-12 shadow-sm animate-in zoom-in-95 duration-300">
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
            <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
              <Router />
            </Suspense>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
