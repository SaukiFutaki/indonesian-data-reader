import { router } from "../init";
import { nikRouter } from "./nik";
import { kodeposRouter } from "./kodepos";
import { npsnRouter } from "./npsn";
import { platRouter } from "./plat";

export const appRouter = router({
  nik: nikRouter,
  kodepos: kodeposRouter,
  npsn: npsnRouter,
  plat: platRouter,
});

export type AppRouter = typeof appRouter;

