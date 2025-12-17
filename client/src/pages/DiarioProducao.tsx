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
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2,
  Calculator,
  ChefHat,
  Package,
  Utensils,
  Loader2
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useData, FichaTecnica } from "@/lib/storage";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface ProducaoItem {
  id: string;
  produto: string;
  quantidade: number;
  unidade: string;
  responsavel: string;
  hora: string;
  status: 'Planejado' | 'Em Produção' | 'Concluído';
}

export default function DiarioProducao() {
  const { user } = useAuth();
  const { fichas: fichasTecnicas, isLoading: fichasLoading } = useData();
  const [date, setDate] = useState<Date>(new Date());
  
  // Buscar produções do backend
  const { data: producoesData = [], isLoading: producoesLoading, refetch: refetchProducoes } = trpc.diarioProducao.list.useQuery({});
  
  // Mutations
  const createProducaoMutation = trpc.diarioProducao.create.useMutation({
    onSuccess: () => {
      refetchProducoes();
      toast.success("Produção adicionada ao diário.");
    },
    onError: (error) => {
      toast.error("Erro ao adicionar produção: " + error.message);
    }
  });

  const updateProducaoMutation = trpc.diarioProducao.update.useMutation({
    onSuccess: () => {
      refetchProducoes();
      toast.success("Status atualizado.");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar status: " + error.message);
    }
  });

  const deleteProducaoMutation = trpc.diarioProducao.delete.useMutation({
    onSuccess: () => {
      refetchProducoes();
      toast.success("Item removido.");
    },
    onError: (error) => {
      toast.error("Erro ao remover item: " + error.message);
    }
  });

  // Estados para a calculadora
  const [selectedFicha, setSelectedFicha] = useState<FichaTecnica | null>(null);
  const [qtdAlmejada, setQtdAlmejada] = useState<number>(0);

  // Estados para nova produção
  const [novoProduto, setNovoProduto] = useState("");
  const [novaQuantidade, setNovaQuantidade] = useState("");
  const [novoResponsavel, setNovoResponsavel] = useState("");

  const handleCalculate = (ficha: FichaTecnica) => {
    setSelectedFicha(ficha);
    setQtdAlmejada(ficha.rendimentoBase);
  };

  const handleAddProducao = async () => {
    if (!novoProduto || !novaQuantidade || !novoResponsavel) {
      toast.error("Preencha todos os campos para adicionar uma produção.");
      return;
    }

    const ficha = fichasTecnicas.find((f: FichaTecnica) => f.produto === novoProduto);
    
    try {
      await createProducaoMutation.mutateAsync({
        fichaTecnicaId: ficha ? parseInt(ficha.id) : 0,
        produto: novoProduto,
        quantidadeProduzida: novaQuantidade,
        responsavel: novoResponsavel,
        status: "Planejado",
      });

      setNovoProduto("");
      setNovaQuantidade("");
      setNovoResponsavel("");
    } catch (error) {
      console.error("Erro ao adicionar produção:", error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ProducaoItem['status']) => {
    try {
      await updateProducaoMutation.mutateAsync({
        id: parseInt(id),
        status: newStatus,
      });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProducaoMutation.mutateAsync({ id: parseInt(id) });
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  // Converter dados do backend para exibição
  const producoes: ProducaoItem[] = producoesData.map((p: any) => ({
    id: String(p.id),
    produto: p.produto,
    quantidade: parseFloat(p.quantidade) || 0,
    unidade: p.unidade || "un",
    responsavel: p.responsavel || "Equipe",
    hora: p.createdAt ? new Date(p.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : "--:--",
    status: p.status as ProducaoItem['status'],
  }));

  const fatorMultiplicacao = selectedFicha ? qtdAlmejada / selectedFicha.rendimentoBase : 1;

  const isLoading = fichasLoading || producoesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando dados...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Diário de Produção</h1>
          <p className="text-muted-foreground mt-1">Registro e planejamento da produção diária.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-md border border-border">
            <CalendarIcon size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">
              {date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                Nova Produção
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Produção</DialogTitle>
                <DialogDescription>Registre uma nova produção para o dia de hoje.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Produto</label>
                  <Select value={novoProduto} onValueChange={setNovoProduto}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {fichasTecnicas.map((ficha: FichaTecnica) => (
                        <SelectItem key={ficha.id} value={ficha.produto}>
                          {ficha.produto}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quantidade</label>
                    <Input 
                      type="number" 
                      placeholder="Qtd" 
                      value={novaQuantidade}
                      onChange={(e) => setNovaQuantidade(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Responsável</label>
                    <Input 
                      placeholder="Nome" 
                      value={novoResponsavel}
                      onChange={(e) => setNovoResponsavel(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleAddProducao}
                  disabled={createProducaoMutation.isPending}
                >
                  {createProducaoMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Confirmar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Produção */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="industrial-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" /> Produção do Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader className="bg-secondary/50">
                    <TableRow>
                      <TableHead>Hora</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-right">Qtd.</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {producoes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          Nenhuma produção registrada para hoje.
                        </TableCell>
                      </TableRow>
                    ) : (
                      producoes.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-mono text-sm text-muted-foreground">{item.hora}</TableCell>
                          <TableCell className="font-medium">{item.produto}</TableCell>
                          <TableCell className="text-right font-mono">
                            {item.quantidade} <span className="text-xs text-muted-foreground">{item.unidade}</span>
                          </TableCell>
                          <TableCell className="text-sm">{item.responsavel}</TableCell>
                          <TableCell>
                            <Select 
                              value={item.status} 
                              onValueChange={(val: any) => handleStatusChange(item.id, val)}
                            >
                              <SelectTrigger className={`h-8 w-[130px] border-0 
                                ${item.status === 'Concluído' ? 'bg-success/20 text-success-foreground font-bold' : 
                                  item.status === 'Em Produção' ? 'bg-primary/20 text-primary font-bold' : 
                                  'bg-secondary text-muted-foreground'}
                              `}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Planejado">Planejado</SelectItem>
                                <SelectItem value="Em Produção">Em Produção</SelectItem>
                                <SelectItem value="Concluído">Concluído</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDelete(item.id)}
                              disabled={deleteProducaoMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculadora de Receitas */}
        <div className="lg:col-span-1">
          <Card className="industrial-card h-full border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-lg font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                <Calculator className="h-5 w-5" /> Calculadora de Receita
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Selecione a Receita</label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onChange={(e) => {
                      const ficha = fichasTecnicas.find((f: FichaTecnica) => f.id === e.target.value);
                      if (ficha) handleCalculate(ficha);
                    }}
                    value={selectedFicha?.id || ""}
                  >
                    <option value="" disabled>Selecione um produto...</option>
                    {fichasTecnicas.map((ficha: FichaTecnica) => (
                      <option key={ficha.id} value={ficha.id}>{ficha.produto}</option>
                    ))}
                  </select>
                </div>

                {selectedFicha && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-end gap-4">
                      <div className="space-y-2 flex-1">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Quantidade Almejada</label>
                        <div className="relative">
                          <Input 
                            type="number" 
                            value={qtdAlmejada}
                            onChange={(e) => setQtdAlmejada(Number(e.target.value))}
                            className="font-mono text-lg font-bold pr-16"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">
                            {selectedFicha.unidadeRendimento}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-secondary/30 rounded-md border border-border flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fator de Multiplicação:</span>
                      <span className="font-mono font-bold text-primary">x{fatorMultiplicacao.toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2 mb-2">
                        <Package className="h-3 w-3" /> Insumos Necessários
                      </h4>
                      <div className="rounded-md border border-border overflow-hidden max-h-[300px] overflow-y-auto">
                        <Table>
                          <TableBody>
                            {selectedFicha.componentes.map((comp: { nome: string; quantidade: number; unidade: string }, idx: number) => (
                              <TableRow key={idx} className="text-xs hover:bg-secondary/20">
                                <TableCell className="font-medium py-2">{comp.nome}</TableCell>
                                <TableCell className="text-right font-mono font-bold py-2 text-primary">
                                  {(comp.quantidade * fatorMultiplicacao).toFixed(3)}
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground py-2 w-[40px]">{comp.unidade}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full gap-2">
                            <Utensils size={16} />
                            Ver Modo de Preparo
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{selectedFicha.produto}</DialogTitle>
                            <DialogDescription>Modo de preparo para a receita base.</DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 p-4 bg-secondary/10 rounded-lg border border-border text-sm leading-relaxed whitespace-pre-line">
                            {selectedFicha.modoPreparo || "Modo de preparo não cadastrado."}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}

                {!selectedFicha && (
                  <div className="h-40 flex flex-col items-center justify-center text-muted-foreground text-center p-4 border-2 border-dashed border-border rounded-lg">
                    <Calculator className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-sm">Selecione uma receita para calcular os ingredientes necessários.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
