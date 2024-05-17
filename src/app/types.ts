// types.ts
export interface Option {
    id: string;
    label: string;
}

export interface Parameters {
    multipleSelections: boolean;
    randomize: boolean;
    otherOption: boolean;
    mininmumCharacters: boolean;
    maximumCharacters: boolean;
    minimumCharactersValue: number;
    maximumCharactersValue: number;
    minimumRatingValue: string;
    middleRatingValue: string;
    maximumRatingValue: string;
}

export enum QuestionType {
    MultipleChoice = "multiple choice",
    Text = "text",
    OpinionScale = "opinion scale",
    Ranking = "ranking",
    // Add more question types here if needed
}

export interface Question {
    id: string;
    question: string;
    type: QuestionType;
    options: Option[];
    parameters: Parameters;
}

export interface Survey {
    name: string;
    questions: Question[];
}

export interface answer {
    questionId: string;
    value: string | string[] | number;
}

export interface Results {
    answers: answer[];
}