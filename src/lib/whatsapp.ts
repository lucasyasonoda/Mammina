import { WHATSAPP_NUMBER } from "@/content/site";
import { formatBRL } from "@/hooks/use-cart";
import type { Flavor } from "@/content/site";

type Entry = { qty: number; product: Flavor };

export function buildItemsText(entries: Entry[]) {
  return entries
    .map(
      ({ qty, product }) => `• ${qty}x ${product.title} — ${formatBRL(product.priceValue * qty)}`,
    )
    .join("\n");
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildQuickMessage(entries: Entry[], total: number) {
  return [
    "Olá, Mammina! Gostaria de fazer uma encomenda 🍫",
    "",
    "*Itens da cestinha:*",
    buildItemsText(entries),
    "",
    `*Total:* ${formatBRL(total)}`,
    "",
    "Enviado pelo site da Mammina.",
  ].join("\n");
}

export function buildFullMessage(params: {
  entries: Entry[];
  total: number;
  nome: string;
  whatsapp: string;
  data: string;
  detalhes: string;
}) {
  const { entries, total, nome, whatsapp, data, detalhes } = params;
  return [
    "Olá, Mammina! Gostaria de fazer uma encomenda 🍫",
    "",
    "*Itens da cestinha:*",
    buildItemsText(entries),
    "",
    `*Total:* ${formatBRL(total)}`,
    "",
    `*Nome:* ${nome}`,
    `*WhatsApp para contato:* ${whatsapp}`,
    `*Data do evento:* ${data || "Não informada"}`,
    `*Detalhes do pedido:* ${detalhes || "Nenhum detalhe adicional informado."}`,
    "",
    "Enviado pelo site da Mammina.",
  ].join("\n");
}
