"use server";
import { prisma } from "@/db/prisma";

interface GetProductProps {
  product_slug?: string;
  id?: number;
}
export const getProduct = async ({ product_slug, id }: GetProductProps) => {
  if (!product_slug && !id) throw Error("Pass slug or id of a product!");

  let product = await prisma.product.findFirst({
    where: {
      id,
      OR: [{ slug: product_slug }],
    },
  });

  return product;
};

interface GetProductsProps {
  store_slug: string;
  limit?: number;
}
export const getProducts = async (props: GetProductsProps) => {
  let products = await prisma.product.findMany({
    where: {
      shop: {
        slug: props.store_slug,
      },
    },

    take: props.limit ?? 10,
  });

  return products;
};
