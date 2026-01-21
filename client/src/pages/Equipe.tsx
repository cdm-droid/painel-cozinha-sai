import { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  UserCheck,
  UserX,
  Loader2,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// Labels para exibição
const FUNCAO_LABELS: Record<string, string> = {
  cozinheiro: "Cozinheiro",
  auxiliar: "Auxiliar de Cozinha",
  chapeiro: "Chapeiro",
  atendente: "Atendente",
  gerente: "Gerente",
  outro: "Outro",
};

const TURNO_LABELS: Record<string, string> = {
  manha: "Manhã",
  tarde: "Tarde",
  noite: "Noite",
  integral: "Integral",
};

type Colaborador = {
  id: number;
  nome: string;
  apelido: string | null;
  cargo: string;
  funcao: "cozinheiro" | "auxiliar" | "chapeiro" | "atendente" | "gerente" | "outro";
  telefone: string | null;
  email: string | null;
  dataAdmissao: Date | null;
  turno: "manha" | "tarde" | "noite" | "integral" | null;
  ativo: boolean;
  observacoes: string | null;
};

export default function Equipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroFuncao, setFiltroFuncao] = useState<string>("todos");
  const [filtroAtivo, setFiltroAtivo] = useState<string>("ativos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingColaborador, setEditingColaborador] = useState<Colaborador | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    nome: string;
    apelido: string;
    cargo: string;
    funcao: "cozinheiro" | "auxiliar" | "chapeiro" | "atendente" | "gerente" | "outro";
    telefone: string;
    email: string;
    turno: "manha" | "tarde" | "noite" | "integral";
    observacoes: string;
  }>({
    nome: "",
    apelido: "",
    cargo: "",
    funcao: "auxiliar",
    telefone: "",
    email: "",
    turno: "integral",
    observacoes: "",
  });

  // Queries
  const { data: colaboradores = [], isLoading, refetch } = trpc.colaboradores.list.useQuery({
    funcao: filtroFuncao !== "todos" ? filtroFuncao as any : undefined,
    ativo: filtroAtivo === "ativos" ? true : filtroAtivo === "inativos" ? false : undefined,
    search: searchTerm || undefined,
  });

  // Mutations
  const createMutation = trpc.colaboradores.create.useMutation({
    onSuccess: () => {
      toast.success("Colaborador cadastrado com sucesso!");
      refetch();
      closeDialog();
    },
    onError: (error) => {
      toast.error(`Erro ao cadastrar: ${error.message}`);
    },
  });

  const updateMutation = trpc.colaboradores.update.useMutation({
    onSuccess: () => {
      toast.success("Colaborador atualizado com sucesso!");
      refetch();
      closeDialog();
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar: ${error.message}`);
    },
  });

  const deleteMutation = trpc.colaboradores.delete.useMutation({
    onSuccess: () => {
      toast.success("Colaborador desativado com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Erro ao desativar: ${error.message}`);
    },
  });

  const openNewDialog = () => {
    setEditingColaborador(null);
    setFormData({
      nome: "",
      apelido: "",
      cargo: "",
      funcao: "auxiliar",
      telefone: "",
      email: "",
      turno: "integral",
      observacoes: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (colaborador: Colaborador) => {
    setEditingColaborador(colaborador);
    setFormData({
      nome: colaborador.nome,
      apelido: colaborador.apelido || "",
      cargo: colaborador.cargo,
      funcao: colaborador.funcao,
      telefone: colaborador.telefone || "",
      email: colaborador.email || "",
      turno: colaborador.turno || "integral",
      observacoes: colaborador.observacoes || "",
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingColaborador(null);
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.cargo) {
      toast.error("Nome e cargo são obrigatórios");
      return;
    }

    if (editingColaborador) {
      updateMutation.mutate({
        id: editingColaborador.id,
        ...formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja desativar este colaborador?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleReactivate = (id: number) => {
    updateMutation.mutate({ id, ativo: true });
  };

  // Estatísticas
  const stats = {
    total: colaboradores.length,
    ativos: colaboradores.filter(c => c.ativo).length,
    inativos: colaboradores.filter(c => !c.ativo).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Equipe</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de colaboradores da cozinha
          </p>
        </div>
        <Button onClick={openNewDialog} className="gap-2">
          <Plus size={16} />
          Novo Colaborador
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-success">{stats.ativos}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-muted-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Inativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-muted-foreground">{stats.inativos}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome, apelido ou cargo..."
            className="pl-9 bg-secondary/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filtroFuncao} onValueChange={setFiltroFuncao}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas Funções</SelectItem>
            <SelectItem value="gerente">Gerente</SelectItem>
            <SelectItem value="cozinheiro">Cozinheiro</SelectItem>
            <SelectItem value="chapeiro">Chapeiro</SelectItem>
            <SelectItem value="auxiliar">Auxiliar de Cozinha</SelectItem>
            <SelectItem value="atendente">Atendente</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filtroAtivo} onValueChange={setFiltroAtivo}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativos">Ativos</SelectItem>
            <SelectItem value="inativos">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela de Colaboradores */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30">
                <TableHead>Colaborador</TableHead>
                <TableHead>Cargo / Função</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Turno</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colaboradores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Nenhum colaborador encontrado</p>
                  </TableCell>
                </TableRow>
              ) : (
                colaboradores.map((colaborador) => (
                  <TableRow key={colaborador.id} className={!colaborador.ativo ? "opacity-50" : ""}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold">
                            {colaborador.nome.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{colaborador.nome}</p>
                          {colaborador.apelido && (
                            <p className="text-xs text-muted-foreground">"{colaborador.apelido}"</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{colaborador.cargo}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {FUNCAO_LABELS[colaborador.funcao]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        {colaborador.telefone && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone size={12} />
                            {colaborador.telefone}
                          </div>
                        )}
                        {colaborador.email && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Mail size={12} />
                            {colaborador.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-muted-foreground" />
                        <span className="text-sm">{TURNO_LABELS[colaborador.turno || "integral"]}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {colaborador.ativo ? (
                        <Badge className="bg-success/10 text-success border-success/30">
                          <UserCheck size={12} className="mr-1" />
                          Ativo
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <UserX size={12} className="mr-1" />
                          Inativo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(colaborador)}
                        >
                          <Edit size={14} />
                        </Button>
                        {colaborador.ativo ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(colaborador.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-success hover:text-success"
                            onClick={() => handleReactivate(colaborador.id)}
                          >
                            <UserCheck size={14} />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de Cadastro/Edição */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingColaborador ? "Editar Colaborador" : "Novo Colaborador"}
            </DialogTitle>
            <DialogDescription>
              {editingColaborador 
                ? "Atualize as informações do colaborador." 
                : "Preencha os dados para cadastrar um novo colaborador."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome do colaborador"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apelido">Apelido</Label>
                <Input
                  id="apelido"
                  value={formData.apelido}
                  onChange={(e) => setFormData({ ...formData, apelido: e.target.value })}
                  placeholder="Como é chamado"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo *</Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  placeholder="Ex: Cozinheiro Chefe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="funcao">Função</Label>
                <Select 
                  value={formData.funcao} 
                  onValueChange={(value: any) => setFormData({ ...formData, funcao: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="cozinheiro">Cozinheiro</SelectItem>
                    <SelectItem value="chapeiro">Chapeiro</SelectItem>
                    <SelectItem value="auxiliar">Auxiliar de Cozinha</SelectItem>
                    <SelectItem value="atendente">Atendente</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="turno">Turno de Trabalho</Label>
              <Select 
                value={formData.turno} 
                onValueChange={(value: any) => setFormData({ ...formData, turno: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manha">Manhã</SelectItem>
                  <SelectItem value="tarde">Tarde</SelectItem>
                  <SelectItem value="noite">Noite</SelectItem>
                  <SelectItem value="integral">Integral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Informações adicionais..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {editingColaborador ? "Salvar Alterações" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
