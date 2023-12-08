import { z } from "zod";

export const ProductNameSchema = z.string().min(3).max(24);

export const ProductDescriptionSchema = z.string().min(10).max(255);

export const ProductCategorySchema = z.string().min(1).max(15);

export const ProductPriceSchema = z.number().min(0);

export const ProductColorSchema = z.object({
  name: z.string().min(3).max(15),
  value: z.string().min(4).max(25),
});

export const ProductColorsSchema = z.object({
  name: z.string().min(3).max(15),
  colors: z.array(ProductColorSchema).min(1),
});

export const CreateProductSchema = z.object({
  store_slug: z.string(),
  name: ProductNameSchema,
  description: ProductDescriptionSchema,
  category: ProductCategorySchema,
  colors: z.array(ProductColorsSchema),
  price: ProductPriceSchema,
});

export const RemoveProductSchema = z.object({
  id: z.number(),
  shop_slug: z.string(),
});

export type RemoveProductBody = z.infer<typeof RemoveProductSchema>;

export type ProductColor = z.infer<typeof ProductColorSchema>;
export type ProductColors = z.infer<typeof ProductColorsSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
