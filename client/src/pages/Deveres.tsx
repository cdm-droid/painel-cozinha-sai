import { useState } from "react";
import { ListChecks, Check, Clock, User, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Dever {
  id: string;
  titulo: string;
  descricao?: string;
  horario?: string;
  concluido: boolean;
  responsavel?: string;
}

interface SecaoDever {
  titulo: string;
  deveres: Dever[];
}

export default function Deveres() {
  const [expandedSection, setExpandedSection] = useState<string | null>("abertura");
  
  // Checklist padrão da operação
  const [secoes, setSecoes] = useState<SecaoDever[]>([
    {
      titulo: "abertura",
      deveres: [
        { id: "1", titulo: "Ligar equipamentos (chapas, fritadeiras, estufas)", horario: "10:00", concluido: false },
        { id: "2", titulo: "Verificar temperatura das geladeiras", horario: "10:00", concluido: false },
        { id: "3", titulo: "Conferir estoque sensível (blends, batata, queijos)", horario: "10:15", concluido: false },
        { id: "4", titulo: "Preparar mise en place (molhos, vegetais)", horario: "10:30", concluido: false },
        { id: "5", titulo: "Organizar praça de montagem", horario: "10:45", concluido: false },
      ]
    },
    {
      titulo: "durante_operacao",
      deveres: [
        { id: "6", titulo: "Reabastecer linha de produção conforme demanda", concluido: false },
        { id: "7", titulo: "Monitorar qualidade dos produtos", concluido: false },
        { id: "8", titulo: "Registrar perdas imediatamente", concluido: false },
        { id: "9", titulo: "Manter área limpa e organizada", concluido: false },
      ]
    },
    {
      titulo: "fechamento",
      deveres: [
        { id: "10", titulo: "Realizar contagem de estoque sensível", horario: "22:00", concluido: false },
        { id: "11", titulo: "Desligar equipamentos", horario: "22:30", concluido: false },
        { id: "12", titulo: "Limpar e higienizar praça", horario: "22:30", concluido: false },
        { id: "13", titulo: "Armazenar insumos corretamente", horario: "22:45", concluido: false },
        { id: "14", titulo: "Verificar fechamento de geladeiras", horario: "23:00", concluido: false },
      ]
    }
  ]);

  const toggleDever = (secaoTitulo: string, deverId: string) => {
    setSecoes(secoes.map(secao => {
      if (secao.titulo === secaoTitulo) {
        return {
          ...secao,
          deveres: secao.deveres.map(dever => 
            dever.id === deverId ? { ...dever, concluido: !dever.concluido } : dever
          )
        };
      }
      return secao;
    }));
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
    const concluidos = secao.deveres.filter(d => d.concluido).length;
    return { total, concluidos, percentual: Math.round((concluidos / total) * 100) };
  };

  const progressoGeral = () => {
    const total = secoes.reduce((acc, s) => acc + s.deveres.length, 0);
    const concluidos = secoes.reduce((acc, s) => acc + s.deveres.filter(d => d.concluido).length, 0);
    return { total, concluidos, percentual: Math.round((concluidos / total) * 100) };
  };

  const geral = progressoGeral();

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
        {secoes.map((secao) => {
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
                      onClick={() => toggleDever(secao.titulo, dever.id)}
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
