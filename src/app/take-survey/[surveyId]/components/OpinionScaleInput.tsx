"use client";
import React from "react";
import { Question, Answer } from "@/app/types";

interface OpinionScaleInputProps {
    question: Question;
    answer: Answer;
    handleOpinionScaleChange: (questionId: string, value: number) => void;
}

const OpinionScaleInput: React.FC<OpinionScaleInputProps> = ({
    question,
    answer,
    handleOpinionScaleChange,
}) => {
    const currentAnswer = answer ? answer.value : null;

    const handleChange = (value: number) => {
        handleOpinionScaleChange(question.id, value);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingInline: "2rem",
                marginTop: "1rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                }}
            >
                {Array.from({ length: 11 }).map((_, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "2rem",
                            height: "2rem",
                            backgroundColor: currentAnswer === index ? "#7047EB" : "#fff",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleChange(index)}
                    >
                        {index}
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingInline: "1rem",
                }}
            >
                <div>{question.parameters?.minimumRatingValue}</div>
                <div>{question.parameters?.middleRatingValue}</div>
                <div>{question.parameters?.maximumRatingValue}</div>
            </div>
        </div>
    );
};

export default OpinionScaleInput;
