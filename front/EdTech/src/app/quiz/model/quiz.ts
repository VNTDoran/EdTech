export interface Quiz {
    id: number;
    title: string;
    category: string;
    duration: number;
    numQuestions: number;
}

export interface QuizRequest {
    title: string,
    numQuestions: number;
    duration: number;
    category: string;
}


export interface QuizWrapper {
    id: number;
    title: string;
    category: string;
    duration: number;
    numQuestions: number;
    score?: number
}
