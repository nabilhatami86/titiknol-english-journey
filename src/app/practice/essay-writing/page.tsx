import { EssayWriting } from '@/components/practice/writing/EssayWriting';

export default function Page() {
  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-(--text) mb-1">Guided Essay Writing</h1>
      <p className="text-(--text-muted) mb-6 text-sm">
        Choose a topic, write each section step by step, and get AI feedback based on essay structure criteria.
      </p>
      <EssayWriting />
    </div>
  );
}
