import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, Camera } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SoilAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('soil_analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnalyses(data || []);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      toast({
        title: "No Image",
        description: "Please select or capture a soil image first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('soil-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('soil-images')
        .getPublicUrl(fileName);

      const { data, error } = await supabase.functions.invoke('analyze-soil-image', {
        body: { imageUrl: publicUrl },
      });

      if (error) throw error;

      setAnalysis(data);
      await fetchAnalyses();

      toast({
        title: "Analysis Complete",
        description: "Your soil has been analyzed successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to analyze soil",
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
        <h1 className="text-3xl font-bold mb-8">Soil Analyzer</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Soil Sample</CardTitle>
              <CardDescription>Take a photo or upload an image of your soil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Image
                </Button>
                <Button
                  variant="outline"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageSelect}
                className="hidden"
              />

              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Soil preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={loading || !imageFile}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Soil"
                )}
              </Button>
            </CardContent>
          </Card>

          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>AI-powered soil health assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysis.soil_health_score !== undefined && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Soil Health Score</Label>
                      <span className="text-2xl font-bold">{analysis.soil_health_score}/100</span>
                    </div>
                    <Progress value={analysis.soil_health_score} className="h-3" />
                  </div>
                )}

                {analysis.npk && (
                  <div>
                    <Label className="mb-2 block">NPK Breakdown</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Nitrogen (N)</p>
                        <p className="text-xl font-bold">{analysis.npk.nitrogen}%</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Phosphorus (P)</p>
                        <p className="text-xl font-bold">{analysis.npk.phosphorus}%</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Potassium (K)</p>
                        <p className="text-xl font-bold">{analysis.npk.potassium}%</p>
                      </div>
                    </div>
                  </div>
                )}

                {analysis.ph_level && (
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>pH Level</Label>
                    <p className="text-xl font-semibold">{analysis.ph_level}</p>
                  </div>
                )}

                {analysis.organic_matter && (
                  <div className="p-4 bg-muted rounded-lg">
                    <Label>Organic Matter</Label>
                    <p className="text-xl font-semibold">{analysis.organic_matter}%</p>
                  </div>
                )}

                {analysis.ai_insights && (
                  <div>
                    <Label className="mb-2 block">AI-Powered Insights</Label>
                    <p className="text-sm text-muted-foreground">{analysis.ai_insights}</p>
                  </div>
                )}

                {analysis.restoration_recommendations && (
                  <div>
                    <Label className="mb-2 block">Restoration Recommendations</Label>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {analysis.restoration_recommendations.map((rec: string, idx: number) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {analyses.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Previous Analyses</CardTitle>
              <CardDescription>Your soil analysis history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyses.slice(0, 5).map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">
                          {item.soil_type || 'Soil Analysis'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {item.soil_health_score && (
                        <span className="text-lg font-bold">{item.soil_health_score}/100</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default SoilAnalyzer;
