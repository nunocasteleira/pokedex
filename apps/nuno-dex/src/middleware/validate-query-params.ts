import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { ValidationError } from "@/models/validation-error";

export function validateQueryParams<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- the schema will infer the type
  schema: z.ZodObject<any>,
  handler: NextApiHandler
) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<T | ValidationError>
  ) => {
    try {
      schema.parse(req.query);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- returning all errors
    } catch (error: any) {
      return res.status(400).json({ errors: error });
    }
    await handler(req, res);
  };
}
