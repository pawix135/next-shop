import { auth } from "@/auth/auth";
import Link from "next/link";
import Menu from "./Menu";
import { useParams } from "next/navigation";
import { getStores } from "@/fetchers/store";
import CreateNewStoreDialog from "./CreateNewStore";

interface Props {}

const DashboardNavbar: React.FC<Props> = async () => {
  let session = await auth();

  let stores =
    (await getStores(session?.user!.id!, { name: true, slug: true })) ?? [];

  return (
    <header className="p-3 bg-secondary">
      <nav className="flex flex-row items-center gap-5">
        <Link href={"/dashboard"} className="text-xl">
          Dashboard
        </Link>
        <Menu stores={stores} />
        {stores.length == 0 && (
          <div className="ml-auto">
            <CreateNewStoreDialog />
          </div>
        )}
      </nav>
    </header>
  );
};

export default DashboardNavbar;
