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
import { Textarea } from "@/components/ui/textarea";
import { 
  Trash2, 
  AlertOctagon, 
  Save,
  Loader2
} from "lucide-react";
import { useData } from "@/lib/storage";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Perdas() {
  const { insumos, isLoading: insumosLoading } = useData();
  
  // Buscar perdas do backend
  const { data: perdasData = [], isLoading: perdasLoading, refetch: refetchPerdas } = trpc.perdas.list.useQuery({});
  
  // Mutation para criar perda
  const createPerdaMutation = trpc.perdas.create.useMutation({
    onSuccess: () => {
      refetchPerdas();
      toast.success("Registro de perda adicionado.");
    },
    onError: (error) => {
      toast.error("Erro ao registrar perda: " + error.message);
    }
  });

  const [novoInsumoId, setNovoInsumoId] = useState("");
  const [novaQuantidade, setNovaQuantidade] = useState("");
  const [novoMotivo, setNovoMotivo] = useState("");
  const [novaObservacao, setNovaObservacao] = useState("");

  const handleAddPerda = async () => {
    if (!novoInsumoId || !novaQuantidade || !novoMotivo) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }

    try {
      await createPerdaMutation.mutateAsync({
        insumoId: parseInt(novoInsumoId),
        quantidade: novaQuantidade,
        motivo: novoMotivo,
        observacao: novaObservacao || undefined,
      });

      setNovoInsumoId("");
      setNovaQuantidade("");
      setNovoMotivo("");
      setNovaObservacao("");
    } catch (error) {
      console.error("Erro ao registrar perda:", error);
    }
  };

  // Converter dados do backend para exibição
  const perdas = perdasData.map((perda: any) => {
    const insumo = insumos.find(i => i.id === String(perda.insumoId));
    return {
      id: String(perda.id),
      insumo: insumo?.nome || `Insumo #${perda.insumoId}`,
      quantidade: parseFloat(perda.quantidade) || 0,
      unidade: insumo?.unidade || "Un",
      motivo: perda.motivo,
      observacao: perda.observacao || "",
      data: perda.createdAt ? new Date(perda.createdAt).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR'),
      responsavel: "Equipe Cozinha",
      custoPerda: parseFloat(perda.custoPerda) || 0,
    };
  });

  const isLoading = insumosLoading || perdasLoading;

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
          <h1 className="text-3xl font-bold text-foreground font-display">Registro de Perdas</h1>
          <p className="text-muted-foreground mt-1">Controle de desperdícios e quebras de estoque.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário */}
        <Card className="industrial-card h-fit border-l-4 border-l-destructive">
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2 text-destructive">
              <AlertOctagon className="h-5 w-5" />
              Registrar Perda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Insumo</label>
              <Select value={novoInsumoId} onValueChange={setNovoInsumoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o item" />
                </SelectTrigger>
                <SelectContent>
                  {insumos.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.nome}
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
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Motivo</label>
                <Select value={novoMotivo} onValueChange={setNovoMotivo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Validade">Validade Vencida</SelectItem>
                    <SelectItem value="Qualidade">Má Qualidade</SelectItem>
                    <SelectItem value="Manipulação">Erro Manipulação</SelectItem>
                    <SelectItem value="Armazenamento">Erro Armazenamento</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Observação</label>
              <Textarea 
                placeholder="Detalhes adicionais..." 
                className="resize-none"
                value={novaObservacao}
                onChange={(e) => setNovaObservacao(e.target.value)}
              />
            </div>

            <Button 
              variant="destructive" 
              className="w-full mt-2" 
              onClick={handleAddPerda}
              disabled={createPerdaMutation.isPending}
            >
              {createPerdaMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Registrar Perda
            </Button>
          </CardContent>
        </Card>

        {/* Histórico */}
        <Card className="industrial-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-display">Histórico Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    <TableHead className="font-bold">Data</TableHead>
                    <TableHead className="font-bold">Insumo</TableHead>
                    <TableHead className="text-right font-bold">Qtd</TableHead>
                    <TableHead className="font-bold">Motivo</TableHead>
                    <TableHead className="text-right font-bold">Custo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perdas.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Nenhuma perda registrada ainda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    perdas.map((item) => (
                      <TableRow key={item.id} className="hover:bg-secondary/30 transition-colors">
                        <TableCell className="text-xs font-mono text-muted-foreground">{item.data}</TableCell>
                        <TableCell className="font-medium">
                          {item.insumo}
                          {item.observacao && (
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{item.observacao}</p>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-destructive">
                          -{item.quantidade} {item.unidade}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {item.motivo}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono text-destructive">
                          R$ {item.custoPerda.toFixed(2)}
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
    </div>
  );
}
