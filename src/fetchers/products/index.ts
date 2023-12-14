"use server";
import { prisma } from "@/db/prisma";

interface GetProductProps {
  product_slug?: string;
  product_id?: string;
  shop_slug: string;
}
export const getProduct = async ({
  product_slug,
  shop_slug,
  product_id,
}: GetProductProps) => {
  let product = await prisma.product.findFirst({
    where: {
      id: product_id,
      OR: [{ slug: product_slug }],
      AND: {
        shop: {
          slug: shop_slug,
        },
      },
    },
    include: {
      categories: true,
      sections: {
        include: {
          attributes: {
            include: {
              color_attributes: true,
              size_attributes: true,
            },
          },
        },
      },
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
