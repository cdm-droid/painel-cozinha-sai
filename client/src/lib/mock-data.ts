// Dados gerados a partir do arquivo fornecido pelo usuário

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
  rendimentoBase: number;
  unidadeRendimento: string;
  modoPreparo: string;
  pdvId?: string;
  nomeOnline?: string;
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
  {
    "id": "56601544",
    "nome": "(IN) ACHOCOLATADO",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 30.9,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "89623228",
    "nome": "(IN) Açúcar cristal",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 3.39,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "17849460",
    "nome": "(IN) Creme de Leite",
    "unidade": "L",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 3.69,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "21716329",
    "nome": "(IN) Cupuaçu - polpa",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 22.09,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "44934463",
    "nome": "(IN) Farinha de trigo",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 6.19,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "71730223",
    "nome": "(IN) Leite condensado 395g",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 7.59,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "72358735",
    "nome": "(IN) Manteiga",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 26.29,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "43996400",
    "nome": "(IN) Ovo",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.83,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "63557892",
    "nome": "(IT) Coca-cola Original Lata 350ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 3.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "14098307",
    "nome": "(IN) Cachaça",
    "unidade": "L",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 65.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "19905445",
    "nome": "(IN) Chocolate meio amargo",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "92110908",
    "nome": "(IN) Cumaru Semente",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "65601023",
    "nome": "(IN) Gelatina sem Sabor",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "20101576",
    "nome": "(IN) Leite Líquido L",
    "unidade": "L",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 7.59,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "78355662",
    "nome": "(IN) Gengibre",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 28.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "26515060",
    "nome": "(IN) Maracujá - Polpa",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 13.09,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "83874981",
    "nome": "(IN) Manjericão Maço",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 4.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "36524863",
    "nome": "(IN) Morango Congelado",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 25.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "75455846",
    "nome": "(IN) BACON FATIADO",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 35.99,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "58764925",
    "nome": "(IN) Açucar demerara",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 4.09,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "76291795",
    "nome": "(IN) BACON MANTA",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 37.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "54158700",
    "nome": "(IN) Castanha do Pará",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 170.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "60893474",
    "nome": "(IN) Cebola Nacional",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 5.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "81833235",
    "nome": "(IN) Pimenta do Reino Moída",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 5.39,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "12455699",
    "nome": "(IN) Sal Fino",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 4.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "25324567",
    "nome": "(IN) Carne Moída Blend",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 26.99,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "42420378",
    "nome": "(IN) Rapadura",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 7.29,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "38684297",
    "nome": "(IN) Cebola Roxa",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 9.49,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "37868723",
    "nome": "(IN) Pimenta dedo de moça",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "87597053",
    "nome": "(IN) Vinagre de maçã",
    "unidade": "L",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 10.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "15125443",
    "nome": "(PR) Coxa/Sobrecoxa Frango Mar. Mostarda/Alho",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 23.03,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "88284264",
    "nome": "(PR) Farinhas Trigo e Flocão Para Empanação",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 4.32,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "48670782",
    "nome": "(IN) Alho",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 38.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "56647279",
    "nome": "(IN) Coxa/Sobrecoxa de Frango Desossada",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 21.99,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "51097696",
    "nome": "(IN) Flocão - Farinha de Milho em Flocos",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 1.89,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "79295913",
    "nome": "(IN) Maionese 2,8kg",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 11.9,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "89748303",
    "nome": "(IN) Orégano seco",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 50.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "18862298",
    "nome": "(PR) Banha - aproveitamento bacon",
    "unidade": "L",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "23800048",
    "nome": "(IN) Cheiro verde",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 1.79,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "64695431",
    "nome": "(IN) Limão Taiti",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 13.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "32297396",
    "nome": "(IN) Salsa Maço",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 4.48,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "13103816",
    "nome": "(IN) Catchup",
    "unidade": "L",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "59319635",
    "nome": "(IN) Páprica Defumada Picante",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 100.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "15022734",
    "nome": "(IN) Pimenta calabresa Desidratada",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.48,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "79542065",
    "nome": "(IN) Mel",
    "unidade": "L",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 52.48,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "18635494",
    "nome": "(IN) Mostarda Amarela",
    "unidade": "L",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 12.49,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "62140729",
    "nome": "(PR) Mostarda hidratada",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 18.05,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "57234043",
    "nome": "(IN) Louro Folhas",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 100.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "86816788",
    "nome": "(IN) Mostarda em Grãos",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "18463465",
    "nome": "(IN) Pimenta do Reino em Grãos",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 100.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "23609489",
    "nome": "Água filtrada",
    "unidade": "L",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "83367037",
    "nome": "(IN) Beterraba",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 6.99,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "87246460",
    "nome": "(IN) Pepino in natura",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 8.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "82467961",
    "nome": "(IN) Molho de Tomate",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 20.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "45515701",
    "nome": "(PR) Tomates fermentados",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 23.09,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "80323168",
    "nome": "(IN) Coentro em grãos",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "37543219",
    "nome": "(IN) Tomate",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 14.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "83364230",
    "nome": "(IN) Alface americano",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 7.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "77244720",
    "nome": "(PR) Bacon crocante",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 71.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "64602366",
    "nome": "(PR) Cebola Caramelizada com Rapadura",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 13.19,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "73641178",
    "nome": "(PR) Bacon em Cubos Com Castanha do Pará",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 65.85,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "48110550",
    "nome": "(PR) Picles de Cebola Roxa",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 32.2,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "37143991",
    "nome": "(PR) Picles de Pepino",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 22.87,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "51001027",
    "nome": "(IN) Queijo Coalho",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 50.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "72854117",
    "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 1.96,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "34039034",
    "nome": "(IN) Rúcula Maço",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 4.48,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "69118977",
    "nome": "(PR) Tomate Tomatudo",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 31.04,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "87172691",
    "nome": "(IT) Água Sem Gás",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "53141940",
    "nome": "(IT) Água com Gás",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 1.1,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "93407793",
    "nome": "(IN) Pão Brioche",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 1.5,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "84351897",
    "nome": "(PR) Blend 150g",
    "unidade": "Un",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 4.35,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "96855312",
    "nome": "(PR) Chutney de Cupuaçu Cachaça e Cebola",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 19.4,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "34671701",
    "nome": "(IN) Batata Pré-frita Congelada",
    "unidade": "Kg",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 32.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "10633048",
    "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
    "unidade": "L",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 35.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "38456757",
    "nome": "(IN) Páprica doce",
    "unidade": "Un",
    "categoria": "Insumo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "46769774",
    "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 27.7,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "39939023",
    "nome": "(PR) Maionese Verde - Coentro e Limão",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 15.3,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "36864564",
    "nome": "(IT) Coca-cola Original Mini Pet 200ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.29,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "83391288",
    "nome": "Saî Puro - Burguer com maionese de alho",
    "unidade": "Un",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 8.74,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "80178611",
    "nome": "(PR) Maionese de Alho e Orégano",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 14.88,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "78910390",
    "nome": "(PR) Blend 120g",
    "unidade": "Un",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 3.48,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "85445669",
    "nome": "(PR) Maionese Vermelha - Páprica e Calabresa",
    "unidade": "Kg",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 12.82,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "17618571",
    "nome": "(IT) Catchup Sachê UN",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.28,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "87884880",
    "nome": "(IT) Maionese Sachê (unidade)",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.17,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "37686736",
    "nome": "(IT) Coca-cola Original 1L",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 5.69,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "27433471",
    "nome": "(IT) Coca-cola ZERO Açúcar Lata 350ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.9,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "14900721",
    "nome": "(IT) Coca-cola Original Lata 220ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.17,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "17565700",
    "nome": "(IT) Coca-cola ZERO Açúcar 1,5L",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 6.52,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "59880215",
    "nome": "(IT) Coca-cola ZERO Açúcar Lata 220ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.19,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "83816782",
    "nome": "(IT) Coca-cola ZERO Açúcar 600ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 3.97,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "38320194",
    "nome": "Batatinha - porção individual",
    "unidade": "Un",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 6.82,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "19614695",
    "nome": "Burguer clássico Completo - Saî de Classe",
    "unidade": "Un",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 12.6,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "86393637",
    "nome": "(IT) Tubaína Monte Roraima Pet 350ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.12,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "89705537",
    "nome": "Burguer com Bacon e Castanha e Molho de Cupu e Cachaça - Sa da Mata",
    "unidade": "Un",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 13.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "13916174",
    "nome": "(IT) Guaraná Antártica Original Lata 220ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.68,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "79097937",
    "nome": "(IT) Guaraná Antártica Original 1L",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 4.98,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "91200931",
    "nome": "(IT) Guaraná Antártica Lata 350ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 3.6,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "65582897",
    "nome": "(IT) Baré 1L",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "38217894",
    "nome": "(IT) Guaraná Antártica ZERO Lata 350ml",
    "unidade": "Un",
    "categoria": "Item",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 3.48,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "13752446",
    "nome": "(EM) Guardanapo Embalado Delivery",
    "unidade": "Un",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 0.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "33351335",
    "nome": "(PR) Mostarda da Casa com Mel",
    "unidade": "L",
    "categoria": "Preparo",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 26.22,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "61091425",
    "nome": "Pão australiano 85g",
    "unidade": "Un",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.0,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "23002728",
    "nome": "bicudinho - sobrecoxas de frango crocante - individual",
    "unidade": "Un",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 6.35,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "27152919",
    "nome": "Blend 120g",
    "unidade": "Un",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 3.48,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  },
  {
    "id": "34297316",
    "nome": "maionese de alho e orégano",
    "unidade": "Un",
    "categoria": "Geral",
    "estoqueAtual": 0,
    "estoqueMinimo": 10,
    "custoUnitario": 2.02,
    "status": "Normal",
    "ultimaConferencia": "17/12/2025",
    "ativo": true
  }
];

export const fichasTecnicas: FichaTecnica[] = [
  {
    "id": "FT001",
    "produto": "(IT) BROWNIE COM CREME DE CUPUAÇU",
    "custoTotal": 3.34,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "56601544",
        "nome": "(IN) ACHOCOLATADO",
        "unidade": "Kg",
        "quantidade": 0.2,
        "custoUnitario": 30.9,
        "subtotal": 6.18
      },
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.55,
        "custoUnitario": 3.39,
        "subtotal": 1.86
      },
      {
        "insumoId": "17849460",
        "nome": "(IN) Creme de Leite",
        "unidade": "L",
        "quantidade": 0.4,
        "custoUnitario": 3.69,
        "subtotal": 1.48
      },
      {
        "insumoId": "21716329",
        "nome": "(IN) Cupuaçu - polpa",
        "unidade": "Kg",
        "quantidade": 0.6,
        "custoUnitario": 22.09,
        "subtotal": 13.25
      },
      {
        "insumoId": "44934463",
        "nome": "(IN) Farinha de trigo",
        "unidade": "Kg",
        "quantidade": 0.42,
        "custoUnitario": 6.19,
        "subtotal": 2.6
      },
      {
        "insumoId": "71730223",
        "nome": "(IN) Leite condensado 395g",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 7.59,
        "subtotal": 15.18
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.3,
        "custoUnitario": 26.29,
        "subtotal": 7.89
      },
      {
        "insumoId": "43996400",
        "nome": "(IN) Ovo",
        "unidade": "Un",
        "quantidade": 6.0,
        "custoUnitario": 0.83,
        "subtotal": 4.98
      }
    ]
  },
  {
    "id": "FT002",
    "produto": "(IT) COCA-COLA ORIGINAL LATA 350ML",
    "custoTotal": 3.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "63557892",
        "nome": "(IT) Coca-cola Original Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.0,
        "subtotal": 3.0
      }
    ]
  },
  {
    "id": "FT003",
    "produto": "(IT) PANACOTA",
    "custoTotal": 0.83,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 3.39,
        "subtotal": 0.51
      },
      {
        "insumoId": "14098307",
        "nome": "(IN) Cachaça",
        "unidade": "L",
        "quantidade": 0.15,
        "custoUnitario": 65.0,
        "subtotal": 9.75
      },
      {
        "insumoId": "19905445",
        "nome": "(IN) Chocolate meio amargo",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "17849460",
        "nome": "(IN) Creme de Leite",
        "unidade": "L",
        "quantidade": 0.9,
        "custoUnitario": 3.69,
        "subtotal": 3.32
      },
      {
        "insumoId": "92110908",
        "nome": "(IN) Cumaru Semente",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "65601023",
        "nome": "(IN) Gelatina sem Sabor",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "20101576",
        "nome": "(IN) Leite Líquido L",
        "unidade": "L",
        "quantidade": 0.3,
        "custoUnitario": 7.59,
        "subtotal": 2.28
      }
    ]
  },
  {
    "id": "FT004",
    "produto": "(IT) SUCO DE MARACUJÁ C/ GENGIBRE - 500ML",
    "custoTotal": 3.7,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 3.39,
        "subtotal": 0.14
      },
      {
        "insumoId": "78355662",
        "nome": "(IN) Gengibre",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 28.98,
        "subtotal": 0.29
      },
      {
        "insumoId": "26515060",
        "nome": "(IN) Maracujá - Polpa",
        "unidade": "Kg",
        "quantidade": 0.25,
        "custoUnitario": 13.09,
        "subtotal": 3.27
      }
    ]
  },
  {
    "id": "FT005",
    "produto": "(IT) SUCO DE MARACUJÁ COM GENGIBRE - 300ML",
    "custoTotal": 2.19,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 3.39,
        "subtotal": 0.08
      },
      {
        "insumoId": "78355662",
        "nome": "(IN) Gengibre",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 28.98,
        "subtotal": 0.14
      },
      {
        "insumoId": "26515060",
        "nome": "(IN) Maracujá - Polpa",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 13.09,
        "subtotal": 1.96
      }
    ]
  },
  {
    "id": "FT006",
    "produto": "(IT) SUCO DE MORANGO C/ MANJERICÃO - 300ML",
    "custoTotal": 3.85,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 3.39,
        "subtotal": 0.08
      },
      {
        "insumoId": "83874981",
        "nome": "(IN) Manjericão Maço",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 4.0,
        "subtotal": 0.02
      },
      {
        "insumoId": "36524863",
        "nome": "(IN) Morango Congelado",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 25.0,
        "subtotal": 3.75
      }
    ]
  },
  {
    "id": "FT007",
    "produto": "(IT) SUCO DE MORANGO C/ MANJERICÃO - 500ML",
    "custoTotal": 6.43,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 3.39,
        "subtotal": 0.14
      },
      {
        "insumoId": "83874981",
        "nome": "(IN) Manjericão Maço",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "36524863",
        "nome": "(IN) Morango Congelado",
        "unidade": "Kg",
        "quantidade": 0.25,
        "custoUnitario": 25.0,
        "subtotal": 6.25
      }
    ]
  },
  {
    "id": "FT008",
    "produto": "(PR) BACON CROCANTE",
    "custoTotal": 71.98,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "75455846",
        "nome": "(IN) BACON FATIADO",
        "unidade": "Kg",
        "quantidade": 1.0,
        "custoUnitario": 35.99,
        "subtotal": 35.99
      }
    ]
  },
  {
    "id": "FT009",
    "produto": "(PR) BACON EM CUBOS COM CASTANHA DO PARÁ",
    "custoTotal": 65.85,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "58764925",
        "nome": "(IN) Açucar demerara",
        "unidade": "Kg",
        "quantidade": 0.2,
        "custoUnitario": 4.09,
        "subtotal": 0.82
      },
      {
        "insumoId": "76291795",
        "nome": "(IN) BACON MANTA",
        "unidade": "Kg",
        "quantidade": 2.0,
        "custoUnitario": 37.98,
        "subtotal": 75.96
      },
      {
        "insumoId": "54158700",
        "nome": "(IN) Castanha do Pará",
        "unidade": "Kg",
        "quantidade": 0.25,
        "custoUnitario": 170.0,
        "subtotal": 42.5
      },
      {
        "insumoId": "60893474",
        "nome": "(IN) Cebola Nacional",
        "unidade": "Kg",
        "quantidade": 2.0,
        "custoUnitario": 5.98,
        "subtotal": 11.96
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.05,
        "custoUnitario": 5.39,
        "subtotal": 0.27
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.05,
        "custoUnitario": 4.0,
        "subtotal": 0.2
      }
    ]
  },
  {
    "id": "FT010",
    "produto": "(PR) BLEND 120G",
    "custoTotal": 3.48,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.12,
        "custoUnitario": 26.99,
        "subtotal": 3.24
      }
    ]
  },
  {
    "id": "FT011",
    "produto": "(PR) BLEND 150G",
    "custoTotal": 4.35,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 26.99,
        "subtotal": 4.05
      }
    ]
  },
  {
    "id": "FT012",
    "produto": "(PR) CEBOLA CARAMELIZADA COM RAPADURA",
    "custoTotal": 13.19,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "60893474",
        "nome": "(IN) Cebola Nacional",
        "unidade": "Kg",
        "quantidade": 1.0,
        "custoUnitario": 5.98,
        "subtotal": 5.98
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 5.39,
        "subtotal": 0.03
      },
      {
        "insumoId": "42420378",
        "nome": "(IN) Rapadura",
        "unidade": "Kg",
        "quantidade": 0.075,
        "custoUnitario": 7.29,
        "subtotal": 0.55
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      }
    ]
  },
  {
    "id": "FT013",
    "produto": "(PR) CHUTNEY DE CUPUAÇU CACHAÇA E CEBOLA",
    "custoTotal": 19.4,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "58764925",
        "nome": "(IN) Açucar demerara",
        "unidade": "Kg",
        "quantidade": 0.08,
        "custoUnitario": 4.09,
        "subtotal": 0.33
      },
      {
        "insumoId": "14098307",
        "nome": "(IN) Cachaça",
        "unidade": "L",
        "quantidade": 0.14,
        "custoUnitario": 65.0,
        "subtotal": 9.1
      },
      {
        "insumoId": "38684297",
        "nome": "(IN) Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 2.5,
        "custoUnitario": 9.49,
        "subtotal": 23.73
      },
      {
        "insumoId": "21716329",
        "nome": "(IN) Cupuaçu - polpa",
        "unidade": "Kg",
        "quantidade": 2.0,
        "custoUnitario": 22.09,
        "subtotal": 44.18
      },
      {
        "insumoId": "37868723",
        "nome": "(IN) Pimenta dedo de moça",
        "unidade": "Kg",
        "quantidade": 0.0,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "87597053",
        "nome": "(IN) Vinagre de maçã",
        "unidade": "L",
        "quantidade": 0.05,
        "custoUnitario": 10.98,
        "subtotal": 0.55
      }
    ]
  },
  {
    "id": "FT014",
    "produto": "(PR) COXA/SOBRECOXA DE FRANGO EMPANADAS",
    "custoTotal": 27.7,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "43996400",
        "nome": "(IN) Ovo",
        "unidade": "Un",
        "quantidade": 5.0,
        "custoUnitario": 0.83,
        "subtotal": 4.15
      },
      {
        "insumoId": "15125443",
        "nome": "(PR) Coxa/Sobrecoxa Frango Mar. Mostarda/Alho",
        "unidade": "Kg",
        "quantidade": 1.0,
        "custoUnitario": 23.03,
        "subtotal": 23.03
      },
      {
        "insumoId": "88284264",
        "nome": "(PR) Farinhas Trigo e Flocão Para Empanação",
        "unidade": "Kg",
        "quantidade": 0.12,
        "custoUnitario": 4.32,
        "subtotal": 0.52
      }
    ]
  },
  {
    "id": "FT015",
    "produto": "(PR) COXA/SOBRECOXA FRANGO MAR. MOSTARDA/ALHO",
    "custoTotal": 23.03,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "58764925",
        "nome": "(IN) Açucar demerara",
        "unidade": "Kg",
        "quantidade": 0.06,
        "custoUnitario": 4.09,
        "subtotal": 0.25
      },
      {
        "insumoId": "48670782",
        "nome": "(IN) Alho",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 38.98,
        "subtotal": 0.39
      },
      {
        "insumoId": "56647279",
        "nome": "(IN) Coxa/Sobrecoxa de Frango Desossada",
        "unidade": "Kg",
        "quantidade": 1.0,
        "custoUnitario": 21.99,
        "subtotal": 21.99
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 4.0,
        "subtotal": 0.16
      },
      {
        "insumoId": "87597053",
        "nome": "(IN) Vinagre de maçã",
        "unidade": "L",
        "quantidade": 0.03,
        "custoUnitario": 10.98,
        "subtotal": 0.33
      }
    ]
  },
  {
    "id": "FT016",
    "produto": "(PR) FARINHAS TRIGO E FLOCÃO PARA EMPANAÇÃO",
    "custoTotal": 4.32,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "44934463",
        "nome": "(IN) Farinha de trigo",
        "unidade": "Kg",
        "quantidade": 0.5,
        "custoUnitario": 6.19,
        "subtotal": 3.1
      },
      {
        "insumoId": "51097696",
        "nome": "(IN) Flocão - Farinha de Milho em Flocos",
        "unidade": "Kg",
        "quantidade": 0.5,
        "custoUnitario": 1.89,
        "subtotal": 0.95
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 5.39,
        "subtotal": 0.16
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 4.0,
        "subtotal": 0.12
      }
    ]
  },
  {
    "id": "FT017",
    "produto": "(PR) MAIONESE DE ALHO E ORÉGANO",
    "custoTotal": 14.88,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "48670782",
        "nome": "(IN) Alho",
        "unidade": "Kg",
        "quantidade": 0.21,
        "custoUnitario": 38.98,
        "subtotal": 8.19
      },
      {
        "insumoId": "79295913",
        "nome": "(IN) Maionese 2,8kg",
        "unidade": "Kg",
        "quantidade": 2.8,
        "custoUnitario": 11.9,
        "subtotal": 33.32
      },
      {
        "insumoId": "89748303",
        "nome": "(IN) Orégano seco",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 50.0,
        "subtotal": 0.15
      },
      {
        "insumoId": "18862298",
        "nome": "(PR) Banha - aproveitamento bacon",
        "unidade": "L",
        "quantidade": 0.1,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT018",
    "produto": "(PR) MAIONESE VERDE - COENTRO E LIMÃO",
    "custoTotal": 15.3,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "23800048",
        "nome": "(IN) Cheiro verde",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.79,
        "subtotal": 1.79
      },
      {
        "insumoId": "64695431",
        "nome": "(IN) Limão Taiti",
        "unidade": "Kg",
        "quantidade": 0.25,
        "custoUnitario": 13.0,
        "subtotal": 3.25
      },
      {
        "insumoId": "79295913",
        "nome": "(IN) Maionese 2,8kg",
        "unidade": "Kg",
        "quantidade": 2.8,
        "custoUnitario": 11.9,
        "subtotal": 33.32
      },
      {
        "insumoId": "32297396",
        "nome": "(IN) Salsa Maço",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.48,
        "subtotal": 4.48
      }
    ]
  },
  {
    "id": "FT019",
    "produto": "(PR) MAIONESE VERMELHA - PÁPRICA E CALABRESA",
    "custoTotal": 12.82,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "13103816",
        "nome": "(IN) Catchup",
        "unidade": "L",
        "quantidade": 0.24,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "79295913",
        "nome": "(IN) Maionese 2,8kg",
        "unidade": "Kg",
        "quantidade": 2.8,
        "custoUnitario": 11.9,
        "subtotal": 33.32
      },
      {
        "insumoId": "59319635",
        "nome": "(IN) Páprica Defumada Picante",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 100.0,
        "subtotal": 2.5
      },
      {
        "insumoId": "15022734",
        "nome": "(IN) Pimenta calabresa Desidratada",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 2.48,
        "subtotal": 0.06
      }
    ]
  },
  {
    "id": "FT020",
    "produto": "(PR) MOSTARDA DA CASA COM MEL",
    "custoTotal": 26.22,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "79542065",
        "nome": "(IN) Mel",
        "unidade": "L",
        "quantidade": 0.08,
        "custoUnitario": 52.48,
        "subtotal": 4.2
      },
      {
        "insumoId": "18635494",
        "nome": "(IN) Mostarda Amarela",
        "unidade": "L",
        "quantidade": 0.3,
        "custoUnitario": 12.49,
        "subtotal": 3.75
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 5.39,
        "subtotal": 0.02
      },
      {
        "insumoId": "62140729",
        "nome": "(PR) Mostarda hidratada",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 18.05,
        "subtotal": 5.42
      }
    ]
  },
  {
    "id": "FT021",
    "produto": "(PR) MOSTARDA HIDRATADA",
    "custoTotal": 18.05,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 3.39,
        "subtotal": 0.1
      },
      {
        "insumoId": "48670782",
        "nome": "(IN) Alho",
        "unidade": "Kg",
        "quantidade": 0.05,
        "custoUnitario": 38.98,
        "subtotal": 1.95
      },
      {
        "insumoId": "57234043",
        "nome": "(IN) Louro Folhas",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 100.0,
        "subtotal": 0.3
      },
      {
        "insumoId": "86816788",
        "nome": "(IN) Mostarda em Grãos",
        "unidade": "Kg",
        "quantidade": 0.25,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 100.0,
        "subtotal": 0.3
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 4.0,
        "subtotal": 0.02
      },
      {
        "insumoId": "87597053",
        "nome": "(IN) Vinagre de maçã",
        "unidade": "L",
        "quantidade": 0.25,
        "custoUnitario": 10.98,
        "subtotal": 2.75
      },
      {
        "insumoId": "23609489",
        "nome": "Água filtrada",
        "unidade": "L",
        "quantidade": 0.25,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT022",
    "produto": "(PR) PICLES DE CEBOLA ROXA",
    "custoTotal": 32.2,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 3.39,
        "subtotal": 0.1
      },
      {
        "insumoId": "48670782",
        "nome": "(IN) Alho",
        "unidade": "Kg",
        "quantidade": 0.05,
        "custoUnitario": 38.98,
        "subtotal": 1.95
      },
      {
        "insumoId": "83367037",
        "nome": "(IN) Beterraba",
        "unidade": "Kg",
        "quantidade": 0.2,
        "custoUnitario": 6.99,
        "subtotal": 1.4
      },
      {
        "insumoId": "38684297",
        "nome": "(IN) Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 9.49,
        "subtotal": 2.85
      },
      {
        "insumoId": "57234043",
        "nome": "(IN) Louro Folhas",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 100.0,
        "subtotal": 0.3
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 100.0,
        "subtotal": 0.3
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 4.0,
        "subtotal": 0.02
      },
      {
        "insumoId": "87597053",
        "nome": "(IN) Vinagre de maçã",
        "unidade": "L",
        "quantidade": 0.25,
        "custoUnitario": 10.98,
        "subtotal": 2.75
      },
      {
        "insumoId": "23609489",
        "nome": "Água filtrada",
        "unidade": "L",
        "quantidade": 0.25,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT023",
    "produto": "(PR) PICLES DE PEPINO",
    "custoTotal": 22.87,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 3.39,
        "subtotal": 0.1
      },
      {
        "insumoId": "57234043",
        "nome": "(IN) Louro Folhas",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 100.0,
        "subtotal": 1.0
      },
      {
        "insumoId": "87246460",
        "nome": "(IN) Pepino in natura",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 8.98,
        "subtotal": 2.69
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 100.0,
        "subtotal": 0.3
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 4.0,
        "subtotal": 0.02
      },
      {
        "insumoId": "87597053",
        "nome": "(IN) Vinagre de maçã",
        "unidade": "L",
        "quantidade": 0.25,
        "custoUnitario": 10.98,
        "subtotal": 2.75
      }
    ]
  },
  {
    "id": "FT024",
    "produto": "(PR) TOMATE TOMATUDO",
    "custoTotal": 31.04,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "48670782",
        "nome": "(IN) Alho",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 38.98,
        "subtotal": 1.17
      },
      {
        "insumoId": "60893474",
        "nome": "(IN) Cebola Nacional",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 5.98,
        "subtotal": 0.18
      },
      {
        "insumoId": "82467961",
        "nome": "(IN) Molho de Tomate",
        "unidade": "Kg",
        "quantidade": 0.35,
        "custoUnitario": 20.0,
        "subtotal": 7.0
      },
      {
        "insumoId": "45515701",
        "nome": "(PR) Tomates fermentados",
        "unidade": "Kg",
        "quantidade": 1.0,
        "custoUnitario": 23.09,
        "subtotal": 23.09
      }
    ]
  },
  {
    "id": "FT025",
    "produto": "(PR) TOMATES FERMENTADOS",
    "custoTotal": 23.09,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "48670782",
        "nome": "(IN) Alho",
        "unidade": "Kg",
        "quantidade": 0.05,
        "custoUnitario": 38.98,
        "subtotal": 1.95
      },
      {
        "insumoId": "80323168",
        "nome": "(IN) Coentro em grãos",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "57234043",
        "nome": "(IN) Louro Folhas",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 100.0,
        "subtotal": 3.0
      },
      {
        "insumoId": "86816788",
        "nome": "(IN) Mostarda em Grãos",
        "unidade": "Kg",
        "quantidade": 0.05,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 100.0,
        "subtotal": 3.0
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 4.0,
        "subtotal": 0.16
      },
      {
        "insumoId": "37543219",
        "nome": "(IN) Tomate",
        "unidade": "Kg",
        "quantidade": 1.0,
        "custoUnitario": 14.98,
        "subtotal": 14.98
      }
    ]
  },
  {
    "id": "FT026",
    "produto": "+ ALFACE",
    "custoTotal": 1.2,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 7.98,
        "subtotal": 1.2
      }
    ]
  },
  {
    "id": "FT027",
    "produto": "+ BACON CROCANTE",
    "custoTotal": 2.04,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 71.98,
        "subtotal": 2.16
      }
    ]
  },
  {
    "id": "FT028",
    "produto": "+ BACON CROCANTE",
    "custoTotal": 2.04,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 71.98,
        "subtotal": 2.16
      }
    ]
  },
  {
    "id": "FT029",
    "produto": "+ BACON CROCANTE",
    "custoTotal": 2.04,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 71.98,
        "subtotal": 2.16
      }
    ]
  },
  {
    "id": "FT030",
    "produto": "+ BLEND 120G",
    "custoTotal": 3.48,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.12,
        "custoUnitario": 26.99,
        "subtotal": 3.24
      }
    ]
  },
  {
    "id": "FT031",
    "produto": "+ BLEND 120G",
    "custoTotal": 3.48,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.12,
        "custoUnitario": 26.99,
        "subtotal": 3.24
      }
    ]
  },
  {
    "id": "FT032",
    "produto": "+ BLEND 150G",
    "custoTotal": 4.35,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 26.99,
        "subtotal": 4.05
      }
    ]
  },
  {
    "id": "FT033",
    "produto": "+ BLEND 150G",
    "custoTotal": 4.35,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 26.99,
        "subtotal": 4.05
      }
    ]
  },
  {
    "id": "FT034",
    "produto": "+ BLEND 150G",
    "custoTotal": 4.35,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 26.99,
        "subtotal": 4.05
      }
    ]
  },
  {
    "id": "FT035",
    "produto": "+ CEBOLA CARAMELIZADA COM RAPADURA",
    "custoTotal": 6.97,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "64602366",
        "nome": "(PR) Cebola Caramelizada com Rapadura",
        "unidade": "Kg",
        "quantidade": 0.06,
        "custoUnitario": 13.19,
        "subtotal": 0.79
      }
    ]
  },
  {
    "id": "FT036",
    "produto": "+ CEBOLA CARAMELIZADA COM RAPADURA",
    "custoTotal": 6.97,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "64602366",
        "nome": "(PR) Cebola Caramelizada com Rapadura",
        "unidade": "Kg",
        "quantidade": 0.06,
        "custoUnitario": 13.19,
        "subtotal": 0.79
      }
    ]
  },
  {
    "id": "FT037",
    "produto": "+ CEBOLA CARAMELIZADA COM RAPADURA",
    "custoTotal": 6.97,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "64602366",
        "nome": "(PR) Cebola Caramelizada com Rapadura",
        "unidade": "Kg",
        "quantidade": 0.06,
        "custoUnitario": 13.19,
        "subtotal": 0.79
      }
    ]
  },
  {
    "id": "FT038",
    "produto": "+ CEBOLA ROXA EM RODELAS",
    "custoTotal": 1.9,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38684297",
        "nome": "(IN) Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.2,
        "custoUnitario": 9.49,
        "subtotal": 1.9
      }
    ]
  },
  {
    "id": "FT039",
    "produto": "+ CEBOLA ROXA EM RODELAS",
    "custoTotal": 1.9,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38684297",
        "nome": "(IN) Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.2,
        "custoUnitario": 9.49,
        "subtotal": 1.9
      }
    ]
  },
  {
    "id": "FT040",
    "produto": "+ CEBOLA ROXA EM RODELAS",
    "custoTotal": 1.9,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38684297",
        "nome": "(IN) Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.2,
        "custoUnitario": 9.49,
        "subtotal": 1.9
      }
    ]
  },
  {
    "id": "FT041",
    "produto": "+ CUBINHOS DE BACON CARAMELIZADOS E CASTANHA DO PARÁ",
    "custoTotal": 4.07,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "73641178",
        "nome": "(PR) Bacon em Cubos Com Castanha do Pará",
        "unidade": "Kg",
        "quantidade": 0.06,
        "custoUnitario": 65.85,
        "subtotal": 3.95
      }
    ]
  },
  {
    "id": "FT042",
    "produto": "+ CUBINHOS DE BACON CARAMELIZADOS E CASTANHA DO PARÁ",
    "custoTotal": 4.07,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "73641178",
        "nome": "(PR) Bacon em Cubos Com Castanha do Pará",
        "unidade": "Kg",
        "quantidade": 0.06,
        "custoUnitario": 65.85,
        "subtotal": 3.95
      }
    ]
  },
  {
    "id": "FT043",
    "produto": "+ CUBINHOS DE BACON CARAMELIZADOS E CASTANHA DO PARÁ",
    "custoTotal": 4.07,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "73641178",
        "nome": "(PR) Bacon em Cubos Com Castanha do Pará",
        "unidade": "Kg",
        "quantidade": 0.06,
        "custoUnitario": 65.85,
        "subtotal": 3.95
      }
    ]
  },
  {
    "id": "FT044",
    "produto": "+ PICLES DE CEBOLA ROXA",
    "custoTotal": 0.57,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "48110550",
        "nome": "(PR) Picles de Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 32.2,
        "subtotal": 0.64
      }
    ]
  },
  {
    "id": "FT045",
    "produto": "+ PICLES DE CEBOLA ROXA",
    "custoTotal": 0.57,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "48110550",
        "nome": "(PR) Picles de Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 32.2,
        "subtotal": 0.64
      }
    ]
  },
  {
    "id": "FT046",
    "produto": "+ PICLES DE CEBOLA ROXA",
    "custoTotal": 0.57,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "48110550",
        "nome": "(PR) Picles de Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 32.2,
        "subtotal": 0.64
      }
    ]
  },
  {
    "id": "FT047",
    "produto": "+ PICLES PEPINO",
    "custoTotal": 0.19,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 22.87,
        "subtotal": 0.46
      }
    ]
  },
  {
    "id": "FT048",
    "produto": "+ PICLES PEPINO",
    "custoTotal": 0.19,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 22.87,
        "subtotal": 0.46
      }
    ]
  },
  {
    "id": "FT049",
    "produto": "+ PICLES PEPINO",
    "custoTotal": 0.19,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 22.87,
        "subtotal": 0.46
      }
    ]
  },
  {
    "id": "FT050",
    "produto": "+ QUEIJO COALHO",
    "custoTotal": 2.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "51001027",
        "nome": "(IN) Queijo Coalho",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 50.0,
        "subtotal": 2.0
      }
    ]
  },
  {
    "id": "FT051",
    "produto": "+ QUEIJO COALHO",
    "custoTotal": 2.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "51001027",
        "nome": "(IN) Queijo Coalho",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 50.0,
        "subtotal": 2.0
      }
    ]
  },
  {
    "id": "FT052",
    "produto": "+ QUEIJO PRATO",
    "custoTotal": 0.08,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 0.04,
        "custoUnitario": 1.96,
        "subtotal": 0.08
      }
    ]
  },
  {
    "id": "FT053",
    "produto": "+ QUEIJO PRATO",
    "custoTotal": 0.08,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 0.04,
        "custoUnitario": 1.96,
        "subtotal": 0.08
      }
    ]
  },
  {
    "id": "FT054",
    "produto": "+ RÚCULA",
    "custoTotal": 0.67,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 4.48,
        "subtotal": 0.67
      }
    ]
  },
  {
    "id": "FT055",
    "produto": "+ RÚCULA",
    "custoTotal": 0.67,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 4.48,
        "subtotal": 0.67
      }
    ]
  },
  {
    "id": "FT056",
    "produto": "+ RÚCULA",
    "custoTotal": 0.67,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 4.48,
        "subtotal": 0.67
      }
    ]
  },
  {
    "id": "FT057",
    "produto": "+ TOMATE EM RODELAS",
    "custoTotal": 0.75,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37543219",
        "nome": "(IN) Tomate",
        "unidade": "Kg",
        "quantidade": 0.05,
        "custoUnitario": 14.98,
        "subtotal": 0.75
      }
    ]
  },
  {
    "id": "FT058",
    "produto": "+ TOMATE EM RODELAS",
    "custoTotal": 0.75,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37543219",
        "nome": "(IN) Tomate",
        "unidade": "Kg",
        "quantidade": 0.05,
        "custoUnitario": 14.98,
        "subtotal": 0.75
      }
    ]
  },
  {
    "id": "FT059",
    "produto": "+ TOMATE EM RODELAS",
    "custoTotal": 0.75,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37543219",
        "nome": "(IN) Tomate",
        "unidade": "Kg",
        "quantidade": 0.05,
        "custoUnitario": 14.98,
        "subtotal": 0.75
      }
    ]
  },
  {
    "id": "FT060",
    "produto": "+ TOMATE TOMATUDO",
    "custoTotal": 2.11,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "69118977",
        "nome": "(PR) Tomate Tomatudo",
        "unidade": "Kg",
        "quantidade": 0.08,
        "custoUnitario": 31.04,
        "subtotal": 2.48
      }
    ]
  },
  {
    "id": "FT061",
    "produto": "+ TOMATE TOMATUDO",
    "custoTotal": 2.11,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "69118977",
        "nome": "(PR) Tomate Tomatudo",
        "unidade": "Kg",
        "quantidade": 0.08,
        "custoUnitario": 31.04,
        "subtotal": 2.48
      }
    ]
  },
  {
    "id": "FT062",
    "produto": "+ TOMATE TOMATUDO",
    "custoTotal": 2.11,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "69118977",
        "nome": "(PR) Tomate Tomatudo",
        "unidade": "Kg",
        "quantidade": 0.08,
        "custoUnitario": 31.04,
        "subtotal": 2.48
      }
    ]
  },
  {
    "id": "FT063",
    "produto": "ÁGUA MINERAL MONTE RORAIMA SEM GÁS 350ML",
    "custoTotal": 1.99,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "87172691",
        "nome": "(IT) Água Sem Gás",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 0.98,
        "subtotal": 0.98
      }
    ]
  },
  {
    "id": "FT064",
    "produto": "ÁGUA MINERAL MONTE RORAIMA SEM GÁS 350ML",
    "custoTotal": 1.99,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "87172691",
        "nome": "(IT) Água Sem Gás",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 0.98,
        "subtotal": 0.98
      }
    ]
  },
  {
    "id": "FT065",
    "produto": "ÁGUA MONTE RORAIMA COM GÁS 350ML",
    "custoTotal": 1.1,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "53141940",
        "nome": "(IT) Água com Gás",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.1,
        "subtotal": 1.1
      }
    ]
  },
  {
    "id": "FT066",
    "produto": "ÁGUA MONTE RORAIMA COM GÁS 350ML",
    "custoTotal": 1.1,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "53141940",
        "nome": "(IT) Água com Gás",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.1,
        "subtotal": 1.1
      }
    ]
  },
  {
    "id": "FT067",
    "produto": "ALFACE",
    "custoTotal": 1.2,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 7.98,
        "subtotal": 1.2
      }
    ]
  },
  {
    "id": "FT068",
    "produto": "ALFACE",
    "custoTotal": 1.2,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 7.98,
        "subtotal": 1.2
      }
    ]
  },
  {
    "id": "FT069",
    "produto": "BACON, CASTANHA + MOLHO DE CUPU E CACHAÇA - SAÎ DA MATA",
    "custoTotal": 13.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 5.39,
        "subtotal": 0.02
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 4.0,
        "subtotal": 0.01
      },
      {
        "insumoId": "73641178",
        "nome": "(PR) Bacon em Cubos Com Castanha do Pará",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 65.85,
        "subtotal": 1.65
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "96855312",
        "nome": "(PR) Chutney de Cupuaçu Cachaça e Cebola",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 19.4,
        "subtotal": 0.78
      },
      {
        "insumoId": "48110550",
        "nome": "(PR) Picles de Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 32.2,
        "subtotal": 0.64
      }
    ],
    "pdvId": "24138602",
    "nomeOnline": "Burguer com Cubos de Bacon e Castanha e Molho de Cupu e Cachaça - Saî da Mata"
  },
  {
    "id": "FT070",
    "produto": "BACON, CASTANHA + MOLHO DE CUPU E CACHAÇA - SAÎ DA MATA",
    "custoTotal": 13.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 5.39,
        "subtotal": 0.02
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 4.0,
        "subtotal": 0.01
      },
      {
        "insumoId": "73641178",
        "nome": "(PR) Bacon em Cubos Com Castanha do Pará",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 65.85,
        "subtotal": 1.65
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "96855312",
        "nome": "(PR) Chutney de Cupuaçu Cachaça e Cebola",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 19.4,
        "subtotal": 0.78
      },
      {
        "insumoId": "48110550",
        "nome": "(PR) Picles de Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 32.2,
        "subtotal": 0.64
      }
    ]
  },
  {
    "id": "FT071",
    "produto": "BATATÃO",
    "custoTotal": 13.41,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34671701",
        "nome": "(IN) Batata Pré-frita Congelada",
        "unidade": "Kg",
        "quantidade": 0.35,
        "custoUnitario": 32.98,
        "subtotal": 11.54
      },
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.05,
        "custoUnitario": 35.98,
        "subtotal": 1.8
      },
      {
        "insumoId": "38456757",
        "nome": "(IN) Páprica doce",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 2.98,
        "subtotal": 0.03
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      }
    ]
  },
  {
    "id": "FT072",
    "produto": "BATATÃO - BATATA FRITA PORÇÃO GRANDE",
    "custoTotal": 13.41,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34671701",
        "nome": "(IN) Batata Pré-frita Congelada",
        "unidade": "Kg",
        "quantidade": 0.35,
        "custoUnitario": 32.98,
        "subtotal": 11.54
      },
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.05,
        "custoUnitario": 35.98,
        "subtotal": 1.8
      },
      {
        "insumoId": "38456757",
        "nome": "(IN) Páprica doce",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 2.98,
        "subtotal": 0.03
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      }
    ]
  },
  {
    "id": "FT073",
    "produto": "BATATÃO - BATATA FRITA PORÇÃO GRANDE",
    "custoTotal": 13.41,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34671701",
        "nome": "(IN) Batata Pré-frita Congelada",
        "unidade": "Kg",
        "quantidade": 0.35,
        "custoUnitario": 32.98,
        "subtotal": 11.54
      },
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.05,
        "custoUnitario": 35.98,
        "subtotal": 1.8
      },
      {
        "insumoId": "38456757",
        "nome": "(IN) Páprica doce",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 2.98,
        "subtotal": 0.03
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      }
    ]
  },
  {
    "id": "FT074",
    "produto": "BATATÃO - PORÇÃO G",
    "custoTotal": 13.41,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34671701",
        "nome": "(IN) Batata Pré-frita Congelada",
        "unidade": "Kg",
        "quantidade": 0.35,
        "custoUnitario": 32.98,
        "subtotal": 11.54
      },
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.05,
        "custoUnitario": 35.98,
        "subtotal": 1.8
      },
      {
        "insumoId": "38456757",
        "nome": "(IN) Páprica doce",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 2.98,
        "subtotal": 0.03
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      }
    ]
  },
  {
    "id": "FT075",
    "produto": "BATATINHA",
    "custoTotal": 6.82,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34671701",
        "nome": "(IN) Batata Pré-frita Congelada",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 32.98,
        "subtotal": 4.95
      },
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.05,
        "custoUnitario": 35.98,
        "subtotal": 1.8
      },
      {
        "insumoId": "38456757",
        "nome": "(IN) Páprica doce",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 2.98,
        "subtotal": 0.03
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      }
    ]
  },
  {
    "id": "FT076",
    "produto": "BATATINHA",
    "custoTotal": 6.82,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34671701",
        "nome": "(IN) Batata Pré-frita Congelada",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 32.98,
        "subtotal": 4.95
      },
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.05,
        "custoUnitario": 35.98,
        "subtotal": 1.8
      },
      {
        "insumoId": "38456757",
        "nome": "(IN) Páprica doce",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 2.98,
        "subtotal": 0.03
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      }
    ]
  },
  {
    "id": "FT077",
    "produto": "BATATINHA - PORÇÃO INDIVIDUAL",
    "custoTotal": 6.82,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "34671701",
        "nome": "(IN) Batata Pré-frita Congelada",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 32.98,
        "subtotal": 4.95
      },
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.05,
        "custoUnitario": 35.98,
        "subtotal": 1.8
      },
      {
        "insumoId": "38456757",
        "nome": "(IN) Páprica doce",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 2.98,
        "subtotal": 0.03
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      }
    ]
  },
  {
    "id": "FT078",
    "produto": "BICUDINHO - SOBRECOXAS DE FRANGO CROCANTE - INDIVIDUAL",
    "custoTotal": 6.35,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.1,
        "custoUnitario": 35.98,
        "subtotal": 3.6
      },
      {
        "insumoId": "46769774",
        "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 27.7,
        "subtotal": 4.16
      }
    ]
  },
  {
    "id": "FT079",
    "produto": "BICUDINHO G - FRANGO CROCANTE",
    "custoTotal": 9.1,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.1,
        "custoUnitario": 35.98,
        "subtotal": 3.6
      },
      {
        "insumoId": "46769774",
        "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 27.7,
        "subtotal": 8.31
      }
    ]
  },
  {
    "id": "FT080",
    "produto": "BICUDINHO INDIVIDUAL - FRANGO CROCANTE",
    "custoTotal": 6.35,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.1,
        "custoUnitario": 35.98,
        "subtotal": 3.6
      },
      {
        "insumoId": "46769774",
        "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 27.7,
        "subtotal": 4.16
      }
    ]
  },
  {
    "id": "FT081",
    "produto": "BICUDINHOS - PORÇÃO DE SOBRECOXA DE FRANGO EMPANADAS.",
    "custoTotal": 9.1,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.1,
        "custoUnitario": 35.98,
        "subtotal": 3.6
      },
      {
        "insumoId": "46769774",
        "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 27.7,
        "subtotal": 8.31
      }
    ]
  },
  {
    "id": "FT082",
    "produto": "BICUDINHOS - PORÇÃO DE SOBRECOXA DE FRANGO EMPANADAS.",
    "custoTotal": 9.1,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.1,
        "custoUnitario": 35.98,
        "subtotal": 3.6
      },
      {
        "insumoId": "46769774",
        "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 27.7,
        "subtotal": 8.31
      }
    ]
  },
  {
    "id": "FT083",
    "produto": "BICUDINHOS - SOBRECOXA CROCANTE",
    "custoTotal": 9.1,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.1,
        "custoUnitario": 35.98,
        "subtotal": 3.6
      },
      {
        "insumoId": "46769774",
        "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 27.7,
        "subtotal": 8.31
      }
    ]
  },
  {
    "id": "FT084",
    "produto": "BICUDINHOS - SOBRECOXAS DE FRANGO CROCANTES - PORÇÃO G",
    "custoTotal": 9.1,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.1,
        "custoUnitario": 35.98,
        "subtotal": 3.6
      },
      {
        "insumoId": "46769774",
        "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 27.7,
        "subtotal": 8.31
      }
    ]
  },
  {
    "id": "FT085",
    "produto": "BLEND 120G",
    "custoTotal": 3.48,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.12,
        "custoUnitario": 26.99,
        "subtotal": 3.24
      }
    ]
  },
  {
    "id": "FT086",
    "produto": "BLEND 120G",
    "custoTotal": 3.48,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.12,
        "custoUnitario": 26.99,
        "subtotal": 3.24
      }
    ]
  },
  {
    "id": "FT087",
    "produto": "BLEND 150G",
    "custoTotal": 4.35,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "25324567",
        "nome": "(IN) Carne Moída Blend",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 26.99,
        "subtotal": 4.05
      }
    ]
  },
  {
    "id": "FT088",
    "produto": "BROWNIE COM CREME DE CUPUAÇU.",
    "custoTotal": 3.34,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "56601544",
        "nome": "(IN) ACHOCOLATADO",
        "unidade": "Kg",
        "quantidade": 0.2,
        "custoUnitario": 30.9,
        "subtotal": 6.18
      },
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.55,
        "custoUnitario": 3.39,
        "subtotal": 1.86
      },
      {
        "insumoId": "17849460",
        "nome": "(IN) Creme de Leite",
        "unidade": "L",
        "quantidade": 0.4,
        "custoUnitario": 3.69,
        "subtotal": 1.48
      },
      {
        "insumoId": "21716329",
        "nome": "(IN) Cupuaçu - polpa",
        "unidade": "Kg",
        "quantidade": 0.6,
        "custoUnitario": 22.09,
        "subtotal": 13.25
      },
      {
        "insumoId": "44934463",
        "nome": "(IN) Farinha de trigo",
        "unidade": "Kg",
        "quantidade": 0.42,
        "custoUnitario": 6.19,
        "subtotal": 2.6
      },
      {
        "insumoId": "71730223",
        "nome": "(IN) Leite condensado 395g",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 7.59,
        "subtotal": 15.18
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.3,
        "custoUnitario": 26.29,
        "subtotal": 7.89
      },
      {
        "insumoId": "43996400",
        "nome": "(IN) Ovo",
        "unidade": "Un",
        "quantidade": 6.0,
        "custoUnitario": 0.83,
        "subtotal": 4.98
      }
    ]
  },
  {
    "id": "FT089",
    "produto": "BROWNIE ENCHARCADO NO CREME DE CUPUAÇU",
    "custoTotal": 3.34,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "56601544",
        "nome": "(IN) ACHOCOLATADO",
        "unidade": "Kg",
        "quantidade": 0.2,
        "custoUnitario": 30.9,
        "subtotal": 6.18
      },
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.55,
        "custoUnitario": 3.39,
        "subtotal": 1.86
      },
      {
        "insumoId": "17849460",
        "nome": "(IN) Creme de Leite",
        "unidade": "L",
        "quantidade": 0.4,
        "custoUnitario": 3.69,
        "subtotal": 1.48
      },
      {
        "insumoId": "21716329",
        "nome": "(IN) Cupuaçu - polpa",
        "unidade": "Kg",
        "quantidade": 0.6,
        "custoUnitario": 22.09,
        "subtotal": 13.25
      },
      {
        "insumoId": "44934463",
        "nome": "(IN) Farinha de trigo",
        "unidade": "Kg",
        "quantidade": 0.42,
        "custoUnitario": 6.19,
        "subtotal": 2.6
      },
      {
        "insumoId": "71730223",
        "nome": "(IN) Leite condensado 395g",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 7.59,
        "subtotal": 15.18
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.3,
        "custoUnitario": 26.29,
        "subtotal": 7.89
      },
      {
        "insumoId": "43996400",
        "nome": "(IN) Ovo",
        "unidade": "Un",
        "quantidade": 6.0,
        "custoUnitario": 0.83,
        "subtotal": 4.98
      }
    ]
  },
  {
    "id": "FT090",
    "produto": "BUGUER COM QUEIJO COALHO E CEBOLA NA RAPADURA - SA DO SERTÃO",
    "custoTotal": 9.22,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 100.0,
        "subtotal": 0.1
      },
      {
        "insumoId": "51001027",
        "nome": "(IN) Queijo Coalho",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 50.0,
        "subtotal": 2.0
      },
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 4.48,
        "subtotal": 0.45
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "64602366",
        "nome": "(PR) Cebola Caramelizada com Rapadura",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 13.19,
        "subtotal": 0.33
      },
      {
        "insumoId": "39939023",
        "nome": "(PR) Maionese Verde - Coentro e Limão",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 15.3,
        "subtotal": 0.31
      }
    ]
  },
  {
    "id": "FT091",
    "produto": "BUGUER COM QUEIJO COALHO E CEBOLA NA RAPADURA - SA DO SERTÃO",
    "custoTotal": 9.22,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 100.0,
        "subtotal": 0.1
      },
      {
        "insumoId": "51001027",
        "nome": "(IN) Queijo Coalho",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 50.0,
        "subtotal": 2.0
      },
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 4.48,
        "subtotal": 0.45
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "64602366",
        "nome": "(PR) Cebola Caramelizada com Rapadura",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 13.19,
        "subtotal": 0.33
      },
      {
        "insumoId": "39939023",
        "nome": "(PR) Maionese Verde - Coentro e Limão",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 15.3,
        "subtotal": 0.31
      }
    ]
  },
  {
    "id": "FT092",
    "produto": "BURGUER C/ MAIONESE DE ALHO + COCA-COLA 220ML",
    "custoTotal": 8.45,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "36864564",
        "nome": "(IT) Coca-cola Original Mini Pet 200ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.29,
        "subtotal": 2.29
      },
      {
        "insumoId": "83391288",
        "nome": "Saî Puro - Burguer com maionese de alho",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 8.74,
        "subtotal": 8.74
      }
    ]
  },
  {
    "id": "FT093",
    "produto": "BURGUER C/ QUEIJO COALHO E CEBOLA CARAMEL. RAPADURA - SAÎ DO SERTÃO",
    "custoTotal": 9.22,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 100.0,
        "subtotal": 0.1
      },
      {
        "insumoId": "51001027",
        "nome": "(IN) Queijo Coalho",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 50.0,
        "subtotal": 2.0
      },
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 4.48,
        "subtotal": 0.45
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "64602366",
        "nome": "(PR) Cebola Caramelizada com Rapadura",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 13.19,
        "subtotal": 0.33
      },
      {
        "insumoId": "39939023",
        "nome": "(PR) Maionese Verde - Coentro e Limão",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 15.3,
        "subtotal": 0.31
      }
    ],
    "pdvId": "24138611",
    "nomeOnline": "Buguer com Queijo Coalho e Cebola na Rapadura - Saî do Sertão"
  },
  {
    "id": "FT094",
    "produto": "BURGUER C/ QUEIJO COALHO E CEBOLA CARAMEL. RAPADURA - SAÎ DO SERTÃO",
    "custoTotal": 9.22,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 100.0,
        "subtotal": 0.1
      },
      {
        "insumoId": "51001027",
        "nome": "(IN) Queijo Coalho",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 50.0,
        "subtotal": 2.0
      },
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 4.48,
        "subtotal": 0.45
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "64602366",
        "nome": "(PR) Cebola Caramelizada com Rapadura",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 13.19,
        "subtotal": 0.33
      },
      {
        "insumoId": "39939023",
        "nome": "(PR) Maionese Verde - Coentro e Limão",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 15.3,
        "subtotal": 0.31
      }
    ]
  },
  {
    "id": "FT095",
    "produto": "BURGUER CLÁSSICO COMPLETO - SAÎ DE CLASSE",
    "custoTotal": 12.6,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 7.98,
        "subtotal": 0.8
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 5.39,
        "subtotal": 0.05
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 71.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 14.88,
        "subtotal": 0.3
      },
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 22.87,
        "subtotal": 0.11
      }
    ],
    "pdvId": "24842320",
    "nomeOnline": "Burguer Clássico Completo - Saî de Classe"
  },
  {
    "id": "FT096",
    "produto": "BURGUER CLÁSSICO COMPLETO - SAÎ DE CLASSE",
    "custoTotal": 12.6,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 7.98,
        "subtotal": 0.8
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 5.39,
        "subtotal": 0.05
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 71.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 14.88,
        "subtotal": 0.3
      },
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 22.87,
        "subtotal": 0.11
      }
    ]
  },
  {
    "id": "FT097",
    "produto": "BURGUER CLÁSSICO COMPLETO - SAÎ DE CLASSE",
    "custoTotal": 12.6,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 7.98,
        "subtotal": 0.8
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 5.39,
        "subtotal": 0.05
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 71.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 14.88,
        "subtotal": 0.3
      },
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 22.87,
        "subtotal": 0.11
      }
    ]
  },
  {
    "id": "FT098",
    "produto": "BURGUER COM BACON E CASTANHA E MOLHO DE CUPU E CACHAÇA - SA DA MATA",
    "custoTotal": 13.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 5.39,
        "subtotal": 0.02
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 4.0,
        "subtotal": 0.01
      },
      {
        "insumoId": "73641178",
        "nome": "(PR) Bacon em Cubos Com Castanha do Pará",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 65.85,
        "subtotal": 1.65
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "96855312",
        "nome": "(PR) Chutney de Cupuaçu Cachaça e Cebola",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 19.4,
        "subtotal": 0.78
      },
      {
        "insumoId": "48110550",
        "nome": "(PR) Picles de Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 32.2,
        "subtotal": 0.64
      }
    ]
  },
  {
    "id": "FT099",
    "produto": "BURGUER COM BACON E CASTANHA E MOLHO DE CUPU E CACHAÇA - SA DA MATA",
    "custoTotal": 13.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 5.39,
        "subtotal": 0.02
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 4.0,
        "subtotal": 0.01
      },
      {
        "insumoId": "73641178",
        "nome": "(PR) Bacon em Cubos Com Castanha do Pará",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 65.85,
        "subtotal": 1.65
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "96855312",
        "nome": "(PR) Chutney de Cupuaçu Cachaça e Cebola",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 19.4,
        "subtotal": 0.78
      },
      {
        "insumoId": "48110550",
        "nome": "(PR) Picles de Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 32.2,
        "subtotal": 0.64
      }
    ]
  },
  {
    "id": "FT100",
    "produto": "BURGUER COM BACON E CASTANHA E MOLHO DE CUPU E CACHAÇA - SAÎ DA MATA",
    "custoTotal": 13.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 5.39,
        "subtotal": 0.02
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.003,
        "custoUnitario": 4.0,
        "subtotal": 0.01
      },
      {
        "insumoId": "73641178",
        "nome": "(PR) Bacon em Cubos Com Castanha do Pará",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 65.85,
        "subtotal": 1.65
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "96855312",
        "nome": "(PR) Chutney de Cupuaçu Cachaça e Cebola",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 19.4,
        "subtotal": 0.78
      },
      {
        "insumoId": "48110550",
        "nome": "(PR) Picles de Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 32.2,
        "subtotal": 0.64
      }
    ]
  },
  {
    "id": "FT101",
    "produto": "BURGUER COM QUEIJO COALHO E CEBOLA NA RAPADURA - SAÎ DO SERTÃO",
    "custoTotal": 9.22,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 100.0,
        "subtotal": 0.1
      },
      {
        "insumoId": "51001027",
        "nome": "(IN) Queijo Coalho",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 50.0,
        "subtotal": 2.0
      },
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 4.48,
        "subtotal": 0.45
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "64602366",
        "nome": "(PR) Cebola Caramelizada com Rapadura",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 13.19,
        "subtotal": 0.33
      },
      {
        "insumoId": "39939023",
        "nome": "(PR) Maionese Verde - Coentro e Limão",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 15.3,
        "subtotal": 0.31
      }
    ]
  },
  {
    "id": "FT102",
    "produto": "BURGUER DUPLO - SAÎ DUPLO BURGUER DA SEMANA",
    "custoTotal": 18.39,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 7.98,
        "subtotal": 1.2
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 4.48,
        "subtotal": 0.67
      },
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 71.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "78910390",
        "nome": "(PR) Blend 120g",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 3.48,
        "subtotal": 6.96
      },
      {
        "insumoId": "85445669",
        "nome": "(PR) Maionese Vermelha - Páprica e Calabresa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 12.82,
        "subtotal": 0.26
      },
      {
        "insumoId": "69118977",
        "nome": "(PR) Tomate Tomatudo",
        "unidade": "Kg",
        "quantidade": 0.08,
        "custoUnitario": 31.04,
        "subtotal": 2.48
      }
    ]
  },
  {
    "id": "FT103",
    "produto": "BURGUER DUPLO - SAÎ DUPLO BURGUER DA SEMANA",
    "custoTotal": 18.39,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 7.98,
        "subtotal": 1.2
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.15,
        "custoUnitario": 4.48,
        "subtotal": 0.67
      },
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 71.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "78910390",
        "nome": "(PR) Blend 120g",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 3.48,
        "subtotal": 6.96
      },
      {
        "insumoId": "85445669",
        "nome": "(PR) Maionese Vermelha - Páprica e Calabresa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 12.82,
        "subtotal": 0.26
      },
      {
        "insumoId": "69118977",
        "nome": "(PR) Tomate Tomatudo",
        "unidade": "Kg",
        "quantidade": 0.08,
        "custoUnitario": 31.04,
        "subtotal": 2.48
      }
    ]
  },
  {
    "id": "FT104",
    "produto": "CATCHUP/MAIONESE",
    "custoTotal": 0.9,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "17618571",
        "nome": "(IT) Catchup Sachê UN",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.28,
        "subtotal": 0.56
      },
      {
        "insumoId": "87884880",
        "nome": "(IT) Maionese Sachê (unidade)",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.17,
        "subtotal": 0.34
      }
    ]
  },
  {
    "id": "FT105",
    "produto": "CATCHUP/MAIONESE/MOSTARDA",
    "custoTotal": 0.9,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "17618571",
        "nome": "(IT) Catchup Sachê UN",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.28,
        "subtotal": 0.56
      },
      {
        "insumoId": "87884880",
        "nome": "(IT) Maionese Sachê (unidade)",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.17,
        "subtotal": 0.34
      }
    ]
  },
  {
    "id": "FT106",
    "produto": "CATCHUP/MAIONESE/MOSTARDA",
    "custoTotal": 0.9,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "17618571",
        "nome": "(IT) Catchup Sachê UN",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.28,
        "subtotal": 0.56
      },
      {
        "insumoId": "87884880",
        "nome": "(IT) Maionese Sachê (unidade)",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.17,
        "subtotal": 0.34
      }
    ]
  },
  {
    "id": "FT107",
    "produto": "CHEESEBURGUER COM PICLES ARTESANAL E MAIONESE DE ALHO - SAÎ LEVE",
    "custoTotal": 9.99,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38684297",
        "nome": "(IN) Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 9.49,
        "subtotal": 0.09
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 100.0,
        "subtotal": 0.1
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 4.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "78910390",
        "nome": "(PR) Blend 120g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.48,
        "subtotal": 3.48
      },
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 14.88,
        "subtotal": 0.3
      },
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 22.87,
        "subtotal": 0.46
      }
    ],
    "pdvId": "23972058",
    "nomeOnline": "Cheeseburguer com Picles Artesanal e Maionese de Alho - Saî Leve"
  },
  {
    "id": "FT108",
    "produto": "CHEESEBURGUER COM PICLES ARTESANAL E MAIONESE DE ALHO - SAÎ LEVE",
    "custoTotal": 9.99,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38684297",
        "nome": "(IN) Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 9.49,
        "subtotal": 0.09
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 100.0,
        "subtotal": 0.1
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 4.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "78910390",
        "nome": "(PR) Blend 120g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.48,
        "subtotal": 3.48
      },
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 14.88,
        "subtotal": 0.3
      },
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 22.87,
        "subtotal": 0.46
      }
    ]
  },
  {
    "id": "FT109",
    "produto": "CHUTNEY DE CUPUAÇU E CACHAÇA",
    "custoTotal": 0.47,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "96855312",
        "nome": "(PR) Chutney de Cupuaçu Cachaça e Cebola",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 19.4,
        "subtotal": 0.39
      }
    ]
  },
  {
    "id": "FT110",
    "produto": "CHUTNEY DE CUPUAÇU E CACHAÇA",
    "custoTotal": 0.47,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "96855312",
        "nome": "(PR) Chutney de Cupuaçu Cachaça e Cebola",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 19.4,
        "subtotal": 0.39
      }
    ]
  },
  {
    "id": "FT111",
    "produto": "CLÁSSICO COMPLETO - SAÎ DE CLASSE",
    "custoTotal": 12.6,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 7.98,
        "subtotal": 0.8
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 5.39,
        "subtotal": 0.05
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 71.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "84351897",
        "nome": "(PR) Blend 150g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.35,
        "subtotal": 4.35
      },
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 14.88,
        "subtotal": 0.3
      },
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 22.87,
        "subtotal": 0.11
      }
    ]
  },
  {
    "id": "FT112",
    "produto": "COCA COLA ZERO 1L",
    "custoTotal": 5.69,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37686736",
        "nome": "(IT) Coca-cola Original 1L",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 5.69,
        "subtotal": 5.69
      }
    ]
  },
  {
    "id": "FT113",
    "produto": "COCA COLA ZERO 1L",
    "custoTotal": 5.69,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37686736",
        "nome": "(IT) Coca-cola Original 1L",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 5.69,
        "subtotal": 5.69
      }
    ]
  },
  {
    "id": "FT114",
    "produto": "COCA COLA ZERO LATA 350ML",
    "custoTotal": 2.9,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "27433471",
        "nome": "(IT) Coca-cola ZERO Açúcar Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.9,
        "subtotal": 2.9
      }
    ]
  },
  {
    "id": "FT115",
    "produto": "COCA COLA ZERO LATA 350ML",
    "custoTotal": 2.9,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "27433471",
        "nome": "(IT) Coca-cola ZERO Açúcar Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.9,
        "subtotal": 2.9
      }
    ]
  },
  {
    "id": "FT116",
    "produto": "COCA COLA ZERO LATA 350ML",
    "custoTotal": 2.9,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "27433471",
        "nome": "(IT) Coca-cola ZERO Açúcar Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.9,
        "subtotal": 2.9
      }
    ]
  },
  {
    "id": "FT117",
    "produto": "COCA-COLA 1L",
    "custoTotal": 5.69,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37686736",
        "nome": "(IT) Coca-cola Original 1L",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 5.69,
        "subtotal": 5.69
      }
    ]
  },
  {
    "id": "FT118",
    "produto": "COCA-COLA 1L",
    "custoTotal": 5.69,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37686736",
        "nome": "(IT) Coca-cola Original 1L",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 5.69,
        "subtotal": 5.69
      }
    ]
  },
  {
    "id": "FT119",
    "produto": "COCA-COLA 1L",
    "custoTotal": 5.69,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "37686736",
        "nome": "(IT) Coca-cola Original 1L",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 5.69,
        "subtotal": 5.69
      }
    ]
  },
  {
    "id": "FT120",
    "produto": "COCA-COLA 220ML",
    "custoTotal": 2.17,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "14900721",
        "nome": "(IT) Coca-cola Original Lata 220ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.17,
        "subtotal": 2.17
      }
    ]
  },
  {
    "id": "FT121",
    "produto": "COCA-COLA LATA 350ML",
    "custoTotal": 3.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "63557892",
        "nome": "(IT) Coca-cola Original Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.0,
        "subtotal": 3.0
      }
    ]
  },
  {
    "id": "FT122",
    "produto": "COCA-COLA LATA 350ML",
    "custoTotal": 3.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "63557892",
        "nome": "(IT) Coca-cola Original Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.0,
        "subtotal": 3.0
      }
    ]
  },
  {
    "id": "FT123",
    "produto": "COCA-COLA LATA 350ML",
    "custoTotal": 3.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "63557892",
        "nome": "(IT) Coca-cola Original Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.0,
        "subtotal": 3.0
      }
    ]
  },
  {
    "id": "FT124",
    "produto": "COCA-COLA ORIGINAL 200ML",
    "custoTotal": 2.29,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "36864564",
        "nome": "(IT) Coca-cola Original Mini Pet 200ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.29,
        "subtotal": 2.29
      }
    ]
  },
  {
    "id": "FT125",
    "produto": "COCA-COLA ORIGINAL 350",
    "custoTotal": 3.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "63557892",
        "nome": "(IT) Coca-cola Original Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.0,
        "subtotal": 3.0
      }
    ]
  },
  {
    "id": "FT126",
    "produto": "COCA-COLA ZERO 1,5L",
    "custoTotal": 6.52,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "17565700",
        "nome": "(IT) Coca-cola ZERO Açúcar 1,5L",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 6.52,
        "subtotal": 6.52
      }
    ]
  },
  {
    "id": "FT127",
    "produto": "COCA-COLA ZERO 200ML",
    "custoTotal": 2.19,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "59880215",
        "nome": "(IT) Coca-cola ZERO Açúcar Lata 220ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.19,
        "subtotal": 2.19
      }
    ]
  },
  {
    "id": "FT128",
    "produto": "COCA-COLA ZERO 350ML",
    "custoTotal": 3.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "63557892",
        "nome": "(IT) Coca-cola Original Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.0,
        "subtotal": 3.0
      }
    ]
  },
  {
    "id": "FT129",
    "produto": "COCA-COLA ZERO 600ML",
    "custoTotal": 3.97,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83816782",
        "nome": "(IT) Coca-cola ZERO Açúcar 600ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.97,
        "subtotal": 3.97
      }
    ]
  },
  {
    "id": "FT130",
    "produto": "COCA-COLA ZERO 600ML",
    "custoTotal": 3.97,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83816782",
        "nome": "(IT) Coca-cola ZERO Açúcar 600ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.97,
        "subtotal": 3.97
      }
    ]
  },
  {
    "id": "FT131",
    "produto": "COCA-COLA ZERO 600ML",
    "custoTotal": 3.97,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83816782",
        "nome": "(IT) Coca-cola ZERO Açúcar 600ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.97,
        "subtotal": 3.97
      }
    ]
  },
  {
    "id": "FT132",
    "produto": "COMBO CASAL - 2X HAMBÚRGUERES + 2 BATATAS + BEBIDA",
    "custoTotal": 6.2,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38320194",
        "nome": "Batatinha - porção individual",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 6.82,
        "subtotal": 13.64
      }
    ]
  },
  {
    "id": "FT133",
    "produto": "COMBO CASAL - 2X HAMBÚRGUERES + 2 BATATAS + BEBIDA",
    "custoTotal": 6.2,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38320194",
        "nome": "Batatinha - porção individual",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 6.82,
        "subtotal": 13.64
      }
    ]
  },
  {
    "id": "FT134",
    "produto": "COMBO CLÁSSICO- SA? DE CLASSE + BATATINHA + BEBIDA P",
    "custoTotal": 11.25,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38320194",
        "nome": "Batatinha - porção individual",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 6.82,
        "subtotal": 6.82
      },
      {
        "insumoId": "19614695",
        "nome": "Burguer clássico Completo - Saî de Classe",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 12.6,
        "subtotal": 12.6
      }
    ]
  },
  {
    "id": "FT135",
    "produto": "COMBO DO PURO - SAÎ PURO + REFRI 220ML",
    "custoTotal": 8.45,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "36864564",
        "nome": "(IT) Coca-cola Original Mini Pet 200ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.29,
        "subtotal": 2.29
      },
      {
        "insumoId": "83391288",
        "nome": "Saî Puro - Burguer com maionese de alho",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 8.74,
        "subtotal": 8.74
      }
    ]
  },
  {
    "id": "FT136",
    "produto": "COMBO INDIVIDUAL",
    "custoTotal": 3.1,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38320194",
        "nome": "Batatinha - porção individual",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 6.82,
        "subtotal": 6.82
      }
    ]
  },
  {
    "id": "FT137",
    "produto": "COMBO INDIVIDUAL",
    "custoTotal": 3.1,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38320194",
        "nome": "Batatinha - porção individual",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 6.82,
        "subtotal": 6.82
      }
    ]
  },
  {
    "id": "FT138",
    "produto": "COMBO SOU BV - BURGUER SAÎ DA MATA + TUBAÍNA",
    "custoTotal": 12.37,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "86393637",
        "nome": "(IT) Tubaína Monte Roraima Pet 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.12,
        "subtotal": 2.12
      },
      {
        "insumoId": "89705537",
        "nome": "Burguer com Bacon e Castanha e Molho de Cupu e Cachaça - Sa da Mata",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 13.0,
        "subtotal": 13.0
      }
    ]
  },
  {
    "id": "FT139",
    "produto": "FRANGO CROCANTE, PICLES ARTESANAL E SALADA - SAÎ DE BICO",
    "custoTotal": 15.99,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 7.98,
        "subtotal": 0.8
      },
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.04,
        "custoUnitario": 35.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 100.0,
        "subtotal": 3.0
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 4.48,
        "subtotal": 0.45
      },
      {
        "insumoId": "46769774",
        "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
        "unidade": "Kg",
        "quantidade": 0.16,
        "custoUnitario": 27.7,
        "subtotal": 4.43
      },
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 22.87,
        "subtotal": 0.46
      }
    ],
    "pdvId": "24842353",
    "nomeOnline": "Frango crocante, Picles Artesanal e Salada - Saî de Bico"
  },
  {
    "id": "FT140",
    "produto": "FRANGO CROCANTE, PICLES ARTESANAL E SALADA - SAÎ DE BICO",
    "custoTotal": 15.99,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "83364230",
        "nome": "(IN) Alface americano",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 7.98,
        "subtotal": 0.8
      },
      {
        "insumoId": "10633048",
        "nome": "(IN) Óleo de Soja/algodão P/ Fritura",
        "unidade": "L",
        "quantidade": 0.04,
        "custoUnitario": 35.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 100.0,
        "subtotal": 3.0
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "34039034",
        "nome": "(IN) Rúcula Maço",
        "unidade": "Un",
        "quantidade": 0.1,
        "custoUnitario": 4.48,
        "subtotal": 0.45
      },
      {
        "insumoId": "46769774",
        "nome": "(PR) Coxa/Sobrecoxa de Frango Empanadas",
        "unidade": "Kg",
        "quantidade": 0.16,
        "custoUnitario": 27.7,
        "subtotal": 4.43
      },
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 22.87,
        "subtotal": 0.46
      }
    ]
  },
  {
    "id": "FT141",
    "produto": "GUARANÁ 220ML",
    "custoTotal": 2.68,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "13916174",
        "nome": "(IT) Guaraná Antártica Original Lata 220ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.68,
        "subtotal": 2.68
      }
    ]
  },
  {
    "id": "FT142",
    "produto": "GUARANÁ 269",
    "custoTotal": 2.68,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "13916174",
        "nome": "(IT) Guaraná Antártica Original Lata 220ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.68,
        "subtotal": 2.68
      }
    ]
  },
  {
    "id": "FT143",
    "produto": "GUARANÁ ANTÁRTICA - 269ML",
    "custoTotal": 2.68,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "13916174",
        "nome": "(IT) Guaraná Antártica Original Lata 220ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.68,
        "subtotal": 2.68
      }
    ]
  },
  {
    "id": "FT144",
    "produto": "GUARANÁ ANTÁRTICA 1L",
    "custoTotal": 4.98,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "79097937",
        "nome": "(IT) Guaraná Antártica Original 1L",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 4.98,
        "subtotal": 4.98
      }
    ]
  },
  {
    "id": "FT145",
    "produto": "GUARANA ANTARTICA 350ML",
    "custoTotal": 3.6,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "91200931",
        "nome": "(IT) Guaraná Antártica Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.6,
        "subtotal": 3.6
      }
    ]
  },
  {
    "id": "FT146",
    "produto": "GUARANA ANTARTICA LATA",
    "custoTotal": 3.6,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "91200931",
        "nome": "(IT) Guaraná Antártica Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.6,
        "subtotal": 3.6
      }
    ]
  },
  {
    "id": "FT147",
    "produto": "GUARANA ANTARTICA LATA",
    "custoTotal": 3.6,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "91200931",
        "nome": "(IT) Guaraná Antártica Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.6,
        "subtotal": 3.6
      }
    ]
  },
  {
    "id": "FT148",
    "produto": "GUARANÁ BARÉ ZERO- 1L",
    "custoTotal": 0.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "65582897",
        "nome": "(IT) Baré 1L",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT149",
    "produto": "GUARANÁ ZERO 350ML",
    "custoTotal": 3.48,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38217894",
        "nome": "(IT) Guaraná Antártica ZERO Lata 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.48,
        "subtotal": 3.48
      }
    ]
  },
  {
    "id": "FT150",
    "produto": "GUARDANAPO",
    "custoTotal": 0.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "13752446",
        "nome": "(EM) Guardanapo Embalado Delivery",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT151",
    "produto": "GUARDANAPO",
    "custoTotal": 0.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "13752446",
        "nome": "(EM) Guardanapo Embalado Delivery",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT152",
    "produto": "MAIONESE DE ALHO",
    "custoTotal": 2.02,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 14.88,
        "subtotal": 0.45
      }
    ]
  },
  {
    "id": "FT153",
    "produto": "MAIONESE DE ALHO E ORÉGANO",
    "custoTotal": 2.02,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 14.88,
        "subtotal": 0.45
      }
    ]
  },
  {
    "id": "FT154",
    "produto": "MAIONESE DE ALHO E ORÉGANO",
    "custoTotal": 2.02,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 14.88,
        "subtotal": 0.45
      }
    ]
  },
  {
    "id": "FT155",
    "produto": "MAIONESE DE ALHO E ORÉGANO",
    "custoTotal": 2.02,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 14.88,
        "subtotal": 0.45
      }
    ]
  },
  {
    "id": "FT156",
    "produto": "MAIONESE VERDE - COENTRO E LIMÃO",
    "custoTotal": 1.93,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "39939023",
        "nome": "(PR) Maionese Verde - Coentro e Limão",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 15.3,
        "subtotal": 0.46
      }
    ]
  },
  {
    "id": "FT157",
    "produto": "MAIONESE VERDE - COENTRO E LIMÃO",
    "custoTotal": 1.93,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "39939023",
        "nome": "(PR) Maionese Verde - Coentro e Limão",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 15.3,
        "subtotal": 0.46
      }
    ]
  },
  {
    "id": "FT158",
    "produto": "MAIONESE VERDE - COENTRO E LIMÃO",
    "custoTotal": 1.93,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "39939023",
        "nome": "(PR) Maionese Verde - Coentro e Limão",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 15.3,
        "subtotal": 0.46
      }
    ]
  },
  {
    "id": "FT159",
    "produto": "MAIONESE VERDE - LIMÃO E COENTRO",
    "custoTotal": 1.93,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "39939023",
        "nome": "(PR) Maionese Verde - Coentro e Limão",
        "unidade": "Kg",
        "quantidade": 0.03,
        "custoUnitario": 15.3,
        "subtotal": 0.46
      }
    ]
  },
  {
    "id": "FT160",
    "produto": "MAIONESE VERMELHA - PÁPRICA E CALABRESA",
    "custoTotal": 1.29,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "85445669",
        "nome": "(PR) Maionese Vermelha - Páprica e Calabresa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 12.82,
        "subtotal": 0.26
      }
    ]
  },
  {
    "id": "FT161",
    "produto": "MAIONESE VERMELHA - PÁPRICA E CALABRESA",
    "custoTotal": 1.29,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "85445669",
        "nome": "(PR) Maionese Vermelha - Páprica e Calabresa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 12.82,
        "subtotal": 0.26
      }
    ]
  },
  {
    "id": "FT162",
    "produto": "MAIONESE VERMELHA - PÁPRICA E PIMENTA CALABRESA",
    "custoTotal": 1.29,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "85445669",
        "nome": "(PR) Maionese Vermelha - Páprica e Calabresa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 12.82,
        "subtotal": 0.26
      }
    ]
  },
  {
    "id": "FT163",
    "produto": "MAIONESE VERMELHA - PÁPRICA E PIMENTA CALABRESA",
    "custoTotal": 1.29,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "85445669",
        "nome": "(PR) Maionese Vermelha - Páprica e Calabresa",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 12.82,
        "subtotal": 0.26
      }
    ]
  },
  {
    "id": "FT164",
    "produto": "MARACUJÁ COM GENGIBRE 300ML",
    "custoTotal": 2.19,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 3.39,
        "subtotal": 0.08
      },
      {
        "insumoId": "78355662",
        "nome": "(IN) Gengibre",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 28.98,
        "subtotal": 0.14
      },
      {
        "insumoId": "26515060",
        "nome": "(IN) Maracujá - Polpa",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 13.09,
        "subtotal": 1.96
      }
    ]
  },
  {
    "id": "FT165",
    "produto": "MARACUJÁ COM GENGIBRE 300ML",
    "custoTotal": 2.19,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 3.39,
        "subtotal": 0.08
      },
      {
        "insumoId": "78355662",
        "nome": "(IN) Gengibre",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 28.98,
        "subtotal": 0.14
      },
      {
        "insumoId": "26515060",
        "nome": "(IN) Maracujá - Polpa",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 13.09,
        "subtotal": 1.96
      }
    ]
  },
  {
    "id": "FT166",
    "produto": "MARACUJÁ COM GENGIBRE 300ML",
    "custoTotal": 2.19,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 3.39,
        "subtotal": 0.08
      },
      {
        "insumoId": "78355662",
        "nome": "(IN) Gengibre",
        "unidade": "Kg",
        "quantidade": 0.005,
        "custoUnitario": 28.98,
        "subtotal": 0.14
      },
      {
        "insumoId": "26515060",
        "nome": "(IN) Maracujá - Polpa",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 13.09,
        "subtotal": 1.96
      }
    ]
  },
  {
    "id": "FT167",
    "produto": "MORANGO COM MANJERICÃO 300ML",
    "custoTotal": 3.85,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 3.39,
        "subtotal": 0.08
      },
      {
        "insumoId": "83874981",
        "nome": "(IN) Manjericão Maço",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 4.0,
        "subtotal": 0.02
      },
      {
        "insumoId": "36524863",
        "nome": "(IN) Morango Congelado",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 25.0,
        "subtotal": 3.75
      }
    ]
  },
  {
    "id": "FT168",
    "produto": "MORANGO COM MANJERICÃO 300ML",
    "custoTotal": 3.85,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 3.39,
        "subtotal": 0.08
      },
      {
        "insumoId": "83874981",
        "nome": "(IN) Manjericão Maço",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 4.0,
        "subtotal": 0.02
      },
      {
        "insumoId": "36524863",
        "nome": "(IN) Morango Congelado",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 25.0,
        "subtotal": 3.75
      }
    ]
  },
  {
    "id": "FT169",
    "produto": "MORANGO COM MANJERICÃO 300ML",
    "custoTotal": 3.85,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.025,
        "custoUnitario": 3.39,
        "subtotal": 0.08
      },
      {
        "insumoId": "83874981",
        "nome": "(IN) Manjericão Maço",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 4.0,
        "subtotal": 0.02
      },
      {
        "insumoId": "36524863",
        "nome": "(IN) Morango Congelado",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 25.0,
        "subtotal": 3.75
      }
    ]
  },
  {
    "id": "FT170",
    "produto": "MORANGO COM MANJERICÃO 500ML",
    "custoTotal": 6.43,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 3.39,
        "subtotal": 0.14
      },
      {
        "insumoId": "83874981",
        "nome": "(IN) Manjericão Maço",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "36524863",
        "nome": "(IN) Morango Congelado",
        "unidade": "Kg",
        "quantidade": 0.25,
        "custoUnitario": 25.0,
        "subtotal": 6.25
      }
    ]
  },
  {
    "id": "FT171",
    "produto": "MORANGO COM MANJERICÃO 500ML",
    "custoTotal": 6.43,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 3.39,
        "subtotal": 0.14
      },
      {
        "insumoId": "83874981",
        "nome": "(IN) Manjericão Maço",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "36524863",
        "nome": "(IN) Morango Congelado",
        "unidade": "Kg",
        "quantidade": 0.25,
        "custoUnitario": 25.0,
        "subtotal": 6.25
      }
    ]
  },
  {
    "id": "FT172",
    "produto": "MORANGO COM MANJERICÃO 500ML",
    "custoTotal": 6.43,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 3.39,
        "subtotal": 0.14
      },
      {
        "insumoId": "83874981",
        "nome": "(IN) Manjericão Maço",
        "unidade": "Un",
        "quantidade": 0.01,
        "custoUnitario": 4.0,
        "subtotal": 0.04
      },
      {
        "insumoId": "36524863",
        "nome": "(IN) Morango Congelado",
        "unidade": "Kg",
        "quantidade": 0.25,
        "custoUnitario": 25.0,
        "subtotal": 6.25
      }
    ]
  },
  {
    "id": "FT173",
    "produto": "MOSTARDA ARTESANAL COM MEL",
    "custoTotal": 0.52,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "33351335",
        "nome": "(PR) Mostarda da Casa com Mel",
        "unidade": "L",
        "quantidade": 0.02,
        "custoUnitario": 26.22,
        "subtotal": 0.52
      }
    ]
  },
  {
    "id": "FT174",
    "produto": "MOSTARDA ARTESANAL DE MEL",
    "custoTotal": 0.52,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "33351335",
        "nome": "(PR) Mostarda da Casa com Mel",
        "unidade": "L",
        "quantidade": 0.02,
        "custoUnitario": 26.22,
        "subtotal": 0.52
      }
    ]
  },
  {
    "id": "FT175",
    "produto": "MOSTARDA ARTESANAL DE MEL",
    "custoTotal": 0.52,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "33351335",
        "nome": "(PR) Mostarda da Casa com Mel",
        "unidade": "L",
        "quantidade": 0.02,
        "custoUnitario": 26.22,
        "subtotal": 0.52
      }
    ]
  },
  {
    "id": "FT176",
    "produto": "PANACOTA DE CUMARU COM GANACHE DE CACHAÇA",
    "custoTotal": 0.83,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 3.39,
        "subtotal": 0.51
      },
      {
        "insumoId": "14098307",
        "nome": "(IN) Cachaça",
        "unidade": "L",
        "quantidade": 0.15,
        "custoUnitario": 65.0,
        "subtotal": 9.75
      },
      {
        "insumoId": "19905445",
        "nome": "(IN) Chocolate meio amargo",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "17849460",
        "nome": "(IN) Creme de Leite",
        "unidade": "L",
        "quantidade": 0.9,
        "custoUnitario": 3.69,
        "subtotal": 3.32
      },
      {
        "insumoId": "92110908",
        "nome": "(IN) Cumaru Semente",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "65601023",
        "nome": "(IN) Gelatina sem Sabor",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "20101576",
        "nome": "(IN) Leite Líquido L",
        "unidade": "L",
        "quantidade": 0.3,
        "custoUnitario": 7.59,
        "subtotal": 2.28
      }
    ]
  },
  {
    "id": "FT177",
    "produto": "PANACOTA DE CUMARU COM GANACHE DE CACHAÇA (ALCÓOLICA)",
    "custoTotal": 0.83,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 3.39,
        "subtotal": 0.51
      },
      {
        "insumoId": "14098307",
        "nome": "(IN) Cachaça",
        "unidade": "L",
        "quantidade": 0.15,
        "custoUnitario": 65.0,
        "subtotal": 9.75
      },
      {
        "insumoId": "19905445",
        "nome": "(IN) Chocolate meio amargo",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "17849460",
        "nome": "(IN) Creme de Leite",
        "unidade": "L",
        "quantidade": 0.9,
        "custoUnitario": 3.69,
        "subtotal": 3.32
      },
      {
        "insumoId": "92110908",
        "nome": "(IN) Cumaru Semente",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "65601023",
        "nome": "(IN) Gelatina sem Sabor",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "20101576",
        "nome": "(IN) Leite Líquido L",
        "unidade": "L",
        "quantidade": 0.3,
        "custoUnitario": 7.59,
        "subtotal": 2.28
      }
    ]
  },
  {
    "id": "FT178",
    "produto": "PANACOTA DE CUMARU COM GANACHE DE CACHAÇA (ALCÓOLICA)",
    "custoTotal": 0.83,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "89623228",
        "nome": "(IN) Açúcar cristal",
        "unidade": "Kg",
        "quantidade": 0.15,
        "custoUnitario": 3.39,
        "subtotal": 0.51
      },
      {
        "insumoId": "14098307",
        "nome": "(IN) Cachaça",
        "unidade": "L",
        "quantidade": 0.15,
        "custoUnitario": 65.0,
        "subtotal": 9.75
      },
      {
        "insumoId": "19905445",
        "nome": "(IN) Chocolate meio amargo",
        "unidade": "Kg",
        "quantidade": 0.3,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "17849460",
        "nome": "(IN) Creme de Leite",
        "unidade": "L",
        "quantidade": 0.9,
        "custoUnitario": 3.69,
        "subtotal": 3.32
      },
      {
        "insumoId": "92110908",
        "nome": "(IN) Cumaru Semente",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "65601023",
        "nome": "(IN) Gelatina sem Sabor",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 0.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "20101576",
        "nome": "(IN) Leite Líquido L",
        "unidade": "L",
        "quantidade": 0.3,
        "custoUnitario": 7.59,
        "subtotal": 2.28
      }
    ]
  },
  {
    "id": "FT179",
    "produto": "PÃO AUSTRALIANO",
    "custoTotal": 0.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "61091425",
        "nome": "Pão australiano 85g",
        "unidade": "Un",
        "quantidade": 0.0,
        "custoUnitario": 2.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT180",
    "produto": "PÃO AUSTRALIANO",
    "custoTotal": 0.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "61091425",
        "nome": "Pão australiano 85g",
        "unidade": "Un",
        "quantidade": 0.0,
        "custoUnitario": 2.0,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT181",
    "produto": "PÃO BRIOCHE",
    "custoTotal": 0.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 0.0,
        "custoUnitario": 1.5,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT182",
    "produto": "PÃO BRIOCHE",
    "custoTotal": 0.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 0.0,
        "custoUnitario": 1.5,
        "subtotal": 0.0
      }
    ]
  },
  {
    "id": "FT183",
    "produto": "QUEIJO COALHO",
    "custoTotal": 2.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "51001027",
        "nome": "(IN) Queijo Coalho",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 50.0,
        "subtotal": 2.0
      }
    ]
  },
  {
    "id": "FT184",
    "produto": "QUEIJO COALHO",
    "custoTotal": 2.0,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "51001027",
        "nome": "(IN) Queijo Coalho",
        "unidade": "Kg",
        "quantidade": 0.04,
        "custoUnitario": 50.0,
        "subtotal": 2.0
      }
    ]
  },
  {
    "id": "FT185",
    "produto": "QUEIJO PRATO",
    "custoTotal": 0.08,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 0.04,
        "custoUnitario": 1.96,
        "subtotal": 0.08
      }
    ]
  },
  {
    "id": "FT186",
    "produto": "QUEIJO PRATO",
    "custoTotal": 0.08,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 0.04,
        "custoUnitario": 1.96,
        "subtotal": 0.08
      }
    ]
  },
  {
    "id": "FT187",
    "produto": "SAÎ COM TUDO - ALL-IN BOX",
    "custoTotal": 7.49,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38320194",
        "nome": "Batatinha - porção individual",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 6.82,
        "subtotal": 6.82
      },
      {
        "insumoId": "23002728",
        "nome": "bicudinho - sobrecoxas de frango crocante - individual",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 6.35,
        "subtotal": 6.35
      }
    ]
  },
  {
    "id": "FT188",
    "produto": "SAÎ PURO - BURGUER COM MAIONESE DE ALHO",
    "custoTotal": 8.74,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "27152919",
        "nome": "Blend 120g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.48,
        "subtotal": 3.48
      },
      {
        "insumoId": "34297316",
        "nome": "maionese de alho e orégano",
        "unidade": "Un",
        "quantidade": 0.04,
        "custoUnitario": 2.02,
        "subtotal": 0.08
      }
    ]
  },
  {
    "id": "FT189",
    "produto": "TUBAÍNA 350ML",
    "custoTotal": 2.12,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "86393637",
        "nome": "(IT) Tubaína Monte Roraima Pet 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.12,
        "subtotal": 2.12
      }
    ]
  },
  {
    "id": "FT190",
    "produto": "TUBAÍNA 350ML",
    "custoTotal": 2.12,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "86393637",
        "nome": "(IT) Tubaína Monte Roraima Pet 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.12,
        "subtotal": 2.12
      }
    ]
  },
  {
    "id": "FT191",
    "produto": "TUBAÍNA 350ML",
    "custoTotal": 2.12,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "86393637",
        "nome": "(IT) Tubaína Monte Roraima Pet 350ml",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 2.12,
        "subtotal": 2.12
      }
    ]
  },
  {
    "id": "FT192",
    "produto": "X-BACON COM MOSTARDA ARTESANAL E MEL - SAÎ DE BACON",
    "custoTotal": 10.96,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 5.39,
        "subtotal": 0.01
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 4.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 71.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "78910390",
        "nome": "(PR) Blend 120g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.48,
        "subtotal": 3.48
      },
      {
        "insumoId": "33351335",
        "nome": "(PR) Mostarda da Casa com Mel",
        "unidade": "L",
        "quantidade": 0.02,
        "custoUnitario": 26.22,
        "subtotal": 0.52
      }
    ],
    "pdvId": "23972063",
    "nomeOnline": "X-Bacon com Mostarda Artesanal e mel - Saî de Bacon"
  },
  {
    "id": "FT193",
    "produto": "X-BACON COM MOSTARDA ARTESANAL E MEL - SAÎ DE BACON",
    "custoTotal": 10.96,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 5.39,
        "subtotal": 0.01
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 4.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 71.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "78910390",
        "nome": "(PR) Blend 120g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.48,
        "subtotal": 3.48
      },
      {
        "insumoId": "33351335",
        "nome": "(PR) Mostarda da Casa com Mel",
        "unidade": "L",
        "quantidade": 0.02,
        "custoUnitario": 26.22,
        "subtotal": 0.52
      }
    ]
  },
  {
    "id": "FT194",
    "produto": "X-BACON COM MOSTARDA ARTESANAL E MEL - SAÎ DE BACON",
    "custoTotal": 10.96,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "81833235",
        "nome": "(IN) Pimenta do Reino Moída",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 5.39,
        "subtotal": 0.01
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 4.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "77244720",
        "nome": "(PR) Bacon crocante",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 71.98,
        "subtotal": 1.44
      },
      {
        "insumoId": "78910390",
        "nome": "(PR) Blend 120g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.48,
        "subtotal": 3.48
      },
      {
        "insumoId": "33351335",
        "nome": "(PR) Mostarda da Casa com Mel",
        "unidade": "L",
        "quantidade": 0.02,
        "custoUnitario": 26.22,
        "subtotal": 0.52
      }
    ]
  },
  {
    "id": "FT195",
    "produto": "X-BURGUER COM PICLES ARTESANAL E MAIONESE DE ALHO - SAÎ LEVE",
    "custoTotal": 9.99,
    "precoVenda": 0,
    "markup": 0,
    "cmv": 0,
    "rendimentoBase": 1,
    "unidadeRendimento": "unidade",
    "modoPreparo": "",
    "componentes": [
      {
        "insumoId": "38684297",
        "nome": "(IN) Cebola Roxa",
        "unidade": "Kg",
        "quantidade": 0.01,
        "custoUnitario": 9.49,
        "subtotal": 0.09
      },
      {
        "insumoId": "72358735",
        "nome": "(IN) Manteiga",
        "unidade": "Un",
        "quantidade": 0.005,
        "custoUnitario": 26.29,
        "subtotal": 0.13
      },
      {
        "insumoId": "93407793",
        "nome": "(IN) Pão Brioche",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 1.5,
        "subtotal": 1.5
      },
      {
        "insumoId": "18463465",
        "nome": "(IN) Pimenta do Reino em Grãos",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 100.0,
        "subtotal": 0.1
      },
      {
        "insumoId": "72854117",
        "nome": "(IN) Queijo prato FATIADO / 2kg 184fatias",
        "unidade": "Un",
        "quantidade": 2.0,
        "custoUnitario": 1.96,
        "subtotal": 3.92
      },
      {
        "insumoId": "12455699",
        "nome": "(IN) Sal Fino",
        "unidade": "Kg",
        "quantidade": 0.001,
        "custoUnitario": 4.0,
        "subtotal": 0.0
      },
      {
        "insumoId": "78910390",
        "nome": "(PR) Blend 120g",
        "unidade": "Un",
        "quantidade": 1.0,
        "custoUnitario": 3.48,
        "subtotal": 3.48
      },
      {
        "insumoId": "80178611",
        "nome": "(PR) Maionese de Alho e Orégano",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 14.88,
        "subtotal": 0.3
      },
      {
        "insumoId": "37143991",
        "nome": "(PR) Picles de Pepino",
        "unidade": "Kg",
        "quantidade": 0.02,
        "custoUnitario": 22.87,
        "subtotal": 0.46
      }
    ]
  }
];
