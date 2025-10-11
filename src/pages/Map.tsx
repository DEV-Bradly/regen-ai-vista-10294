import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Map = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Map</CardTitle>
            <CardDescription>Real-time land monitoring visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Interactive map coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Map;
