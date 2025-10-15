import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Video, FileText, Sprout } from "lucide-react";

const EduHealth = () => {
  const resources = [
    {
      title: "Soil Health Fundamentals",
      description: "Learn the basics of soil health, organic matter, and sustainable farming practices",
      url: "https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health",
      icon: Sprout,
      type: "Article",
    },
    {
      title: "Regenerative Agriculture Guide",
      description: "Comprehensive guide to regenerative farming techniques and land restoration",
      url: "https://regenerationinternational.org/why-regenerative-agriculture/",
      icon: BookOpen,
      type: "Guide",
    },
    {
      title: "Carbon Sequestration Explained",
      description: "Understanding how soil captures carbon and fights climate change",
      url: "https://www.worldwildlife.org/stories/what-is-carbon-sequestration",
      icon: FileText,
      type: "Article",
    },
    {
      title: "Sustainable Land Management Courses",
      description: "Free online courses on land degradation, restoration, and sustainable practices",
      url: "https://www.coursera.org/search?query=sustainable%20agriculture",
      icon: Video,
      type: "Course",
    },
    {
      title: "Climate-Smart Agriculture",
      description: "FAO resources on climate-resilient farming and adaptation strategies",
      url: "https://www.fao.org/climate-smart-agriculture/en/",
      icon: BookOpen,
      type: "Resource Hub",
    },
    {
      title: "Agroforestry Practices",
      description: "Learn about integrating trees and crops for sustainable land use",
      url: "https://www.worldagroforestry.org/about/agroforestry",
      icon: Sprout,
      type: "Guide",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-earth bg-clip-text text-transparent">
              EduHealth Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated educational resources for sustainable land management, soil health, and regenerative agriculture
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <Card key={index} className="shadow-soft hover:shadow-glow transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <resource.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription className="text-xs mt-1">{resource.type}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                  <Button asChild className="w-full">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Visit Resource
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Learn More</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These resources are carefully selected from trusted organizations dedicated to sustainable agriculture,
                land restoration, and environmental conservation. Regular updates ensure you have access to the latest
                research and best practices in land management.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EduHealth;
