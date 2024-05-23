// utils.ts
import { Question } from "@/app/types";

export const getAllQuestions = (questions: Question[]): Question[] => {
    let allQuestions: Question[] = [];
    // console.log("questions: ", questions);


    const traverseQuestions = (questionList: Question[]) => {
        questionList.forEach((question) => {
            allQuestions.push(question);
            if (question.subQuestions && question.subQuestions.length > 0) {
                traverseQuestions(question.subQuestions);
            }
        });
    };


    traverseQuestions(questions);
    // console.log("allQuestions: ", allQuestions);
    return allQuestions;
};

// globalFunctions.ts
export const terminate = () => {
    alert("TERMINATED!!!");
};




