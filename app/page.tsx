import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CampaignVideo } from "@/components/CampaignVideo";
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

      {/*
       * Scroll vertical clássico (de cima para baixo), organizado como funil
       * de conversão: confiança → escolher → pedir → provas → contacto.
       */}
      <main>
        <Hero />
        <TrustBar />
        {/* anúncio em vídeo (Higgsfield) logo após a confiança: emoção antes da escolha */}
        <CampaignVideo />
        <CategoryGrid />
        <ProductGrid />
        {/* "Como comprar" logo após os produtos: remove fricção no momento da decisão */}
        <HowToBuy />
        <PromoBanner />
        <BrandHighlights />
        <Lookbook />
        <ContactSection />
        <Footer />
        {/* espaço para a barra de CTA fixa no telemóvel */}
        <div className="h-20 sm:hidden" aria-hidden />
      </main>

      {/* Overlays */}
      <PedidoDrawer />
      <WhatsAppButton />
    </>
  );
}
