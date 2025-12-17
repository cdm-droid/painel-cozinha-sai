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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar,
  Clock,
  Plus,
  Save,
  Trash2,
  ChefHat,
  CheckCircle2
} from "lucide-react";
import { fichasTecnicas } from "@/lib/mock-data";
import { toast } from "sonner";

interface ProducaoItem {
  id: string;
  produto: string;
  quantidade: number;
  responsavel: string;
  status: 'Planejado' | 'Em Produção' | 'Concluído';
  horaInicio: string;
}

export default function DiarioProducao() {
  const [producoes, setProducoes] = useState<ProducaoItem[]>([
    { id: "1", produto: "(IT) BROWNIE C", quantidade: 10, responsavel: "João", status: "Concluído", horaInicio: "08:00" },
    { id: "2", produto: "(IT) PANACOTA", quantidade: 5, responsavel: "Maria", status: "Em Produção", horaInicio: "10:30" },
  ]);

  const [novoProduto, setNovoProduto] = useState("");
  const [novaQuantidade, setNovaQuantidade] = useState("");
  const [novoResponsavel, setNovoResponsavel] = useState("");

  const handleAddProducao = () => {
    if (!novoProduto || !novaQuantidade || !novoResponsavel) {
      toast.error("Preencha todos os campos para adicionar uma produção.");
      return;
    }

    const novaProducao: ProducaoItem = {
      id: Date.now().toString(),
      produto: novoProduto,
      quantidade: Number(novaQuantidade),
      responsavel: novoResponsavel,
      status: "Planejado",
      horaInicio: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setProducoes([...producoes, novaProducao]);
    setNovoProduto("");
    setNovaQuantidade("");
    setNovoResponsavel("");
    toast.success("Produção adicionada ao diário.");
  };

  const handleDelete = (id: string) => {
    setProducoes(producoes.filter(p => p.id !== id));
    toast.success("Item removido.");
  };

  const handleStatusChange = (id: string, newStatus: ProducaoItem['status']) => {
    setProducoes(producoes.map(p => p.id === id ? { ...p, status: newStatus } : p));
    toast.success(`Status atualizado para ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Diário de Produção</h1>
          <p className="text-muted-foreground mt-1">Registro e controle das atividades diárias da cozinha.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-md shadow-sm">
          <Calendar className="text-primary h-4 w-4" />
          <span className="font-mono font-bold text-sm">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Nova Produção */}
        <Card className="industrial-card h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Nova Produção
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <Button className="w-full mt-2" onClick={handleAddProducao}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar ao Diário
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Produções do Dia */}
        <Card className="industrial-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-muted-foreground" />
              Produções do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    <TableHead className="font-bold">Produto</TableHead>
                    <TableHead className="text-center font-bold">Qtd</TableHead>
                    <TableHead className="font-bold">Responsável</TableHead>
                    <TableHead className="font-bold">Início</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="text-right font-bold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {producoes.length > 0 ? (
                    producoes.map((item) => (
                      <TableRow key={item.id} className="hover:bg-secondary/30 transition-colors">
                        <TableCell className="font-medium">{item.produto}</TableCell>
                        <TableCell className="text-center font-mono font-bold">{item.quantidade}</TableCell>
                        <TableCell className="text-muted-foreground">{item.responsavel}</TableCell>
                        <TableCell className="text-muted-foreground text-xs font-mono">
                          <div className="flex items-center gap-1">
                            <Clock size={12} /> {item.horaInicio}
                          </div>
                        </TableCell>
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
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        Nenhuma produção registrada hoje.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="gap-2">
                <Save size={16} />
                Salvar Diário e Atualizar Estoque
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
