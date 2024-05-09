"use client";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import firestore from "../../../../firebaseConfig";
import Question from "./components/Question";
import Completed from "./components/Completed";

const TakeSurvey: React.FC<{ params: { surveyId: string } }> = ({ params }) => {
    const [survey, setSurvey] = useState<any>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any>([]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        console.log(answers);
    }, [answers]);

    useEffect(() => {
        // Fetch survey data
        const fetchData = async () => {
            try {
                // Fetch survey data from Firestore
                const docRef = doc(firestore, "surveys", params.surveyId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSurvey(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };
        fetchData();
    }, [params.surveyId]);

    // Increment to the next question or handle completion
    const handleNextQuestion = async () => {
        if (currentQuestionIndex < survey.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            await submitAnswers();
            setCompleted(true);
        }
    };

    // Function to submit answers to Firestore
    const submitAnswers = async () => {
        try {
            // Create a reference to the "results" subcollection
            const resultsRef = collection(doc(firestore, "surveys", params.surveyId), "results");
            // Add the answers to the subcollection
            await addDoc(resultsRef, {
                answers: answers
            });
            console.log("Answers successfully submitted");
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };

    // Show a loading message while fetching survey data
    if (!survey.questions) {
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
            {!completed &&<form>
                <Question survey={survey} questionIndex={currentQuestionIndex} setAnswers={setAnswers} answers={answers} />
                <button style={{
                    padding: "1rem 1.6rem",
                    color: "#7047EB",
                    border: "1px solid #7047EB",
                    borderRadius: "4px",
                    cursor: "pointer",
                    background: "transparent",
                    fontSize: "1.2rem",
                    marginTop: "3rem",
                
                }} type="button" onClick={handleNextQuestion}>Continue</button>
            </form>}
            {completed &&<Completed/>}
        </main>
    );
};

export default TakeSurvey;
