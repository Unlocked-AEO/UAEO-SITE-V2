import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductHero } from "@/components/home/ProductHero";
import { ProductFeatureSection } from "@/components/home/ProductFeatureSection";
import { ProductCTA } from "@/components/home/ProductCTA";
import { productFeatures } from "@/data/mock-product";

export default function Product() {
  return (
    <div className="font-sans antialiased flex flex-col min-h-screen">
      <Header />
      <ProductHero />
      {productFeatures.map((feature) => (
        <ProductFeatureSection key={feature.badge} feature={feature} />
      ))}
      <ProductCTA />
      <Footer />
    </div>
  );
}
