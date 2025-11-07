import Header from "@/components/Header";
import ArticleReader from "@/components/ArticleReader";
import LevelSwitcher from "@/components/LevelSwitcher";
import QuizQuestion from "@/components/QuizQuestion";
import WritePrompt from "@/components/WritePrompt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Article, ReadingLevel, Quiz, WritePrompt as WritePromptType } from "@shared/schema";
import { ArrowLeft, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function ArticleView() {
  const [, params] = useRoute("/article/:id");
  const articleId = params?.id;
  const [currentLevel, setCurrentLevel] = useState(3);

  const { data: article, isLoading: articleLoading } = useQuery<Article>({
    queryKey: ["/api/articles", articleId],
    enabled: !!articleId,
  });

  const { data: levels = [], isLoading: levelsLoading } = useQuery<ReadingLevel[]>({
    queryKey: ["/api/articles", articleId, "levels"],
    enabled: !!articleId,
  });

  const { data: quiz, isLoading: quizLoading } = useQuery<Quiz>({
    queryKey: ["/api/articles", articleId, "quiz"],
    enabled: !!articleId,
  });

  const { data: writePrompts, isLoading: promptsLoading } = useQuery<WritePromptType>({
    queryKey: ["/api/articles", articleId, "prompts"],
    enabled: !!articleId,
  });

  const isLoading = articleLoading || levelsLoading || quizLoading || promptsLoading;

  if (!articleId) {
    return <div>Article ID not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-muted-foreground">Kandungan tidak dijumpai</p>
          <Link href="/library">
            <Button className="mt-4">Kembali ke Perpustakaan</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentLevelData = levels.find(l => l.level === currentLevel);
  const formattedDate = format(new Date(article.createdAt), "d MMMM yyyy");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="border-b bg-background py-4">
        <div className="mx-auto w-full max-w-reading px-4 md:px-6">
          <div className="mb-4">
            <Link href="/library">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-library">
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>
            </Link>
          </div>
          <LevelSwitcher currentLevel={currentLevel} onLevelChange={setCurrentLevel} />
        </div>
      </div>

      <main className="mx-auto w-full px-4 py-8 md:px-6">
        <Tabs defaultValue="article" className="w-full">
          <div className="sticky top-16 z-40 border-b bg-background pb-4">
            <div className="mx-auto max-w-reading">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="article" data-testid="tab-article">
                  Kandungan
                </TabsTrigger>
                <TabsTrigger value="quiz" data-testid="tab-quiz">
                  Kuiz
                </TabsTrigger>
                <TabsTrigger value="write" data-testid="tab-write">
                  Tulis
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="article" className="mt-0">
            {currentLevelData ? (
              <ArticleReader
                title={article.title}
                byline={currentLevelData.byline || ""}
                level={currentLevel}
                wordCount={article.wordCount}
                content={currentLevelData.content}
                date={formattedDate}
              />
            ) : (
              <div className="mx-auto max-w-reading py-12 text-center text-muted-foreground">
                Tahap bacaan tidak tersedia
              </div>
            )}
          </TabsContent>

          <TabsContent value="quiz" className="mt-8">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="mb-8">
                <h2 className="mb-2 text-2xl font-bold">Kuiz Pemahaman</h2>
                <p className="text-muted-foreground">
                  Uji pemahaman anda tentang kandungan ini
                </p>
              </div>
              
              {quiz && quiz.questions ? (
                quiz.questions.map((q, index) => (
                  <QuizQuestion
                    key={index}
                    questionNumber={index + 1}
                    totalQuestions={quiz.questions.length}
                    question={q.question}
                    options={q.options}
                    correctAnswer={q.correctAnswer}
                  />
                ))
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  Kuiz tidak tersedia
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="write" className="mt-8">
            <div className="mx-auto max-w-2xl">
              <div className="mb-6">
                <h2 className="mb-2 text-2xl font-bold">Aktiviti Penulisan</h2>
                <p className="text-muted-foreground">
                  Luahkan pemikiran anda tentang kandungan ini
                </p>
              </div>
              
              {writePrompts && writePrompts.prompts && writePrompts.prompts.length > 0 ? (
                writePrompts.prompts.map((prompt, index) => (
                  <div key={index} className="mb-6">
                    <WritePrompt
                      prompt={prompt}
                      aiGenerated={true}
                    />
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  Aktiviti penulisan tidak tersedia
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
