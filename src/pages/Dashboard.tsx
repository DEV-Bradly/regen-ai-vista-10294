import Navigation from "@/components/Navigation";
import { DashboardSection } from "@/components/DashboardSection";
import { OfflineGuide } from "@/components/OfflineGuide";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6">
          <OfflineGuide />
          <DashboardSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
