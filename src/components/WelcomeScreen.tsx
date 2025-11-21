import { Card } from "@/components/ui/card";
import { Pill, Microscope, BookOpen } from "lucide-react";

const examplePrompts = [
  {
    icon: Pill,
    title: "Explain ACE inhibitors",
    prompt: "Explain the mechanism of action of ACE inhibitors.",
  },
  {
    icon: Microscope,
    title: "Drug development stages",
    prompt: "What are the stages of drug discovery and development?",
  },
  {
    icon: BookOpen,
    title: "Research databases",
    prompt: "Suggest databases to find potential drug targets.",
  },
];

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

export const WelcomeScreen = ({ onPromptClick }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
        <Pill className="h-10 w-10 text-white" />
      </div>
      
      <h1 className="mb-3 text-4xl font-bold text-foreground text-center">
        PharmAssist
      </h1>
      
      <p className="mb-12 max-w-2xl text-center text-lg text-muted-foreground">
        Your intelligent companion for drug discovery and pharmaceutical research.
        Ask questions about drug mechanisms, development processes, and research methods.
      </p>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
        {examplePrompts.map((example, index) => {
          const Icon = example.icon;
          return (
            <Card
              key={index}
              className="group cursor-pointer border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              onClick={() => onPromptClick(example.prompt)}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{example.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {example.prompt}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 max-w-2xl rounded-lg border border-border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground text-center">
          <span className="font-semibold text-foreground">Note:</span> This chatbot provides educational information for research purposes only and does not prescribe medications or provide medical advice.
        </p>
      </div>
    </div>
  );
};
