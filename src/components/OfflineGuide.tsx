import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudOff, Database, RefreshCw, Wifi } from "lucide-react";

export const OfflineGuide = () => {
  return (
    <Card className="mb-6 border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Offline-First Technology
        </CardTitle>
        <CardDescription>
          This app works seamlessly without internet connection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <CloudOff className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Works Offline</p>
              <p className="text-xs text-muted-foreground">All features available without internet</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <Database className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Local Storage</p>
              <p className="text-xs text-muted-foreground">Data saved on your device instantly</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <RefreshCw className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Auto Sync</p>
              <p className="text-xs text-muted-foreground">Cloud backup when online</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <Wifi className="h-4 w-4" />
          <span>Perfect for remote field work with unreliable connectivity</span>
        </div>
      </CardContent>
    </Card>
  );
};
