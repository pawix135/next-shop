import { auth } from "@/auth/auth";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import StoreSelector from "./StoreSelector";
import Menu from "./Menu";
import CreateNewStoreDialog from "./CreateNewStore";

interface Props {
  children?: React.ReactNode;
}

const DashboardNavbar: React.FC<Props> = async ({ children }) => {
  let session = await auth();

  return (
    <header className="p-3 bg-secondary">
      <nav className="flex flex-row items-center gap-5">
        <Link href={"/dashboard"} className="text-xl">
          Dashboard
        </Link>
        {children && children}
      </nav>
    </header>
  );
};

export default DashboardNavbar;
