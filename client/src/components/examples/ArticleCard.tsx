import ArticleCard from '../ArticleCard';

export default function ArticleCardExample() {
  return (
    <div className="w-80">
      <ArticleCard
        id="1"
        title="Penemuan Baharu di Perpustakaan Sekolah"
        excerpt="Pelajar-pelajar sekolah rendah mendapati buku-buku lama yang menarik di perpustakaan sekolah mereka..."
        level={3}
        topic="Pendidikan"
        date="5 Nov 2025"
        wordCount={450}
      />
    </div>
  );
}