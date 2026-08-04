import { router, publicProcedure } from "../init";
import { z } from "zod/v4";
import { db } from "@/lib/db";
import { sekolah } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";

export const npsnRouter = router({
  byNpsn: publicProcedure
    .input(z.string().min(8).max(8).regex(/^\d+$/))
    .query(async ({ input }) => {
      const rows = await db
        .select()
        .from(sekolah)
        .where(eq(sekolah.npsn, input))
        .limit(1);
      if (rows.length === 0) throw new Error("NPSN tidak ditemukan");
      return rows[0];
    }),
  search: publicProcedure
    .input(z.string().min(2).max(100))
    .query(async ({ input }) => {
      const rows = await db
        .select()
        .from(sekolah)
        .where(like(sekolah.sekolah, `%${input}%`))
        .limit(15);
      return rows;
    }),
});
