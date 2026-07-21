import { MapPin, Clock, Briefcase, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useListCareers } from "@/hooks/useData";

const typeColors: Record<string, string> = {
  "full-time": "bg-blue-100 text-blue-700",
  "part-time": "bg-purple-100 text-purple-700",
  "contract": "bg-orange-100 text-orange-700",
  "remote": "bg-green-100 text-green-700",
};

export default function CareersPage() {
  const { data: careers } = useListCareers();

  type CareerItem = NonNullable<typeof careers>[number];
  const deptMap: Record<string, CareerItem[]> = {};
  if (careers) {
    for (const job of careers) {
      if (!deptMap[job.department]) deptMap[job.department] = [];
      deptMap[job.department].push(job);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-primary-foreground/20 text-primary-foreground mb-4">Join Our Team</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
            Build the future of education
          </h1>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto">
            We're on a mission to make world-class education accessible to everyone. 
            Join us if you believe learning can change lives.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-muted/40 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { emoji: "🌍", title: "Remote-first", desc: "Work from anywhere. We measure output, not hours." },
              { emoji: "📚", title: "Grow daily", desc: "Every employee gets a Rs.2000/year learning stipend." },
              { emoji: "🤝", title: "Inclusive culture", desc: "Diverse teams build better products. Everyone belongs here." },
            ].map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-xl p-6">
                <div className="text-4xl mb-3">{v.emoji}</div>
                <h3 className="font-semibold text-lg mb-1">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
          Open Positions
        </h2>

        {!careers ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : Object.keys(deptMap).length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No open positions at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(deptMap).map(([dept, jobs]) => (
              <div key={dept}>
                <h3 className="text-lg font-semibold text-primary border-b border-border pb-3 mb-4">{dept}</h3>
                <div className="space-y-3">
                  {(jobs ?? []).map((job) => (
                    <div
                      key={job.id}
                      className="group bg-card border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all cursor-pointer"
                      data-testid={`card-career-${job.id}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {job.title}
                            </h4>
                            <Badge className={`text-xs ${typeColors[job.type] ?? "bg-muted text-muted-foreground"}`}>
                              {job.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{job.description}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0 mt-1 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
