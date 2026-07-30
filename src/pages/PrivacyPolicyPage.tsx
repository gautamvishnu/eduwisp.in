import { Shield } from "lucide-react";
import { BRAND_NAME, COMPANY_LEGAL_NAME } from "@/lib/company";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "1.1 Personal Information",
        text: "Contact Information: Name, email address, phone number, and mailing address.\nAccount Information: Username, password, and profile details.\nPayment Information: Credit card details, billing address, and transaction history (note that payment processing is handled by secure third-party payment processors).\nEducational Information: Course progress, completion certificates, and assessment results.\nCommunication Data: Messages, feedback, and support inquiries you send to us.",
      },
      {
        subtitle: "1.2 Non-Personal Information",
        text: "Usage Data: Information about how you use our platform, including pages visited, time spent, and features used.\nDevice Information: IP address, browser type, operating system, and device identifiers.\nCookies and Similar Technologies: Information collected through cookies, web beacons, and similar technologies.",
      },
    ],
  },
  {
    title: "2. How We Collect Information",
    content: [
      {
        subtitle: "",
        text: "We collect information through various methods, including:\n\n• Direct Interactions: Information you provide when creating an account, enrolling in courses, making purchases, or contacting us.\n• Automated Technologies: Information collected automatically through cookies, server logs, and similar technologies when you use our platform.\n• Third-Party Sources: Information we may receive from business partners, service providers, and publicly available sources.",
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: [
      {
        subtitle: "",
        text: "We use the information we collect for various purposes, including:\n\n• Providing Services: To deliver the courses and services you request, process transactions, and maintain your account.\n• Personalization: To personalize your learning experience, recommend relevant courses, and provide tailored content.\n• Communication: To respond to your inquiries, send administrative messages, and provide updates about our services.\n• Marketing: To send promotional materials, newsletters, and information about new courses or features (you can opt out of marketing communications at any time).\n• Improvement: To analyze usage patterns, troubleshoot technical issues, and enhance our platform's functionality and user experience.\n• Security: To protect our platform, detect and prevent fraud, and ensure the safety of our users.\n• Legal Compliance: To comply with applicable laws, regulations, and legal processes.",
      },
    ],
  },
  {
    title: "4. How We Share Your Information",
    content: [
      {
        subtitle: "",
        text: "We may share your information with the following categories of recipients:\n\n• Service Providers: Third-party vendors who perform services on our behalf, such as payment processing, data analysis, email delivery, and hosting.\n• Business Partners: Educational institutions, instructors, and other partners with whom we collaborate to offer courses or services.\n• Legal Authorities: Law enforcement agencies, courts, or other government authorities when required by law or to protect our rights.\n• Business Transfers: In connection with a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.\n\nWe do not sell your personal information to third parties for their marketing purposes.",
      },
    ],
  },
  {
    title: "5. Cookies and Similar Technologies",
    content: [
      {
        subtitle: "",
        text: "We use cookies and similar tracking technologies to collect information about your browsing activities and to personalize your experience on our platform. Cookies are small text files stored on your device that help us recognize you and remember your preferences.\n\nTypes of cookies we use:\n\n• Essential Cookies: Necessary for the operation of our platform.\n• Analytical Cookies: Help us understand how users interact with our platform.\n• Functional Cookies: Remember your preferences and settings.\n• Targeting Cookies: Deliver relevant advertisements and track their effectiveness.\n\nYou can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our platform.",
      },
    ],
  },
  {
    title: "6. Data Security",
    content: [
      {
        subtitle: "",
        text: "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.\n\nWe take the following steps to protect our data:\n\n• Using encryption for sensitive information.\n• Implementing access controls and authentication procedures.\n• Regularly reviewing and updating our security practices.\n• Training our staff on data protection and privacy.",
      },
    ],
  },
  {
    title: "7. Data Retention",
    content: [
      {
        subtitle: "",
        text: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining the appropriate retention period, we consider:\n\n• The nature and sensitivity of the information.\n• The potential risk of harm from unauthorized use or disclosure.\n• The purposes for which we process the information.\n• Applicable legal requirements.\n\nWhen we no longer need your personal information, we will securely delete or anonymize it.",
      },
    ],
  },
  {
    title: "8. Your Rights and Choices",
    content: [
      {
        subtitle: "",
        text: "Depending on your location, you may have certain rights regarding your personal information, including:\n\n• Access: The right to request access to the personal information we hold about you.\n• Correction: The right to request correction of inaccurate or incomplete information.\n• Deletion: The right to request deletion of your personal information in certain circumstances.\n• Restriction: The right to request restriction of processing of your personal information.\n• Data Portability: The right to receive your personal information in a structured, commonly used format.\n• Objection: The right to object to processing of your personal information in certain circumstances.\n• Withdrawal of Consent: The right to withdraw consent at any time for processing based on consent.\n\nTo exercise these rights, please contact us using the information provided in the \"Contact Us\" section.",
      },
    ],
  },
  {
    title: "9. Children's Privacy",
    content: [
      {
        subtitle: "",
        text: "Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.",
      },
    ],
  },
  {
    title: "10. International Data Transfers",
    content: [
      {
        subtitle: "",
        text: "We may transfer your personal information to countries other than the one in which you reside. When we transfer personal information across borders, we take appropriate safeguards to ensure that your information is protected in accordance with this Privacy Policy and applicable data protection laws.",
      },
    ],
  },
  {
    title: "11. Changes to This Privacy Policy",
    content: [
      {
        subtitle: "",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our platform and updating the \"Last Updated\" date. We encourage you to review this policy periodically.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Shield className="w-4 h-4" />
          Legal
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground text-lg">
          Last updated: 1 January 2026 &nbsp;·&nbsp; Effective: 1 January 2026
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          At {BRAND_NAME}, we are committed to protecting your privacy and ensuring the security of
          your personal information. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website or use our services. Please read this
          policy carefully to understand our practices regarding your personal data.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {BRAND_NAME} is operated by{" "}
          <span className="font-medium text-foreground">{COMPANY_LEGAL_NAME}</span>.
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title} className="border-t border-border pt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.content.map((item, i) => (
                <div key={i}>
                  {item.subtitle && (
                    <h3 className="font-medium text-foreground mb-1">{item.subtitle}</h3>
                  )}
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
