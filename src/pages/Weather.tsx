import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DayForecast {
  date: string;
  day: string;
  condition: string;
  tempMin: number;
  tempMax: number;
  precipitation: number;
  windSpeed: number;
  humidity: number;
}

const Weather = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<DayForecast[]>([
    {
      date: "Oct 15",
      day: "Wednesday",
      condition: "Sunny",
      tempMin: 14,
      tempMax: 25,
      precipitation: 0.0,
      windSpeed: 13,
      humidity: 65,
    },
    {
      date: "Oct 16",
      day: "Thursday",
      condition: "Sunny",
      tempMin: 15,
      tempMax: 25,
      precipitation: 0.0,
      windSpeed: 14,
      humidity: 67,
    },
    {
      date: "Oct 17",
      day: "Friday",
      condition: "Partly Cloudy",
      tempMin: 15,
      tempMax: 24,
      precipitation: 0.9,
      windSpeed: 15,
      humidity: 71,
    },
    {
      date: "Oct 18",
      day: "Saturday",
      condition: "Partly Cloudy",
      tempMin: 15,
      tempMax: 24,
      precipitation: 0.3,
      windSpeed: 13,
      humidity: 68,
    },
    {
      date: "Oct 19",
      day: "Sunday",
      condition: "Sunny",
      tempMin: 14,
      tempMax: 26,
      precipitation: 0.0,
      windSpeed: 12,
      humidity: 63,
    },
    {
      date: "Oct 20",
      day: "Monday",
      condition: "Partly Cloudy",
      tempMin: 16,
      tempMax: 25,
      precipitation: 0.5,
      windSpeed: 14,
      humidity: 69,
    },
    {
      date: "Oct 21",
      day: "Tuesday",
      condition: "Cloudy",
      tempMin: 15,
      tempMax: 23,
      precipitation: 1.2,
      windSpeed: 16,
      humidity: 73,
    },
  ]);

  const refreshForecast = () => {
    setLoading(true);
    toast({
      title: "Refreshing forecast",
      description: "Fetching latest weather data...",
    });
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Forecast updated",
        description: "Weather data is now up to date",
      });
    }, 1500);
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Sunny")) return <Sun className="h-8 w-8 text-secondary" />;
    if (condition.includes("Rain")) return <CloudRain className="h-8 w-8 text-accent" />;
    return <Cloud className="h-8 w-8 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-sky bg-clip-text text-transparent">
                7-Day Weather Forecast
              </h1>
              <p className="text-lg text-muted-foreground mt-2">Real-time climate data for your location</p>
            </div>
            <Button onClick={refreshForecast} disabled={loading} size="lg">
              <RefreshCw className={`mr-2 h-5 w-5 ${loading ? "animate-spin" : ""}`} />
              Refresh Forecast
            </Button>
          </div>

          {/* Forecast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {forecast.map((day, index) => (
              <Card
                key={index}
                className={`shadow-soft hover:shadow-glow transition-all ${
                  index === 0 ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{day.day}, {day.date}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        {getWeatherIcon(day.condition)}
                        <span className="font-medium">{day.condition}</span>
                      </CardDescription>
                    </div>
                    {index === 0 && (
                      <Badge variant="default" className="text-xs">
                        Today
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Temperature</p>
                      <p className="text-2xl font-bold text-primary">
                        {day.tempMin}° - {day.tempMax}°C
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Droplets className="h-4 w-4" />
                        <span>Precipitation</span>
                      </div>
                      <span className="font-medium">{day.precipitation} mm</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Wind className="h-4 w-4" />
                        <span>Wind Speed</span>
                      </div>
                      <span className="font-medium">{day.windSpeed} km/h</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Droplets className="h-4 w-4" />
                        <span>Humidity</span>
                      </div>
                      <span className="font-medium">{day.humidity}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Weather;
