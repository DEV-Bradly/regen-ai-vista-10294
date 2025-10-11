import { Button } from "@/components/ui/button";
import { Rocket, Github } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl gradient-earth p-12 md:p-16 shadow-glow">
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Ready to Build for the Planet?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Join the Land ReGen Hackathon and create AI-powered solutions for sustainable land management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group">
                <Rocket className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                Start Building Now
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>
            <div className="mt-8 text-sm text-primary-foreground/80">
              October 8-13, 2025 • 12:00 PM EAT
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-glow/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};
