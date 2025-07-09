import { useQuery } from "@tanstack/react-query";
import type { GetQuestionsResponse } from "./types/get-questions-response";


export function useRoomsQuestions(id: string) {
    return useQuery({
        queryKey: ["get-question", id],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3333/rooms/${id}/questions`);
            const result: GetQuestionsResponse = await response.json();
            return result;
        },
    });
}