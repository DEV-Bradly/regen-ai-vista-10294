import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EduHealth = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>EduHealth</CardTitle>
            <CardDescription>Educational resources for sustainable land management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Educational resources coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EduHealth;
