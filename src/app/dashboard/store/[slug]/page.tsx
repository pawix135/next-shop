import { getStore } from "@/fetchers/store";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface MetadataProps {
  params: {
    slug: string;
  };
}
export const generateMetadata = async ({
  params: { slug },
}: MetadataProps): Promise<Metadata> => {
  let store = await getStore({ slug });

  if (!store) throw Error("Store not found!");

  return {
    title: store.name,
  };
};

interface Props {
  params: {
    slug: string;
  };
}
const StorePage: React.FC<Props> = async ({ params: { slug } }) => {
  let store = await getStore({ slug });

  if (!store) notFound();

  return <section></section>;
};

export default StorePage;
