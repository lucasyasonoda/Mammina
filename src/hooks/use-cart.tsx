import * as React from "react";
import { flavors, type Flavor } from "@/content/site";

const CART_KEY = "mammina-cestinha";

type CartMap = Record<string, number>;

type CartEntry = { id: string; qty: number; product: Flavor };

type CartContextValue = {
  entries: CartEntry[];
  totalQty: number;
  total: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

function loadCart(): CartMap {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCart(cart: CartMap) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    /* localStorage indisponível — a cestinha some ao recarregar, sem quebrar o site */
  }
}

const flavorById = Object.fromEntries(flavors.map((f) => [f.id, f]));

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartMap>(() => loadCart());
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = React.useCallback((id: string, qty = 1) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }));
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const removeFromCart = React.useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = React.useCallback(() => setCart({}), []);

  const entries: CartEntry[] = React.useMemo(
    () =>
      Object.entries(cart)
        .filter(([id]) => flavorById[id])
        .map(([id, qty]) => ({ id, qty, product: flavorById[id] })),
    [cart],
  );

  const totalQty = entries.reduce((sum, e) => sum + e.qty, 0);
  const total = entries.reduce((sum, e) => sum + e.product.priceValue * e.qty, 0);

  const value: CartContextValue = {
    entries,
    totalQty,
    total,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    setOpen: setIsOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatBRL(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}
