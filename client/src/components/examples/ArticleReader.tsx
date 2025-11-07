import ArticleReader from '../ArticleReader';

export default function ArticleReaderExample() {
  const sampleContent = `Perpustakaan Sekolah Rendah Bandar Putra telah menjadi tempat yang lebih menarik sejak kebelakangan ini. Pelajar-pelajar Tahun 5 menemui koleksi buku lama yang tersimpan di sudut perpustakaan.

Buku-buku itu termasuk cerita rakyat Malaysia, kisah sejarah, dan ensiklopedia yang ditulis puluhan tahun yang lalu. "Kami sangat teruja kerana buku-buku ini mempunyai gambar dan maklumat yang menarik," kata Sarah, seorang pelajar.

Cikgu Aminah, pustakawan sekolah, berkata bahawa buku-buku tersebut akan dibersihkan dan dipamerkan untuk semua pelajar. "Ini adalah khazanah sekolah kita," katanya.`;

  return (
    <ArticleReader
      title="Penemuan Baharu di Perpustakaan Sekolah"
      byline="Oleh Nurul Aina"
      level={3}
      wordCount={450}
      content={sampleContent}
      date="5 November 2025"
    />
  );
}