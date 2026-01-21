import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  XCircle,
  MapPin,
  Shield,
  User,
  Users,
  Filter
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Dever {
  id: number;
  titulo: string;
  descricao: string | null;
  categoria: string;
  area: string | null;
  fatorPrincipal: string | null;
  responsavel: string | null;
  operadorId: number | null;
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

const AREAS = {
  cozinha: { label: "Cozinha", icon: "🍳" },
  caixa: { label: "Caixa", icon: "💰" },
  area_externa: { label: "Área Externa", icon: "🌳" },
  salao: { label: "Salão", icon: "🪑" },
  estoque: { label: "Estoque", icon: "📦" },
  geral: { label: "Geral", icon: "🏢" },
};

const FATORES = {
  seguranca: { label: "Segurança", color: "text-red-600 bg-red-50" },
  higiene: { label: "Higiene", color: "text-green-600 bg-green-50" },
  manutencao: { label: "Manutenção", color: "text-orange-600 bg-orange-50" },
  operacional: { label: "Operacional", color: "text-blue-600 bg-blue-50" },
  qualidade: { label: "Qualidade", color: "text-purple-600 bg-purple-50" },
  outro: { label: "Outro", color: "text-gray-600 bg-gray-50" },
};

const RESPONSAVEIS = {
  gerente: { label: "Gerente" },
  chapeiro: { label: "Chapeiro" },
  auxiliar_cozinha: { label: "Auxiliar de Cozinha" },
  atendente: { label: "Atendente" },
  cozinheiro: { label: "Cozinheiro" },
  todos: { label: "Todos" },
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
  const [showFilters, setShowFilters] = useState(false);
  
  // Form state
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<string>("operacional");
  const [area, setArea] = useState<string>("geral");
  const [fatorPrincipal, setFatorPrincipal] = useState<string>("operacional");
  const [responsavel, setResponsavel] = useState<string>("todos");
  const [operadorId, setOperadorId] = useState<string>("");
  const [secao, setSecao] = useState<string>("abertura");
  const [recorrencia, setRecorrencia] = useState<string>("diaria");
  const [diaSemana, setDiaSemana] = useState<number>(1);
  const [diaMes, setDiaMes] = useState<number>(1);
  const [dataEspecifica, setDataEspecifica] = useState<string>("");
  const [horario, setHorario] = useState("");
  
  // Filtros
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
  const [filtroSecao, setFiltroSecao] = useState<string>("todas");
  const [filtroArea, setFiltroArea] = useState<string>("todas");
  const [filtroFator, setFiltroFator] = useState<string>("todos");
  const [filtroResponsavel, setFiltroResponsavel] = useState<string>("todos");

  // Queries
  const { data: deveres = [], refetch } = trpc.deveres.list.useQuery({}) as { data: Dever[], refetch: () => void };
  const { data: colaboradores = [] } = trpc.colaboradores.listAtivos.useQuery();

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
    setArea("geral");
    setFatorPrincipal("operacional");
    setResponsavel("todos");
    setOperadorId("");
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
    setArea(dever.area || "geral");
    setFatorPrincipal(dever.fatorPrincipal || "operacional");
    setResponsavel(dever.responsavel || "todos");
    setOperadorId(dever.operadorId?.toString() || "");
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
      area: area as "cozinha" | "caixa" | "area_externa" | "salao" | "estoque" | "geral",
      fatorPrincipal: fatorPrincipal as "seguranca" | "higiene" | "manutencao" | "operacional" | "qualidade" | "outro",
      responsavel: responsavel as "gerente" | "chapeiro" | "auxiliar_cozinha" | "atendente" | "cozinheiro" | "todos",
      operadorId: operadorId ? parseInt(operadorId) : undefined,
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
    if (filtroArea !== "todas" && d.area !== filtroArea) return false;
    if (filtroFator !== "todos" && d.fatorPrincipal !== filtroFator) return false;
    if (filtroResponsavel !== "todos" && d.responsavel !== filtroResponsavel) return false;
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

  const getOperadorNome = (operadorId: number | null) => {
    if (!operadorId) return null;
    const operador = colaboradores.find((c: any) => c.id === operadorId);
    return operador ? (operador.apelido || operador.nome) : null;
  };

  // Contadores para estatísticas
  const stats = {
    total: deveres.length,
    ativos: deveres.filter(d => d.ativo).length,
    porArea: Object.entries(AREAS).map(([key, val]) => ({
      key,
      label: val.label,
      count: deveres.filter(d => d.area === key).length
    })),
    porFator: Object.entries(FATORES).map(([key, val]) => ({
      key,
      label: val.label,
      count: deveres.filter(d => d.fatorPrincipal === key).length
    })),
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
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button onClick={() => { resetForm(); setEditingDever(null); setDialogOpen(true); }} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total de Tarefas</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{stats.ativos}</div>
            <div className="text-sm text-muted-foreground">Tarefas Ativas</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-red-600">
              {deveres.filter(d => d.fatorPrincipal === 'seguranca').length}
            </div>
            <div className="text-sm text-muted-foreground">Segurança</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-emerald-600">
              {deveres.filter(d => d.fatorPrincipal === 'higiene').length}
            </div>
            <div className="text-sm text-muted-foreground">Higiene</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros Expandidos */}
      {showFilters && (
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <Label className="text-xs">Categoria</Label>
                <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {Object.entries(CATEGORIAS).map(([key, cat]) => (
                      <SelectItem key={key} value={key}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Área</Label>
                <Select value={filtroArea} onValueChange={setFiltroArea}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {Object.entries(AREAS).map(([key, area]) => (
                      <SelectItem key={key} value={key}>{area.icon} {area.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Fator Principal</Label>
                <Select value={filtroFator} onValueChange={setFiltroFator}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {Object.entries(FATORES).map(([key, fator]) => (
                      <SelectItem key={key} value={key}>{fator.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Responsável</Label>
                <Select value={filtroResponsavel} onValueChange={setFiltroResponsavel}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    {Object.entries(RESPONSAVEIS).map(([key, resp]) => (
                      <SelectItem key={key} value={key}>{resp.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Seção</Label>
                <Select value={filtroSecao} onValueChange={setFiltroSecao}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {Object.entries(SECOES).map(([key, sec]) => (
                      <SelectItem key={key} value={key}>{sec.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
                <div className="p-8 text-center text-muted-foreground">
                  <ClipboardList className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>Nenhuma tarefa nesta categoria</p>
                </div>
              ) : (
                <div className="divide-y">
                  {deveresCategoria.map((dever: Dever) => {
                    const SecaoIcon = SECOES[dever.secao as keyof typeof SECOES]?.icon || Clock;
                    const areaInfo = AREAS[dever.area as keyof typeof AREAS];
                    const fatorInfo = FATORES[dever.fatorPrincipal as keyof typeof FATORES];
                    const responsavelInfo = RESPONSAVEIS[dever.responsavel as keyof typeof RESPONSAVEIS];
                    const operadorNome = getOperadorNome(dever.operadorId);
                    
                    return (
                      <div 
                        key={dever.id} 
                        className={`p-4 hover:bg-muted/50 transition-colors ${!dever.ativo ? 'opacity-50' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-medium truncate">{dever.titulo}</h4>
                              {!dever.ativo && (
                                <Badge variant="secondary" className="text-xs">Inativa</Badge>
                              )}
                            </div>
                            
                            {dever.descricao && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {dever.descricao}
                              </p>
                            )}
                            
                            {/* Tags de informação */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {/* Área */}
                              {areaInfo && (
                                <Badge variant="outline" className="text-xs gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {areaInfo.icon} {areaInfo.label}
                                </Badge>
                              )}
                              
                              {/* Fator Principal */}
                              {fatorInfo && (
                                <Badge className={`text-xs ${fatorInfo.color}`}>
                                  <Shield className="h-3 w-3 mr-1" />
                                  {fatorInfo.label}
                                </Badge>
                              )}
                              
                              {/* Responsável */}
                              {responsavelInfo && dever.responsavel !== 'todos' && (
                                <Badge variant="outline" className="text-xs gap-1">
                                  <User className="h-3 w-3" />
                                  {responsavelInfo.label}
                                </Badge>
                              )}
                              
                              {/* Operador */}
                              {operadorNome && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                  <Users className="h-3 w-3" />
                                  {operadorNome}
                                </Badge>
                              )}
                              
                              {/* Seção */}
                              <Badge variant="outline" className="text-xs">
                                <SecaoIcon className="h-3 w-3 mr-1" />
                                {SECOES[dever.secao as keyof typeof SECOES]?.label}
                              </Badge>
                              
                              {/* Recorrência */}
                              <Badge variant="outline" className="text-xs">
                                <CalendarDays className="h-3 w-3 mr-1" />
                                {getRecorrenciaLabel(dever)}
                              </Badge>
                              
                              {/* Horário */}
                              {dever.horario && (
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {dever.horario}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Ações */}
                          <div className="flex items-center gap-2 shrink-0">
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

          <div className="space-y-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                Informações Básicas
              </h3>
              
              <div>
                <Label>Título *</Label>
                <Input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Limpeza de Coifa"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Detalhes adicionais sobre a tarefa..."
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>

            {/* Classificação */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                Classificação
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Categoria</Label>
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
                  <Label>Área</Label>
                  <Select value={area} onValueChange={setArea}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AREAS).map(([key, areaItem]) => (
                        <SelectItem key={key} value={key}>
                          {areaItem.icon} {areaItem.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fator Principal</Label>
                  <Select value={fatorPrincipal} onValueChange={setFatorPrincipal}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(FATORES).map(([key, fator]) => (
                        <SelectItem key={key} value={key}>{fator.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Seção do Dia</Label>
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
            </div>

            {/* Responsabilidade */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                Responsabilidade
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cargo Responsável</Label>
                  <Select value={responsavel} onValueChange={setResponsavel}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(RESPONSAVEIS).map(([key, resp]) => (
                        <SelectItem key={key} value={key}>{resp.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Operador (opcional)</Label>
                  <Select value={operadorId} onValueChange={setOperadorId}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione um colaborador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhum específico</SelectItem>
                      {colaboradores.map((colab: any) => (
                        <SelectItem key={colab.id} value={colab.id.toString()}>
                          {colab.apelido || colab.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Recorrência */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                Recorrência
              </h3>
              
              <div>
                <Label>Frequência</Label>
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
                  <Label>Dia da Semana</Label>
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
                  <Label>Dia do Mês</Label>
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
                  <Label>Data Específica</Label>
                  <Input
                    type="date"
                    value={dataEspecifica}
                    onChange={(e) => setDataEspecifica(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label>Horário Sugerido (opcional)</Label>
                <Input
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="mt-1"
                />
              </div>
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
