import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, formatBRL } from "@/hooks/use-cart";
import { buildQuickMessage, whatsappUrl } from "@/lib/whatsapp";

export function CartDrawer() {
  const { entries, total, totalQty, isOpen, setOpen, setQty, removeFromCart, clearCart, close } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sua cestinha 🧺</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {entries.length === 0 ? (
            <p className="py-10 text-center leading-relaxed text-ink/60">
              Sua cestinha está vazia.
              <br />
              Adicione um docinho no cardápio! 🍫
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {entries.map(({ id, qty, product }) => (
                <div
                  key={id}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 border-b border-dotted border-wine/25 pb-3.5"
                >
                  <div>
                    <strong className="block font-serif text-[15.5px] font-semibold text-wine-dark">
                      {product.title}
                    </strong>
                    <span className="text-xs text-ink/55">
                      {formatBRL(product.priceValue)} / un.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="grid h-[26px] w-[26px] place-items-center border border-wine text-wine-dark hover:bg-wine hover:text-paper-soft"
                      onClick={() => setQty(id, qty - 1)}
                      aria-label={`Diminuir quantidade de ${product.title}`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-4 text-center font-semibold">{qty}</span>
                    <button
                      className="grid h-[26px] w-[26px] place-items-center border border-wine text-wine-dark hover:bg-wine hover:text-paper-soft"
                      onClick={() => setQty(id, qty + 1)}
                      aria-label={`Aumentar quantidade de ${product.title}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="col-span-2 flex items-center justify-between">
                    <span className="font-script text-lg font-bold text-wine">
                      {formatBRL(product.priceValue * qty)}
                    </span>
                    <button
                      className="text-wine-dark/50 hover:text-destructive"
                      onClick={() => removeFromCart(id)}
                      aria-label={`Remover ${product.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {entries.length > 0 && (
          <div className="border-t border-wine/15 px-6 pb-6 pt-4">
            <div className="mb-3.5 flex items-baseline justify-between font-semibold">
              <span>
                Total <span className="text-xs font-normal text-ink/50">({totalQty} itens)</span>
              </span>
              <strong className="font-script text-2xl text-wine">{formatBRL(total)}</strong>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                const message = buildQuickMessage(entries, total);
                window.open(whatsappUrl(message), "_blank", "noopener");
                close();
                clearCart();
              }}
            >
              Finalizar pedido
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
