import {
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  HelpCircle,
} from "lucide-react";

const highlights = [
  {
    icon: CheckCircle,
    color: "text-green-600",
    label: "7-Day Money Back",
    desc: "Full refund within 7 days of purchase",
  },
  {
    icon: Clock,
    color: "text-blue-600",
    label: "5–7 Business Days",
    desc: "Processing time for approved refunds",
  },
  {
    icon: XCircle,
    color: "text-red-500",
    label: "No Refund After Access",
    desc: "Refunds not issued once course is accessed",
  },
  {
    icon: HelpCircle,
    color: "text-primary",
    label: "24/7 Support",
    desc: "Reach us anytime at info@eduwisp.in",
  },
];

const sections = [
  {
    title: "1. Course Cancellation by Student",
    content: `If you wish to cancel your enrollment in a course, you may do so by contacting us directly. The cancellation will be processed according to the guidelines outlined below:

• Before Course Access: If you cancel your enrollment before accessing any course materials, you are eligible for a full refund within 7 days of your purchase.
• After Course Access: Once you have accessed any part of the course (e.g., viewed lessons or downloaded materials), refunds will not be provided, as access has already been granted.`,
  },
  {
    title: "2. Refunds",
    content: `We offer refunds under the following conditions:

• 7-Day Refund Window: If you request a refund within 7 days of purchasing the course and have not accessed the course content, you are eligible for a full refund.
• No Refund After Access: If you have accessed any course materials (even partially), no refund will be issued. This includes any form of engagement with the course, such as viewing videos, reading course materials, or participating in assignments.
• Refund Processing: Once your refund request is approved, refunds will be processed back to the original payment method. The processing time may vary depending on the payment provider.`,
  },
  {
    title: "3. Refund and Cancellation for Subscriptions",
    content: `For students who have subscribed to a monthly or yearly membership plan:

• Monthly Subscriptions: You may cancel your subscription at any time before the next billing cycle. Cancellations must be submitted at least 24 hours before the next billing date to avoid being charged for the following month. No refunds will be provided for the current month of service.
• Annual Subscriptions: If you wish to cancel your annual subscription, you must submit the cancellation request before the next billing cycle. You will retain access to the subscription benefits for the remainder of the current subscription period, but no refund will be issued for any unused portion of the year.`,
  },
  {
    title: "4. Exceptions to Refund Policy",
    content: `We understand that exceptional circumstances may arise. We may consider refunds in the following cases:

• Course Defects: If you experience technical issues with the course content (e.g., videos not playing, incorrect links, etc.), please contact us within 7 days of the issue. We will attempt to resolve the problem, and if we are unable to do so, we may issue a partial or full refund depending on the situation.
• Special Circumstances: In certain cases, such as extreme personal circumstances (e.g., illness or emergency), we may offer a refund or provide access to alternate learning resources. Requests must be made within 7 days of enrollment and will be evaluated on a case-by-case basis.`,
  },
  {
    title: "5. How to Request a Refund or Cancellation",
    content: `To request a cancellation or refund, please follow these steps:

Step 1 — Contact us at info@eduwisp.in with your order number, course details, and reason for cancellation.
Step 2 — Include any relevant information or documentation (if applicable) to support your refund request.
Step 3 — Our customer support team will review your request and notify you of the approval or rejection of your refund request.`,
  },
  {
    title: "6. Account Termination and Access",
    content:
      "If your refund is approved or your subscription is canceled, your access to the course or content will be revoked immediately. You will not be able to access the course materials or participate in future lessons.",
  },
  {
    title: "7. Changes to This Policy",
    content:
      'We reserve the right to update or modify this Refund and Cancellation Policy at any time. Any changes to this policy will be posted on this page with the updated "Effective Date." We encourage you to review this policy periodically to stay informed about your rights.',
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <RefreshCw className="w-4 h-4" />
          Legal
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Refund &amp; Cancellation Policy
        </h1>
        <p className="text-muted-foreground text-lg">
          Last updated: 1 January 2025 &nbsp;·&nbsp; Effective: 1 January 2025
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          At EduWisp, we strive to provide high-quality e-learning courses that
          help students achieve their educational goals. We understand that
          sometimes circumstances may change, and we want to ensure that you
          have a fair and transparent process when it comes to refunds and
          cancellations. Please read our refund and cancellation policy
          carefully to understand your rights and the procedures for cancelling
          or requesting a refund.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {highlights.map((h) => (
          <div key={h.label} className="bg-muted/40 rounded-xl p-4 text-center">
            <h.icon className={`w-7 h-7 mx-auto mb-2 ${h.color}`} />
            <p className="font-semibold text-sm text-foreground">{h.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{h.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {section.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
