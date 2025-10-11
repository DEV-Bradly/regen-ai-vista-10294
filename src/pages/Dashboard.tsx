import Navigation from "@/components/Navigation";
import { DashboardSection } from "@/components/DashboardSection";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <DashboardSection />
      </main>
    </div>
  );
};

export default Dashboard;
