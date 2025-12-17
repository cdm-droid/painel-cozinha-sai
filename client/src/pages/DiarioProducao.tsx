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
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Save, 
  Trash2,
  Calculator,
  ChefHat,
  ArrowRight,
  Package,
  Clock,
  CheckCircle2,
  Utensils
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
import { fichasTecnicas, FichaTecnica } from "@/lib/mock-data";
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
  const [date, setDate] = useState<Date>(new Date());
  const [producoes, setProducoes] = useState<ProducaoItem[]>([
    { id: "1", produto: "(IT) BROWNIE C", quantidade: 24, unidade: "fatias", responsavel: "João", hora: "09:00", status: "Concluído" },
    { id: "2", produto: "(IT) PANACOTA", quantidade: 15, unidade: "porções", responsavel: "Maria", hora: "10:30", status: "Em Produção" },
  ]);

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

  const handleAddProducao = () => {
    if (!novoProduto || !novaQuantidade || !novoResponsavel) {
      toast.error("Preencha todos os campos para adicionar uma produção.");
      return;
    }

    const ficha = fichasTecnicas.find(f => f.produto === novoProduto);
    const unidade = ficha ? ficha.unidadeRendimento : "un";

    const novaProducao: ProducaoItem = {
      id: Date.now().toString(),
      produto: novoProduto,
      quantidade: Number(novaQuantidade),
      unidade: unidade,
      responsavel: novoResponsavel,
      status: "Planejado",
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setProducoes([...producoes, novaProducao]);
    setNovoProduto("");
    setNovaQuantidade("");
    setNovoResponsavel("");
    toast.success("Produção adicionada ao diário.");
  };

  const handleStatusChange = (id: string, newStatus: ProducaoItem['status']) => {
    setProducoes(producoes.map(p => p.id === id ? { ...p, status: newStatus } : p));
    toast.success(`Status atualizado para ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    setProducoes(producoes.filter(p => p.id !== id));
    toast.success("Item removido.");
  };

  const fatorMultiplicacao = selectedFicha ? qtdAlmejada / selectedFicha.rendimentoBase : 1;

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
                      {fichasTecnicas.map(ficha => (
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
                <Button className="w-full" onClick={handleAddProducao}>Confirmar</Button>
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
                    {producoes.map((item) => (
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
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
                      const ficha = fichasTecnicas.find(f => f.id === e.target.value);
                      if (ficha) handleCalculate(ficha);
                    }}
                    value={selectedFicha?.id || ""}
                  >
                    <option value="" disabled>Selecione um produto...</option>
                    {fichasTecnicas.map(ficha => (
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
                            {selectedFicha.componentes.map((comp, idx) => (
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
