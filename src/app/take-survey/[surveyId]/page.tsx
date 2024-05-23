"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchSurvey, submitResults } from "@/app/firebaseUtils";
import { Result, Survey, Option, Answer, Question } from "@/app/types";
import QuestionComponent from "@/app/take-survey/[surveyId]/components/Question";
import Completed from "@/app/take-survey/[surveyId]/components/Completed";
import { terminate } from "@/app/utils";

const TakeSurvey: React.FC<{ params: { surveyId: string } }> = ({ params }) => {
    const [survey, setSurvey] = useState<Survey>({ name: "", questions: [] });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState<Result>({ userId: "", answers: [] });
    const [completed, setCompleted] = useState(false);
    const router = useRouter();

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
            for (const optionId of question.logic.terminateIfSelectedOptionIds) {
                if (currentAnswer?.optionIds.includes(optionId)) {
                    return true;
                }
            }
        }

        if (question.logic?.terminateIfNotSelectedOptionIds) {
            for (const optionId of question.logic.terminateIfNotSelectedOptionIds) {
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
                    for (const optionId of subQuestion.logic.terminateIfSelectedOptionIds) {
                        if (subAnswer?.optionIds.includes(optionId)) {
                            return true;
                        }
                    }
                }

                if (subQuestion.logic?.terminateIfNotSelectedOptionIds) {
                    for (const optionId of subQuestion.logic.terminateIfNotSelectedOptionIds) {
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

    const handleOptionChange = (questionId: string, selectedOptionIds: string[]) => {
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

    const handleRankingChange = (questionId: string, rankedOptionIds: string[]) => {
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
            <div
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
                    }}
                >
                    {survey.name}
                </h1>
            </div>
            {!completed && (
                <form 
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    paddingInline: "1rem",
                
                }}>
                    <QuestionComponent
                        survey={survey}
                        questionIndex={currentQuestionIndex}
                        setResults={setResults}
                        results={results}
                        handleOptionChange={handleOptionChange}
                        handleTextChange={handleTextChange}
                        handleRankingChange={handleRankingChange}
                        handleOpinionScaleChange={handleOpinionScaleChange}
                        // dynamicOptions={dynamicOptions}
                    />
                    <button
                        style={{
                            padding: "1rem 1.6rem",
                            color: "#7047EB",
                            border: "1px solid #7047EB",
                            borderRadius: "4px",
                            cursor: "pointer",
                            background: "transparent",
                            fontSize: "1.2rem",
                            marginTop: "3rem",
                        }}
                        type="button"
                        onClick={handleNextQuestion}
                    >
                        Continue
                    </button>
                </form>
            )}
            {completed && <Completed />}
        </main>
    );
};

export default TakeSurvey;
