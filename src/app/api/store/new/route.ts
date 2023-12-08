import { auth } from "@/auth/auth";
import { createSlug } from "@/lib/slug";
import { newStoreSchema } from "@/validators/store";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

export const POST = async (request: Request) => {
  try {
    let session = await auth();
    if (!session?.user) throw Error("User not authenticated!");
    console.log(session.user);

    let validate = newStoreSchema.parse(await request.json());

    let slug = createSlug(validate.name);

    let newStore = await prisma.store.create({
      data: {
        name: validate.name,
        slug,
        user_id: session.user.id,
      },
    });

    let storeUrl = new URL("/dashboard/store/" + newStore.slug, request.url);
    revalidatePath("/dashboard", "layout");
    return Response.json({
      ok: true,
      redirect_uri: storeUrl,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 409 });
  }
};
