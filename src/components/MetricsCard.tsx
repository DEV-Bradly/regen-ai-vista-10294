import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  gradient?: string;
  image?: string;
}

export const MetricsCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue,
  gradient,
  image 
}: MetricsCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-primary";
      case "down": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-soft hover:shadow-glow transition-all duration-300 border-border/50 backdrop-blur-sm overflow-hidden group">
      {image && (
        <div className="h-32 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${gradient ? `${gradient} bg-clip-text text-transparent` : 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold mb-1 ${gradient || ''}`}>
          {value}
        </div>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        {trend && trendValue && (
          <div className={`text-xs font-medium ${getTrendColor()}`}>
            {trend === "up" && "↑"} {trend === "down" && "↓"} {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
