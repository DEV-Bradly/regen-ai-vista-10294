import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Satellite, Database, LineChart, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning models detect soil degradation patterns and predict future trends with 98% accuracy",
    gradient: "gradient-earth"
  },
  {
    icon: Satellite,
    title: "Satellite Monitoring",
    description: "Real-time remote sensing data from multiple satellites for comprehensive land coverage and change detection",
    gradient: "gradient-sky"
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Seamlessly integrate GIS, IoT sensors, and climate data for holistic environmental insights",
    gradient: "gradient-soil"
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "Forecast land degradation risks and optimize restoration strategies using historical patterns",
    gradient: "gradient-earth"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Monitor land health across continents with multi-regional support and localized insights",
    gradient: "gradient-sky"
  },
  {
    icon: Shield,
    title: "Climate Resilience",
    description: "Build adaptive capacity against climate change with data-driven resilience planning",
    gradient: "gradient-soil"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Platform Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools for sustainable land management and regeneration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="shadow-soft hover:shadow-glow transition-all duration-300 border-border/50 group"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
