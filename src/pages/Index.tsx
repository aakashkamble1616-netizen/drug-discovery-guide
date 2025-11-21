import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const mockResponses: Record<string, string> = {
    "ace inhibitors": "ACE (Angiotensin-Converting Enzyme) inhibitors are a class of medications primarily used to treat hypertension and heart failure. They work by blocking the angiotensin-converting enzyme, which converts angiotensin I to angiotensin II—a potent vasoconstrictor.\n\nMechanism of Action:\n• Block ACE enzyme activity\n• Reduce angiotensin II production\n• Decrease aldosterone secretion\n• Result in vasodilation and reduced blood pressure\n• Decrease sodium and water retention\n\nCommon examples include enalapril, lisinopril, and ramipril. They are generally well-tolerated but may cause side effects like dry cough and hyperkalemia.",
    
    "drug development": "Drug discovery and development is a complex, multi-stage process typically taking 10-15 years:\n\n1. Drug Discovery (3-6 years)\n   • Target identification and validation\n   • Lead compound identification\n   • Lead optimization\n\n2. Preclinical Development (1-2 years)\n   • In vitro studies\n   • Animal testing for safety and efficacy\n   • Pharmacokinetics and toxicology\n\n3. Clinical Trials (6-7 years)\n   • Phase I: Safety in healthy volunteers (20-80 subjects)\n   • Phase II: Efficacy and side effects (100-300 patients)\n   • Phase III: Large-scale testing (1,000-3,000 patients)\n\n4. Regulatory Review (1-2 years)\n   • FDA/EMA submission and approval\n\n5. Post-Market Surveillance (Phase IV)\n   • Long-term safety monitoring\n\nOnly about 1 in 5,000 compounds makes it to market, with costs exceeding $2.6 billion per approved drug.",
    
    "drug targets": "Here are key databases for finding potential drug targets:\n\n**Primary Databases:**\n• DrugBank - Comprehensive drug and target information\n• ChEMBL - Bioactive molecules with drug-like properties\n• PubChem - Chemical structures and biological activities\n• ZINC - Commercially available compounds for virtual screening\n\n**Protein & Genomic Databases:**\n• UniProt - Protein sequences and functional information\n• Protein Data Bank (PDB) - 3D protein structures\n• GenBank - Genetic sequence database\n\n**Clinical & Therapeutic:**\n• ClinicalTrials.gov - Clinical trial information\n• Therapeutic Target Database (TTD) - Known targets and drugs\n• Open Targets - Target-disease associations\n\n**Literature & Patents:**\n• PubMed - Biomedical literature\n• Google Patents - Patent information\n• SciFinder - Chemical literature\n\nMany of these are free and publicly accessible. For comprehensive research, I recommend using multiple databases in combination."
  };

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("ace inhibitor")) {
      return mockResponses["ace inhibitors"];
    } else if (lowerMessage.includes("drug development") || lowerMessage.includes("discovery")) {
      return mockResponses["drug development"];
    } else if (lowerMessage.includes("database") || lowerMessage.includes("drug target")) {
      return mockResponses["drug targets"];
    }
    
    return "Thank you for your question about pharmaceutical research. I'm a demonstration chatbot showing the interface design. To provide accurate, evidence-based responses about drug discovery, I would need to be connected to a knowledge base or AI model.\n\nI can help with topics including:\n• Drug mechanisms of action\n• Pharmaceutical development processes\n• Research methodologies\n• Drug classes and therapeutic uses\n• Target identification and validation\n\nPlease feel free to ask about any of these areas!";
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: getResponse(content),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <span className="text-xl">💊</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">PharmAssist</h1>
            <p className="text-xs text-muted-foreground">Drug Discovery Research Assistant</p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        {messages.length === 0 ? (
          <WelcomeScreen onPromptClick={handlePromptClick} />
        ) : (
          <div className="mx-auto max-w-4xl">
            {messages.map((message, index) => (
              <ChatMessage key={index} role={message.role} content={message.content} />
            ))}
            {isLoading && (
              <div className="flex gap-4 p-6 bg-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  💊
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium text-foreground">PharmAssist</p>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;
