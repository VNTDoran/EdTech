export interface Question {
  id?: number;
  questionTitle: string;
  option1: string;
  option2: string;
  option3: string;
  rightAnswer?: string;
  category?: string;
}

export interface QuestionRequest {
  questionTitle: string;
  option1: string;
  option2: string;
  option3: string;
  rightAnswer?: string;
  category?: string;
}

export interface QuestionResponse{
  id: number;
  response: string;
}

