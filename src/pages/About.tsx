import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Leaf, TrendingUp, Users, MapPin, BarChart3, ExternalLink } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Leaf,
      title: "AI-powered soil analysis",
      description: "Advanced machine learning algorithms analyze soil health and provide actionable insights",
    },
    {
      icon: TrendingUp,
      title: "Carbon sequestration tracking",
      description: "Monitor carbon credits and manage your environmental impact in real-time",
    },
    {
      icon: MapPin,
      title: "Real-time weather forecasting",
      description: "Access localized weather data and environmental monitoring for informed decision-making",
    },
    {
      icon: BarChart3,
      title: "Interactive mapping tools",
      description: "Visualize land health with satellite imagery and NDVI vegetation indices",
    },
    {
      icon: Users,
      title: "Financial planning tools",
      description: "Track income, expenses, and optimize your sustainable agriculture investments",
    },
    {
      icon: Target,
      title: "Team collaboration",
      description: "Work together on restoration projects with integrated project management features",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Mission Statement */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-earth bg-clip-text text-transparent">
              Our Mission
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              landRegen is dedicated to revolutionizing land regeneration and sustainable agriculture through
              cutting-edge technology. We combine AI-powered analysis, real-time environmental monitoring, and
              collaborative tools to help landowners, farmers, and environmental organizations make data-driven
              decisions for a healthier planet.
            </p>
          </div>

          {/* What We Offer */}
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle className="text-3xl text-center">What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Creator Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 shadow-soft">
            <CardHeader>
              <CardTitle className="text-3xl text-center">About the Creator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                landRegen was designed and developed with a passion for combining technology and environmental
                sustainability. Learn more about the creator's work and portfolio.
              </p>
              <Button size="lg" asChild>
                <a
                  href="https://github.com/youngdevkip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  View Creator's Portfolio
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-8 border-t">
            <p>© 2025 by youngdev kip. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
