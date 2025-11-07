import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import TextInput from "@/components/TextInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Loader2 } from "lucide-react";
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
    id: article.id,
    title: article.title,
    excerpt: article.originalText.substring(0, 150) + "...",
    level: 3,
    topic: article.topic || "Umum",
    date: format(new Date(article.createdAt), "d MMM yyyy"),
    wordCount: article.wordCount
  }));

  const mockArticles = [
    {
      id: "1",
      title: "Penemuan Baharu di Perpustakaan Sekolah",
      excerpt: "Pelajar-pelajar sekolah rendah mendapati buku-buku lama yang menarik di perpustakaan sekolah mereka...",
      level: 3,
      topic: "Pendidikan",
      date: "5 Nov 2025",
      wordCount: 450
    },
    {
      id: "2",
      title: "Teknologi Baharu untuk Pembelajaran",
      excerpt: "Sekolah-sekolah di Malaysia mula menggunakan tablet dan aplikasi untuk membantu pelajar belajar dengan lebih baik...",
      level: 4,
      topic: "Teknologi",
      date: "3 Nov 2025",
      wordCount: 520
    },
    {
      id: "3",
      title: "Kempen Kitar Semula di Sekolah",
      excerpt: "Pelajar Tahun 5 memulakan projek kitar semula untuk menjaga alam sekitar...",
      level: 2,
      topic: "Alam Sekitar",
      date: "1 Nov 2025",
      wordCount: 380
    },
    {
      id: "4",
      title: "Sukan dan Kesihatan Pelajar",
      excerpt: "Program sukan baru di sekolah membantu pelajar menjadi lebih sihat dan aktif...",
      level: 3,
      topic: "Sukan",
      date: "30 Okt 2025",
      wordCount: 415
    },
    {
      id: "5",
      title: "Kebudayaan Malaysia yang Kaya",
      excerpt: "Pelajar belajar tentang pelbagai budaya dan tradisi di Malaysia melalui festival sekolah...",
      level: 4,
      topic: "Kebudayaan",
      date: "28 Okt 2025",
      wordCount: 485
    },
    {
      id: "6",
      title: "Sains dalam Kehidupan Harian",
      excerpt: "Eksperimen sains yang mudah menunjukkan bagaimana sains wujud di sekeliling kita...",
      level: 2,
      topic: "Sains",
      date: "25 Okt 2025",
      wordCount: 360
    }
  ];

  const allArticles = articles.length > 0 ? articles : mockArticles;
  
  const filteredArticles = allArticles.filter((article) =>
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
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
            {filteredArticles.length === 0 && (
              <div className="col-span-3 py-12 text-center text-muted-foreground">
                {searchQuery ? "Tiada kandungan ditemui" : "Tiada kandungan lagi. Tambah yang pertama!"}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}