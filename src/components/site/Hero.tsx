import logoFancy from "@/assets/logo-fancy.jpeg";
import { Button } from "@/components/ui/button";
import { StampPhoto } from "@/components/site/StampPhoto";
import { brand } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="stripes-blush px-4 py-10 md:px-8 md:py-14">
      <div className="scallop-card mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-7 py-12 md:grid-cols-2 md:gap-8 md:px-14 md:py-16">
        <div className="order-2 flex justify-center md:order-1 md:justify-start">
          <StampPhoto
            src={logoFancy}
            alt="Fatia de bolo Mammina servida com carinho"
            tag="Ver cardápio"
            className="w-[240px] sm:w-[300px] md:w-[340px]"
          />
        </div>

        <div className="animate-hero-rise order-1 text-center md:order-2 md:text-left">
          <span className="eyebrow">Por {brand.name}</span>
          <h1 className="mt-2 text-[clamp(30px,4.4vw,46px)] font-semibold leading-[1.08] text-wine-dark">
            Ajudando seu dia
            <br />a ficar mais doce.
          </h1>
          <div className="mx-auto my-5 h-[3px] w-16 bg-sky md:mx-0" />
          <p className="mx-auto max-w-[380px] text-[15.5px] leading-relaxed text-ink/70 md:mx-0">
            Doze sabores autorais de brigadeiro, enrolados à mão em pequenas porções — feitos por
            encomenda em {brand.city}.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4 md:justify-start">
            <Button asChild>
              <a href="#doces">Ver os sabores</a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#historia">Saiba mais sobre nós</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
