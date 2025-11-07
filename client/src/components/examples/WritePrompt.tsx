import WritePrompt from '../WritePrompt';

export default function WritePromptExample() {
  return (
    <div className="max-w-2xl">
      <WritePrompt
        prompt="Terangkan satu peristiwa daripada teks. Mengapa peristiwa ini berlaku?"
        aiGenerated={true}
        onRefresh={() => console.log('Refresh prompt clicked')}
      />
    </div>
  );
}