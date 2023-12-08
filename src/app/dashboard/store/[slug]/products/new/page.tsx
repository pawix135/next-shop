import NewProductForm from "@/components/Forms/NewProduct";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

const NewProductPage: React.FC<Props> = ({ params: { slug } }) => {
  if (!slug) return notFound();

  return (
    <main className="container mx-auto ">
      <NewProductForm store_slug={slug} />
    </main>
  );
};

export default NewProductPage;
