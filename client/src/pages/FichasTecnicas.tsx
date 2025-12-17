import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ChefHat, 
  DollarSign,
  PieChart,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { fichasTecnicas } from "@/lib/mock-data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function FichasTecnicas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFichas = fichasTecnicas.filter(ficha => 
    ficha.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ficha.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Fichas Técnicas</h1>
          <p className="text-muted-foreground mt-1">Composição de custos e ingredientes dos produtos.</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <ChefHat size={16} />
            Nova Ficha
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar ficha técnica..."
            className="pl-9 bg-secondary/50 border-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFichas.map((ficha) => (
          <Collapsible 
            key={ficha.id} 
            open={openItems.includes(ficha.id)}
            onOpenChange={() => toggleItem(ficha.id)}
            className="border border-border rounded-lg bg-card overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card">
              <div className="flex items-center gap-3 flex-1">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    {openItems.includes(ficha.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </Button>
                </CollapsibleTrigger>
                <div>
                  <h3 className="font-bold text-lg font-display">{ficha.produto}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{ficha.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full sm:w-auto">
                <div className="text-center sm:text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Custo Total</p>
                  <p className="font-mono font-bold text-destructive">R$ {ficha.custoTotal.toFixed(2)}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Preço Venda</p>
                  <p className="font-mono font-bold text-success">R$ {ficha.precoVenda.toFixed(2)}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Markup</p>
                  <p className="font-mono font-bold">{ficha.markup.toFixed(2)}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">CMV</p>
                  <Badge variant="outline" className="font-mono">{(ficha.cmv * 100).toFixed(1)}%</Badge>
                </div>
              </div>
            </div>

            <CollapsibleContent>
              <div className="border-t border-border bg-secondary/10 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <ChefHat size={14} /> Componentes
                    </h4>
                    <div className="rounded-md border border-border bg-background overflow-hidden">
                      <Table>
                        <TableHeader className="bg-secondary/30">
                          <TableRow>
                            <TableHead className="text-xs">Insumo</TableHead>
                            <TableHead className="text-xs text-right">Qtd</TableHead>
                            <TableHead className="text-xs text-right">Unid.</TableHead>
                            <TableHead className="text-xs text-right">Custo Unit.</TableHead>
                            <TableHead className="text-xs text-right">Subtotal</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ficha.componentes.map((comp, idx) => (
                            <TableRow key={idx} className="text-sm">
                              <TableCell className="font-medium">{comp.nome}</TableCell>
                              <TableCell className="text-right font-mono">{comp.quantidade}</TableCell>
                              <TableCell className="text-right text-muted-foreground">{comp.unidade}</TableCell>
                              <TableCell className="text-right font-mono text-muted-foreground">R$ {comp.custoUnitario.toFixed(2)}</TableCell>
                              <TableCell className="text-right font-mono font-bold">R$ {comp.subtotal.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <PieChart size={14} /> Análise de Custo
                    </h4>
                    <Card className="bg-background border-border">
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Lucro Bruto Estimado</span>
                            <span className="font-bold text-success">R$ {(ficha.precoVenda - ficha.custoTotal).toFixed(2)}</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden flex">
                            <div 
                              className="h-full bg-destructive" 
                              style={{ width: `${(ficha.cmv * 100)}%` }}
                              title="Custo"
                            />
                            <div 
                              className="h-full bg-success" 
                              style={{ width: `${100 - (ficha.cmv * 100)}%` }}
                              title="Lucro"
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>Custo ({ (ficha.cmv * 100).toFixed(0) }%)</span>
                            <span>Margem ({ (100 - (ficha.cmv * 100)).toFixed(0) }%)</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <Button variant="outline" size="sm" className="w-full">
                            <DollarSign size={14} className="mr-2" />
                            Atualizar Preços
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
