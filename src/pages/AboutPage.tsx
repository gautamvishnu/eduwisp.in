import { Link } from "wouter";
import { Target, Heart, Globe, Award, Users, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, COMPANY_LEGAL_NAME } from "@/lib/company";

const team = [
  { name: "Rachel Kim", role: "CEO & Co-founder", bio: "Former Head of Education at Khan Academy. Passionate about accessible learning.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  { name: "David Okafor", role: "CTO & Co-founder", bio: "Ex-Google engineer. Built learning platforms serving 10M+ students.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { name: "Sofia Reyes", role: "Head of Content", bio: "Curriculum designer with 15 years in edtech. Ensures every course meets our quality bar.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
  { name: "James Lin", role: "Head of Community", bio: "Built developer communities at GitHub. Now focused on learner success and engagement.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" },
];

const values = [
  { icon: Target, title: "Clarity over complexity", desc: "Great education distills hard things into clear, actionable understanding." },
  { icon: Heart, title: "Learner obsession", desc: "Every decision starts with: how does this help someone learn better?" },
  { icon: Globe, title: "Radical accessibility", desc: "Knowledge shouldn't be gated by where you were born or what you can afford." },
  { icon: Award, title: "Uncompromising quality", desc: "We'd rather have fewer courses done right than many done halfway." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/8 via-background to-accent/5 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Badge variant="secondary" className="mb-4">Our Story</Badge>
          <h1 className="text-5xl font-extrabold text-foreground mb-6" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
            Learning is the most powerful
            <span className="text-primary block">investment you can make</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {BRAND_NAME} was founded in 2020 by two engineers who believed that world-class education 
            should be available to anyone, anywhere — not just people lucky enough to afford elite universities.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {BRAND_NAME} is operated by{" "}
            <span className="font-medium text-foreground">{COMPANY_LEGAL_NAME}</span>.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">Why we exist</Badge>
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
              The gap between
              knowing and doing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most online courses teach you what to do, but not how to think about a problem. 
              We saw learners finishing 30-hour courses and still feeling lost when it came to real work.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              So we built {BRAND_NAME} differently. Every course is built around a project-first philosophy: 
              you learn by building things that matter, guided by instructors who actually work in the field.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, 48,000+ learners in 120+ countries have used {BRAND_NAME} to change careers, 
              get promoted, and build businesses. We're just getting started.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, stat: "500+", label: "Courses Created" },
              { icon: Users, stat: "48K+", label: "Active Learners" },
              { icon: Globe, stat: "120+", label: "Countries" },
              { icon: Award, stat: "98%", label: "Satisfaction Rate" },
            ].map(({ icon: Icon, stat, label }) => (
              <div key={label} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat}</div>
                <div className="text-xs text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-muted/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">Our Principles</Badge>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
              What we believe
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">The People</Badge>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
            Meet our team
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="bg-card border border-border rounded-xl p-6 text-center" data-testid={`card-team-${member.name.replace(/\s+/g, "-").toLowerCase()}`}>
              <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary py-16 text-center text-primary-foreground">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join our mission</h2>
          <p className="text-primary-foreground/80 mb-8">
            Whether you're here to learn or to teach, there's a place for you at {BRAND_NAME}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/courses">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">Start Learning</Button>
            </Link>
            <Link href="/careers">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
                View Open Roles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
