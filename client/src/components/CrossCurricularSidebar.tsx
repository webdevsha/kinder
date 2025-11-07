import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Globe } from "lucide-react";
import type { CrossCurricularConnection } from "@shared/schema";

interface CrossCurricularSidebarProps {
  connections?: CrossCurricularConnection[];
  availableLanguages?: string[];
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export default function CrossCurricularSidebar({ 
  connections = [], 
  availableLanguages = ["Bahasa Malaysia"],
  currentLanguage = "Bahasa Malaysia",
  onLanguageChange 
}: CrossCurricularSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <Card data-testid="card-language-selector">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4 text-primary" />
            Pilihan Bahasa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger data-testid="select-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableLanguages.map((lang) => (
                <SelectItem key={lang} value={lang} data-testid={`option-language-${lang}`}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-2 text-xs text-muted-foreground">
            Kandungan tersedia dalam pelbagai bahasa ibunda
          </p>
        </CardContent>
      </Card>

      {/* Cross-Curricular Connections */}
      <Card data-testid="card-cross-curricular">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-primary" />
            Kaitan Merentas Mata Pelajaran
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {connections.length > 0 ? (
            connections.map((connection, index) => (
              <div 
                key={index} 
                className="space-y-2 border-l-2 border-primary/30 pl-3"
                data-testid={`connection-${index}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs" data-testid={`badge-subject-${index}`}>
                    {connection.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs" data-testid={`badge-curriculum-${index}`}>
                    {connection.curriculum}
                  </Badge>
                </div>
                <h4 className="text-sm font-medium" data-testid={`connection-topic-${index}`}>
                  {connection.topic}
                </h4>
                <p className="text-xs text-muted-foreground" data-testid={`connection-description-${index}`}>
                  {connection.description}
                </p>
                <p className="text-xs font-mono text-muted-foreground" data-testid={`connection-reference-${index}`}>
                  <span className="font-semibold">Rujukan:</span> {connection.syllabusReference}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground" data-testid="no-connections">
              Tiada kaitan merentas mata pelajaran buat masa ini
            </p>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">KSSM/KSSR:</span> Kaitan ini menunjukkan
            bagaimana kandungan Bahasa Malaysia berhubung dengan mata pelajaran lain dalam
            kurikulum Malaysia.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
