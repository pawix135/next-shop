import { getProduct } from "@/fetchers/products";

export const metadata = {
  title: "Edit",
};

interface Props {
  params: {
    slug: string;
    product_slug: string;
  };
}

const ProductEditPage: React.FC<Props> = async ({
  params: { product_slug, slug },
}) => {
  let product = await getProduct({ shop_slug: slug, product_slug });

  console.log(product);

  return (
    <main>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </main>
  );
};

export default ProductEditPage;
