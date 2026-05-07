import Hero from "@/components/Hero";
import InteractiveExplorer from "@/components/InteractiveExplorer";
import Competencies from "@/components/Competencies";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Compliance from "@/components/Compliance";
import { getStaticChemicals } from "@/lib/static-data";

export default function Home() {
  const allChemicals = getStaticChemicals();
  const featuredChemicals = allChemicals.slice(0, 8);

  return (
    <>
      <Hero />
      <InteractiveExplorer />
      <AboutUs />
      <WhyChooseUs />
      <Competencies chemicals={featuredChemicals} />
      <Compliance />
    </>
  );
}
