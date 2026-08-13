import { Squiggle } from "@/components/site/Squiggle";
import { useReveal } from "@/hooks/use-reveal";

const offers = [
  {
    icon: "🍫",
    title: "Clássicos de sempre",
    description: "Brigadeiro, beijinho e paçoca — os sabores que nunca saem de moda.",
  },
  {
    icon: "🍓",
    title: "Recheios especiais",
    description: "Maracujá, surpresa de uva, ninho com Nutella e outras combinações autorais.",
  },
  {
    icon: "🎉",
    title: "Sob encomenda",
    description: "Monte sua caixa combinando sabores para festas, presentes e datas especiais.",
  },
];

export function SaboresOffer() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-wine-dark px-6 py-24 text-center text-paper-soft">
      <Squiggle color="#8EB9FF" className="absolute left-6 top-10 hidden h-6 w-28 md:block" />
      <Squiggle color="#8EB9FF" className="absolute bottom-10 right-6 hidden h-6 w-28 md:block" />

      <div ref={ref} className="reveal mx-auto max-w-[720px]">
        <span className="font-script text-2xl text-sky">sabores</span>
        <h2 className="mt-1 text-[clamp(26px,3.6vw,36px)] font-medium text-paper-soft">
          O que oferecemos
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-[980px] grid-cols-1 gap-10 sm:grid-cols-3">
        {offers.map((offer) => (
          <div key={offer.title}>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-paper-soft/10 text-2xl">
              {offer.icon}
            </span>
            <h3 className="mt-4 text-lg font-medium text-paper-soft">{offer.title}</h3>
            <p className="mx-auto mt-2 max-w-[240px] text-[14px] leading-relaxed text-paper-soft/70">
              {offer.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
