import { useState, useMemo } from "react";
import { 
  ChefHat, 
  Search, 
  Loader2, 
  Package,
  AlertTriangle,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";

// Categorias de preparo - itens que são produzidos na casa
const CATEGORIAS_PREPARO = [
  "AÇOUGUE",
  "MOLHOS E CALDAS", 
  "VEGETAIS",
  "SOBREMESAS",
  "PORÇÕES",
  "BEBIDAS PREPARADAS"
];

export default function Preparo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<"nome" | "estoque">("nome");

  // Buscar insumos do banco de dados - filtrando apenas categorias de preparo
  const { data: insumos = [], isLoading } = trpc.insumos.list.useQuery({
    ativo: true
  });

  // Filtrar apenas itens de preparo (categorias específicas)
  const itensPreparo = useMemo(() => {
    return insumos.filter(insumo => 
      CATEGORIAS_PREPARO.some(cat => 
        insumo.categoria.toUpperCase().includes(cat) ||
        cat.includes(insumo.categoria.toUpperCase())
      )
    );
  }, [insumos]);

  // Aplicar filtros e ordenação
  const itensFiltrados = useMemo(() => {
    let filtered = [...itensPreparo];

    // Filtro de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.nome.toLowerCase().includes(term) ||
        item.codigo.toLowerCase().includes(term)
      );
    }

    // Filtro de categoria
    if (categoriaFilter !== "todas") {
      filtered = filtered.filter(item => 
        item.categoria.toUpperCase().includes(categoriaFilter.toUpperCase())
      );
    }

    // Filtro de status
    if (statusFilter !== "todos") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Ordenação
    filtered.sort((a, b) => {
      if (sortBy === "nome") {
        return a.nome.localeCompare(b.nome);
      } else {
        return parseFloat(a.estoqueAtual) - parseFloat(b.estoqueAtual);
      }
    });

    return filtered;
  }, [itensPreparo, searchTerm, categoriaFilter, statusFilter, sortBy]);

  // Estatísticas
  const stats = useMemo(() => {
    const criticos = itensPreparo.filter(i => i.status === "Crítico").length;
    const baixos = itensPreparo.filter(i => i.status === "Baixo").length;
    const ok = itensPreparo.filter(i => i.status === "OK").length;
    return { criticos, baixos, ok, total: itensPreparo.length };
  }, [itensPreparo]);

  // Categorias únicas para o filtro
  const categoriasUnicas = useMemo(() => {
    const cats = new Set(itensPreparo.map(i => i.categoria));
    return Array.from(cats).sort();
  }, [itensPreparo]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-black uppercase tracking-[0.3em] text-xs text-gray-400">Carregando preparos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-1">Estoque de Produção</h2>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-tight text-[#1A1A1A]">
            Preparo
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Itens utilizados na produção da cozinha
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</p>
            <Package size={16} className="text-primary" />
          </div>
          <h4 className="text-3xl font-black tracking-tighter text-gray-800">{stats.total}</h4>
          <p className="text-[10px] text-gray-400 uppercase mt-1">Itens de preparo</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Crítico</p>
            <AlertTriangle size={16} className="text-rose-500" />
          </div>
          <h4 className="text-3xl font-black tracking-tighter text-rose-600">{stats.criticos}</h4>
          <p className="text-[10px] text-gray-400 uppercase mt-1">Reposição urgente</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Baixo</p>
            <AlertTriangle size={16} className="text-amber-500" />
          </div>
          <h4 className="text-3xl font-black tracking-tighter text-amber-600">{stats.baixos}</h4>
          <p className="text-[10px] text-gray-400 uppercase mt-1">Atenção necessária</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OK</p>
            <Package size={16} className="text-emerald-500" />
          </div>
          <h4 className="text-3xl font-black tracking-tighter text-emerald-600">{stats.ok}</h4>
          <p className="text-[10px] text-gray-400 uppercase mt-1">Estoque adequado</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Filtro de Categoria */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={categoriaFilter}
              onChange={(e) => setCategoriaFilter(e.target.value)}
              className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="todas">Todas categorias</option>
              {categoriasUnicas.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Filtro de Status */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="todos">Todos status</option>
              <option value="Crítico">Crítico</option>
              <option value="Baixo">Baixo</option>
              <option value="OK">OK</option>
            </select>
          </div>

          {/* Ordenação */}
          <button
            onClick={() => setSortBy(sortBy === "nome" ? "estoque" : "nome")}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm hover:bg-gray-100 transition-colors"
          >
            <ArrowUpDown size={16} />
            {sortBy === "nome" ? "A-Z" : "Estoque"}
          </button>
        </div>
      </div>

      {/* Lista de Itens */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <ChefHat className="text-amber-500" size={20} />
            </div>
            <div>
              <h3 className="font-black uppercase text-sm text-gray-800">Itens de Preparo</h3>
              <p className="text-[10px] text-gray-400">{itensFiltrados.length} itens encontrados</p>
            </div>
          </div>
        </div>

        {itensFiltrados.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 mx-auto text-gray-200 mb-4" />
            <p className="font-bold text-gray-400">Nenhum item encontrado</p>
            <p className="text-sm text-gray-300">Ajuste os filtros para ver mais resultados</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {itensFiltrados.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    item.status === 'Crítico' && 'bg-rose-500 animate-pulse',
                    item.status === 'Baixo' && 'bg-amber-500',
                    item.status === 'OK' && 'bg-emerald-500'
                  )} />
                  <div>
                    <p className="font-bold text-sm text-gray-800">{item.nome}</p>
                    <p className="text-xs text-gray-400">
                      {item.codigo} • {item.categoria}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-black text-lg text-gray-800">
                      {parseFloat(item.estoqueAtual).toFixed(1)}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase">
                      {item.unidade} / mín: {parseFloat(item.estoqueMinimo).toFixed(1)}
                    </p>
                  </div>
                  <span className={cn(
                    "text-[9px] font-black px-3 py-1.5 rounded-full uppercase border",
                    item.status === 'Crítico' && 'bg-rose-50 text-rose-500 border-rose-100',
                    item.status === 'Baixo' && 'bg-amber-50 text-amber-600 border-amber-100',
                    item.status === 'OK' && 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  )}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
