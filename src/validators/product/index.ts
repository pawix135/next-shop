import { z } from "zod";

export const ProductNameSchema = z.string().min(3).max(24);

export const ProductDescriptionSchema = z.string().min(10).max(255);

export const ProductCategorySchema = z.string().min(1).max(15);

export const ProductColorSchema = z.object({
  name: z.string().min(3).max(15),
  value: z.string().min(4).max(25),
});

export const ProductColorsSchema = z.object({
  name: z.string().min(3).max(15),
  colors: z.array(ProductColorSchema),
});

export const CreateProductSchema = z.object({
  name: ProductNameSchema,
  description: ProductDescriptionSchema,
  category: ProductCategorySchema,
  colors: z.array(ProductColorsSchema),
});

export type ProductColor = z.infer<typeof ProductColorSchema>;
export type ProductColors = z.infer<typeof ProductColorsSchema>;
