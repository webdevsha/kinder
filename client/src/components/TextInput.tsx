import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Link2 } from "lucide-react";
import { useState } from "react";

export default function TextInput() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState("paste");

  const handleProcess = () => {
    if (activeTab === "paste" && text) {
      console.log('Processing pasted text:', text.substring(0, 50) + '...');
    } else if (activeTab === "url" && url) {
      console.log('Processing URL:', url);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-3xl" data-testid="card-text-input">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Tambah Kandungan Baharu
        </CardTitle>
        <CardDescription>
          Tampal teks atau masukkan pautan untuk menukar kepada buku teks dinamik
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paste" data-testid="tab-paste">
              Tampal Teks
            </TabsTrigger>
            <TabsTrigger value="url" data-testid="tab-url">
              Pautan URL
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="paste" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Teks Kandungan</Label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  console.log('Text length:', e.target.value.length);
                }}
                placeholder="Tampal kandungan anda di sini..."
                className="min-h-64 resize-none"
                data-testid="textarea-article-text"
              />
              <p className="text-sm text-muted-foreground">
                {text.length} aksara
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url-input">Pautan Kandungan</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="url-input"
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      console.log('URL:', e.target.value);
                    }}
                    placeholder="https://..."
                    className="pl-9"
                    data-testid="input-article-url"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Masukkan pautan ke artikel, berita, atau kandungan dari mana-mana sumber
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button
            onClick={handleProcess}
            disabled={(activeTab === "paste" && !text) || (activeTab === "url" && !url)}
            className="w-full gap-2"
            size="lg"
            data-testid="button-process-article"
          >
            <Sparkles className="h-4 w-4" />
            Proses Kandungan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}