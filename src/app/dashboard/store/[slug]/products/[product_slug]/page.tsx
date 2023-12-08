import { getProduct } from "@/fetchers/products";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
    product_slug: string;
  };
}
const ProductPage: React.FC<Props> = async ({
  params: { slug, product_slug },
}) => {
  console.log(product_slug);

  if (!slug) notFound();

  let product = await getProduct({ product_slug });

  if (!product) notFound();

  return <div>{product.name}</div>;
};

export default ProductPage;
