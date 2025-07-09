import { ArrowLeft, Radio } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { QuestionForm } from "@/components/question-form";
import { QuestionItem } from "@/components/question-item";
import { Button } from "@/components/ui/button";

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.id) {
    return <Navigate replace to='/' />;
  }

  return (
    <div className='min-h-screen bg-zinc-950'>
      <div className='container mx-auto max-w-4xl px-4 py-8'>
        <div className='mb-8'>
          <div className='mb-4 flex items-center justify-between'>
            <Link to='/'>
              <Button variant='outline'>
                <ArrowLeft className='mr-2 size-4' />
                Back to Home
              </Button>
            </Link>
            <Link to={`/room/${params.id}/audio`}>
              <Button className='flex items-center gap-2' variant='secondary'>
                <Radio className='size-4' />
                Record Audio
              </Button>
            </Link>
          </div>
          <h1 className='mb-2 font-bold text-3xl text-foreground'>
            Question's Room
          </h1>
          <p className='text-muted-foreground'>
            Room to start making questions and received AI answers
          </p>
        </div>

        <div className='mb-8'>
          <QuestionForm roomId={params.id} />
        </div>

        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='font-semibold text-2xl text-foreground'>
              Questions & Answers
            </h2>
          </div>

          <QuestionItem
            question={{
              id: "1",
              question: "Question 1",
              createdAt: new Date().toISOString(),
            }}
          />

          <QuestionItem
            question={{
              id: "1",
              question: "Question 2",
              answer: "Answer 2",
              createdAt: new Date().toISOString(),
            }}
          />
        </div>
      </div>
    </div>
  );
}
