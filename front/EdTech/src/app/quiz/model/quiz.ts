export interface Quiz {
    id: number;
    title: string;
    category: string;
    numQuestions: number;
}

export interface QuizRequest {
    title: string,
    numQuestions: number;
    category: string;
}
