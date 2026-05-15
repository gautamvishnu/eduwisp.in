import { Link } from "wouter";
import {
  ArrowRight,
  Star,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CourseCard from "@/components/CourseCard";
import {
  useGetFeaturedCourses,
  useGetCourseStats,
} from "@/hooks/useData";

const categories = [
  {
    name: "Web Development",
    icon: "💻",
    count: "120+ courses",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Data Science",
    icon: "📊",
    count: "85+ courses",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Design",
    icon: "🎨",
    count: "60+ courses",
    color: "from-orange-400 to-rose-500",
  },
  {
    name: "DevOps",
    icon: "⚙️",
    count: "45+ courses",
    color: "from-teal-500 to-cyan-600",
  },
  {
    name: "Mobile",
    icon: "📱",
    count: "55+ courses",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Cybersecurity",
    icon: "🔒",
    count: "40+ courses",
    color: "from-red-500 to-orange-600",
  },
];

const testimonials = [
  {
    name: "Aisha Patel",
    role: "Software Engineer at MNC",
    text: "EduWisp transformed my career. I went from marketing to engineering in 8 months using their courses. The quality is unmatched.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
    rating: 5,
  },
  {
    name: "Rajan Kumar",
    role: "UX Designer at MNC",
    text: "Every course I've taken has been immediately applicable to my work. The instructors clearly know what they're talking about.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80",
    rating: 5,
  },
  {
    name: "Dharmika Asnani",
    role: "Data Scientist at MNC",
    text: "The machine learning curriculum is the most practical I've found anywhere. I got promoted 3 months after completing the AI track.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
    rating: 4,
  },
];

export default function HomePage() {
  const { data: featuredCourses } = useGetFeaturedCourses();
  const { data: stats } = useGetCourseStats();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-16 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.12),_transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-medium">
              Trusted by 48,000+ learners worldwide
            </Badge>
            <h1
              className="text-5xl sm:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6"
              style={{
                fontFamily: "var(--app-font-display, var(--app-font-sans))",
              }}
            >
              Learn the skills that
              <span className="text-primary block">shape your future</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Expert-led courses in web development, data science, design, and
              more. Learn at your pace, land your next role.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/courses">
                <Button
                  size="lg"
                  className="gap-2 text-base font-semibold px-8"
                  data-testid="button-browse-courses"
                >
                  Browse Courses
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {/* <Button size="lg" variant="outline" className="gap-2 text-base font-semibold px-8" data-testid="button-watch-demo">
                <Play className="w-4 h-4 fill-current" />
                Watch Demo
              </Button> */}
            </div>
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-muted-foreground">
              {[
                "Certificate on completion",
                "Money-back guarantee",
                "Expert instructors",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center text-primary-foreground">
            <div>
              <div className="text-3xl font-bold">
                {stats?.totalStudents?.toLocaleString() ?? "48,000"}+
              </div>
              <div className="text-sm opacity-80 mt-1">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {stats?.totalCourses ?? "500"}+
              </div>
              <div className="text-sm opacity-80 mt-1">Expert Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {stats?.totalInstructors ?? "200"}+
              </div>
              <div className="text-sm opacity-80 mt-1">Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {stats?.totalCategories ?? "12"}
              </div>
              <div className="text-sm opacity-80 mt-1">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {stats?.satisfactionRate ?? "98"}%
              </div>
              <div className="text-sm opacity-80 mt-1">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <Badge variant="secondary" className="mb-3">
              Handpicked for you
            </Badge>
            <h2
              className="text-3xl font-bold text-foreground"
              style={{
                fontFamily: "var(--app-font-display, var(--app-font-sans))",
              }}
            >
              Featured Courses
            </h2>
          </div>
          <Link href="/courses">
            <Button
              variant="outline"
              className="gap-2 hidden sm:flex"
              data-testid="link-view-all-courses"
            >
              View all courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        {featuredCourses ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-muted rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              All Disciplines
            </Badge>
            <h2
              className="text-3xl font-bold text-foreground"
              style={{
                fontFamily: "var(--app-font-display, var(--app-font-sans))",
              }}
            >
              Explore by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/courses?category=${encodeURIComponent(cat.name)}`}
              >
                <div
                  className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer group"
                  data-testid={`card-category-${cat.name.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cat.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why EduWisp */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-3">
            Why choose us
          </Badge>
          <h2
            className="text-3xl font-bold text-foreground"
            style={{
              fontFamily: "var(--app-font-display, var(--app-font-sans))",
            }}
          >
            Learning that actually works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: BookOpen,
              title: "Expert Instructors",
              desc: "Learn from professionals who work at Google, Stripe, Airbnb, and other leading companies.",
            },
            {
              icon: Award,
              title: "Certificates Included",
              desc: "Every completed course comes with a certificate you can share on LinkedIn and in job applications.",
            },
            {
              icon: Users,
              title: "Active Community",
              desc: "Join a global community of 48,000+ learners. Ask questions, share projects, get feedback.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="text-center p-8 bg-card border border-border rounded-xl hover:border-primary/40 transition-colors"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">
              Student Stories
            </Badge>
            <h2
              className="text-3xl font-bold text-foreground"
              style={{
                fontFamily: "var(--app-font-display, var(--app-font-sans))",
              }}
            >
              Real results from real learners
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border p-6 rounded-xl shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-center text-primary-foreground">
        <div className="max-w-2xl mx-auto px-4">
          <h2
            className="text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--app-font-display, var(--app-font-sans))",
            }}
          >
            Ready to start learning?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Join 48,000+ learners already building their future with EduWisp.
          </p>
          <Link href="/courses">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base font-semibold px-8"
              data-testid="button-cta-browse"
            >
              Browse all courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
