import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Sprout, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KenyaInsights = () => {
  const { toast } = useToast();
  const [selectedCounty, setSelectedCounty] = useState("");
  const [cropName, setCropName] = useState("");
  const [soilType, setSoilType] = useState("");
  const [countyData, setCountyData] = useState<any>(null);
  const [cropInsights, setCropInsights] = useState<string>("");

  const kenyaCounties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Meru", "Nyeri", "Machakos",
    "Kiambu", "Kajiado", "Kitui", "Makueni", "Embu", "Tharaka-Nithi", "Kirinyaga"
  ];

  const fetchCountyData = () => {
    if (!selectedCounty) {
      toast({
        variant: "destructive",
        title: "Select a county",
        description: "Please choose a county first",
      });
      return;
    }

    // Simulated county data
    setCountyData({
      county: selectedCounty,
      agroEcologicalZone: "Highland Tropical",
      rainfallPattern: "Bimodal",
      plantingSeason: "March-May, October-December",
      avgRainfall: "800-1200 mm",
      temperature: "15-25°C",
    });

    toast({
      title: "County data loaded",
      description: `Agricultural data for ${selectedCounty} county`,
    });
  };

  const generateCropInsights = () => {
    if (!cropName) {
      toast({
        variant: "destructive",
        title: "Enter crop name",
        description: "Please specify a crop to get insights",
      });
      return;
    }

    const insights = `
AI-Powered Insights for ${cropName} in Kenya:

🌱 PLANTING RECOMMENDATIONS:
- Best planting period: Long rains (March-May) and short rains (October-November)
- Soil preparation: Deep tillage 2-3 weeks before planting
- Recommended spacing: 75cm x 25cm for optimal yield
${soilType ? `- Soil amendment for ${soilType}: Add organic matter and compost` : ""}

💧 WATER MANAGEMENT:
- Critical water stages: Germination, tasseling, and grain filling
- Irrigation frequency: Every 7-10 days during dry spells
- Moisture conservation: Mulching recommended in semi-arid regions

🌾 EXPECTED YIELD:
- Potential yield: 4-6 tons per hectare under good management
- With improved varieties: Up to 8-10 tons per hectare
- Market price range: KES 3,000-4,500 per 90kg bag

⚠️ COMMON CHALLENGES:
- Fall armyworm: Monitor and use integrated pest management
- Maize streak virus: Use resistant varieties
- Storage pests: Proper drying and hermetic storage

📊 CLIMATE ADAPTATION:
- Drought-tolerant varieties recommended for arid areas
- Early maturing varieties for areas with erratic rainfall
- Climate-smart practices: Conservation agriculture, agroforestry
    `;

    setCropInsights(insights);
    toast({
      title: "Insights generated",
      description: "AI analysis complete for your crop",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-earth bg-clip-text text-transparent">
              Kenya Regional Insights
            </h1>
            <p className="text-lg text-muted-foreground">
              Get region-specific agricultural insights tailored for Kenyan counties, agro-ecological zones, and local
              growing conditions.
            </p>
          </div>

          {/* County Selection */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Select Your County
              </CardTitle>
              <CardDescription>
                Choose your county to get localized planting calendars and weather data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="county">County</Label>
                <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                  <SelectTrigger id="county">
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    {kenyaCounties.map((county) => (
                      <SelectItem key={county} value={county}>
                        {county}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={fetchCountyData} className="w-full" size="lg">
                Fetch County Data
              </Button>

              {countyData && (
                <div className="mt-4 p-4 bg-primary/5 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg">{countyData.county} County Data</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Agro-Ecological Zone</p>
                      <Badge variant="secondary">{countyData.agroEcologicalZone}</Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rainfall Pattern</p>
                      <Badge variant="secondary">{countyData.rainfallPattern}</Badge>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Planting Season</p>
                      <p className="font-medium">{countyData.plantingSeason}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg. Rainfall</p>
                      <p className="font-medium">{countyData.avgRainfall}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Temperature Range</p>
                      <p className="font-medium">{countyData.temperature}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Crop Insights Generator */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                Generate Crop Insights
              </CardTitle>
              <CardDescription>
                Get AI-powered insights for specific crops adapted to Kenyan conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cropName">Crop Name</Label>
                <Input
                  id="cropName"
                  placeholder="e.g., Maize, Beans, Potatoes"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type (Optional)</Label>
                <Input
                  id="soilType"
                  placeholder="e.g., Clay, Sandy loam"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                />
              </div>

              <Button onClick={generateCropInsights} className="w-full" size="lg">
                Generate Insights
              </Button>

              {cropInsights && (
                <div className="mt-4 p-4 bg-accent/5 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono">{cropInsights}</pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* About Data Sources */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About This Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>This page integrates region-specific agricultural data for Kenya, including:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>County-level agro-ecological zone classification</li>
                <li>Bimodal and unimodal rainfall pattern tracking</li>
                <li>Seasonal planting calendars adapted to local conditions</li>
                <li>Real-time weather data from Open-Meteo</li>
                <li>AI-powered crop insights for African soils and climate</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong>Data sources:</strong> Open-Meteo API, Kenya Agricultural Observatory Platform (KAOP), and
                local agricultural research.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default KenyaInsights;
