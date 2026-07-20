import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { NewsSection } from "@/components/NewsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { AcademyScrollbar } from "@/components/AcedemyScrollbar";
import { AboutSection } from "@/components/AboutSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { VideoSection } from "@/components/VideoSection";
import { ContactSection } from "@/components/ContactSection";
import { TeamSection } from "@/components/TeamSection";
import { WorldMapSection } from "@/components/WorldMapSection";
import { JoinUsSection } from "@/components/JoinUsSection";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <section className="py-16 lg:py-24 bg-gradient-hero text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container relative mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <section id="video">
                <VideoSection />
              </section>
              <AchievementsSection />
            </div>
          </div>
        </section>
        <AcademyScrollbar />
        <NewsSection />
        <TeamSection />
        <JoinUsSection />
        <ContactSection />
        <WorldMapSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
