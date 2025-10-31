import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SyncIndicator } from "./components/SyncIndicator";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SoilAnalyzer from "./pages/SoilAnalyzer";
import Map from "./pages/Map";
import CarbonTracker from "./pages/CarbonTracker";
import Weather from "./pages/Weather";
import KenyaInsights from "./pages/KenyaInsights";
import Financial from "./pages/Financial";
import Team from "./pages/Team";
import About from "./pages/About";
import EduHealth from "./pages/EduHealth";
import CropYieldPredictor from "./pages/CropYieldPredictor";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SyncIndicator />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/soil-analyzer" element={<ProtectedRoute><SoilAnalyzer /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
          <Route path="/carbon-tracker" element={<ProtectedRoute><CarbonTracker /></ProtectedRoute>} />
          <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
          <Route path="/kenya-insights" element={<ProtectedRoute><KenyaInsights /></ProtectedRoute>} />
          <Route path="/financial" element={<ProtectedRoute><Financial /></ProtectedRoute>} />
          <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/eduhealth" element={<ProtectedRoute><EduHealth /></ProtectedRoute>} />
          <Route path="/crop-yield-predictor" element={<ProtectedRoute><CropYieldPredictor /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
