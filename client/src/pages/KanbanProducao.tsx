import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { 
  AlertTriangle, 
  Play, 
  CheckCircle2, 
  Package, 
  Clock, 
  User,
  Plus,
  ArrowRight,
  ChefHat,
  Flame,
  CheckCheck,
  GripVertical,
  X
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
  },
  em_producao: {
    label: "Em Produção",
    color: "bg-amber-500/20 border-amber-500/50",
    headerColor: "bg-amber-500/30",
    icon: Flame,
    iconColor: "text-amber-400",
  },
  pronto: {
    label: "Pronto",
    color: "bg-green-500/20 border-green-500/50",
    headerColor: "bg-green-500/30",
    icon: CheckCircle2,
    iconColor: "text-green-400",
  },
};

export default function KanbanProducao() {
  const { user } = useAuth();
  const [draggedLote, setDraggedLote] = useState<Lote | null>(null);
  const [novoLoteDialog, setNovoLoteDialog] = useState(false);
  const [finalizarDialog, setFinalizarDialog] = useState<Lote | null>(null);
  const [quantidadeFinal, setQuantidadeFinal] = useState("");
  const [selectedItem, setSelectedItem] = useState<ItemNecessario | null>(null);
  const [quantidadePlanejada, setQuantidadePlanejada] = useState("");

  // Queries
  const { data: lotes = [], refetch: refetchLotes } = trpc.lotesProducao.list.useQuery({});
  const { data: itensNecessarios = [], refetch: refetchItens } = trpc.lotesProducao.itensNecessarios.useQuery();
  const { data: insumosPreparos = [] } = trpc.insumos.list.useQuery({ categoria: "Preparo" });

  // Mutations
  const criarLote = trpc.lotesProducao.create.useMutation({
    onSuccess: () => {
      toast.success("Lote criado com sucesso!");
      refetchLotes();
      refetchItens();
      setNovoLoteDialog(false);
      setSelectedItem(null);
      setQuantidadePlanejada("");
    },
  });

  const iniciarProducao = trpc.lotesProducao.iniciarProducao.useMutation({
    onSuccess: () => {
      toast.success("Produção iniciada!");
      refetchLotes();
    },
  });

  const marcarPronto = trpc.lotesProducao.marcarPronto.useMutation({
    onSuccess: () => {
      toast.success("Marcado como pronto!");
      refetchLotes();
    },
  });

  const finalizarLote = trpc.lotesProducao.finalizar.useMutation({
    onSuccess: () => {
      toast.success("Lote finalizado e estoque atualizado!");
      refetchLotes();
      refetchItens();
      setFinalizarDialog(null);
      setQuantidadeFinal("");
    },
  });

  const moverStatus = trpc.lotesProducao.moverStatus.useMutation({
    onSuccess: () => {
      refetchLotes();
    },
  });

  const excluirLote = trpc.lotesProducao.delete.useMutation({
    onSuccess: () => {
      toast.success("Lote excluído!");
      refetchLotes();
    },
  });

  // Filtrar lotes por status
  const lotesPorStatus = {
    necessario: lotes.filter((l: Lote) => l.status === "necessario"),
    em_producao: lotes.filter((l: Lote) => l.status === "em_producao"),
    pronto: lotes.filter((l: Lote) => l.status === "pronto"),
  };

  // Drag and Drop handlers
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
    // Sugerir quantidade baseada no estoque mínimo - atual
    const sugestao = Math.max(0, parseFloat(item.estoqueMinimo) - parseFloat(item.estoqueAtual));
    setQuantidadePlanejada(sugestao.toFixed(1));
    setNovoLoteDialog(true);
  };

  const handleCriarLote = () => {
    if (!selectedItem || !quantidadePlanejada) return;
    
    criarLote.mutate({
      insumoId: selectedItem.id,
      insumoNome: selectedItem.nome,
      insumoUnidade: selectedItem.unidade,
      quantidadePlanejada: quantidadePlanejada,
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
      </div>

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
              {/* Column Header */}
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

              {/* Cards */}
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

                    {/* Action Buttons */}
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
                          Finalizar e Atualizar Estoque
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

      {/* Dialog: Novo Lote */}
      <Dialog open={novoLoteDialog} onOpenChange={setNovoLoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Iniciar Nova Produção
            </DialogTitle>
            <DialogDescription>
              Crie um novo lote de produção para o item selecionado
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="font-semibold">{selectedItem.nome}</p>
                <p className="text-sm text-muted-foreground">
                  Estoque atual: {parseFloat(selectedItem.estoqueAtual).toFixed(1)} {selectedItem.unidade}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estoque mínimo: {parseFloat(selectedItem.estoqueMinimo).toFixed(1)} {selectedItem.unidade}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Quantidade a Produzir ({selectedItem.unidade})</label>
                <Input
                  type="number"
                  step="0.1"
                  value={quantidadePlanejada}
                  onChange={(e) => setQuantidadePlanejada(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setNovoLoteDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCriarLote} disabled={criarLote.isPending}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Lote
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

              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm">
                <p className="text-green-400 font-medium">Ao finalizar:</p>
                <ul className="text-muted-foreground mt-1 space-y-1">
                  <li>• O estoque do item será atualizado automaticamente</li>
                  <li>• Um registro será criado no Diário de Produção</li>
                </ul>
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
