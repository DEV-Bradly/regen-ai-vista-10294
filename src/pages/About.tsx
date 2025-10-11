import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>About Land ReGen</CardTitle>
            <CardDescription>Our mission to combat land degradation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Land ReGen is an AI-powered platform dedicated to monitoring and combating land degradation
                through innovative technology and data-driven solutions.
              </p>
              <p>
                Our mission is to provide accessible tools for soil health analysis, reforestation tracking,
                and climate resilience monitoring to help restore our planet's lands.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default About;
