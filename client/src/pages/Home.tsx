import { 
  AlertTriangle, 
  Package, 
  ChefHat, 
  Trash2,
  Clock,
  ClipboardList,
  Loader2,
  FileText,
  Timer,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  Calculator,
  ListChecks
} from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

// Componente de Card de Estatística com design industrial
function StatCard({ 
  title, 
  value, 
  subtitle, 
  variant = "primary", 
  icon: Icon 
}: { 
  title: string; 
  value: string | number; 
  subtitle?: string; 
  variant?: "primary" | "warning" | "destructive" | "success"; 
  icon: any;
}) {
  const colors = {
    primary: 'border-l-primary bg-primary/5 text-primary',
    warning: 'border-l-amber-500 bg-amber-500/5 text-amber-600',
    destructive: 'border-l-rose-500 bg-rose-500/5 text-rose-600',
    success: 'border-l-emerald-500 bg-emerald-500/5 text-emerald-600'
  };

  return (
    <div className={cn(
      "bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm border-l-[6px] transition-all hover:shadow-md",
      colors[variant]
    )}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
        <Icon size={20} />
      </div>
      <h4 className="text-4xl font-black tracking-tighter text-gray-800">{value}</h4>
      {subtitle && <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{subtitle}</p>}
    </div>
  );
}

export default function Home() {
  const { isOperacional } = useAuth();
  
  // Buscar estatísticas do dashboard
  const { data: stats, isLoading: statsLoading } = trpc.dashboard.stats.useQuery();
  
  // Buscar alertas de estoque
  const { data: alertas = [], isLoading: alertasLoading } = trpc.dashboard.alertas.useQuery();
  
  // Buscar produções recentes
  const { data: producoesRecentes = [], isLoading: producoesLoading } = trpc.dashboard.producoesRecentes.useQuery();

  const isLoading = statsLoading || alertasLoading || producoesLoading;

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-black uppercase tracking-[0.3em] text-xs text-gray-400">Sincronizando...</p>
      </div>
    );
  }

  // Calcular total de itens em alerta (crítico + baixo)
  const totalAlertas = (stats?.insumosCriticos || 0) + (stats?.insumosBaixos || 0);

  // Dashboard Operador
  if (isOperacional) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Painel Operacional</h2>
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-tight text-[#1A1A1A]">
              Bom dia, Operador
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/diario-producao">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95">
                <ChefHat size={16} /> Nova Produção
              </button>
            </Link>
          </div>
        </div>

        {/* KPIs Operacionais */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Alertas" 
            value={totalAlertas} 
            subtitle={`${stats?.insumosCriticos || 0} críticos`}
            variant="destructive" 
            icon={AlertTriangle} 
          />
          <StatCard 
            title="Produções Hoje" 
            value={stats?.producoesHoje || 0} 
            subtitle="Registradas"
            variant="success" 
            icon={ChefHat} 
          />
          <StatCard 
            title="Perdas Hoje" 
            value={stats?.perdasHoje || 0} 
            subtitle={`R$ ${Number(stats?.custoPerdasHoje || 0).toFixed(2)}`}
            variant="warning" 
            icon={Trash2} 
          />
          <StatCard 
            title="Fichas" 
            value={stats?.totalFichas || 0} 
            subtitle="Disponíveis"
            variant="primary" 
            icon={FileText} 
          />
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/deveres">
            <button className="w-full bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <ListChecks className="text-primary" size={24} />
              </div>
              <h3 className="font-black uppercase text-sm text-gray-800">Deveres</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Checklist do turno</p>
            </button>
          </Link>
          <Link href="/contagem-diaria">
            <button className="w-full bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                <ClipboardList className="text-amber-500" size={24} />
              </div>
              <h3 className="font-black uppercase text-sm text-gray-800">Contagem</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Estoque sensível</p>
            </button>
          </Link>
          <Link href="/calculadora">
            <button className="w-full bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <Calculator className="text-emerald-500" size={24} />
              </div>
              <h3 className="font-black uppercase text-sm text-gray-800">Calculadora</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Escalonar preparos</p>
            </button>
          </Link>
          <Link href="/perdas">
            <button className="w-full bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 group-hover:bg-rose-500/20 transition-colors">
                <Trash2 className="text-rose-500" size={24} />
              </div>
              <h3 className="font-black uppercase text-sm text-gray-800">Perdas</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Registrar perda</p>
            </button>
          </Link>
        </div>

        {/* Alertas de Estoque */}
        {alertas.length > 0 && (
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                  <AlertTriangle className="text-rose-500" size={20} />
                </div>
                <div>
                  <h3 className="font-black uppercase text-sm text-gray-800">Alertas de Estoque</h3>
                  <p className="text-[10px] text-gray-400">{alertas.length} itens precisam de atenção</p>
                </div>
              </div>
              <Link href="/estoque-critico">
                <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
                  Ver todos <ArrowUpRight size={12} />
                </button>
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {alertas.slice(0, 5).map((alerta: any) => (
                <div key={alerta.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      alerta.status === 'Crítico' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
                    )} />
                    <div>
                      <p className="font-bold text-sm text-gray-800">{alerta.nome}</p>
                      <p className="text-xs text-gray-400">
                        {parseFloat(alerta.estoqueAtual).toFixed(1)} {alerta.unidade} / mín: {parseFloat(alerta.estoqueMinimo).toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[9px] font-black px-3 py-1 rounded-full uppercase border",
                    alerta.status === 'Crítico' 
                      ? 'bg-rose-50 text-rose-500 border-rose-100' 
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  )}>
                    {alerta.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Dashboard Gestor
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-1">Painel Estratégico</h2>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-tight text-[#1A1A1A]">
            Dashboard Gestor
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      {/* KPIs Estratégicos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Insumos" 
          value={stats?.totalInsumos || 0} 
          subtitle="Ativos no sistema"
          variant="primary" 
          icon={Package} 
        />
        <StatCard 
          title="Estoque Crítico" 
          value={totalAlertas} 
          subtitle={`${stats?.insumosCriticos || 0} críticos`}
          variant="destructive" 
          icon={AlertTriangle} 
        />
        <StatCard 
          title="Produções Hoje" 
          value={stats?.producoesHoje || 0} 
          subtitle="Registradas"
          variant="warning" 
          icon={Timer} 
        />
        <StatCard 
          title="CMV Estimado" 
          value="--" 
          subtitle="Em desenvolvimento"
          variant="success" 
          icon={CheckCircle2} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alertas de Estoque */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <AlertTriangle className="text-rose-500" size={20} />
              </div>
              <div>
                <h3 className="font-black uppercase text-sm text-gray-800">Alertas de Estoque</h3>
                <p className="text-[10px] text-gray-400">{alertas.length} itens precisam de atenção</p>
              </div>
            </div>
            <Link href="/estoque-critico">
              <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
                Ver todos <ArrowUpRight size={12} />
              </button>
            </Link>
          </div>
          {alertas.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 mx-auto text-gray-200 mb-4" />
              <p className="font-bold text-gray-400">Nenhum alerta</p>
              <p className="text-sm text-gray-300">Todos os itens estão em níveis adequados</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {alertas.slice(0, 8).map((alerta: any) => (
                <div key={alerta.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      alerta.status === 'Crítico' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
                    )} />
                    <div>
                      <p className="font-bold text-sm text-gray-800">{alerta.nome}</p>
                      <p className="text-xs text-gray-400">
                        {parseFloat(alerta.estoqueAtual).toFixed(1)} {alerta.unidade} / mín: {parseFloat(alerta.estoqueMinimo).toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[9px] font-black px-3 py-1 rounded-full uppercase border",
                    alerta.status === 'Crítico' 
                      ? 'bg-rose-50 text-rose-500 border-rose-100' 
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  )}>
                    {alerta.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Produções Recentes */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ChefHat className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-black uppercase text-sm text-gray-800">Produções Recentes</h3>
                <p className="text-[10px] text-gray-400">Últimos registros</p>
              </div>
            </div>
          </div>
          {producoesRecentes.length === 0 ? (
            <div className="p-8 text-center">
              <ClipboardList className="w-10 h-10 mx-auto text-gray-200 mb-3" />
              <p className="text-sm text-gray-400">Nenhuma produção registrada</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {producoesRecentes.slice(0, 5).map((prod: any) => (
                <div key={prod.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-gray-800">{prod.produto}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock size={10} />
                        {new Date(prod.createdAt).toLocaleString('pt-BR', { 
                          day: '2-digit', 
                          month: '2-digit',
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-lg text-gray-800">{parseFloat(prod.quantidadeProduzida).toFixed(0)}</span>
                      <span className="text-xs text-gray-400 ml-1">{prod.unidade || 'un'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="p-4 border-t border-gray-100">
            <Link href="/diario-producao">
              <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest transition-colors">
                Ver Diário Completo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
