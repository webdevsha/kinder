import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import TextInput from "@/components/TextInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Loader2, BookText } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@shared/schema";
import { format } from "date-fns";

export default function Library() {
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articlesData = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const articles = articlesData.map(article => ({
    id: String(article.id),
    title: article.title,
    excerpt: article.originalText.substring(0, 150) + "...",
    level: 3,
    topic: article.topic || "Umum",
    date: format(new Date(article.createdAt), "d MMM yyyy"),
    wordCount: article.wordCount
  }));
  
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Perpustakaan Kandungan</h1>
            <Button
              onClick={() => {
                setShowInput(!showInput);
                console.log('Toggle input:', !showInput);
              }}
              className="gap-2"
              data-testid="button-add-article"
            >
              <Plus className="h-4 w-4" />
              Tambah Kandungan
            </Button>
          </div>
          
          {showInput && (
            <div className="mb-8">
              <TextInput />
            </div>
          )}
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari kandungan..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                console.log('Search:', e.target.value);
              }}
              className="pl-9"
              data-testid="input-search-articles"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-6">
              <BookText className="h-12 w-12 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              {searchQuery ? "Tiada kandungan ditemui" : "Tiada kandungan lagi"}
            </h3>
            <p className="mb-6 text-muted-foreground max-w-md">
              {searchQuery 
                ? "Cuba cari dengan kata kunci yang berbeza" 
                : "Mulakan dengan menambah kandungan pertama anda. Klik butang 'Tambah Kandungan' untuk bermula."
              }
            </p>
            {!searchQuery && !showInput && (
              <Button
                onClick={() => setShowInput(true)}
                className="gap-2"
                size="lg"
                data-testid="button-add-first-article"
              >
                <Plus className="h-4 w-4" />
                Tambah Kandungan Pertama
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}