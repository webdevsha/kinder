import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">Pelita</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform bacaan adaptif untuk pelajar Malaysia
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground hover-elevate">Untuk Pelajar</a></li>
              <li><a href="#" className="hover:text-foreground hover-elevate">Untuk Guru</a></li>
              <li><a href="#" className="hover:text-foreground hover-elevate">Untuk Ibu Bapa</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Sumber</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground hover-elevate">Panduan</a></li>
              <li><a href="#" className="hover:text-foreground hover-elevate">Bantuan</a></li>
              <li><a href="#" className="hover:text-foreground hover-elevate">Blog</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium">Syarikat</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground hover-elevate">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-foreground hover-elevate">Hubungi</a></li>
              <li><a href="#" className="hover:text-foreground hover-elevate">Privasi</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © 2025 Pelita. Semua hak terpelihara.
        </div>
      </div>
    </footer>
  );
}