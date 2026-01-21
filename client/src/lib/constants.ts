import { LayoutDashboard, ChefHat, ListChecks, Package, ClipboardCheck, Calculator, BookOpen, AlertOctagon, BarChart3, DollarSign, Boxes, Users, Fingerprint } from "lucide-react";

// ==========================================
// IDENTIDADE VISUAL & TEMA
// ==========================================

export const THEME = {
  colors: {
    primary: "hsl(var(--primary))", // Utiliza variável CSS do Shadcn/Tailwind
    sidebar: "#1A1A1A",
    sidebarText: "#FFFFFF",
    background: "#F8F9FA",
    card: "#FFFFFF",
    text: "#2A2A2A",
    muted: "#6B7280",
    
    // Cores de Status
    success: "#10B981", // Emerald-500
    warning: "#F59E0B", // Amber-500
    danger: "#F43F5E",  // Rose-500
    info: "#3B82F6",    // Blue-500
  },
  borderRadius: {
    card: "2rem", // Arredondamento padrão dos cards (32px)
    button: "0.75rem", // 12px
  }
};

// ==========================================
// CONFIGURAÇÕES DO SISTEMA
// ==========================================

export const APP_CONFIG = {
  name: "SAÍ",
  modules: {
    operacional: "Smart Operation",
    gestor: "Gestor Terminal",
  },
  company: "Cozinha Conectada",
};

// ==========================================
// ENUMS & STATUS (Mapeamento Backend -> Frontend)
// ==========================================

// Status de Insumos e Estoque
export const STOCK_STATUS = {
  OK: { label: "Estoque OK", color: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-200", bgLight: "bg-emerald-50" },
  BAIXO: { label: "Estoque Baixo", color: "bg-amber-500", text: "text-amber-600", border: "border-amber-200", bgLight: "bg-amber-50" },
  CRITICO: { label: "Crítico", color: "bg-rose-500", text: "text-rose-600", border: "border-rose-200", bgLight: "bg-rose-50" },
} as const;

// Status do Kanban de Produção
export const PRODUCTION_STATUS = {
  necessario: { label: "Necessário", variant: "destructive" },   // Vermelho
  em_producao: { label: "Em Produção", variant: "warning" },     // Amarelo
  pronto: { label: "Pronto", variant: "success" },               // Verde
  finalizado: { label: "Finalizado", variant: "default" },       // Azul/Padrão
} as const;

// ==========================================
// NAVEGAÇÃO & MENU
// ==========================================

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
        { id: 'estoque-insumos', label: 'Estoque de Insumos', icon: Package, href: '/estoque-geral' },
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
        { id: 'cmv', label: 'CMV', icon: DollarSign, href: '/cmv', sub: 'Custo de Mercadoria' },
      ]
    },
    { 
      section: "Gestão", 
      items: [
        { id: 'estoque', label: 'Estoque', icon: Boxes, href: '/estoque', sub: 'Insumos, Sensível, Histórico' },
        { id: 'fichas', label: 'Fichas Técnicas', icon: BookOpen, href: '/fichas-tecnicas' },
        { id: 'equipe', label: 'Equipe', icon: Users, href: '/equipe' },
        { id: 'tarefas', label: 'Gestão de Tarefas', icon: ListChecks, href: '/gestao-tarefas', sub: 'Rotinas e deveres' },
      ]
    },
    { 
      section: "Auditoria", 
      items: [
        { id: 'auditoria', label: 'Logs de Operação', icon: Fingerprint, href: '/auditoria' },
      ]
    }
  ]
};
