import { router, publicProcedure } from "../init";
import { z } from "zod/v4";
import { db } from "@/lib/db";
import { kodepos } from "@/lib/db/schema";
import { eq, like, or } from "drizzle-orm";

export const kodeposRouter = router({
  byCode: publicProcedure
    .input(z.number().int().min(10000).max(99999))
    .query(async ({ input }) => {
      const rows = await db
        .select()
        .from(kodepos)
        .where(eq(kodepos.code, input))
        .limit(20);
      return rows;
    }),
  search: publicProcedure
    .input(z.string().min(2))
    .query(async ({ input }) => {
      const pattern = `%${input.trim()}%`;
      const rows = await db
        .select()
        .from(kodepos)
        .where(
          or(
            like(kodepos.village, pattern),
            like(kodepos.district, pattern),
            like(kodepos.regency, pattern)
          )
        )
        .limit(25);
      return rows;
    }),
});
