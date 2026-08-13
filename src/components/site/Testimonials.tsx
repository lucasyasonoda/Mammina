import { Star } from "lucide-react";
import logoMain from "@/assets/logo-main.jpeg";
import { StampPhoto } from "@/components/site/StampPhoto";

const testimonials = [
  {
    name: "Ana Beatriz",
    quote:
      "Encomendei para o aniversário da minha filha e sumiu antes da festa acabar. O de ninho com Nutella é surreal.",
  },
  {
    name: "Rafael Souza",
    quote:
      "Dá pra sentir que é feito à mão — nada de gosto de fábrica. O maracujá ficou no equilíbrio perfeito.",
  },
];

function Stars() {
  return (
    <div className="flex justify-center gap-1 text-sky md:justify-start">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="stripes-blush px-6 py-24">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
        <div className="text-center md:text-left">
          <Stars />
          <p className="mx-auto mt-4 max-w-[280px] text-[14.5px] italic leading-relaxed text-wine-dark/85 md:mx-0">
            “{testimonials[0].quote}”
          </p>
          <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-wine-dark/60">
            {testimonials[0].name}
          </p>
        </div>

        <div className="relative mx-auto">
          <StampPhoto
            src={logoMain}
            alt="Selo Mammina"
            tag="Depoimentos"
            rotate={-2}
            className="w-[190px]"
          />
        </div>

        <div className="text-center md:text-left">
          <Stars />
          <p className="mx-auto mt-4 max-w-[280px] text-[14.5px] italic leading-relaxed text-wine-dark/85 md:mx-0">
            “{testimonials[1].quote}”
          </p>
          <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-wine-dark/60">
            {testimonials[1].name}
          </p>
        </div>
      </div>
    </section>
  );
}
