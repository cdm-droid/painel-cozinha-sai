import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  RefreshCw, 
  Link as LinkIcon, 
  AlertCircle, 
  CheckCircle2, 
  Search,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Integracoes() {
  const [sincronizando, setSincronizando] = useState(false);
  const [filtro, setFiltro] = useState("");

  const utils = trpc.useContext();

  // Buscar produtos que vieram do Anota Aí mas ainda não têm vínculo
  const { data: produtosPendentes = [], isLoading } = trpc.integracoes.listarProdutosSemVinculo.useQuery();
  
  // Buscar suas fichas técnicas para preencher o dropdown
  const { data: fichas = [] } = trpc.fichasTecnicas.list.useQuery();

  // Ação de Sincronizar (Chama o backend)
  const syncMutation = trpc.integracoes.sincronizarAnotaAi.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      utils.integracoes.listarProdutosSemVinculo.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro na sincronização: ${error.message}`);
    },
    onSettled: () => setSincronizando(false)
  });

  // Ação de Vincular (Salva o relacionamento)
  const vincularMutation = trpc.integracoes.vincularProduto.useMutation({
    onSuccess: () => {
      toast.success("Produto vinculado com sucesso!");
      utils.integracoes.listarProdutosSemVinculo.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro ao vincular: ${error.message}`);
    }
  });

  const handleSync = () => {
    setSincronizando(true);
    // Envia vazio para pegar a data de hoje, ou você pode implementar um datepicker depois
    syncMutation.mutate({}); 
  };

  const handleVincular = (mapaId: number, fichaId: string) => {
    vincularMutation.mutate({
      mapaId,
      fichaTecnicaId: parseInt(fichaId)
    });
  };

  // Filtro visual da lista
  const produtosFiltrados = produtosPendentes.filter(p => 
    p.externalProdutoNome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Integrações</h1>
          <p className="text-sm text-gray-500">Gerencie a conexão com Anota Aí e Delivery</p>
        </div>
        <Button 
          onClick={handleSync} 
          disabled={sincronizando}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${sincronizando ? 'animate-spin' : ''}`} />
          {sincronizando ? 'Sincronizando...' : 'Sincronizar Vendas'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Painel Lateral de Status */}
        <Card className="lg:col-span-1 bg-white border-gray-100 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-400">Status da Integração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {/* Ícone Genérico ou Logo */}
                  <LinkIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">Anota Aí</p>
                  <p className="text-[10px] text-gray-400 font-medium">API Conectada</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </div>
            </div>
            
            <div className="p-4 border border-amber-100 bg-amber-50/50 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-800">Atenção Necessária</h4>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                    Existem <span className="font-black">{produtosPendentes.length} produtos</span> importados que ainda não foram vinculados às suas Fichas Técnicas.
                  </p>
                  <p className="text-[10px] text-amber-600/70 mt-2 font-medium">
                    O cálculo de CMV e baixa de estoque só funcionará para itens vinculados.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista Principal de Vínculos */}
        <Card className="lg:col-span-2 border-gray-100 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-4">
            <div>
              <CardTitle className="text-lg font-bold text-gray-800">Mapeamento de Produtos</CardTitle>
              <p className="text-xs text-gray-400 mt-1">Vincule o nome do app ao nome interno</p>
            </div>
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar produto externo..." 
                className="pl-9 bg-gray-50 border-gray-200" 
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="py-12 text-center text-gray-400 animate-pulse">Carregando dados...</div>
            ) : produtosPendentes.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <p className="text-gray-800 font-bold text-lg">Tudo organizado!</p>
                <p className="text-sm text-gray-400 mt-1">Todos os produtos importados já estão vinculados.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {produtosFiltrados.map((item) => (
                  <div key={item.id} className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50/80 hover:border-gray-200 transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge variant="outline" className="text-[9px] h-5 bg-white text-gray-400 border-gray-200">
                          #{item.externalProdutoId || 'N/A'}
                        </Badge>
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
                          Anota Aí
                        </span>
                      </div>
                      <p className="font-bold text-gray-800 text-sm">{item.externalProdutoNome}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 bg-white p-1 rounded-lg border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow w-full sm:w-auto">
                      <ArrowRight className="h-4 w-4 text-gray-300 hidden sm:block ml-2" />
                      
                      <div className="w-full sm:w-72">
                        <Select onValueChange={(val) => handleVincular(item.id, val)}>
                          <SelectTrigger className="border-0 bg-transparent focus:ring-0 h-9">
                            <SelectValue placeholder="Selecione a Ficha Técnica..." />
                          </SelectTrigger>
                          <SelectContent>
                            {fichas.map(ficha => (
                              <SelectItem key={ficha.id} value={String(ficha.id)}>
                                {ficha.produto}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
