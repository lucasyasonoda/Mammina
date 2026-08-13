import { useCart } from "@/hooks/use-cart";

export function FloatingCartButton() {
  const { totalQty, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Abrir cestinha"
      className="fixed bottom-[22px] right-[22px] z-[95] grid h-[58px] w-[58px] place-items-center rounded-full bg-sky text-2xl shadow-[0_14px_30px_-12px_rgba(74,25,23,0.55)] transition-transform hover:-translate-y-1"
    >
      <span aria-hidden="true">🧺</span>
      {totalQty > 0 && (
        <span className="absolute -right-1 -top-1 grid h-[22px] min-w-[22px] place-items-center rounded-full border-2 border-paper-soft bg-wine px-1 text-xs font-bold text-paper-soft">
          {totalQty}
        </span>
      )}
    </button>
  );
}
