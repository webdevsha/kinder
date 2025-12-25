import type { 
  Article, 
  InsertArticle, 
  ReadingLevel, 
  InsertReadingLevel, 
  Quiz, 
  InsertQuiz, 
  WritePrompt, 
  InsertWritePrompt 
} from "@shared/schema";
import { articles, readingLevels, quizzes, writePrompts } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Article operations
  createArticle(article: InsertArticle): Promise<Article>;
  getArticle(id: string): Promise<Article | undefined>;
  getAllArticles(): Promise<Article[]>;
  
  // Reading level operations
  createReadingLevel(level: InsertReadingLevel): Promise<ReadingLevel>;
  getReadingLevelsByArticle(articleId: string): Promise<ReadingLevel[]>;
  getReadingLevel(articleId: string, level: number): Promise<ReadingLevel | undefined>;
  
  // Quiz operations
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuizByArticle(articleId: string): Promise<Quiz | undefined>;
  
  // Write prompt operations
  createWritePrompts(prompts: InsertWritePrompt): Promise<WritePrompt>;
  getWritePromptsByArticle(articleId: string): Promise<WritePrompt | undefined>;
}

export class MemStorage implements IStorage {
  private articles: Map<string, Article>;
  private readingLevels: Map<string, ReadingLevel>;
  private quizzes: Map<string, Quiz>;
  private writePrompts: Map<string, WritePrompt>;

  constructor() {
    this.articles = new Map();
    this.readingLevels = new Map();
    this.quizzes = new Map();
    this.writePrompts = new Map();
    
    // Add sample data for demonstration
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Sample Article 1: Technology in Education
    const article1: Article = {
      id: "sample-1",
      title: "Teknologi Pintar dalam Pendidikan Malaysia",
      originalText: `Sekolah-sekolah di Malaysia kini semakin menggunakan teknologi untuk membantu pelajar belajar dengan lebih berkesan. Daripada tablet hingga aplikasi pembelajaran interaktif, teknologi digital telah mengubah cara pelajar menerima ilmu pengetahuan.

Menurut Kementerian Pendidikan Malaysia, lebih 80 peratus sekolah di kawasan bandar telah dilengkapi dengan akses Internet berkelajuan tinggi. Ini membolehkan guru menggunakan video pendidikan, simulasi saintifik, dan permainan pembelajaran untuk menjadikan pelajaran lebih menarik.

Pelajar Tahun 5 di Sekolah Kebangsaan Taman Desa, Kuala Lumpur, kini menggunakan tablet untuk mengakses buku teks digital. "Saya lebih suka belajar dengan tablet kerana ada video dan gambar yang membantu saya faham dengan lebih baik," kata Nur Aisyah, 11 tahun.

Guru-guru juga mendapati teknologi membantu mereka mengenal pasti pelajar yang memerlukan bantuan tambahan dengan lebih cepat melalui analisis data pembelajaran. Walau bagaimanapun, mereka menekankan pentingnya mengimbangi penggunaan teknologi dengan aktiviti pembelajaran tradisional.`,
      topic: "Teknologi",
      sourceUrl: null,
      wordCount: 142,
      crossCurricularConnections: [
        {
          subject: "Sains",
          topic: "Teknologi Maklumat dan Komunikasi",
          syllabusReference: "KSSM Sains Tahun 5: Unit 7.2",
          description: "Penggunaan teknologi digital dalam pembelajaran berkaitan dengan konsep peranti teknologi dan aplikasi dalam kehidupan seharian.",
          curriculum: "KSSM"
        },
        {
          subject: "Matematik",
          topic: "Data dan Statistik",
          syllabusReference: "KSSR Matematik Tahun 5: Modul 8.1",
          description: "Analisis data pembelajaran yang digunakan oleh guru melibatkan konsep pengumpulan, pemprosesan dan interpretasi data statistik.",
          curriculum: "KSSR"
        },
        {
          subject: "Pendidikan Sivik dan Kewarganegaraan",
          topic: "Tanggungjawab Warganegara Digital",
          syllabusReference: "KSSM PSV Tahun 5: Tema 4.3",
          description: "Penggunaan teknologi yang bertanggungjawab dan seimbang dalam konteks pembelajaran dan kehidupan.",
          curriculum: "KSSM"
        }
      ],
      availableLanguages: ["Bahasa Malaysia", "English", "中文", "தமிழ்"],
      createdAt: new Date("2025-11-06T10:00:00")
    };
    this.articles.set(article1.id, article1);
    
    // Reading levels for article 1
    const levels1 = [
      {
        id: "level-1-1",
        articleId: article1.id,
        level: 1,
        content: "Sekolah di Malaysia menggunakan teknologi untuk membantu pelajar belajar. Mereka gunakan tablet dan aplikasi. Pelajar boleh tengok video dan main permainan pembelajaran.\n\nRamai sekolah di bandar ada Internet yang laju. Guru boleh guna video untuk mengajar. Ini membuat pelajaran lebih menarik.\n\nNur Aisyah, seorang pelajar Tahun 5, suka belajar dengan tablet. Dia kata tablet ada gambar dan video yang membantu dia faham.\n\nGuru-guru guna teknologi untuk tahu pelajar mana yang perlukan bantuan. Tetapi mereka kata penting juga untuk belajar dengan cara biasa.",
        byline: "Dipermudahkan untuk pembaca muda"
      },
      {
        id: "level-1-2",
        articleId: article1.id,
        level: 2,
        content: "Sekolah-sekolah di Malaysia kini menggunakan banyak teknologi untuk membantu pelajar belajar. Mereka guna tablet, aplikasi pembelajaran, dan Internet. Cara belajar sudah berubah dengan teknologi digital.\n\nKementerian Pendidikan kata lebih daripada 80 peratus sekolah di bandar mempunyai Internet yang cepat. Guru boleh menggunakan video pendidikan dan permainan untuk mengajar. Ini membuat pelajaran lebih menarik.\n\nNur Aisyah, pelajar Tahun 5 dari Kuala Lumpur, menggunakan tablet untuk baca buku teks. Dia berkata, \"Saya suka belajar dengan tablet sebab ada video dan gambar yang membantu saya faham.\"\n\nGuru-guru juga mendapat manfaat. Mereka boleh tahu dengan cepat pelajar mana yang perlukan bantuan tambahan. Tetapi mereka tekankan kepentingan mengimbangi teknologi dengan cara pembelajaran tradisional.",
        byline: "Untuk pembaca sederhana"
      },
      {
        id: "level-1-3",
        articleId: article1.id,
        level: 3,
        content: article1.originalText,
        byline: "Tahap standard"
      },
      {
        id: "level-1-4",
        articleId: article1.id,
        level: 4,
        content: "Sekolah-sekolah di seluruh Malaysia kini mengintegrasikan teknologi digital secara meluas untuk mengoptimumkan proses pembelajaran. Daripada tablet kepada aplikasi pembelajaran interaktif, revolusi digital telah mentransformasi pendekatan pedagogi kontemporari.\n\nData Kementerian Pendidikan Malaysia menunjukkan bahawa lebih 80 peratus institusi pendidikan di kawasan metropolitan telah dilengkapi dengan infrastruktur Internet berkelajuan tinggi. Ini membolehkan pendidik mengaplikasikan pelbagai medium digital—video pendidikan, simulasi saintifik, dan gamifikasi pembelajaran—untuk memperkayakan pengalaman bilik darjah.\n\nPelajar Tahun 5 di Sekolah Kebangsaan Taman Desa, Kuala Lumpur, kini mengakses buku teks digital melalui tablet peribadi. Nur Aisyah, 11 tahun, berkongsi pengalamannya: \"Pembelajaran digital lebih engaging kerana kandungan multimedia memudahkan pemahaman konsep yang kompleks.\"\n\nPara pendidik juga memanfaatkan analitik pembelajaran untuk mengenal pasti pelajar yang memerlukan sokongan tambahan dengan lebih proaktif. Namun, mereka menekankan keperluan untuk mengekalkan keseimbangan antara kaedah digital dan pedagogi konvensional.",
        byline: "Untuk pembaca mahir"
      },
      {
        id: "level-1-5",
        articleId: article1.id,
        level: 5,
        content: "Institusi pendidikan di seluruh Malaysia sedang menyaksikan transformasi pedagogi yang signifikan melalui integrasi teknologi digital yang komprehensif. Daripada peranti mudah alih kepada aplikasi pembelajaran adaptif, ekosistem digital telah merevolusikan paradigma penyampaian ilmu kontemporari dan pendekatan andragogi moden.\n\nAnalisis data Kementerian Pendidikan Malaysia mendedahkan bahawa lebih 80 peratus institusi pendidikan di kawasan metropolitan telah dilengkapi dengan infrastruktur telekomunikasi berkelajuan tinggi. Kewujudan infrastruktur ini membolehkan pendidik mengintegrasikan pelbagai medium digital yang sofistikated—termasuk video pendidikan interaktif, simulasi saintifik immersive, dan platform gamifikasi pembelajaran—untuk memperkayakan pengalaman holistik dalam persekitaran pembelajaran.\n\nPelajar Tahun 5 di Sekolah Kebangsaan Taman Desa, ibu kota Kuala Lumpur, kini mengakses repositori buku teks digital melalui peranti tablet peribadi. Nur Aisyah, 11 tahun, menyatakan perspektifnya: \"Pembelajaran berbantukan teknologi menawarkan engagement yang superior kerana kandungan multimedia interaktif memfasilitasi pemahaman mendalam terhadap konsep akademik yang kompleks.\"\n\nPara pendidik turut memanfaatkan analitik pembelajaran berbasis data untuk mengidentifikasi dan memberikan intervensi pedagogi yang personalized kepada pelajar yang memerlukan sokongan akademik tambahan secara lebih proaktif. Walau bagaimanapun, mereka menekankan imperatif untuk mengekalkan ekuilibrium strategik antara metodologi digital dan pendekatan pedagogi konvensional yang telah terbukti berkesan.",
        byline: "Versi diperkaya untuk pembaca lanjutan"
      }
    ];
    
    levels1.forEach(level => this.readingLevels.set(level.id, level));
    
    // Quiz for article 1
    const quiz1: Quiz = {
      id: "quiz-1",
      articleId: article1.id,
      questions: [
        {
          question: "Berapa peratus sekolah di kawasan bandar yang mempunyai Internet berkelajuan tinggi?",
          options: ["60 peratus", "70 peratus", "80 peratus", "90 peratus"],
          correctAnswer: 2
        },
        {
          question: "Apakah nama pelajar yang disebut dalam artikel?",
          options: ["Siti Nurhaliza", "Nur Aisyah", "Fatimah", "Aisyah Humaira"],
          correctAnswer: 1
        },
        {
          question: "Mengapakah Nur Aisyah suka belajar dengan tablet?",
          options: [
            "Kerana lebih ringan dari buku",
            "Kerana boleh main permainan",
            "Kerana ada video dan gambar yang membantu faham",
            "Kerana lebih murah"
          ],
          correctAnswer: 2
        },
        {
          question: "Apakah manfaat teknologi untuk guru-guru?",
          options: [
            "Menjimatkan masa mengajar",
            "Mengenal pasti pelajar yang perlukan bantuan tambahan",
            "Mengurangkan kerja rumah",
            "Menambah gaji"
          ],
          correctAnswer: 1
        },
        {
          question: "Apakah yang ditekankan oleh guru tentang penggunaan teknologi?",
          options: [
            "Guna teknologi sahaja",
            "Elak guna teknologi",
            "Imbangkan teknologi dengan pembelajaran tradisional",
            "Guna teknologi hanya untuk permainan"
          ],
          correctAnswer: 2
        }
      ]
    };
    this.quizzes.set(quiz1.id, quiz1);
    
    // Write prompts for article 1
    const prompts1: WritePrompt = {
      id: "prompts-1",
      articleId: article1.id,
      prompts: [
        "Pada pendapat anda, apakah kelebihan dan kekurangan menggunakan tablet untuk belajar berbanding buku biasa?",
        "Bayangkan sekolah anda mendapat tablet untuk semua pelajar. Bagaimana anda akan menggunakannya untuk meningkatkan pembelajaran anda?",
        "Adakah anda bersetuju bahawa teknologi harus diimbangi dengan pembelajaran tradisional? Jelaskan sebab-sebab anda."
      ]
    };
    this.writePrompts.set(prompts1.id, prompts1);
    
    // Sample Article 2: Environment
    const article2: Article = {
      id: "sample-2",
      title: "Kempen Kitar Semula di Sekolah",
      originalText: `Pelajar-pelajar Tahun 5 dan 6 di Sekolah Kebangsaan Bukit Bintang telah memulakan projek kitar semula yang menarik perhatian seluruh komuniti sekolah. Projek ini bertujuan untuk mengurangkan sisa pepejal dan mendidik pelajar tentang kepentingan menjaga alam sekitar.

Projek ini bermula apabila guru Sains, Cikgu Azman, membawa pelajar melawat tapak pelupusan sampah. Pelajar terkejut melihat jumlah sampah yang besar dan memutuskan untuk mengambil tindakan. Mereka mula dengan meletakkan tong kitar semula berwarna di seluruh kawasan sekolah—biru untuk kertas, kuning untuk plastik, dan hijau untuk kaca.

"Pada minggu pertama, kami berjaya mengumpul 50 kilogram bahan kitar semula," kata Ketua Projek, Ahmad Faris. "Sekarang selepas dua bulan, kami kumpul hampir 200 kilogram setiap minggu!"

Pelajar juga mengajar adik-adik mereka cara mengasingkan sampah dengan betul. Mereka membuat poster dan video pendek untuk menyebarkan kesedaran. Pengetua sekolah, Puan Halimah, amat berbangga dengan usaha pelajar dan merancang untuk mengembangkan program ini ke sekolah-sekolah lain di daerah.`,
      topic: "Alam Sekitar",
      sourceUrl: null,
      wordCount: 168,
      crossCurricularConnections: [
        {
          subject: "Sains",
          topic: "Alam Sekitar dan Kitar Semula",
          syllabusReference: "KSSR Sains Tahun 5: Unit 5.3",
          description: "Konsep kitar semula dan kepentingan menjaga alam sekitar melalui amalan 3R (Reduce, Reuse, Recycle).",
          curriculum: "KSSR"
        },
        {
          subject: "Matematik",
          topic: "Pengurusan Data dan Graf",
          syllabusReference: "KSSR Matematik Tahun 5: Unit 6.2",
          description: "Mengukur dan merekod berat bahan kitar semula (50kg, 200kg) serta membuat perbandingan data mingguan.",
          curriculum: "KSSR"
        }
      ],
      availableLanguages: ["Bahasa Malaysia", "English"],
      createdAt: new Date("2025-11-05T14:30:00")
    };
    this.articles.set(article2.id, article2);
    
    // Add simpler reading levels for article 2
    const level2_3: ReadingLevel = {
      id: "level-2-3",
      articleId: article2.id,
      level: 3,
      content: article2.originalText,
      byline: "Tahap standard"
    };
    this.readingLevels.set(level2_3.id, level2_3);
  }

  // Article operations
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = randomUUID();
    const article: Article = { 
      id,
      title: insertArticle.title,
      originalText: insertArticle.originalText,
      topic: insertArticle.topic ?? null,
      sourceUrl: insertArticle.sourceUrl ?? null,
      wordCount: insertArticle.wordCount,
      // Cast as any because Zod/Drizzle inferred types for JSONB are not strictly compatible with the TS interface
      crossCurricularConnections: (insertArticle.crossCurricularConnections as any) ?? null,
      availableLanguages: (insertArticle.availableLanguages as any) ?? null,
      createdAt: new Date()
    };
    this.articles.set(id, article);
    return article;
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Reading level operations
  async createReadingLevel(insertLevel: InsertReadingLevel): Promise<ReadingLevel> {
    const id = randomUUID();
    const level: ReadingLevel = {
      id,
      articleId: insertLevel.articleId,
      level: insertLevel.level,
      content: insertLevel.content,
      byline: insertLevel.byline ?? null
    };
    this.readingLevels.set(id, level);
    return level;
  }

  async getReadingLevelsByArticle(articleId: string): Promise<ReadingLevel[]> {
    return Array.from(this.readingLevels.values())
      .filter(level => level.articleId === articleId)
      .sort((a, b) => a.level - b.level);
  }

  async getReadingLevel(articleId: string, level: number): Promise<ReadingLevel | undefined> {
    return Array.from(this.readingLevels.values())
      .find(rl => rl.articleId === articleId && rl.level === level);
  }

  // Quiz operations
  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = randomUUID();
    const quiz: Quiz = {
      id,
      articleId: insertQuiz.articleId,
      questions: insertQuiz.questions as any
    };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  async getQuizByArticle(articleId: string): Promise<Quiz | undefined> {
    return Array.from(this.quizzes.values())
      .find(quiz => quiz.articleId === articleId);
  }

  // Write prompt operations
  async createWritePrompts(insertPrompts: InsertWritePrompt): Promise<WritePrompt> {
    const id = randomUUID();
    const prompts: WritePrompt = {
      id,
      articleId: insertPrompts.articleId,
      prompts: insertPrompts.prompts as any
    };
    this.writePrompts.set(id, prompts);
    return prompts;
  }

  async getWritePromptsByArticle(articleId: string): Promise<WritePrompt | undefined> {
    return Array.from(this.writePrompts.values())
      .find(wp => wp.articleId === articleId);
  }
}

export class DatabaseStorage implements IStorage {
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db
      .insert(articles)
      .values({
        ...insertArticle,
        crossCurricularConnections: insertArticle.crossCurricularConnections as any,
        availableLanguages: insertArticle.availableLanguages as any
      })
      .returning();
    return article;
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async getAllArticles(): Promise<Article[]> {
    return await db.select().from(articles).orderBy(articles.createdAt);
  }

  async createReadingLevel(insertLevel: InsertReadingLevel): Promise<ReadingLevel> {
    const [level] = await db.insert(readingLevels).values(insertLevel).returning();
    return level;
  }

  async getReadingLevelsByArticle(articleId: string): Promise<ReadingLevel[]> {
    return await db
      .select()
      .from(readingLevels)
      .where(eq(readingLevels.articleId, articleId))
      .orderBy(readingLevels.level);
  }

  async getReadingLevel(articleId: string, level: number): Promise<ReadingLevel | undefined> {
    const [readingLevel] = await db
      .select()
      .from(readingLevels)
      .where(eq(readingLevels.articleId, articleId));
    // Note: Drizzle's eq doesn't support multiple conditions easily in one where without `and`, 
    // but since we pull by articleId, we can filter in memory or use proper and() if imported.
    // For simplicity, let's filter the array since there are only ~5 levels.
    const levels = await this.getReadingLevelsByArticle(articleId);
    return levels.find(l => l.level === level);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const [quiz] = await db
      .insert(quizzes)
      .values({
        ...insertQuiz,
        questions: insertQuiz.questions as any
      })
      .returning();
    return quiz;
  }

  async getQuizByArticle(articleId: string): Promise<Quiz | undefined> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.articleId, articleId));
    return quiz;
  }

  async createWritePrompts(insertPrompts: InsertWritePrompt): Promise<WritePrompt> {
    const [prompts] = await db
      .insert(writePrompts)
      .values({
        ...insertPrompts,
        prompts: insertPrompts.prompts as any
      })
      .returning();
    return prompts;
  }

  async getWritePromptsByArticle(articleId: string): Promise<WritePrompt | undefined> {
    const [prompts] = await db.select().from(writePrompts).where(eq(writePrompts.articleId, articleId));
    return prompts;
  }
}

// Check for either database URL variable
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
export const storage = databaseUrl ? new DatabaseStorage() : new MemStorage();