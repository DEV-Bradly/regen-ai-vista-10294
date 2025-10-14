import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const CropYieldPredictor = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    region: "",
    season: "",
    precipitation_sum: "",
    mean_temp: "",
    ndvi_mean: "",
    soil_organic_carbon: "",
  });
  const [prediction, setPrediction] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('predict-crop-yield', {
        body: formData,
      });

      if (error) throw error;

      setPrediction(data);
      toast({
        title: "Prediction Generated",
        description: "Your crop yield prediction is ready!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate prediction",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Crop Yield Predictor</CardTitle>
            <CardDescription>
              Enter agricultural data to predict seasonal crop yields
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePredict} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    placeholder="e.g., Rift Valley"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Input
                    id="season"
                    name="season"
                    value={formData.season}
                    onChange={handleInputChange}
                    placeholder="e.g., Long Rains"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="precipitation_sum">Precipitation Sum (mm)</Label>
                  <Input
                    id="precipitation_sum"
                    name="precipitation_sum"
                    type="number"
                    step="0.01"
                    value={formData.precipitation_sum}
                    onChange={handleInputChange}
                    placeholder="e.g., 450"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mean_temp">Mean Temperature (°C)</Label>
                  <Input
                    id="mean_temp"
                    name="mean_temp"
                    type="number"
                    step="0.1"
                    value={formData.mean_temp}
                    onChange={handleInputChange}
                    placeholder="e.g., 22.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ndvi_mean">NDVI Mean (0-1)</Label>
                  <Input
                    id="ndvi_mean"
                    name="ndvi_mean"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.ndvi_mean}
                    onChange={handleInputChange}
                    placeholder="e.g., 0.65"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soil_organic_carbon">Soil Organic Carbon (%)</Label>
                  <Input
                    id="soil_organic_carbon"
                    name="soil_organic_carbon"
                    type="number"
                    step="0.01"
                    value={formData.soil_organic_carbon}
                    onChange={handleInputChange}
                    placeholder="e.g., 2.5"
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Prediction...
                  </>
                ) : (
                  "Predict Crop Yield"
                )}
              </Button>
            </form>

            {prediction && (
              <div className="mt-6 p-6 bg-muted rounded-lg space-y-4">
                <h3 className="text-lg font-semibold">Prediction Results</h3>
                {prediction.predicted_yield && (
                  <div>
                    <p className="text-sm text-muted-foreground">Predicted Yield</p>
                    <p className="text-2xl font-bold">{prediction.predicted_yield} tons/hectare</p>
                  </div>
                )}
                {prediction.confidence_score && (
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence Score</p>
                    <p className="text-lg font-semibold">{prediction.confidence_score}%</p>
                  </div>
                )}
                {prediction.ai_insights && (
                  <div>
                    <p className="text-sm text-muted-foreground">AI Insights</p>
                    <p className="text-sm">{prediction.ai_insights}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CropYieldPredictor;
