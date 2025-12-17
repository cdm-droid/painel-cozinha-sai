import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  Package,
  Plus,
  MoreHorizontal,
  Save
} from "lucide-react";
import { insumos } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function EstoqueGeral() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { isOperacional } = useAuth();
  
  // Estado para armazenar contagens temporárias (apenas visual)
  const [contagens, setContagens] = useState<Record<string, string>>({});

  const handleContagemChange = (id: string, value: string) => {
    setContagens(prev => ({ ...prev, [id]: value }));
  };

  const handleSalvarContagem = () => {
    toast.success("Contagem de estoque salva com sucesso!");
    setContagens({});
  };
  
  // Obter categorias únicas
  const categories = Array.from(new Set(insumos.map(item => item.categoria)));

  // Filtrar itens
  const filteredItems = insumos.filter(item => {
    const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.includes(searchTerm);
    const matchesCategory = categoryFilter ? item.categoria === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">
            {isOperacional ? "Contagem de Estoque" : "Estoque Geral"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isOperacional 
              ? "Insira a quantidade física atual de cada item." 
              : "Gerenciamento completo de todos os insumos cadastrados."}
          </p>
        </div>
        <div className="flex gap-2">
          {!isOperacional && (
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus size={16} />
              Novo Insumo
            </Button>
          )}
          {isOperacional ? (
            <Button className="gap-2" onClick={handleSalvarContagem}>
              <Save size={16} />
              Salvar Contagem
            </Button>
          ) : (
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Exportar
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filtros Laterais */}
        <Card className="industrial-card h-fit md:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Categorias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant={categoryFilter === null ? "secondary" : "ghost"} 
              className="w-full justify-start font-normal"
              onClick={() => setCategoryFilter(null)}
            >
              Todos os itens
              <span className="ml-auto text-xs text-muted-foreground">{insumos.length}</span>
            </Button>
            {categories.map(cat => (
              <Button 
                key={cat}
                variant={categoryFilter === cat ? "secondary" : "ghost"} 
                className="w-full justify-start font-normal"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
                <span className="ml-auto text-xs text-muted-foreground">
                  {insumos.filter(i => i.categoria === cat).length}
                </span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Tabela Principal */}
        <Card className="industrial-card md:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nome ou ID..."
                  className="pl-9 bg-secondary/50 border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{filteredItems.length} itens encontrados</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    {!isOperacional && <TableHead className="w-[80px] font-bold">ID</TableHead>}
                    <TableHead className="font-bold">Produto</TableHead>
                    <TableHead className="font-bold">Categoria</TableHead>
                    
                    {isOperacional ? (
                      // Cabeçalho Operacional
                      <>
                        <TableHead className="text-right font-bold w-[150px]">Contagem Atual</TableHead>
                        <TableHead className="text-left font-bold w-[80px]">Unid.</TableHead>
                      </>
                    ) : (
                      // Cabeçalho Gerencial
                      <>
                        <TableHead className="text-right font-bold">Estoque</TableHead>
                        <TableHead className="text-right font-bold">Unid.</TableHead>
                        <TableHead className="text-right font-bold">Custo Unit.</TableHead>
                        <TableHead className="text-center font-bold">Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-secondary/30 transition-colors group">
                        {!isOperacional && (
                          <TableCell className="font-mono text-xs text-muted-foreground">{item.id}</TableCell>
                        )}
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{item.categoria}</TableCell>
                        
                        {isOperacional ? (
                          // Linha Operacional
                          <>
                            <TableCell className="text-right">
                              <Input 
                                type="number" 
                                className="h-8 w-24 ml-auto text-right font-mono"
                                placeholder="0"
                                value={contagens[item.id] || ""}
                                onChange={(e) => handleContagemChange(item.id, e.target.value)}
                              />
                            </TableCell>
                            <TableCell className="text-left text-muted-foreground text-sm">{item.unidade}</TableCell>
                          </>
                        ) : (
                          // Linha Gerencial
                          <>
                            <TableCell className="text-right font-mono font-bold">
                              {item.estoqueAtual}
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground text-sm">{item.unidade}</TableCell>
                            <TableCell className="text-right font-mono text-sm">
                              R$ {item.custoUnitario.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${item.status === 'Crítico' 
                                    ? 'bg-destructive/10 text-destructive border-destructive/20' 
                                    : item.status === 'Baixo'
                                      ? 'bg-warning/10 text-warning-foreground border-warning/20'
                                      : 'bg-success/10 text-success-foreground border-success/20'}
                                `}
                              >
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={isOperacional ? 4 : 8} className="h-32 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Package className="h-8 w-8 opacity-20" />
                          <p>Nenhum insumo encontrado com os filtros atuais.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
