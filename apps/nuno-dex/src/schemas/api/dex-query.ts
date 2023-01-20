import { z } from "zod";

export const dexQuerySchema = z.object({
  dex: z.string().regex(/\d+/),
});

export type DexQuerySchema = z.TypeOf<typeof dexQuerySchema>;
