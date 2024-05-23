"use client";
import React, { useEffect, useState } from "react";
import { Option, Question, Answer } from "@/app/types";
import useDeviceType from "@/app/hooks/useDeviceType";
import { shuffleArray } from "./MultipleChoiceInput";

interface ProgressiveGridInputProps {
    question: Question;
    answers: Answer[];
    handleOptionChange: (
        questionId: string,
        selectedOptionIds: string[]
    ) => void;
    options: Option[];
}

const ProgressiveGridInput: React.FC<ProgressiveGridInputProps> = ({
    question,
    answers,
    handleOptionChange,
    options,
}) => {
    const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
    const deviceType = useDeviceType();
    const [currentIndex, setCurrentIndex] = useState(0);

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
        setCurrentIndex(0); // Reset the current index when question or options change
    }, [question, options]);

    const subQuestions = question.subQuestions || [];
    const moreItemsOnXAxis = shuffledOptions.length > subQuestions.length;

    const handleCheckboxChange = (subQuestionId: string, optionId: string) => {
        const subAnswer = answers.find(
            (ans) => ans.questionId === subQuestionId
        ) || { questionId: subQuestionId, optionIds: [], value: "" };

        let updatedOptionIds: string[];

        if (question.parameters?.multipleSelections) {
            if (subAnswer.optionIds.includes(optionId)) {
                updatedOptionIds = subAnswer.optionIds.filter(
                    (id) => id !== optionId
                );
            } else {
                updatedOptionIds = [...subAnswer.optionIds, optionId];
            }
        } else {
            updatedOptionIds = subAnswer.optionIds.includes(optionId)
                ? []
                : [optionId];
        }

        handleOptionChange(subQuestionId, updatedOptionIds);
    };

    const handleNext = () => {
        if (
            currentIndex <
            (moreItemsOnXAxis ? subQuestions.length : shuffledOptions.length) -
                1
        ) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    if (deviceType === "mobile") {
        return (
            <div style={{ marginTop: "2rem", padding: "0 1rem" }}>
                {moreItemsOnXAxis ? (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            gap: "1rem",
                            maxWidth: "400px",
                            margin: "0 auto",
                        }}
                    >
                        <div></div>
                        <div style={{ fontWeight: 400 }}>
                            {subQuestions[currentIndex]?.questionText}
                        </div>
                        {shuffledOptions.map((option) => (
                            <React.Fragment key={option.id}>
                                <div style={{ fontWeight: 400 }}>
                                    {option.label}
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={
                                            answers
                                                .find(
                                                    (ans) =>
                                                        ans.questionId ===
                                                        subQuestions[
                                                            currentIndex
                                                        ].id
                                                )
                                                ?.optionIds.includes(
                                                    option.id
                                                ) || false
                                        }
                                        onChange={() =>
                                            handleCheckboxChange(
                                                subQuestions[currentIndex].id,
                                                option.id
                                            )
                                        }
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                        <div
                            style={{
                                gridColumn: "span 2",
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                            }}
                        >
                            <button
                                type="button"
                                onClick={handlePrevious}
                                style={{
                                    visibility:
                                        currentIndex > 0 ? "visible" : "hidden",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#7047EB",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                }}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                style={{
                                    visibility:
                                        subQuestions &&
                                        currentIndex < subQuestions.length - 1
                                            ? "visible"
                                            : "hidden",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#7047EB",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            gap: "1rem",
                            maxWidth: "400px",
                            margin: "0 auto",
                        }}
                    >
                        <div />
                        <div style={{ fontWeight: 400 }}>
                            {shuffledOptions[currentIndex]?.label}
                        </div>
                        {subQuestions.map((subQuestion) => (
                            <React.Fragment key={subQuestion.id}>
                                <div style={{ fontWeight: 400 }}>
                                    {subQuestion.questionText}
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={
                                            answers
                                                .find(
                                                    (ans) =>
                                                        ans.questionId ===
                                                        subQuestion.id
                                                )
                                                ?.optionIds.includes(
                                                    shuffledOptions[
                                                        currentIndex
                                                    ].id
                                                ) || false
                                        }
                                        onChange={() =>
                                            handleCheckboxChange(
                                                subQuestion.id,
                                                shuffledOptions[currentIndex].id
                                            )
                                        }
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                        <div
                            style={{
                                gridColumn: "span 2",
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1rem",
                            }}
                        >
                            <button
                                type="button"
                                onClick={handlePrevious}
                                style={{
                                    visibility:
                                        currentIndex > 0 ? "visible" : "hidden",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#7047EB",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                }}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                style={{
                                    visibility:
                                        currentIndex <
                                        shuffledOptions.length - 1
                                            ? "visible"
                                            : "hidden",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#7047EB",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: moreItemsOnXAxis
                    ? `repeat(${subQuestions.length + 1}, auto)`
                    : `repeat(${shuffledOptions.length + 1}, auto)`,
                gridTemplateRows: moreItemsOnXAxis
                    ? `repeat(${shuffledOptions.length + 1}, auto)`
                    : `repeat(${subQuestions.length + 1}, auto)`,
                gap: "1.2rem",
                marginTop: "2rem",
            }}
        >
            <div></div>
            {moreItemsOnXAxis ? (
                <>
                    {subQuestions.map((subQuestion) => (
                        <div key={subQuestion.id} style={{ fontWeight: 400 }}>
                            {subQuestion.questionText}
                        </div>
                    ))}
                    {shuffledOptions.map((option) => (
                        <React.Fragment key={option.id}>
                            <div style={{ fontWeight: 400 }}>
                                {option.label}
                            </div>
                            {subQuestions.map((subQuestion) => {
                                const subAnswer = answers.find(
                                    (ans) => ans.questionId === subQuestion.id
                                ) || {
                                    questionId: subQuestion.id,
                                    optionIds: [],
                                    value: "",
                                };

                                return (
                                    <div key={subQuestion.id}>
                                        <input
                                            type="checkbox"
                                            checked={subAnswer.optionIds.includes(
                                                option.id
                                            )}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    subQuestion.id,
                                                    option.id
                                                )
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </>
            ) : (
                <>
                    {shuffledOptions.map((option) => (
                        <div key={option.id} style={{ fontWeight: 400 }}>
                            {option.label}
                        </div>
                    ))}
                    {subQuestions.map((subQuestion) => (
                        <React.Fragment key={subQuestion.id}>
                            <div style={{ fontWeight: 400 }}>
                                {subQuestion.questionText}
                            </div>
                            {shuffledOptions.map((option) => {
                                const subAnswer = answers.find(
                                    (ans) => ans.questionId === subQuestion.id
                                ) || {
                                    questionId: subQuestion.id,
                                    optionIds: [],
                                    value: "",
                                };

                                return (
                                    <div key={option.id}>
                                        <input
                                            type="checkbox"
                                            checked={subAnswer.optionIds.includes(
                                                option.id
                                            )}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    subQuestion.id,
                                                    option.id
                                                )
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </>
            )}
        </div>
    );
};

export default ProgressiveGridInput;
