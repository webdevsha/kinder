import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookText } from "lucide-react";
import { useLocation } from "wouter";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  level: number;
  topic: string;
  date: string;
  wordCount?: number;
}

export default function ArticleCard({ 
  id, 
  title, 
  excerpt, 
  level, 
  topic, 
  date, 
  wordCount 
}: ArticleCardProps) {
  const [, setLocation] = useLocation();

  return (
    <Card 
      className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden"
      data-testid={`card-article-${id}`}
      onClick={() => setLocation(`/article/${id}`)}
    >
      <CardHeader className="pb-3">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" data-testid={`badge-level-${id}`}>
            Tahap {level}
          </Badge>
          <Badge variant="outline" className="text-xs" data-testid={`badge-topic-${id}`}>
            {topic}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
          {wordCount && (
            <div className="flex items-center gap-1">
              <BookText className="h-3 w-3" />
              <span>{wordCount} perkataan</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}