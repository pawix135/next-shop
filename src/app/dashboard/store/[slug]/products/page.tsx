import DashboardNavbar from "@/components/Dashboard/Navbar";
import Menu from "@/components/Dashboard/Navbar/Menu";
import ProductsTable from "@/components/Dashboard/Products/ProductsTable";
import { getProducts } from "@/fetchers/products";

interface Props {
  params: {
    slug: string;
  };
}
const ProductsPage: React.FC<Props> = async ({ params: { slug } }) => {
  let products = await getProducts({ store_slug: slug });

  return (
    <main>
      <ProductsTable products={products} />
    </main>
  );
};

export default ProductsPage;
