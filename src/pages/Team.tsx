import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Team = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>Meet the people behind Land ReGen</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Team information coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Team;
