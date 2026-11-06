import LobeStack from "@/components/LobeStack";
import ScrollReveal from "@/components/ScrollReveal";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import MethodSection from "@/components/sections/MethodSection";
import StudioSection from "@/components/sections/StudioSection";

export default function Home() {
  return (
    <main>
      <ScrollReveal>
        <LobeStack>
          <HeroSection />
          <StudioSection />
          <MethodSection />
          <ContactSection />
        </LobeStack>
      </ScrollReveal>
    </main>
  );
}
