import { useState, useMemo } from "react";
import { Calculator, ChefHat, Scale, RefreshCcw, ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";

export default function Calculadora() {
  const [selectedFicha, setSelectedFicha] = useState<string>("");
  const [multiplicador, setMultiplicador] = useState<number>(1);
  const [resultado, setResultado] = useState<any>(null);

  const { data: fichas = [], isLoading } = trpc.fichasTecnicas.list.useQuery();

  const fichaAtual = useMemo(() => {
    if (!selectedFicha) return null;
    return fichas.find(f => f.id.toString() === selectedFicha);
  }, [selectedFicha, fichas]);

  const calcular = () => {
    if (!fichaAtual) return;
    
    // Usar componentes da ficha técnica
    const ingredientes: any[] = fichaAtual.componentes || [];

    const ingredientesEscalonados = ingredientes.map((ing: any) => ({
      ...ing,
      quantidadeOriginal: ing.quantidade,
      quantidadeEscalonada: (parseFloat(ing.quantidade) * multiplicador).toFixed(3),
      custoEscalonado: (parseFloat(ing.custoTotal || 0) * multiplicador).toFixed(2)
    }));

    const custoTotal = ingredientesEscalonados.reduce((acc: number, ing: any) => 
      acc + parseFloat(ing.custoEscalonado || 0), 0
    );

    setResultado({
      ficha: fichaAtual,
      multiplicador,
      ingredientes: ingredientesEscalonados,
      custoTotal: custoTotal.toFixed(2),
      rendimentoFinal: multiplicador * parseFloat(fichaAtual.rendimento || '1')
    });
  };

  const limpar = () => {
    setSelectedFicha("");
    setMultiplicador(1);
    setResultado(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Ferramenta de Apoio</h2>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-tight text-[#1A1A1A]">
            Calculadora Saî
          </h1>
          <p className="text-sm text-gray-500 mt-1">Escalone preparos com base nas fichas técnicas cadastradas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Painel de Entrada */}
        <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-black uppercase tracking-tight">
              <Calculator className="w-5 h-5 text-primary" />
              Configurar Cálculo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Selecionar Ficha Técnica
              </Label>
              <Select value={selectedFicha} onValueChange={setSelectedFicha}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:ring-primary/20">
                  <SelectValue placeholder="Escolha uma ficha técnica..." />
                </SelectTrigger>
                <SelectContent>
                  {fichas.map((ficha) => (
                    <SelectItem key={ficha.id} value={ficha.id.toString()}>
                      {ficha.produto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Multiplicador (Quantidade de Lotes)
              </Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-12 w-12 rounded-xl"
                  onClick={() => setMultiplicador(Math.max(0.5, multiplicador - 0.5))}
                >
                  -
                </Button>
                <Input 
                  type="number" 
                  value={multiplicador}
                  onChange={(e) => setMultiplicador(parseFloat(e.target.value) || 1)}
                  className="h-12 text-center text-2xl font-black rounded-xl border-gray-200"
                  step={0.5}
                  min={0.5}
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-12 w-12 rounded-xl"
                  onClick={() => setMultiplicador(multiplicador + 0.5)}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                Use 0.5 para meio lote, 2 para dobrar a receita, etc.
              </p>
            </div>

            {fichaAtual && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ficha Selecionada</p>
                <p className="font-bold text-gray-800">{fichaAtual.produto}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-500">
                    Rendimento base: <strong>{fichaAtual.rendimento || 1} {'un'}</strong>
                  </span>
                  <span className="text-gray-500">
                    Custo base: <strong>R$ {parseFloat(fichaAtual.custoTotal || '0').toFixed(2)}</strong>
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={calcular}
                disabled={!selectedFicha}
                className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 font-black uppercase tracking-widest"
              >
                <Scale className="w-4 h-4 mr-2" />
                Calcular
              </Button>
              <Button 
                variant="outline"
                onClick={limpar}
                className="h-12 rounded-xl"
              >
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Painel de Resultado */}
        <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-black uppercase tracking-tight">
              <ChefHat className="w-5 h-5 text-amber-500" />
              Resultado do Escalonamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            {resultado ? (
              <div className="space-y-4">
                {/* Resumo */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Rendimento Final</p>
                    <p className="text-2xl font-black text-gray-800">
                      {resultado.rendimentoFinal} <span className="text-sm font-medium text-gray-400">{'un'}</span>
                    </p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Custo Total</p>
                    <p className="text-2xl font-black text-gray-800">
                      R$ {resultado.custoTotal}
                    </p>
                  </div>
                </div>

                {/* Lista de Ingredientes */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Ingredientes Escalonados ({resultado.multiplicador}x)
                  </p>
                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <div className="max-h-[300px] overflow-y-auto">
                      {resultado.ingredientes.length > 0 ? (
                        resultado.ingredientes.map((ing: any, idx: number) => (
                          <div 
                            key={idx} 
                            className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-white transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Check className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-bold text-sm text-gray-800">{ing.nome || ing.insumo}</p>
                                <p className="text-xs text-gray-400">
                                  {ing.quantidadeOriginal} <ArrowRight className="inline w-3 h-3" /> {ing.quantidadeEscalonada} {ing.unidade}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-mono font-bold text-emerald-600">R$ {ing.custoEscalonado}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-gray-400">
                          <p className="text-sm">Nenhum ingrediente cadastrado nesta ficha</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[300px] flex flex-col items-center justify-center text-center text-gray-400">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <Scale className="w-8 h-8" />
                </div>
                <p className="font-bold">Selecione uma ficha e calcule</p>
                <p className="text-sm">O resultado aparecerá aqui</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
