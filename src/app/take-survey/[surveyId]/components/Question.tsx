"use client";
import React from "react";

interface QuestionProps {
    survey: any;
    questionIndex: number;
    setAnswers: React.Dispatch<React.SetStateAction<any>>;
    answers: any;
}

const Question: React.FC<QuestionProps> = ({
    survey,
    questionIndex,
    setAnswers,
    answers,
}) => {
    // Retrieve the current answer for this question, or set it to null if not yet answered
    const currentAnswer =
        answers.find(
            (answer: any) =>
                answer.question === survey.questions[questionIndex].question
        )?.answer || "";

    const handleOptionChange = (selectedOption: string) => {
        // Check if the question already has an answer in the state
        const existingAnswerIndex = answers.findIndex(
            (answer: any) =>
                answer.question === survey.questions[questionIndex].question
        );
        if (existingAnswerIndex !== -1) {
            // Update existing answer
            const updatedAnswers = [...answers];
            updatedAnswers[existingAnswerIndex].answer = selectedOption;
            setAnswers(updatedAnswers);
        } else {
            // Add new answer to the state
            setAnswers([
                ...answers,
                {
                    question: survey.questions[questionIndex].question,
                    answer: selectedOption,
                },
            ]);
        }
    };

    return (
        <div
            style={{
                width: "50rem",
                marginTop: "2rem",
            }}
        >
            <h3
                style={{
                    fontSize: "1.6rem",
                    fontWeight: 500,
                }}
            >
                {questionIndex +
                    1 +
                    ". " +
                    survey.questions[questionIndex].question}
            </h3>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: "1rem",
                gap: "0.5rem",
                paddingInline: "2rem",
            }}>
                {survey.questions[questionIndex].options.map(
                    (option: string, optionIndex: number) => (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }} key={optionIndex}>
                            <input
                            style={{
                            
                            }}
                                type="radio"
                                name={`question-${questionIndex}`}
                                value={option}
                                checked={currentAnswer === option}
                                onChange={() => handleOptionChange(option)}
                            />
                            <label>{option}</label>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Question;
