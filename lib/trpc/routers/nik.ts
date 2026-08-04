import { router, publicProcedure } from "../init";
import { z } from "zod/v4";
import { parseNIK } from "@/lib/nik/parse";

export const nikRouter = router({
  read: publicProcedure
    .input(z.string().min(2).max(16).regex(/^\d+$/))
    .query(({ input }) => parseNIK(input)),
});

