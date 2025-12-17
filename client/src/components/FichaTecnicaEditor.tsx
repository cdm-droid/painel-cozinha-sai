import { useState, useEffect } from "react";
import { FichaTecnica, Componente } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";

interface FichaTecnicaEditorProps {
  ficha: FichaTecnica | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (ficha: FichaTecnica) => void;
}

export function FichaTecnicaEditor({ ficha, isOpen, onClose, onSave }: FichaTecnicaEditorProps) {
  const [editedFicha, setEditedFicha] = useState<FichaTecnica | null>(null);

  useEffect(() => {
    if (ficha) {
      setEditedFicha({ ...ficha });
    } else {
      // Nova ficha template
      setEditedFicha({
        id: `FT-${Math.floor(Math.random() * 10000)}`,
        produto: "",
        rendimentoBase: 1,
        unidadeRendimento: "un",
        custoTotal: 0,
        precoVenda: 0,
        cmv: 0,
        markup: 0,
        componentes: [],
        modoPreparo: "",
        pdvId: "",
        nomeOnline: ""
      });
    }
  }, [ficha, isOpen]);

  const handleInputChange = (field: keyof FichaTecnica, value: any) => {
    if (!editedFicha) return;
    setEditedFicha({ ...editedFicha, [field]: value });
  };

  const handleComponenteChange = (index: number, field: keyof Componente, value: any) => {
    if (!editedFicha) return;
    const newComponentes = [...editedFicha.componentes];
    newComponentes[index] = { ...newComponentes[index], [field]: value };
    
    // Recalcular subtotal
    if (field === 'quantidade' || field === 'custoUnitario') {
      const qtd = field === 'quantidade' ? parseFloat(value) || 0 : newComponentes[index].quantidade;
      const custo = field === 'custoUnitario' ? parseFloat(value) || 0 : newComponentes[index].custoUnitario;
      newComponentes[index].subtotal = qtd * custo;
    }
    
    setEditedFicha({ ...editedFicha, componentes: newComponentes });
  };

  const addComponente = () => {
    if (!editedFicha) return;
    setEditedFicha({
      ...editedFicha,
      componentes: [
        ...editedFicha.componentes,
        { 
          insumoId: `INS-${Math.floor(Math.random() * 10000)}`, // ID temporário
          nome: "", 
          quantidade: 0, 
          unidade: "kg", 
          custoUnitario: 0, 
          subtotal: 0 
        }
      ]
    });
  };

  const removeComponente = (index: number) => {
    if (!editedFicha) return;
    const newComponentes = [...editedFicha.componentes];
    newComponentes.splice(index, 1);
    setEditedFicha({ ...editedFicha, componentes: newComponentes });
  };

  const calculateTotals = () => {
    if (!editedFicha) return;
    const custoTotal = editedFicha.componentes.reduce((acc, curr) => acc + curr.subtotal, 0);
    const precoVenda = parseFloat(editedFicha.precoVenda.toString()) || 0;
    const cmv = precoVenda > 0 ? custoTotal / precoVenda : 0;
    const markup = custoTotal > 0 ? (precoVenda - custoTotal) / custoTotal : 0;

    setEditedFicha({
      ...editedFicha,
      custoTotal,
      cmv,
      markup
    });
  };

  const handleSave = () => {
    if (!editedFicha) return;
    // Recalcular totais antes de salvar
    const custoTotal = editedFicha.componentes.reduce((acc, curr) => acc + curr.subtotal, 0);
    const precoVenda = parseFloat(editedFicha.precoVenda.toString()) || 0;
    const cmv = precoVenda > 0 ? custoTotal / precoVenda : 0;
    const markup = custoTotal > 0 ? (precoVenda - custoTotal) / custoTotal : 0;

    const finalFicha = {
      ...editedFicha,
      custoTotal,
      cmv,
      markup
    };

    onSave(finalFicha);
    toast.success("Ficha técnica salva com sucesso!");
    onClose();
  };

  if (!editedFicha) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{ficha ? "Editar Ficha Técnica" : "Nova Ficha Técnica"}</DialogTitle>
          <DialogDescription>Preencha os detalhes da receita, insumos e modo de preparo.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="produto">Nome do Produto</Label>
              <Input 
                id="produto" 
                value={editedFicha.produto} 
                onChange={(e) => handleInputChange("produto", e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id">Código (ID)</Label>
              <Input 
                id="id" 
                value={editedFicha.id} 
                onChange={(e) => handleInputChange("id", e.target.value)} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rendimento">Rendimento Base</Label>
              <Input 
                id="rendimento" 
                type="number" 
                value={editedFicha.rendimentoBase} 
                onChange={(e) => handleInputChange("rendimentoBase", parseFloat(e.target.value))} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unidade">Unidade</Label>
              <Input 
                id="unidade" 
                value={editedFicha.unidadeRendimento} 
                onChange={(e) => handleInputChange("unidadeRendimento", e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precoVenda">Preço de Venda (R$)</Label>
              <Input 
                id="precoVenda" 
                type="number" 
                step="0.01"
                value={editedFicha.precoVenda} 
                onChange={(e) => handleInputChange("precoVenda", parseFloat(e.target.value))} 
                onBlur={calculateTotals}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdvId">Código PDV (Saipos)</Label>
              <Input 
                id="pdvId" 
                value={editedFicha.pdvId || ""} 
                onChange={(e) => handleInputChange("pdvId", e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Componentes / Insumos</Label>
              <Button size="sm" variant="outline" onClick={addComponente} type="button">
                <Plus className="h-4 w-4 mr-2" /> Adicionar Insumo
              </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Insumo</TableHead>
                    <TableHead className="w-[100px]">Qtd</TableHead>
                    <TableHead className="w-[80px]">Unid.</TableHead>
                    <TableHead className="w-[120px]">Custo Unit.</TableHead>
                    <TableHead className="w-[120px]">Subtotal</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editedFicha.componentes.map((comp, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Input 
                          value={comp.nome} 
                          onChange={(e) => handleComponenteChange(idx, "nome", e.target.value)}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          value={comp.quantidade} 
                          onChange={(e) => handleComponenteChange(idx, "quantidade", e.target.value)}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={comp.unidade} 
                          onChange={(e) => handleComponenteChange(idx, "unidade", e.target.value)}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          step="0.01"
                          value={comp.custoUnitario} 
                          onChange={(e) => handleComponenteChange(idx, "custoUnitario", e.target.value)}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        R$ {comp.subtotal.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive/90"
                          onClick={() => removeComponente(idx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end gap-4 text-sm font-bold mt-2">
              <div>Custo Total: <span className="text-destructive">R$ {editedFicha.componentes.reduce((acc, curr) => acc + curr.subtotal, 0).toFixed(2)}</span></div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modoPreparo">Modo de Preparo</Label>
            <Textarea 
              id="modoPreparo" 
              value={editedFicha.modoPreparo || ""} 
              onChange={(e) => handleInputChange("modoPreparo", e.target.value)} 
              className="min-h-[150px]"
              placeholder="Descreva o passo a passo da receita..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Salvar Ficha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
