import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (_data: FormData) => {
    setTimeout(() => {
      setSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary/8 to-accent/5 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Get in Touch
          </Badge>
          <h1
            className="text-4xl font-bold text-foreground mb-2"
            style={{
              fontFamily: "var(--app-font-display, var(--app-font-sans))",
            }}
          >
            Contact Us
          </h1>
          <p className="text-muted-foreground">
            We'd love to hear from you. We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2
                className="text-xl font-bold mb-6"
                style={{
                  fontFamily: "var(--app-font-display, var(--app-font-sans))",
                }}
              >
                Reach us directly
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@eduwisp.in",
                    desc: "We respond within 24 hours",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 8141381767",
                    desc: "Mon-Fri, 9am-6pm PST",
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value:
                      "603, Shreenath Signet 3, Near Khodiyar Temple, Nikol, Ahmedabad",
                    desc: "Visitors welcome by appointment",
                  },
                  {
                    icon: Clock,
                    label: "Support Hours",
                    value: "Mon-Sat, 9am-6pm IST",
                    desc: "Live chat available",
                  },
                ].map(({ icon: Icon, label, value, desc }) => (
                  <div
                    key={label}
                    className="flex gap-4 p-4 bg-card border border-border rounded-xl"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        {label}
                      </div>
                      <div className="font-semibold text-sm text-foreground mt-0.5">
                        {value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 bg-card border border-border rounded-xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Received!</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Thanks for reaching out. Our team will get back to you within
                  24 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    form.reset();
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-xl font-bold mb-6">Send us a message</h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jane Doe"
                                {...field}
                                data-testid="input-contact-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="jane@example.com"
                                type="email"
                                {...field}
                                data-testid="input-contact-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              {...field}
                              data-testid="input-contact-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us how we can help..."
                              rows={6}
                              {...field}
                              data-testid="textarea-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="gap-2 h-12 px-8"
                      disabled={form.formState.isSubmitting}
                      data-testid="button-send-message"
                    >
                      <Send className="w-4 h-4" />
                      {form.formState.isSubmitting
                        ? "Sending..."
                        : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
