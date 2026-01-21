import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Search, 
  Package, 
  AlertTriangle,
  PlusCircle, // Ícone novo
  Truck // Ícone novo
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Label } from "@/components/ui/label"; // Certifique-se de ter este componente

export default function EstoqueGestor() {
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para o Modal de Entrada
  const [isEntradaOpen, setIsEntradaOpen] = useState(false);
  const [selectedInsumo, setSelectedInsumo] = useState<string>("");
  const [qtdEntrada, setQtdEntrada] = useState("");
  const [custoEntrada, setCustoEntrada] = useState("");
  const [fornecedor, setFornecedor] = useState("");

  const utils = trpc.useContext();
  const { data: insumos = [], isLoading } = trpc.insumos.list.useQuery({});

  const entradaMutation = trpc.insumos.registrarEntrada.useMutation({
    onSuccess: () => {
      toast.success("Entrada registrada com sucesso!");
      utils.insumos.list.invalidate(); // Atualiza a lista
      setIsEntradaOpen(false);
      // Limpar form
      setQtdEntrada("");
      setCustoEntrada("");
      setFornecedor("");
      setSelectedInsumo("");
    },
    onError: (err) => toast.error(`Erro: ${err.message}`)
  });

  const handleRegistrarEntrada = () => {
    if (!selectedInsumo || !qtdEntrada) return;
    entradaMutation.mutate({
      insumoId: parseInt(selectedInsumo),
      quantidade: qtdEntrada,
      custoTotal: custoEntrada,
      fornecedor: fornecedor,
      observacao: "Entrada via Painel Gestor"
    });
  };

  const filteredInsumos = insumos.filter(item =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Estoque</h1>
          <p className="text-muted-foreground text-sm">Monitore níveis e registre entradas</p>
        </div>
        
        {/* BOTÃO NOVO DE ENTRADA */}
        <Dialog open={isEntradaOpen} onOpenChange={setIsEntradaOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              <Truck size={18} />
              Registrar Entrada (Compra)
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Entrada de Mercadoria</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Insumo</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedInsumo}
                  onChange={(e) => setSelectedInsumo(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {insumos.map(i => (
                    <option key={i.id} value={i.id}>{i.nome} ({i.unidade})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Quantidade</Label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={qtdEntrada}
                    onChange={e => setQtdEntrada(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Custo Total (R$)</Label>
                  <Input 
                    type="number" 
                    placeholder="Opcional" 
                    value={custoEntrada}
                    onChange={e => setCustoEntrada(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fornecedor / Nota</Label>
                <Input 
                  placeholder="Ex: Atacadão, NF 123" 
                  value={fornecedor}
                  onChange={e => setFornecedor(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEntradaOpen(false)}>Cancelar</Button>
              <Button onClick={handleRegistrarEntrada} disabled={entradaMutation.isLoading}>
                {entradaMutation.isLoading ? "Salvando..." : "Confirmar Entrada"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Insumos (Existente) */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Inventário Atual</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar insumo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Estoque Atual</TableHead>
                <TableHead className="text-right">Mínimo</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInsumos.map((insumo) => (
                <TableRow key={insumo.id}>
                  <TableCell className="font-medium">{insumo.nome}</TableCell>
                  <TableCell>{insumo.categoria}</TableCell>
                  <TableCell className="text-right font-mono">
                    {parseFloat(insumo.estoqueAtual).toFixed(2)} {insumo.unidade}
                  </TableCell>
                  <TableCell className="text-right font-mono text-gray-500">
                    {parseFloat(insumo.estoqueMinimo).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {parseFloat(insumo.estoqueAtual) <= parseFloat(insumo.estoqueMinimo) ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle size={10} /> Baixo
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        OK
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
