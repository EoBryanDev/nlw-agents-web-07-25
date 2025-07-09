import { useRoomsQuestions } from "@/http/use-room-questions";
import { QuestionItem } from "./question-item";

interface QuestionListProps {
  id: string;
}

export function QuestionList({ id }: QuestionListProps) {
  const { data } = useRoomsQuestions(id);
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold text-2xl text-foreground'>
          Questions & Answers
        </h2>
      </div>

      {data?.map((question) => {
        return <QuestionItem key={question.id} questions={question} />;
      })}
    </div>
  );
}
