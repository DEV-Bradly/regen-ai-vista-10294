import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, LeafyGreen, DollarSign, CheckCircle2 } from "lucide-react";

const CarbonTracker = () => {
  const [loading, setLoading] = useState(false);
  const [carbonData, setCarbonData] = useState({
    total_sequestered: 0,
    credit_value: 0,
    verified_credits: 0,
  });
  const [calcForm, setCalcForm] = useState({
    land_area: "",
    vegetation_type: "",
    improvement_percentage: "",
  });

  useEffect(() => {
    fetchCarbonData();
  }, []);

  const fetchCarbonData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('carbon_tracking')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      if (data && data.length > 0) {
        const total = data.reduce((sum, item) => sum + (parseFloat(item.carbon_sequestered?.toString() || '0') || 0), 0);
        const credits = data.reduce((sum, item) => sum + (parseFloat(item.carbon_credits?.toString() || '0') || 0), 0);
        const value = data.reduce((sum, item) => sum + (parseFloat(item.credit_value?.toString() || '0') || 0), 0);
        const verified = data.filter(item => item.verified).reduce((sum, item) => sum + (parseFloat(item.carbon_credits?.toString() || '0') || 0), 0);

        setCarbonData({
          total_sequestered: total,
          credit_value: value,
          verified_credits: verified,
        });
      }
    } catch (error) {
      console.error('Error fetching carbon data:', error);
    }
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const landArea = parseFloat(calcForm.land_area);
      const improvement = parseFloat(calcForm.improvement_percentage);

      const carbonSequestered = landArea * 3.67 * (improvement / 100);
      const carbonCredits = carbonSequestered / 1000;
      const creditValue = carbonCredits * 15;

      const { error } = await supabase
        .from('carbon_tracking')
        .insert({
          user_id: user.id,
          area_size: landArea,
          vegetation_type: calcForm.vegetation_type,
          carbon_sequestered: carbonSequestered,
          carbon_credits: carbonCredits,
          credit_value: creditValue,
          vegetation_improvement_percentage: improvement,
          verified: false,
        });

      if (error) throw error;

      await fetchCarbonData();

      toast({
        title: "Carbon Credits Calculated",
        description: `Generated ${carbonCredits.toFixed(2)} carbon credits worth $${creditValue.toFixed(2)}`,
      });

      setCalcForm({
        land_area: "",
        vegetation_type: "",
        improvement_percentage: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to calculate carbon credits",
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
        <h1 className="text-3xl font-bold mb-8">Carbon Tracker</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Carbon Sequestered</p>
                  <p className="text-3xl font-bold">{carbonData.total_sequestered.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">tonnes CO₂</p>
                </div>
                <LeafyGreen className="h-12 w-12 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Credit Value</p>
                  <p className="text-3xl font-bold">${carbonData.credit_value.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">USD</p>
                </div>
                <DollarSign className="h-12 w-12 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified Credits</p>
                  <p className="text-3xl font-bold">{carbonData.verified_credits.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">credits</p>
                </div>
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculate New Carbon Credits</CardTitle>
            <CardDescription>
              Calculate carbon sequestration based on your land area and vegetation improvement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="land_area">Land Area (hectares)</Label>
                  <Input
                    id="land_area"
                    type="number"
                    step="0.01"
                    value={calcForm.land_area}
                    onChange={(e) => setCalcForm({ ...calcForm, land_area: e.target.value })}
                    placeholder="e.g., 5.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vegetation_type">Vegetation Type</Label>
                  <Input
                    id="vegetation_type"
                    value={calcForm.vegetation_type}
                    onChange={(e) => setCalcForm({ ...calcForm, vegetation_type: e.target.value })}
                    placeholder="e.g., Mixed forest"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="improvement_percentage">Improvement (%)</Label>
                  <Input
                    id="improvement_percentage"
                    type="number"
                    step="0.1"
                    value={calcForm.improvement_percentage}
                    onChange={(e) => setCalcForm({ ...calcForm, improvement_percentage: e.target.value })}
                    placeholder="e.g., 25"
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate Carbon Credits"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CarbonTracker;
