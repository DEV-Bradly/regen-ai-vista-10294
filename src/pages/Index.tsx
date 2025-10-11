import { HeroSection } from "@/components/HeroSection";
import { DashboardSection } from "@/components/DashboardSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DashboardSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
};

export default Index;
