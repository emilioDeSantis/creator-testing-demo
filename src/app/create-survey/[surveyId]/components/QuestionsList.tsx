// components/QuestionsList.tsx
import React, { useState } from "react";
import { Question, QuestionType } from "@/app/types";
import QuestionsListItem from "./QuestionsListItem";
import HeavyHitterButton from "@/app/components/HeavyHitterButton";

interface QuestionsListProps {
    questions: Question[];
    addQuestion: (
        question: Omit<Question, "id" | "type" | "options" | "parameters">
    ) => void;
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
                width: "18rem",
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
                <h2
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                    }}
                >
                    Questions
                </h2>
                <HeavyHitterButton
                    text="Add question +"
                    onClick={() => {
                        addQuestion({
                            question: "",
                        });
                    }}
                />
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "0.5rem",
                paddingBlock: "1rem",
                overflowY: "auto",
            }}>
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
        </div>
    );
};

export default QuestionsList;
