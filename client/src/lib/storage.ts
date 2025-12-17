import { FichaTecnica, Insumo, fichasTecnicas as initialFichas, insumos as initialInsumos } from "./mock-data";

const FICHAS_KEY = "painel-cozinha-sai:fichas";
const INSUMOS_KEY = "painel-cozinha-sai:insumos";

// Inicializa o storage com dados mockados se estiver vazio
export function initStorage() {
  if (!localStorage.getItem(FICHAS_KEY)) {
    localStorage.setItem(FICHAS_KEY, JSON.stringify(initialFichas));
  }
  if (!localStorage.getItem(INSUMOS_KEY)) {
    localStorage.setItem(INSUMOS_KEY, JSON.stringify(initialInsumos));
  }
}

// Funções para Fichas Técnicas
export function getFichas(): FichaTecnica[] {
  const data = localStorage.getItem(FICHAS_KEY);
  return data ? JSON.parse(data) : initialFichas;
}

export function saveFichas(fichas: FichaTecnica[]) {
  localStorage.setItem(FICHAS_KEY, JSON.stringify(fichas));
  // Dispara evento para atualizar outros componentes se necessário
  window.dispatchEvent(new Event("storage-update"));
}

export function updateFicha(updatedFicha: FichaTecnica) {
  const fichas = getFichas();
  const index = fichas.findIndex(f => f.id === updatedFicha.id);
  
  if (index >= 0) {
    fichas[index] = updatedFicha;
  } else {
    fichas.push(updatedFicha);
  }
  
  saveFichas(fichas);
}

export function deleteFicha(id: string) {
  const fichas = getFichas();
  const newFichas = fichas.filter(f => f.id !== id);
  saveFichas(newFichas);
}

// Funções para Insumos
export function getInsumos(): Insumo[] {
  const data = localStorage.getItem(INSUMOS_KEY);
  return data ? JSON.parse(data) : initialInsumos;
}

export function saveInsumos(insumos: Insumo[]) {
  localStorage.setItem(INSUMOS_KEY, JSON.stringify(insumos));
  window.dispatchEvent(new Event("storage-update"));
}

export function updateInsumo(updatedInsumo: Insumo) {
  const insumos = getInsumos();
  const index = insumos.findIndex(i => i.id === updatedInsumo.id);
  
  if (index >= 0) {
    insumos[index] = updatedInsumo;
  } else {
    insumos.push(updatedInsumo);
  }
  
  saveInsumos(insumos);
}

// Hook simples para React
import { useState, useEffect } from "react";

export function useData() {
  const [fichas, setFichas] = useState<FichaTecnica[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);

  const loadData = () => {
    setFichas(getFichas());
    setInsumos(getInsumos());
  };

  useEffect(() => {
    initStorage();
    loadData();

    const handleStorageUpdate = () => loadData();
    
    window.addEventListener("storage-update", handleStorageUpdate);
    // Também escuta eventos de storage de outras abas
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage-update", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  return {
    fichas,
    insumos,
    updateFicha,
    deleteFicha,
    updateInsumo,
    saveInsumos, // Útil para salvar lista inteira (ex: atualização em massa)
    refresh: loadData
  };
}
