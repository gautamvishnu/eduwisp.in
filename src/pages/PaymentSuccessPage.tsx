import { useLocation, Link } from "wouter";
import { CheckCircle, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/currency";
import { useGetOrder } from "@/hooks/useData";

export default function PaymentSuccessPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.includes("?") ? location.split("?")[1] : "");
  const orderId = Number(params.get("orderId"));

  const { data: order } = useGetOrder(orderId, { enabled: !!orderId });

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
          Payment Successful!
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          Welcome to your new learning journey. Your courses are ready.
        </p>

        {order && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Order #{order.id}</h2>
              <Badge className="bg-green-100 text-green-700 border-0">Paid</Badge>
            </div>
            <div className="space-y-3 mb-4">
              {order.items.map((item) => item.course && (
                <div key={item.courseId} className="flex gap-3 items-center">
                  <img src={item.course.imageUrl} alt={item.course.title} className="w-12 h-8 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.course.title}</p>
                    <p className="text-xs text-muted-foreground">by {item.course.instructor}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatINR(item.price)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-semibold">Total Paid</span>
              <span className="font-bold text-lg">{formatINR(order.total)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/courses">
            <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-browse-more-courses">
              <BookOpen className="w-4 h-4" />
              Browse More Courses
            </Button>
          </Link>
          <Link href="/courses">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto" data-testid="button-go-to-profile">
              View My Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
