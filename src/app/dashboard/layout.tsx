import DashboardNavbar from "@/components/Dashboard/Navbar";

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
