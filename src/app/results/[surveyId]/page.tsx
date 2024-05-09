"use client";
import { doc, collection, getDoc, getDocs, DocumentData, QuerySnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import firestore from "../../../../firebaseConfig";

interface Question {
    question: string;
    options: string[];
}

interface Survey {
    questions: Question[];
    name: string;
}

interface SurveyResult {
    answers: { answer: string }[];
}

interface OptionCount {
    option: string;
    count: number;
}

interface HistogramData {
    question: string;
    options: OptionCount[];
}

interface TakeSurveyProps {
    params: { surveyId: string };
}

const Results: React.FC<TakeSurveyProps> = ({ params }) => {
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [results, setResults] = useState<SurveyResult[]>([]);
    const [histogramData, setHistogramData] = useState<HistogramData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the survey data
                const docRef = doc(firestore, "surveys", params.surveyId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const surveyData = docSnap.data() as Survey;
                    setSurvey(surveyData);

                    // Fetch the survey results data
                    const resultsCollectionRef = collection(docRef, "results");
                    const resultsSnapshot = await getDocs(resultsCollectionRef);
                    const resultsData = resultsSnapshot.docs.map(
                        (doc) => doc.data() as SurveyResult
                    );

                    setResults(resultsData);
                    computeHistogram(resultsData, surveyData.questions);
                } else {
                    console.log("No such survey document!");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [params.surveyId]);

    // Compute histogram data
    const computeHistogram = (results: SurveyResult[], questions: Question[]) => {
        const answerCounts: HistogramData[] = questions.map((question) => ({
            question: question.question,
            options: question.options.map((option) => ({
                option,
                count: 0,
            })),
        }));

        results.forEach((result) => {
            result.answers.forEach((answer, index) => {
                const optionIndex = answerCounts[index].options.findIndex(
                    (opt) => opt.option === answer.answer
                );

                if (optionIndex !== -1) {
                    answerCounts[index].options[optionIndex].count += 1;
                }
            });
        });

        setHistogramData(answerCounts);
    };

    if (!survey) {
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

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    padding: "1rem",
                    gap: "3rem",
                }}
            >
                {histogramData.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            width: "60vw",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "1.4rem",
                                fontWeight: 400,
                                marginTop: "1rem",
                                marginInline: "1.6rem",
                            }}
                        >
                            {index + 1 + ". " + item.question}
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.6rem",
                                marginInline: "5rem",
                                marginBottom: "2rem",
                                marginTop: "3rem",
                            }}
                        >
                            {item.options.map((opt) => (
                                <div
                                    key={opt.option}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        gap: "0.6rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div>{opt.option}</div>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "1.6rem",
                                                fontSize: "0.8rem",
                                                opacity: 0.6,
                                            }}
                                        >
                                            <div>
                                                {opt.count === 1 ? "1 response" : `${opt.count} responses`}
                                            </div>
                                            <div>
                                                {Math.round((opt.count / results.length) * 100) + "%"}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            height: "1.2rem",
                                            backgroundColor: "#e5e5e5",
                                            borderRadius: "2px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: `${(opt.count / results.length) * 100}%`,
                                                backgroundColor: "#A259FF",
                                                height: "100%",
                                                borderRadius: "2px",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Results;
