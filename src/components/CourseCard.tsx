import { Link } from "wouter";
import { Star, Clock, Users, ShoppingCart, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/currency";

interface Course {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  level: string;
  duration: string;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
}

interface CourseCardProps {
  course: Course;
}

const levelColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

export default function CourseCard({ course }: CourseCardProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(course.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
  };

  return (
    <Link href={`/courses/${course.id}`} data-testid={`card-course-${course.id}`}>
      <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {course.isFeatured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-accent text-accent-foreground text-xs font-semibold">Featured</Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className={`text-xs font-medium ${levelColors[course.level] ?? "bg-muted text-muted-foreground"}`}>
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-1.5 mb-2">
            <Badge variant="secondary" className="text-xs">{course.category}</Badge>
          </div>
          <h3 className="font-semibold text-foreground leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{course.shortDescription}</p>
          <p className="text-xs text-muted-foreground mb-3">by {course.instructor}</p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
              <span>({course.reviewsCount.toLocaleString()})</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {course.studentsCount.toLocaleString()}
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-foreground">{formatINR(course.price)}</span>
              {course.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{formatINR(course.originalPrice)}</span>
              )}
            </div>
            <Button
              size="sm"
              variant={inCart ? "secondary" : "default"}
              className="gap-1.5"
              onClick={handleAddToCart}
              data-testid={`button-add-to-cart-${course.id}`}
            >
              {inCart ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
