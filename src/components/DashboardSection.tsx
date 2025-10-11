import { MetricsCard } from "./MetricsCard";
import { Leaf, Trees, CloudRain, BarChart3, Activity, TrendingUp } from "lucide-react";
import soilHealthIcon from "@/assets/soil-health-icon.jpg";
import reforestationIcon from "@/assets/reforestation-icon.jpg";
import climateIcon from "@/assets/climate-resilience-icon.jpg";

export const DashboardSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real-Time Land Health
            <span className="block gradient-earth bg-clip-text text-transparent">Intelligence Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor critical environmental metrics powered by AI, satellite imagery, and IoT sensors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <MetricsCard
            title="Soil Health Index"
            value="82%"
            description="Overall soil quality across monitored regions"
            icon={Leaf}
            trend="up"
            trendValue="+5.2% from last month"
            gradient="gradient-earth bg-clip-text text-transparent"
            image={soilHealthIcon}
          />
          <MetricsCard
            title="Reforestation Progress"
            value="12.4K"
            description="Hectares restored this quarter"
            icon={Trees}
            trend="up"
            trendValue="+18% growth rate"
            gradient="gradient-earth bg-clip-text text-transparent"
            image={reforestationIcon}
          />
          <MetricsCard
            title="Climate Resilience Score"
            value="76/100"
            description="Regional climate adaptation metric"
            icon={CloudRain}
            trend="stable"
            trendValue="Stable conditions"
            gradient="gradient-sky bg-clip-text text-transparent"
            image={climateIcon}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricsCard
            title="Carbon Sequestration"
            value="8.2M"
            description="Tons of CO₂ captured annually"
            icon={Activity}
            trend="up"
            trendValue="+12% this year"
            gradient="gradient-earth bg-clip-text text-transparent"
          />
          <MetricsCard
            title="Biodiversity Index"
            value="68%"
            description="Species diversity improvement"
            icon={TrendingUp}
            trend="up"
            trendValue="+9.3% increase"
            gradient="gradient-earth bg-clip-text text-transparent"
          />
          <MetricsCard
            title="Water Retention"
            value="94%"
            description="Soil moisture retention capacity"
            icon={BarChart3}
            trend="up"
            trendValue="+7% improvement"
            gradient="gradient-sky bg-clip-text text-transparent"
          />
        </div>
      </div>
    </section>
  );
};
