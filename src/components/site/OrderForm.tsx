import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCart, formatBRL } from "@/hooks/use-cart";
import { buildFullMessage, whatsappUrl } from "@/lib/whatsapp";
import { useReveal } from "@/hooks/use-reveal";

function formatDataEvento(value: string) {
  if (!value) return "";
  const [ano, mes, dia] = value.split("-");
  return `${dia}/${mes}/${ano}`;
}

export function OrderForm() {
  const { entries, total } = useCart();
  const [nome, setNome] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [data, setData] = React.useState("");
  const [mensagem, setMensagem] = React.useState("");
  const [msg, setMsg] = React.useState<string | null>(null);
  const summaryRef = React.useRef<HTMLDivElement>(null);
  const ref = useReveal<HTMLDivElement>();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (entries.length === 0) {
      setMsg("Sua cestinha está vazia — adicione um docinho no cardápio antes de enviar. 🧺");
      document.getElementById("doces")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setMsg(null), 4000);
      return;
    }

    const message = buildFullMessage({
      entries,
      total,
      nome,
      whatsapp,
      data: formatDataEvento(data),
      detalhes: mensagem,
    });
    window.open(whatsappUrl(message), "_blank", "noopener");
    setMsg("Abrindo o WhatsApp com os detalhes do seu pedido...");
    setNome("");
    setWhatsapp("");
    setData("");
    setMensagem("");
    setTimeout(() => setMsg(null), 5000);
  }

  return (
    <section className="px-6 py-24" id="encomendas">
      <div ref={ref} className="reveal mx-auto max-w-[640px]">
        <div className="mb-9 text-center">
          <span className="eyebrow">Encomendas</span>
          <h2 className="mt-2 text-3xl font-medium text-wine-dark md:text-4xl">
            Vamos combinar seu pedido?
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink/70">
            Preencha os dados abaixo e a gente confirma quantidades, sabores e prazo diretamente com
            você.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-2.5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              required
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              type="tel"
              required
              placeholder="(15) 90000-0000"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="data">Data do evento</Label>
            <Input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <Label>Resumo do pedido</Label>
            <div ref={summaryRef} className="border border-wine/20 bg-paper p-4">
              {entries.length === 0 ? (
                <p className="m-0 text-sm leading-relaxed text-ink/55">
                  Sua cestinha está vazia — volte ao cardápio e adicione um docinho antes de enviar.
                  🧺
                </p>
              ) : (
                <>
                  {entries.map(({ id, qty, product }) => (
                    <div
                      key={id}
                      className="flex justify-between gap-2.5 border-b border-dotted border-wine/20 py-1.5 text-[14.5px] last:border-b-0"
                    >
                      <span>
                        {qty}x {product.title}
                      </span>
                      <span>{formatBRL(product.priceValue * qty)}</span>
                    </div>
                  ))}
                  <div className="mt-2.5 flex justify-between border-t border-wine/25 pt-2.5 font-bold">
                    <span>Total</span>
                    <strong className="font-script text-xl text-wine">{formatBRL(total)}</strong>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="mensagem">Detalhes do pedido</Label>
            <Textarea
              id="mensagem"
              placeholder="Quantidade, ocasião e restrições alimentares..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4.5 sm:col-span-2">
            <Button type="submit">Enviar pedido pelo WhatsApp</Button>
            <span
              aria-live="polite"
              className={`text-[13.5px] font-semibold text-wine-dark transition-opacity ${msg ? "opacity-100" : "opacity-0"}`}
            >
              {msg}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
