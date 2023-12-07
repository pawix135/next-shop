import { getStore } from "@/fetchers/store";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}
const StorePage: React.FC<Props> = async ({ params: { slug } }) => {
  let store = await getStore({ slug });

  if (!store) notFound();

  return <div>store page {slug}</div>;
};

export default StorePage;
