// components/Question.tsx
"use client";
import React from "react";
import { Option, QuestionType, Results, Survey } from "@/app/types";
// import MultipleChoiceInput from "./MultipleChoiceInput";

interface QuestionProps {
    survey: Survey;
    questionIndex: number;
    setResults: React.Dispatch<React.SetStateAction<Results>>;
    results: Results;
}

const Question: React.FC<QuestionProps> = ({
    survey,
    questionIndex,
    setResults,
    results,
}) => {

    const handleOptionChange = (selectedOption: string) => {
        const existingAnswerIndex = results.answers.findIndex(
            (answer) => answer.questionId === survey.questions[questionIndex].id
        );

        if (existingAnswerIndex !== -1) {
            const updatedAnswers = [...results.answers];
            updatedAnswers[existingAnswerIndex].value = selectedOption;
            setResults({ answers: updatedAnswers });
        } else {
            setResults({
                answers: [
                    ...results.answers,
                    {
                        questionId: survey.questions[questionIndex].id,
                        value: selectedOption,
                    },
                ],
            });
        }
    };

    return (
        <div style={{ width: "50rem", marginTop: "2rem" }}>
            <h3 style={{ fontSize: "1.6rem", fontWeight: 500 }}>
                {questionIndex + 1 + ". " + survey.questions[questionIndex].question}
            </h3>
            {/* {survey.questions[questionIndex].type === QuestionType.MultipleChoice && (
                <MultipleChoiceInput
                    options={survey.questions[questionIndex].options}
                    currentOptionId={results.answers.find((answer) => answer.questionId === survey.questions[questionIndex].id)?.value || ""}
                    handleOptionChange={handleOptionChange}
                />
            )} */}
        </div>
    );
};

export default Question;

