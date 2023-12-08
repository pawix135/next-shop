import { auth } from "@/auth/auth";

const DashboardRoute = async () => {
  const session = await auth();

  return <main className="font-inter">{session?.user?.name}</main>;
};

export default DashboardRoute;
