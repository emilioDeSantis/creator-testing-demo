"use client";
import React, { use, useEffect, useState } from "react";
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
    // onProgressiveIndexChange: (index: number) => void;
    setAllPagesVisited: (value: boolean) => void;
    questionIndex: number;
}

const ProgressiveGridInput: React.FC<ProgressiveGridInputProps> = ({
    question,
    answers,
    handleOptionChange,
    options,
    // onProgressiveIndexChange,
    setAllPagesVisited,
    questionIndex,
}) => {
    const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
    const deviceType = useDeviceType();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log("currentIndex", currentIndex);
    }   , [currentIndex]);

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
        console.log("set to 0");
        console.log("question", question);// Inform parent component of the reset
    }, [question, options]);

    useEffect(() => {
        setCurrentIndex(0); // Reset the current index when question or options change
        onProgressiveIndexChange(0); 
    },[questionIndex]);

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
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            onProgressiveIndexChange(newIndex);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            onProgressiveIndexChange(newIndex);
        }
    };

    const onProgressiveIndexChange = (index: number) => {
        if (moreItemsOnXAxis) {
            if (subQuestions && subQuestions.length - 1 === index) {
                setAllPagesVisited(true);
            }
        } else {
            if (shuffledOptions && shuffledOptions.length - 1 === index) {
                setAllPagesVisited(true);
            }
        }
    };

    if (deviceType === "mobile") {
        return (
            <div style={{ marginTop: "2rem", padding: "0 1rem" }}>
                {moreItemsOnXAxis ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "-2rem",
                            marginBottom: "2rem",
                        }}
                    >
                        <button
                            type="button"
                            onClick={handlePrevious}
                            style={{
                                visibility:
                                    currentIndex > 0 ? "visible" : "hidden",
                                padding: "0.5rem",
                                backgroundColor: "#7047EB",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                width: "6rem",
                            }}
                        >
                            Previous
                        </button>

                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >
                            {`${currentIndex + 1} of ${subQuestions.length}`}
                        </div>
                        <button
                            type="button"
                            onClick={handleNext}
                            style={{
                                visibility:
                                    subQuestions &&
                                    currentIndex < subQuestions.length - 1
                                        ? "visible"
                                        : "hidden",
                                padding: "0.5rem",
                                backgroundColor: "#7047EB",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                width: "6rem",
                            }}
                        >
                            Next
                        </button>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "-2rem",
                            marginBottom: "2rem",
                        }}
                    >
                        <button
                            type="button"
                            onClick={handlePrevious}
                            style={{
                                visibility:
                                    currentIndex > 0 ? "visible" : "hidden",
                                padding: "0.5rem",
                                backgroundColor: "#7047EB",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                width: "6rem",
                            }}
                        >
                            Previous
                        </button>

                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >
                            {`${currentIndex + 1} of ${shuffledOptions.length}`}
                        </div>
                        <button
                            type="button"
                            onClick={handleNext}
                            style={{
                                visibility:
                                    subQuestions &&
                                    currentIndex < shuffledOptions.length - 1
                                        ? "visible"
                                        : "hidden",
                                padding: "0.5rem",
                                backgroundColor: "#7047EB",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                width: "6rem",
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
                {moreItemsOnXAxis ? (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                            maxWidth: "400px",
                            margin: "0 auto",
                        }}
                    >
                        <div></div>
                        <div
                            style={{
                                fontWeight: 400,
                                opacity: 0.6,
                                textAlign: "center",
                            }}
                        >
                            {subQuestions[currentIndex]?.questionText}
                        </div>
                        {shuffledOptions.map((option, index) => (
                            <React.Fragment key={option.id}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: 400,
                                            opacity: 0.6,
                                            textAlign: "center",
                                        }}
                                    >
                                        {option.label}
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
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
                                        style={{
                                            borderRadius: "50%",
                                            width: "1.2rem",
                                            height: "1.2rem",
                                        }}
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                            maxWidth: "400px",
                            margin: "0 auto",
                        }}
                    >
                        <div />
                        <div
                            style={{
                                fontWeight: 400,
                                opacity: 0.6,
                                textAlign: "center",
                            }}
                        >
                            {shuffledOptions[currentIndex]?.label}
                        </div>
                        {subQuestions.map((subQuestion) => (
                            <React.Fragment key={subQuestion.id}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: 400,
                                            opacity: 0.6,
                                        }}
                                    >
                                        {subQuestion.questionText}
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
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
                                        style={{
                                            borderRadius: "50%",
                                            width: "1.2rem",
                                            height: "1.2rem",
                                        }}
                                    />
                                </div>
                            </React.Fragment>
                        ))}
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
                    {subQuestions.map((subQuestion, index) => (
                        <div
                            key={subQuestion.id}
                            style={{
                                fontWeight: 400,
                                opacity: 0.6,
                                textAlign: "center",
                            }}
                        >
                            {`${subQuestion.questionText}`}
                        </div>
                    ))}
                    {shuffledOptions.map((option) => (
                        <React.Fragment key={option.id}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: 400,
                                        opacity: 0.6,
                                        textAlign: "center",
                                    }}
                                >
                                    {option.label}
                                </div>
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
                                    <div
                                        key={subQuestion.id}
                                        style={{ textAlign: "center" }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={subAnswer.optionIds.includes(
                                                option.id
                                            )}
                                            style={{
                                                borderRadius: "50%",
                                                width: "1.2rem",
                                                height: "1.2rem",
                                            }}
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
                    {shuffledOptions.map((option, index) => (
                        <div
                            key={option.id}
                            style={{ fontWeight: 400, textAlign: "center" }}
                        >
                            {`${option.label}`}
                        </div>
                    ))}
                    {subQuestions.map((subQuestion) => (
                        <React.Fragment key={subQuestion.id}>
                            <div style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}>
                                    <div
                                        style={{
                                            fontWeight: 400,
                                            opacity: 0.6,
                                            textAlign: "center",
                                        }}
                                    >
                                        {subQuestion.questionText}
                                    </div>
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
                                    <div
                                        key={option.id}
                                        style={{ textAlign: "center" }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={subAnswer.optionIds.includes(
                                                option.id
                                            )}
                                            style={{
                                                borderRadius: "50%",
                                                width: "1.2rem",
                                                height: "1.2rem",
                                            }}
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
