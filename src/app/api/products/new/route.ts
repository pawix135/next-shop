import { auth } from "@/auth/auth";
import { createSlug } from "@/lib/slug";
import { CreateProductSchema } from "@/validators/product";
import { prisma } from "@/db/prisma";
import { sectionToPrismaCreate } from "@/utils/nestedSectionCreate";
import { redirect } from "next/navigation";

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

    console.log(validate.sections);

    if (!shop) throw Error("Shop with given slug not found!");

    let sections: any | undefined =
      validate.sections && validate.sections.length > 0
        ? await Promise.all(sectionToPrismaCreate(validate.sections))
        : undefined;

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
        sections: sections ? sections[0] : undefined,
      },
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};
