import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  Play, 
  CheckCircle2, 
  Package, 
  Clock, 
  User,
  Plus,
  ChefHat,
  Flame,
  CheckCheck,
  GripVertical,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CalendarDays
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type LoteStatus = "necessario" | "em_producao" | "pronto" | "finalizado";

interface Lote {
  id: number;
  insumoId: number;
  insumoNome: string;
  insumoUnidade: string;
  quantidadePlanejada: string;
  quantidadeProduzida: string | null;
  status: LoteStatus;
  dataAgendada: Date;
  responsavel: string | null;
  criadoEm: Date;
  iniciadoEm: Date | null;
  prontoEm: Date | null;
  finalizadoEm: Date | null;
  observacao: string | null;
}

interface ItemNecessario {
  id: number;
  codigo: string;
  nome: string;
  unidade: string;
  estoqueAtual: string;
  estoqueMinimo: string;
  status: string;
}

const statusConfig = {
  necessario: {
    label: "Necessário",
    color: "bg-red-500/20 border-red-500/50",
    headerColor: "bg-red-500/30",
    icon: AlertTriangle,
    iconColor: "text-red-400",
    badgeColor: "bg-red-500",
  },
  em_producao: {
    label: "Em Produção",
    color: "bg-amber-500/20 border-amber-500/50",
    headerColor: "bg-amber-500/30",
    icon: Flame,
    iconColor: "text-amber-400",
    badgeColor: "bg-amber-500",
  },
  pronto: {
    label: "Pronto",
    color: "bg-green-500/20 border-green-500/50",
    headerColor: "bg-green-500/30",
    icon: CheckCircle2,
    iconColor: "text-green-400",
    badgeColor: "bg-green-500",
  },
};

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default function KanbanProducao() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"kanban" | "calendario">("kanban");
  const [draggedLote, setDraggedLote] = useState<Lote | null>(null);
  const [novoLoteDialog, setNovoLoteDialog] = useState(false);
  const [finalizarDialog, setFinalizarDialog] = useState<Lote | null>(null);
  const [quantidadeFinal, setQuantidadeFinal] = useState("");
  const [selectedItem, setSelectedItem] = useState<ItemNecessario | null>(null);
  const [quantidadePlanejada, setQuantidadePlanejada] = useState("");
  const [dataAgendada, setDataAgendada] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Calendário
  const [mesAtual, setMesAtual] = useState(new Date().getMonth() + 1);
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null);

  // Queries
  const { data: lotes = [], refetch: refetchLotes } = trpc.lotesProducao.list.useQuery({});
  const { data: lotesDoMes = [], refetch: refetchLotesMes } = trpc.lotesProducao.listByMonth.useQuery({
    ano: anoAtual,
    mes: mesAtual,
  });
  const { data: itensNecessarios = [], refetch: refetchItens } = trpc.lotesProducao.itensNecessarios.useQuery();
  const { data: insumosPreparos = [] } = trpc.insumos.list.useQuery({ categoria: "Preparo" });

  // Mutations
  const criarLote = trpc.lotesProducao.create.useMutation({
    onSuccess: () => {
      toast.success("Lote agendado com sucesso!");
      refetchLotes();
      refetchLotesMes();
      refetchItens();
      setNovoLoteDialog(false);
      setSelectedItem(null);
      setQuantidadePlanejada("");
      setDataAgendada(new Date().toISOString().split('T')[0]);
    },
  });

  const iniciarProducao = trpc.lotesProducao.iniciarProducao.useMutation({
    onSuccess: () => {
      toast.success("Produção iniciada!");
      refetchLotes();
      refetchLotesMes();
    },
  });

  const marcarPronto = trpc.lotesProducao.marcarPronto.useMutation({
    onSuccess: () => {
      toast.success("Marcado como pronto!");
      refetchLotes();
      refetchLotesMes();
    },
  });

  const finalizarLote = trpc.lotesProducao.finalizar.useMutation({
    onSuccess: () => {
      toast.success("Lote finalizado e estoque atualizado!");
      refetchLotes();
      refetchLotesMes();
      refetchItens();
      setFinalizarDialog(null);
      setQuantidadeFinal("");
    },
  });

  const moverStatus = trpc.lotesProducao.moverStatus.useMutation({
    onSuccess: () => {
      refetchLotes();
      refetchLotesMes();
    },
  });

  const excluirLote = trpc.lotesProducao.delete.useMutation({
    onSuccess: () => {
      toast.success("Lote excluído!");
      refetchLotes();
      refetchLotesMes();
    },
  });

  // Filtrar lotes por status (apenas do dia atual para o Kanban)
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  const lotesHoje = lotes.filter((l: Lote) => {
    const dataLote = new Date(l.dataAgendada);
    dataLote.setHours(0, 0, 0, 0);
    return dataLote.getTime() <= hoje.getTime();
  });

  const lotesPorStatus = {
    necessario: lotesHoje.filter((l: Lote) => l.status === "necessario"),
    em_producao: lotesHoje.filter((l: Lote) => l.status === "em_producao"),
    pronto: lotesHoje.filter((l: Lote) => l.status === "pronto"),
  };

  // Gerar dias do calendário
  const diasDoMes = useMemo(() => {
    const primeiroDia = new Date(anoAtual, mesAtual - 1, 1);
    const ultimoDia = new Date(anoAtual, mesAtual, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();
    
    const dias: (Date | null)[] = [];
    
    // Dias vazios antes do primeiro dia
    for (let i = 0; i < diaSemanaInicio; i++) {
      dias.push(null);
    }
    
    // Dias do mês
    for (let i = 1; i <= diasNoMes; i++) {
      dias.push(new Date(anoAtual, mesAtual - 1, i));
    }
    
    return dias;
  }, [anoAtual, mesAtual]);

  // Agrupar lotes por dia
  const lotesPorDia = useMemo(() => {
    const agrupado: Record<string, Lote[]> = {};
    lotesDoMes.forEach((lote: Lote) => {
      const data = new Date(lote.dataAgendada);
      const chave = `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`;
      if (!agrupado[chave]) agrupado[chave] = [];
      agrupado[chave].push(lote);
    });
    return agrupado;
  }, [lotesDoMes]);

  // Handlers
  const handleDragStart = (e: React.DragEvent, lote: Lote) => {
    setDraggedLote(lote);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, novoStatus: LoteStatus) => {
    e.preventDefault();
    if (draggedLote && draggedLote.status !== novoStatus && novoStatus !== "finalizado") {
      moverStatus.mutate({
        id: draggedLote.id,
        novoStatus: novoStatus as "necessario" | "em_producao" | "pronto",
        responsavel: user?.name || "Operador",
      });
    }
    setDraggedLote(null);
  };

  const handleIniciarProducaoFromItem = (item: ItemNecessario) => {
    setSelectedItem(item);
    const sugestao = Math.max(0, parseFloat(item.estoqueMinimo) - parseFloat(item.estoqueAtual));
    setQuantidadePlanejada(sugestao.toFixed(1));
    setDataAgendada(new Date().toISOString().split('T')[0]);
    setNovoLoteDialog(true);
  };

  const handleAgendarFromCalendario = (dia: Date) => {
    setDiaSelecionado(dia);
    setDataAgendada(dia.toISOString().split('T')[0]);
    setSelectedItem(null);
    setQuantidadePlanejada("");
    setNovoLoteDialog(true);
  };

  const handleCriarLote = () => {
    if (!quantidadePlanejada || !selectedItem) {
      toast.error("Selecione um item e quantidade para produzir");
      return;
    }
    
    criarLote.mutate({
      insumoId: selectedItem.id,
      insumoNome: selectedItem.nome,
      insumoUnidade: selectedItem.unidade,
      quantidadePlanejada: quantidadePlanejada,
      dataAgendada: dataAgendada,
      responsavel: user?.name || "Operador",
    });
  };

  const handleFinalizar = () => {
    if (!finalizarDialog || !quantidadeFinal) return;
    
    finalizarLote.mutate({
      id: finalizarDialog.id,
      quantidadeProduzida: quantidadeFinal,
    });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  const navegarMes = (direcao: number) => {
    let novoMes = mesAtual + direcao;
    let novoAno = anoAtual;
    
    if (novoMes > 12) {
      novoMes = 1;
      novoAno++;
    } else if (novoMes < 1) {
      novoMes = 12;
      novoAno--;
    }
    
    setMesAtual(novoMes);
    setAnoAtual(novoAno);
  };

  const isHoje = (dia: Date | null) => {
    if (!dia) return false;
    const hoje = new Date();
    return dia.getDate() === hoje.getDate() && 
           dia.getMonth() === hoje.getMonth() && 
           dia.getFullYear() === hoje.getFullYear();
  };

  const getLotesDoDia = (dia: Date | null) => {
    if (!dia) return [];
    const chave = `${dia.getFullYear()}-${dia.getMonth()}-${dia.getDate()}`;
    return lotesPorDia[chave] || [];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display flex items-center gap-3">
            <ChefHat className="h-8 w-8 text-primary" />
            Quadro de Produção
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie o fluxo de produção dos preparos da cozinha
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedItem(null);
            setQuantidadePlanejada("");
            setDataAgendada(new Date().toISOString().split('T')[0]);
            setNovoLoteDialog(true);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Lote Avulso
        </Button>
      </div>

      {/* Tabs: Kanban / Calendário */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "kanban" | "calendario")}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="kanban" className="gap-2">
            <Package className="h-4 w-4" />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="calendario" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            Calendário
          </TabsTrigger>
        </TabsList>

        {/* Tab: Kanban */}
        <TabsContent value="kanban" className="space-y-4">
          {/* Alertas de Estoque Baixo */}
          {itensNecessarios.length > 0 && (
            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  Itens com Estoque Baixo ({itensNecessarios.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {itensNecessarios.map((item: ItemNecessario) => (
                    <Button
                      key={item.id}
                      variant="outline"
                      size="sm"
                      className="gap-2 border-red-500/30 hover:bg-red-500/20"
                      onClick={() => handleIniciarProducaoFromItem(item)}
                    >
                      <Plus className="h-4 w-4" />
                      {item.nome.replace("(PR) ", "")}
                      <Badge variant="destructive" className="ml-1">
                        {parseFloat(item.estoqueAtual).toFixed(1)}/{parseFloat(item.estoqueMinimo).toFixed(1)} {item.unidade}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["necessario", "em_producao", "pronto"] as const).map((status) => {
              const config = statusConfig[status];
              const Icon = config.icon;
              const lotesDoStatus = lotesPorStatus[status];

              return (
                <div
                  key={status}
                  className={`rounded-xl border-2 ${config.color} min-h-[400px] flex flex-col`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  <div className={`p-4 ${config.headerColor} rounded-t-lg border-b border-white/10`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${config.iconColor}`} />
                        <span className="font-bold">{config.label}</span>
                      </div>
                      <Badge variant="secondary" className="font-mono">
                        {lotesDoStatus.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-3 flex-1 space-y-3 overflow-y-auto">
                    {lotesDoStatus.map((lote: Lote) => (
                      <div
                        key={lote.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lote)}
                        className={`bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-all shadow-sm hover:shadow-md ${
                          draggedLote?.id === lote.id ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold text-sm">
                              {lote.insumoNome.replace("(PR) ", "")}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => excluirLote.mutate(lote.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Package className="h-3 w-3" />
                            <span>
                              {parseFloat(lote.quantidadePlanejada).toFixed(1)} {lote.insumoUnidade}
                            </span>
                          </div>
                          {lote.responsavel && (
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3" />
                              <span>{lote.responsavel}</span>
                            </div>
                          )}
                          {lote.iniciadoEm && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>Início: {formatTime(lote.iniciadoEm)}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 pt-2 border-t border-border/50">
                          {status === "necessario" && (
                            <Button
                              size="sm"
                              className="w-full gap-2 bg-amber-600 hover:bg-amber-700"
                              onClick={() => iniciarProducao.mutate({ 
                                id: lote.id, 
                                responsavel: user?.name || "Operador" 
                              })}
                            >
                              <Play className="h-4 w-4" />
                              Iniciar Produção
                            </Button>
                          )}
                          {status === "em_producao" && (
                            <Button
                              size="sm"
                              className="w-full gap-2 bg-green-600 hover:bg-green-700"
                              onClick={() => marcarPronto.mutate({ id: lote.id })}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Marcar Pronto
                            </Button>
                          )}
                          {status === "pronto" && (
                            <Button
                              size="sm"
                              className="w-full gap-2 bg-primary hover:bg-primary/90"
                              onClick={() => {
                                setFinalizarDialog(lote);
                                setQuantidadeFinal(lote.quantidadePlanejada);
                              }}
                            >
                              <CheckCheck className="h-4 w-4" />
                              Finalizar
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    {lotesDoStatus.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm">
                        <Icon className={`h-8 w-8 mb-2 opacity-30 ${config.iconColor}`} />
                        <span>Nenhum lote</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* Tab: Calendário */}
        <TabsContent value="calendario" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => navegarMes(-1)}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <CardTitle className="text-xl">
                  {MESES[mesAtual - 1]} {anoAtual}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => navegarMes(1)}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Cabeçalho dos dias da semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DIAS_SEMANA.map((dia) => (
                  <div key={dia} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {dia}
                  </div>
                ))}
              </div>

              {/* Grid do calendário */}
              <div className="grid grid-cols-7 gap-1">
                {diasDoMes.map((dia, index) => {
                  const lotesDoDia = getLotesDoDia(dia);
                  const temLotes = lotesDoDia.length > 0;
                  const ehHoje = isHoje(dia);
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] p-1 border rounded-lg transition-all ${
                        dia ? 'cursor-pointer hover:border-primary/50' : ''
                      } ${ehHoje ? 'border-primary bg-primary/5' : 'border-border/50'}`}
                      onClick={() => dia && handleAgendarFromCalendario(dia)}
                    >
                      {dia && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${ehHoje ? 'text-primary' : ''}`}>
                            {dia.getDate()}
                          </div>
                          {temLotes && (
                            <div className="space-y-1">
                              {lotesDoDia.slice(0, 3).map((lote: Lote) => (
                                <div
                                  key={lote.id}
                                  className={`text-[10px] px-1 py-0.5 rounded truncate ${
                                    statusConfig[lote.status as keyof typeof statusConfig]?.badgeColor || 'bg-gray-500'
                                  } text-white`}
                                  title={lote.insumoNome}
                                >
                                  {lote.insumoNome.replace("(PR) ", "")}
                                </div>
                              ))}
                              {lotesDoDia.length > 3 && (
                                <div className="text-[10px] text-muted-foreground">
                                  +{lotesDoDia.length - 3} mais
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legenda */}
              <div className="flex gap-4 mt-4 pt-4 border-t justify-center">
                {Object.entries(statusConfig).map(([status, config]) => (
                  <div key={status} className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 rounded ${config.badgeColor}`} />
                    <span>{config.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog: Novo Lote / Agendar */}
      <Dialog open={novoLoteDialog} onOpenChange={setNovoLoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {selectedItem ? "Iniciar Produção" : "Agendar Produção"}
            </DialogTitle>
            <DialogDescription>
              {selectedItem 
                ? "Crie um novo lote de produção para o item selecionado"
                : "Agende uma produção para a data selecionada"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedItem ? (
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="font-semibold">{selectedItem.nome}</p>
                <p className="text-sm text-muted-foreground">
                  Estoque atual: {parseFloat(selectedItem.estoqueAtual).toFixed(1)} {selectedItem.unidade}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estoque mínimo: {parseFloat(selectedItem.estoqueMinimo).toFixed(1)} {selectedItem.unidade}
                </p>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium">Item de Preparo</label>
                <Select
                  value={(selectedItem as ItemNecessario | null)?.id?.toString() || ""}
                  onValueChange={(value) => {
                    const item = insumosPreparos.find((i: any) => i.id.toString() === value);
                    if (item) {
                      setSelectedItem({
                        id: item.id,
                        codigo: item.codigo,
                        nome: item.nome,
                        unidade: item.unidade,
                        estoqueAtual: item.estoqueAtual,
                        estoqueMinimo: item.estoqueMinimo,
                        status: item.status,
                      });
                    }
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione um item..." />
                  </SelectTrigger>
                  <SelectContent>
                    {insumosPreparos.map((item: any) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.nome.replace("(PR) ", "")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Data de Produção</label>
              <Input
                type="date"
                value={dataAgendada}
                onChange={(e) => setDataAgendada(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Quantidade a Produzir {selectedItem ? `(${selectedItem.unidade})` : ""}
              </label>
              <Input
                type="number"
                step="0.1"
                value={quantidadePlanejada}
                onChange={(e) => setQuantidadePlanejada(e.target.value)}
                placeholder="Ex: 5.0"
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setNovoLoteDialog(false);
              setSelectedItem(null);
            }}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCriarLote} 
              disabled={criarLote.isPending || !selectedItem || !quantidadePlanejada || selectedItem.id === undefined}
            >
              <Plus className="h-4 w-4 mr-2" />
              {dataAgendada === new Date().toISOString().split('T')[0] ? "Criar Lote" : "Agendar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Finalizar Lote */}
      <Dialog open={!!finalizarDialog} onOpenChange={() => setFinalizarDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-green-500" />
              Finalizar Produção
            </DialogTitle>
            <DialogDescription>
              Confirme a quantidade produzida para atualizar o estoque
            </DialogDescription>
          </DialogHeader>

          {finalizarDialog && (
            <div className="space-y-4">
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="font-semibold">{finalizarDialog.insumoNome}</p>
                <p className="text-sm text-muted-foreground">
                  Quantidade planejada: {parseFloat(finalizarDialog.quantidadePlanejada).toFixed(1)} {finalizarDialog.insumoUnidade}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Quantidade Produzida ({finalizarDialog.insumoUnidade})</label>
                <Input
                  type="number"
                  step="0.1"
                  value={quantidadeFinal}
                  onChange={(e) => setQuantidadeFinal(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setFinalizarDialog(null)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleFinalizar} 
              disabled={finalizarLote.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Finalizar e Atualizar Estoque
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
