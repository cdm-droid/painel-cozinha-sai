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
  AlertTriangle,
  Loader2
} from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function EstoqueCritico() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Buscar insumos do backend
  const { data: insumos = [], isLoading } = trpc.insumos.list.useQuery({
    search: searchTerm || undefined,
  });
  
  // Filtrar apenas itens com status Crítico ou Baixo
  const criticalItems = insumos.filter(item => 
    item.status === "Crítico" || item.status === "Baixo"
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando estoque crítico...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Estoque Crítico</h1>
          <p className="text-muted-foreground mt-1">Itens que precisam de reposição imediata ou atenção.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Exportar Lista
          </Button>
        </div>
      </div>

      <Card className="industrial-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <AlertTriangle className="text-warning h-5 w-5" />
              Itens em Alerta ({criticalItems.length})
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar item..."
                  className="pl-9 bg-secondary/50 border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow>
                  <TableHead className="w-[100px] font-bold">Status</TableHead>
                  <TableHead className="font-bold">Produto</TableHead>
                  <TableHead className="font-bold">Categoria</TableHead>
                  <TableHead className="text-right font-bold">Estoque Atual</TableHead>
                  <TableHead className="text-right font-bold">Mínimo</TableHead>
                  <TableHead className="text-right font-bold">Unidade</TableHead>
                  <TableHead className="text-right font-bold">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {criticalItems.length > 0 ? (
                  criticalItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-secondary/30 transition-colors">
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${item.status === 'Crítico' 
                              ? 'bg-destructive/10 text-destructive border-destructive/20' 
                              : 'bg-warning/10 text-warning-foreground border-warning/20'}
                          `}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{item.categoria}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-destructive">
                        {parseFloat(item.estoqueAtual).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">
                        {parseFloat(item.estoqueMinimo).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-sm">{item.unidade}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="text-xs">
                          Repor
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Nenhum item em estado crítico encontrado.</p>
                      <p className="text-sm">Todos os estoques estão em níveis adequados.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
