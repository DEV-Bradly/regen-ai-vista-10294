import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CarbonTracker = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Tracker</CardTitle>
            <CardDescription>Monitor carbon sequestration progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Carbon tracking features coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CarbonTracker;
