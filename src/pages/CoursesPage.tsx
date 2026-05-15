import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseCard from "@/components/CourseCard";
import { useListCourses } from "@/hooks/useData";
import { useLocation } from "wouter";

const categories = ["All", "Web Development", "Data Science", "Design", "DevOps", "Mobile Development", "Cybersecurity"];
const levels = ["All Levels", "beginner", "intermediate", "advanced"];

export default function CoursesPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.includes("?") ? location.split("?")[1] : "");
  const initialCategory = params.get("category") || "";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [level, setLevel] = useState("All Levels");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const queryParams = {
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(category && category !== "All" ? { category } : {}),
    limit: 24,
    page: 1,
  };

  const { data: result } = useListCourses(queryParams);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setLevel("All Levels");
  };

  const hasFilters = search || (category && category !== "All") || level !== "All Levels";

  let displayCourses = result?.courses ?? [];
  if (level !== "All Levels") {
    displayCourses = displayCourses.filter((c) => c.level === level);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/8 to-accent/5 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
            All Courses
          </h1>
          <p className="text-muted-foreground">
            {result ? `${result.total} courses available` : "Loading courses..."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search-courses"
            />
          </div>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full sm:w-40" data-testid="select-level-filter">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((l) => (
                <SelectItem key={l} value={l}>
                  {l === "beginner" ? "Beginner" : l === "intermediate" ? "Intermediate" : l === "advanced" ? "Advanced" : l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="outline" onClick={clearFilters} className="gap-2 shrink-0" data-testid="button-clear-filters">
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === "All" ? "" : cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                (cat === "All" && !category) || category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {!result ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-muted rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : displayCourses.length === 0 ? (
          <div className="text-center py-20">
            <SlidersHorizontal className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">Try different search terms or filters.</p>
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
