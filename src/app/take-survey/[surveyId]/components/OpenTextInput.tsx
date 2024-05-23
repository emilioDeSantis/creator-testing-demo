// components/OpenTextInput.tsx
"use client";
import React from "react";
import { Answer, Question } from "@/app/types";

interface OpenTextInputProps {
    question: Question;
    answer: Answer;
    questionIndex: number;
    handleTextChange: (questionId: string, text: string) => void;
}

const OpenTextInput: React.FC<OpenTextInputProps> = ({
    question,
    answer,
    questionIndex,
    handleTextChange,
}) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: "1rem",
                gap: "0.5rem",
                paddingInline: "2rem",
            }}
        >
            <textarea
                name={`question-${questionIndex}`}
                value={answer ? answer.value : ""}
                onChange={(e) => handleTextChange(question.id, e.target.value)}
                style={{
                    width: "100%",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    borderColor: "#ccc",
                    borderRadius: "4px",
                }}
                placeholder="Type your response here"
            />
        </div>
    );
};

export default OpenTextInput;
