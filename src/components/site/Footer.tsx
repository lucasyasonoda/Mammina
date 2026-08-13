import { brand } from "@/content/site";

export function Footer() {
  return (
    <footer id="contato" className="bg-wine-dark text-paper-soft/70">
      <div className="foot-scallop" />
      <div className="mx-auto flex max-w-[1140px] flex-wrap justify-between gap-8 px-7 pb-8 pt-12">
        <div>
          <h3 className="mb-3 font-serif text-xl text-paper-soft">{brand.name}</h3>
          <p className="text-sm leading-loose">
            Brigadeiros gourmet artesanais, feitos por encomenda.
            <br />
            {brand.city}
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-serif text-xl text-paper-soft">Fale com a gente</h3>
          <p className="text-sm leading-loose">
            <a
              href={`https://wa.me/${brand.whatsappDisplay.replace(/\D/g, "")}`}
              className="hover:text-sky"
            >
              WhatsApp: {brand.whatsappDisplay}
            </a>
            <br />
            <a href={`mailto:${brand.email}`} className="hover:text-sky">
              {brand.email}
            </a>
            <br />
            <a href="#" className="hover:text-sky">
              {brand.instagram}
            </a>
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-serif text-xl text-paper-soft">Horário</h3>
          <p className="text-sm leading-loose">
            {brand.hours}
            <br />
            {brand.leadTime}
          </p>
        </div>
      </div>
      <div className="border-t border-paper-soft/12 px-7 py-5 text-center text-xs">
        © 2026 {brand.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
