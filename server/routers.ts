import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { 
  insumosRouter, 
  fichasTecnicasRouter, 
  perdasRouter, 
  diarioProducaoRouter, 
  contagensRouter, 
  dashboardRouter, 
  contagensDiariasRouter, 
  auditoriaRouter, 
  deveresRouter, 
  lotesProducaoRouter, 
  colaboradoresRouter 
} from "./cozinha";
import { integracoesRouter } from "./integracoes"; // <--- Importe aqui

export const appRouter = router({
  // ... (rotas do sistema e auth mantidas)
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Rotas de gestão da cozinha
  insumos: insumosRouter,
  fichasTecnicas: fichasTecnicasRouter,
  perdas: perdasRouter,
  diarioProducao: diarioProducaoRouter,
  contagens: contagensRouter,
  dashboard: dashboardRouter,
  contagensDiarias: contagensDiariasRouter,
  auditoria: auditoriaRouter,
  deveres: deveresRouter,
  lotesProducao: lotesProducaoRouter,
  colaboradores: colaboradoresRouter,
  integracoes: integracoesRouter, // <--- Adicione aqui
});

export type AppRouter = typeof appRouter;
// ... imports
import { integracoesRouter } from "./integracoes";
import { analiseRouter } from "./analise"; // <--- Importe aqui

export const appRouter = router({
  // ...
  integracoes: integracoesRouter,
  analise: analiseRouter, // <--- Adicione aqui
});
