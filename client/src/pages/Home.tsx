import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { Layers, HelpCircle, PencilLine, Users, BookOpen, TrendingUp } from "lucide-react";
import textLevelingImg from "@assets/generated_images/Text_leveling_graphic_731cc53d.png";
import quizImg from "@assets/generated_images/Quiz_feature_graphic_f57242f5.png";
import writingImg from "@assets/generated_images/Writing_prompts_graphic_e2fb36c6.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ciri-ciri Utama</h2>
          <p className="text-lg text-muted-foreground">
            Alat pembelajaran yang disesuaikan untuk setiap pelajar
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Layers}
            title="Tahap Bacaan Berbeza"
            description="Setiap kandungan disesuaikan kepada 5 tahap bacaan untuk memastikan pemahaman optimum"
            image={textLevelingImg}
          />
          <FeatureCard
            icon={HelpCircle}
            title="Kuiz Pemahaman"
            description="Soalan yang dijana automatik untuk menguji pemahaman dengan maklum balas segera"
            image={quizImg}
          />
          <FeatureCard
            icon={PencilLine}
            title="Cadangan Penulisan"
            description="Prompt penulisan yang relevan untuk mengembangkan pemikiran kritis dan kemahiran menulis"
            image={writingImg}
          />
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Bagaimana Ia Berfungsi</h2>
            <p className="text-lg text-muted-foreground">
              Tiga langkah mudah untuk pembelajaran yang lebih baik
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Masukkan Teks</h3>
              <p className="text-muted-foreground">
                Tampal artikel atau masukkan pautan dari Berita Harian atau sumber lain
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI Menyesuaikan</h3>
              <p className="text-muted-foreground">
                Kandungan diubah kepada pelbagai tahap bacaan secara automatik
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Belajar & Nilai</h3>
              <p className="text-muted-foreground">
                Baca, jawab kuiz, dan tulis untuk mengukuhkan pembelajaran
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Untuk Semua</h2>
          <p className="text-lg text-muted-foreground">
            Direka untuk pelajar, guru, dan ibu bapa
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={BookOpen}
            title="Pelajar"
            description="Baca pada tahap yang sesuai dan tingkatkan kemahiran bacaan dengan aktiviti menarik"
          />
          <FeatureCard
            icon={Users}
            title="Guru"
            description="Agihkan artikel dan pantau kemajuan pelajar dengan dashboard yang komprehensif"
          />
          <FeatureCard
            icon={TrendingUp}
            title="Ibu Bapa"
            description="Sokong pembelajaran anak di rumah dengan kandungan yang selamat dan sesuai"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}