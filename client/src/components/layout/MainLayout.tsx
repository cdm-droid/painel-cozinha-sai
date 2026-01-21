import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { 
  Menu, 
  X, 
  Bell,
  Home,
  ArrowLeft,
  ChevronRight,
  LogOut,
  Calculator
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
// Importação Centralizada (Nova)
import { MENU_ITEMS, THEME } from "@/lib/constants";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navHistory, setNavHistory] = useState<string[]>([]);
  const { logout, user, isOperacional } = useAuth();

  // Configuração carregada do arquivo de constantes
  const menuConfig = isOperacional ? MENU_ITEMS.operacional : MENU_ITEMS.gestor;

  const currentInfo = useMemo(() => {
    for (const section of menuConfig) {
      const item = section.items.find(i => i.href === location);
      if (item) return { section: section.section, label: item.label };
    }
    return { section: 'Sistema', label: 'Dashboard' };
  }, [location, menuConfig]);

  const navigateTo = (href: string) => {
    if (href !== location) {
      setNavHistory(prev => [...prev, location]);
      setLocation(href);
      setSidebarOpen(false);
    }
  };

  const goBack = () => {
    if (navHistory.length > 0) {
      const prev = navHistory[navHistory.length - 1];
      setNavHistory(prevH => prevH.slice(0, -1));
      setLocation(prev);
    }
  };

  const role = isOperacional ? 'operador' : 'gestor';

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex text-[#2A2A2A] font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 text-white transition-all duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col shadow-2xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ backgroundColor: THEME.colors.sidebar }}
      >
        <div className="h-20 flex items-center px-6 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
              role === 'gestor' ? 'bg-amber-500 shadow-amber-500/30' : 'bg-primary shadow-primary/30'
            )}>
              <img src="/logo-sai.webp" alt="Logo" className="w-7 h-7 object-contain brightness-0 invert" />
            </div>
            <div>
              <span className="block font-black text-xl leading-none tracking-tighter uppercase">SAÍ</span>
              <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">
                {role === 'gestor' ? 'Gestor Terminal' : 'Smart Operation'}
              </span>
            </div>
          </div>
          <button 
            className="ml-auto lg:hidden text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-7 custom-scrollbar">
          {menuConfig.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="px-4 text-[10px] font-black text-white/30 uppercase tracking-[0.15em] mb-2">
                {section.section}
              </h3>
              {section.items.map((item) => {
                const isActive = location === item.href;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.href)}
                    className={cn(
                      "w-full group flex flex-col gap-0.5 px-4 py-2.5 rounded-xl transition-all duration-200 text-left",
                      isActive ? THEME.colors.activeItem : THEME.colors.inactiveItem
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={cn(
                        isActive ? 'text-white' : 'text-primary/70 group-hover:text-primary',
                        (item as any).highlight && !isActive && 'text-amber-500'
                      )} />
                      <span className={cn(
                        "text-sm font-bold tracking-tight",
                        (item as any).highlight && !isActive && 'text-amber-400'
                      )}>{item.label}</span>
                      {(item as any).highlight && !isActive && (
                        <span className="ml-auto px-1.5 py-0.5 text-[8px] font-black bg-amber-500 text-black rounded uppercase">Novo</span>
                      )}
                    </div>
                    {item.sub && (
                      <span className={cn(
                        "text-[9px] ml-7 opacity-50 font-medium",
                        isActive ? 'text-white/80' : 'text-white/40'
                      )}>
                        {item.sub}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 bg-black/40">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
              {user?.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white/90">{user?.name}</p>
              <p className="text-[10px] text-white/40 truncate uppercase tracking-wider">{role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all font-bold text-xs uppercase tracking-wider"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#F8F9FA]">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-500"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center bg-gray-100 p-1 rounded-xl gap-0.5">
              <button 
                onClick={() => navigateTo('/')} 
                className={cn(
                  "p-2 rounded-lg transition-all active:scale-90",
                  location === '/' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'
                )} 
                title="Dashboard"
              >
                <Home size={18} />
              </button>
              <div className="w-px h-4 bg-gray-300 mx-0.5" />
              <button 
                onClick={goBack} 
                disabled={navHistory.length === 0} 
                className="p-2 rounded-lg transition-all text-gray-400 hover:text-gray-600 disabled:opacity-20 active:scale-90" 
                title="Voltar"
              >
                <ArrowLeft size={18} />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 ml-2 border-l border-gray-200 pl-4 text-gray-400">
              <span className="text-[10px] font-black uppercase tracking-widest">{currentInfo.section}</span>
              <ChevronRight size={12} className="text-gray-300" />
              <h2 className="text-sm font-bold text-gray-700">{currentInfo.label}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Atalho de Calculadora Flutuante */}
            {isOperacional && (
              <button 
                onClick={() => navigateTo('/calculadora')}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl transition-all border",
                  location === '/calculadora' 
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                    : 'bg-primary/5 text-primary border-primary/10 hover:bg-primary/10'
                )}
              >
                <Calculator size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Calculadora</span>
              </button>
            )}

            <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest">Cozinha Conectada</span>
            </div>

            <button className="relative p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 transition-all active:scale-90">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white ring-2 ring-rose-500/20"></span>
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </section>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}
