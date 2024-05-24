"use client";
import React, { useState, useEffect, use } from "react";
import { Option, QuestionType, Result, Survey, Answer } from "@/app/types";
import MultipleChoiceInput from "./MultipleChoiceInput";
import OpenTextInput from "./OpenTextInput";
import RankingInput from "./RankingInput";
import OpinionScaleInput from "./OpinionScaleInput";
import ProgressiveGridInput from "./ProgressiveGridInput";
import useDeviceType from "@/app/hooks/useDeviceType";

interface QuestionProps {
    survey: Survey;
    questionIndex: number;
    setResults: React.Dispatch<React.SetStateAction<Result>>;
    results: Result;
    handleOptionChange: (
        questionId: string,
        selectedOptionIds: string[]
    ) => void;
    handleOpinionScaleChange: (questionId: string, value: number) => void;
    handleTextChange: (questionId: string, text: string) => void;
    handleRankingChange: (
        questionId: string,
        rankedOptionIds: string[]
    ) => void;
    handleNextQuestion: () => void;
}

const Question: React.FC<QuestionProps> = ({
    survey,
    questionIndex,
    setResults,
    results,
    handleOptionChange,
    handleOpinionScaleChange,
    handleTextChange,
    handleRankingChange,
    handleNextQuestion,
}) => {
    const [allPagesVisited, setAllPagesVisited] = useState(false);
    const [canProceed, setCanProceed] = useState(false);
    const deviceType = useDeviceType();
    const question = survey.questions[questionIndex];
    const answer: Answer = results.answers.find(
        (ans) => ans.questionId === question.id
    ) || { questionId: question.id, optionIds: [], value: "" };

    // useEffect(() => {
    //     if (
    //         question.type === QuestionType.ProgressiveGrid &&
    //         deviceType === "mobile"
    //     ) {
    //         console.log("ProgressiveGrid on mobile", );
    //         setAllPagesVisited(false);
    //     } else {
    //         setAllPagesVisited(true);
    //     }
    //     checkIfCanProceed();
    // }, [question.type, deviceType, questionIndex, results.answers]);

    const findDynamicOptions = (dynamicOptionsId: string): Option[] => {
        for (const q of survey.questions) {
            if (q.id === dynamicOptionsId) {
                const dynamicAnswer = results.answers.find(
                    (ans) => ans.questionId === dynamicOptionsId
                );
                if (dynamicAnswer) {
                    const filteredOptions = q.options.filter((option) =>
                        dynamicAnswer.optionIds.includes(option.id)
                    );
                    return filteredOptions;
                }
            }
            if (q.subQuestions) {
                for (const subQ of q.subQuestions) {
                    if (subQ.id === dynamicOptionsId) {
                        const dynamicAnswer = results.answers.find(
                            (ans) => ans.questionId === dynamicOptionsId
                        );
                        if (dynamicAnswer) {
                            const filteredOptions = q.options.filter((option) =>
                                dynamicAnswer.optionIds.includes(option.id)
                            );
                            return filteredOptions;
                        }
                    }
                }
            }
        }
        return [];
    };

    const options = question.dynamicOptionsId
        ? findDynamicOptions(question.dynamicOptionsId)
        : question.options;

    const handleProgressiveIndexChange = (index: number) => {
        if (
            question.subQuestions &&
            question.subQuestions.length - 1 === index
        ) {
            setAllPagesVisited(true);
        }
    };

    const handleNextQuestionClick = () => {
        handleNextQuestion();
        setAllPagesVisited(false);
        setCanProceed(false); // Reset canProceed state for the next question
    };

    const handleOptionChangeWithValidation = (
        questionId: string,
        selectedOptionIds: string[]
    ) => {
        handleOptionChange(questionId, selectedOptionIds);
    };

    useEffect(() => {
        checkIfCanProceed();
    }, [answer]);

    const checkIfCanProceed = () => {
        let canProceed = false;

        const checkAnswer = (answer: Answer) => {
            if (answer.optionIds.length > 0) {
                canProceed = true;
            }
        };

        checkAnswer(answer);

        if (question.subQuestions) {
            for (const subQuestion of question.subQuestions) {
                const subAnswer: Answer = results.answers.find(
                    (ans) => ans.questionId === subQuestion.id
                ) || { questionId: subQuestion.id, optionIds: [], value: "" };
                checkAnswer(subAnswer);
            }
        }

        setCanProceed(canProceed);
    };

    useEffect(() => {
        console.log("allPagesVisited, canProceed", allPagesVisited, canProceed);
    }, [allPagesVisited, canProceed]);

    return (
        <div
            style={{
                maxWidth: "70rem",
                marginTop: "2rem",
            }}
        >
            <h3
                style={{
                    fontSize: "1.6rem",
                    fontWeight: 500,
                    marginBottom: "4rem",
                }}
            >
                {questionIndex + 1 + ". " + question.questionText}
            </h3>
            {question.type === QuestionType.MultipleChoice && (
                <MultipleChoiceInput
                    question={question}
                    answer={answer}
                    questionIndex={questionIndex}
                    handleOptionChange={handleOptionChangeWithValidation}
                    options={options}
                />
            )}
            {question.type === QuestionType.Text && (
                <OpenTextInput
                    question={question}
                    answer={answer}
                    questionIndex={questionIndex}
                    handleTextChange={handleTextChange}
                />
            )}
            {question.type === QuestionType.Ranking && (
                <RankingInput
                    question={question}
                    answer={answer}
                    handleRankingChange={handleRankingChange}
                />
            )}
            {question.type === QuestionType.OpinionScale && (
                <OpinionScaleInput
                    question={question}
                    answer={answer}
                    handleOpinionScaleChange={handleOpinionScaleChange}
                />
            )}
            {question.type === QuestionType.ProgressiveGrid && (
                <ProgressiveGridInput
                    question={question}
                    answers={results.answers}
                    handleOptionChange={handleOptionChangeWithValidation}
                    options={options}
                    setAllPagesVisited={setAllPagesVisited}
                    questionIndex={questionIndex}
                />
            )}

            {(question.type !== QuestionType.ProgressiveGrid ||
                deviceType !== "mobile" ||
                allPagesVisited) &&
                canProceed && (
                    <button
                        style={{
                            position: "fixed",
                            bottom: "2rem",
                            right: "2rem",
                            padding: "1rem 1.6rem",
                            color: "#7047EB",
                            border: "1px solid #7047EB",
                            borderRadius: "4px",
                            cursor: "pointer",
                            background: "#E4E1FF",
                            fontSize: "1.2rem",
                        }}
                        type="button"
                        onClick={handleNextQuestionClick}
                    >
                        Continue
                    </button>
                )}
        </div>
    );
};

export default Question;
