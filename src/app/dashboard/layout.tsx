import DashboardNavbar from "@/components/Dashboard/Navbar";

export const metadata = {
  title: {
    template: "Dashboard - %s",
    default: "Dashboard",
    absolute: "Dashboard",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardNavbar />
      {children}
    </div>
  );
}
