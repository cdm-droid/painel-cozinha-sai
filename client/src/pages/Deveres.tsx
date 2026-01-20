import { useState, useEffect } from "react";
import { ListChecks, Check, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface Dever {
  id: number;
  titulo: string;
  descricao: string | null;
  categoria: string;
  secao: string;
  recorrencia: string;
  diaSemana: number | null;
  diaMes: number | null;
  dataEspecifica: Date | null;
  horario: string | null;
  ordem: number;
  ativo: boolean;
  createdAt: Date;
}

interface DeverConcluido {
  id: number;
  deverId: number;
  dataReferencia: Date;
  responsavel: string | null;
}

interface SecaoDever {
  titulo: string;
  deveres: (Dever & { concluido: boolean })[];
}

export default function Deveres() {
  const [expandedSection, setExpandedSection] = useState<string | null>("abertura");
  const [deveresConcluidosLocal, setDeveresConcluidosLocal] = useState<Set<number>>(new Set());
  
  const hoje = new Date().toISOString().split('T')[0];
  
  // Buscar deveres do banco de dados para a data de hoje
  const { data: deveresDB = [], isLoading } = trpc.deveres.listForDate.useQuery({
    data: hoje,
  }) as { data: Dever[], isLoading: boolean };
  
  // Buscar deveres concluídos do dia
  const { data: concluidosDB = [], refetch: refetchConcluidos } = trpc.deveres.listConcluidos.useQuery({
    data: hoje,
  }) as { data: DeverConcluido[], refetch: () => void };
  
  // Mutation para marcar dever como concluído
  const concluirDever = trpc.deveres.concluir.useMutation({
    onSuccess: () => {
      refetchConcluidos();
    },
    onError: () => {
      toast.error("Erro ao salvar conclusão");
    },
  });
  
  // Mutation para desmarcar dever
  const desfazerConclusao = trpc.deveres.desfazerConclusao.useMutation({
    onSuccess: () => {
      refetchConcluidos();
    },
    onError: () => {
      toast.error("Erro ao desfazer conclusão");
    },
  });
  
  // Sincronizar deveres concluídos do banco com o estado local
  useEffect(() => {
    const concluidos = new Set<number>();
    concluidosDB.forEach((c: DeverConcluido) => {
      concluidos.add(c.deverId);
    });
    setDeveresConcluidosLocal(concluidos);
  }, [concluidosDB]);
  
  // Agrupar deveres por seção
  const secoes: SecaoDever[] = [
    {
      titulo: "abertura",
      deveres: deveresDB
        .filter(d => d.secao === "abertura")
        .map(d => ({ ...d, concluido: deveresConcluidosLocal.has(d.id) }))
    },
    {
      titulo: "durante_operacao",
      deveres: deveresDB
        .filter(d => d.secao === "durante_operacao")
        .map(d => ({ ...d, concluido: deveresConcluidosLocal.has(d.id) }))
    },
    {
      titulo: "fechamento",
      deveres: deveresDB
        .filter(d => d.secao === "fechamento")
        .map(d => ({ ...d, concluido: deveresConcluidosLocal.has(d.id) }))
    }
  ];

  const toggleDever = (deverId: number) => {
    const estaConcluido = deveresConcluidosLocal.has(deverId);
    
    if (estaConcluido) {
      // Desmarcar
      setDeveresConcluidosLocal(prev => {
        const novo = new Set(prev);
        novo.delete(deverId);
        return novo;
      });
      desfazerConclusao.mutate({ deverId });
    } else {
      // Marcar como concluído
      setDeveresConcluidosLocal(prev => new Set(prev).add(deverId));
      concluirDever.mutate({ deverId });
    }
  };

  const getTituloSecao = (titulo: string) => {
    switch (titulo) {
      case "abertura": return "Abertura";
      case "durante_operacao": return "Durante a Operação";
      case "fechamento": return "Fechamento";
      default: return titulo;
    }
  };

  const getProgressoSecao = (secao: SecaoDever) => {
    const total = secao.deveres.length;
    if (total === 0) return { total: 0, concluidos: 0, percentual: 0 };
    const concluidos = secao.deveres.filter(d => d.concluido).length;
    return { total, concluidos, percentual: Math.round((concluidos / total) * 100) };
  };

  const progressoGeral = () => {
    const total = secoes.reduce((acc, s) => acc + s.deveres.length, 0);
    if (total === 0) return { total: 0, concluidos: 0, percentual: 0 };
    const concluidos = secoes.reduce((acc, s) => acc + s.deveres.filter(d => d.concluido).length, 0);
    return { total, concluidos, percentual: Math.round((concluidos / total) * 100) };
  };

  const geral = progressoGeral();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (deveresDB.length === 0) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Rotina Diária</h2>
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-tight text-[#1A1A1A]">
              Checklist de Deveres
            </h1>
            <p className="text-sm text-gray-500 mt-1">Obrigações do turno - {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
        
        <Card className="border-0 shadow-sm bg-white rounded-[2rem] overflow-hidden">
          <CardContent className="p-8 text-center">
            <ListChecks className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma tarefa cadastrada para hoje.</p>
            <p className="text-sm text-gray-400 mt-2">
              As tarefas são configuradas pelo gestor na área de Gestão de Tarefas.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Rotina Diária</h2>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-tight text-[#1A1A1A]">
            Checklist de Deveres
          </h1>
          <p className="text-sm text-gray-500 mt-1">Obrigações do turno - {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      {/* Progresso Geral */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/5 to-emerald-50 rounded-[2rem] overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Progresso do Turno</p>
              <p className="text-4xl font-black text-gray-800">{geral.concluidos}/{geral.total}</p>
              <p className="text-sm text-gray-500 mt-1">tarefas concluídas</p>
            </div>
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${geral.percentual * 2.51} 251`}
                  className="text-primary transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-black text-gray-800">{geral.percentual}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seções de Deveres */}
      <div className="space-y-4">
        {secoes.filter(s => s.deveres.length > 0).map((secao) => {
          const progresso = getProgressoSecao(secao);
          const isExpanded = expandedSection === secao.titulo;
          
          return (
            <Card key={secao.titulo} className="border-0 shadow-sm bg-white rounded-[2rem] overflow-hidden">
              <button
                onClick={() => setExpandedSection(isExpanded ? null : secao.titulo)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    progresso.percentual === 100 ? "bg-emerald-100 text-emerald-600" : "bg-primary/10 text-primary"
                  )}>
                    {progresso.percentual === 100 ? <Check size={24} /> : <ListChecks size={24} />}
                  </div>
                  <div className="text-left">
                    <h3 className="font-black uppercase tracking-tight text-gray-800">
                      {getTituloSecao(secao.titulo)}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {progresso.concluidos} de {progresso.total} tarefas
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-500",
                        progresso.percentual === 100 ? "bg-emerald-500" : "bg-primary"
                      )}
                      style={{ width: `${progresso.percentual}%` }}
                    />
                  </div>
                  {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-6 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
                  {secao.deveres.map((dever) => (
                    <button
                      key={dever.id}
                      onClick={() => toggleDever(dever.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-xl transition-all",
                        dever.concluido 
                          ? "bg-emerald-50 border border-emerald-100" 
                          : "bg-gray-50 border border-gray-100 hover:border-primary/30"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all",
                        dever.concluido 
                          ? "bg-emerald-500 border-emerald-500 text-white" 
                          : "border-gray-300"
                      )}>
                        {dever.concluido && <Check size={14} />}
                      </div>
                      <div className="flex-1 text-left">
                        <p className={cn(
                          "font-bold text-sm",
                          dever.concluido ? "text-emerald-700 line-through" : "text-gray-800"
                        )}>
                          {dever.titulo}
                        </p>
                        {dever.descricao && (
                          <p className="text-xs text-gray-400 mt-0.5">{dever.descricao}</p>
                        )}
                      </div>
                      {dever.horario && (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={12} />
                          {dever.horario}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
