import { LayoutDashboard, ChefHat, ListChecks, Package, ClipboardCheck, Calculator, BookOpen, AlertOctagon, BarChart3, DollarSign, Boxes, Users, Fingerprint, Layers } from "lucide-react";

// Identidade Visual
export const THEME = {
  colors: {
    sidebar: "#1A1A1A",
    sidebarText: "#FFFFFF",
    primary: "hsl(var(--primary))",
    activeItem: "bg-primary text-white shadow-md shadow-primary/20",
    inactiveItem: "hover:bg-white/5 text-white/60 hover:text-white",
  }
};

// Configuração dos Menus
export const MENU_ITEMS = {
  operacional: [
    { 
      section: "Rotina Diária", 
      items: [
        { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard, href: '/' },
        { id: 'quadro-status', label: 'Quadro de Produção', icon: ChefHat, href: '/kanban-producao', sub: 'Fluxo em tempo real', highlight: true },
        { id: 'deveres', label: 'Checklist de Deveres', icon: ListChecks, href: '/deveres', sub: 'Obrigações do turno' },
      ]
    },
    { 
      section: "Estoque e Contagem", 
      items: [
        { id: 'preparo', label: 'Preparo', icon: ChefHat, href: '/preparo', sub: 'Itens de produção', highlight: true },
        { id: 'contagem-sensivel', label: 'Estoque Sensível', icon: ClipboardCheck, href: '/contagem-diaria' },
        { id: 'estoque-insumos', label: 'Estoque de Insumos', icon: Layers, href: '/estoque-geral' },
      ]
    },
    { 
      section: "Ferramentas de Apoio", 
      items: [
        { id: 'calculadora', label: 'Calculadora Saî', icon: Calculator, href: '/calculadora', sub: 'Escalonar preparos' },
        { id: 'fichas', label: 'Fichas Técnicas', icon: BookOpen, href: '/fichas-tecnicas' },
        { id: 'perdas', label: 'Registrar Perda', icon: AlertOctagon, href: '/perdas' },
      ]
    }
  ],
  gestor: [
    { 
      section: "Estratégico", 
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/' },
        { id: 'cmv', label: 'CMV & Resultados', icon: DollarSign, href: '/cmv', sub: 'Análise Financeira', highlight: true },
      ]
    },
    { 
      section: "Gestão", 
      items: [
        { id: 'estoque', label: 'Estoque', icon: Boxes, href: '/estoque', sub: 'Insumos, Sensível, Histórico' },
        { id: 'fichas', label: 'Fichas Técnicas', icon: BookOpen, href: '/fichas-tecnicas' },
        { id: 'integracoes', label: 'Integrações', icon: Layers, href: '/integracoes', sub: 'Anota Aí / Apps' }, // <--- NOVO
        { id: 'equipe', label: 'Equipe', icon: Users, href: '/equipe' },
        { id: 'tarefas', label: 'Gestão de Tarefas', icon: ListChecks, href: '/gestao-tarefas', sub: 'Rotinas e deveres' },
      ]
    },
    { 
      section: "Operacional", 
      items: [
        { id: 'producao', label: 'Produção', icon: ChefHat, href: '/producao', sub: 'Quadro e Diário unificados' },
        { id: 'perdas', label: 'Perdas', icon: AlertOctagon, href: '/perdas' },
      ]
    },
    { 
      section: "Auditoria", 
      items: [
        { id: 'auditoria', label: 'Logs de Operação', icon: Fingerprint, href: '/auditoria' },
      ]
    }
  ]
