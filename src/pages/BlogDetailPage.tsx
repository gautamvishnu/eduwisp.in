import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetBlogPost } from "@/hooks/useData";

export default function BlogDetailPage() {
  const params = useParams<{ id: string }>();
  const postId = Number(params.id);

  const { data: post } = useGetBlogPost(postId, { enabled: !!postId });

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 space-y-4">
        <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
        <div className="h-64 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/blog">
          <Button variant="ghost" className="gap-2 mb-8 -ml-2 text-muted-foreground" data-testid="button-back-to-blog">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs capitalize">{tag}</Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-foreground leading-tight mb-6" style={{ fontFamily: "var(--app-font-display, var(--app-font-sans))" }}>
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>

        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full aspect-video object-cover rounded-xl mb-10"
        />

        <div className="prose prose-neutral max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return <h3 key={i} className="text-xl font-bold mt-8 mb-3 text-foreground">{paragraph.replace(/\*\*/g, "")}</h3>;
            }
            if (paragraph.match(/^\d+\. \*\*/)) {
              const items = paragraph.split("\n").filter(Boolean);
              return (
                <ol key={i} className="list-decimal list-inside space-y-3 my-4">
                  {items.map((item, j) => {
                    const cleaned = item.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, "$1");
                    return <li key={j} className="text-foreground leading-relaxed">{cleaned}</li>;
                  })}
                </ol>
              );
            }
            return <p key={i} className="text-foreground leading-relaxed mb-4">{paragraph.replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
