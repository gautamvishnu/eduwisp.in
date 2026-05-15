import { Link, useLocation } from "wouter";
import { ShoppingCart, Trash2, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/currency";

export default function CartPage() {
  const { items, removeItem, total, itemCount } = useCart();
  const [, setLocation] = useLocation();

  if (itemCount === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Discover courses and start learning today.</p>
        <Link href="/courses">
          <Button size="lg" className="gap-2" data-testid="button-browse-courses-empty-cart">
            Browse Courses
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
          Shopping Cart
          <Badge variant="secondary" className="ml-3 text-base">{itemCount} {itemCount === 1 ? "item" : "items"}</Badge>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.courseId} className="flex gap-4 bg-card border border-border rounded-xl p-4 group" data-testid={`cart-item-${item.courseId}`}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-16 sm:w-32 sm:h-20 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link href={`/courses/${item.courseId}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 cursor-pointer text-sm sm:text-base">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">by {item.instructor}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-foreground">{formatINR(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{formatINR(item.originalPrice)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.courseId)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      data-testid={`button-remove-from-cart-${item.courseId}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.courseId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 flex-1 pr-4">{item.title}</span>
                    <span className="font-medium shrink-0">{formatINR(item.price)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl text-foreground">{formatINR(total)}</span>
              </div>
              <Button
                className="w-full gap-2 h-12 text-base font-semibold"
                onClick={() => setLocation("/checkout")}
                data-testid="button-checkout"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/courses">
                <Button variant="ghost" className="w-full mt-2 text-muted-foreground" data-testid="link-continue-shopping">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
