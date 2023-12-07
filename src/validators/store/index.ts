import { z } from "zod";

export const storeNameSchema = z.string().min(3).max(20);

export const newStoreSchema = z.object({
  name: storeNameSchema,
});

export type NewStoreInputType = z.infer<typeof newStoreSchema>;
