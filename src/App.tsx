import { CartProvider } from "@/hooks/use-cart";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { ValueSection } from "@/components/site/ValueSection";
import { SaboresOffer } from "@/components/site/SaboresOffer";
import { Testimonials } from "@/components/site/Testimonials";
import { Menu } from "@/components/site/Menu";
import { Story } from "@/components/site/Story";
import { OrderForm } from "@/components/site/OrderForm";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { FloatingCartButton } from "@/components/site/FloatingCartButton";

export default function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <Marquee text="Mammina" />
        <ValueSection />
        <SaboresOffer />
        <Testimonials />
        <Marquee text="Encomende já" variant="light" />
        <Menu />
        <Story />
        <OrderForm />
      </main>
      <Footer />
      <FloatingCartButton />
      <CartDrawer />
    </CartProvider>
  );
}
