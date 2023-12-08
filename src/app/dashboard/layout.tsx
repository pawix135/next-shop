import DashboardNavbar from "@/components/Dashboard/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <DashboardNavbar />
      {children}
    </main>
  );
}
