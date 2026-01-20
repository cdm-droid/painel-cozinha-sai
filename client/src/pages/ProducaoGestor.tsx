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
  
  // Dados do Kanban
  const { data: lotes = [], refetch: refetchLotes } = trpc.lotesProducao.list.useQuery({
    dataInicio: selectedDate.toISOString().split('T')[0],
    dataFim: selectedDate.toISOString().split('T')[0],
  });
  
  // Dados do Diário de Produção
  const { data: diario = [] } = trpc.diarioProducao.list.useQuery();
  
  // Colaboradores para exibir responsáveis
  const { data: colaboradores = [] } = trpc.colaboradores.listAtivos.useQuery();
  
  // Buscar insumos com estoque baixo (preparos)
  const { data: todosInsumos = [] } = trpc.insumos.list.useQuery({});
  
  // Filtrar preparos com estoque baixo ou crítico
  const preparosBaixos = todosInsumos.filter(i => 
    (i.categoria?.toLowerCase().includes("preparo") || i.codigo?.startsWith("(PR)")) &&
    (i.status === "Baixo" || i.status === "Crítico")
  );
  
  // Estatísticas
  const lotesNecessarios = lotes.filter(l => l.status === "necessario");
  const lotesEmProducao = lotes.filter(l => l.status === "em_producao");
  const lotesProntos = lotes.filter(l => l.status === "pronto");
  const lotesFinalizados = lotes.filter(l => l.status === "finalizado");
  
  // Total de itens necessários (lotes + preparos baixos não duplicados)
  const idsLotesNecessarios = new Set(lotesNecessarios.map(l => l.insumoId));
  const preparosBaixosSemDuplicados = preparosBaixos.filter(p => !idsLotesNecessarios.has(p.id));
  const totalNecessarios = lotesNecessarios.length + preparosBaixosSemDuplicados.length;
  
  // Filtrar diário
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
    <div className="space-y-6">
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
            <Card className="border-red-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  Necessário ({totalNecessarios})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
                {/* Lotes já criados */}
                {lotesNecessarios.map(lote => (
                  <Card 
                    key={`lote-${lote.id}`} 
                    className="bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => { setSelectedLote(lote); setShowDetails(true); }}
                  >
                    <CardContent className="p-3">
                      <p className="font-medium text-sm">{lote.insumoNome}</p>
                      <p className="text-xs text-muted-foreground">
                        {lote.quantidadePlanejada} {lote.insumoUnidade}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                        Lote agendado
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Preparos com estoque baixo (não duplicados) */}
                {preparosBaixosSemDuplicados.map(preparo => (
                  <Card 
                    key={`preparo-${preparo.id}`} 
                    className="bg-red-500/5 border-red-500/20 cursor-pointer hover:bg-red-500/10 transition-colors"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{preparo.nome}</p>
                          <p className="text-xs text-muted-foreground">
                            Estoque: {parseFloat(preparo.estoqueAtual).toFixed(1)} {preparo.unidade}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Mínimo: {parseFloat(preparo.estoqueMinimo).toFixed(1)} {preparo.unidade}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={preparo.status === "Crítico" 
                            ? "bg-red-500/20 text-red-400 border-red-500/30" 
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {preparo.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-orange-400">
                        <AlertTriangle className="h-3 w-3" />
                        Estoque baixo - necessita produção
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {totalNecessarios === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum item necessário
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Coluna Em Produção */}
            <Card className="border-yellow-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  Em Produção ({lotesEmProducao.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
                {lotesEmProducao.map(lote => (
                  <Card 
                    key={lote.id} 
                    className="bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => { setSelectedLote(lote); setShowDetails(true); }}
                  >
                    <CardContent className="p-3">
                      <p className="font-medium text-sm">{lote.insumoNome}</p>
                      <p className="text-xs text-muted-foreground">
                        {lote.quantidadePlanejada} {lote.insumoUnidade}
                      </p>
                      {lote.responsavel && (
                        <p className="text-xs text-primary mt-1">
                          👤 {lote.responsavel}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {lotesEmProducao.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum item em produção
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Coluna Pronto */}
            <Card className="border-green-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  Pronto ({lotesProntos.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
                {lotesProntos.map(lote => (
                  <Card 
                    key={lote.id} 
                    className="bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => { setSelectedLote(lote); setShowDetails(true); }}
                  >
                    <CardContent className="p-3">
                      <p className="font-medium text-sm">{lote.insumoNome}</p>
                      <p className="text-xs text-muted-foreground">
                        {lote.quantidadeProduzida || lote.quantidadePlanejada} {lote.insumoUnidade}
                      </p>
                      {lote.responsavel && (
                        <p className="text-xs text-primary mt-1">
                          👤 {lote.responsavel}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {lotesProntos.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum item pronto
                  </p>
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
                className="pl-9 bg-secondary/50"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-secondary/50">
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
