// Dados mockados baseados nas planilhas analisadas

export interface Insumo {
  id: string;
  nome: string;
  unidade: string;
  categoria: string;
  estoqueAtual: number;
  estoqueMinimo: number;
  custoUnitario: number;
  status: 'Normal' | 'Baixo' | 'Crítico';
  ultimaConferencia: string;
  ativo: boolean;
}

export interface FichaTecnica {
  id: string;
  produto: string;
  custoTotal: number;
  precoVenda: number;
  markup: number;
  cmv: number;
  componentes: Componente[];
}

export interface Componente {
  insumoId: string;
  nome: string;
  unidade: string;
  quantidade: number;
  custoUnitario: number;
  subtotal: number;
}

export const insumos: Insumo[] = [
  { id: "4196969", nome: "(IN) Açucar demerara", unidade: "Kg", categoria: "Açúcar e Derivados", estoqueAtual: 2, estoqueMinimo: 5, custoUnitario: 4.50, status: "Crítico", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4196997", nome: "(IN) Alface americano", unidade: "Un", categoria: "Hortifrutti", estoqueAtual: 3, estoqueMinimo: 10, custoUnitario: 2.50, status: "Baixo", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4341481", nome: "(IN) BACON FATIADO", unidade: "Kg", categoria: "Carnes", estoqueAtual: 15, estoqueMinimo: 5, custoUnitario: 35.90, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4341475", nome: "(IN) BACON MANTA", unidade: "Kg", categoria: "Carnes", estoqueAtual: 1.3, estoqueMinimo: 2, custoUnitario: 28.90, status: "Baixo", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4213716", nome: "(IN) Cebola Roxa", unidade: "Kg", categoria: "Hortifrutti", estoqueAtual: 8, estoqueMinimo: 3, custoUnitario: 6.50, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4213723", nome: "(IN) Manteiga", unidade: "Un", categoria: "Laticínios e Frios", estoqueAtual: 5, estoqueMinimo: 10, custoUnitario: 26.29, status: "Baixo", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4197252", nome: "(IN) Queijo prato", unidade: "Kg", categoria: "Laticínios e Frios", estoqueAtual: 12, estoqueMinimo: 5, custoUnitario: 45.00, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4339810", nome: "(IN) Tomate", unidade: "Kg", categoria: "Hortifrutti", estoqueAtual: 350, estoqueMinimo: 50, custoUnitario: 5.90, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4803940", nome: "(IN) ACHOCOLATADO", unidade: "Kg", categoria: "Confeitaria", estoqueAtual: 600, estoqueMinimo: 100, custoUnitario: 30.90, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4218390", nome: "(IN) Açúcar cristal", unidade: "Kg", categoria: "Açúcar e Derivados", estoqueAtual: 1, estoqueMinimo: 5, custoUnitario: 3.39, status: "Crítico", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "4196993", nome: "Água com gás", unidade: "Un", categoria: "Bebidas", estoqueAtual: 32, estoqueMinimo: 24, custoUnitario: 1.50, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "1001", nome: "(IN) Creme de Leite", unidade: "L", categoria: "Laticínios e Frios", estoqueAtual: 12, estoqueMinimo: 5, custoUnitario: 3.69, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "1002", nome: "(IN) Cupuaçu - polpa", unidade: "Kg", categoria: "Hortifrutti", estoqueAtual: 5, estoqueMinimo: 2, custoUnitario: 22.09, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "1003", nome: "(IN) Farinha de trigo", unidade: "Kg", categoria: "Mercearia", estoqueAtual: 10, estoqueMinimo: 5, custoUnitario: 6.19, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "1004", nome: "(IN) Leite condensado", unidade: "Un", categoria: "Laticínios e Frios", estoqueAtual: 24, estoqueMinimo: 12, custoUnitario: 7.59, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "1005", nome: "(IN) Ovo", unidade: "Un", categoria: "Hortifrutti", estoqueAtual: 60, estoqueMinimo: 30, custoUnitario: 0.83, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "1006", nome: "(IN) Cachaça", unidade: "L", categoria: "Bebidas", estoqueAtual: 2, estoqueMinimo: 1, custoUnitario: 65.00, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "1007", nome: "(IN) Chocolate meio amargo", unidade: "Kg", categoria: "Confeitaria", estoqueAtual: 3, estoqueMinimo: 1, custoUnitario: 45.00, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
  { id: "1008", nome: "(IN) Leite Líquido", unidade: "L", categoria: "Laticínios e Frios", estoqueAtual: 12, estoqueMinimo: 6, custoUnitario: 7.59, status: "Normal", ultimaConferencia: "14/12/2025", ativo: true },
];

export const fichasTecnicas: FichaTecnica[] = [
  {
    id: "FT001",
    produto: "(IT) BROWNIE C",
    custoTotal: 3.34,
    precoVenda: 12.00,
    markup: 3.59,
    cmv: 0.278,
    componentes: [
      { insumoId: "4803940", nome: "(IN) ACHOCOLATADO", unidade: "Kg", quantidade: 0.2, custoUnitario: 30.90, subtotal: 6.18 },
      { insumoId: "4218390", nome: "(IN) Açúcar cristal", unidade: "Kg", quantidade: 0.55, custoUnitario: 3.39, subtotal: 1.86 },
      { insumoId: "1001", nome: "(IN) Creme de Leite", unidade: "L", quantidade: 0.4, custoUnitario: 3.69, subtotal: 1.48 },
      { insumoId: "1002", nome: "(IN) Cupuaçu - polpa", unidade: "Kg", quantidade: 0.6, custoUnitario: 22.09, subtotal: 13.25 },
      { insumoId: "1003", nome: "(IN) Farinha de trigo", unidade: "Kg", quantidade: 0.42, custoUnitario: 6.19, subtotal: 2.60 },
      { insumoId: "1004", nome: "(IN) Leite condensado", unidade: "Un", quantidade: 2, custoUnitario: 7.59, subtotal: 15.18 },
      { insumoId: "4213723", nome: "(IN) Manteiga", unidade: "Un", quantidade: 0.3, custoUnitario: 26.29, subtotal: 7.89 },
      { insumoId: "1005", nome: "(IN) Ovo", unidade: "Un", quantidade: 6, custoUnitario: 0.83, subtotal: 4.98 },
    ]
  },
  {
    id: "FT002",
    produto: "(IT) COCA-COLA",
    custoTotal: 3.00,
    precoVenda: 6.00,
    markup: 2.00,
    cmv: 0.50,
    componentes: [
      { insumoId: "2001", nome: "(IT) Coca-cola C", unidade: "Un", quantidade: 1, custoUnitario: 3.00, subtotal: 3.00 },
    ]
  },
  {
    id: "FT003",
    produto: "(IT) PANACOTA",
    custoTotal: 0.83,
    precoVenda: 15.00,
    markup: 18.07,
    cmv: 0.055,
    componentes: [
      { insumoId: "4218390", nome: "(IN) Açúcar cristal", unidade: "Kg", quantidade: 0.15, custoUnitario: 3.39, subtotal: 0.51 },
      { insumoId: "1006", nome: "(IN) Cachaça", unidade: "L", quantidade: 0.15, custoUnitario: 65.00, subtotal: 9.75 },
      { insumoId: "1007", nome: "(IN) Chocolate meio amargo", unidade: "Kg", quantidade: 0.3, custoUnitario: 45.00, subtotal: 13.50 },
      { insumoId: "1001", nome: "(IN) Creme de Leite", unidade: "L", quantidade: 0.9, custoUnitario: 3.69, subtotal: 3.32 },
      { insumoId: "1008", nome: "(IN) Leite Líquido", unidade: "L", quantidade: 0.3, custoUnitario: 7.59, subtotal: 2.28 },
    ]
  }
];
