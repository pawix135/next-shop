import { auth } from "@/auth/auth";
import DashboardNavbar from "@/components/Dashboard/Navbar";

const DashboardRoute = async () => {
  const session = await auth();
  return (
    <main className="font-inter">
      <DashboardNavbar />
      {session?.user?.name}
    </main>
  );
};

export default DashboardRoute;
