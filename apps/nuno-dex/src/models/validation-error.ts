import { z } from "zod";

export type ValidationError = {
  errors: z.ZodError;
};
