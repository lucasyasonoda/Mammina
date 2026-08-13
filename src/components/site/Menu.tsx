import * as React from "react";
import { flavors } from "@/content/site";
import { useCart } from "@/hooks/use-cart";
import { useReveal } from "@/hooks/use-reveal";
import { FlavorArt } from "@/components/site/FlavorArt";
import { ProductModal } from "@/components/site/ProductModal";

function FlavorCard({ id, onOpen }: { id: string; onOpen: (id: string) => void }) {
  const flavor = flavors.find((f) => f.id === id)!;
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="scallop-card reveal relative cursor-pointer px-6 pb-7 pt-9 outline-none transition hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-sky"
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes do ${flavor.title}`}
      onClick={() => onOpen(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(id);
        }
      }}
    >
      <FlavorArt color={flavor.color} accent={flavor.accent} className="mb-3 h-20 w-20" />
      <h3 className="font-serif text-xl font-semibold text-wine-dark">
        {flavor.title}{" "}
        <span className="font-script ml-1 align-middle text-lg text-wine">{flavor.price}</span>
      </h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink/75">{flavor.description}</p>
      <button
        type="button"
        className={`mt-4 inline-block border-[1.5px] px-4 py-2 text-[12.5px] font-semibold tracking-[0.03em] transition-colors ${
          added
            ? "border-wine bg-wine text-paper-soft"
            : "border-sky bg-transparent text-wine-dark hover:bg-sky hover:text-wine-dark"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          addToCart(id);
          setAdded(true);
          setTimeout(() => setAdded(false), 1400);
        }}
      >
        {added ? "Adicionado! ✓" : "+ Adicionar à cestinha"}
      </button>
    </div>
  );
}

export function Menu() {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const headingRef = useReveal<HTMLHeadingElement>();
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section className="py-24 px-6" id="doces">
      <div className="mx-auto max-w-[1140px]">
        <div ref={headRef} className="reveal mx-auto mb-14 max-w-[560px] text-center">
          <span className="eyebrow">Cardápio</span>
          <h2 ref={headingRef} className="mt-2 text-3xl font-medium text-wine-dark md:text-4xl">
            Nossos sabores de brigadeiro
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink/70">
            Doze sabores autorais, feitos artesanalmente e sempre fresquinhos — não para ficar em
            estoque.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {flavors.map((flavor) => (
            <FlavorCard key={flavor.id} id={flavor.id} onOpen={setActiveId} />
          ))}
        </div>
      </div>

      <ProductModal flavorId={activeId} onClose={() => setActiveId(null)} />
    </section>
  );
}
