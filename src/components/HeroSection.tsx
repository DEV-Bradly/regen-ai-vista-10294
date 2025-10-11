import { Button } from "@/components/ui/button";
import { Sprout, TrendingUp, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-land-monitoring.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30">
          <Leaf className="w-4 h-4 text-primary-glow" />
          <span className="text-sm font-medium text-primary-foreground">Land ReGen Hackathon 2025</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground drop-shadow-2xl">
          AI-Powered Land
          <span className="block gradient-earth bg-clip-text text-transparent">
            Regeneration Platform
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-foreground/90 drop-shadow-lg">
          Monitor soil health, track reforestation, and build climate resilience with cutting-edge AI and satellite data
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="xl" className="group">
            <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
            View Dashboard
          </Button>
          <Button variant="outline" size="xl" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10">
            <Sprout className="w-5 h-5" />
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-md p-6 rounded-xl border border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300">
            <div className="text-4xl font-bold gradient-earth bg-clip-text text-transparent mb-2">15M+</div>
            <div className="text-primary-foreground/80">Hectares Monitored</div>
          </div>
          <div className="bg-card/30 backdrop-blur-md p-6 rounded-xl border border-accent/20 shadow-soft hover:shadow-glow transition-all duration-300">
            <div className="text-4xl font-bold gradient-sky bg-clip-text text-transparent mb-2">98%</div>
            <div className="text-primary-foreground/80">AI Accuracy</div>
          </div>
          <div className="bg-card/30 backdrop-blur-md p-6 rounded-xl border border-secondary/20 shadow-soft hover:shadow-glow transition-all duration-300">
            <div className="text-4xl font-bold gradient-soil bg-clip-text text-transparent mb-2">24/7</div>
            <div className="text-primary-foreground/80">Real-time Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
};
