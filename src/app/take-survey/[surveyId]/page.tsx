// pages/surveys/[surveyId].tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchSurvey, submitResults } from "@/app/firebaseUtils";
import { Results, Survey } from "@/app/types";
import Question from "@/app/take-survey/[surveyId]/components/Question";
import Completed from "@/app/take-survey/[surveyId]/components/Completed";

const TakeSurvey: React.FC<{ params: { surveyId: string } }> = ({ params }) => {
    const [survey, setSurvey] = useState<Survey>({ name: "", questions: [] });
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState<Results>({ answers: [] });
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

    const handleNextQuestion = async () => {
        if (currentQuestionIndex < survey.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            await submitResults(params.surveyId, results);
            setCompleted(true);
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
                height: "100vh",
                paddingBottom: "2rem",
                marginTop: "4rem",
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
                <form>
                    <Question
                        survey={survey}
                        questionIndex={currentQuestionIndex}
                        setResults={setResults}
                        results={results}
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
