// types.ts
export interface Option {
    id: string;
    label: string;
}

export interface Parameters {
    multipleSelections: boolean;
    randomize: boolean;
    otherOption: boolean;
    minimumCharacters: boolean;
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
    ProgressiveGrid = "progressive grid",
}

export interface Logic {
    terminateIfSelectedOptionIds?: string[] ;
    terminateIfNotSelectedOptionIds?: string[] ;
}

export interface Question {
    id: string;
    questionText: string;
    type: QuestionType;
    options: Option[];
    parameters?: Parameters;
    subQuestions?: Question[];
    dynamicOptionsId?: string;
    selectedDynamicOptionIds?: string[];
    logic?: Logic;
}

export interface Survey {
    name: string;
    questions: Question[];
}

export interface Answer {
    questionId: string;
    optionIds: string[];
    value: string | number;
}

export interface Result {
    userId: string;
    answers: Answer[];
}
