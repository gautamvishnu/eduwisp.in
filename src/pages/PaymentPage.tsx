import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
import { formatINR } from "@/lib/currency";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { useProcessPayment, useGetOrder } from "@/hooks/useData";

const schema = z.object({
  cardNumber: z.string().min(16, "Enter a valid card number").max(19),
  cardName: z.string().min(2, "Enter the name on the card"),
  expiryMonth: z.string().length(2, "Enter 2-digit month"),
  expiryYear: z.string().length(2, "Enter 2-digit year"),
  cvv: z.string().min(3).max(4),
  billingAddress: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

export default function PaymentPage() {
  const [location, setLocation] = useLocation();
  const params = new URLSearchParams(location.includes("?") ? location.split("?")[1] : "");
  const orderId = Number(params.get("orderId"));
  const { clearCart } = useCart();
  const { toast } = useToast();
  const processPayment = useProcessPayment();

  const { data: order } = useGetOrder(orderId, { enabled: !!orderId });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      billingAddress: "",
    },
  });

  const onSubmit = (data: FormData) => {
    processPayment.mutate(
      {
        orderId,
        data: {
          cardNumber: data.cardNumber.replace(/\s/g, ""),
          cardName: data.cardName,
          expiryMonth: data.expiryMonth,
          expiryYear: data.expiryYear,
          cvv: data.cvv,
        },
      },
      {
        onSuccess: (result) => {
          if (result.success) {
            clearCart();
            setLocation(`/payment-success?orderId=${orderId}`);
          } else {
            toast({ title: "Payment failed", description: result.message, variant: "destructive" });
          }
        },
        onError: () => {
          toast({ title: "Payment error", description: "Something went wrong. Try again.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
            Secure Payment
          </h1>
          {order && (
            <p className="text-muted-foreground mt-2">
              Order #{order.id} — <span className="font-semibold">{formatINR(order.total)}</span>
            </p>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 pb-4 border-b border-border">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span>Your payment information is encrypted and secure</span>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        {...field}
                        onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                        maxLength={19}
                        data-testid="input-card-number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} data-testid="input-card-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <FormControl>
                        <Input placeholder="MM" maxLength={2} {...field} data-testid="input-expiry-month" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input placeholder="YY" maxLength={2} {...field} data-testid="input-expiry-year" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" maxLength={4} type="password" {...field} data-testid="input-cvv" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold gap-2 mt-2"
                disabled={processPayment.isPending}
                data-testid="button-pay"
              >
                {processPayment.isPending ? (
                  "Processing..."
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    {order ? `Pay ${formatINR(order.total)}` : "Pay Now"}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </div>
  );
}
