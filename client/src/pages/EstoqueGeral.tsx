import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Download, 
  Package,
  Plus,
  Save,
  AlertTriangle,
  ListFilter,
  Loader2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function EstoqueGeral() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [contagemFilter, setContagemFilter] = useState<'todos' | 'critico' | 'geral'>('todos');
  const { isOperacional } = useAuth();
  
  // Estado para armazenar contagens temporárias (apenas visual)
  const [contagens, setContagens] = useState<Record<number, string>>({});

  // Buscar insumos do backend
  const { data: insumos = [], isLoading, refetch } = trpc.insumos.list.useQuery({
    ativo: isOperacional ? true : undefined,
    search: searchTerm || undefined,
  });

  // Buscar categorias
  const { data: categories = [] } = trpc.insumos.categorias.useQuery();

  // Mutation para atualizar insumo
  const updateInsumoMutation = trpc.insumos.update.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Insumo atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar insumo: " + error.message);
    }
  });

  // Mutation para atualizar estoque (contagem)
  const updateEstoqueMutation = trpc.insumos.updateEstoque.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Contagem salva com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao salvar contagem: " + error.message);
    }
  });

  const handleContagemChange = (id: number, value: string) => {
    setContagens(prev => ({ ...prev, [id]: value }));
  };

  const handleSalvarContagem = async () => {
    const contagensParaSalvar = Object.entries(contagens).filter(([_, value]) => value !== "");
    
    if (contagensParaSalvar.length === 0) {
      toast.warning("Nenhuma contagem para salvar.");
      return;
    }

    for (const [id, quantidade] of contagensParaSalvar) {
      await updateEstoqueMutation.mutateAsync({
        id: parseInt(id),
        quantidade,
        visao: contagemFilter,
      });
    }

    setContagens({});
  };

  const toggleItemAtivo = (id: number, ativo: boolean) => {
    updateInsumoMutation.mutate({ id, ativo: !ativo });
  };

  const toggleContagemDiaria = (id: number, contagemDiaria: boolean) => {
    updateInsumoMutation.mutate({ id, contagemDiaria: !contagemDiaria });
  };

  // Filtrar itens
  const filteredItems = insumos.filter(item => {
    // Filtro de categoria
    const matchesCategory = categoryFilter ? item.categoria === categoryFilter : true;
    
    // Filtro de tipo de contagem (apenas para operacional)
    let matchesContagem = true;
    if (isOperacional) {
      if (contagemFilter === 'critico') {
        matchesContagem = item.status === 'Crítico' || item.status === 'Baixo';
      }
    }

    return matchesCategory && matchesContagem;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando estoque...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">
            {isOperacional ? "Contagem de Estoque" : "Estoque Geral"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isOperacional 
              ? "Insira a quantidade física atual de cada item." 
              : "Gerenciamento completo de todos os insumos cadastrados."}
          </p>
        </div>
        <div className="flex gap-2">
          {!isOperacional && (
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus size={16} />
              Novo Insumo
            </Button>
          )}
          {isOperacional ? (
            <Button 
              className="gap-2" 
              onClick={handleSalvarContagem}
              disabled={updateEstoqueMutation.isPending}
            >
              {updateEstoqueMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Salvar Contagem
            </Button>
          ) : (
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Exportar
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filtros Laterais */}
        <Card className="industrial-card h-fit md:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isOperacional && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Tipo de Contagem</label>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant={contagemFilter === 'todos' ? "secondary" : "ghost"} 
                    className="justify-start"
                    onClick={() => setContagemFilter('todos')}
                  >
                    <ListFilter className="mr-2 h-4 w-4" />
                    Todos os Itens
                  </Button>
                  <Button 
                    variant={contagemFilter === 'critico' ? "secondary" : "ghost"} 
                    className="justify-start text-amber-600 hover:text-amber-700"
                    onClick={() => setContagemFilter('critico')}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Estoque Baixo
                  </Button>
                  <Button 
                    variant={contagemFilter === 'geral' ? "secondary" : "ghost"} 
                    className="justify-start"
                    onClick={() => setContagemFilter('geral')}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Estoque Geral
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Categorias</label>
              <div className="flex flex-col gap-1">
                <Button 
                  variant={categoryFilter === null ? "secondary" : "ghost"} 
                  className="w-full justify-start font-normal"
                  onClick={() => setCategoryFilter(null)}
                >
                  Todas as categorias
                  <span className="ml-auto text-xs text-muted-foreground">{insumos.length}</span>
                </Button>
                {categories.map(cat => (
                  <Button 
                    key={cat}
                    variant={categoryFilter === cat ? "secondary" : "ghost"} 
                    className="w-full justify-start font-normal"
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {insumos.filter(i => i.categoria === cat).length}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela Principal */}
        <Card className="industrial-card md:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nome ou código..."
                  className="pl-9 bg-secondary/50 border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{filteredItems.length} itens encontrados</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    {!isOperacional && <TableHead className="w-[80px] font-bold">Código</TableHead>}
                    <TableHead className="font-bold">Produto</TableHead>
                    <TableHead className="font-bold">Categoria</TableHead>
                    
                    {isOperacional ? (
                      <>
                        <TableHead className="text-right font-bold w-[150px]">Contagem Atual</TableHead>
                        <TableHead className="text-left font-bold w-[80px]">Unid.</TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead className="text-right font-bold">Estoque</TableHead>
                        <TableHead className="text-right font-bold">Unid.</TableHead>
                        <TableHead className="text-right font-bold">Custo Unit.</TableHead>
                        <TableHead className="text-center font-bold">Status</TableHead>
                        <TableHead className="text-center font-bold">Ativo</TableHead>
                        <TableHead className="text-center font-bold">Contagem Diária</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-secondary/30 transition-colors group">
                        {!isOperacional && (
                          <TableCell className="font-mono text-xs text-muted-foreground">{item.codigo}</TableCell>
                        )}
                        <TableCell className="font-medium">
                          {item.nome}
                          {item.status === 'Crítico' && isOperacional && (
                            <Badge variant="destructive" className="ml-2 text-[10px] h-5 px-1">Crítico</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{item.categoria}</TableCell>
                        
                        {isOperacional ? (
                          <>
                            <TableCell className="text-right">
                              <Input 
                                type="number" 
                                className="h-8 w-24 ml-auto text-right font-mono"
                                placeholder="0"
                                value={contagens[item.id] || ""}
                                onChange={(e) => handleContagemChange(item.id, e.target.value)}
                              />
                            </TableCell>
                            <TableCell className="text-left text-muted-foreground text-sm">{item.unidade}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell className="text-right font-mono font-bold">
                              {item.estoqueAtual}
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground text-sm">{item.unidade}</TableCell>
                            <TableCell className="text-right font-mono text-sm">
                              R$ {parseFloat(item.custoUnitario).toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant="outline" 
                                className={
                                  item.status === 'Crítico' 
                                    ? 'bg-destructive/10 text-destructive border-destructive/30' 
                                    : item.status === 'Baixo'
                                    ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30'
                                    : 'bg-green-500/10 text-green-600 border-green-500/30'
                                }
                              >
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch 
                                checked={item.ativo}
                                onCheckedChange={() => toggleItemAtivo(item.id, item.ativo)}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch 
                                checked={item.contagemDiaria || false}
                                onCheckedChange={() => toggleContagemDiaria(item.id, item.contagemDiaria || false)}
                              />
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={isOperacional ? 4 : 9} className="h-24 text-center text-muted-foreground">
                        Nenhum item encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
