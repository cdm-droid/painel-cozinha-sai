import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  ChefHat,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  PlayCircle,
  PauseCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  BarChart3,
  AlertTriangle,
  Package,
} from "lucide-react";

export default function ProducaoGestor() {
  const [activeTab, setActiveTab] = useState("kanban");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLote, setSelectedLote] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // 1. Buscar dados do Kanban (Lotes Ativos)
  const { data: lotes = [], refetch: refetchLotes } = trpc.lotesProducao.list.useQuery({
    dataInicio: selectedDate.toISOString().split('T')[0],
    dataFim: selectedDate.toISOString().split('T')[0],
  });

  // 2. Buscar APENAS itens que precisam de produção (Otimização de Performance)
  // Substitui a antiga busca pesada de 'todosInsumos'
  const { data: itensNecessarios = [] } = trpc.lotesProducao.itensNecessarios.useQuery();
  
  // Dados do Diário de Produção (Histórico)
  const { data: diario = [] } = trpc.diarioProducao.list.useQuery();
  
  // Estatísticas do Kanban
  const lotesNecessarios = lotes.filter(l => l.status === "necessario");
  const lotesEmProducao = lotes.filter(l => l.status === "em_producao");
  const lotesProntos = lotes.filter(l => l.status === "pronto");
  const lotesFinalizados = lotes.filter(l => l.status === "finalizado");
  
  // Total real de itens que precisam de atenção (Lotes criados + Sugestões do sistema)
  const totalNecessarios = lotesNecessarios.length + itensNecessarios.length;
  
  // Filtragem do Histórico (Diário)
  const diarioFiltrado = diario.filter(item => {
    const matchSearch = !searchTerm || 
      item.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.responsavel && item.responsavel.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = statusFilter === "todos" || item.statusProducao === statusFilter;
    return matchSearch && matchStatus;
  });
  
  // Navegação de data
  const navigateDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };
  
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "necessario": "bg-red-500/20 text-red-400 border-red-500/30",
      "em_producao": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "pronto": "bg-green-500/20 text-green-400 border-green-500/30",
      "finalizado": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Planejado": "bg-gray-500/20 text-gray-400 border-gray-500/30",
      "Em Produção": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "Concluído": "bg-green-500/20 text-green-400 border-green-500/30",
    };
    const labels: Record<string, string> = {
      "necessario": "Necessário",
      "em_producao": "Em Produção",
      "pronto": "Pronto",
      "finalizado": "Finalizado",
    };
    return (
      <Badge variant="outline" className={styles[status] || styles["Planejado"]}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produção</h1>
          <p className="text-muted-foreground text-sm">
            Gestão unificada de produção e histórico
          </p>
        </div>
        
        {/* Navegação de Data */}
        <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigateDate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="px-4 py-2 text-sm font-medium min-w-[200px] text-center">
            <Calendar className="h-4 w-4 inline mr-2" />
            {formatDate(selectedDate)}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigateDate(1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Necessário</p>
                <p className="text-2xl font-bold text-red-400">{totalNecessarios}</p>
              </div>
              <PauseCircle className="h-8 w-8 text-red-400/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Em Produção</p>
                <p className="text-2xl font-bold text-yellow-400">{lotesEmProducao.length}</p>
              </div>
              <PlayCircle className="h-8 w-8 text-yellow-400/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Pronto</p>
                <p className="text-2xl font-bold text-green-400">{lotesProntos.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-400/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Finalizado</p>
                <p className="text-2xl font-bold text-blue-400">{lotesFinalizados.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="kanban" className="gap-2">
            <ChefHat className="h-4 w-4" />
            Quadro de Produção
          </TabsTrigger>
          <TabsTrigger value="historico" className="gap-2">
            <Clock className="h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        {/* Tab Kanban */}
        <TabsContent value="kanban" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Coluna Necessário */}
            <Card className="border-red-500/30 bg-red-50/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  Necessário ({totalNecessarios})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {/* 1. Lotes já criados manualmente ou agendados */}
                {lotesNecessarios.map(lote => (
                  <Card 
                    key={`lote-${lote.id}`} 
                    className="bg-white hover:bg-red-50 border-l-4 border-l-red-500 cursor-pointer transition-all shadow-sm"
                    onClick={() => { setSelectedLote(lote); setShowDetails(true); }}
                  >
                    <CardContent className="p-3">
                      <p className="font-bold text-sm text-gray-800">{lote.insumoNome}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Planejado: {lote.quantidadePlanejada} {lote.insumoUnidade}
                      </p>
                      <Badge variant="outline" className="mt-2 text-[10px] bg-white border-red-100 text-red-500">
                        Lote Aberto
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
                
                {/* 2. Sugestões automáticas baseadas em estoque baixo (Backend Otimizado) */}
                {itensNecessarios.map(preparo => (
                  <Card 
                    key={`sugestao-${preparo.id}`} 
                    className="bg-white hover:bg-red-50 border-l-4 border-l-red-300 border-dashed cursor-pointer transition-all shadow-sm opacity-90 hover:opacity-100"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-sm text-gray-800">{preparo.nome}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              Atual: <span className="font-mono font-bold text-red-500">{parseFloat(preparo.estoqueAtual).toFixed(1)}</span>
                            </span>
                            <span className="text-xs text-gray-400">|</span>
                            <span className="text-xs text-gray-500">
                              Mín: {parseFloat(preparo.estoqueMinimo).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-red-400 uppercase tracking-wide">
                        <AlertTriangle className="h-3 w-3" />
                        Estoque {preparo.status}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {totalNecessarios === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <CheckCircle2 className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs font-medium">Tudo em ordem!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Coluna Em Produção */}
            <Card className="border-yellow-500/30 bg-yellow-50/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  Em Produção ({lotesEmProducao.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {lotesEmProducao.map(lote => (
                  <Card 
                    key={lote.id} 
                    className="bg-white hover:bg-yellow-50 border-l-4 border-l-yellow-500 cursor-pointer transition-all shadow-sm"
                    onClick={() => { setSelectedLote(lote); setShowDetails(true); }}
                  >
                    <CardContent className="p-3">
                      <p className="font-bold text-sm text-gray-800">{lote.insumoNome}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Qtd: {lote.quantidadePlanejada} {lote.insumoUnidade}
                      </p>
                      {lote.responsavel && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md w-fit">
                          <ChefHat size={12} /> {lote.responsavel}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {lotesEmProducao.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <PlayCircle className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs font-medium">Nada em produção</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Coluna Pronto */}
            <Card className="border-green-500/30 bg-green-50/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  Pronto ({lotesProntos.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {lotesProntos.map(lote => (
                  <Card 
                    key={lote.id} 
                    className="bg-white hover:bg-green-50 border-l-4 border-l-green-500 cursor-pointer transition-all shadow-sm"
                    onClick={() => { setSelectedLote(lote); setShowDetails(true); }}
                  >
                    <CardContent className="p-3">
                      <p className="font-bold text-sm text-gray-800">{lote.insumoNome}</p>
                      <div className="flex justify-between items-end mt-1">
                        <p className="text-xs text-gray-500">
                          {lote.quantidadeProduzida || lote.quantidadePlanejada} {lote.insumoUnidade}
                        </p>
                        <CheckCircle2 className="text-green-500 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {lotesProntos.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <Package className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-xs font-medium">Nenhum lote pronto</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Histórico */}
        <TabsContent value="historico" className="space-y-4">
          {/* Filtros */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por produto ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="Planejado">Planejado</SelectItem>
                <SelectItem value="Em Produção">Em Produção</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela de Histórico */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Custo</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {diarioFiltrado.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-sm">
                        {new Date(item.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell className="font-medium">{item.produto}</TableCell>
                      <TableCell className="text-right font-mono">
                        {parseFloat(item.quantidadeProduzida).toFixed(2)} {item.unidade}
                      </TableCell>
                      <TableCell>{item.responsavel || "-"}</TableCell>
                      <TableCell>{getStatusBadge(item.statusProducao)}</TableCell>
                      <TableCell className="text-right font-mono">
                        {item.custoTotal ? `R$ ${parseFloat(item.custoTotal).toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {diarioFiltrado.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de Detalhes do Lote */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Lote</DialogTitle>
          </DialogHeader>
          {selectedLote && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Produto:</span>
                <span className="font-medium">{selectedLote.insumoNome}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quantidade:</span>
                <span className="font-mono">{selectedLote.quantidadePlanejada} {selectedLote.insumoUnidade}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                {getStatusBadge(selectedLote.status)}
              </div>
              {selectedLote.responsavel && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Responsável:</span>
                  <span>{selectedLote.responsavel}</span>
                </div>
              )}
              {selectedLote.dataAgendada && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Agendado para:</span>
                  <span>{new Date(selectedLote.dataAgendada).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
              {selectedLote.observacao && (
                <div>
                  <span className="text-muted-foreground">Observação:</span>
                  <p className="mt-1 text-sm bg-secondary/30 p-2 rounded">{selectedLote.observacao}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
