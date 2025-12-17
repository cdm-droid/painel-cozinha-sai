import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Package, 
  ChefHat, 
  Trash2,
  Clock,
  ClipboardList,
  Loader2,
  FileText
} from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Home() {
  // Buscar estatísticas do dashboard
  const { data: stats, isLoading: statsLoading } = trpc.dashboard.stats.useQuery();
  
  // Buscar alertas de estoque
  const { data: alertas = [], isLoading: alertasLoading } = trpc.dashboard.alertas.useQuery();
  
  // Buscar produções recentes
  const { data: producoesRecentes = [], isLoading: producoesLoading } = trpc.dashboard.producoesRecentes.useQuery();

  const isLoading = statsLoading || alertasLoading || producoesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dashboard...</span>
      </div>
    );
  }

  // Calcular total de itens em alerta (crítico + baixo)
  const totalAlertas = (stats?.insumosCriticos || 0) + (stats?.insumosBaixos || 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral da operação da cozinha hoje.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/diario-producao">
            <Button className="gap-2">
              <ClipboardList size={16} />
              Novo Diário
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="industrial-card border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Estoque Crítico
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{totalAlertas}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.insumosCriticos || 0} críticos, {stats?.insumosBaixos || 0} baixos
            </p>
          </CardContent>
        </Card>

        <Card className="industrial-card border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total Insumos
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats?.totalInsumos || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.insumosAtivos || 0} ativos no sistema
            </p>
          </CardContent>
        </Card>

        <Card className="industrial-card border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Produções Hoje
            </CardTitle>
            <ChefHat className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats?.producoesHoje || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Registradas no diário
            </p>
          </CardContent>
        </Card>

        <Card className="industrial-card border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Perdas Hoje
            </CardTitle>
            <Trash2 className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats?.perdasHoje || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              R$ {Number(stats?.custoPerdasHoje || 0).toFixed(2)} em custos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alertas de Estoque */}
        <Card className="industrial-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Alertas de Estoque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertas.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>Nenhum alerta de estoque no momento.</p>
                  <p className="text-sm">Todos os itens estão em níveis adequados.</p>
                </div>
              ) : (
                alertas.map((alerta: any) => (
                  <div key={alerta.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${alerta.status === 'Crítico' ? 'bg-destructive animate-pulse' : 'bg-warning'}`} />
                      <div>
                        <p className="font-medium text-sm">{alerta.nome}</p>
                        <p className="text-xs text-muted-foreground">
                          Estoque: <span className="font-mono font-bold">{parseFloat(alerta.estoqueAtual).toFixed(2)}</span> {alerta.unidade}
                          <span className="mx-1">|</span>
                          Mínimo: <span className="font-mono">{parseFloat(alerta.estoqueMinimo).toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        alerta.status === 'Crítico' 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'bg-warning/10 text-warning-foreground'
                      }`}>
                        {alerta.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Link href="/estoque-critico">
                <Button variant="outline" className="w-full text-xs uppercase tracking-wider">Ver todos os alertas</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Produções Recentes e Acesso Rápido */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              Produções Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {producoesRecentes.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Nenhuma produção registrada.</p>
                </div>
              ) : (
                producoesRecentes.slice(0, 4).map((prod: any) => (
                  <div key={prod.id} className="flex items-center justify-between p-2 bg-secondary/20 rounded-md">
                    <div>
                      <p className="font-medium text-sm">{prod.produto}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
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
                      <span className="font-mono font-bold text-sm">{parseFloat(prod.quantidadeProduzida).toFixed(0)}</span>
                      <span className="text-xs text-muted-foreground ml-1">{prod.unidade || 'un'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-6 space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Acesso Rápido</h4>
              <Link href="/fichas-tecnicas">
                <Button variant="secondary" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" /> Fichas Técnicas ({stats?.totalFichas || 0})
                </Button>
              </Link>
              <Link href="/estoque-geral">
                <Button variant="secondary" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" /> Atualizar Estoque
                </Button>
              </Link>
              <Link href="/perdas">
                <Button variant="secondary" className="w-full justify-start">
                  <Trash2 className="mr-2 h-4 w-4" /> Registrar Perda
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
