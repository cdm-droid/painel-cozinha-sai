import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { 
  ClipboardList, 
  AlertTriangle, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AuditoriaEstoque() {
  // Padrão: Mês atual
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const [dataInicio, setDataInicio] = useState(firstDay.toISOString().split('T')[0]);
  const [dataFim, setDataFim] = useState(today.toISOString().split('T')[0]);
  const [filtro, setFiltro] = useState("");

  const { data: auditoria = [], isLoading } = trpc.analiseEstoque.gerarRelatorio.useQuery({
    dataInicio,
    dataFim
  });

  const filteredData = auditoria.filter(item => 
    item.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  // Totais
  const totalVendido = auditoria.reduce((acc, i) => acc + (i.consumoTeorico * i.custoUnitario), 0);
  const totalDivergencia = auditoria.reduce((acc, i) => acc + i.custoDivergencia, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Auditoria de Estoque</h1>
          <p className="text-sm text-gray-500">Confronto entre Vendas (Teórico) e Contagens (Real)</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200">
          <Input 
            type="date" 
            value={dataInicio} 
            onChange={e => setDataInicio(e.target.value)} 
            className="border-0 h-8"
          />
          <span className="self-center text-gray-400">-</span>
          <Input 
            type="date" 
            value={dataFim} 
            onChange={e => setDataFim(e.target.value)} 
            className="border-0 h-8"
          />
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Itens Movimentados</p>
              <h3 className="text-2xl font-black text-gray-800">{auditoria.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Custo Teórico (Vendas)</p>
              <h3 className="text-2xl font-black text-emerald-700">R$ {totalVendido.toFixed(2)}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className={totalDivergencia > 0 ? "border-rose-200 bg-rose-50/30" : ""}>
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-full ${totalDivergencia > 0 ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-600"}`}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Divergência Total</p>
              <h3 className={`text-2xl font-black ${totalDivergencia > 0 ? "text-rose-600" : "text-gray-700"}`}>
                R$ {totalDivergencia.toFixed(2)}
              </h3>
              <p className="text-[10px] text-gray-400">Desperdício não justificado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Detalhada */}
      <Card>
        <CardHeader className="border-b border-gray-100 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>Detalhamento por Insumo</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar insumo..." 
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                className="pl-8 bg-gray-50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead>Insumo</TableHead>
                <TableHead className="text-right">Vendas (Teórico)</TableHead>
                <TableHead className="text-right">Perdas (Registradas)</TableHead>
                <TableHead className="text-right">Saída Real (Contagens)</TableHead>
                <TableHead className="text-right">Divergência</TableHead>
                <TableHead className="text-right">Custo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-400">Carregando análise...</TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-400">Nenhum dado encontrado para o período.</TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.nome}
                      <span className="text-xs text-gray-400 ml-1">({item.unidade})</span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-emerald-600">
                      {item.consumoTeorico.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-amber-600">
                      {item.perdaDeclarada.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-gray-700">
                      {item.saidasManuais.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.divergencia > 0.1 ? (
                        <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          +{item.divergencia.toFixed(2)}
                        </Badge>
                      ) : item.divergencia < -0.1 ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {item.divergencia.toFixed(2)}
                        </Badge>
                      ) : (
                        <span className="text-gray-300 text-xs">OK</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold text-gray-700">
                      R$ {item.custoDivergencia.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
