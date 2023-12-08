import ProductsTable from "@/components/Dashboard/Products/ProductsTable";
import { getProducts } from "@/fetchers/products";

export const revalidate = 0;

interface Props {
  params: {
    slug: string;
  };
}
const ProductsPage: React.FC<Props> = async ({ params: { slug } }) => {
  let products = await getProducts({ store_slug: slug });

  return (
    <div className="col-span-10">
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsPage;
