import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { BrandHighlights } from "@/components/BrandHighlights";
import { Lookbook } from "@/components/Lookbook";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoBanner } from "@/components/PromoBanner";
import { HowToBuy } from "@/components/HowToBuy";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { PedidoDrawer } from "@/components/PedidoDrawer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <BrandHighlights />
        <Lookbook />
        <CategoryGrid />
        <ProductGrid />
        {/* "Como comprar" logo após os produtos: remove fricção no momento da decisão */}
        <HowToBuy />
        <PromoBanner />
        <ContactSection />
      </main>
      <Footer />

      {/* Overlays */}
      <PedidoDrawer />
      <WhatsAppButton />
    </>
  );
}
