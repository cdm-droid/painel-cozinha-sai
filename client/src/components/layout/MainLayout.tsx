import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList,
  ClipboardCheck, 
  ChefHat, 
  Menu, 
  X, 
  Search,
  Bell,
  Settings,
  AlertTriangle,
  AlertOctagon,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user, isOperacional } = useAuth();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { label: "Estoque Crítico", icon: AlertTriangle, href: "/estoque-critico" },
    { label: "Estoque Geral", icon: Package, href: "/estoque-geral" },
    { label: "Fichas Técnicas", icon: ChefHat, href: "/fichas-tecnicas" },
    { label: "Diário de Produção", icon: ClipboardList, href: "/diario-producao" },
    { label: "Registro de Perdas", icon: AlertOctagon, href: "/perdas" },
    { label: "Contagem de Estoque", icon: ClipboardCheck, href: "/contagem-diaria" },
  ];

  // Filtra itens para nível operacional
  const filteredNavItems = isOperacional 
    ? navItems.filter(item => 
        ["/estoque-critico", "/fichas-tecnicas", "/diario-producao", "/perdas", "/contagem-diaria"].includes(item.href)
      )
    : navItems;

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <img src="/logo-sai.webp" alt="Saí Burguer" className="w-10 h-10 object-contain" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight leading-tight">SAÍ</span>
              <span className="text-[10px] text-sidebar-foreground/70 uppercase tracking-widest">Cozinha</span>
            </div>
          </div>
          <button 
            className="ml-auto lg:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="mb-6">
            <p className="px-3 text-xs font-bold text-sidebar-foreground/50 uppercase tracking-wider mb-2 font-display">
              Menu Principal
            </p>
            <nav className="space-y-1">
              {filteredNavItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 text-xs font-bold text-sidebar-foreground/50 uppercase tracking-wider mb-2 font-display">
              Sistema
            </p>
            <nav className="space-y-1">
              {!isOperacional && (
                <Link 
                  href="/configuracoes"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  <Settings size={18} />
                  Configurações
                </Link>
              )}
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut size={18} />
                Sair
              </button>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-accent-foreground">
              {user?.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-foreground/70 hover:text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar insumos, fichas..." 
                className="pl-9 pr-4 py-2 bg-secondary/50 border-none rounded-md text-sm focus:ring-1 focus:ring-primary w-64 transition-all focus:w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
            </Button>
            <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>
            <div className="text-sm text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10 sm:hidden"
              onClick={logout}
            >
              <LogOut size={20} />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
