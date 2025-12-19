import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  TableRow 
} from "@/components/ui/table";
import { 
  ClipboardCheck, 
  Save, 
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RotateCcw,
  History,
  Calendar
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// Itens de contagem diária com seus estoques mínimos e códigos do banco
const ITENS_CONTAGEM_DIARIA = [
  { codigo: "84351897", nome: "Blend 150g", nomeDb: "(PR) Blend 150g", estoqueMinimo: 40, unidade: "un" },
  { codigo: "78910390", nome: "Blend 120g", nomeDb: "(PR) Blend 120g", estoqueMinimo: 40, unidade: "un" },
  { codigo: "34671701", nome: "Batata palito congelada", nomeDb: "(IN) Batata Pré-frita Congelada", estoqueMinimo: 8, unidade: "kg" },
  { codigo: "72358735", nome: "Manteiga", nomeDb: "(IN) Manteiga", estoqueMinimo: 1, unidade: "un" },
  { codigo: "51001027", nome: "Queijo coalho", nomeDb: "(IN) Queijo Coalho", estoqueMinimo: 1, unidade: "kg" },
  { codigo: "72854117", nome: "Queijo prato (fatias)", nomeDb: "(IN) Queijo prato FATIADO / 2kg 184fatias", estoqueMinimo: 120, unidade: "un" },
  { codigo: "75455846", nome: "Bacon fatiado cru", nomeDb: "(IN) BACON FATIADO", estoqueMinimo: 1, unidade: "kg" },
  { codigo: "10633048", nome: "Óleo (para fritura)", nomeDb: "(IN) Óleo de Soja/algodão P/ Fritura", estoqueMinimo: 10, unidade: "L" },
];

interface ContagemItem {
  codigo: string;
  nome: string;
  nomeDb: string;
  estoqueMinimo: number;
  unidade: string;
  estoqueAtual: string;
  status: "OK" | "Baixo" | "Crítico";
  insumoId?: number;
}

export default function ContagemDiaria() {
  const [contagens, setContagens] = useState<ContagemItem[]>(
    ITENS_CONTAGEM_DIARIA.map(item => ({
      ...item,
      estoqueAtual: "",
      status: "OK" as const
    }))
  );
  const [salvando, setSalvando] = useState(false);
  const [activeTab, setActiveTab] = useState("contagem");
  
  // Buscar insumos do banco para preencher valores atuais
  const { data: insumos = [], isLoading } = trpc.insumos.list.useQuery({});
  
  // Buscar histórico de contagens
  const { data: historico = [], isLoading: historicoLoading, refetch: refetchHistorico } = trpc.contagensDiarias.list.useQuery({});
  
  // Buscar resumo dos últimos 7 dias
  const { data: resumo = [] } = trpc.contagensDiarias.resumo.useQuery({ dias: 7 });
  
  // Mutation para atualizar insumo
  const updateInsumoMutation = trpc.insumos.update.useMutation();
  
  // Mutation para salvar contagem no histórico
  const saveContagemMutation = trpc.contagensDiarias.saveContagem.useMutation({
    onSuccess: () => {
      refetchHistorico();
    }
  });

  // Preencher valores atuais do banco quando carregar - usando código do insumo
  useEffect(() => {
    if (insumos.length > 0) {
      setContagens(prev => prev.map(item => {
        // Busca direta pelo código do insumo
        const insumoDb = insumos.find(i => i.codigo === item.codigo);
        
        if (insumoDb) {
          const estoqueAtual = parseFloat(insumoDb.estoqueAtual);
          const status = calcularStatus(estoqueAtual, item.estoqueMinimo);
          return {
            ...item,
            estoqueAtual: insumoDb.estoqueAtual,
            status,
            insumoId: insumoDb.id
          };
        }
        return item;
      }));
    }
  }, [insumos]);

  const calcularStatus = (atual: number, minimo: number): "OK" | "Baixo" | "Crítico" => {
    if (atual <= minimo * 0.5) return "Crítico";
    if (atual <= minimo) return "Baixo";
    return "OK";
  };

  const handleQuantidadeChange = (index: number, valor: string) => {
    setContagens(prev => {
      const updated = [...prev];
      const numValor = parseFloat(valor) || 0;
      updated[index] = {
        ...updated[index],
        estoqueAtual: valor,
        status: calcularStatus(numValor, updated[index].estoqueMinimo)
      };
      return updated;
    });
  };

  const handleSalvar = async () => {
    setSalvando(true);
    
    try {
      // Filtrar apenas itens com valor preenchido
      const itensPreenchidos = contagens.filter(c => c.estoqueAtual);
      
      if (itensPreenchidos.length === 0) {
        toast.error("Preencha pelo menos um item antes de salvar.");
        setSalvando(false);
        return;
      }

      // Salvar no histórico de contagens
      await saveContagemMutation.mutateAsync({
        itens: itensPreenchidos.map(item => ({
          itemNome: item.nome,
          estoqueMinimo: String(item.estoqueMinimo),
          estoqueContado: item.estoqueAtual,
          unidade: item.unidade,
          status: item.status,
        })),
        responsavel: "Equipe",
      });

      // Atualizar insumos no banco - usando código do insumo
      for (const item of itensPreenchidos) {
        // Busca direta pelo código
        const insumoDb = insumos.find(i => i.codigo === item.codigo);
        
        if (insumoDb) {
          await updateInsumoMutation.mutateAsync({
            id: Number(insumoDb.id),
            estoqueAtual: item.estoqueAtual,
            status: item.status
          });
        }
      }
      
      toast.success("Contagem salva com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar contagem: " + (error as Error).message);
    } finally {
      setSalvando(false);
    }
  };

  const handleLimpar = () => {
    setContagens(prev => prev.map(item => ({
      ...item,
      estoqueAtual: "",
      status: "OK" as const
    })));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Crítico":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Crítico
          </Badge>
        );
      case "Baixo":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Baixo
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            OK
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando...</span>
      </div>
    );
  }

  // Contar itens por status
  const criticos = contagens.filter(c => c.status === "Crítico" && c.estoqueAtual).length;
  const baixos = contagens.filter(c => c.status === "Baixo" && c.estoqueAtual).length;
  const ok = contagens.filter(c => c.status === "OK" && c.estoqueAtual).length;

  // Agrupar histórico por data
  const historicoAgrupado = historico.reduce((acc: any, item: any) => {
    const data = new Date(item.dataContagem).toLocaleDateString('pt-BR');
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Contagem de Estoque</h1>
          <p className="text-muted-foreground mt-1">Verificação diária de itens essenciais.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="contagem" className="gap-2">
            <ClipboardCheck size={16} />
            Nova Contagem
          </TabsTrigger>
          <TabsTrigger value="historico" className="gap-2">
            <History size={16} />
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contagem" className="space-y-6 mt-6">
          {/* Botões de ação */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleLimpar} className="gap-2">
              <RotateCcw size={16} />
              Limpar
            </Button>
            <Button onClick={handleSalvar} disabled={salvando} className="gap-2">
              {salvando ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Salvar Contagem
            </Button>
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="industrial-card border-l-4 border-l-destructive">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold font-mono text-destructive">{criticos}</div>
                <p className="text-xs text-muted-foreground">Críticos</p>
              </CardContent>
            </Card>
            <Card className="industrial-card border-l-4 border-l-warning">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold font-mono text-warning-foreground">{baixos}</div>
                <p className="text-xs text-muted-foreground">Baixos</p>
              </CardContent>
            </Card>
            <Card className="industrial-card border-l-4 border-l-success">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold font-mono text-success">{ok}</div>
                <p className="text-xs text-muted-foreground">OK</p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Itens */}
          <Card className="industrial-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Itens de Contagem Diária
              </CardTitle>
              <CardDescription>
                Preencha a quantidade atual de cada item. O sistema calculará automaticamente o status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contagens.map((item, index) => (
                  <div 
                    key={item.nome} 
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border transition-colors ${
                      item.status === "Crítico" ? "bg-destructive/5 border-destructive/30" :
                      item.status === "Baixo" ? "bg-warning/5 border-warning/30" :
                      "bg-secondary/30 border-border"
                    }`}
                  >
                    <div className="flex-1 mb-3 sm:mb-0">
                      <h3 className="font-medium text-foreground">{item.nome}</h3>
                      <p className="text-sm text-muted-foreground">
                        Estoque Mínimo: <span className="font-mono font-bold">{item.estoqueMinimo}</span> {item.unidade}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Qtd"
                          value={item.estoqueAtual}
                          onChange={(e) => handleQuantidadeChange(index, e.target.value)}
                          className="w-24 text-center font-mono bg-background"
                          min="0"
                          step={item.unidade === "un" || item.unidade === "fatias" ? "1" : "0.1"}
                        />
                        <span className="text-sm text-muted-foreground w-12">{item.unidade}</span>
                      </div>
                      
                      <div className="w-24">
                        {item.estoqueAtual ? getStatusBadge(item.status) : (
                          <span className="text-xs text-muted-foreground">Aguardando</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="space-y-6 mt-6">
          {/* Resumo dos últimos 7 dias */}
          {resumo.length > 0 && (
            <Card className="industrial-card">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Resumo dos Últimos 7 Dias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center text-destructive">Críticos</TableHead>
                        <TableHead className="text-center text-warning-foreground">Baixos</TableHead>
                        <TableHead className="text-center text-success">OK</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resumo.map((dia: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {new Date(dia.data + 'T00:00:00').toLocaleDateString('pt-BR', { 
                              weekday: 'short', 
                              day: '2-digit', 
                              month: '2-digit' 
                            })}
                          </TableCell>
                          <TableCell className="text-center font-mono">{dia.totalItens}</TableCell>
                          <TableCell className="text-center font-mono text-destructive">{dia.criticos}</TableCell>
                          <TableCell className="text-center font-mono text-warning-foreground">{dia.baixos}</TableCell>
                          <TableCell className="text-center font-mono text-success">{dia.ok}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Histórico detalhado */}
          <Card className="industrial-card">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Histórico de Contagens
              </CardTitle>
              <CardDescription>
                Todas as contagens registradas, agrupadas por data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {historicoLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Carregando histórico...</span>
                </div>
              ) : Object.keys(historicoAgrupado).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>Nenhuma contagem registrada ainda.</p>
                  <p className="text-sm">Faça sua primeira contagem na aba "Nova Contagem".</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(historicoAgrupado).map(([data, itens]: [string, any]) => (
                    <div key={data} className="border rounded-lg overflow-hidden">
                      <div className="bg-secondary/50 px-4 py-2 font-medium flex items-center gap-2">
                        <Calendar size={16} />
                        {data}
                        <Badge variant="outline" className="ml-auto">
                          {itens.length} itens
                        </Badge>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-right">Contado</TableHead>
                            <TableHead className="text-right">Mínimo</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {itens.map((item: any) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.itemNome}</TableCell>
                              <TableCell className="text-right font-mono">
                                {parseFloat(item.estoqueContado).toFixed(item.unidade === 'un' || item.unidade === 'fatias' ? 0 : 2)} {item.unidade}
                              </TableCell>
                              <TableCell className="text-right font-mono text-muted-foreground">
                                {parseFloat(item.estoqueMinimo).toFixed(item.unidade === 'un' || item.unidade === 'fatias' ? 0 : 2)} {item.unidade}
                              </TableCell>
                              <TableCell className="text-center">
                                {getStatusBadge(item.status)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
