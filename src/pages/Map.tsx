import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Navigation as NavigationIcon, Satellite } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [activeLayer, setActiveLayer] = useState<"satellite" | "ndvi" | "terrain">("satellite");
  const { toast } = useToast();

  useEffect(() => {
    // Get user's GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: "Location detected",
            description: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`,
          });
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Location access denied",
            description: "Please enable location services to use the map",
          });
        }
      );
    }
  }, []);

  const layerInfo = {
    satellite: "High-resolution satellite imagery showing current land conditions",
    ndvi: "Normalized Difference Vegetation Index - measures vegetation health (green = healthy)",
    terrain: "Topographic view showing elevation and land formations",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-earth bg-clip-text text-transparent">
              Interactive Land Map
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Satellite-powered visualization of land health and restoration zones
            </p>
          </div>

          {/* Map Layers Control */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={activeLayer === "satellite" ? "default" : "outline"}
                  onClick={() => setActiveLayer("satellite")}
                  className="h-auto py-4 flex flex-col items-start"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Satellite className="h-4 w-4" />
                    <span className="font-semibold">Satellite View</span>
                  </div>
                  <span className="text-xs text-left opacity-80">Live satellite imagery</span>
                </Button>

                <Button
                  variant={activeLayer === "ndvi" ? "default" : "outline"}
                  onClick={() => setActiveLayer("ndvi")}
                  className="h-auto py-4 flex flex-col items-start"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Layers className="h-4 w-4" />
                    <span className="font-semibold">Vegetation Index (NDVI)</span>
                  </div>
                  <span className="text-xs text-left opacity-80">Health monitoring</span>
                </Button>

                <Button
                  variant={activeLayer === "terrain" ? "default" : "outline"}
                  onClick={() => setActiveLayer("terrain")}
                  className="h-auto py-4 flex flex-col items-start"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <NavigationIcon className="h-4 w-4" />
                    <span className="font-semibold">Terrain</span>
                  </div>
                  <span className="text-xs text-left opacity-80">Elevation view</span>
                </Button>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{layerInfo[activeLayer]}</p>
              </div>
            </CardContent>
          </Card>

          {/* Map View */}
          <Card className="shadow-glow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Live Satellite Data
                </span>
                {userLocation && (
                  <Badge variant="secondary" className="text-xs">
                    GPS: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Interactive mapping with real-time environmental monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={mapContainer}
                className="relative w-full h-[600px] rounded-lg overflow-hidden border-2 border-border bg-gradient-to-br from-primary/10 to-accent/10"
              >
                {/* Placeholder for map - In production, integrate Mapbox/Leaflet here */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <Satellite className="h-16 w-16 mx-auto text-primary animate-pulse" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        {activeLayer === "satellite" && "Satellite View Active"}
                        {activeLayer === "ndvi" && "NDVI Analysis Layer"}
                        {activeLayer === "terrain" && "Terrain Mapping"}
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        {userLocation
                          ? `Centered on your location: ${userLocation.lat.toFixed(4)}°, ${userLocation.lng.toFixed(4)}°`
                          : "Enable GPS to center map on your location"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NDVI Analysis Info */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>NDVI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Click markers to view vegetation health scores and degradation risk. Green zones indicate healthy
                vegetation, yellow shows moderate stress, and red indicates degradation.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Map;
