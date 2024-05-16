// components/QuestionsList.tsx
import React, { useState } from "react";
import HeavyHitterButton from "@/app/take-survey/[surveyId]/components/HeavyHitterButton";
import { Question, QuestionType } from "@/app/types";
import QuestionsListItem from "./QuestionsListItem";

interface QuestionsListProps {
    questions: Question[];
    addQuestion: (question: Omit<Question, "id"| "type" | "options" | "parameters">) => void;
    removeQuestion: (id: string) => void;
    focusedQuestionId: string | null;
    setFocusedQuestionId: (id: string) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
    questions,
    addQuestion,
    removeQuestion,
    focusedQuestionId,
    setFocusedQuestionId,
}) => {

    const handleFocus = (id: string) => {
        setFocusedQuestionId(id);
    };

    return (
        <div
            className="border"
            style={{
                width: "26rem",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                paddingBlock: "1rem",
            }}
        >
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingInline: "1rem",
                }}
            >
                <h2>Questions</h2>
                <HeavyHitterButton
                    text="Add Question +"
                    onClick={() => {
                        addQuestion({
                            question: "",
                        });
                    }}
                />
            </div>
            {questions.map((question, index) => (
                <QuestionsListItem
                    key={question.id}
                    question={question}
                    index={index}
                    removeQuestion={removeQuestion}
                    focusedQuestionId={focusedQuestionId}
                    setFocusedQuestionId={setFocusedQuestionId}
                />
            ))}
        </div>
    );
};

export default QuestionsList;
