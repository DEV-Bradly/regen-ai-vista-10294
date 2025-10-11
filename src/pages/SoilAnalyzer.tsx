import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SoilAnalyzer = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Soil Analyzer</CardTitle>
            <CardDescription>AI-powered soil health analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Soil analysis tools coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SoilAnalyzer;
