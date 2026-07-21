import { Link } from "wouter";
import { Twitter, Linkedin, Youtube, Github } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="EduWisp" className="w-9 h-9 rounded-lg shrink-0 object-cover" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-xl text-background leading-none">
                  EduWisp
                </span>
                <span className="text-[10px] text-background/50 font-medium mt-0.5 leading-none">
                  Learn. Grow. Succeed.
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Empowering learners across India with expert-led courses in
              technology, design, and business.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-background" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["All Courses", "/courses"],
                ["Blog", "/blog"],
                ["About Us", "/about"],
                ["Careers", "/careers"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-background transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Web Development",
                "Data Science",
                "Design",
                "DevOps",
                "Mobile Development",
                "Cybersecurity",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/courses?category=${encodeURIComponent(cat)}`}
                    className="hover:text-background transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Contact Us", "/contact"],
                ["Privacy Policy", "/privacy-policy"],
                ["Terms & Conditions", "/terms"],
                ["Refund Policy", "/refund-policy"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-background transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>© {year} Cipherwisp Finsoft Technologies Private Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-background transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-background transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-background transition-colors"
            >
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
