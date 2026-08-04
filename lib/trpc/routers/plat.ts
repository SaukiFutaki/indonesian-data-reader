import { router, publicProcedure } from "../init";
import { z } from "zod/v4";
import { readPlat } from "@/lib/data/plat";

export const platRouter = router({
  read: publicProcedure
    .input(z.string().min(1).max(2).regex(/^[a-zA-Z]+$/))
    .query(({ input }) => {
      const record = readPlat(input);
      if (!record) throw new Error("Plat nomor tidak ditemukan");
      return record;
    }),
});
