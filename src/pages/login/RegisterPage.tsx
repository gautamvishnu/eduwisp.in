import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { isAxiosError } from "axios";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { AuthService } from "@/lib/authService";

const detailsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email address"),
});

const verifySchema = z
  .object({
    otp: z
      .string()
      .length(6, "Enter the 6-digit OTP")
      .regex(/^\d{6}$/, "OTP must be 6 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(64, "Password is too long"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type DetailsForm = z.infer<typeof detailsSchema>;
type VerifyForm = z.infer<typeof verifySchema>;

type Step = "details" | "verify";

const RESEND_SECONDS = 60;

function getErrorMessage(err: unknown, fallback: string) {
  if (isAxiosError(err)) {
    const data = err.response?.data as
      | { message?: string; Message?: string }
      | undefined;
    return data?.message || data?.Message || err.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("details");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [pendingMobile, setPendingMobile] = useState("");

  const detailsForm = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { firstName: "", lastName: "", mobile: "", email: "" },
  });

  const verifyForm = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (isAuthenticated) setLocation("/");
  }, [isAuthenticated, setLocation]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = window.setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [resendIn]);

  const startResendTimer = () => setResendIn(RESEND_SECONDS);

  const onDetailsSubmit = async (data: DetailsForm) => {
    setIsSubmitting(true);
    try {
      const response = await AuthService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        email: data.email,
      });

      if (!response.status) {
        toast({
          title: "Registration failed",
          description:
            response.message || "Could not start registration. Try again.",
          variant: "destructive",
        });
        return;
      }

      setPendingMobile(data.mobile);
      verifyForm.reset({ otp: "", password: "", confirmPassword: "" });
      setStep("verify");
      startResendTimer();
      toast({
        title: "OTP sent",
        description: `We've sent a 6-digit code to +91 ${data.mobile}.`,
      });
    } catch (err) {
      toast({
        title: "Registration failed",
        description: getErrorMessage(
          err,
          "Could not start registration. Please try again.",
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onVerifySubmit = async (data: VerifyForm) => {
    setIsSubmitting(true);
    try {
      const response = await AuthService.verifyRegistration({
        mobile: pendingMobile,
        otp: data.otp,
        password: data.password,
      });

      if (!response.status) {
        toast({
          title: "Verification failed",
          description:
            response.message || "Invalid OTP or could not set password.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Account created!",
        description: "Please sign in with your mobile number and password.",
      });
      setLocation("/login");
    } catch (err) {
      toast({
        title: "Verification failed",
        description: getErrorMessage(
          err,
          "Could not complete registration. Please try again.",
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendIn > 0 || !pendingMobile) return;
    setIsSubmitting(true);
    try {
      const response = await AuthService.sendRegisterOtp(pendingMobile);
      if (!response.status) {
        toast({
          title: "Could not resend OTP",
          description: response.message || "Please try again shortly.",
          variant: "destructive",
        });
        return;
      }
      startResendTimer();
      verifyForm.setValue("otp", "");
      toast({
        title: "OTP resent",
        description: `A new code was sent to +91 ${pendingMobile}.`,
      });
    } catch (err) {
      toast({
        title: "Could not resend OTP",
        description: getErrorMessage(err, "Please try again shortly."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBackToDetails = () => {
    setStep("details");
    verifyForm.reset({ otp: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 0%, hsl(243 75% 59% / 0.12), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 100%, hsl(11 80% 60% / 0.1), transparent 50%), linear-gradient(180deg, hsl(40 33% 98%), hsl(210 40% 96%))",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-center"
        >
          <h1
            className="mt-4 text-3xl font-bold tracking-tight text-foreground"
            style={{
              fontFamily: "var(--app-font-display, var(--app-font-sans))",
            }}
          >
            {step === "details" ? "Create your account" : "Verify & set password"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {step === "details"
              ? "Join EduWisp and start learning today."
              : `Enter the OTP sent to +91 ${pendingMobile} and set your password.`}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-border bg-card/90 p-6 shadow-lg backdrop-blur-sm sm:p-8"
        >
          <AnimatePresence mode="wait">
            {step === "details" ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
              >
                <Form {...detailsForm}>
                  <form
                    onSubmit={detailsForm.handleSubmit(onDetailsSubmit)}
                    className="space-y-4"
                    noValidate
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={detailsForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  autoComplete="given-name"
                                  placeholder="First name"
                                  className="pl-10"
                                  data-testid="input-first-name"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={detailsForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="family-name"
                                placeholder="Last name"
                                data-testid="input-last-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={detailsForm.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <span className="pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                +91
                              </span>
                              <Input
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel"
                                maxLength={10}
                                placeholder="9876543210"
                                className="pl-[4.25rem]"
                                data-testid="input-mobile"
                                {...field}
                                onChange={(e) => {
                                  const digits = e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 10);
                                  field.onChange(digits);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={detailsForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="pl-10"
                                data-testid="input-email"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                      data-testid="button-register"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Registering…
                        </>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  type="button"
                  onClick={goBackToDetails}
                  className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  data-testid="button-back-details"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Edit details
                </button>

                <div className="mb-6 flex items-center gap-3 rounded-xl bg-primary/8 px-4 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Confirm your mobile with the OTP, then create your password.
                  </p>
                </div>

                <Form {...verifyForm}>
                  <form
                    onSubmit={verifyForm.handleSubmit(onVerifySubmit)}
                    className="space-y-4"
                    noValidate
                  >
                    <FormField
                      control={verifyForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>One-time password</FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              value={field.value}
                              onChange={field.onChange}
                              disabled={isSubmitting}
                              data-testid="input-otp"
                            >
                              <InputOTPGroup className="w-full justify-between gap-2">
                                {Array.from({ length: 6 }).map((_, i) => (
                                  <InputOTPSlot
                                    key={i}
                                    index={i}
                                    className="h-12 w-11 flex-1 rounded-md border border-input text-base first:rounded-md first:border-l last:rounded-md"
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={verifyForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Create a password"
                                className="pl-10 pr-10"
                                data-testid="input-password"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={
                                  showPassword
                                    ? "Hide password"
                                    : "Show password"
                                }
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={verifyForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                                className="pl-10 pr-10"
                                data-testid="input-confirm-password"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() =>
                                  setShowConfirmPassword((v) => !v)
                                }
                                aria-label={
                                  showConfirmPassword
                                    ? "Hide confirm password"
                                    : "Show confirm password"
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                      data-testid="button-verify-register"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="mt-5 text-center text-sm text-muted-foreground">
                  Didn&apos;t get the code?{" "}
                  <button
                    type="button"
                    disabled={resendIn > 0 || isSubmitting}
                    onClick={handleResend}
                    className="font-medium text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    data-testid="button-resend-otp"
                  >
                    {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
