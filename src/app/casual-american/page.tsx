import CasualAmericanList from "@/components/vocab/CasualAmericanList";
import commandUSAvocab, { CommandUSAVocab } from "@/data/commandUSAvocab";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Casual American Alternatives",
  description: "Common casual American alternatives and what they imply",
};

export default function Page() {
  const items: CommandUSAVocab[] = commandUSAvocab;

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-(--text) flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          Casual American Alternatives
        </h1>
        <p className="text-sm text-(--text-secondary) mt-1">
          Browse common casual American expressions ({items.length} items)
        </p>
      </div>

      {/* Grid list */}
      <CasualAmericanList items={items} />
    </div>
  );
}
