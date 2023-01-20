import { z } from "zod";

export const listQuerySchema = z.object({
  page: z.string().regex(/\d+/),
  size: z.string().regex(/\d+/),
});

export type ListQuerySchema = z.TypeOf<typeof listQuerySchema>;
