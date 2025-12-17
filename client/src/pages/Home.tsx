import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  Package, 
  ChefHat, 
  TrendingUp,
  Clock
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
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
            <div className="text-2xl font-bold font-mono">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Itens abaixo do mínimo
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
            <div className="text-2xl font-bold font-mono">148</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cadastrados no sistema
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
            <div className="text-2xl font-bold font-mono">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> +2
              </span>
              em relação a ontem
            </p>
          </CardContent>
        </Card>

        <Card className="industrial-card border-l-4 border-l-muted-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Custo Médio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">R$ 12,40</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-destructive flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> +1.2%
              </span>
              variação semanal
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / Alerts */}
        <Card className="industrial-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg">Alertas de Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { item: "(IN) Açucar demerara", qtd: "2 Kg", status: "Crítico", time: "Há 2 horas" },
                { item: "(IN) Alface americano", qtd: "3 Un", status: "Baixo", time: "Há 4 horas" },
                { item: "(IN) Manteiga", qtd: "5 Un", status: "Baixo", time: "Há 5 horas" },
                { item: "Açúcar cristal", qtd: "1 Kg", status: "Crítico", time: "Ontem" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${alert.status === 'Crítico' ? 'bg-destructive animate-pulse' : 'bg-warning'}`} />
                    <div>
                      <p className="font-medium text-sm">{alert.item}</p>
                      <p className="text-xs text-muted-foreground">Estoque atual: <span className="font-mono font-bold">{alert.qtd}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      alert.status === 'Crítico' 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-warning/10 text-warning-foreground'
                    }`}>
                      {alert.status}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
                      <Clock size={10} /> {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Link href="/estoque-critico">
                <Button variant="outline" className="w-full text-xs uppercase tracking-wider">Ver todos os alertas</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Production Status */}
        <Card className="industrial-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">Produção em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Brownie C", progress: 75, status: "Finalizando" },
                { name: "Panacota", progress: 30, status: "Preparando" },
                { name: "Molho Especial", progress: 10, status: "Iniciando" },
              ].map((prod, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{prod.name}</span>
                    <span className="text-muted-foreground text-xs">{prod.status}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500 ease-out" 
                      style={{ width: `${prod.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Acesso Rápido</h4>
              <Link href="/fichas-tecnicas">
                <Button variant="secondary" className="w-full justify-start">
                  <ChefHat className="mr-2 h-4 w-4" /> Consultar Ficha Técnica
                </Button>
              </Link>
              <Link href="/estoque-geral">
                <Button variant="secondary" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" /> Atualizar Estoque
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { ClipboardList } from "lucide-react";
