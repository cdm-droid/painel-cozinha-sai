// Este arquivo agora usa o backend TRPC para persistência real
// Mantém compatibilidade com as interfaces originais do mock-data.ts

import { useState, useEffect, useCallback } from "react";
import { trpc } from "./trpc";
import type { FichaTecnica, Insumo, Componente } from "./mock-data";

// Re-exportar tipos para uso em outros arquivos
export type { FichaTecnica, Insumo, Componente };

// Converte dados do backend para o formato do frontend
function convertInsumoFromBackend(data: any): Insumo {
  return {
    id: String(data.id),
    nome: data.nome,
    unidade: data.unidade,
    categoria: data.categoria,
    estoqueAtual: parseFloat(data.estoqueAtual) || 0,
    estoqueMinimo: parseFloat(data.estoqueMinimo) || 0,
    custoUnitario: parseFloat(data.custoUnitario) || 0,
    status: data.status as 'Normal' | 'Baixo' | 'Crítico',
    ultimaConferencia: data.ultimaConferencia || new Date().toLocaleDateString('pt-BR'),
    ativo: data.ativo ?? true,
  };
}

function convertFichaFromBackend(data: any): FichaTecnica {
  let componentes: Componente[] = [];
  
  if (data.componentes) {
    try {
      const parsed = typeof data.componentes === 'string' 
        ? JSON.parse(data.componentes) 
        : data.componentes;
      componentes = Array.isArray(parsed) ? parsed : [];
    } catch {
      componentes = [];
    }
  }

  return {
    id: String(data.id),
    produto: data.produto,
    custoTotal: parseFloat(data.custoTotal) || 0,
    precoVenda: parseFloat(data.precoVenda) || 0,
    markup: parseFloat(data.markup) || 0,
    cmv: parseFloat(data.cmv) || 0,
    rendimentoBase: parseFloat(data.rendimento) || 1,
    unidadeRendimento: 'un',
    modoPreparo: data.modoPreparo || '',
    pdvId: data.codigoPdv || undefined,
    nomeOnline: data.nomePdv || undefined,
    componentes,
  };
}

// Converte dados do frontend para o formato do backend
function convertInsumoToBackend(insumo: Partial<Insumo> & { id: string }) {
  // Mapeia 'Normal' do frontend para 'OK' do backend
  const statusMap: Record<string, 'OK' | 'Baixo' | 'Crítico'> = {
    'Normal': 'OK',
    'OK': 'OK',
    'Baixo': 'Baixo',
    'Crítico': 'Crítico',
  };
  
  return {
    id: parseInt(insumo.id),
    nome: insumo.nome,
    unidade: insumo.unidade,
    categoria: insumo.categoria,
    estoqueAtual: insumo.estoqueAtual?.toString(),
    estoqueMinimo: insumo.estoqueMinimo?.toString(),
    custoUnitario: insumo.custoUnitario?.toString(),
    status: insumo.status ? statusMap[insumo.status] : undefined,
    ativo: insumo.ativo,
  };
}

function convertFichaToBackend(ficha: Partial<FichaTecnica> & { id: string }) {
  return {
    id: parseInt(ficha.id),
    produto: ficha.produto,
    custoTotal: ficha.custoTotal?.toString(),
    precoVenda: ficha.precoVenda?.toString(),
    markup: ficha.markup?.toString(),
    cmv: ficha.cmv?.toString(),
    rendimento: ficha.rendimentoBase?.toString(),
    modoPreparo: ficha.modoPreparo,
    codigoPdv: ficha.pdvId,
    nomePdv: ficha.nomeOnline,
    componentes: ficha.componentes,
  };
}

// Hook principal que usa TRPC para buscar dados do backend
export function useData() {
  // Queries TRPC
  const { 
    data: insumosData = [], 
    isLoading: insumosLoading, 
    refetch: refetchInsumos 
  } = trpc.insumos.list.useQuery({});
  
  const { 
    data: fichasData = [], 
    isLoading: fichasLoading, 
    refetch: refetchFichas 
  } = trpc.fichasTecnicas.list.useQuery({});

  // Mutations TRPC
  const updateInsumoMutation = trpc.insumos.update.useMutation({
    onSuccess: () => refetchInsumos(),
  });

  const updateFichaMutation = trpc.fichasTecnicas.update.useMutation({
    onSuccess: () => refetchFichas(),
  });

  const createFichaMutation = trpc.fichasTecnicas.create.useMutation({
    onSuccess: () => refetchFichas(),
  });

  const deleteFichaMutation = trpc.fichasTecnicas.delete.useMutation({
    onSuccess: () => refetchFichas(),
  });

  // Converter dados do backend para o formato do frontend
  const insumos: Insumo[] = (insumosData || []).map(convertInsumoFromBackend);
  const fichas: FichaTecnica[] = (fichasData || []).map(convertFichaFromBackend);

  // Funções de atualização
  const updateInsumo = useCallback(async (insumo: Partial<Insumo> & { id: string }) => {
    try {
      await updateInsumoMutation.mutateAsync(convertInsumoToBackend(insumo));
    } catch (error) {
      console.error('Erro ao atualizar insumo:', error);
      throw error;
    }
  }, [updateInsumoMutation]);

  const updateFicha = useCallback(async (ficha: Partial<FichaTecnica> & { id: string }) => {
    try {
      await updateFichaMutation.mutateAsync(convertFichaToBackend(ficha));
    } catch (error) {
      console.error('Erro ao atualizar ficha:', error);
      throw error;
    }
  }, [updateFichaMutation]);

  const createFicha = useCallback(async (ficha: Omit<FichaTecnica, 'id'>) => {
    try {
      await createFichaMutation.mutateAsync({
        codigo: `FT-${Date.now()}`,
        produto: ficha.produto,
        categoria: 'Geral',
        rendimento: ficha.rendimentoBase?.toString(),
        custoTotal: ficha.custoTotal?.toString() || '0',
        precoVenda: ficha.precoVenda?.toString(),
        cmv: ficha.cmv?.toString(),
        markup: ficha.markup?.toString(),
        codigoPdv: ficha.pdvId,
        nomePdv: ficha.nomeOnline,
        modoPreparo: ficha.modoPreparo,
        componentes: ficha.componentes,
      });
    } catch (error) {
      console.error('Erro ao criar ficha:', error);
      throw error;
    }
  }, [createFichaMutation]);

  const deleteFicha = useCallback(async (id: string) => {
    try {
      await deleteFichaMutation.mutateAsync(parseInt(id));
    } catch (error) {
      console.error('Erro ao deletar ficha:', error);
      throw error;
    }
  }, [deleteFichaMutation]);

  const refresh = useCallback(() => {
    refetchInsumos();
    refetchFichas();
  }, [refetchInsumos, refetchFichas]);

  return {
    fichas,
    insumos,
    isLoading: insumosLoading || fichasLoading,
    updateFicha,
    createFicha,
    deleteFicha,
    updateInsumo,
    saveInsumos: async (newInsumos: Insumo[]) => {
      // Atualiza cada insumo individualmente
      for (const insumo of newInsumos) {
        await updateInsumo(insumo);
      }
    },
    refresh,
  };
}
