import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, type Product } from "@/data/products";

export type CartLine = {
  productId: string;
  size: string;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: "Pending" | "On the way to deliver";
  lines: CartLine[];
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (input: { productId: string; size: string; qty?: number }) => void;
  remove: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  clear: () => void;
  resolve: (line: CartLine) => Product | undefined;
  orders: Order[];
  addOrder: (order: Order) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const resolve = useCallback(
    (line: CartLine) => PRODUCTS.find((p) => p.id === line.productId),
    []
  );

  const add = useCallback<CartContextValue["add"]>(({ productId, size, qty = 1 }) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId && l.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(next[idx].qty + qty, 10) };
        return next;
      }
      return [...prev, { productId, size, qty: Math.min(qty, 10) }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback<CartContextValue["remove"]>((productId, size) => {
    setLines((prev) =>
      prev.filter((l) => !(l.productId === productId && l.size === size))
    );
  }, []);

  const setQty = useCallback<CartContextValue["setQty"]>((productId, size, qty) => {
    setLines((prev) => {
      if (qty <= 0)
        return prev.filter((l) => !(l.productId === productId && l.size === size));
      return prev.map((l) =>
        l.productId === productId && l.size === size
          ? { ...l, qty: Math.min(qty, 10) }
          : l
      );
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const addOrder = useCallback<CartContextValue["addOrder"]>((order) => {
    setOrders((prev) => [order, ...prev]);
    setLines([]);
    setIsOpen(false);
  }, []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const line of lines) {
      const p = PRODUCTS.find((pp) => pp.id === line.productId);
      if (!p) continue;
      c += line.qty;
      s += p.price * line.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    open,
    close,
    add,
    remove,
    setQty,
    clear,
    resolve,
    orders,
    addOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}