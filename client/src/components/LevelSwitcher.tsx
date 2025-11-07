import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LevelSwitcherProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
  totalLevels?: number;
}

export default function LevelSwitcher({ 
  currentLevel, 
  onLevelChange, 
  totalLevels = 5 
}: LevelSwitcherProps) {
  const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Tahap Bacaan:</span>
      <div className="flex gap-1">
        {levels.map((level) => (
          <Button
            key={level}
            variant={currentLevel === level ? "default" : "outline"}
            size="sm"
            onClick={() => {
              console.log(`Level ${level} selected`);
              onLevelChange(level);
            }}
            data-testid={`button-level-${level}`}
            className={cn(
              "min-w-[2.5rem]",
              currentLevel === level && "pointer-events-none"
            )}
          >
            {level}
          </Button>
        ))}
      </div>
    </div>
  );
}