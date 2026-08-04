import { router, publicProcedure } from "../init";
import { z } from "zod/v4";
import { db } from "@/lib/db";
import { sekolah } from "@/lib/db/schema";
import { eq, like, or } from "drizzle-orm";

function expandAbbr(q: string): string {
  return q
    .replace(/\bSDN\b/gi, "SD NEGERI")
    .replace(/\bSMPN\b/gi, "SMP NEGERI")
    .replace(/\bSMAN\b/gi, "SMA NEGERI")
    .replace(/\bSMKN\b/gi, "SMK NEGERI")
    .replace(/\bSMAN\b/gi, "SMA NEGERI")
    .replace(/\bMTSN\b/gi, "MTS NEGERI")
    .replace(/\bMAN\b/gi, "MA NEGERI")
    .replace(/\bMIN\b/gi, "MI NEGERI");
}

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
      const expanded = expandAbbr(input);
      const rows = await db
        .select()
        .from(sekolah)
        .where(
          or(
            like(sekolah.sekolah, `%${input}%`),
            ...(expanded !== input ? [like(sekolah.sekolah, `%${expanded}%`)] : []),
          )
        )
        .limit(20);
      return rows;
    }),
});
