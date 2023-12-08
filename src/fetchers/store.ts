"use server";
import { prisma } from "@/db/prisma";
import { Prisma, Store } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

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

export const getStores = async (
  user_id: string,
  select: Prisma.StoreSelect | undefined = undefined
): Promise<Store[] | null> => {
  let stores = await prisma.store.findMany({
    where: {
      user_id,
    },
    select,
  });

  return stores;
};
