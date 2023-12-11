import { auth } from "@/auth/auth";
import SectionFrom from "@/components/Tests";

export const metadata = {
  title: "Dashboard",
};

const DashboardPage = async () => {
  const session = await auth();

  return <main className="container mx-auto font-inter"></main>;
};

export default DashboardPage;
