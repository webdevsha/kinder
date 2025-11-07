import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RotateCw } from "lucide-react";
import { useState } from "react";

interface WritePromptProps {
  prompt: string;
  aiGenerated?: boolean;
  onRefresh?: () => void;
}

export default function WritePrompt({ prompt, aiGenerated = true, onRefresh }: WritePromptProps) {
  const [response, setResponse] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setResponse(text);
    setCharCount(text.length);
    console.log('Text updated:', text.length, 'characters');
  };

  return (
    <Card data-testid="card-write-prompt">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">Cadangan Penulisan</CardTitle>
          {aiGenerated && (
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI
            </Badge>
          )}
        </div>
        <div className="flex items-start justify-between gap-4 rounded-md bg-accent/50 p-4">
          <p className="flex-1 text-base">{prompt}</p>
          {onRefresh && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => {
                console.log('Refreshing prompt');
                onRefresh();
              }}
              data-testid="button-refresh-prompt"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={response}
          onChange={handleTextChange}
          placeholder="Tulis jawapan anda di sini..."
          className="min-h-64 resize-none text-base"
          data-testid="textarea-response"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{charCount} aksara</span>
          <div className="flex gap-2">
            <Button variant="outline" data-testid="button-save-draft">
              Simpan Draf
            </Button>
            <Button data-testid="button-submit-response">
              Hantar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}