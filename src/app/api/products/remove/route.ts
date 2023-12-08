import { auth } from "@/auth/auth";
import { RemoveProductSchema } from "@/validators/product";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

export const POST = async (req: Request) => {
  try {
    let session = await auth();

    if (!session?.user) throw Error("Not authenticated!");

    let validate = RemoveProductSchema.parse(await req.json());
    console.log(validate);

    await prisma.product.delete({
      where: {
        id: validate.id,
        AND: {
          shop: {
            slug: validate.shop_slug,
          },
        },
      },
    });

    revalidatePath(`/dashboard/store/${validate.shop_slug}/products`, "page");
    return Response.json({ ok: true });
  } catch (error) {
    console.log(error);

    return Response.json({
      ok: false,
    });
  }
};
