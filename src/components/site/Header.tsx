import * as React from "react";
import { Menu as MenuIcon } from "lucide-react";
import logoMain from "@/assets/logo-main.jpeg";
import { Button } from "@/components/ui/button";
import { brand } from "@/content/site";

export function Header() {
  const [open, setOpen] = React.useState(false);

  const links = [
    { href: "#top", label: "Início" },
    { href: "#doces", label: "Sabores" },
    { href: "#encomendas", label: "Encomendas" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-wine/15 bg-paper-soft">
      <div className="mx-auto flex min-h-[94px] max-w-[1240px] items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3.5">
          <img
            src={logoMain}
            alt="Mammina"
            className="h-12 w-12 rounded-full object-cover md:h-16 md:w-16"
          />
          <span className="font-serif text-lg font-medium text-wine-dark md:text-[22px]">
            {brand.name}
          </span>
        </a>

        <nav
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-4 border-t border-wine/10 bg-paper-soft px-5 py-4 shadow-[0_12px_20px_-18px_rgba(122,31,29,0.55)] md:static md:flex md:flex-row md:items-center md:gap-10 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          aria-label="Navegação principal"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="nav-underline relative py-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-wine-dark transition-colors hover:text-wine md:py-[10px]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#encomendas">Fazer pedido</a>
          </Button>
          <button
            className="grid h-10 w-10 place-items-center text-wine-dark md:hidden"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
