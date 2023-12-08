import { auth } from "@/auth/auth";
import { getStores } from "@/fetchers/store";

const DashboardRoute = async () => {
  const session = await auth();

  let stores =
    (await getStores(session?.user!.id!, { name: true, slug: true })) ?? [];

  return <main className="font-inter">{session?.user?.name}</main>;
};

export default DashboardRoute;
