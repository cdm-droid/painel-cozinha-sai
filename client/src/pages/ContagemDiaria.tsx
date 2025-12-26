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
  Calendar,
  Package
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface ContagemItem {
  id: number;
  codigo: string;
  nome: string;
  estoqueMinimo: number;
  unidade: string;
  estoqueAtual: string;
  novaContagem: string;
  status: "OK" | "Baixo" | "Crítico";
}

export default function ContagemDiaria() {
  const [contagens, setContagens] = useState<ContagemItem[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [activeTab, setActiveTab] = useState("contagem");
  
  // Buscar insumos marcados para contagem diária
  const { data: insumosContagemDiaria = [], isLoading, refetch } = trpc.insumos.list.useQuery({
    contagemDiaria: true
  });
  
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

  // Preencher itens quando carregar os insumos marcados para contagem diária
  useEffect(() => {
    if (insumosContagemDiaria.length > 0) {
      setContagens(insumosContagemDiaria.map(insumo => {
        const estoqueAtual = parseFloat(insumo.estoqueAtual);
        const estoqueMinimo = parseFloat(insumo.estoqueMinimo);
        const status = calcularStatus(estoqueAtual, estoqueMinimo);
        return {
          id: insumo.id,
          codigo: insumo.codigo,
          nome: insumo.nome,
          estoqueMinimo: estoqueMinimo,
          unidade: insumo.unidade,
          estoqueAtual: insumo.estoqueAtual,
          novaContagem: "",
          status
        };
      }));
    }
  }, [insumosContagemDiaria]);

  const calcularStatus = (atual: number, minimo: number): "OK" | "Baixo" | "Crítico" => {
    if (atual <= minimo / 2) return "Crítico";
    if (atual <= minimo) return "Baixo";
    return "OK";
  };

  const handleContagemChange = (id: number, value: string) => {
    setContagens(prev => prev.map(item => {
      if (item.id === id) {
        const novaQuantidade = parseFloat(value) || 0;
        return {
          ...item,
          novaContagem: value,
          status: calcularStatus(novaQuantidade, item.estoqueMinimo)
        };
      }
      return item;
    }));
  };

  const handleSalvar = async () => {
    const itensParaSalvar = contagens.filter(item => item.novaContagem !== "");
    
    if (itensParaSalvar.length === 0) {
      toast.warning("Preencha pelo menos um item antes de salvar.");
      return;
    }

    setSalvando(true);
    try {
      // Atualizar cada insumo no banco
      for (const item of itensParaSalvar) {
        await updateInsumoMutation.mutateAsync({
          id: item.id,
          estoqueAtual: item.novaContagem,
          status: calcularStatus(parseFloat(item.novaContagem), item.estoqueMinimo)
        });
      }

      // Salvar no histórico de contagens
      const itensHistorico = itensParaSalvar.map(item => ({
        itemNome: item.nome,
        estoqueContado: item.novaContagem,
        unidade: item.unidade,
        estoqueMinimo: item.estoqueMinimo.toString(),
        status: calcularStatus(parseFloat(item.novaContagem), item.estoqueMinimo)
      }));

      await saveContagemMutation.mutateAsync({
        responsavel: "Operador",
        itens: itensHistorico
      });

      toast.success(`Contagem salva com sucesso! ${itensParaSalvar.length} itens atualizados.`);
      
      // Recarregar dados
      refetch();
      
      // Limpar campos de nova contagem
      setContagens(prev => prev.map(item => ({ ...item, novaContagem: "" })));
      
    } catch (error) {
      toast.error("Erro ao salvar contagem: " + (error as Error).message);
    } finally {
      setSalvando(false);
    }
  };

  const handleLimpar = () => {
    setContagens(prev => prev.map(item => ({ ...item, novaContagem: "" })));
    toast.info("Campos limpos.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Crítico": return "bg-destructive/10 text-destructive border-destructive/30";
      case "Baixo": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
      default: return "bg-green-500/10 text-green-600 border-green-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Crítico": return <AlertTriangle className="h-4 w-4" />;
      case "Baixo": return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  // Calcular estatísticas
  const estatisticas = {
    total: contagens.length,
    criticos: contagens.filter(c => c.status === "Crítico").length,
    baixos: contagens.filter(c => c.status === "Baixo").length,
    ok: contagens.filter(c => c.status === "OK").length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando itens de contagem...</span>
      </div>
    );
  }

  if (contagens.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Estoque Sensível</h1>
          <p className="text-muted-foreground mt-1">Contagem diária de itens essenciais</p>
        </div>
        
        <Card className="industrial-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum item configurado</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Nenhum insumo está marcado para contagem diária. O gestor pode configurar quais itens 
              aparecem aqui através da coluna "Contagem Diária" na página de Insumos.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Estoque Sensível</h1>
          <p className="text-muted-foreground mt-1">Contagem diária de itens essenciais</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLimpar} className="gap-2">
            <RotateCcw size={16} />
            Limpar
          </Button>
          <Button 
            onClick={handleSalvar} 
            disabled={salvando}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {salvando ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Salvar Contagem
          </Button>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="industrial-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Itens</p>
                <p className="text-2xl font-bold">{estatisticas.total}</p>
              </div>
              <ClipboardCheck className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="industrial-card border-destructive/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-destructive uppercase tracking-wider">Críticos</p>
                <p className="text-2xl font-bold text-destructive">{estatisticas.criticos}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="industrial-card border-yellow-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-yellow-600 uppercase tracking-wider">Baixos</p>
                <p className="text-2xl font-bold text-yellow-600">{estatisticas.baixos}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="industrial-card border-green-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-green-600 uppercase tracking-wider">OK</p>
                <p className="text-2xl font-bold text-green-600">{estatisticas.ok}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="contagem" className="gap-2">
            <ClipboardCheck size={16} />
            Nova Contagem
          </TabsTrigger>
          <TabsTrigger value="historico" className="gap-2">
            <History size={16} />
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contagem">
          <Card className="industrial-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Itens de Contagem Diária
              </CardTitle>
              <CardDescription>
                Preencha a quantidade atual de cada item. Itens configurados pelo gestor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader className="bg-secondary/50">
                    <TableRow>
                      <TableHead className="font-bold">Item</TableHead>
                      <TableHead className="text-center font-bold w-[100px]">Estoque Atual</TableHead>
                      <TableHead className="text-center font-bold w-[120px]">Nova Contagem</TableHead>
                      <TableHead className="text-center font-bold w-[80px]">Unid.</TableHead>
                      <TableHead className="text-center font-bold w-[80px]">Mínimo</TableHead>
                      <TableHead className="text-center font-bold w-[100px]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contagens.map((item) => (
                      <TableRow key={item.id} className="hover:bg-secondary/30">
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell className="text-center font-mono text-muted-foreground">
                          {item.estoqueAtual}
                        </TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            className="h-8 w-24 mx-auto text-center font-mono"
                            placeholder="0"
                            value={item.novaContagem}
                            onChange={(e) => handleContagemChange(item.id, e.target.value)}
                          />
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground text-sm">
                          {item.unidade}
                        </TableCell>
                        <TableCell className="text-center font-mono text-sm">
                          {item.estoqueMinimo}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={getStatusColor(item.status)}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1">{item.status}</span>
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resumo dos últimos 7 dias */}
            <Card className="industrial-card lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  Últimos 7 Dias
                </CardTitle>
              </CardHeader>
              <CardContent>
                {resumo.length > 0 ? (
                  <div className="space-y-3">
                    {resumo.map((dia: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <span className="text-sm font-medium">
                          {new Date(dia.data).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                        </span>
                        <div className="flex gap-2">
                          {dia.criticos > 0 && (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-xs">
                              {dia.criticos} crítico{dia.criticos > 1 ? 's' : ''}
                            </Badge>
                          )}
                          {dia.baixos > 0 && (
                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30 text-xs">
                              {dia.baixos} baixo{dia.baixos > 1 ? 's' : ''}
                            </Badge>
                          )}
                          {dia.ok > 0 && (
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30 text-xs">
                              {dia.ok} OK
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    Nenhuma contagem registrada nos últimos 7 dias.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Histórico completo */}
            <Card className="industrial-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <History className="h-5 w-5 text-primary" />
                  Histórico de Contagens
                </CardTitle>
              </CardHeader>
              <CardContent>
                {historicoLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : historico.length > 0 ? (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {historico.slice(0, 10).map((contagem: any) => (
                      <div key={contagem.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              {new Date(contagem.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              às {new Date(contagem.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            por {contagem.responsavel}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div className="text-center p-2 bg-secondary/30 rounded">
                            <p className="text-xs text-muted-foreground">Total</p>
                            <p className="font-bold">{contagem.totalItens}</p>
                          </div>
                          <div className="text-center p-2 bg-destructive/10 rounded">
                            <p className="text-xs text-destructive">Críticos</p>
                            <p className="font-bold text-destructive">{contagem.itensCriticos}</p>
                          </div>
                          <div className="text-center p-2 bg-yellow-500/10 rounded">
                            <p className="text-xs text-yellow-600">Baixos</p>
                            <p className="font-bold text-yellow-600">{contagem.itensBaixos}</p>
                          </div>
                          <div className="text-center p-2 bg-green-500/10 rounded">
                            <p className="text-xs text-green-600">OK</p>
                            <p className="font-bold text-green-600">{contagem.itensOk}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm text-center py-8">
                    Nenhuma contagem registrada ainda.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
