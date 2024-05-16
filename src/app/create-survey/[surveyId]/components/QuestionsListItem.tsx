// components/QuestionListItem.tsx
import React from "react";
import { Question } from "@/app/types";

interface QuestionsListItemProps {
    question: Question;
    index: number;
    removeQuestion: (id: string) => void;
    focusedQuestionId: string | null;
    setFocusedQuestionId: (id: string) => void;
}

const QuestionsListItem: React.FC<QuestionsListItemProps> = ({
    question,
    index,
    removeQuestion,
    focusedQuestionId,
    setFocusedQuestionId,
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
                backgroundColor: question.id == focusedQuestionId ? "#f0f0f0" : "white",
                border: question.id == focusedQuestionId  ? "1px solid black" : "none",
            }}
            onClick={() => setFocusedQuestionId(question.id)}
        >
            <span>
                {index + 1}.{" "}
                {question.question.length > 20
                    ? `${question.question.substring(0, 20)}...`
                    : question.question}
            </span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    removeQuestion(question.id);
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default QuestionsListItem;
