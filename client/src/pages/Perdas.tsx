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
  Plus,
  Save
} from "lucide-react";
import { insumos } from "@/lib/mock-data";
import { toast } from "sonner";

interface PerdaItem {
  id: string;
  insumo: string;
  quantidade: number;
  unidade: string;
  motivo: string;
  observacao: string;
  data: string;
  responsavel: string;
}

export default function Perdas() {
  const [perdas, setPerdas] = useState<PerdaItem[]>([
    { 
      id: "1", 
      insumo: "(IN) Alface americano", 
      quantidade: 2, 
      unidade: "Un", 
      motivo: "Validade", 
      observacao: "Folhas murchas", 
      data: new Date().toLocaleDateString('pt-BR'),
      responsavel: "João"
    }
  ]);

  const [novoInsumoId, setNovoInsumoId] = useState("");
  const [novaQuantidade, setNovaQuantidade] = useState("");
  const [novoMotivo, setNovoMotivo] = useState("");
  const [novaObservacao, setNovaObservacao] = useState("");

  const handleAddPerda = () => {
    if (!novoInsumoId || !novaQuantidade || !novoMotivo) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }

    const insumoSelecionado = insumos.find(i => i.id === novoInsumoId);
    if (!insumoSelecionado) return;

    const novaPerda: PerdaItem = {
      id: Date.now().toString(),
      insumo: insumoSelecionado.nome,
      quantidade: Number(novaQuantidade),
      unidade: insumoSelecionado.unidade,
      motivo: novoMotivo,
      observacao: novaObservacao,
      data: new Date().toLocaleDateString('pt-BR'),
      responsavel: "Equipe Cozinha" // Pega do contexto de auth idealmente
    };

    setPerdas([novaPerda, ...perdas]);
    setNovoInsumoId("");
    setNovaQuantidade("");
    setNovoMotivo("");
    setNovaObservacao("");
    toast.success("Registro de perda adicionado.");
  };

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

            <Button variant="destructive" className="w-full mt-2" onClick={handleAddPerda}>
              <Save className="mr-2 h-4 w-4" /> Registrar Perda
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
                    <TableHead className="font-bold">Resp.</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perdas.map((item) => (
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
                      <TableCell className="text-sm text-muted-foreground">{item.responsavel}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 size={14} />
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
    </div>
  );
}
