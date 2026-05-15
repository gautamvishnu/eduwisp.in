import { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  courseId: number;
  title: string;
  instructor: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (courseId: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isInCart: (courseId: number) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("edu_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("edu_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.courseId === item.courseId)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (courseId: number) => {
    setItems((prev) => prev.filter((i) => i.courseId !== courseId));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price, 0);
  const itemCount = items.length;
  const isInCart = (courseId: number) =>
    items.some((i) => i.courseId === courseId);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, total, itemCount, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
