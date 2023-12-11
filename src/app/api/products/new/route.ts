import { auth } from "@/auth/auth";
import { createSlug } from "@/lib/slug";
import {
  CreateProductSchema,
  ProductColorAttribute,
  ProductSizeAttribute,
} from "@/validators/product";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export const revalidate = 0;

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
        slug: true,
      },
    });

    if (!shop) throw Error("Shop with given slug not found!");

    let sizesSection = await Promise.all(
      validate.sections.map((section) => {
        let sizes = section.attributes.filter(
          (att) => att.type == "sizes"
        ) as ProductSizeAttribute[];
        console.log(sizes);

        return sizes.map((size) => {
          return {
            type: size.type,
            colors: {
              createMany: {
                data: size.sizes,
              },
            },
          };
        });
      })
    );

    let colorsSection = await Promise.all(
      validate.sections.map((section) => {
        let colors = section.attributes.filter(
          (att) => att.type == "colors"
        ) as ProductColorAttribute[];

        return {
          name: section.name,
          attributes: {
            create: [
              ...colors.map((color) => {
                return {
                  type: color.type,
                  colors: {
                    createMany: {
                      data: color.colors,
                    },
                  },
                };
              }),
              ...sizesSection[0],
            ],
          },
        };
      })
    );

    console.log(colorsSection);

    let newProduct = await prisma.product.create({
      data: {
        name: validate.name,
        description: validate.description,
        slug: createSlug(validate.name),
        price: validate.price,
        shop_id: shop!.id,
        categories: {
          create: {
            name: validate.category,
            slug: createSlug(validate.category),
          },
        },
        sections: {
          create: [...colorsSection],
        },
      },
    });

    // let xd =await prisma.$transaction(async (transactionManager) => {

    //   let colorsSection = validate.sections.find( section => section.attributes.map( att => att.type == "colors"))

    //   let newProduct = prisma.product.create({
    //     data: {
    //       name: validate.name,
    //       description: validate.description,
    //       slug: createSlug(validate.name),
    //       price: validate.price,
    //       shop_id: shop!.id,
    //       categories: {
    //         create: {
    //           name: validate.category,
    //           slug: createSlug(validate.category),
    //         },
    //       },
    //       sections: {
    //         create: [
    //           {name: "Test",
    //            attributes: {
    //             create: {
    //               type: "colors",
    //               colors: {
    //                 createMany: {
    //                   data: [{ name: "test", value: ""}]
    //                 }
    //               }
    //             }
    //           }},
    //         ]
    //       }
    //     },
    //   });

    //   let

    // });
    // revalidatePath(`/dashboard/store/${shop.slug}/products`, "page");
    return Response.json({ newProduct });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};
