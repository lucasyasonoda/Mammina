import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FlavorArt } from "@/components/site/FlavorArt";
import { flavors } from "@/content/site";
import { useCart } from "@/hooks/use-cart";

export function ProductModal({
  flavorId,
  onClose,
}: {
  flavorId: string | null;
  onClose: () => void;
}) {
  const flavor = flavors.find((f) => f.id === flavorId);
  const { addToCart, open } = useCart();

  return (
    <Dialog open={!!flavor} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="grid-cols-1 rounded-none p-0 md:grid-cols-2">
        {flavor && (
          <>
            <div
              className="flex min-h-[220px] items-center justify-center p-10 md:min-h-full"
              style={{
                background: `linear-gradient(155deg, ${flavor.accent}, ${flavor.color})`,
              }}
            >
              <FlavorArt
                color={flavor.color}
                accent={flavor.accent}
                className="h-40 w-40 drop-shadow-xl"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-11">
              <span className="eyebrow">Detalhes do sabor</span>
              <DialogTitle className="mt-2 font-serif text-[clamp(26px,4vw,36px)] font-medium text-wine-dark">
                {flavor.title}
              </DialogTitle>
              <p className="font-script mt-3 text-[28px] font-bold text-wine">{flavor.price}</p>
              <p className="text-[15.5px] leading-relaxed text-ink/75">{flavor.description}</p>
              <div className="my-6 flex flex-wrap gap-2 text-xs font-semibold text-wine-dark">
                <span>Feito por encomenda</span>
                <span>•</span>
                <span>Produzido artesanalmente</span>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  addToCart(flavor.id);
                  onClose();
                  open();
                }}
              >
                Adicionar à cestinha
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
