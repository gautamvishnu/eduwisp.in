import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Definitions",
    content: `Throughout these Terms and Conditions, the following terms shall have the meanings assigned to them below:

• "EduWisp" refers to our company, our website, and our e-learning platform.
• "Services" refers to all courses, content, resources, and features offered through our platform.
• "User" or "You" refers to any individual who accesses or uses our platform.
• "Content" refers to all materials, courses, videos, texts, graphics, and other information provided through our platform.
• "Subscription" refers to the recurring payment arrangement for accessing our services.`,
  },
  {
    title: "2. Account Registration and Security",
    content: `To access certain features of our platform, you may need to register for an account. When you register, you agree to:

• Provide accurate, current, and complete information.
• Maintain and promptly update your account information.
• Keep your password secure and confidential.
• Be responsible for all activities that occur under your account.
• Notify us immediately of any unauthorized use of your account or any other breach of security.

We reserve the right to disable any user account if we believe you have violated any provision of these Terms.`,
  },
  {
    title: "3. Course Enrollment and Access",
    content: `Upon enrolling in a course or purchasing a subscription:

• You will be granted a limited, non-exclusive, non-transferable license to access and view the course content.
• Access to course content is for personal, non-commercial use only.
• The duration of access will be as specified at the time of purchase.
• We reserve the right to modify course content to improve quality or address technical issues.
• Some courses may have prerequisites or requirements that must be met before enrollment.`,
  },
  {
    title: "4. Payment Terms",
    content: `By making a purchase on our platform:

• You agree to pay all fees in full as per the pricing displayed at the time of purchase.
• All payments are processed through secure third-party payment processors.
• Prices are subject to change, but changes will not affect prior purchases.
• For subscription-based services, you authorize us to charge your payment method on a recurring basis until cancellation.
• You are responsible for any taxes applicable to your purchase.

For our refund policy, please refer to our Refund and Returns Policy.`,
  },
  {
    title: "5. Intellectual Property Rights",
    content: `All content on our platform, including but not limited to courses, videos, texts, graphics, logos, and software, is the property of EduWisp or its content providers and is protected by copyright and other intellectual property laws.

You may not:

• Copy, reproduce, distribute, or publicly display any content from our platform without explicit permission.
• Modify, create derivative works, or reverse engineer any part of our platform.
• Remove any copyright, trademark, or other proprietary notices.
• Use our content for commercial purposes without authorization.
• Share your account or course access with others.`,
  },
  {
    title: "6. User Conduct",
    content: `When using our platform, you agree not to:

• Violate any applicable laws or regulations.
• Infringe upon the rights of others, including privacy and intellectual property rights.
• Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.
• Attempt to gain unauthorized access to any part of our platform or any system or network connected to our platform.
• Use our platform to send unsolicited communications or for any commercial solicitation.
• Interfere with or disrupt the operation of our platform or servers.
• Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity.`,
  },
  {
    title: "7. User-Generated Content",
    content: `Our platform may allow you to post reviews, comments, and other content. For any content you post:

• You retain ownership of your content, but grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute it.
• You are solely responsible for the content you post.
• We reserve the right to remove any content that violates these Terms or that we find objectionable.
• We do not endorse or guarantee the accuracy, integrity, or quality of user-generated content.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by law:

• EduWisp and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our platform or services.
• Our total liability for any claims related to these Terms shall not exceed the amount you paid to us for the services in question.
• We provide our services "as is" without any warranty of any kind, either express or implied.
• We do not guarantee that our services will be uninterrupted, secure, or error-free.`,
  },
  {
    title: "9. Termination",
    content: `We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including if you breach these Terms.

Upon termination:

• Your right to use our services will immediately cease.
• Any provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.`,
  },
  {
    title: "10. Changes to Terms",
    content: "We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our platform and updating the \"Last Updated\" date.\n\nYour continued use of our platform after such changes constitutes your acceptance of the new Terms. If you do not agree to the changes, you should discontinue using our services.",
  },
  {
    title: "11. Governing Law",
    content: "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.\n\nAny disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Gujrat, India.",
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <FileText className="w-4 h-4" />
          Legal
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Terms &amp; Conditions</h1>
        <p className="text-muted-foreground text-lg">
          Last updated: 1 January 2026 &nbsp;·&nbsp; Effective: 1 January 2026
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Welcome to EduWisp. These Terms and Conditions govern your use of our website, services,
          and products. By accessing or using our platform, you agree to be bound by these Terms. If
          you disagree with any part of these terms, please do not use our services.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
