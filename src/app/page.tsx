import PromoBar from "@/components/PromoBar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Countdown from "@/components/Countdown";
import CampaignReveal from "@/components/CampaignReveal";
import Products from "@/components/Products";
import SocialProof from "@/components/SocialProof";
import Story from "@/components/Story";
import Purpose from "@/components/Purpose";
import PreorderSection from "@/components/PreorderSection";
import Footer from "@/components/Footer";
import PreorderModal from "@/components/PreorderModal";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import StickyNav from "@/components/StickyNav";
import { PreorderProvider } from "@/components/PreorderContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <PreorderProvider>
      <SmoothScrollProvider>
        <LoadingScreen />
        <ScrollProgress />
        <CustomCursor />
        <StickyNav />
        <a
          href="#collection"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to collection
        </a>
        <PromoBar />
        <main>
          <Hero />
          <Marquee />
          <Countdown />
          <CampaignReveal />
          <Products />
          <SocialProof />
          <Story />
          <Purpose />
          <PreorderSection />
        </main>
        <Footer />
        <PreorderModal />
      </SmoothScrollProvider>
    </PreorderProvider>
  );
}
