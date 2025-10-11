import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const KenyaInsights = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Kenya Insights</CardTitle>
            <CardDescription>Regional land health data and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Kenya-specific insights coming soon...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default KenyaInsights;
