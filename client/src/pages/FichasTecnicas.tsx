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
  ChevronRight,
  Package,
  Utensils,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus
} from "lucide-react";
import { fichasTecnicas as initialFichas, FichaTecnica } from "@/lib/mock-data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { FichaTecnicaEditor } from "@/components/FichaTecnicaEditor";
import { toast } from "sonner";

export default function FichasTecnicas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [fichas, setFichas] = useState<FichaTecnica[]>(initialFichas);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingFicha, setEditingFicha] = useState<FichaTecnica | null>(null);
  const { isOperacional } = useAuth();

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleEdit = (ficha: FichaTecnica) => {
    setEditingFicha(ficha);
    setIsEditorOpen(true);
  };

  const handleNew = () => {
    setEditingFicha(null);
    setIsEditorOpen(true);
  };

  const handleSave = (savedFicha: FichaTecnica) => {
    if (editingFicha) {
      // Editando existente
      setFichas(prev => prev.map(f => f.id === savedFicha.id ? savedFicha : f));
    } else {
      // Criando nova
      setFichas(prev => [...prev, savedFicha]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta ficha técnica?")) {
      setFichas(prev => prev.filter(f => f.id !== id));
      toast.success("Ficha técnica excluída.");
    }
  };

  const filteredFichas = fichas.filter(ficha => 
    ficha.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ficha.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Fichas Técnicas</h1>
          <p className="text-muted-foreground mt-1">
            {isOperacional 
              ? "Consulta de receitas e modos de preparo." 
              : "Gerenciamento de receitas, custos e precificação."}
          </p>
        </div>
        <div className="flex gap-2">
          {!isOperacional && (
            <Button 
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleNew}
            >
              <Plus size={16} />
              Nova Ficha
            </Button>
          )}
          {!isOperacional && (
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Exportar
            </Button>
          )}
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
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <span>{ficha.id}</span>
                    {ficha.pdvId && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                        <span className="text-primary/80">PDV: {ficha.pdvId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full sm:w-auto">
                {isOperacional ? (
                  // Visão Operacional Simplificada
                  <>
                    <div className="text-center sm:text-right">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Rendimento</p>
                      <p className="font-mono font-bold">{ficha.rendimentoBase} {ficha.unidadeRendimento}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-3 flex justify-end items-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="gap-2">
                            <Eye size={16} /> Ver Modo de Preparo
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-xl font-display">
                              <Utensils className="h-5 w-5 text-primary" />
                              {ficha.produto}
                            </DialogTitle>
                            <DialogDescription>Receita e modo de preparo detalhado.</DialogDescription>
                          </DialogHeader>
                          
                          <div className="mt-4 space-y-6">
                            <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                              <p className="text-xs text-muted-foreground uppercase font-bold">Rendimento Base</p>
                              <p className="text-lg font-mono font-bold">
                                {ficha.rendimentoBase} <span className="text-sm font-normal text-muted-foreground">{ficha.unidadeRendimento}</span>
                              </p>
                            </div>

                            <div>
                              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Package className="h-4 w-4" /> Ingredientes
                              </h3>
                              <div className="rounded-md border border-border overflow-hidden">
                                <Table>
                                  <TableHeader className="bg-secondary/50">
                                    <TableRow>
                                      <TableHead>Insumo</TableHead>
                                      <TableHead className="text-right">Qtd.</TableHead>
                                      <TableHead>Unid.</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {ficha.componentes.map((comp, idx) => (
                                      <TableRow key={idx}>
                                        <TableCell className="font-medium">{comp.nome}</TableCell>
                                        <TableCell className="text-right font-mono">{comp.quantidade}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">{comp.unidade}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <ChefHat className="h-4 w-4" /> Modo de Preparo
                              </h3>
                              <div className="p-4 bg-secondary/10 rounded-lg border border-border text-sm leading-relaxed whitespace-pre-line">
                                {ficha.modoPreparo || "Modo de preparo não cadastrado."}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                ) : (
                  // Visão Gerencial Completa
                  <>
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
                  </>
                )}
              </div>
            </div>

            <CollapsibleContent>
              <div className="border-t border-border bg-secondary/10 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className={isOperacional ? "lg:col-span-3" : "lg:col-span-2"}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <ChefHat size={14} /> Componentes
                      </h4>
                      {!isOperacional && (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs gap-1"
                            onClick={() => handleEdit(ficha)}
                          >
                            <Edit size={12} /> Editar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs gap-1 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(ficha.id)}
                          >
                            <Trash2 size={12} /> Excluir
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="rounded-md border border-border bg-background overflow-hidden">
                      <Table>
                        <TableHeader className="bg-secondary/30">
                          <TableRow>
                            <TableHead className="text-xs">Insumo</TableHead>
                            <TableHead className="text-xs text-right">Qtd</TableHead>
                            <TableHead className="text-xs text-right">Unid.</TableHead>
                            {!isOperacional && (
                              <>
                                <TableHead className="text-xs text-right">Custo Unit.</TableHead>
                                <TableHead className="text-xs text-right">Subtotal</TableHead>
                              </>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ficha.componentes.map((comp, idx) => (
                            <TableRow key={idx} className="text-sm">
                              <TableCell className="font-medium">{comp.nome}</TableCell>
                              <TableCell className="text-right font-mono">{comp.quantidade}</TableCell>
                              <TableCell className="text-right text-muted-foreground">{comp.unidade}</TableCell>
                              {!isOperacional && (
                                <>
                                  <TableCell className="text-right font-mono text-muted-foreground">R$ {comp.custoUnitario.toFixed(2)}</TableCell>
                                  <TableCell className="text-right font-mono font-bold">R$ {comp.subtotal.toFixed(2)}</TableCell>
                                </>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {!isOperacional && (
                    <div className="space-y-6">
                      <div className="bg-background p-4 rounded-lg border border-border shadow-sm">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                          <PieChart size={14} /> Análise Financeira
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Custo Total</span>
                            <span className="font-mono font-bold">R$ {ficha.custoTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Preço Sugerido (Markup 3.0)</span>
                            <span className="font-mono">R$ {(ficha.custoTotal * 3).toFixed(2)}</span>
                          </div>
                          <div className="h-px bg-border my-2"></div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Preço Atual</span>
                            <span className="font-mono font-bold text-primary">R$ {ficha.precoVenda.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Lucro Bruto</span>
                            <span className="font-mono text-success">R$ {(ficha.precoVenda - ficha.custoTotal).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {ficha.nomeOnline && (
                        <div className="bg-background p-4 rounded-lg border border-border shadow-sm">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                            <Package size={14} /> Integração PDV
                          </h4>
                          <p className="text-xs text-muted-foreground mb-1">Nome no Cardápio Online:</p>
                          <p className="text-sm font-medium italic mb-3">"{ficha.nomeOnline}"</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="font-mono text-xs">ID: {ficha.pdvId}</Badge>
                            <Badge variant="outline" className="text-xs text-success border-success/30 bg-success/5">Sincronizado</Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <FichaTecnicaEditor 
        ficha={editingFicha}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
