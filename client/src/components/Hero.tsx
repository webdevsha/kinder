import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Students_collaboration_illustration_a9246780.png";

export default function Hero() {
  return (
    <section className="relative h-96 w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Malaysian students learning together" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>
      
      <div className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="max-w-2xl space-y-6 text-white">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Buku Teks Dinamik Adaptif untuk Pelajar Malaysia
            </h1>
            <p className="text-lg text-white/90">
              Transformasi apa sahaja teks kepada buku teks dinamik yang disesuaikan dengan tahap bacaan setiap pelajar
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="default" 
                size="lg" 
                className="gap-2"
                data-testid="button-start"
              >
                Mula Sekarang
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                data-testid="button-learn-more"
              >
                Ketahui Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}