import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  PieChart, 
  Calendar as CalendarIcon,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CMV() {
  // Estado inicial: últimos 30 dias
  const [periodo, setPeriodo] = useState("30d");
  
  const getDataRange = () => {
    const fim = new Date();
    const inicio = new Date();
    if (periodo === "7d") inicio.setDate(fim.getDate() - 7);
    if (periodo === "30d") inicio.setDate(fim.getDate() - 30);
    if (periodo === "hoje") inicio.setHours(0,0,0,0);
    return {
      dataInicio: inicio.toISOString().split('T')[0],
      dataFim: fim.toISOString().split('T')[0]
    };
  };

  const { data: stats, isLoading } = trpc.analise.resumoFinanceiro.useQuery(getDataRange());

  if (isLoading) return <div className="p-8 text-center text-gray-400 animate-pulse">Calculando rentabilidade...</div>;
  if (!stats) return <div className="p-8 text-center">Sem dados disponíveis.</div>;

  // Cores dinâmicas para o CMV
  const getCmvColor = (val: number) => {
    if (val < 30) return "text-emerald-500";
    if (val < 40) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header com Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Análise Financeira (CMV)</h1>
          <p className="text-sm text-gray-500">Lucratividade baseada no consumo teórico de fichas.</p>
        </div>
        
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[180px] bg-white">
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hoje">Hoje</SelectItem>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Faturamento */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">Receita Líquida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-gray-800">
              R$ {stats.faturamentoProdutos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              + R$ {stats.taxasEntrega.toFixed(2)} taxas (não compõe CMV)
            </p>
          </CardContent>
        </Card>

        {/* Custo Mercadoria */}
        <Card className="border-l-4 border-l-rose-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">Custo Mercadoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-rose-600">
              R$ {stats.custoMercadoria.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-sm font-bold ${getCmvColor(stats.cmvPercentual)}`}>
                {stats.cmvPercentual.toFixed(1)}%
              </span>
              <span className="text-xs text-gray-400">do faturamento</span>
            </div>
          </CardContent>
        </Card>

        {/* Perdas */}
        <Card className="border-l-4 border-l-amber-500 shadow-sm bg-amber-50/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">Desperdício / Perdas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-amber-600">
              - R$ {stats.custoPerdas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-amber-600/70 mt-1 font-medium">
              Registrado manualmente
            </p>
          </CardContent>
        </Card>

        {/* Resultado Final */}
        <Card className="border-l-4 border-l-emerald-500 shadow-sm bg-emerald-50/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">Lucro Operacional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-emerald-700">
              R$ {stats.resultadoOperacional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-emerald-600/70 mt-1 font-medium">
              Margem: {((stats.resultadoOperacional / stats.faturamentoProdutos) * 100 || 0).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerta de Vínculos */}
      {stats.itensSemVinculo > 0 && (
        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-600 h-5 w-5" />
            <div>
              <p className="text-sm font-bold text-amber-800">Dados Incompletos</p>
              <p className="text-xs text-amber-700">
                {stats.itensSemVinculo} itens vendidos não possuem Ficha Técnica vinculada. O Custo/CMV está subestimado.
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-white text-amber-700 border-amber-200 hover:bg-amber-50" onClick={() => window.location.href='/integracoes'}>
            Corrigir Vínculos <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Curva ABC / Top Produtos */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Top Produtos (Margem de Contribuição)
          </CardTitle>
          <CardDescription>
            Produtos que mais geraram lucro bruto (Receita - Custo Ficha) no período.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.rankingProdutos.map((prod, idx) => {
              const margem = prod.faturamento - prod.custo;
              const margemPerc = (margem / prod.faturamento) * 100;
              const barraWidth = (margem / (stats.rankingProdutos[0].faturamento - stats.rankingProdutos[0].custo)) * 100;

              return (
                <div key={idx} className="group">
                  <div className="flex justify-between items-end mb-1 text-sm">
                    <span className="font-bold text-gray-700 w-1/3 truncate" title={prod.nome}>
                      {idx + 1}. {prod.nome}
                    </span>
                    <div className="flex gap-4 text-xs">
                      <span className="text-gray-400">Vendas: <span className="text-gray-600 font-medium">R$ {prod.faturamento.toFixed(0)}</span></span>
                      <span className="text-rose-300">Custo: <span className="text-rose-500 font-medium">R$ {prod.custo.toFixed(0)}</span></span>
                      <span className="text-emerald-500 font-bold bg-emerald-50 px-1 rounded">
                        Lucro: R$ {margem.toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${barraWidth}%` }} 
                    />
                  </div>
                </div>
              );
            })}
            
            {stats.rankingProdutos.length === 0 && (
              <div className="py-8 text-center text-gray-400">
                Nenhuma venda registrada no período.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
