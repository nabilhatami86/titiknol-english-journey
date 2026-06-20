"use client";

export const ListeningTOEFL = () => {
  return (
    <div className="min-h-w">
      <h1>Listening</h1>
    </div>
  );
};
import ToeflListeningPractice from "@/components/practice/toefl-listening/ToeflListeningPractice";
import { TOEFL_SAMPLES } from "@/data/toefl-listening/toeflListeningSamples";

export default function ToeflListeningPage() {
  return <ToeflListeningPractice samples={TOEFL_SAMPLES} />;
}
