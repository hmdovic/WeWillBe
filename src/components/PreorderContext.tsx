"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Product, Size } from "@/lib/constants";

interface PreorderContextValue {
  isOpen: boolean;
  product: Product | null;
  size: Size | null;
  quantity: number;
  open: (product?: Product, size?: Size, quantity?: number) => void;
  close: () => void;
}

const PreorderContext = createContext<PreorderContextValue | null>(null);

export function PreorderProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);

  const open = useCallback((p?: Product, s?: Size, q?: number) => {
    setProduct(p ?? null);
    setSize(s ?? null);
    setQuantity(q ?? 1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, product, size, quantity, open, close }),
    [isOpen, product, size, quantity, open, close]
  );

  return <PreorderContext.Provider value={value}>{children}</PreorderContext.Provider>;
}

export function usePreorder() {
  const ctx = useContext(PreorderContext);
  if (!ctx) throw new Error("usePreorder must be used within PreorderProvider");
  return ctx;
}
