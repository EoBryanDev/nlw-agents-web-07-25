import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateQuestRequest } from './types/create-question-request';
import type { CreateQuestionResponse } from './types/create-question-response';

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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['get-question', id],
            });
        },
    });
}
