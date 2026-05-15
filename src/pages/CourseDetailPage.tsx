import { useParams, useLocation } from "wouter";
import { Star, Clock, Users, BookOpen, CheckCircle, ChevronDown, ChevronUp, Play, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/currency";
import { useGetCourse } from "@/hooks/useData";

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const courseId = Number(params.id);
  const [, setLocation] = useLocation();
  const { addItem, isInCart } = useCart();
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const { data: course } = useGetCourse(courseId, { enabled: !!courseId });

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  const inCart = isInCart(course.id);

  const handleAddToCart = () => {
    if (!inCart) {
      addItem({
        courseId: course.id,
        title: course.title,
        instructor: course.instructor,
        imageUrl: course.imageUrl,
        price: course.price,
        originalPrice: course.originalPrice,
      });
    }
    setLocation("/cart");
  };

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-foreground/95 to-foreground/80 text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Badge className="bg-accent text-accent-foreground mb-4">{course.category}</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
                {course.title}
              </h1>
              <p className="text-background/80 text-lg mb-6">{course.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <strong className="text-yellow-400">{course.rating.toFixed(1)}</strong>
                  <span className="text-background/60">({course.reviewsCount.toLocaleString()} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-background/70">
                  <Users className="w-4 h-4" />
                  {course.studentsCount.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1 text-background/70">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1 text-background/70">
                  <BookOpen className="w-4 h-4" />
                  {course.lessonsCount} lessons
                </span>
              </div>
              <p className="text-background/70 text-sm">
                Created by <span className="text-primary font-medium">{course.instructor}</span>
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="border-background/30 text-background/70 capitalize">{course.level}</Badge>
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-background/20 text-background/60 text-xs">{tag}</Badge>
                ))}
              </div>
            </div>

            {/* Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl sticky top-24">
                <img src={course.imageUrl} alt={course.title} className="w-full aspect-video object-cover" />
                <div className="p-6">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold text-foreground">{formatINR(course.price)}</span>
                    {course.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">{formatINR(course.originalPrice)}</span>
                    )}
                    {discount && <Badge className="bg-accent text-accent-foreground">{discount}% off</Badge>}
                  </div>
                  <Button
                    className="w-full gap-2 mb-3 text-base font-semibold h-12"
                    onClick={handleAddToCart}
                    data-testid="button-add-to-cart"
                  >
                    {inCart ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Go to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <ul className="space-y-2 text-sm text-muted-foreground mt-4">
                    {[
                      `${course.duration} of on-demand video`,
                      `${course.lessonsCount} lessons`,
                      "Full lifetime access",
                      "Certificate of completion",
                      "30-day money-back guarantee",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* What you'll learn */}
            {course.whatYouLearn && course.whatYouLearn.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
                  What you'll learn
                </h2>
                <div className="bg-muted/30 border border-border rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Curriculum */}
            {course.curriculum && course.curriculum.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
                  Course Curriculum
                </h2>
                <div className="space-y-3">
                  {course.curriculum.map((section, idx) => (
                    <div key={section.id} className="border border-border rounded-xl overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between p-4 text-left bg-muted/30 hover:bg-muted/50 transition-colors"
                        onClick={() => toggleSection(idx)}
                        data-testid={`button-section-${section.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm">{section.title}</span>
                          <Badge variant="secondary" className="text-xs">{section.lessons.length} lessons</Badge>
                        </div>
                        {expandedSections.includes(idx) ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      {expandedSections.includes(idx) && (
                        <div className="divide-y divide-border">
                          {section.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors">
                              <Play className={`w-4 h-4 shrink-0 ${lesson.isPreview ? "text-primary" : "text-muted-foreground"}`} />
                              <span className={`text-sm flex-1 ${lesson.isPreview ? "text-foreground" : "text-muted-foreground"}`}>
                                {lesson.title}
                                {lesson.isPreview && <Badge className="ml-2 text-xs bg-primary/10 text-primary">Preview</Badge>}
                              </span>
                              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Instructor */}
            <section>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
                About the Instructor
              </h2>
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1">{course.instructor}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{course.instructorBio || "Expert instructor with years of real-world experience."}</p>
                </div>
              </div>
            </section>

            {/* Reviews */}
            {course.reviews && course.reviews.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
                  Student Reviews
                </h2>
                <div className="space-y-6">
                  {course.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{review.userName}</div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar on large */}
          <div className="lg:col-span-1 hidden lg:block" />
        </div>
      </div>
    </div>
  );
}
