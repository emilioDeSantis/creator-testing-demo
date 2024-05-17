// components/MultipleChoiceInput.tsx
"use client";
import React from "react";
import { Option } from "@/app/types";

interface MultipleChoiceInputProps {
    questionIndex: number;
    options: Option[];
    currentAnswerId: string | string[];
    handleOptionChange: (selectedOption: string) => void;
}

const MultipleChoiceInput: React.FC<MultipleChoiceInputProps> = ({
    questionIndex,
    options,
    currentAnswerId,
    handleOptionChange,
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
            {options.map((option) => (
                <div
                    key={option.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={option.label}
                        checked={currentAnswer === option.label}
                        onChange={() => handleOptionChange(option.label)}
                    />
                    <label>{option.label}</label>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoiceInput;
