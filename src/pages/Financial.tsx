import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Financial = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Financial Tools</CardTitle>
            <CardDescription>Funding and investment opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Financial tools coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Financial;
