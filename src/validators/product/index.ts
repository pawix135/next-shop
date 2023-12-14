import { z } from "zod";

export const ProductNameSchema = z.string().min(3).max(24);

export const ProductDescriptionSchema = z.string().min(10).max(255);

export const ProductCategorySchema = z.string().min(1).max(15);

export const ProductPriceSchema = z.number().min(0);

export const ProductColorSchema = z.object({
  name: z.string().min(3).max(15),
  value: z.string().min(4).max(25),
});

export const ProductSizeSchema = z.object({
  name: z.string().min(1).max(15),
  value: z.string().min(1).max(25),
});

export const ProductDragDataSchema = z.object({
  containerIndex: z.number(),
  draggedIndex: z.number(),
});

export const ProductAttributeNameSchema = z.string().min(3).max(50);

export const ProductAttributeTypeSchema = z.enum(["colors", "sizes"]);

export const ProductColorAttributeSchema = z.object({
  type: z.literal("colors"),
  name: ProductAttributeNameSchema,
  colors: z.array(ProductColorSchema),
});

export const ProductSizeAttributeSchema = z.object({
  type: z.literal("sizes"),
  name: ProductAttributeNameSchema,
  sizes: z.array(ProductSizeSchema),
});

export const ProductAttributeSchema = z.discriminatedUnion("type", [
  ProductColorAttributeSchema,
  ProductSizeAttributeSchema,
]);

export const ProductSectionNameSchema = z.string().min(1).max(50);

export const ProductSectionSchema = z.object({
  name: ProductSectionNameSchema,
  attributes: z.array(ProductAttributeSchema),
});

export const CreateProductSchema = z.object({
  store_slug: z.string(),
  name: ProductNameSchema,
  description: ProductDescriptionSchema,
  category: ProductCategorySchema,
  price: ProductPriceSchema,
  sections: z.array(ProductSectionSchema),
});

export const RemoveProductSchema = z.object({
  id: z.number(),
  shop_slug: z.string(),
});

export type RemoveProductBody = z.infer<typeof RemoveProductSchema>;
export type ProductColor = z.infer<typeof ProductColorSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;

export type ProductAttribute = z.infer<typeof ProductAttributeSchema>;
export type ProductAtrributeType = z.infer<typeof ProductAttributeTypeSchema>;
export type ProductDragData = z.infer<typeof ProductDragDataSchema>;

export type ProductAttributeSection = z.infer<typeof ProductSectionSchema>;
export type ProductColorAttribute = z.infer<typeof ProductColorAttributeSchema>;
export type ProductSizeAttribute = z.infer<typeof ProductSizeAttributeSchema>;
