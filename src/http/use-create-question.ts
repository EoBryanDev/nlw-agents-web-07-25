import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateQuestRequest } from './types/create-question-request';
import type { CreateQuestionResponse } from './types/create-question-response';
import type { GetQuestionsResponse } from './types/get-questions-response';

export function useCreateQuestion(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateQuestRequest) => {
            const response = await fetch(
                `http://localhost:3333/rooms/${id}/questions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            const result: CreateQuestionResponse = await response.json();

            return result;
        },

        onMutate: ({ question }) => {
            const questions = queryClient.getQueryData<GetQuestionsResponse>([
                'get-question', id
            ])

            const questionsArray = questions ?? [];

            const newQuestion = {
                id: crypto.randomUUID(),
                questions: question,
                answer: null,
                createdAt: new Date().toISOString(),
                isGeneratingAnswer: true
            }

            queryClient.setQueryData<GetQuestionsResponse>(
                ['get-question', id],
                [newQuestion, ...questionsArray]

            )

            return { newQuestion, questions }
        },
        onSuccess: (data, _variables, context) => {
            queryClient.setQueryData<GetQuestionsResponse>(
                ['get-question', id],
                (questions) => {
                    if (!questions) {
                        return questions
                    }

                    if (!context.newQuestion) {
                        return questions
                    }


                    return questions.map((question) => {
                        if (question.id === context.newQuestion.id) {
                            return { ...context.newQuestion, id: data.questionId, answer: data.answer, isGeneratingAnswer: false }
                        }
                        return question
                    })

                }

            )
        },

        onError: (_error, _variables, context) => {

            if (context?.questions) {
                queryClient.setQueryData<GetQuestionsResponse>(
                    ['get-question', id],
                    context.questions

                )
            }

        }
    });
}
