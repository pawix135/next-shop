"use server";
import { prisma } from "@/db/prisma";
import { Store } from "@prisma/client";

export const getStore = async (params: {
  slug?: string;
  id?: number;
}): Promise<Store | null> => {
  let { id, slug } = params;

  if (Object.keys(params).length == 0) throw Error("Provide slug or id");

  try {
    let store = await prisma.store.findFirst({
      where: {
        id,
        OR: [{ slug }],
      },
    });

    return store;
  } catch (error) {
    return null;
  }
};
