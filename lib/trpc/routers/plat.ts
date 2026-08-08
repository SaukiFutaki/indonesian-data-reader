import { router, publicProcedure } from "../init";
import { z } from "zod/v4";
import { readPlatFull } from "@/lib/data/plat";

export const platRouter = router({
  read: publicProcedure
    .input(z.string().min(1).max(12))
    .query(({ input }) => {
      const record = readPlatFull(input);
      if (!record) throw new Error("Kode plat nomor tidak ditemukan");
      return record;
    }),
});
