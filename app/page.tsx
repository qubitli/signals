import { Navbar } from "@/components/site/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { StatsSection } from "@/components/home/stats-section";
import { SignalsSection } from "@/components/home/signals-section";
import { PricingSection } from "@/components/home/pricing-section";
import { CTASection } from "@/components/home/cta-section";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <SignalsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
