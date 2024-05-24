"use client";
import React, { useEffect, useState } from "react";
import { Option, Answer, Question } from "@/app/types";

interface MultipleChoiceInputProps {
    question: Question;
    answer: Answer;
    questionIndex: number;
    handleOptionChange: (
        questionId: string,
        selectedOptionIds: string[],
    ) => void;
    options: Option[];
}

export const shuffleArray = (array: Option[]): Option[] => {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

const MultipleChoiceInput: React.FC<MultipleChoiceInputProps> = ({
    question,
    answer,
    questionIndex,
    handleOptionChange,
    options,
}) => {
    const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);

    useEffect(() => {
        let filteredOptions = options;
        if (question.dynamicOptionsId) {
            filteredOptions = options.filter((option) =>
                question.selectedDynamicOptionIds?.includes(option.id)
            );
        }
        if (question.parameters?.randomize) {
            setShuffledOptions(shuffleArray(filteredOptions));
        } else {
            setShuffledOptions(filteredOptions);
        }
    }, [question, options]);

    const handleCheckboxChange = (optionId: string) => {
        let updatedOptionIds: string[];

        if (question.parameters?.multipleSelections) {
            if (answer.optionIds.includes(optionId)) {
                updatedOptionIds = answer.optionIds.filter(
                    (id) => id !== optionId
                );
            } else {
                updatedOptionIds = [...answer.optionIds, optionId];
            }
        } else {
            updatedOptionIds = [optionId];
        }

        handleOptionChange(question.id, updatedOptionIds,);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: "1rem",
                gap: "1.6rem",
                paddingInline: "2rem",
            }}
        >
            {shuffledOptions.map((option) => (
                <div
                    key={option.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <input
                        type="checkbox"
                        name={`question-${questionIndex}`}
                        value={option.label}
                        checked={answer?.optionIds.includes(option.id) || false}
                        onChange={() => handleCheckboxChange(option.id)}
                        style={{ 
                            cursor: "pointer",
                            minHeight: "1.2rem",
                            minWidth: "1.2rem",

                         }}
                    />
                    <label style={{
                        opacity:0.6,
                    }}>{option.label}</label>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoiceInput;
