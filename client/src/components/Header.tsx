import { BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export default function Header({ onMenuClick, showMenu = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              data-testid="button-menu-toggle"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Kinder</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" data-testid="button-help">
            Bantuan
          </Button>
          <Button variant="default" data-testid="button-login">
            Log Masuk
          </Button>
        </div>
      </div>
    </header>
  );
}