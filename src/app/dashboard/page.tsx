import { auth } from "@/auth/auth";
import DashboardNavbar from "@/components/Dashboard/Navbar";
import CreateNewStoreDialog from "@/components/Dashboard/Navbar/CreateNewStore";
import StoreSelector from "@/components/Dashboard/Navbar/StoreSelector";
import { getStore, getStores } from "@/fetchers/store";

const DashboardRoute = async () => {
  const session = await auth();

  let stores =
    (await getStores(session?.user!.id!, { name: true, slug: true })) ?? [];

  return (
    <main className="font-inter">
      <DashboardNavbar>
        {stores.length === 0 ? (
          <CreateNewStoreDialog />
        ) : (
          <StoreSelector stores={stores} />
        )}
      </DashboardNavbar>
      {session?.user?.name}
    </main>
  );
};

export default DashboardRoute;
