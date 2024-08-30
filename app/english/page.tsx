import { Separator } from "@/components/ui/separator";
import { EnglishLevels } from "@/app/english/english-level";

export default function EnglishPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">English Quiz</h2>
        <p className="text-muted-foreground">
          Explore fun ways to learn letters, words, and sentences!
        </p>
      </div>
      <Separator />
      <EnglishLevels />
    </div>
  );
}
