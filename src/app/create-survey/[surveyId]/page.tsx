"use client";
import React, { useState, useEffect } from "react";
import NewQuestion from "./components/NewQuestion";
import QuestionEditor from "./components/QuestionEditor";
import PublishButton from "./components/PublishButton";
import { doc, getDoc, setDoc } from "firebase/firestore";
import firestore from "../../../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import QuestionsList from "./components/QuestionsList";
import QuestionPannel from "./components/QuestionPannel";
import { Option, Parameters, Question, QuestionType, Survey } from "../../types";
import HeavyHitterButton from "../../components/HeavyHitterButton";
import { fetchSurvey, updateSurvey } from "@/app/firebaseUtils";
import { getAllQuestions } from "@/app/utils";

const CreateSurvey: React.FC<{ params: { surveyId: string } }> = ({ params }) => {
    const [survey, setSurvey] = useState<Survey>({
        name: "Untitled",
        questions: [],
    });
    const [focusedQuestionId, setFocusedQuestionId] = useState<string | null>(null);
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

    const setSurveyTitle = (title: string) => {
        setSurvey((prevSurvey) => ({ ...prevSurvey, name: title }));
    };

    const addQuestion = (question: Omit<Question, "id" | "type" | "parameters" | "options">) => {
        const newQuestion: Question = {
            ...question,
            id: uuidv4(),
            type: QuestionType.MultipleChoice,
            options: [{ id: uuidv4(), label: "" }],
            parameters: {
                multipleSelections: false,
                randomize: false,
                otherOption: false,
                minimumCharacters: false,
                maximumCharacters: false,
                minimumCharactersValue: 50,
                maximumCharactersValue: 200,
                minimumRatingValue: "",
                middleRatingValue: "",
                maximumRatingValue: "",
            },
        };
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: [...prevSurvey.questions, newQuestion],
        }));
        setFocusedQuestionId(newQuestion.id);
    };

    const updateQuestion = (id: string, updatedQuestion: Partial<Question>) => {
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((q) =>
                q.id === id ? { ...q, ...updatedQuestion } : q
            ),
        }));
        setFocusedQuestionId(id);
    };

    const removeQuestion = (id: string) => {
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.filter((q) => q.id !== id),
        }));
    };

    const addOptionToQuestion = (questionId: string, option: Omit<Option, "id">) => {
        const newOption: Option = { ...option, id: uuidv4() };
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((q) =>
                q.id === questionId ? { ...q, options: [...q.options, newOption] } : q
            ),
        }));
        setFocusedQuestionId(questionId);
    };

    const updateOptionInQuestion = (questionId: string, optionId: string, label: string) => {
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((q) =>
                q.id === questionId
                    ? {
                          ...q,
                          options: q.options.map((o) => (o.id === optionId ? { ...o, label } : o)),
                      }
                    : q
            ),
        }));
        setFocusedQuestionId(questionId);
    };

    const removeOptionFromQuestion = (questionId: string, optionId: string) => {
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((q) =>
                q.id === questionId
                    ? {
                          ...q,
                          options: q.options.filter((o) => o.id !== optionId),
                      }
                    : q
            ),
        }));
        setFocusedQuestionId(questionId);
    };

    const updateQuestionType = (id: string, type: QuestionType) => {
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((q) => (q.id === id ? { ...q, type } : q)),
        }));
    };

    const toggleParameter = (id: string, parameter: keyof Parameters) => {
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((q) =>
                q.id === id && q.parameters
                    ? {
                          ...q,
                          parameters: {
                              ...q.parameters,
                              [parameter]: !q.parameters[parameter],
                          },
                      }
                    : q
            ),
        }));
    };

    const updateParameterValue = (
        id: string,
        parameter: keyof Parameters,
        value: number | string | boolean
    ) => {
        setSurvey((prevSurvey) => ({
            ...prevSurvey,
            questions: prevSurvey.questions.map((q) =>
                q.id === id && q.parameters
                    ? {
                          ...q,
                          parameters: { ...q.parameters, [parameter]: value },
                      }
                    : q
            ),
        }));
    };

    const publish = async () => {
        try {
            const formattedSurvey = {
                ...survey,
                questions: survey.questions
                    .filter((question) => question.questionText !== "")
                    .map((question) => ({
                        ...question,
                        options: question.options.filter((option) => option.label !== ""),
                    })),
            };
            const success = await updateSurvey(params.surveyId, formattedSurvey);
            if (success) {
                router.push("/");
            } else {
                alert("Error updating document. Check the console for more information.");
            }
        } catch (error) {
            console.error("Error updating document:", error);
            alert("Error updating document. Check the console for more information.");
        }
    };

    const allQuestions = getAllQuestions(survey.questions);

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                paddingBottom: "1rem",
                paddingTop: "4rem",
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
                    Create your survey
                </h1>
                <div
                    style={{
                        position: "absolute",
                        right: "1.2rem",
                    }}
                >
                    <HeavyHitterButton onClick={publish} text="Publish" />
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "center",
                    width: "100%",
                    flexGrow: 1,
                    paddingInline: "1.2rem",
                    gap: "1.6rem",
                    overflow: "hidden",
                }}
            >
                <QuestionsList
                    questions={survey.questions}
                    addQuestion={addQuestion}
                    focusedQuestionId={focusedQuestionId}
                    setFocusedQuestionId={setFocusedQuestionId}
                    removeQuestion={removeQuestion}
                />
                <div
                    style={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        paddingTop: "1rem",
                        overflowY: "auto",
                        paddingBottom: "2rem",
                        height: "100%",
                        paddingInline: "6rem",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "4rem",
                        }}
                    >
                        <input
                            style={{
                                paddingBlock: "0.6rem",
                                borderBottom: "1px solid #ddd",
                                fontSize: "1.2rem",
                                marginBottom: "1rem",
                                textAlign: "center",
                                width: "100%",
                            }}
                            type="text"
                            placeholder="Name your survey"
                            value={survey.name}
                            onChange={(e) => setSurveyTitle(e.target.value)}
                        />
                    </div>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        {survey.questions.map((question, index) => (
                            <QuestionEditor
                                key={index}
                                index={index}
                                question={question}
                                updateQuestion={updateQuestion}
                                addOptionToQuestion={addOptionToQuestion}
                                updateOptionInQuestion={updateOptionInQuestion}
                                removeOptionFromQuestion={removeOptionFromQuestion}
                                setFocusedQuestionId={setFocusedQuestionId}
                                focused={focusedQuestionId === question.id}
                                allQuestions={allQuestions}
                                survey={survey}
                            />
                        ))}
                        <button
                            style={{
                                padding: "0.8rem 1.6rem",
                                color: "#7047EB",
                                border: "1px solid #7047EB",
                                borderRadius: "4px",
                                cursor: "pointer",
                                background: "transparent",
                            }}
                            onClick={() => {
                                addQuestion({ questionText: "" });
                            }}
                        >
                            Add question +
                        </button>
                    </div>
                </div>
                <QuestionPannel
                    survey={survey}
                    focusedQuestionId={focusedQuestionId}
                    updateQuestionType={updateQuestionType}
                    toggleParameter={toggleParameter}
                    updateParameterValue={updateParameterValue}
                    index={survey.questions.findIndex((question) => question.id === focusedQuestionId)}
                />
            </div>
        </main>
    );
};

export default CreateSurvey;
