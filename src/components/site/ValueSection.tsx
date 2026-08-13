import marcaFancy from "@/assets/marca-fancy.jpeg";
import { StampPhoto } from "@/components/site/StampPhoto";
import { useReveal } from "@/hooks/use-reveal";

export function ValueSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="bg-paper px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div ref={ref} className="reveal text-center md:text-left">
          <div className="mx-auto mb-5 flex justify-center gap-1.5 md:mx-0 md:justify-start">
            <span className="h-10 w-1.5 bg-wine" />
            <span className="h-10 w-1.5 bg-wine" />
          </div>
          <h2 className="text-[clamp(26px,3.6vw,36px)] font-medium leading-[1.15] text-wine-dark">
            Uma forma mais gostosa
            <br />
            de adoçar o seu dia
          </h2>
          <p className="mx-auto mt-5 max-w-[420px] text-[15.5px] leading-relaxed text-ink/70 md:mx-0">
            Cada brigadeiro é enrolado à mão, um a um, com ingredientes selecionados e sem pressa.
            Sem prateleira, sem estoque parado — só o que sai fresquinho direto para a sua
            encomenda.
          </p>
          <a
            href="#historia"
            className="mt-6 inline-block border-b-2 border-sky text-[13px] font-semibold uppercase tracking-[0.08em] text-wine-dark transition-colors hover:text-wine"
          >
            Conheça nossa história →
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <StampPhoto
            src={marcaFancy}
            alt="Confeitando o nome Mammina com glacê"
            tag="Feito à mão"
            rotate={3}
            className="w-[230px] sm:w-[280px] md:w-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
