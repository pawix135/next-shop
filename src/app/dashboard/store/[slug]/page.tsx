import DashboardNavbar from "@/components/Dashboard/Navbar";
import Menu from "@/components/Dashboard/Navbar/Menu";
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

  return <section></section>;
};

export default StorePage;
