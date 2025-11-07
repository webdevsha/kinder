import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Highlighter, MessageSquare, BookmarkPlus } from "lucide-react";
import { useState } from "react";

interface ArticleReaderProps {
  title: string;
  byline?: string;
  level: number;
  wordCount: number;
  content: string;
  date: string;
}

export default function ArticleReader({
  title,
  byline,
  level,
  wordCount,
  content,
  date
}: ArticleReaderProps) {
  const [isHighlightMode, setIsHighlightMode] = useState(false);

  return (
    <div className="mx-auto w-full max-w-reading">
      <div className="sticky top-16 z-40 border-b bg-background py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge data-testid="badge-current-level">Tahap {level}</Badge>
            <span className="text-sm text-muted-foreground">{wordCount} perkataan</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={isHighlightMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setIsHighlightMode(!isHighlightMode);
                console.log('Highlight mode:', !isHighlightMode);
              }}
              data-testid="button-highlight"
              className="gap-2"
            >
              <Highlighter className="h-4 w-4" />
              Serlah
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Add note clicked')}
              data-testid="button-add-note"
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Nota
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Bookmark clicked')}
              data-testid="button-bookmark"
            >
              <BookmarkPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <article className="py-8">
        <header className="mb-8 space-y-4">
          <h1 className="font-serif text-4xl font-bold leading-tight" data-testid="text-article-title">
            {title}
          </h1>
          {byline && (
            <p className="text-muted-foreground">{byline}</p>
          )}
          <div className="text-sm text-muted-foreground">{date}</div>
        </header>

        <div 
          className="prose prose-lg max-w-none font-serif leading-relaxed dark:prose-invert"
          data-testid="text-article-content"
        >
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}