import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

interface QuizQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  correctAnswer: number;
  onNext?: () => void;
}

export default function QuizQuestion({
  questionNumber,
  totalQuestions,
  question,
  options,
  correctAnswer,
  onNext
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      console.log('Answer submitted:', selectedAnswer);
      setIsSubmitted(true);
    }
  };

  const isCorrect = isSubmitted && parseInt(selectedAnswer || '-1') === correctAnswer;
  const isWrong = isSubmitted && parseInt(selectedAnswer || '-1') !== correctAnswer;

  return (
    <Card data-testid={`card-question-${questionNumber}`}>
      <CardHeader>
        <div className="mb-2 text-sm text-muted-foreground">
          Soalan {questionNumber} daripada {totalQuestions}
        </div>
        <CardTitle className="text-xl">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup 
          value={selectedAnswer || undefined} 
          onValueChange={setSelectedAnswer}
          disabled={isSubmitted}
        >
          {options.map((option, index) => {
            const isThisCorrect = index === correctAnswer;
            const isThisSelected = parseInt(selectedAnswer || '-1') === index;
            
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-3 rounded-md border p-4 hover-elevate",
                  isSubmitted && isThisCorrect && "border-green-500 bg-green-50 dark:bg-green-950/20",
                  isSubmitted && isThisSelected && !isThisCorrect && "border-red-500 bg-red-50 dark:bg-red-950/20"
                )}
                data-testid={`option-${questionNumber}-${index}`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer text-base"
                >
                  {option}
                </Label>
                {isSubmitted && isThisCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
                {isSubmitted && isThisSelected && !isThisCorrect && (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
            );
          })}
        </RadioGroup>

        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full"
            data-testid={`button-submit-${questionNumber}`}
          >
            Hantar Jawapan
          </Button>
        ) : (
          <div className="space-y-3">
            {isCorrect && (
              <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-green-700 dark:bg-green-950/20 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Betul! Tahniah!</span>
              </div>
            )}
            {isWrong && (
              <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-red-700 dark:bg-red-950/20 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Tidak betul. Cuba lagi!</span>
              </div>
            )}
            {onNext && questionNumber < totalQuestions && (
              <Button
                onClick={() => {
                  console.log('Next question');
                  onNext();
                }}
                className="w-full"
                data-testid={`button-next-${questionNumber}`}
              >
                Soalan Seterusnya
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}