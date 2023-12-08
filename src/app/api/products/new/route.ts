import { auth } from "@/auth/auth";
import { createSlug } from "@/lib/slug";
import { CreateProductSchema } from "@/validators/product";
import { prisma } from "@/db/prisma";

export const POST = async (req: Request) => {
  try {
    let session = await auth();
    if (!session?.user) throw Error("Sign in to update your store!");

    let body = await req.json();
    let validate = CreateProductSchema.parse(body);

    let shop = await prisma?.store.findFirst({
      where: {
        slug: validate.store_slug,
        AND: {
          user_id: session.user.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (!shop) throw Error("Shop with given slug not found!");

    let newProduct = await prisma.product.create({
      data: {
        name: validate.name,
        description: validate.description,
        slug: createSlug(validate.name),
        price: validate.price,
        shop_id: shop.id,
        categories: {
          create: {
            productCategory: {
              create: {
                name: validate.category,
                slug: createSlug(validate.category),
              },
            },
          },
        },
      },
    });

    if (validate.colors.length > 0) {
      let createColorSets = await prisma.$transaction([
        ...validate.colors.map((att) => {
          return prisma.colorSet.create({
            data: {
              name: att.name,
              colors: {
                createMany: {
                  data: att.colors,
                },
              },
            },
            select: { id: true },
          });
        }),
      ]);

      await prisma.product.update({
        where: {
          id: newProduct.id,
        },
        data: {
          color_sets: {
            createMany: {
              data: [
                ...createColorSets.map((set) => ({ color_set_id: set.id })),
              ],
            },
          },
        },
      });
    }

    return Response.json(newProduct);
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};
