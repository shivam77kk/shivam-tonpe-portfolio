import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CaseStudiesSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
