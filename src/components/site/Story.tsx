import marcaFancy from "@/assets/marca-fancy.jpeg";
import { useReveal } from "@/hooks/use-reveal";

export function Story() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      className="relative overflow-hidden bg-wine-dark px-6 py-28 text-center text-paper-soft"
      id="historia"
    >
      <div className="mx-auto grid max-w-[1000px] items-center gap-12 md:grid-cols-2 md:text-left">
        <div ref={ref} className="reveal">
          <span className="eyebrow">Nossa história</span>
          <h2 className="mt-2 text-[clamp(28px,4vw,40px)] font-medium text-paper-soft">
            De uma cozinha pequena para a mesa de muita gente
          </h2>
          <p className="mt-6 text-[15.5px] leading-relaxed text-paper-soft/78">
            Começou com uma receita de família e uma bandeja para a vizinhança. Hoje, cada
            brigadeiro que sai daqui continua sendo enrolado à mão, um a um, do jeito de sempre —
            mas agora chega às festas, às mesas de trabalho e àquele momento em que só um docinho
            resolve.
          </p>
          <p className="font-script animate-sign-write mt-8 text-3xl text-sky">— Mammina</p>
        </div>
        <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-sm shadow-2xl">
          <img src={marcaFancy} alt="Confeitando o nome Mammina com glacê" className="w-full" />
        </div>
      </div>
    </section>
  );
}
