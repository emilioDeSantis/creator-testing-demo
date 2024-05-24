"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchSurvey, submitResults } from "@/app/firebaseUtils";
import { Result, Survey, Option, Answer, Question } from "@/app/types";
import QuestionComponent from "@/app/take-survey/[surveyId]/components/Question";
import Completed from "@/app/take-survey/[surveyId]/components/Completed";
import Terminated from "./components/Terminated";
import Image from "next/image";

const TakeSurvey: React.FC<{ params: { surveyId: string } }> = ({ params }) => {
    const [survey, setSurvey] = useState<Survey>({ name: "", questions: [] });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState<Result>({ userId: "", answers: [] });
    const [completed, setCompleted] = useState(false);
    const router = useRouter();
    const [terminated, setTerminated] = useState(false);

    const terminate = () => {
        setTerminated(true);
    };

    useEffect(() => {
        const loadSurvey = async () => {
            const fetchedSurvey = await fetchSurvey(params.surveyId);
            if (fetchedSurvey) {
                setSurvey(fetchedSurvey);
            }
        };
        loadSurvey();
    }, [params.surveyId]);

    useEffect(() => {
        console.log("results", results);
    }, [results]);

    const checkTerminationLogic = (question: Question) => {
        const currentAnswer = results.answers.find(
            (answer) => answer.questionId === question.id
        );

        if (question.logic?.terminateIfSelectedOptionIds) {
            for (const optionId of question.logic
                .terminateIfSelectedOptionIds) {
                if (currentAnswer?.optionIds.includes(optionId)) {
                    return true;
                }
            }
        }

        if (question.logic?.terminateIfNotSelectedOptionIds) {
            for (const optionId of question.logic
                .terminateIfNotSelectedOptionIds) {
                if (!currentAnswer?.optionIds.includes(optionId)) {
                    return true;
                }
            }
        }

        if (question.subQuestions) {
            for (const subQuestion of question.subQuestions) {
                const subAnswer = results.answers.find(
                    (answer) => answer.questionId === subQuestion.id
                );

                if (subQuestion.logic?.terminateIfSelectedOptionIds) {
                    for (const optionId of subQuestion.logic
                        .terminateIfSelectedOptionIds) {
                        if (subAnswer?.optionIds.includes(optionId)) {
                            return true;
                        }
                    }
                }

                if (subQuestion.logic?.terminateIfNotSelectedOptionIds) {
                    for (const optionId of subQuestion.logic
                        .terminateIfNotSelectedOptionIds) {
                        if (!subAnswer?.optionIds.includes(optionId)) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    };

    const handleNextQuestion = async () => {
        const currentQuestion = survey.questions[currentQuestionIndex];
        if (checkTerminationLogic(currentQuestion)) {
            terminate();
        } else {
            if (currentQuestionIndex < survey.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                await submitResults(params.surveyId, results);
                setCompleted(true);
            }
        }
    };

    const handleOptionChange = (
        questionId: string,
        selectedOptionIds: string[]
    ) => {
        const currentAnswer = results.answers.find(
            (answer) => answer.questionId === questionId
        );

        if (currentAnswer) {
            const updatedAnswer: Answer = {
                ...currentAnswer,
                optionIds: selectedOptionIds,
            };

            setResults({
                ...results,
                answers: results.answers.map((answer) =>
                    answer.questionId === questionId ? updatedAnswer : answer
                ),
            });
        } else {
            setResults({
                ...results,
                answers: [
                    ...results.answers,
                    {
                        questionId: questionId,
                        optionIds: selectedOptionIds,
                        value: "",
                    },
                ],
            });
        }
    };

    const handleTextChange = (questionId: string, text: string) => {
        const currentAnswer = results.answers.find(
            (answer) => answer.questionId === questionId
        );

        if (currentAnswer) {
            const updatedAnswer: Answer = {
                ...currentAnswer,
                value: text,
            };

            setResults({
                ...results,
                answers: results.answers.map((answer) =>
                    answer.questionId === questionId ? updatedAnswer : answer
                ),
            });
        } else {
            setResults({
                ...results,
                answers: [
                    ...results.answers,
                    {
                        questionId: questionId,
                        optionIds: [],
                        value: text,
                    },
                ],
            });
        }
    };

    const handleRankingChange = (
        questionId: string,
        rankedOptionIds: string[]
    ) => {
        const currentAnswer = results.answers.find(
            (answer) => answer.questionId === questionId
        );

        if (currentAnswer) {
            const updatedAnswer: Answer = {
                ...currentAnswer,
                optionIds: rankedOptionIds,
            };

            setResults({
                ...results,
                answers: results.answers.map((answer) =>
                    answer.questionId === questionId ? updatedAnswer : answer
                ),
            });
        } else {
            setResults({
                ...results,
                answers: [
                    ...results.answers,
                    {
                        questionId: questionId,
                        optionIds: rankedOptionIds,
                        value: "",
                    },
                ],
            });
        }
    };

    const handleOpinionScaleChange = (questionId: string, value: number) => {
        const currentAnswer = results.answers.find(
            (answer) => answer.questionId === questionId
        );

        if (currentAnswer) {
            const updatedAnswer: Answer = {
                ...currentAnswer,
                value: value.toString(),
            };

            setResults({
                ...results,
                answers: results.answers.map((answer) =>
                    answer.questionId === questionId ? updatedAnswer : answer
                ),
            });
        } else {
            setResults({
                ...results,
                answers: [
                    ...results.answers,
                    {
                        questionId: questionId,
                        optionIds: [],
                        value: value.toString(),
                    },
                ],
            });
        }
    };

    if (!survey.questions.length) {
        return <div>Loading...</div>;
    }

    if (terminated) {
        return <Terminated />;
    }

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                paddingBottom: "2rem",
            }}
        >
            <div style={{
                height: "5rem",
            }}/>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                    borderBottom: "1px solid #eee",
                    paddingInline: "1rem",
                    paddingBlock: "0.6rem",
                    fontSize: "0.9rem",
                    position: "fixed",
                    background: "#fff",
                    zIndex: 1000,
                }}
            >
                <div
                    style={{
                        width: "12rem",
                        height: "3rem",
                        position: "relative",
                    }}
                >
                    <Image
                        fill
                        src={`/creator-testing-logo.png`}
                        alt={"image"}
                        sizes="100vw"
                        priority
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
            </div>

            {/* <div
                style={{
                    width: "100%",
                    marginBlock: "1.2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <h1
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        width: "26rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBlock: "1.2rem",
                        borderBottom: "1px solid #eee",
                        paddingInline: "1rem",
                    }}
                >
                    {survey.name}
                </h1>
            </div> */}
            {!completed && (
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        paddingInline: "1rem",
                    }}
                >
                    <QuestionComponent
                        survey={survey}
                        questionIndex={currentQuestionIndex}
                        setResults={setResults}
                        results={results}
                        handleOptionChange={handleOptionChange}
                        handleTextChange={handleTextChange}
                        handleRankingChange={handleRankingChange}
                        handleOpinionScaleChange={handleOpinionScaleChange}
                        handleNextQuestion={handleNextQuestion}
                        // dynamicOptions={dynamicOptions}
                    />
                </form>
            )}
            {completed && <Completed />}
        </main>
    );
};

export default TakeSurvey;
