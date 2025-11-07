import Header from "@/components/Header";
import ArticleReader from "@/components/ArticleReader";
import LevelSwitcher from "@/components/LevelSwitcher";
import QuizQuestion from "@/components/QuizQuestion";
import WritePrompt from "@/components/WritePrompt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function ArticleView() {
  const [currentLevel, setCurrentLevel] = useState(3);

  const sampleContent = `Perpustakaan Sekolah Rendah Bandar Putra telah menjadi tempat yang lebih menarik sejak kebelakangan ini. Pelajar-pelajar Tahun 5 menemui koleksi buku lama yang tersimpan di sudut perpustakaan.

Buku-buku itu termasuk cerita rakyat Malaysia, kisah sejarah, dan ensiklopedia yang ditulis puluhan tahun yang lalu. "Kami sangat teruja kerana buku-buku ini mempunyai gambar dan maklumat yang menarik," kata Sarah, seorang pelajar.

Cikgu Aminah, pustakawan sekolah, berkata bahawa buku-buku tersebut akan dibersihkan dan dipamerkan untuk semua pelajar. "Ini adalah khazanah sekolah kita," katanya.

Pelajar-pelajar kini lebih kerap mengunjungi perpustakaan untuk membaca buku-buku lama ini. Mereka juga belajar tentang sejarah sekolah mereka melalui buku-buku tersebut.`;

  const quizQuestions = [
    {
      question: "Apakah yang ditemui oleh pelajar di perpustakaan?",
      options: [
        "Buku-buku baru",
        "Buku-buku lama yang menarik",
        "Komputer baru",
        "Meja belajar baru"
      ],
      correctAnswer: 1
    },
    {
      question: "Siapakah pustakawan sekolah yang disebut dalam artikel?",
      options: [
        "Cikgu Sarah",
        "Cikgu Siti",
        "Cikgu Aminah",
        "Cikgu Fatimah"
      ],
      correctAnswer: 2
    },
    {
      question: "Apakah yang akan dilakukan kepada buku-buku lama tersebut?",
      options: [
        "Dibuang",
        "Dijual",
        "Dibersihkan dan dipamerkan",
        "Disimpan semula"
      ],
      correctAnswer: 2
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="border-b bg-background py-4">
        <div className="mx-auto w-full max-w-reading px-4 md:px-6">
          <LevelSwitcher currentLevel={currentLevel} onLevelChange={setCurrentLevel} />
        </div>
      </div>

      <main className="mx-auto w-full px-4 py-8 md:px-6">
        <Tabs defaultValue="article" className="w-full">
          <div className="sticky top-16 z-40 border-b bg-background pb-4">
            <div className="mx-auto max-w-reading">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="article" data-testid="tab-article">
                  Artikel
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
            <ArticleReader
              title="Penemuan Baharu di Perpustakaan Sekolah"
              byline="Oleh Nurul Aina"
              level={currentLevel}
              wordCount={450}
              content={sampleContent}
              date="5 November 2025"
            />
          </TabsContent>

          <TabsContent value="quiz" className="mt-8">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="mb-8">
                <h2 className="mb-2 text-2xl font-bold">Kuiz Pemahaman</h2>
                <p className="text-muted-foreground">
                  Uji pemahaman anda tentang artikel ini
                </p>
              </div>
              
              {quizQuestions.map((q, index) => (
                <QuizQuestion
                  key={index}
                  questionNumber={index + 1}
                  totalQuestions={quizQuestions.length}
                  question={q.question}
                  options={q.options}
                  correctAnswer={q.correctAnswer}
                  onNext={index < quizQuestions.length - 1 ? () => console.log('Next') : undefined}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="write" className="mt-8">
            <div className="mx-auto max-w-2xl">
              <div className="mb-6">
                <h2 className="mb-2 text-2xl font-bold">Aktiviti Penulisan</h2>
                <p className="text-muted-foreground">
                  Luahkan pemikiran anda tentang artikel ini
                </p>
              </div>
              
              <WritePrompt
                prompt="Terangkan satu peristiwa daripada teks. Mengapa peristiwa ini berlaku? Gunakan butiran dari artikel untuk menyokong jawapan anda."
                aiGenerated={true}
                onRefresh={() => console.log('Refresh prompt')}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}