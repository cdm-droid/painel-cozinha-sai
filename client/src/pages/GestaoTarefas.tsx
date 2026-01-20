import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ClipboardList,
  Wrench,
  Sparkles,
  FileText,
  Calendar,
  Clock,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Dever {
  id: number;
  titulo: string;
  descricao: string | null;
  categoria: string;
  secao: string;
  recorrencia: string;
  diaSemana: number | null;
  diaMes: number | null;
  dataEspecifica: Date | null;
  horario: string | null;
  ordem: number;
  ativo: boolean;
  createdAt: Date;
}

const CATEGORIAS = {
  operacional: { label: "Operacional", icon: ClipboardList, color: "bg-blue-500" },
  manutencao: { label: "Manutenção", icon: Wrench, color: "bg-orange-500" },
  limpeza: { label: "Limpeza", icon: Sparkles, color: "bg-green-500" },
  administrativo: { label: "Administrativo", icon: FileText, color: "bg-purple-500" },
};

const SECOES = {
  abertura: { label: "Abertura", icon: Clock },
  durante_operacao: { label: "Durante Operação", icon: Calendar },
  fechamento: { label: "Fechamento", icon: CalendarClock },
};

const RECORRENCIAS = {
  diaria: { label: "Diária", icon: CalendarDays, desc: "Todos os dias" },
  semanal: { label: "Semanal", icon: CalendarRange, desc: "Dia específico da semana" },
  mensal: { label: "Mensal", icon: Calendar, desc: "Dia específico do mês" },
  unica: { label: "Única", icon: CalendarClock, desc: "Data específica" },
};

const DIAS_SEMANA = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];

export default function GestaoTarefas() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDever, setEditingDever] = useState<Dever | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Dever | null>(null);
  
  // Form state
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<string>("operacional");
  const [secao, setSecao] = useState<string>("abertura");
  const [recorrencia, setRecorrencia] = useState<string>("diaria");
  const [diaSemana, setDiaSemana] = useState<number>(1);
  const [diaMes, setDiaMes] = useState<number>(1);
  const [dataEspecifica, setDataEspecifica] = useState<string>("");
  const [horario, setHorario] = useState("");
  
  // Filtros
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [filtroSecao, setFiltroSecao] = useState<string>("todas");

  // Queries
  const { data: deveres = [], refetch } = trpc.deveres.list.useQuery({}) as { data: Dever[], refetch: () => void };

  // Mutations
  const criarDever = trpc.deveres.create.useMutation({
    onSuccess: () => {
      toast.success("Tarefa criada com sucesso!");
      refetch();
      resetForm();
      setDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Erro ao criar tarefa: " + error.message);
    },
  });

  const atualizarDever = trpc.deveres.update.useMutation({
    onSuccess: () => {
      toast.success("Tarefa atualizada com sucesso!");
      refetch();
      resetForm();
      setDialogOpen(false);
      setEditingDever(null);
    },
    onError: (error) => {
      toast.error("Erro ao atualizar tarefa: " + error.message);
    },
  });

  const deletarDever = trpc.deveres.delete.useMutation({
    onSuccess: () => {
      toast.success("Tarefa excluída com sucesso!");
      refetch();
      setDeleteConfirm(null);
    },
    onError: (error) => {
      toast.error("Erro ao excluir tarefa: " + error.message);
    },
  });

  const toggleAtivo = trpc.deveres.update.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const resetForm = () => {
    setTitulo("");
    setDescricao("");
    setCategoria("operacional");
    setSecao("abertura");
    setRecorrencia("diaria");
    setDiaSemana(1);
    setDiaMes(1);
    setDataEspecifica("");
    setHorario("");
  };

  const handleEdit = (dever: Dever) => {
    setEditingDever(dever);
    setTitulo(dever.titulo);
    setDescricao(dever.descricao || "");
    setCategoria(dever.categoria);
    setSecao(dever.secao);
    setRecorrencia(dever.recorrencia);
    setDiaSemana(dever.diaSemana || 1);
    setDiaMes(dever.diaMes || 1);
    setDataEspecifica(dever.dataEspecifica ? new Date(dever.dataEspecifica).toISOString().split('T')[0] : "");
    setHorario(dever.horario || "");
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!titulo.trim()) {
      toast.error("Informe o título da tarefa");
      return;
    }

    const dados = {
      titulo: titulo.trim(),
      descricao: descricao.trim() || undefined,
      categoria: categoria as "operacional" | "manutencao" | "limpeza" | "administrativo",
      secao: secao as "abertura" | "durante_operacao" | "fechamento",
      recorrencia: recorrencia as "diaria" | "semanal" | "mensal" | "unica",
      diaSemana: recorrencia === "semanal" ? diaSemana : undefined,
      diaMes: recorrencia === "mensal" ? diaMes : undefined,
      dataEspecifica: recorrencia === "unica" ? dataEspecifica : undefined,
      horario: horario || undefined,
    };

    if (editingDever) {
      atualizarDever.mutate({ id: editingDever.id, ...dados });
    } else {
      criarDever.mutate(dados);
    }
  };

  // Filtrar deveres
  const deveresFiltrados = (deveres as Dever[]).filter((d: Dever) => {
    if (filtroCategoria !== "todas" && d.categoria !== filtroCategoria) return false;
    if (filtroSecao !== "todas" && d.secao !== filtroSecao) return false;
    return true;
  });

  // Agrupar por categoria
  const deveresPorCategoria = deveresFiltrados.reduce((acc: Record<string, Dever[]>, dever: Dever) => {
    const cat = dever.categoria as string;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(dever);
    return acc;
  }, {} as Record<string, Dever[]>);

  const getRecorrenciaLabel = (dever: Dever) => {
    switch (dever.recorrencia) {
      case "diaria":
        return "Diária";
      case "semanal":
        return DIAS_SEMANA.find(d => d.value === dever.diaSemana)?.label || "Semanal";
      case "mensal":
        return `Dia ${dever.diaMes} de cada mês`;
      case "unica":
        return dever.dataEspecifica 
          ? new Date(dever.dataEspecifica).toLocaleDateString("pt-BR") 
          : "Data única";
      default:
        return dever.recorrencia;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-primary" />
            Gestão de Tarefas
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure as tarefas e rotinas da equipe
          </p>
        </div>
        <Button onClick={() => { resetForm(); setEditingDever(null); setDialogOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-1 block">Categoria</label>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  {Object.entries(CATEGORIAS).map(([key, cat]) => (
                    <SelectItem key={key} value={key}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-1 block">Seção</label>
              <Select value={filtroSecao} onValueChange={setFiltroSecao}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as seções</SelectItem>
                  {Object.entries(SECOES).map(([key, sec]) => (
                    <SelectItem key={key} value={key}>{sec.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Tarefas por Categoria */}
      {Object.entries(CATEGORIAS).map(([catKey, catConfig]) => {
        const deveresCategoria = deveresPorCategoria[catKey as string] || [];
        if (filtroCategoria !== "todas" && filtroCategoria !== catKey) return null;
        
        const CatIcon = catConfig.icon;
        
        return (
          <Card key={catKey} className="overflow-hidden">
            <CardHeader className={`${catConfig.color} text-white`}>
              <CardTitle className="flex items-center gap-2">
                <CatIcon className="h-5 w-5" />
                {catConfig.label}
                <Badge variant="secondary" className="ml-auto bg-white/20">
                  {deveresCategoria.length} tarefas
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {deveresCategoria.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  Nenhuma tarefa nesta categoria
                </div>
              ) : (
                <div className="divide-y">
                  {deveresCategoria.map((dever: Dever) => {
                    const SecIcon = SECOES[dever.secao as keyof typeof SECOES]?.icon || Clock;
                    const RecIcon = RECORRENCIAS[dever.recorrencia as keyof typeof RECORRENCIAS]?.icon || Calendar;
                    
                    return (
                      <div 
                        key={dever.id} 
                        className={`p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors ${
                          !dever.ativo ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{dever.titulo}</span>
                            {!dever.ativo && (
                              <Badge variant="outline" className="text-xs">Inativa</Badge>
                            )}
                          </div>
                          {dever.descricao && (
                            <p className="text-sm text-muted-foreground mb-2">{dever.descricao}</p>
                          )}
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <SecIcon className="h-3 w-3" />
                              {SECOES[dever.secao as keyof typeof SECOES]?.label}
                            </span>
                            <span className="flex items-center gap-1">
                              <RecIcon className="h-3 w-3" />
                              {getRecorrenciaLabel(dever)}
                            </span>
                            {dever.horario && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {dever.horario}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={dever.ativo}
                            onCheckedChange={(checked) => {
                              toggleAtivo.mutate({ id: dever.id, ativo: checked });
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(dever)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteConfirm(dever)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Dialog: Criar/Editar Tarefa */}
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          resetForm();
          setEditingDever(null);
        }
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingDever ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {editingDever ? "Editar Tarefa" : "Nova Tarefa"}
            </DialogTitle>
            <DialogDescription>
              {editingDever 
                ? "Atualize as informações da tarefa"
                : "Preencha os dados para criar uma nova tarefa"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <label className="text-sm font-medium">Título *</label>
              <Input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Limpeza de Coifa"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Detalhes adicionais sobre a tarefa..."
                className="mt-1"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Categoria</label>
                <Select value={categoria} onValueChange={setCategoria}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORIAS).map(([key, cat]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Seção do Dia</label>
                <Select value={secao} onValueChange={setSecao}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SECOES).map(([key, sec]) => (
                      <SelectItem key={key} value={key}>{sec.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Recorrência</label>
              <Select value={recorrencia} onValueChange={setRecorrencia}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(RECORRENCIAS).map(([key, rec]) => (
                    <SelectItem key={key} value={key}>
                      <div>
                        <div>{rec.label}</div>
                        <div className="text-xs text-muted-foreground">{rec.desc}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {recorrencia === "semanal" && (
              <div>
                <label className="text-sm font-medium">Dia da Semana</label>
                <Select value={diaSemana.toString()} onValueChange={(v) => setDiaSemana(parseInt(v))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIAS_SEMANA.map((dia) => (
                      <SelectItem key={dia.value} value={dia.value.toString()}>{dia.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {recorrencia === "mensal" && (
              <div>
                <label className="text-sm font-medium">Dia do Mês</label>
                <Select value={diaMes.toString()} onValueChange={(v) => setDiaMes(parseInt(v))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
                      <SelectItem key={dia} value={dia.toString()}>Dia {dia}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {recorrencia === "unica" && (
              <div>
                <label className="text-sm font-medium">Data Específica</label>
                <Input
                  type="date"
                  value={dataEspecifica}
                  onChange={(e) => setDataEspecifica(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Horário Sugerido (opcional)</label>
              <Input
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={criarDever.isPending || atualizarDever.isPending}
            >
              {editingDever ? "Salvar Alterações" : "Criar Tarefa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Confirmar Exclusão */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Excluir Tarefa
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a tarefa "{deleteConfirm?.titulo}"? 
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={() => deleteConfirm && deletarDever.mutate({ id: deleteConfirm.id })}
              disabled={deletarDever.isPending}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
