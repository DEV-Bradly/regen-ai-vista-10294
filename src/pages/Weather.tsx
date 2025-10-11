import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Weather = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Weather Monitoring</CardTitle>
            <CardDescription>Real-time climate data and forecasts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Weather monitoring coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Weather;
