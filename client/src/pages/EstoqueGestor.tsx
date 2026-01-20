import { useState, useEffect } from "react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Package,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  History,
  Eye,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function EstoqueGestor() {
  const [activeTab, setActiveTab] = useState("insumos");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  
  // Estado para edição inline
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  // Estado para detalhes do estoque sensível
  const [showSensivelDetails, setShowSensivelDetails] = useState(false);
  const [sensivelDetailType, setSensivelDetailType] = useState<string>("");
  
  // Estado para histórico
  const [selectedHistoricoDate, setSelectedHistoricoDate] = useState<string | null>(null);
  const [showHistoricoDetails, setShowHistoricoDetails] = useState(false);
  
  // Queries
  const { data: insumos = [], refetch: refetchInsumos } = trpc.insumos.list.useQuery({
    categoria: categoriaFilter !== "todas" ? categoriaFilter : undefined,
    status: statusFilter !== "todos" ? statusFilter as any : undefined,
    search: searchTerm || undefined,
  });
  
  const { data: insumosSensiveis = [] } = trpc.insumos.list.useQuery({
    contagemDiaria: true,
  });
  
  const { data: historicoContagens = [] } = trpc.contagensDiarias.list.useQuery();
  
  // Mutations
  const updateInsumo = trpc.insumos.update.useMutation({
    onSuccess: () => {
      toast.success("Insumo atualizado com sucesso");
      refetchInsumos();
      setShowEditDialog(false);
      setEditingItem(null);
    },
    onError: () => {
      toast.error("Erro ao atualizar insumo");
    },
  });
  
  // Categorias únicas
  const categorias = Array.from(new Set(insumos.map(i => i.categoria))).sort();
  
  // Estatísticas do estoque sensível
  const sensivelCriticos = insumosSensiveis.filter(i => i.status === "Crítico");
  const sensivelBaixos = insumosSensiveis.filter(i => i.status === "Baixo");
  const sensivelOk = insumosSensiveis.filter(i => i.status === "OK");
  
  // Agrupar histórico por data
  const historicoAgrupado = historicoContagens.reduce((acc: any, item: any) => {
    const data = new Date(item.dataContagem).toLocaleDateString('pt-BR');
    if (!acc[data]) {
      acc[data] = { items: [], criticos: 0, baixos: 0, ok: 0 };
    }
    acc[data].items.push(item);
    if (item.status === "Crítico") acc[data].criticos++;
    else if (item.status === "Baixo") acc[data].baixos++;
    else acc[data].ok++;
    return acc;
  }, {});
  
  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setShowEditDialog(true);
  };
  
  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    updateInsumo.mutate({
      id: editingItem.id,
      nome: editingItem.nome,
      categoria: editingItem.categoria,
      unidade: editingItem.unidade,
      estoqueAtual: editingItem.estoqueAtual,
      estoqueMinimo: editingItem.estoqueMinimo,
      custoUnitario: editingItem.custoUnitario,
      contagemDiaria: editingItem.contagemDiaria,
      ativo: editingItem.ativo,
    });
  };
  
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "OK": "bg-green-500/20 text-green-400 border-green-500/30",
      "Baixo": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "Crítico": "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return (
      <Badge variant="outline" className={styles[status] || ""}>
        {status}
      </Badge>
    );
  };
  
  const showSensivelDetail = (type: string) => {
    setSensivelDetailType(type);
    setShowSensivelDetails(true);
  };
  
  const getSensivelDetailItems = () => {
    switch (sensivelDetailType) {
      case "criticos": return sensivelCriticos;
      case "baixos": return sensivelBaixos;
      case "ok": return sensivelOk;
      default: return insumosSensiveis;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Estoque</h1>
        <p className="text-muted-foreground text-sm">
          Gestão completa de insumos, estoque sensível e histórico
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="insumos" className="gap-2">
            <Package className="h-4 w-4" />
            Insumos
          </TabsTrigger>
          <TabsTrigger value="sensivel" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Estoque Sensível
          </TabsTrigger>
          <TabsTrigger value="historico" className="gap-2">
            <History className="h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        {/* Tab Insumos */}
        <TabsContent value="insumos" className="space-y-4">
          {/* Filtros em uma linha */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-secondary/50"
              />
            </div>
            <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
              <SelectTrigger className="w-[180px] bg-secondary/50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas Categorias</SelectItem>
                {categorias.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-secondary/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="OK">OK</SelectItem>
                <SelectItem value="Baixo">Baixo</SelectItem>
                <SelectItem value="Crítico">Crítico</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="ml-auto">
              {insumos.length} itens
            </Badge>
          </div>

          {/* Tabela de Insumos com cabeçalho fixo */}
          <Card>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-[100px]">Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-right w-[120px]">Qtde em Estoque</TableHead>
                      <TableHead className="text-right w-[100px]">Mínimo</TableHead>
                      <TableHead className="w-[80px]">Unid.</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[80px] text-center">Contagem</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insumos.map((item) => (
                      <TableRow 
                        key={item.id} 
                        className="cursor-pointer hover:bg-secondary/30"
                        onClick={() => handleEdit(item)}
                      >
                        <TableCell className="font-mono text-xs">{item.codigo}</TableCell>
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.categoria}</TableCell>
                        <TableCell className="text-right font-mono font-bold text-lg">
                          {parseFloat(item.estoqueAtual).toFixed(1)}
                        </TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">
                          {parseFloat(item.estoqueMinimo).toFixed(1)}
                        </TableCell>
                        <TableCell className="text-sm">{item.unidade}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-center">
                          {item.contagemDiaria ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {insumos.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          Nenhum insumo encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Estoque Sensível */}
        <TabsContent value="sensivel" className="space-y-4">
          {/* Cards clicáveis */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card 
              className="bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
              onClick={() => showSensivelDetail("todos")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
                    <p className="text-2xl font-bold">{insumosSensiveis.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="bg-red-500/10 border-red-500/20 cursor-pointer hover:bg-red-500/20 transition-colors"
              onClick={() => showSensivelDetail("criticos")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Críticos</p>
                    <p className="text-2xl font-bold text-red-400">{sensivelCriticos.length}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-400/50" />
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="bg-yellow-500/10 border-yellow-500/20 cursor-pointer hover:bg-yellow-500/20 transition-colors"
              onClick={() => showSensivelDetail("baixos")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Baixos</p>
                    <p className="text-2xl font-bold text-yellow-400">{sensivelBaixos.length}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-yellow-400/50" />
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="bg-green-500/10 border-green-500/20 cursor-pointer hover:bg-green-500/20 transition-colors"
              onClick={() => showSensivelDetail("ok")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">OK</p>
                    <p className="text-2xl font-bold text-green-400">{sensivelOk.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de itens sensíveis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Itens de Contagem Diária</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {insumosSensiveis.map((item) => (
                  <Card 
                    key={item.id} 
                    className={`cursor-pointer hover:bg-secondary/50 transition-colors ${
                      item.status === "Crítico" ? "border-red-500/30" :
                      item.status === "Baixo" ? "border-yellow-500/30" : "border-green-500/30"
                    }`}
                    onClick={() => handleEdit(item)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{item.nome}</p>
                          <p className="text-xs text-muted-foreground">{item.categoria}</p>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono">
                          {parseFloat(item.estoqueAtual).toFixed(1)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / {parseFloat(item.estoqueMinimo).toFixed(1)} {item.unidade}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Histórico */}
        <TabsContent value="historico" className="space-y-4">
          {/* Resumo por data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(historicoAgrupado).slice(0, 10).map(([data, info]: [string, any]) => (
              <Card 
                key={data}
                className="cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => { setSelectedHistoricoDate(data); setShowHistoricoDetails(true); }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium">{data}</p>
                    <Badge variant="secondary">{info.items.length} itens</Badge>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm">{info.criticos}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-sm">{info.baixos}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm">{info.ok}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {Object.keys(historicoAgrupado).length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Nenhum histórico de contagem encontrado
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog de Edição de Insumo */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Insumo</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={editingItem.nome}
                  onChange={(e) => setEditingItem({ ...editingItem, nome: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Input
                    value={editingItem.categoria}
                    onChange={(e) => setEditingItem({ ...editingItem, categoria: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unidade</Label>
                  <Input
                    value={editingItem.unidade}
                    onChange={(e) => setEditingItem({ ...editingItem, unidade: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Qtde em Estoque</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={editingItem.estoqueAtual}
                    onChange={(e) => setEditingItem({ ...editingItem, estoqueAtual: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estoque Mínimo</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={editingItem.estoqueMinimo}
                    onChange={(e) => setEditingItem({ ...editingItem, estoqueMinimo: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Custo Unitário (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editingItem.custoUnitario}
                  onChange={(e) => setEditingItem({ ...editingItem, custoUnitario: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Item de Contagem Diária</Label>
                <Switch
                  checked={editingItem.contagemDiaria}
                  onCheckedChange={(checked) => setEditingItem({ ...editingItem, contagemDiaria: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Ativo</Label>
                <Switch
                  checked={editingItem.ativo}
                  onCheckedChange={(checked) => setEditingItem({ ...editingItem, ativo: checked })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={updateInsumo.isPending}>
              {updateInsumo.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Detalhes do Estoque Sensível */}
      <Dialog open={showSensivelDetails} onOpenChange={setShowSensivelDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {sensivelDetailType === "criticos" && "Itens Críticos"}
              {sensivelDetailType === "baixos" && "Itens com Estoque Baixo"}
              {sensivelDetailType === "ok" && "Itens com Estoque OK"}
              {sensivelDetailType === "todos" && "Todos os Itens Sensíveis"}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-auto space-y-2">
            {getSensivelDetailItems().map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="font-medium">{item.nome}</p>
                  <p className="text-xs text-muted-foreground">{item.categoria}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold">
                    {parseFloat(item.estoqueAtual).toFixed(1)} {item.unidade}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mín: {parseFloat(item.estoqueMinimo).toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Detalhes do Histórico */}
      <Dialog open={showHistoricoDetails} onOpenChange={setShowHistoricoDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Contagem de {selectedHistoricoDate}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-auto space-y-2">
            {selectedHistoricoDate && historicoAgrupado[selectedHistoricoDate]?.items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="font-medium">{item.itemNome}</p>
                  {item.responsavel && (
                    <p className="text-xs text-muted-foreground">Por: {item.responsavel}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold">
                    {parseFloat(item.estoqueContado).toFixed(1)} {item.unidade}
                  </p>
                  {getStatusBadge(item.status)}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
