import QuizQuestion from '../QuizQuestion';

export default function QuizQuestionExample() {
  return (
    <div className="max-w-2xl">
      <QuizQuestion
        questionNumber={1}
        totalQuestions={5}
        question="Apakah yang ditemui oleh pelajar di perpustakaan?"
        options={[
          "Buku-buku baru",
          "Buku-buku lama yang menarik",
          "Komputer baru",
          "Meja belajar baru"
        ]}
        correctAnswer={1}
        onNext={() => console.log('Moving to next question')}
      />
    </div>
  );
}