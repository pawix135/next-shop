import { auth } from "@/auth/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { prisma } from "@/db/prisma";
import Link from "next/link";

const getStoresCount = async (id: string) => {
  let stores = await prisma.store.count({
    where: {
      user_id: id,
    },
  });
  return stores;
};

const DashboardNavbar: React.FC = async () => {
  let session = await auth();

  let storeCount = await getStoresCount(session?.user!.id!);

  return (
    <header>
      <nav>
        {storeCount == 0 ? (
          <Link
            className={buttonVariants({ variant: "default" })}
            href={"/dashboard/store/new"}
          >
            Create store
          </Link>
        ) : (
          <select name="" id="">
            <option value="test">Test 1</option>
          </select>
        )}
      </nav>
    </header>
  );
};

export default DashboardNavbar;
