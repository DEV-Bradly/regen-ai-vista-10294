import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Map } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  const handleExploreMap = () => {
    if (isAuthenticated) {
      navigate("/map");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        
        {/* CTA Buttons Section */}
        <section className="py-12 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="min-w-[200px]"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleExploreMap}
                className="min-w-[200px]"
              >
                <Map className="mr-2 h-5 w-5" />
                Explore Map
              </Button>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
